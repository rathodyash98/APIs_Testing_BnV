import { Request, Response, NextFunction } from "express";
import Event from "../models/Event.model";
import { Types } from "mongoose";

// Define types for the query parameters
interface AnalyticsQuery {
  startDate?: string;
  endDate?: string;
}

export const getTrackedEvents = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const events = await Event.find({ qrCodeId: new Types.ObjectId(id) });

    if (!events.length) {
      return res.status(404).json({ message: "No events found for this QR Code." });
    }

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req: Request<{}, {}, {}, AnalyticsQuery>, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;

  try {
    // Build the filter object with type safety
    const filter: Record<string, any> = { qrCodeId: new Types.ObjectId(id) };

    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const events = await Event.find(filter);

    // Calculate analytics data
    const analytics = {
      totalScans: events.length,
      uniqueUsers: new Set(events.map((event) => event.metadata?.ip)).size,
      scansByDate: events.reduce((acc: Record<string, number>, event) => {
        const date = event.timestamp.toISOString().split("T")[0]; // Extract date from timestamp
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {}),
      locationStats: events.reduce((acc: Record<string, number>, event) => {
        const location = event.location || "Unknown"; // Default to "Unknown" if no location
        acc[location] = (acc[location] || 0) + 1;
        return acc;
      }, {}),
    };

    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
};
