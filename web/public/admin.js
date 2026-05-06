// Pomocná funkce pro vygenerování testovacích dat
async function generateTestData() {
    // Vytvoříme zvířata tak, aby jejich věk tvořil normální rozdělení (Gaussovu křivku)
    const ages = [1, 2, 2, 3, 3, 3, 3, 4, 4, 5]; 
    
    for (let i = 0; i < ages.length; i++) {
        const animalData = {
            name: `Zvířátko ${i + 1}`,
            species: i % 2 === 0 ? "Pes" : "Kočka",
            age: ages[i],
            description: "Hledá nový domov."
        };

        await fetch('/api/animals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animalData)
        });
    }
    alert('Testovací data ve tvaru normálního rozdělení byla nahrána do Firebase!');
}