import request from 'supertest'
import axios from 'axios'
import { Document } from 'mongoose'

import app from '../../app'
import PaymentEvent from '../../types/PaymentEvent'
import ValidationResponse, {
  ValidationBody,
} from '../../types/ValidationResponse'
import PaypalPaymentRepo from '../../repos/PaypalPayment'
import PaypalPaymentType from '../../types/PaypalPayment'
import PaypalPaymentService from '../../services/PaypalPayment'
import keys from '../../config/keys'

jest.mock('axios')

const makeRequest = (event: PaymentEvent): request.Test => {
  return request(app).post('/paypal-webhook').send(event)
}

const validPaymentEvent: PaymentEvent = {
  txn_id: 'id',
  first_name: 'Eduardo',
  last_name: 'Valencia',
  payer_email: 'eduardo@supercoder.dev',
  payment_status: 'Completed',
  mc_gross: 1,
  receiver_email: keys.paypalEmail,
}

const sendValidRequest = (): request.Test => {
  return makeRequest(validPaymentEvent)
}

const testValidResponse = async (response: request.Response): Promise<void> => {
  expect(response.status).toEqual(200)
}

type BodyPromise = Promise<ValidationResponse>

const mockAxiosResponse = (body: ValidationBody) => {
  const bodyPromise: BodyPromise = new Promise((resolve) =>
    resolve({ data: body })
  )
  return (axios.post as unknown as jest.MockedFunction<any>).mockResolvedValue(
    bodyPromise
  )
}

type PaymentMatch = Document<PaypalPaymentType> | undefined

const findPaymentDetails = async (): Promise<PaymentMatch> => {
  return PaypalPaymentRepo.findOne({
    status: validPaymentEvent.payment_status,
    apiId: validPaymentEvent.txn_id,
  })
}

const expectToFindPaymentDetails = async () => {
  const payment: PaymentMatch = await findPaymentDetails()
  expect(payment).toBeTruthy()
}

const expectNotToFindPaymentDetails = async () => {
  const payment: PaymentMatch = await findPaymentDetails()
  expect(payment).toBeUndefined()
}

describe('When the authorization succeeds', () => {
  beforeEach(() => {
    mockAxiosResponse('VERIFIED')
  })

  it('Should return a status of 200', async () => {
    const response = await sendValidRequest()
    testValidResponse(response)
  })

  it('Should add the payment to the database', async () => {
    await sendValidRequest()
    await expectToFindPaymentDetails()
  })

  describe('When there is already a transaction in the database', () => {
    beforeEach(async () => {
      await PaypalPaymentService.create(validPaymentEvent)
    })

    it('Should not add it again', async () => {
      await sendValidRequest()
      await expectNotToFindPaymentDetails()
    })
  })

  describe('When there is not a transaction in database and the recipient email is valid', () => {
    it('Should add it', async () => {
      await sendValidRequest()
      await expectToFindPaymentDetails()
    })
  })

  describe('When the recipient email is not the expected email', () => {
    it('Should not add it to the database', async () => {
      await makeRequest({
        ...validPaymentEvent,
        payer_email: 'some other email',
      })
      await expectNotToFindPaymentDetails()
    })
  })
})

describe('When the authorization fails', () => {
  let response: request.Response = null as unknown as request.Response

  beforeAll(async () => {
    mockAxiosResponse('INVALID')
    response = await sendValidRequest()
  })

  it('Should return 200', async () => {
    testValidResponse(response)
  })

  it('Should not add the payment to the database', async () => {
    await expectNotToFindPaymentDetails()
  })
})
