const db = require('../data/dbConfig');

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users')
        .where(filter);
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function update(changes, id) {
    return db('users')
        .where({ id })
        .update(changes)
        .then(id => {
            return findById(id);
        });
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}