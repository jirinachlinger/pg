// Načtení a zobrazení zvířat
async function loadAnimals() {
    const response = await fetch('/api/animals');
    const data = await response.json();
    const list = document.getElementById('animal-list');
    list.innerHTML = '';

    for (const key in data) {
        const animal = data[key];
        // Pokud chybí fotka, dáme tam výchozí obrázek
        const photo = animal.photo || 'https://via.placeholder.com/300x200?text=Bez+fotografie';
        
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${photo}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${animal.name}">
                    <div class="card-body">
                        <h5 class="card-title">${animal.name}</h5>
                        <p class="card-text"><strong>Věk:</strong> ${animal.age} let</p>
                        
                        <!-- Zkrácený popis s možností rozbalení -->
                        <div id="desc-${key}" style="height: 3em; overflow: hidden; transition: height 0.3s;">
                            ${animal.description}
                        </div>
                        <button class="btn btn-link p-0 mb-3" onclick="toggleDesc('${key}')">Zobrazit více/méně</button>
                        
                        <button class="btn btn-primary w-100" onclick="openAdoptModal('${key}')">Možnost adopce</button>
                    </div>
                </div>
            </div>
        `;
        list.innerHTML += card;
    }
}

// Funkce pro rozbalení/sbalení textu
function toggleDesc(id) {
    const el = document.getElementById(`desc-${id}`);
    if (el.style.height === '3em') {
        el.style.height = 'auto';
    } else {
        el.style.height = '3em';
    }
}

// Otevření modalu a uložení ID zvířátka
function openAdoptModal(animalId) {
    document.getElementById('adoptAnimalId').value = animalId;
    const modal = new bootstrap.Modal(document.getElementById('adoptModal'));
    modal.show();
}

// Odeslání formuláře
document.getElementById('adoptForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Zabránění obnovení stránky
    
    const requestData = {
        animalId: document.getElementById('adoptAnimalId').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value
    };

    // Odešleme žádost na API (nový soubor adoptions.js)
    await fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    });

    alert('Děkujeme! Tvá žádost o adopci byla odeslána.');
    document.getElementById('adoptForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('adoptModal')).hide();
});

loadAnimals();