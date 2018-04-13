const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = process.env.MONGODB_URI || 'mongo://localhost:27019/friends';

const promise = MongoClient.connect(MONGODB_URI);

const dbPromise = promise.then(client => {
    dbPromise.client = client;
    return client.db();
});

module.exports = dbPromise;