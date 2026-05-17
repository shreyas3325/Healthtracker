const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addHealthLog,
  getHealthLogs,
  deleteHealthLog,
  updateHealthLog,
} = require("../controllers/healthController");


router.get("/", protect, getHealthLogs);

router.post("/", protect, addHealthLog);

router.delete("/:id", protect, deleteHealthLog);

router.put("/:id", protect, updateHealthLog);


module.exports = router;