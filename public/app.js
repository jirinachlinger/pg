// Načtení a zobrazení zvířat na hlavní stránce
async function loadAnimals() {
    try {
        const response = await fetch('/api/animals'); 
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
            
            // Stavy zvířete
            const isAdopted = animal.adopted === true;
            const isPending = animal.pending === true;

            // Výchozí vzhled (zvíře je volné)
            let badgeHtml = `<span class="badge bg-info text-dark">${animal.species}</span>`;
            let buttonHtml = `<button class="btn btn-outline-primary w-100 rounded-pill fw-bold" onclick="openAdoptModal('${key}')">Mám zájem o adopci</button>`;

            // Vzhled pokud už je adoptováno
            if (isAdopted) {
                badgeHtml = `<span class="badge bg-success shadow-sm">🏠 Našel/a si domov!</span>`;
                buttonHtml = `<button class="btn btn-secondary w-100 rounded-pill fw-bold" disabled>Již adoptováno</button>`;
            } 
            // Vzhled pokud se adopce právě řeší (Rezervace)
            else if (isPending) {
                badgeHtml = `<span class="badge bg-warning text-dark shadow-sm">⏳ Rezervováno</span>`;
                buttonHtml = `<button class="btn btn-secondary w-100 rounded-pill fw-bold" disabled>Probíhá jednání</button>`;
            }

            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm border-0 ${isAdopted || isPending ? 'opacity-75' : ''}">
                        <img src="${animal.photo}" class="card-img-top" alt="${animal.name}">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title fw-bold mb-0">${animal.name}</h5>
                                ${badgeHtml}
                            </div>
                            <p class="text-muted small mb-2"><strong>Věk:</strong> ${animal.age} let</p>
                            <div id="desc-${key}" class="description-truncate mb-2">
                                ${animal.description}
                            </div>
                            <button class="btn btn-link btn-sm p-0 mb-3 text-start text-decoration-none" onclick="toggleDesc('${key}')">Zobrazit více/méně</button>
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
    }
}

function toggleDesc(id) {
    const el = document.getElementById(`desc-${id}`);
    el.style.height = el.style.height === '3.6em' ? 'auto' : '3.6em';
}

function openAdoptModal(animalId) {
    document.getElementById('adoptAnimalId').value = animalId;
    const modal = new bootstrap.Modal(document.getElementById('adoptModal'));
    modal.show();
}

// Odeslání formuláře pro adopci (POST)[cite: 8]
document.getElementById('adoptForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const animalId = document.getElementById('adoptAnimalId').value;
    const data = {
        animalId: animalId,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        dateSubmitted: new Date().toISOString()
    };

    // 1. Odešleme žádost do systému[cite: 8]
    await fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // 2. Okamžitě zvířeti nastavíme status "Rezervováno" (pending: true)
    await fetch('/api/animals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: animalId, pending: true })
    });

    alert('Děkujeme! Vaše žádost byla odeslána a mazlíček je pro vás nyní rezervován.');
    
    document.getElementById('adoptForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('adoptModal')).hide();
    
    // Obnovíme výpis na stránce, aby zmizelo tlačítko
    loadAnimals();
});

loadAnimals();