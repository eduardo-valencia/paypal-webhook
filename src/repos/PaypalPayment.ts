import { FilterQuery } from 'mongoose'

import PaypalPayment from '../models/PaypalPayment'
import PaypalPaymentType, {
  PaypalPaymentDocument,
} from '../types/PaypalPayment'

class PaypalPaymentRepo {
  static create = (
    paymentInfo: Omit<PaypalPaymentType, '_id'>
  ): Promise<PaypalPaymentDocument> => {
    return new PaypalPayment(paymentInfo).save()
  }

  static findOne = async (
    query: FilterQuery<PaypalPaymentDocument>
  ): Promise<PaypalPaymentDocument | undefined> => {
    return PaypalPayment.findOne(query)
  }
}

export default PaypalPaymentRepo
