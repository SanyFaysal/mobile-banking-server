const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./app/module/auth/auth.routes.js");

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);

module.exports = app;
