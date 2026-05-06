import { db } from './firebase.js';

export default async function handler(req, res) {
    // Reference na uzel 'animals' v naší Firebase databázi[cite: 5]
    const ref = db.ref('animals');

    // 1. ČTENÍ DAT (Read) - Načte všechna zvířata pro hlavní stránku i tabulku v adminu[cite: 8]
    if (req.method === 'GET') {
        try {
            const snapshot = await ref.once('value');
            res.status(200).json(snapshot.val() || {});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Chyba při čtení z databáze' });
        }
    } 
    // 2. ZÁPIS DAT (Create) - Přidá nového mazlíčka s Base64 obrázkem[cite: 8]
    else if (req.method === 'POST') {
        try {
            const newAnimal = req.body;
            // Vytvoří nový záznam s unikátním ID, které Firebase sama vygeneruje[cite: 5]
            const newRef = ref.push(); 
            await newRef.set(newAnimal);
            res.status(201).json({ message: 'Zvíře úspěšně přidáno', id: newRef.key });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Chyba při zápisu do databáze' });
        }
    } 
    // 3. ÚPRAVA DAT (Update) - Aktualizuje údaje o stávajícím zvířeti[cite: 3, 8]
    else if (req.method === 'PATCH') {
        try {
            // Vytáhneme si 'id' z odeslaných dat a zbytek uložíme do 'updates'
            const { id, ...updates } = req.body;
            
            if (!id) {
                return res.status(400).json({ error: 'Chybí ID zvířete pro aktualizaci' });
            }
            
            // Provedeme cílenou aktualizaci jen u konkrétního zvířete podle jeho ID[cite: 5]
            await db.ref(`animals/${id}`).update(updates);
            res.status(200).json({ message: 'Údaje zvířete byly úspěšně aktualizovány' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Chyba při aktualizaci databáze' });
        }
    }
    // 4. MAZÁNÍ DAT (Delete) - Odstraní zvíře z evidence[cite: 8]
    else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            
            if (!id) {
                return res.status(400).json({ error: 'Chybí ID zvířete pro smazání' });
            }

            await db.ref(`animals/${id}`).remove();
            res.status(200).json({ message: 'Záznam byl trvale smazán' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Chyba při mazání z databáze' });
        }
    } 
    // Pokud na API přijde nějaká jiná metoda (např. PUT nebo OPTIONS)
    else {
        res.status(405).json({ message: 'Tato HTTP metoda není povolena' });
    }
}