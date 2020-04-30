const db = require('../data/dbConfig');

module.exports = {
    //GET reqs
    find,
    findById,
    findFavorites,
    findIngrediants,
    findSteps,
    findStepId,
    findIngrediantId,
    findFavId,

    //POST reqs
    addRecipe,
    addStep,
    addIngrediant,
    addFavorite,

    //PUT reqs    
    updateRecipe,
    updateSteps,
    updateIngrediants,

    //DELETE reqs    
    removeRecipe,
    removeStep,
    removeIngrediant,
};

//GET reqs
function find() {
    return db('recipes');
}

function findById(id) {
    return db('recipes').where({ id }).first();
}

function findFavorites(user_id) {
    return db('recipes as r')
        .select('r.recipe_name', 'r.description', 'r.image_url')
        .join('user_recipe_favorites as f', 'f.recipes_id', '=', 'r.id')
        .where({ 'f.user_id': user_id });
}

function findFavId(id) {
    return db('user_recipe_favorites').where({ id }).first();
  }

function findIngrediants(recipe_id) {
    return db('ingrediants as i')
        .join('recipes as r', 'i.recipe_id', 'r.id')
        .select('i.ingrediant_name', 'i.quantity')
        .where({ recipe_id });
}

function findIngrediantId(id) {
    return db('ingrediants').where({ id }).first();
  }

function findSteps(recipe_id) {
    return db('steps as st')
        .join('recipes as r', 'st.recipe_id', 'r.id')
        .select('st.instructions', 'st.step_number')
        .where({ recipe_id });
}

function findStepId(id) {
    return db('steps').where({ id }).first();
  }

//POST reqs
function addRecipe(recipe) {
    return db('recipes')
        .insert(recipe, 'id')
        .then((ids) => {
            const [id] = ids;
            return findById(id);
        });
}

function addStep(step) {
    return db('steps')
        .insert(step, 'id')
        .then((ids) => {
            return findStepId(ids[0]);
        });
}

function addIngrediant(ingrediant) {
    return db('ingrediants')
        .insert(ingrediant, 'id')
        .then((ids) => {
            return findIngrediantId(ids[0]);
        });
}

function addFavorite(fav) {
    return db('user_recipe_favorites')
        .insert(fav, 'id')
        .then((ids) => {
            return findFavId(ids[0]);
        });
}

//PUT reqs
function updateRecipe(changes, id) {
    return db('recipes')
        .where({ id })
        .update(changes)
        .then(() => findById(id));
}

function updateSteps(changes, id) {
    return db('steps')
        .where({ id })
        .update(changes)
        .then(() => findStepId(id));
}

function updateIngrediants(changes, id) {
    return db('ingrediants')
        .where({ id })
        .update(changes)
        .then(() => findIngrediantId(id));
}

//DELETE reqs
function removeRecipe(id) {
    return db('recipes').where({ id }).del();
}

function removeStep(id) {
    return db('steps').where({ id }).del();
}

function removeIngrediant(id) {
    return db('ingrediants').where({ id }).del();
}