import { FilterQuery } from 'mongoose'

import PaypalPayment from '../models/PaypalPayment'
import PaypalPaymentType, {
  PaypalPaymentDocument,
} from '../types/PaypalPayment'

type Query = FilterQuery<PaypalPaymentDocument>

class PaypalPaymentRepo {
  static create = (
    paymentInfo: Omit<PaypalPaymentType, '_id'>
  ): Promise<PaypalPaymentDocument> => {
    return new PaypalPayment(paymentInfo).save()
  }

  static findOne = async (
    query: Query
  ): Promise<PaypalPaymentDocument | undefined> => {
    return PaypalPayment.findOne(query)
  }

  static find = async (query: Query): Promise<PaypalPaymentDocument[]> => {
    return PaypalPayment.find(query)
  }
}

export default PaypalPaymentRepo
