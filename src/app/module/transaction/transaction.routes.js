const express = require("express");

const { getUserTransactions } = require("./transaction.controller");

const router = express.Router();

router.get("/:userId", getUserTransactions);

module.exports = router;
