const Workout = require("../models/Workout");



/* =========================
   ADD WORKOUT
========================= */

const addWorkout = async (req, res) => {

    try{

        const {

            workoutName,
            category,
            duration,
            caloriesBurned,

        } = req.body;


        const workout =
        await Workout.create({

            user:req.user._id,

            workoutName,

            category,

            duration,

            caloriesBurned,

        });


        res.status(201).json(workout);

    }catch(error){

        res.status(500).json({
            message:error.message,
        });

    }

};





/* =========================
   GET WORKOUTS
========================= */

const getWorkouts = async (req, res) => {

    try{

        const workouts =
        await Workout.find({

            user:req.user._id,

        });


        res.json(workouts);

    }catch(error){

        res.status(500).json({
            message:error.message,
        });

    }

};





/* =========================
   DELETE WORKOUT
========================= */

const deleteWorkout = async (req, res) => {

    try{

        const workout =
        await Workout.findById(
            req.params.id
        );


        if(!workout){

            return res.status(404).json({
                message:"Workout not found",
            });

        }


        await workout.deleteOne();


        res.json({
            message:"Workout deleted",
        });

    }catch(error){

        res.status(500).json({
            message:error.message,
        });

    }

};




module.exports = {

    addWorkout,

    getWorkouts,

    deleteWorkout,

};