const mongo = require('../mongodb');
const mongodb = require('mongodb');

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
    },

    delete(id) {
        return mongo.then(db => {
            const friendId = new mongodb.ObjectId(id);
            return db.collection('friends')
                .deleteOne( { _id: friendId })
                .then(() => null);
        });
    },

    update(friend) {
        return mongo.then(db => {
            const friendId = new mongodb.ObjectId(friend._id);
            return db.collection('friends')
                .updateOne( { _id: friendId}, { $set: { friend } } )
                .then(() => {
                    return db.collection('friends')
                        .findOne({ _id: friend._id });
                });
        });
    }
};