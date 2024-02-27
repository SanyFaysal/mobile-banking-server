const express = require("express");

const {
  getUserTransactions,
  getAllUserTransactions,
  getAllAgentsTransactions,
} = require("./transaction.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const { authorization } = require("../../middleware/authorization");
const { userRole } = require("../../constants");

const router = express.Router();

router.get(
  "/users",
  verifyToken,
  authorization(userRole.admin),
  getAllUserTransactions
);
router.get(
  "/agents",
  verifyToken,
  authorization(userRole.admin),
  getAllAgentsTransactions
);
router.get("/user/:userId", verifyToken, getUserTransactions);

module.exports = router;
