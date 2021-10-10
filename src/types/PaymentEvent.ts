interface PaymentEvent {
  first_name: string;
  last_name: string;
  payer_email: string;
  payment_status: string;
  txn_id: string;
  mc_gross: number;
}

export default PaymentEvent;
