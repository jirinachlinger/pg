async function loadAnimals() {
    try {
        // Zavoláme naše Vercel API
        const response = await fetch('/api/animals');
        const data = await response.json();
        
        const list = document.getElementById('animal-list');
        list.innerHTML = ''; // Vymažeme text "Načítám..."
        
        // Projdeme přijatá data a vytvoříme HTML kartu pro každé zvíře
        for (const key in data) {
            const animal = data[key];
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${animal.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${animal.species}</h6>
                            <p class="card-text"><strong>Věk:</strong> ${animal.age} let</p>
                            <p class="card-text">${animal.description}</p>
                            <button class="btn btn-primary w-100">Mám zájem</button>
                        </div>
                    </div>
                </div>
            `;
            list.innerHTML += card;
        }
    } catch (error) {
        document.getElementById('animal-list').innerHTML = '<p class="text-danger text-center">Chyba při načítání dat.</p>';
        console.error("Chyba:", error);
    }
}

// Spustíme funkci hned po načtení stránky
loadAnimals();