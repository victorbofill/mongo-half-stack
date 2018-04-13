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

    let friend = {
        name: 'Jacy',
        role: 'Drowning out Kasey'
    };

    it('Saves a friend', () => {
        return chai.request(app)
            .post('/friends')
            .sent(friend)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, friend.name);
                friend = body;
            });
    });

    it('Gets friends', () => {
        return chai.request(app)
            .get('/friends')
            .then(({ body }) => {
                assert.deepEqual(body, [friend]);
            });
    });

    after(() => mongo.client.close());
});