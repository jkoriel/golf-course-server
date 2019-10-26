const request = require("supertest");
const { app } = require("../server");
const knex = require("../db/knex");
const knexCleaner = require("knex-cleaner");

beforeEach(() => {
  return knexCleaner
    .clean(knex, {
      ignoreTables: ["knex_migrations", "knex_migrations_lock"]
    })
    .then(() => knex.seed.run());
});

describe("the customers entity routes", () => {
  describe("get all customers", () => {
    it("should fetch all customers successfully", async () => {
      const res = await request(app).get("/customers");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(300);
    });
  });
});

describe("get one customer", () => {
  it("should fetch one customer successfully", async () => {
    const id = 1;
    const res = await request(app).get(`/customers/${id}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(1);
  });
});

describe("add one customer", () => {
  it("should add one custsomer successfully", async () => {
    const newCustomer = {
      name: "something",
      company: "something",
      email: "something",
      phone: "something",
      address: "something",
      created_at: "something",
      updated_at: "something"
    };
    const res = await request(app)
      .post("/customers")
      .send(newCustomer);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(301);
  });
});

describe("update one customer", () => {
  it("should update one customer successfully", async () => {
    // Setup
    const id = 1;
    const updatedCustomer = {
      name: "Joe",
      company: "something",
      email: "something",
      phone: "something",
      address: "something",
      created_at: "something",
      updated_at: "something"
    };

    // Do the work
    const res = await request(app)
      .patch(`/customers/${id}`)
      .send(updatedCustomer);

    // Test the response
    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(1);

    // Test the database
    const customers = await knex("customers");
    expect(customers.find(({ name }) => name === "Joe"));
  });
});

describe("remove one customer", () => {
  it("should remove one customer successfully", async () => {
    const id = 1;
    const res = await request(app).delete(`/customers/${id}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(1);

    const customers = await knex("customers");
    expect(customers[0].id).toEqual(2);
  });
});
