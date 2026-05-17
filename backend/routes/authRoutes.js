const express = require("express");

const router = express.Router();

const {

    registerUser,
    loginUser,
    getMe,

} = require(
    "../controllers/authController"
);

const protect =
require("../middleware/authMiddleware");




// REGISTER
router.post(
    "/register",
    registerUser
);



// LOGIN
router.post(
    "/login",
    loginUser
);



// GET CURRENT USER
router.get(
    "/me",
    protect,
    getMe
);



module.exports = router;