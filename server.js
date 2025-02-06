const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const studentRoutes = require("./routes/StudentRoutes");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Routes
app.use("/api/students", studentRoutes);

// Start the Server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
