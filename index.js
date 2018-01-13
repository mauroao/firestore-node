const admin = require('firebase-admin');

const serviceAccount = require('./file.json');
const contatos = require('./contatos.mock.js'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projetofirestore.firebaseio.com"
});

const db = admin.firestore();

/*
db.collection('operadoras').get()
    .then(response => {
        response.forEach(doc => {
            console.log(doc.data());
        });
    })
    .catch(err => {
        console.log(err);
    });
    */

contatos.forEach(contato => {
    db
        .collection('contatos')
        .doc(contato.serial)
        .set(contato)
        .then(ref => console.log(ref))
        .catch(err => console.log(err));
});
