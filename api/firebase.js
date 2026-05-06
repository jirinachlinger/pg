import admin from 'firebase-admin';

// Ochrana proti vícenásobné inicializaci při volání serverless funkcí
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Vercel občas špatně čte konce řádků v klíči, toto to opravuje
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        databaseURL: process.env.FIREBASE_DATABASEURL
    });
}

const db = admin.database();
export { db };