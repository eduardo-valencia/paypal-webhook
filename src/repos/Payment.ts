import Payment from '../models/Payment'
import PaymentType from '../types/Payment'

class PaymentRepo {
  static create = (payment: Omit<PaymentType, '_id'>): Promise<PaymentType> => {
    return new Payment(payment).save()
  }
}

export default PaymentRepo
