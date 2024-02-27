const express = require("express");

const { verifyToken } = require("../../middleware/verifyToken");
const { investMoney } = require("./bank.controller");
const { authorization } = require("../../middleware/authorization");
const { userRole } = require("../../constants");
const router = express.Router();

router.post("/invest", verifyToken, authorization(userRole.admin), investMoney);

module.exports = router;
