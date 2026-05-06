let speciesChart, ageChart;

// Načtení dat a inicializace všeho
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
                <td><strong>${animal.name}</strong></td>
                <td><span class="badge bg-secondary">${animal.species}</span></td>
                <td>${animal.age} let</td>
                <td class="text-end">
                    <button class="btn btn-danger btn-sm" onclick="deleteAnimal('${key}')">Smazat</button>
                </td>
            </tr>
        `;
    }
    return data;
}

// Přidání nového zvířete (Create)[cite: 8]
document.getElementById('addAnimalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        species: document.getElementById('species').value,
        age: parseInt(document.getElementById('age').value),
        photo: document.getElementById('photo').value,
        description: document.getElementById('description').value
    };

    await fetch('/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert('Mazlíček uložen!');
    document.getElementById('addAnimalForm').reset();
    initAdmin();
});

// Smazání zvířete (Delete)[cite: 8]
async function deleteAnimal(id) {
    if (confirm('Opravdu smazat z evidence?')) {
        await fetch('/api/animals', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        initAdmin();
    }
}

// Funkce pro vizualizaci dat pomocí Chart.js
function updateCharts(data) {
    const speciesCounts = {};
    const ageCounts = { '1-2': 0, '3-4': 0, '5+': 0 };

    for (const key in data) {
        const animal = data[key];
        // Data pro koláčový graf druhů
        speciesCounts[animal.species] = (speciesCounts[animal.species] || 0) + 1;
        
        // Data pro sloupcový graf věku
        if (animal.age <= 2) ageCounts['1-2']++;
        else if (animal.age <= 4) ageCounts['3-4']++;
        else ageCounts['5+']++;
    }

    // Zničení starých grafů při aktualizaci
    if (speciesChart) speciesChart.destroy();
    if (ageChart) ageChart.destroy();

    // Koláčový graf - Druhy[cite: 6]
    speciesChart = new Chart(document.getElementById('speciesChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(speciesCounts),
            datasets: [{
                data: Object.values(speciesCounts),
                backgroundColor: ['#0d6efd', '#6610f2', '#6f42c1', '#d63384']
            }]
        },
        options: { plugins: { title: { display: true, text: 'Zastoupení druhů' } } }
    });

    // Sloupcový graf - Věk (zde se projeví normální rozdělení)[cite: 6]
    ageChart = new Chart(document.getElementById('ageChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(ageCounts),
            datasets: [{
                label: 'Počet zvířat',
                data: Object.values(ageCounts),
                backgroundColor: '#198754'
            }]
        },
        options: { plugins: { title: { display: true, text: 'Věková struktura' } } }
    });
}

// Generování testovacích dat pro simulaci normálního rozdělení věku
async function generateNormalDistributionData() {
    // Věk rozložený podle Gaussovy křivky kolem středu 3 roky
    const normalAges = [1, 2, 2, 3, 3, 3, 3, 4, 4, 5];
    for (let i = 0; i < normalAges.length; i++) {
        await fetch('/api/animals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `Mazlíček ${i + 1}`,
                species: i % 2 === 0 ? "Pes" : "Kočka",
                age: normalAges[i],
                photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300",
                description: "Tento profil byl automaticky vygenerován pro testování statistik a zobrazení normálního rozdělení věku v grafu."
            })
        });
    }
    alert('10 testovacích záznamů nahráno!');
    initAdmin();
}

initAdmin();