// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource products', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.products.create({ name: 'name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.products.create({
      name: 'name',
      id: 'id',
      active: true,
      default_price_data: {
        currency: 'currency',
        currency_options: {
          foo: {
            custom_unit_amount: {
              enabled: true,
              maximum: 0,
              minimum: 0,
              preset: 0,
            },
            tax_behavior: 'exclusive',
            tiers: [
              {
                up_to: 'inf',
                flat_amount: 0,
                flat_amount_decimal: 'flat_amount_decimal',
                unit_amount: 0,
                unit_amount_decimal: 'unit_amount_decimal',
              },
            ],
            unit_amount: 0,
            unit_amount_decimal: 'unit_amount_decimal',
          },
        },
        custom_unit_amount: {
          enabled: true,
          maximum: 0,
          minimum: 0,
          preset: 0,
        },
        metadata: { foo: 'string' },
        recurring: { interval: 'day', interval_count: 0 },
        tax_behavior: 'exclusive',
        unit_amount: 0,
        unit_amount_decimal: 'unit_amount_decimal',
      },
      description: 'description',
      expand: ['string'],
      images: ['string'],
      marketing_features: [{ name: 'name' }],
      metadata: { foo: 'string' },
      package_dimensions: {
        height: 0,
        length: 0,
        weight: 0,
        width: 0,
      },
      shippable: true,
      statement_descriptor: 'statement_descriptor',
      tax_code: 'tax_code',
      unit_label: 'unit_label',
      url: 'url',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.products.list();
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
      client.products.list(
        {
          active: true,
          created: {
            gt: 0,
            gte: 0,
            lt: 0,
            lte: 0,
          },
          ending_before: 'ending_before',
          expand: ['string'],
          ids: ['string'],
          limit: 0,
          shippable: true,
          starting_after: 'starting_after',
          url: 'url',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });
});
