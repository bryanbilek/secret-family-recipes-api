exports.seed = function (knex) {
  return knex('steps').insert([
    { step_number: 1, instructions: 'Preheat oven to 350 degrees', recipe_id: 1 },
    { step_number: 2, instructions: 'Mix flour and eggs', recipe_id: 1 },
    { step_number: 3, instructions: 'Put in oven', recipe_id: 1 },
    { step_number: 1, instructions: 'Start grill', recipe_id: 1 }
  ]);
};