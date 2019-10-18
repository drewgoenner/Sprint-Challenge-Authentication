
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'strider', password: 'woof'},
        {id: 2, username: 'christopher', password: 'hiya'},
        {id: 3, username: 'mama', password: 'hello'}
      ]);
    });
};
