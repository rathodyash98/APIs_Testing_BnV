import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the QRCode document
export interface IQRCode extends Document {
  url: string;
  type: "static" | "dynamic";
  metadata?: Record<string, any>;
  qrCodeImage?: string;
  owner?: mongoose.Types.ObjectId;
  createdAt: Date;
  history?: Array<{
    url: string;
    updatedAt: Date;
  }>;
}

// Define the QRCode schema
const QRCodeSchema: Schema<IQRCode> = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["static", "dynamic"],
    required: true,
  },
  metadata: {
    type: Schema.Types.Mixed, // Allows for an object of any structure
  },
  qrCodeImage: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  history: [
    {
      url: { type: String, required: true },
      updatedAt: { type: Date, required: true },
    },
  ], // Only for dynamic QR codes
});

// Create and export the QRCode model
const QRCode = mongoose.model<IQRCode>("QRCode", QRCodeSchema);
export default QRCode;
