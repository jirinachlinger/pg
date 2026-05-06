export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        
        // Porovnání s Vercel Environment Variables
        if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Špatné jméno nebo heslo' });
        }
    } else {
        res.status(405).json({ message: 'Metoda není povolena' });
    }
}