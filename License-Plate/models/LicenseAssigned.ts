import mongoose from "mongoose";

const LPAssignedSchema = new mongoose.Schema(
  {
    licensePlate: {
      type: String,
      require: true,
      unique: true,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "License-Assigned" }
);

export const LPAssigned = mongoose.model("LPAssigned", LPAssignedSchema);
