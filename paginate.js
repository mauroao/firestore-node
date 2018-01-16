const admin = require('firebase-admin');

const serviceAccount = require('./file.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projetofirestore.firebaseio.com"
});

const db = admin.firestore();

let getPaginedContatos = async (pageNumber, numberOfLines) => {
    let totalPages = 0;
    let totalDocs = 0;
    let skipNumber = (pageNumber -1) * numberOfLines;
    
    await db.collection('contatos')
        .get()
        .then(querySnapshot => {
            totalDocs = querySnapshot.size;
        }); 
    
    totalPages = Math.ceil(totalDocs / numberOfLines);
    
    let last = null;
    if (skipNumber > 0) {
        await db.collection('contatos')
            .orderBy('nome')
            .limit(skipNumber)
            .then(querySnapshot => {
                last = querySnapshot.docs[querySnapshot.docs.length - 1];
            });
    }
    
    let query = db.collection('contatos')
        .orderBy('nome');
    
    if (last != null) {
        query.startAfter(last.data().name);
    }
    
    let paginationResult = {};
    await query
        .limit(numberOfLines)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.map(doc => doc.data()); 
            paginationResult = {
                data: data,
                totalPages: totalPages,
                pageNumber: pageNumber
            };
        });
    
    
    return paginationResult;
   

}

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
