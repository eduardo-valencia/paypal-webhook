import request from "supertest";
import app from "../../app";

import PaymentEvent from "../../types/PaymentEvent";

const makeRequest = (event: PaymentEvent): request.Test => {
  return request(app).post("/paypal-webhook").send(event);
};

const validPaymentEvent: PaymentEvent = {
  txn_id: "id",
  first_name: "Eduardo",
  last_name: "Valencia",
  payer_email: "eduardo@supercoder.dev",
  payment_status: "Completed",
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

describe("When the authorization succeeds", () => {
  it("Should return a status of 200", async () => {
    testValidResponse(response);
  });

  it.todo("Should add the payment to the database");

  describe("When there is already a transaction in the database", () => {
    it.todo("Should not add it again");
  });

  describe("When there is not a transaction in database", () => {
    it.todo("Should add it");
  });
});

describe("When the authorization fails", () => {
  it("Should return 200", () => {
    testValidResponse(response);
  });

  it.todo("Should not add the payment to the database");
});
