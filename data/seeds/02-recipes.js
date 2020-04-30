exports.seed = function (knex) {
  return knex('recipes').insert([
    { user_id: 1, recipe_name: 'bake cookies', description: 'learn how to make good cookies', prep_time: '7 minutes', cook_time: '8 minutes', serving_size: '4 people'},
    { user_id: 1, recipe_name: 'hamburgers', description: 'learn how to make hamburgers', prep_time: '10 minutes', cook_time: '15 minutes', serving_size: '3 people'},
    { user_id: 2, recipe_name: 'pasta', description: 'learn how to make pasta', prep_time: '3 minutes', cook_time: '9 minutes', serving_size: '6 people'},
  ]);
};