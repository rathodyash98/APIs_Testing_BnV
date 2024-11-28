import Event from "../models/Event.model.js";
import QRCode from "../models/qrCode.model.js";
import { generateQRCodeImage } from "../utils/generateQRcode.util.js";

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




