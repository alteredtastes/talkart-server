exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', function(table){
    table.increments();
    table.string('userid');
    table.string('instagram-url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};
