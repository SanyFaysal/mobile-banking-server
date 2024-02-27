const express = require("express");
const { userCashIn } = require("./agent.controller");
const { verifyToken } = require("../../middleware/verifyToken");

const router = express.Router();

router.post("/user-cash-in", verifyToken, userCashIn);

module.exports = router;
