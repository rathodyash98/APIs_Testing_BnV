import { Request, Response, NextFunction } from "express";
import QRCodeModel from "../models/qrCode.model";
import Event from "../models/Event.model";
import QRCode from "qrcode";
import { UserDocument } from "../models/User.model"; // Assuming UserDocument type is exported from User model

// Generate a static QR code
export const generateStaticQRCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    res.status(201).json({ qrCode });
  } catch (error) {
    next(error);
  }
};

// Generate a dynamic QR code
export const generateDynamicQRCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { initialUrl } = req.body;

  try {
    const dynamicId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const qrCodeImage = await QRCode.toDataURL(dynamicId);
    const qrCode = await QRCodeModel.create({
      dynamicId,
      initialUrl,
      owner: (req.user as UserDocument)._id, // Typing req.user for safety
    });

    res.status(201).json({ qrCodeImage, dynamicId });
  } catch (error) {
    next(error);
  }
};

// Update a dynamic QR code
export const updateDynamicQRCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { newUrl } = req.body;

  try {
    const qrCode = await QRCodeModel.findOne({ dynamicId: id, owner: (req.user as UserDocument)._id });
    if (!qrCode) {
      return res.status(404).json({ message: "QR Code not found." });
    }

    qrCode.history.push({ url: qrCode.updatedUrl || qrCode.initialUrl, updatedAt: new Date() });
    qrCode.updatedUrl = newUrl;
    await qrCode.save();

    res.status(200).json({ message: "QR Code updated successfully." });
  } catch (error) {
    next(error);
  }
};

// Track an event for a QR code scan
export const trackEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    res.status(201).json({ event });
  } catch (error) {
    next(error);
  }
};

// Get the user's QR codes
export const getMyQRCodes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req.user as UserDocument)._id; // Ensuring req.user is typed
    const qrCodes = await QRCodeModel.find({ owner: userId });

    if (!qrCodes || !qrCodes.length) {
      return res.status(404).json({ message: "No QR Codes found." });
    }

    res.status(200).json({ qrCodes });
  } catch (error) {
    next(error);
  }
};
