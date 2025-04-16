const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your React app's domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, headers, etc.)
  optionsSuccessStatus: 204, // Respond to preflight requests with a 204 status code
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;
