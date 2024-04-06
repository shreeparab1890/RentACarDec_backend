const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateToken = require("../middleWare/validateToken.js");
const { CreateUser, GetCurrentUser, LogInUser, TestUserAPI } = require("../controllers/user");

//@desc Create User API
//@route POST user/signup
//@access Public
router.post(
  "/signup",
  [
    body("email", "Enter a Valid Email").isEmail(),

    body("password", "Password must have atlest 5 character").isLength({
      min: 5,
    }),
  ],
  CreateUser
);

//@desc LogIn User API
//@route post user/login
//@access Public
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Is Incorrect").isLength({
      min: 5,
    }),
  ],
  LogInUser
);

//@desc Test User API
//@route GET /api/v1/user
//@access Public
router.get("/", TestUserAPI);

//@desc Get Current User API
//@route GET /user
//@access Public
router.get("/getcurrentuser", validateToken, GetCurrentUser);

module.exports = router;
