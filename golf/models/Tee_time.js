const { Model } = require("objection");

class Tee_time extends Model {
  static get tableName() {
    return "tee_times";
  }

  static get relationMappings() {
    const Customer = require("./Customer");
    return {
      customers: {
        relation: Model.ManyToManyRelation,
        modelClass: Customer,
        join: {
          from: "tee_times.id",
          through: {
            // users_tee_times is the join table.
            from: "tee_times_customers.tee_time_id",
            to: "tee_times_customers.customer_id"
          },
          to: "customers.id"
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["time"],

      properties: {
        id: { type: "integer" },
        time: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = Tee_time;
