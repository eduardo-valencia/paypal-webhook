import express, { Request, Response, Router } from 'express'
import axios from 'axios'

import { routes } from '../constants/routes'
import keys from '../config/keys'
import ValidationResponse from '../types/ValidationResponse'
import PaymentEvent from '../types/PaymentEvent'
import { PaypalPaymentDocument } from '../types/PaypalPayment'
import PaypalPaymentService from '../services/PaypalPayment'
import PaypalPaymentRepo from '../repos/PaypalPayment'

const paypalRouter: Router = express.Router({ mergeParams: true })

const getApiUrl = (): string => {
  if (keys.useSandbox) {
    return 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr'
  }
  return 'https://ipnpb.paypal.com/cgi-bin/webscr'
}

const getValidationDataBody = (body: any): string => {
  const params: URLSearchParams = new URLSearchParams({
    ...body,
    cmd: '_notify-validate',
  })
  return params.toString()
}

const validateEventDataWithPaypal = async (body: any): Promise<boolean> => {
  const apiUrl: string = getApiUrl()
  const validationDataBody: string = getValidationDataBody(body)
  const { data: validationState }: ValidationResponse = await axios.post(
    apiUrl,
    validationDataBody
  )
  return validationState === 'VERIFIED'
}

const getIfDuplicatePaymentExists = async ({
  payment_status,
  txn_id,
}: PaymentEvent): Promise<boolean> => {
  const existingPayment: PaypalPaymentDocument | undefined =
    await PaypalPaymentRepo.findOne({ status: payment_status, apiId: txn_id })
  return !existingPayment
}

const validateEventData = async (body: any): Promise<boolean> => {
  const isValid: boolean = await validateEventDataWithPaypal(body)
  if (!isValid) return false
  const validatedBody: PaymentEvent = body
  if (validatedBody.receiver_email !== keys.paypalEmail) return false
  return getIfDuplicatePaymentExists(validatedBody)
}

const addValidPayment = async (event: PaymentEvent): Promise<void> => {
  await PaypalPaymentService.create(event)
}

const handleRequest = async (req: Request, res: Response): Promise<void> => {
  res.status(200).end()
  const isValid: boolean = await validateEventData(req.body)
  if (isValid) {
    await addValidPayment(req.body)
  }
}

paypalRouter.post(routes.webhook, handleRequest)

export default paypalRouter
