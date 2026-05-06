// Načtení a zobrazení zvířat na hlavní stránce
async function loadAnimals() {
    try {
        const response = await fetch('/api/animals'); // Volání GET metody našeho API
        const data = await response.json();
        const list = document.getElementById('animal-list');
        list.innerHTML = '';

        if (!data || Object.keys(data).length === 0) {
            list.innerHTML = '<p class="text-center">Momentálně nemáme žádné mazlíčky k adopci.</p>';
            return;
        }

        for (const key in data) {
            const animal = data[key];
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${animal.photo}" class="card-img-top" alt="${animal.name}">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h5 class="card-title mb-0">${animal.name}</h5>
                                <span class="badge bg-info text-dark">${animal.species}</span>
                            </div>
                            <p class="text-muted small"><strong>Věk:</strong> ${animal.age} let</p>
                            <div id="desc-${key}" class="description-truncate" style="height: 3em; overflow: hidden; transition: height 0.3s;">
                                ${animal.description}
                            </div>
                            <button class="btn btn-link btn-sm p-0 mb-3" onclick="toggleDesc('${key}')">Zobrazit více/méně</button>
                            <button class="btn btn-outline-primary w-100" onclick="openAdoptModal('${key}')">Mám zájem o adopci</button>
                        </div>
                    </div>
                </div>
            `;
            list.innerHTML += card;
        }
    } catch (error) {
        console.error("Chyba při načítání:", error);
    }
}

// Funkce pro rozbalení popisu
function toggleDesc(id) {
    const el = document.getElementById(`desc-${id}`);
    el.style.height = el.style.height === '3em' ? 'auto' : '3em';
}

// Otevření modalu pro adopci
function openAdoptModal(animalId) {
    document.getElementById('adoptAnimalId').value = animalId;
    const modal = new bootstrap.Modal(document.getElementById('adoptModal'));
    modal.show();
}

// Odeslání formuláře pro adopci (POST metoda)[cite: 8]
document.getElementById('adoptForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        animalId: document.getElementById('adoptAnimalId').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value
    };

    await fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert('Děkujeme! Vaše žádost byla odeslána správci útulku.');
    document.getElementById('adoptForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('adoptModal')).hide();
});

loadAnimals();