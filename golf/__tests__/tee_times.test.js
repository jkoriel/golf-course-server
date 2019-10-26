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

describe("the tee_times entity routes", () => {
  describe("get all tee_times", () => {
    it("should fetch all tee_times successfully", async () => {
      const res = await request(app).get("/tee_times");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(500);
    });
  });
});

describe("get one tee_time", () => {
  it("should fetch one tee_time successfully", async () => {
    const id = 1;
    const res = await request(app).get(`/tee_times/${id}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(1);
  });
});

describe("add one tee_time", () => {
  it("should add one tee_time successfully", async () => {
    const newTeeTime = {
      time: "some time here"
    };
    const res = await request(app)
      .post("/tee_times")
      .send(newTeeTime);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(501);
  });
});

describe("update one tee_time", () => {
  it("should update one tee_time successfully", async () => {
    // Setup
    const id = 1;
    const updatedTeeTime = {
      time: "updated time here"
    };

    // Do the work
    const res = await request(app)
      .patch(`/tee_times/${id}`)
      .send(updatedTeeTime);

    // Test the response
    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(1);

    // Test the database
    const teeTime = await knex("tee_times");
    expect(teeTime.find(({ time }) => time === "updated time here"));
  });
});

describe("remove one tee_time", () => {
  it("should remove one tee_time successfully", async () => {
    const id = 1;
    const res = await request(app).delete(`/tee_times/${id}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(1);

    const teeTimes = await knex("tee_times");
    expect(teeTimes[0].id).toEqual(2);
  });
});
