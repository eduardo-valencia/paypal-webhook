import PaymentRepo from '../repos/Payment'
import PaypalPaymentRepo from '../repos/PaypalPayment'
import PaymentType from '../types/Payment'
import PaymentEvent from '../types/PaymentEvent'
import PaypalPaymentType from '../types/PaypalPayment'

class PaypalPaymentService {
  static create = async ({
    mc_gross,
    first_name,
    last_name,
    payer_email,
    txn_id,
    payment_status,
  }: PaymentEvent): Promise<PaypalPaymentType> => {
    const fullName: string = `${first_name} ${last_name}`
    const payment: PaymentType = await PaymentRepo.create({
      amount: mc_gross,
      name: fullName,
      email: payer_email,
    })
    return PaypalPaymentRepo.create({
      payment: payment._id,
      apiId: txn_id,
      status: payment_status,
    })
  }
}

export default PaypalPaymentService
