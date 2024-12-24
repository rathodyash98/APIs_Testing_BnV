import mongoose, { Schema, Document } from "mongoose";

const OrderSchema = new Schema<IOrder>({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  pricePerUnit: { type: Number, required: true, min: 0.01 },
  orderAmount: { type: Number, required: true },
  discount: { type: Number, required: true },
  finalAmount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model<IOrder>("Orders", OrderSchema);

export default OrderModel;
