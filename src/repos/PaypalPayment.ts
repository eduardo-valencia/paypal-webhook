import { FilterQuery } from "mongoose";

import PaypalPayment from "../models/PaypalPayment";
import PaypalPaymentType from "../types/PaypalPayment";

class PaypalPaymentRepo {
  static create = (
    paymentInfo: Omit<PaypalPaymentType, "_id">
  ): PaypalPaymentType => {
    return new PaypalPayment(paymentInfo).save();
  };

  static findOne = async (
    query: FilterQuery<any>
  ): Promise<PaypalPaymentType | null> => {
    return PaypalPayment.findOne(query);
  };
}

export default PaypalPaymentRepo;
