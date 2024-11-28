import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  qrCodeId: { type: mongoose.Schema.Types.ObjectId,
     ref: "QRCode", required: true
     },
  timestamp: { type: Date, default: Date.now },
  location: { type: Object },
  device: { type: String },
  metadata: { type: Object },
  userAgent: { type: String },
  ipAddress: { type: String }
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
