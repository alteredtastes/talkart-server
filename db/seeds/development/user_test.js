
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([{
        username: 'test-user',
        password: 'test-pass',
        full_name: 'testfullname',
        instagram_id: 'test-ig',
      },{
        username: 'sandy',
        password: 'pass',
        full_name: '2testname',
        instagram_id: 'ofnoise',
      },{
        username: 'sandy2',
        password: 'pass2',
        full_name: '3testname',
        instagram_id: 'alteredtastes',
      },
      ])
    });
};
