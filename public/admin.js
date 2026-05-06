// Globální proměnné
let speciesChart, ageChart;
let editId = null; 
let allAnimals = {}; // Slouží k uchování dat o zvířatech pro párování s žádostmi o adopci

// ==========================================
// 1. PŘIHLAŠOVÁNÍ DO ADMINISTRACE[cite: 5]
// ==========================================
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    });

    const result = await response.json();
    if (result.success) {
        // Skryjeme přihlášení a zobrazíme admin panel
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        initAdmin(); // Spustíme načítání dat až po úspěšném přihlášení
    } else {
        alert('Chybné přihlašovací jméno nebo heslo!');
    }
});

// Hlavní spouštěcí funkce (volá se po přihlášení a po každé změně)
async function initAdmin() {
    await loadAdminAnimals();
    await loadAdoptions();
}

// ==========================================
// 2. POMOCNÉ FUNKCE (Obrázky)[cite: 5]
// ==========================================
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// Náhled obrázku po výběru souboru
document.getElementById('photoFile').addEventListener('change', async function() {
    if (this.files && this.files[0]) {
        const base64 = await toBase64(this.files[0]);
        document.getElementById('previewImg').src = base64;
        document.getElementById('photoPreview').style.display = 'block';
    }
});

// ==========================================
// 3. SPRÁVA ZVÍŘAT (CRUD)[cite: 8]
// ==========================================

// Načtení zvířat z API a vykreslení do tabulky (Read)
async function loadAdminAnimals() {
    const response = await fetch('/api/animals');
    allAnimals = await response.json() || {}; 
    
    const list = document.getElementById('admin-animal-list');
    list.innerHTML = '';

    for (const key in allAnimals) {
        const animal = allAnimals[key];
        
        // Formátování data
        const dateStr = animal.dateArrived ? new Date(animal.dateArrived).toLocaleDateString('cs-CZ') : 'Neznámé';
        // Zvýraznění, pokud už je zvíře adoptované
        const statusBadge = animal.adopted ? `<span class="badge bg-success ms-2">Adoptováno</span>` : '';

        list.innerHTML += `
            <tr class="${animal.adopted ? 'table-light text-muted' : ''}">
                <td><img src="${animal.photo}" style="width: 40px; height: 40px; object-fit: cover;" class="rounded shadow-sm"></td>
                <td>
                    <strong>${animal.name}</strong> ${statusBadge}<br>
                    <small class="text-muted">Od: ${dateStr}</small>
                </td>
                <td><span class="badge bg-secondary">${animal.species}</span></td>
                <td>${animal.age} let</td>
                <td class="text-end">
                    <button class="btn btn-outline-primary btn-sm me-1" onclick="editAnimal('${key}')" ${animal.adopted ? 'disabled' : ''}>Upravit</button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteAnimal('${key}')">Smazat</button>
                </td>
            </tr>
        `;
    }
    
    updateCharts(allAnimals); // Po načtení zvířat rovnou aktualizujeme grafy
}

// Odeslání formuláře pro Přidání (POST) nebo Úpravu (PATCH)[cite: 3, 8]
document.getElementById('addAnimalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('photoFile');
    let photoData = null;
    if (fileInput.files.length > 0) {
        photoData = await toBase64(fileInput.files[0]);
    }

    const data = {
        name: document.getElementById('name').value,
        species: document.getElementById('species').value,
        age: parseInt(document.getElementById('age').value),
        dateArrived: document.getElementById('dateArrived').value,
        description: document.getElementById('description').value
    };

    if (editId) data.id = editId;
    if (photoData) data.photo = photoData;

    const method = editId ? 'PATCH' : 'POST';

    await fetch('/api/animals', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert(editId ? 'Záznam byl aktualizován!' : 'Nový mazlíček byl přidán!');
    resetForm();
    initAdmin();
});

// Příprava formuláře na úpravu existujícího záznamu[cite: 8]
function editAnimal(id) {
    const animal = allAnimals[id];
    document.getElementById('name').value = animal.name;
    document.getElementById('species').value = animal.species;
    document.getElementById('age').value = animal.age;
    document.getElementById('dateArrived').value = animal.dateArrived || '';
    document.getElementById('description').value = animal.description;
    
    document.getElementById('previewImg').src = animal.photo;
    document.getElementById('photoPreview').style.display = 'block';
    document.getElementById('photoFile').removeAttribute('required'); 
    
    editId = id;
    document.getElementById('submitBtn').innerText = "Aktualizovat údaje";
    document.getElementById('submitBtn').className = "btn btn-success w-100 fw-bold";
    document.getElementById('cancelEdit').style.display = "block";
    
    window.scrollTo(0, 0); 
}

// Návrat formuláře do výchozího stavu
function resetForm() {
    editId = null;
    document.getElementById('addAnimalForm').reset();
    document.getElementById('photoFile').setAttribute('required', 'true');
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('submitBtn').innerText = "Uložit do databáze";
    document.getElementById('submitBtn').className = "btn btn-primary w-100 fw-bold";
    document.getElementById('cancelEdit').style.display = "none";
}

