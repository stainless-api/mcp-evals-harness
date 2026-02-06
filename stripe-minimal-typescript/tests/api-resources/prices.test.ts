// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource prices', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.prices.create({ currency: 'currency' });
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
    const response = await client.prices.create({
      currency: 'currency',
      active: true,
      billing_scheme: 'per_unit',
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
      expand: ['string'],
      lookup_key: 'lookup_key',
      metadata: { foo: 'string' },
      nickname: 'nickname',
      product: 'product',
      product_data: {
        name: 'name',
        id: 'id',
        active: true,
        metadata: { foo: 'string' },
        statement_descriptor: 'statement_descriptor',
        tax_code: 'tax_code',
        unit_label: 'unit_label',
      },
      recurring: {
        interval: 'day',
        interval_count: 0,
        meter: 'meter',
        usage_type: 'licensed',
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
      tiers_mode: 'graduated',
      transfer_lookup_key: true,
      transform_quantity: { divide_by: 0, round: 'down' },
      unit_amount: 0,
      unit_amount_decimal: 'unit_amount_decimal',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.prices.list();
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
      client.prices.list(
        {
          active: true,
          created: {
            gt: 0,
            gte: 0,
            lt: 0,
            lte: 0,
          },
          currency: 'currency',
          ending_before: 'ending_before',
          expand: ['string'],
          limit: 0,
          lookup_keys: ['string'],
          product: 'product',
          recurring: {
            interval: 'day',
            meter: 'meter',
            usage_type: 'licensed',
          },
          starting_after: 'starting_after',
          type: 'one_time',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });
});
