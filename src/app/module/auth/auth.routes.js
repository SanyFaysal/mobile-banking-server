const { findUserByEmail, signup, getAll } = require("./auth.controller");

const express = require("express");

const router = express.Router();

router.post("/register", signup);
router.post("/login", findUserByEmail);

router.get("/all/:role", getAll);
module.exports = router;
