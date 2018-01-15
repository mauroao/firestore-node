const admin = require('firebase-admin');

const serviceAccount = require('./file.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projetofirestore.firebaseio.com"
});

const db = admin.firestore();

let pageNumber = 2;
let numberOfLines = 10; 

let skipNumber = (pageNumber -1) * numberOfLines; 

db.collection('contatos')
    .orderBy('nome')
    .limit(skipNumber)
    .get()
    .then(snapshot => {
        var last = snapshot.docs[snapshot.docs.length - 1];
    
        db.collection('contatos')
            .orderBy('nome')
            .startAfter(last.data().nome)
            .limit(numberOfLines)
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.data());
                });                
            })
            .catch(err => {
                console.log('erro:');
                console.log(err);
            })

    });
