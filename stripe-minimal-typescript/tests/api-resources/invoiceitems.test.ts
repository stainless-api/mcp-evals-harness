// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource invoiceitems', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.invoiceitems.create();
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
      client.invoiceitems.create(
        {
          amount: 0,
          currency: 'currency',
          customer: 'customer',
          customer_account: 'customer_account',
          description: 'description',
          discountable: true,
          discounts: [
            {
              coupon: 'coupon',
              discount: 'discount',
              promotion_code: 'promotion_code',
            },
          ],
          expand: ['string'],
          invoice: 'invoice',
          metadata: { foo: 'string' },
          period: { end: 0, start: 0 },
          price_data: {
            currency: 'currency',
            product: 'product',
            tax_behavior: 'exclusive',
            unit_amount: 0,
            unit_amount_decimal: 'unit_amount_decimal',
          },
          pricing: { price: 'price' },
          quantity: 0,
          subscription: 'subscription',
          tax_behavior: 'exclusive',
          tax_code: 'string',
          tax_rates: ['string'],
          unit_amount_decimal: 'unit_amount_decimal',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });
});
