import { Request, Response } from "express";
import { LP } from "../models/License";
import { LPAssigned } from "../models/LicenseAssigned";

export const getLP = async (req: Request, res: Response): Promise<any> => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 5;

  try {
    const LicensePlate = await LP.find({}).limit(limit);
    console.log("License Plates:", LicensePlate);

    if (LicensePlate.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Could not find any license plates.",
      });
    }

    return res.status(200).json({
      status: "success",
      total: LicensePlate.length,
      available: LicensePlate.filter((lp: any) => lp.status === "available")
        .length,
      assigned: LicensePlate.filter((lp: any) => lp.status === "assigned")
        .length,
      revoked: LicensePlate.filter((lp: any) => lp.status === "revoked").length,
      data: LicensePlate,
    });
  } catch (err) {
    console.error("Error fetching license plates:", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong while fetching license plates.",
    });
  }
};

export const getLPAssigned = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const LPassigned = await LPAssigned.find();

    if (LPassigned.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Could not find any license plates.",
      });
    }

    return res.status(200).json({
      status: "success",
      total: LPassigned.length,
      data: LPassigned,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error while fetching license plates assigned",
    });
  }
};

export const assignLP = async (req: Request, res: Response): Promise<any> => {
  try {
    const { vin } = req.params;

    // Check if VIN already has a license plate
    let existingLP = await LPAssigned.findOne({ vin });

    if (existingLP) {
      return res.status(200).json({
        status: "success",
        message: `licensePlate: ${existingLP.licensePlate} has already been assigned to vin: ${vin}.`,
      });
    }

    // Assign the next available license plate
    let nextAvailableLP = await LP.findOneAndUpdate(
      { status: "available" },
      { status: "assigned" },
      { new: true }
    );

    if (!nextAvailableLP) {
      return res.status(404).json({
        status: "fail",
        message: "No available license plates to assign.",
      });
    }

    const newLPAssign = new LPAssigned({
      licensePlate: nextAvailableLP.licensePlate,
      vin,
    });

    await newLPAssign.save();

    return res.status(200).json({
      status: "success",
      message: `licensePlate: ${nextAvailableLP.licensePlate} is assigned to vin: ${vin}.`, // ✅ Correct response
    });
  } catch (error) {
    // ✅ Debugging
    console.error("Error assigning license plate:", error);
    return res.status(500).json({
      status: "error",
      message: "Request timed out.",
    });
  }
};

export const revokeLP = async (req: Request, res: Response): Promise<any> => {
  try {
    const { vin } = req.params;

    // Check if VIN already has a license plate
    const existingLP = await LPAssigned.findOne({ vin: vin });

    if (existingLP) {
      // Update the LP status to revoked
      const updatedLP = await LP.findOneAndUpdate(
        { licensePlate: existingLP.licensePlate },
        { status: "revoked" },
        { new: true }
      );

      //Detele the record in LPassigned
      await LPAssigned.findOneAndDelete({ vin: vin });

      return res.status(200).json({
        status: "success",
        message: `licensePlate: ${existingLP.licensePlate} was revoked from vin: ${vin}.`,
      });
    }

    return res.status(404).json({
      status: "fail",
      message: `No license plate is associated with vin: ${vin}`,
    });
  } catch (error) {
    console.error("Error revoking license plate:", error); // ✅ Debugging
    return res.status(500).json({
      status: "error",
      message: "Request timed out.",
    });
  }
};

export const verifyLP = async (req: Request, res: Response): Promise<any> => {
  try {
    const licensePlate = req.params.licensePlate;
    console.log(licensePlate);
    const existingLP = await LPAssigned.findOne({ licensePlate: licensePlate });
    if (!existingLP) {
      return res.status(200).json({
        status: "success",
        message: `license plate: ${licensePlate} is not assigned. `,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `licensePlate: ${existingLP.licensePlate} is assigned to vin: ${existingLP.vin}.`,
    });
  } catch (err) {
    console.error("Error", err); // ✅ Debugging
    return res.status(500).json({
      status: "error",
      message: "Request timed out.",
    });
  }
};
