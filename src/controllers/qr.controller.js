import Event from "../models/Event.model.js";
import QRCode from "../models/qrCode.model.js";
import { generateQRCodeImage } from "../utils/generateQRcode.util.js";
import QRCode from "qrcode";

export const generateDynamicQRCode = async (req, res, next) => {
  const { initialUrl } = req.body;
  try {
    const dynamicId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const qrImage = await generateQRCodeImage(dynamicId);
    const qrCode = await QRCode.create({ dynamicId, initialUrl, owner: req.user.id });
    res.status(201).json({ qrImage, dynamicId });
  } catch (error) {
    next(error);
  }
};

export const updateDynamicQRCode = async (req, res, next) => {
  const { id } = req.params;
  const { newUrl } = req.body;

  try {
    const qrCode = await QRCode.findOne({ dynamicId: id, owner: req.user.id });
    if (!qrCode) return res.status(404).json({ message: "QR Code not found" });

    qrCode.history.push({ url: qrCode.updatedUrl || qrCode.initialUrl, updatedAt: new Date() });
    qrCode.updatedUrl = newUrl;
    await qrCode.save();

    res.status(200).json({ message: "QR Code updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller to generate static QR code
export const generateStaticQRCode = async (req, res) => {
  try {
    const { url, metadata } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required." });
    }

    // Generate the QR code image
    const qrCodeImage = await QRCode.toDataURL(url);

    // Save the QR code details to the database
    const qrCode = await QRCodeModel.create({
      url,
      type: "static",
      metadata,
      qrCodeImage,
    });

    res.status(201).json({ message: "Static QR Code created.", qrCode });
  } catch (error) {
    res.status(500).json({ message: "Error generating QR code.", error });
  }
};


export const trackEvent = async (req, res, next) => {
  const { id } = req.params;
  const { location, device, metadata } = req.body;

  try {
    const qrCode = await QRCode.findOne({ dynamicId: id });
    if (!qrCode) return res.status(404).json({ message: "QR Code not found" });

    const event = await Event.create({ qrCodeId: qrCode._id, location, device, metadata });
    res.status(201).json({ message: "Event tracked successfully", event });
  } catch (error) {
    next(error);
  }
};


export const getMyQRCodes = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the `authMiddleware`

    // Find all QR codes belonging to the user
    const qrCodes = await QRCodeModel.find({ owner: userId });

    if (!qrCodes || qrCodes.length === 0) {
      return res.status(404).json({ message: "No QR Codes found." });
    }

    res.status(200).json({ message: "User's QR Codes fetched.", qrCodes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching QR Codes.", error });
  }
};




