require('dotenv').config({ path: '/.test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Friends API', () => {
    before(() => {
        return mongo.then(db => {
            db.collection('friends').remove();
        });
    });

    const jacy = {
        name: 'Jacy',
        role: 'Drowning out Kasey'
    };

    const dean = {
        name: 'Dean',
        role: 'Smoking weed and telling us to hurry up'
    };

    const saveFriend = (friend) => {
        return chai.request(app)
            .post('/friends')
            .send(friend)
            .then(({ body }) => {
                assert.ok(body._id);
                friend._id = body._id;
                return friend;
            });
    };

    before(() => {
        saveFriend(jacy);
        saveFriend(dean);
    });

    const friends = [jacy, dean];

    it('Saves a friend', () => {
        return chai.request(app)
            .get('/friends')
            .then(({ body }) => {
                assert.deepEqual(body[1].name, dean.name);
            });
    });

    it('Gets all friends', () => {
        return chai.request(app)
            .get('/friends')
            .then(({ body }) => {
                assert.deepEqual(body, friends);
            });
    });

    it('Deletes a friend', () => {
        return chai.request(app)
            .del(`/friends/${jacy._id}`)
            .then (() => {
                return chai.request(app)
                    .get('/friends')
                    .then(( { body }) => {
                        assert.deepEqual(body, [dean]);
                    });
            });
    });

    it('Updates a friend', () => {
        dean.high = true;
        return chai.request(app)
            .put(`/friends/${dean._id}`)
            .send(dean)
            .then(res => {
                assert.deepEqual(res.request._data.high, dean.high);
            });
    });


    after(() => mongo.client.close());
});