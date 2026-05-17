const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");


const {

    addWorkout,
    getWorkouts,
    deleteWorkout,

} = require(
    "../controllers/workoutController"
);




// GET WORKOUTS
router.get(
    "/",
    protect,
    getWorkouts
);



// ADD WORKOUT
router.post(
    "/",
    protect,
    addWorkout
);



// DELETE WORKOUT
router.delete(
    "/:id",
    protect,
    deleteWorkout
);



module.exports = router;