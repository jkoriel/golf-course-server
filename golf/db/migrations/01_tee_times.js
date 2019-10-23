exports.up = function(knex) {
  return knex.schema.createTable("tee_times", function(table) {
    table.increments();
    table.string("time").notNullable();
  });
};

exports.down = function(knex, Promise) {};
