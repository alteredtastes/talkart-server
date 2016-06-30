exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', function(table){
    table.increments();
    table.string('user_id');
    table.string('photo_urls_instagram').unique();
    table.integer('photo_time_instagram');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};
