import { Document } from "mongoose";

import PaymentType from "./Payment";
import ApiItem from "./ApiItem";

export type PaypalPaymentDocument = Document<any, any, PaypalPaymentType>;

interface PaypalPaymentType extends ApiItem {
  apiId: string;
  status: string;
  payment: PaymentType["_id"];
}

export default PaypalPaymentType;
