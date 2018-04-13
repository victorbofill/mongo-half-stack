const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27019/test';
let client = null;
MongoClient.connect(url)
    .then(_client => {
        client = _client;
        const db = client.db();
        return db.collection('friends')
            .find()
            .toArray();
    })
    .then(friends => {
        console.log(
            JSON.stringify(friends, true, 2)
        );
    })
    .catch(err => {
        console.log('Failure!', err);
    })
    .then(() => {
        client.close();
    });