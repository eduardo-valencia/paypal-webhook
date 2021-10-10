import PaymentType from './Payment'
import ApiItem from './ApiItem'

interface PaypalPaymentType extends ApiItem {
  apiId: string
  status: string
  payment: PaymentType['_id']
}

export default PaypalPaymentType
