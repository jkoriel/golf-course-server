const { Model } = require("objection");

class Customer extends Model {
  static get tableName() {
    return "customers";
  }

  static get relationMappings() {
    const Tee_time = require("./Tee_time");

    return {
      tee_times: {
        relation: Model.ManyToManyRelation,
        modelClass: Tee_time,
        join: {
          from: "customers.id",
          through: {
            // customers_tee_times is the join table.
            from: "tee_times_customers.customer_id",
            to: "tee_times_customers.tee_time_id"
          },
          to: "tee_times.id"
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "company",
        "email",
        "phone",
        "address",
        "created_at",
        "updated_at"
      ],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        company: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        phone: { type: "string", minLength: 1, maxLength: 255 },
        address: { type: "string", minLength: 1, maxLength: 255 },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = Customer;
