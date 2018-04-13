const http = require('http');
const app = require('./lib/app');
const mongodb = require('./lib/mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27019/friends';

mongodb.connect(MONGODB_URI)
    .then(() => console.log('Mongo connected', MONGODB_URI))
    .catch(err => console.log('Mongo failure', err));

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Server running on ', server.address().port);
});