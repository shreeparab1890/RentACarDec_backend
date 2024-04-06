const { validationResult, matchedData } = require("express-validator");
const Declaration = require("../models/Declaration");
const logger = require("../config/logger.js");

const TestDecAPI = async (req, res) => {
  return res.status(200).send("User API test successfull");
};

//@desc Create Dec API
//@route POST dec/add
//@access Public
const CreateDec = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  console.log(data);
  await Declaration.create({
    name: data.name,
    relation: data.relation,
    address: data.address,
    driving_lic_num: data.driving_lic_num,
    rto: data.rto,
    adhar: data.adhar,
    mobile: data.mobile,
    hired_car_num: data.hired_car_num,
    rental_car_agency: data.rental_car_agency,
  })
    .then((dec) => {
      logger.info(`${ip}: API /api/v1/dec/add  responnded with Success `);
      return res.status(201).json({ result: dec });
    })
    .catch((err) => {
      logger.error(`${ip}: API /api/v1/dec/add  responnded with Error `);
      return res.status(500).json({ message: err.message });
    });
};

module.exports = {
  CreateDec,
  TestDecAPI,
};
