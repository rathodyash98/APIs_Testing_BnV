import { Request, Response, NextFunction } from "express";
import QRCodeModel from "../models/qrCode.model";
import Event from "../models/Event.model";
import QRCode from "qrcode";
import User from "../models/User.model";
import { HydratedDocument } from "mongoose";

// Generate a static QR code
export const generateStaticQRCode = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { url, metadata } = req.body;

  try {
    if (!url) {
      return res.status(400).json({ message: "URL is required." });
    }

    const qrCodeImage = await QRCode.toDataURL(url);
    const qrCode = await QRCodeModel.create({
      url,
      type: "static",
      metadata,
      qrCodeImage,
    });

    return res.status(201).json({ qrCode });
  } catch (error) {
    next(error);
  }
};

// Generate a dynamic QR code
export const generateDynamicQRCode = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { initialUrl } = req.body;

  try {
    const dynamicId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const qrCodeImage = await QRCode.toDataURL(dynamicId);

    const userId = (req.user as typeof User)._id; // Cast req.user to match User model
    const qrCode = await QRCodeModel.create({
      dynamicId,
      initialUrl,
      owner: userId,
    });

    return res.status(201).json({ qrCodeImage, dynamicId });
  } catch (error) {
    next(error);
  }
};

// Update a dynamic QR code
export const updateDynamicQRCode = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { id } = req.params;
  const { newUrl } = req.body;

  try {
    const userId = (req.user as typeof User)._id; // Cast req.user to match User model
    const qrCode = (await QRCodeModel.findOne({ dynamicId: id, owner: userId })) as HydratedDocument<IQRCode>;

    if (!qrCode) {
      return res.status(404).json({ message: "QR Code not found." });
    }

    // Ensure `history` array is initialized
    if (!qrCode.history) qrCode.history = [];

    // Safely access `initialUrl` and `updatedUrl` with proper typing
    const previousUrl = qrCode.updatedUrl || qrCode.initialUrl;
    if (!previousUrl) {
      return res.status(400).json({ message: "QR Code does not have a valid initial URL or updated URL." });
    }

    qrCode.history.push({ url: previousUrl, updatedAt: new Date() });
    qrCode.updatedUrl = newUrl;

    await qrCode.save();
    return res.status(200).json({ message: "QR Code updated successfully." });
  } catch (error) {
    next(error);
  }
};

// Track an event for a QR code scan
export const trackEvent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { id } = req.params;
  const { location, device, metadata } = req.body;

  try {
    const qrCode = await QRCodeModel.findOne({ dynamicId: id });
    if (!qrCode) {
      return res.status(404).json({ message: "QR Code not found." });
    }

    const event = await Event.create({
      qrCodeId: qrCode._id,
      location,
      device,
      metadata,
    });

    return res.status(201).json({ event });
  } catch (error) {
    next(error);
  }
};

// Get the user's QR codes
export const getMyQRCodes = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userId = (req.user as typeof User)._id; // Cast req.user to match User model
    const qrCodes = await QRCodeModel.find({ owner: userId });

    if (!qrCodes || qrCodes.length === 0) {
      return res.status(404).json({ message: "No QR Codes found." });
    }

    return res.status(200).json({ qrCodes });
  } catch (error) {
    next(error);
  }
};
