import { db } from './firebase.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const ref = db.ref('adoptions');
            const newAdoption = ref.push();
            await newAdoption.set(req.body);
            res.status(201).json({ message: 'Žádost přijata' });
        } catch (error) {
            res.status(500).json({ error: 'Chyba při ukládání' });
        }
    } else {
        res.status(405).json({ message: 'Povolena je jen metoda POST' });
    }
}