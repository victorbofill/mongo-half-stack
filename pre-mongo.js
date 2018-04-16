const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';
let db = null;
MongoClient.connect(url)
    .then(_db => {
        db = _db;
        return db.collection('friends')
            .find()
            .toArray();
    })
    .then(friends => {
        console.log(friends);
    })
    .catch(err => {
        console.log('Failure!', err);
    })
    .then(() => {
        db.close();
    });