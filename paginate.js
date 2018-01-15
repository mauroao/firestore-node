const admin = require('firebase-admin');

const serviceAccount = require('./file.json');
const contatos = require('./contatos.mock.js'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projetofirestore.firebaseio.com"
});

const db = admin.firestore();

contatos.forEach(contato => {
    db
        .collection('contatos')
        .doc(contato.serial)
        .set(contato)
        .then(ref => console.log(ref))
        .catch(err => console.log(err));
});
