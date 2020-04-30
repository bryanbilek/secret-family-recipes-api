exports.seed = function (knex) {
  return knex('users').insert([
    { username: 'sp33', password: 'defense' },
    { username: 'dr91', password: 'hairspray' },
    { username: 'tstark', password: 'ironman' }
  ]);
};