import ApiItem from "./ApiItem";

interface PaymentType extends ApiItem {
  name?: string;
  amount: number;
  email?: string;
}

export default PaymentType;
