const mongo = require('../mongodb');

module.exports = {
    insert(friend) {
        return mongo.then(db => {
            return db.collection('friends')
                .insert(friend)
                .then(result => result.ops[0]); 
        });
    },

    find() {
        return mongo.then(db => {
            return db.collection('friends')
                .find()
                .toArray();
        });
    }
};