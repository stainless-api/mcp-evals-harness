// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource coupons', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.coupons.create();
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
      client.coupons.create(
        {
          id: 'id',
          amount_off: 0,
          applies_to: { products: ['string'] },
          currency: 'currency',
          currency_options: { foo: { amount_off: 0 } },
          duration: 'forever',
          duration_in_months: 0,
          expand: ['string'],
          max_redemptions: 0,
          metadata: { foo: 'string' },
          name: 'name',
          percent_off: 0,
          redeem_by: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.coupons.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.coupons.list(
        {
          created: {
            gt: 0,
            gte: 0,
            lt: 0,
            lte: 0,
          },
          ending_before: 'ending_before',
          expand: ['string'],
          limit: 0,
          starting_after: 'starting_after',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });
});
