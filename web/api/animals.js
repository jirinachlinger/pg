import { db } from './firebase.js';

export default async function handler(req, res) {
    const ref = db.ref('animals');

    // ČTENÍ DAT (Read) - Načte všechna zvířata
    if (req.method === 'GET') {
        try {
            const snapshot = await ref.once('value');
            res.status(200).json(snapshot.val() || {});
        } catch (error) {
            res.status(500).json({ error: 'Chyba při čtení z databáze' });
        }
    } 
    // ZÁPIS DAT (Create) - Přidá nové zvíře
    else if (req.method === 'POST') {
        try {
            const newAnimal = req.body;
            const newRef = ref.push(); // Vytvoří unikátní ID ve Firebase
            await newRef.set(newAnimal);
            res.status(201).json({ message: 'Zvíře úspěšně přidáno', id: newRef.key });
        } catch (error) {
            res.status(500).json({ error: 'Chyba při zápisu do databáze' });
        }
    } 
    // MAZÁNÍ DAT (Delete)
    else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            await db.ref(`animals/${id}`).remove();
            res.status(200).json({ message: 'Záznam smazán' });
        } catch (error) {
            res.status(500).json({ error: 'Chyba při mazání' });
        }
    } else {
        res.status(405).json({ message: 'Metoda není povolena' });
    }
}