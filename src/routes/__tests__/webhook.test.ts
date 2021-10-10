import request from "supertest";
import axios from "axios";

import app from "../../app";
import PaymentEvent from "../../types/PaymentEvent";
import ValidationResponse, {
  ValidationBody,
} from "../../types/ValidationResponse";
import PaypalPaymentRepo from "../../repos/PaypalPayment";
import PaypalPaymentType from "../../types/PaypalPayment";

jest.mock("axios");

const makeRequest = (event: PaymentEvent): request.Test => {
  return request(app).post("/paypal-webhook").send(event);
};

const validPaymentEvent: PaymentEvent = {
  txn_id: "id",
  first_name: "Eduardo",
  last_name: "Valencia",
  payer_email: "eduardo@supercoder.dev",
  payment_status: "Completed",
  mc_gross: 1,
};

let response: request.Response = null as unknown as request.Response;

const sendValidRequest = (): request.Test => {
  return makeRequest(validPaymentEvent);
};

beforeEach(async () => {
  response = await sendValidRequest();
});

const testValidResponse = async (response: request.Response): Promise<void> => {
  expect(response.status).toEqual(200);
};

type BodyPromise = Promise<ValidationResponse>;

const mockAxiosResponse = (body: ValidationBody) => {
  const bodyPromise: BodyPromise = new Promise((resolve) =>
    resolve({ data: body })
  );
  return (axios.post as unknown as jest.MockedFunction<any>).mockResolvedValue(
    bodyPromise
  );
};

type PaymentMatch = PaypalPaymentType | null;

const findValidPaymentInDatabase = async (): Promise<PaymentMatch> => {
  return PaypalPaymentRepo.findOne({
    status: validPaymentEvent.payment_status,
    apiId: validPaymentEvent.txn_id,
  });
};

describe("When the authorization succeeds", () => {
  beforeEach(() => {
    mockAxiosResponse("VERIFIED");
  });

  it("Should return a status of 200", async () => {
    testValidResponse(response);
  });

  it("Should add the payment to the database", async () => {
    const payment: PaymentMatch = await findValidPaymentInDatabase();
    expect(payment).toBeTruthy();
  });

  describe("When there is already a transaction in the database", () => {
    beforeEach(async () => {
      await PaypalPaymentRepo.create({
        status: validPaymentEvent.payment_status,
        amount: validPaymentEvent.mc_gross,
      });
    });

    it.todo("Should not add it again");
  });

  describe("When there is not a transaction in database", () => {
    it.todo("Should add it");
  });
});

describe("When the authorization fails", () => {
  beforeEach(() => {
    mockAxiosResponse("INVALID");
  });

  it("Should return 200", () => {
    testValidResponse(response);
  });

  it.todo("Should not add the payment to the database");
});
