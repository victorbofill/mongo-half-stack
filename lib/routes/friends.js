const notFound = require('./not-found');
const friend = require('../models/friend');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    friend.selectOne(id)
        .then(one => {
            res.send(one);
        });
};

const getAll = (req, res) => {
    friend.find().then(friends => {
        res.send(friends);
    });
};

const post = (req, res) => {
    friend.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const put = (req, res) => {
    friend.update(req.body).then(updated => {
        res.send(updated);
    });
};

const del = (req, res) => {
    friend.delete(req.paths[1])
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};