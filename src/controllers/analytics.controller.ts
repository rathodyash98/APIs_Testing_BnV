import { Request, Response, NextFunction } from "express";
import Event from "../models/Event.model";

export const getTrackedEvents = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const events = await Event.find({ qrCodeId: id });
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const events = await Event.find({ qrCodeId: id });

    const analytics = events.reduce((acc: Record<string, number>, event) => {
      const location = String(event.location);
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({ analytics });
  } catch (error) {
    next(error);
  }
};
