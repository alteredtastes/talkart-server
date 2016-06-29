
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'test-user', password: 'test-pass', instagram_id: 'test-ig'},
        {username: 'sandy', password: 'pass', instagram_id: 'ofnoise'},
        {username: 'sandy2', password: 'pass2', instagram_id: 'alteredtastes'},
      ])
    });
};
