import PaymentType from "./Payment";
import ApiItem from "./ApiItem";

interface PaypalPayment extends ApiItem {
  apiId: string;
  status: string;
  payment: PaymentType["_id"];
}

export default PaypalPayment;
