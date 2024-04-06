const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateToken = require("../middleWare/validateToken.js");
const { TestDecAPI, CreateDec } = require("../controllers/declaration.js");

router.get("/", TestDecAPI);
//@desc Create Dec API
//@route POST dec/add
//@access Public
router.post(
  "/add",
  [
    body("name", "Enter a Valid Name").isLength({
      min: 1,
    }),
    body("relation", "Enter a Valid Relation").isLength({
      min: 1,
    }),
    body("address", "Enter a Valid Address").isLength({
      min: 1,
    }),
    body("driving_lic_num", "Enter a Valid Driving Licence Number").isLength({
      min: 1,
    }),
    body("rto", "Enter a Valid Name of RTA").isLength({
      min: 1,
    }),
    body("adhar", "Enter a Valid ADHAR Card Number").isLength({
      min: 12,
    }),
    body("mobile", "Enter a Valid Mobile Number").isLength({
      min: 10,
    }),
    body("hired_car_num", "Enter a Valid Car Number").isLength({
      min: 2,
    }),
    body("rental_car_agency", "Enter a Valid Rental Car Agency Name").isLength({
      min: 2,
    }),
  ],
  CreateDec
);

module.exports = router;
