import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Event document
export interface IEvent extends Document {
  qrCodeId: mongoose.Types.ObjectId;
  timestamp: Date;
  location?: Record<string, any>;
  device?: string;
  metadata?: Record<string, any>;
  userAgent?: string;
  ipAddress?: string;
}

// Define the Event schema
const EventSchema: Schema<IEvent> = new Schema({
  qrCodeId: {
    type: Schema.Types.ObjectId,
    ref: "QRCode",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: Schema.Types.Mixed, // Allows for an object of any structure
  },
  device: {
    type: String,
  },
  metadata: {
    type: Schema.Types.Mixed, // Allows for an object of any structure
  },
  userAgent: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
});

// Create and export the Event model
const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
