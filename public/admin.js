// Přidání zvířete (Create)
document.getElementById('addAnimalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        age: parseInt(document.getElementById('age').value),
        photo: document.getElementById('photo').value,
        description: document.getElementById('description').value
    };

    await fetch('/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    alert('Mazlíček přidán!');
    document.getElementById('addAnimalForm').reset();
    loadAdminAnimals();
});

// Zobrazení všech zvířat v tabulce (Read)
async function loadAdminAnimals() {
    const response = await fetch('/api/animals');
    const data = await response.json();
    const list = document.getElementById('admin-animal-list');
    list.innerHTML = '';

    for (const key in data) {
        const animal = data[key];
        list.innerHTML += `
            <tr>
                <td><img src="${animal.photo}" style="width: 50px; height:50px; object-fit:cover;"></td>
                <td>${animal.name}</td>
                <td>${animal.age}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteAnimal('${key}')">Smazat</button></td>
            </tr>
        `;
    }
}

// Smazání zvířete (Delete)
async function deleteAnimal(id) {
    if(confirm('Opravdu chcete mazlíčka smazat?')) {
        await fetch('/api/animals', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        loadAdminAnimals();
    }
}

// Funkce generující data s normálním rozdělením věku
async function generateNormalDistributionData() {
    // Věk tvoří Gaussovu křivku (normální rozdělení) kolem hodnoty 3
    const ages = [1, 2, 2, 3, 3, 3, 3, 4, 4, 5]; 
    for (let i = 0; i < ages.length; i++) {
        await fetch('/api/animals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `Testovací mazlíček ${i+1}`,
                age: ages[i],
                photo: "https://via.placeholder.com/300x200?text=Zviratko",
                description: "Automaticky vygenerovaný popis pro účely testování."
            })
        });
    }
    alert("Testovací data (s normálním rozdělením věku) byla přidána.");
    loadAdminAnimals();
}

loadAdminAnimals();