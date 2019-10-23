const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/", (req, res) => {
  Customer.query()
    .eager("tee_times")
    .then(result => res.send(result));
});

router.get("/:id", (req, res) => {
  Customer.query()
    .findById(req.params.id)
    .eager("tee_times")
    .then(result => res.json(result));
});

router.post("/", (req, res) => {
  Customer.query()
    .insert(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

router.patch("/:id", (req, res) => {
  Customer.query()
    .findById(req.params.id)
    .patch(req.body)
    .returning("*")
    .then(updatedCustomer => res.json(updatedCustomer));
});

router.delete("/:id", (req, res) => {
  Customer.query()
    .deleteById(req.params.id)
    .returning("*")
    .then(deletedCustomer => res.json(deletedCustomer));
});

module.exports = router;
