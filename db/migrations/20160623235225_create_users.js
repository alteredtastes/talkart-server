exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('full_name').notNullable();
    table.string('instagram_id');
    table.string('instagram_username');
    table.string('instagram_profile_pic');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
