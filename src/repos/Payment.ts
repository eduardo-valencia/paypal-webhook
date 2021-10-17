import { Document, FilterQuery } from "mongoose";

import Payment from "../models/Payment";
import PaymentType from "../types/Payment";

type PaymentTypeDocument = Document<any, any, PaymentType>;
type Query = FilterQuery<PaymentTypeDocument>;

class PaymentRepo {
  static create = (
    payment: Omit<PaymentType, "_id">
  ): Promise<PaymentTypeDocument> => {
    return new Payment(payment).save();
  };

  static findOne = async (query: Query): Promise<PaymentTypeDocument> => {
    return Payment.findOne(query);
  };
}

export default PaymentRepo;
