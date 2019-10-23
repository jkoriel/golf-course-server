exports.up = function(knex) {
  return knex.schema.createTable("customers", function(table) {
    table.increments();
    table.string("name").notNullable();
    table.string("company").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("address").notNullable();
    table.string("created_at").notNullable();
    table.string("updated_at").notNullable();
  });
};

exports.down = function(knex, Promise) {};
