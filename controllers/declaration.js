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
    t_a_c: data.t_a_c,
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

//@desc Get User by ID API
//@route GET /api/v1/user/get/:id
//@access Public
const GetDecById = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  const decId = req.params.id;
  if (!decId) {
    logger.error(`${ip}: API /api/v1/dec/get/:id  responnded decId required `);
    return res.status(400).json("Declaration Id  requierd");
  }

  try {
    const declaration = await Declaration.findById({ _id: decId });

    logger.info(
      `${ip}: API /api/v1/dec/get/:id | responnded with "Declaration retrived succesfully" `
    );
    return res.status(201).json(declaration);
  } catch {
    logger.error(
      `${ip}: API /api/v1/dec/get/:id  responnded with Declaration not found `
    );
    return res.status(500).json({ e: "Declaration not found" });
  }
};

//@desc Get User by ID API
//@route GET /api/v1/user/get/:id
//@access Public
const GetAllDec = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  try {
    const declarations = await Declaration.find({ active: true });

    logger.info(
      `${ip}: API /api/v1/dec/get/all | responnded with "Declaration retrived succesfully" `
    );
    return res.status(201).json(declarations);
  } catch {
    logger.error(`${ip}: API /api/v1/dec/get/all  responnded with error`);
    return res.status(500).json({ e: "Error" });
  }
};

module.exports = {
  CreateDec,
  TestDecAPI,
  GetDecById,
  GetAllDec,
};
