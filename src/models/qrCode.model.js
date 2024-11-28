import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  url: {
     type: String, 
     required: true
     },
  type: { 
    type: String, enum: ["static", "dynamic"], 
    required: true 
    },
  metadata: {
     type: Object 
    },
  qrCodeImage: {
     type: String 
    },
  owner: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "User" 
    },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  history: [{
    url: String, updatedAt: Date 
  }], // Only for dynamic QR codes
});

const QRCode = mongoose.model("QRCode", qrCodeSchema);
export default QRCode;
