import { Request, Response } from "express";

export const uploadToYoutube = (req: Request, res: Response): void => {
  res.status(200).json({
    hello: "World",
  });
};
