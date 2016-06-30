exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('full_name').notNullable();
    table.string('instagram_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
