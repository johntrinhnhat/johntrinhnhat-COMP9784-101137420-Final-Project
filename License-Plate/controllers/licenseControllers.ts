import { Request, Response } from "express";

export const assignLP = async (req: Request, res: Response): Promise<any> => {
  const Vin = req.params.vin;
  console.log(Vin);
};

export const verifyLP = async (req: Request, res: Response): Promise<any> => {};

export const revokeLP = async (req: Request, res: Response): Promise<any> => {};
