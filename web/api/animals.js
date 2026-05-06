export default async function handler(req, res) {
    // Reagujeme pouze na HTTP GET požadavek (čtení dat)
    if (req.method === 'GET') {
        // Testovací data simulující databázi (s normálním rozdělením věku)
        const mockData = {
            "zaznam1": { name: "Max", species: "Pes", age: 1, description: "Mladý a plný energie." },
            "zaznam2": { name: "Micka", species: "Kočka", age: 3, description: "Klidná a mazlivá." },
            "zaznam3": { name: "Rex", species: "Pes", age: 3, description: "Výborný hlídač." },
            "zaznam4": { name: "Luna", species: "Kočka", age: 3, description: "Ráda si hraje." },
            "zaznam5": { name: "Baryk", species: "Pes", age: 5, description: "Moudrý starší pán." }
        };
        
        // Pošleme data zpět na web jako JSON
        res.status(200).json(mockData);
    } else {
        res.status(405).json({ message: "Tato metoda není povolena" });
    }
}