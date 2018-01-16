const admin = require('firebase-admin');

const serviceAccount = require('./file.json');

console.log('connecting...');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projetofirestore.firebaseio.com"
});

const db = admin.firestore();

console.log('ok!');

let getPaginedContatos = async (pageNumber, numberOfLines) => {
    let totalPages = 0;
    let totalDocs = 0;
    let skipNumber = (pageNumber -1) * numberOfLines;
    
    await db.collection('contatos')
        .get()
        .then(querySnapshot => {
            totalDocs = querySnapshot.size;
        }); 
    console.log('1');
    
    totalPages = Math.ceil(totalDocs / numberOfLines);
    
    let last = null;
    if (skipNumber > 0) {
        await db.collection('contatos')
            .orderBy('nome')
            .limit(skipNumber)
            .get()
            .then(querySnapshot => {
                last = querySnapshot.docs[querySnapshot.docs.length - 1];
            });
    }
    console.log('2');

    let query = db.collection('contatos')
        .orderBy('nome');
    
    if (last != null) {
         query = query.startAfter(last.data().nome);
    }
    
    let paginationResult = {};
    await query
        .limit(numberOfLines)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(doc => doc.data()); 
            paginationResult = {
                data: data,
                totalPages: totalPages,
                totalDocs: totalDocs,
                pageNumber: pageNumber
            };
        });
    console.log('3');        
    
    return paginationResult;
};

getPaginedContatos(11, 10)
    .then(result => console.log(result))
    .catch(err => console.log(err));



