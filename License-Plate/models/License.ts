import mongoose from "mongoose";

const LicenseSchema = new mongoose.Schema({
  licensePlate: {
    type: String,
    require: true,
    unique: true,
    match: /^[A-Z]{4}[0-9]{3}$/, // 4 uppercase letters followed by 3 digits
  },
  vin: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-HJ-NPR-Z0-9]{17}$/, // 17 in length, alpha numeric but not {I, O, Q}
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
