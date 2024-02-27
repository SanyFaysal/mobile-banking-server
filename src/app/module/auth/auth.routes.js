const { userRole } = require("../../constants");
const { authorization } = require("../../middleware/authorization");
const { verifyToken } = require("../../middleware/verifyToken");
const { findUserByEmail, signup, getAll, getMe } = require("./auth.controller");

const express = require("express");

const router = express.Router();

router.post("/register", signup);
router.post("/login", findUserByEmail);
router.get("/me", verifyToken, getMe);

router.get("/all/:role", verifyToken, authorization(userRole.admin), getAll);
module.exports = router;
