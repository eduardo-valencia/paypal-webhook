import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
});

export const modelName = "payments";

const Payment = model(modelName, paymentSchema);

export default Payment;
