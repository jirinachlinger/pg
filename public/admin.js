let speciesChart, ageChart;

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
                <td><img src="${animal.photo}" style="width: 40px; height: 40px; object-fit: cover;" class="rounded"></td>
                <td><strong>${animal.name}</strong></td>
                <td><span class="badge bg-secondary">${animal.species}</span></td>
                <td>${animal.age} let</td>
                <td class="text-end">
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteAnimal('${key}')">Smazat</button>
                </td>
            </tr>
        `;
    }
    return data;
}

// Přidání nového zvířete (Create s Base64 fotkou)[cite: 5, 8]
document.getElementById('addAnimalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('photoFile');
    const base64Photo = await toBase64(fileInput.files[0]);

    const data = {
        name: document.getElementById('name').value,
        species: document.getElementById('species').value,
        age: parseInt(document.getElementById('age').value),
        photo: base64Photo, // Tady posíláme Base64 místo URL[cite: 5]
        description: document.getElementById('description').value
    };

    await fetch('/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert('Zvířátko uloženo!');
    document.getElementById('addAnimalForm').reset();
    document.getElementById('photoPreview').style.display = 'none';
    initAdmin();
});

// Smazání zvířete (Delete)[cite: 8]
async function deleteAnimal(id) {
    if (confirm('Opravdu chcete záznam smazat?')) {
        await fetch('/api/animals', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        initAdmin();
    }
}

// Vizualizace dat (Chart.js)[cite: 6]
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
        options: { plugins: { title: { display: true, text: 'Zastoupení druhů' } } }
    });

    ageChart = new Chart(document.getElementById('ageChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(ageDist),
            datasets: [{ label: 'Počet', data: Object.values(ageDist), backgroundColor: '#6c757d' }]
        },
        options: { plugins: { title: { display: true, text: 'Věk (Normální rozdělení)' } } }
    });
}

// Generátor testovacích dat (Normální rozdělení věku)
async function generateNormalDistributionData() {
    const ages = [1, 2, 2, 3, 3, 3, 3, 4, 4, 5]; 
    for (let i = 0; i < ages.length; i++) {
        await fetch('/api/animals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `Test ${i+1}`,
                species: i % 2 === 0 ? "Pes" : "Kočka",
                age: ages[i],
                photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
                description: "Automatický popis pro testování normálního rozdělení."
            })
        });
    }
    initAdmin();
}

initAdmin();