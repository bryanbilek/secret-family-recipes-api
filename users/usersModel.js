const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findById,
    findUserRecipes,
    findUserRecipesById,
    insert,
    insertRecipe,
    update,
    updateUserRecipe,
    remove,
    removeUserRecipe
};

function find() {
    return db('users');
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function findUserRecipes(userId) {
    return db('recipes as r')
        .join('users as u', 'u.id', 'r.user_id')
        .select('r.user_id as user', 'r.id', 'r.recipe_name as name', 'r.description', 'r.prep_time', 'r.cook_time')
        .where('r.user_id', userId)
}

function findUserRecipesById(id) {
    return db('recipes')
        .where({ id })
        .first();
}

function insert(user) {
    return db('users')
        .insert(user)
        .then(ids => {
            return findById(ids[0]);
        });
}

function insertRecipe(recipe, user_id) {
    return db('recipes').insert({ ...recipe, user_id });
}

function update(id, changes) {
    return db('users')
        .where('id', id)
        .update(changes);
}

function updateUserRecipe(id, changes) {
    return db('recipes')
        .where('id', id)
        .update(changes);
}

function remove(id) {
    return db('users')
        .where('id', id)
        .del();
}

function removeUserRecipe(id) {
    return db('recipes')
        .where('id', id)
        .del();
}