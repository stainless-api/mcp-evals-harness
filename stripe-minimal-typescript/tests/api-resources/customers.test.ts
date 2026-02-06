// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customers', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.customers.create();
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
      client.customers.create(
        {
          address: {
            city: 'city',
            country: 'country',
            line1: 'line1',
            line2: 'line2',
            postal_code: 'postal_code',
            state: 'state',
          },
          balance: 0,
          business_name: 'string',
          cash_balance: { settings: { reconciliation_mode: 'automatic' } },
          description: 'description',
          email: 'email',
          expand: ['string'],
          individual_name: 'string',
          invoice_prefix: 'invoice_prefix',
          invoice_settings: {
            custom_fields: [{ name: 'name', value: 'value' }],
            default_payment_method: 'default_payment_method',
            footer: 'footer',
            rendering_options: { amount_tax_display: '', template: 'template' },
          },
          metadata: { foo: 'string' },
          name: 'name',
          next_invoice_sequence: 0,
          payment_method: 'payment_method',
          phone: 'phone',
          preferred_locales: ['string'],
          shipping: {
            address: {
              city: 'city',
              country: 'country',
              line1: 'line1',
              line2: 'line2',
              postal_code: 'postal_code',
              state: 'state',
            },
            name: 'name',
            phone: 'phone',
          },
          source: 'source',
          tax: { ip_address: 'string', validate_location: 'deferred' },
          tax_exempt: '',
          tax_id_data: [{ type: 'ad_nrt', value: 'value' }],
          test_clock: 'test_clock',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.customers.list();
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
      client.customers.list(
        {
          created: {
            gt: 0,
            gte: 0,
            lt: 0,
            lte: 0,
          },
          email: 'email',
          ending_before: 'ending_before',
          expand: ['string'],
          limit: 0,
          starting_after: 'starting_after',
          test_clock: 'test_clock',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });
});
