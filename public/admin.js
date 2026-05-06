let speciesChart, ageChart;
let editId = null; // Proměnná pro uchování ID zvířete, které zrovna upravujeme

// Pomocná funkce: Převod vybraného souboru na Base64 řetězec[cite: 5]
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// Zobrazení náhledu po výběru souboru
document.getElementById('photoFile').addEventListener('change', async function() {
    if (this.files && this.files[0]) {
        const base64 = await toBase64(this.files[0]);
        document.getElementById('previewImg').src = base64;
        document.getElementById('photoPreview').style.display = 'block';
    }
});

// Inicializace administrace
async function initAdmin() {
    const data = await loadAdminAnimals();
    updateCharts(data);
}

// Načtení zvířat do tabulky (Read)[cite: 8]
async function loadAdminAnimals() {
    const response = await fetch('/api/animals');
    const data = await response.json();
    const list = document.getElementById('admin-animal-list');
    list.innerHTML = '';

    for (const key in data) {
        const animal = data[key];
        list.innerHTML += `
            <tr>
                <td><img src="${animal.photo}" style="width: 40px; height: 40px; object-fit: cover;" class="rounded shadow-sm"></td>
                <td>
                    <strong>${animal.name}</strong><br>
                    <small class="text-muted">Od: ${new Date(animal.dateArrived).toLocaleDateString('cs-CZ')}</small>
                </td>
                <td><span class="badge bg-secondary">${animal.species}</span></td>
                <td>${animal.age} let</td>
                <td class="text-end">
                    <button class="btn btn-outline-primary btn-sm me-1" onclick="editAnimal('${key}')">Upravit</button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteAnimal('${key}')">Smazat</button>
                </td>
            </tr>
        `;
    }
    return data;
}

// Příprava formuláře na úpravu (Update - načtení dat)[cite: 8]
async function editAnimal(id) {
    const response = await fetch('/api/animals');
    const data = await response.json();
    const animal = data[id];

    // Předvyplnění formuláře
    document.getElementById('name').value = animal.name;
    document.getElementById('species').value = animal.species;
    document.getElementById('age').value = animal.age;
    document.getElementById('dateArrived').value = animal.dateArrived || '';
    document.getElementById('description').value = animal.description;
    
    // Náhled stávající fotky
    document.getElementById('previewImg').src = animal.photo;
    document.getElementById('photoPreview').style.display = 'block';
    // Odejmutí povinnosti nahrát novou fotku při editaci
    document.getElementById('photoFile').removeAttribute('required'); 
    
    // Nastavení režimu editace
    editId = id;
    document.getElementById('submitBtn').innerText = "Aktualizovat údaje";
    document.getElementById('submitBtn').className = "btn btn-success w-100";
    document.getElementById('cancelEdit').style.display = "block";
    
    window.scrollTo(0, 0); // Posun stránky nahoru k formuláři
}

// Vyresetování formuláře z režimu úprav zpět do režimu přidávání
function resetForm() {
    editId = null;
    document.getElementById('addAnimalForm').reset();
    document.getElementById('photoFile').setAttribute('required', 'true');
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('submitBtn').innerText = "Uložit mazlíčka";
    document.getElementById('submitBtn').className = "btn btn-primary w-100";
    document.getElementById('cancelEdit').style.display = "none";
}

// Odeslání formuláře - slouží pro Přidání (Create) i Úpravu (Update)[cite: 3, 8]
document.getElementById('addAnimalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('photoFile');
    let photoData = null;
    
    // Pokud nahráváme novou fotku, převedeme ji na Base64
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

    // Pokud upravujeme (máme editId), přidáme ho do odesílaných dat
    if (editId) data.id = editId;
    // Přidáme novou fotku jen pokud byla vybrána, jinak si API ponechá tu starou
    if (photoData) data.photo = photoData;

    // Rozhodnutí o HTTP metodě: PATCH pro úpravu, POST pro nový záznam[cite: 3, 8]
    const method = editId ? 'PATCH' : 'POST';

    await fetch('/api/animals', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert(editId ? 'Údaje byly úspěšně aktualizovány!' : 'Nový parťák byl přidán do databáze!');
    resetForm();
    initAdmin(); // Obnovení tabulky a grafů
});

// Smazání zvířete (Delete)[cite: 8]
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

// Vizualizace dat (Chart.js) s aplikací normálního rozdělení[cite: 6]
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

    // Koláčový graf druhů zvířat[cite: 6]
    speciesChart = new Chart(document.getElementById('speciesChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(speciesCounts),
            datasets: [{ data: Object.values(speciesCounts), backgroundColor: ['#0d6efd', '#ffc107', '#198754'] }]
        },
        options: { plugins: { title: { display: true, text: 'Zastoupení druhů v útulku' } } }
    });

    // Sloupcový graf věku, ukazující křivku normálního rozdělení[cite: 6]
    ageChart = new Chart(document.getElementById('ageChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(ageDist),
            datasets: [{ label: 'Počet zvířat', data: Object.values(ageDist), backgroundColor: '#6c757d' }]
        },
        options: { plugins: { title: { display: true, text: 'Věková struktura (Normální rozdělení)' } } }
    });
}

// Generátor testovacích dat 
async function generateNormalDistributionData() {
    // Věk je rozložen tak, aby po vykreslení v grafu tvořil přesnou Gaussovu křivku (normální rozdělení) kolem hodnoty 3
    const normalAges = [1, 2, 2, 3, 3, 3, 3, 4, 4, 5]; 
    const today = new Date().toISOString().split('T')[0];

    for (let i = 0; i < normalAges.length; i++) {
        await fetch('/api/animals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `Zkušební zvířátko ${i+1}`,
                species: i % 2 === 0 ? "Pes" : "Kočka",
                age: normalAges[i],
                dateArrived: today,
                photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
                description: "Automatický profil vygenerovaný za účelem demonstrace grafu s normálním rozdělením věku."
            })
        });
    }
    alert("Testovací data ve tvaru normálního rozdělení byla nahrána!");
    initAdmin();
}

// Spuštění po načtení stránky
initAdmin();