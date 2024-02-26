const express = require("express");

const { verifyToken } = require("../../middleware/verifyToken");
const { investMoney } = require("./bank.controller");
const router = express.Router();

router.post("/invest", investMoney);

module.exports = router;
