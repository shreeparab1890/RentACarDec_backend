const mongoose = require("mongoose");

const { Schema } = mongoose;

const DecSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  driving_lic_num: {
    type: String,
    required: true,
  },
  rto: {
    type: String,
    required: true,
  },
  adhar: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  hired_car_num: {
    type: String,
    required: true,
  },
  rental_car_agency: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  t_a_c: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Declaration", DecSchema);
