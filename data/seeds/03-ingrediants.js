exports.seed = function (knex) {
  return knex('ingrediants').insert([
    { ingrediant_name: 'Flour', quantity: '2 ounces', recipe_id: 1 },
    { ingrediant_name: 'Eggs', quantity: '4 eggs', recipe_id: 1 },
    { ingrediant_name: 'Buns', quantity: '6 buns', recipe_id: 2 }
  ]);
};