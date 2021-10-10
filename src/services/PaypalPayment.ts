import PaymentRepo from "../repos/Payment";
import PaymentType from "../types/Payment";
import PaymentEvent from "../types/PaymentEvent";

class PaypalPaymentService {
  static create({ mc_gross, first_name, last_name }: PaymentEvent) {
    const payment: PaymentType = await PaymentRepo.create({ amount: mc_gross });
  }
}
