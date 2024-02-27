const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./app/module/auth/auth.routes.js");
const userRoutes = require("./app/module/user/user.routes.js");
const bankRoutes = require("./app/module/bank/bank.routes.js");
const agentRoutes = require("./app/module/agent/agent.routes.js");

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/bank", bankRoutes);
app.use("/api/v1/agent", agentRoutes);

module.exports = app;
