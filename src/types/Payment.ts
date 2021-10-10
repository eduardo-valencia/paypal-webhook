import ApiItem from "./ApiItem";

interface Payment extends ApiItem {
  name?: string;
  amount: number;
  email?: string;
}

export default Payment;
