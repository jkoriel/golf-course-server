exports.up = function(knex) {
  return knex.schema.createTable("tee_times_appointments", function(table) {
    table.increments();
    table
      .integer("customer_id")
      .references("id")
      .inTable("customers");
    table
      .integer("tee_time_id")
      .references("id")
      .inTable("tee_times");
  });
};

exports.down = function(knex, Promise) {};
