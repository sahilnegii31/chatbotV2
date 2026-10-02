const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

module.exports = app;