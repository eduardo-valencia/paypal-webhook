import { model, Schema } from "mongoose";

import { modelName } from "./Payment";

const schema = new Schema({
  apiId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: modelName,
    required: true,
  },
});

const PaypalPayment = model("paypalPayments", schema);

export default PaypalPayment;
