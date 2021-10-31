# PayPal IPN

This application is a simple Instant Payment Handler (IPN) for the PayPal API. It automatically saves transaction information to a MongoDB database after you receive a payment on PayPal, and it can be used to automate business workflows.

This application handles event validation and contains automated tests. However, keep in mind that it captures **all** events, so you will need to check the event type before performing any type of business logic.

## Environment Variables

Please create a `.env` file with the following environment variables:

- `DATABASE_URL`: the Mongo URL
- `PAYPAL_EMAIL`: the PayPal email associated with the Instant Payment Handler
- `USE_SANDBOX` (optional. Defaults to `false`): whether to use the sandbox API. Set this to `true` in development, and set it to `false` in production.

## Scripts

### `yarn test`

Run the tests.

### `yarn start:watch`

Start the development server.
