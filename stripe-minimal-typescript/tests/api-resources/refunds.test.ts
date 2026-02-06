// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource refunds', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.refunds.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.refunds.create(
        {
          amount: 0,
          charge: 'charge',
          currency: 'currency',
          customer: 'customer',
          expand: ['string'],
          instructions_email: 'instructions_email',
          metadata: { foo: 'string' },
          origin: 'customer_balance',
          payment_intent: 'payment_intent',
          reason: 'duplicate',
          refund_application_fee: true,
          reverse_transfer: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });
});
