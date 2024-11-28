import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  dynamicId: { 
    type: String, 
    unique: true 
    },
  initialUrl: { 
    type: String, 
    required: true 
    },
  updatedUrl: { 
    type: String 
    },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
  history: [{ url: String, updatedAt: Date }],
});

const QRCode = mongoose.model("QRCode", qrCodeSchema);
export default QRCode;
