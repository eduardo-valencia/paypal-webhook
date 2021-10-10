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

const sendValidRequest = (): request.Test => {
  return makeRequest(validPaymentEvent);
};

it("Should return a status of 200", async () => {
  const response = await sendValidRequest();
  expect(response.status).toEqual(200);
});