// Smazání zvířete (DELETE)[cite: 8]
async function deleteAnimal(id) {
    if (confirm('Opravdu chcete tento záznam trvale smazat?')) {
        await fetch('/api/animals', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        initAdmin();
    }
}

// ==========================================
// 4. SPRÁVA ADOPCÍ[cite: 8]
// ==========================================

// Načtení žádostí o adopci
async function loadAdoptions() {
    const response = await fetch('/api/adoptions');
    const adoptions = await response.json() || {};
    const list = document.getElementById('admin-adoptions-list');
    list.innerHTML = '';

    let hasRequests = false;

    for (const key in adoptions) {
        hasRequests = true;
        const req = adoptions[key];
        // Najdeme jméno zvířete z naší globální proměnné allAnimals
        const animalName = allAnimals[req.animalId] ? allAnimals[req.animalId].name : "Neznámé zvíře";
        
        list.innerHTML += `
            <tr>
                <td><strong>${req.firstName} ${req.lastName}</strong><br><span class="badge bg-info text-dark">Zájem o: ${animalName}</span></td>
                <td><small>📞 ${req.phone}<br>🏠 ${req.address}</small></td>
                <td class="text-end">
                    <button class="btn btn-success btn-sm mb-1 w-100" onclick="approveAdoption('${key}', '${req.animalId}')">Potvrdit</button>
                    <button class="btn btn-danger btn-sm w-100" onclick="rejectAdoption('${key}')">Odmítnout</button>
                </td>
            </tr>
        `;
    }

    if (!hasRequests) {
        list.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-3">Momentálně nejsou žádné nové žádosti.</td></tr>';
    }
}

// Potvrzení adopce: Nastaví příznak zvířeti a smaže žádost[cite: 3, 8]
async function approveAdoption(adoptionId, animalId) {
    if (confirm('Opravdu chcete adopci potvrdit? Zvíře bude na webu označeno, že našlo domov.')) {
        // 1. Zvířeti přidáme vlastnost adopted: true (PATCH)
        await fetch('/api/animals', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: animalId, adopted: true })
        });
        
        // 2. Žádost vymažeme ze seznamu (DELETE)
        await fetch('/api/adoptions', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: adoptionId })
        });
        
        alert('Adopce byla úspěšně potvrzena!');
        initAdmin();
    }
}

// Zamítnutí adopce: Smaže žádost bez ovlivnění zvířete[cite: 8]
async function rejectAdoption(adoptionId) {
    if (confirm('Zamítnout tuto žádost o adopci?')) {
        await fetch('/api/adoptions', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: adoptionId })
        });
        initAdmin();
    }
}

// ==========================================
// 5. GRAFY A VIZUALIZACE[cite: 6]
// ==========================================
function updateCharts(data) {
    const speciesCounts = {};
    const ageDist = { 'Mladí (0-2)': 0, 'Střední (3-4)': 0, 'Starší (5+)': 0 };

    for (const key in data) {
        const a = data[key];
        speciesCounts[a.species] = (speciesCounts[a.species] || 0) + 1;
        
        if (a.age <= 2) ageDist['Mladí (0-2)']++;
        else if (a.age <= 4) ageDist['Střední (3-4)']++;
        else ageDist['Starší (5+)']++;
    }

    if (speciesChart) speciesChart.destroy();
    if (ageChart) ageChart.destroy();

    speciesChart = new Chart(document.getElementById('speciesChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(speciesCounts),
            datasets: [{ data: Object.values(speciesCounts), backgroundColor: ['#0d6efd', '#ffc107', '#198754'] }]
        },
        options: { plugins: { title: { display: true, text: 'Zastoupení druhů v útulku' } } }
    });

    ageChart = new Chart(document.getElementById('ageChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(ageDist),
            datasets: [{ label: 'Počet zvířat', data: Object.values(ageDist), backgroundColor: '#6c757d' }]
        },
        options: { plugins: { title: { display: true, text: 'Věková struktura (Normální rozdělení)' } } }
    });
}

// ==========================================
// 6. TESTOVACÍ DATA (Normální rozdělení)
// ==========================================
async function generateNormalDistributionData() {
    // Věk rozložen do tvaru Gaussovy křivky pro demonstraci
    const normalAges = [1, 2, 2, 3, 3, 3, 3, 4, 4, 5]; 
    const today = new Date().toISOString().split('T')[0];

    for (let i = 0; i < normalAges.length; i++) {
        await fetch('/api/animals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `Testovací zvíře ${i+1}`,
                species: i % 2 === 0 ? "Pes" : "Kočka",
                age: normalAges[i],
                dateArrived: today,
                adopted: false,
                photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
                description: "Profil pro otestování grafů a normálního rozdělení."
            })
        });
    }
    alert("Testovací data ve tvaru normálního rozdělení nahrána!");
    initAdmin();
}