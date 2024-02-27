const express = require("express");

const {
  getUserTransactions,
  getAllUserTransactions,
  getAllAgentsTransactions,
} = require("./transaction.controller");

const router = express.Router();

router.get("/users", getAllUserTransactions);
router.get("/agents", getAllAgentsTransactions);
router.get("/user/:userId", getUserTransactions);

module.exports = router;
