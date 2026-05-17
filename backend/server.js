const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

const protect = require("./middleware/authMiddleware");


dotenv.config();

connectDB();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// AUTH ROUTES
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);


// HEALTH LOG ROUTES
app.use(
  "/api/healthlogs",
  require("./routes/healthRoutes")
);


// WORKOUT ROUTES
app.use(
  "/api/workouts",
  require("./routes/workoutRoutes")
);


// TEST PROTECTED ROUTE
app.get("/api/private", protect, (req, res) => {

  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });

});


app.get("/", (req, res) => {
  res.send("Server Running");
});


app.listen(5000, () => {
  console.log("Server Started");
});