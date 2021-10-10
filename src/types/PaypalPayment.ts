import Payment from "./Payment";
import ApiItem from "./ApiItem";

interface PaypalPayment extends ApiItem {
  apiId: string;
  status: string;
  payment: Payment["_id"];
}

export default PaypalPayment;
