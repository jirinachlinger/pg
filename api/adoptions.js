import { db } from './firebase.js';

export default async function handler(req, res) {
    const ref = db.ref('adoptions');

    // Čtení všech žádostí pro administraci[cite: 8]
    if (req.method === 'GET') {
        try {
            const snapshot = await ref.once('value');
            res.status(200).json(snapshot.val() || {});
        } catch (error) {
            res.status(500).json({ error: 'Chyba při načítání žádostí' });
        }
    } 
    // Vytvoření nové žádosti (to už tam máš)[cite: 8]
    else if (req.method === 'POST') {
        try {
            const newAdoption = ref.push();
            await newAdoption.set(req.body);
            res.status(201).json({ message: 'Žádost přijata' });
        } catch (error) {
            res.status(500).json({ error: 'Chyba při ukládání' });
        }
    } 
    // Smazání žádosti (když ji admin potvrdí nebo zamítne)[cite: 8]
    else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            await db.ref(`adoptions/${id}`).remove();
            res.status(200).json({ message: 'Žádost byla smazána' });
        } catch (error) {
            res.status(500).json({ error: 'Chyba při mazání' });
        }
    } else {
        res.status(405).json({ message: 'Metoda není povolena' });
    }
}