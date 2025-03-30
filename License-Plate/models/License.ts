import mongoose from "mongoose";

const LPSchema = new mongoose.Schema(
  {
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "revoked", "assigned"],
      default: "available",
    },

    dateCreated: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { collection: "License" }
);

export const LP = mongoose.model("LP", LPSchema);
