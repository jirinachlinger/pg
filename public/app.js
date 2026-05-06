// Načtení a zobrazení zvířat na hlavní stránce
async function loadAnimals() {
    try {
        const response = await fetch('/api/animals'); // Zavolání Vercel API (GET metoda)[cite: 8]
        const data = await response.json();
        const list = document.getElementById('animal-list');
        list.innerHTML = '';

        if (!data || Object.keys(data).length === 0) {
            list.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h4 class="text-muted">Momentálně nemáme k adopci žádné mazlíčky.</h4>
                    <p>Zkuste to prosím později.</p>
                </div>`;
            return;
        }

        for (const key in data) {
            const animal = data[key];
            
            // Zkontrolujeme, zda už má zvířátko domov (tuto hodnotu mění admin při schválení žádosti)
            const isAdopted = animal.adopted === true;

            // Dynamické nastavení štítku (badge) a tlačítka podle toho, zda je adoptováno
            const badgeHtml = isAdopted 
                ? `<span class="badge bg-success shadow-sm">🏠 Našel/a si domov!</span>` 
                : `<span class="badge bg-info text-dark">${animal.species}</span>`;

            const buttonHtml = isAdopted 
                ? `<button class="btn btn-secondary w-100 rounded-pill fw-bold" disabled>Již adoptováno</button>` 
                : `<button class="btn btn-outline-primary w-100 rounded-pill fw-bold" onclick="openAdoptModal('${key}')">Mám zájem o adopci</button>`;

            // Vykreslení moderní karty s jemným ztmavením u adoptovaných zvířat
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm ${isAdopted ? 'opacity-75' : ''}">
                        <img src="${animal.photo}" class="card-img-top" alt="${animal.name}">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title fw-bold mb-0">${animal.name}</h5>
                                ${badgeHtml}
                            </div>
                            <p class="text-muted small mb-2"><strong>Věk:</strong> ${animal.age} let</p>
                            
                            <!-- Zkrácený popis -->
                            <div id="desc-${key}" class="description-truncate mb-2">
                                ${animal.description}
                            </div>
                            <button class="btn btn-link btn-sm p-0 mb-3 text-start text-decoration-none" onclick="toggleDesc('${key}')">Zobrazit více/méně</button>
                            
                            <!-- Tlačítko se zarovná vždy na spodek karty -->
                            <div class="mt-auto">
                                ${buttonHtml}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            list.innerHTML += card;
        }
    } catch (error) {
        console.error("Chyba při načítání:", error);
        document.getElementById('animal-list').innerHTML = '<p class="text-danger text-center">Nepodařilo se načíst data z databáze.</p>';
    }
}

// Funkce pro rozbalení/sbalení dlouhého popisu zvířete
function toggleDesc(id) {
    const el = document.getElementById(`desc-${id}`);
    if (el.style.height === '3.6em') {
        el.style.height = 'auto';
    } else {
        el.style.height = '3.6em';
    }
}

// Otevření Bootstrap modalu pro adopci a uložení ID konkrétního zvířete[cite: 7]
function openAdoptModal(animalId) {
    document.getElementById('adoptAnimalId').value = animalId;
    const modal = new bootstrap.Modal(document.getElementById('adoptModal'));
    modal.show();
}

// Odeslání formuláře pro adopci (metoda POST na nové API)[cite: 8]
document.getElementById('adoptForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Zabráníme znovunačtení stránky
    
    // Sesbíráme data z formuláře
    const data = {
        animalId: document.getElementById('adoptAnimalId').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        dateSubmitted: new Date().toISOString() // Přidáme čas, kdy byla žádost odeslána
    };

    // Odešleme data bezpečně do Firebase přes náš Vercel backend[cite: 5]
    await fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert('Děkujeme! Vaše žádost byla úspěšně odeslána správci útulku.');
    
    // Vyčistíme formulář a schováme okno
    document.getElementById('adoptForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('adoptModal')).hide();
});

// Zavolání funkce pro načtení dat ihned po spuštění skriptu
loadAnimals();