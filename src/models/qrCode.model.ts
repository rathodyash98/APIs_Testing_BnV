import mongoose, { Schema, Document } from "mongoose";

export interface IQRCode extends Document {
  url?: string;
  type: "static" | "dynamic";
  metadata?: Record<string, any>;
  qrCodeImage?: string;
  dynamicId?: string;
  owner?: mongoose.Types.ObjectId;
  initialUrl?: string; // Ensure initialUrl is included
  updatedUrl?: string;
  history?: { url: string; updatedAt: Date }[];
}

const QRCodeSchema = new Schema<IQRCode>({
  url: { type: String },
  type: { type: String, enum: ["static", "dynamic"], required: true },
  metadata: { type: Object },
  qrCodeImage: { type: String },
  dynamicId: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  initialUrl: { type: String }, // Include initialUrl in the schema
  updatedUrl: { type: String },
  history: [
    {
      url: { type: String },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

const QRCodeModel = mongoose.model<IQRCode>("QRCode", QRCodeSchema);
export default QRCodeModel;
