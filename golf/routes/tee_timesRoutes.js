const express = require("express");
const router = express.Router();
const Tee_time = require("../models/Tee_time");

router.get("/", (req, res) => {
  Tee_time.query()
    .eager("customers")
    .then(result => res.send(result));
});

router.get("/:id", (req, res) => {
  Tee_time.query()
    .findById(req.params.id)
    .eager("customers")
    .then(result => {
      res.json(result);
    });
});

router.post("/", (req, res) => {
  Tee_time.query()
    .insert(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => res.json(err));
});

router.patch("/:id", (req, res) => {
  Tee_time.query()
    .findById(req.params.id)
    .patch(req.body)
    .returning("*")
    .then(updatedTee_time => res.json(updatedTee_time));
});

router.delete("/:id", (req, res) => {
  Tee_time.query()
    .deleteById(req.params.id)
    .returning("*")
    .then(deletedTee_time => res.json(deletedTee_time));
});

module.exports = router;
