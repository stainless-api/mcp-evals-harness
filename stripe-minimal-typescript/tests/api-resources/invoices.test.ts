// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource invoices', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.invoices.create();
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
      client.invoices.create(
        {
          account_tax_ids: ['string'],
          application_fee_amount: 0,
          auto_advance: true,
          automatic_tax: {
            enabled: true,
            liability: { type: 'account', account: 'account' },
          },
          automatically_finalizes_at: 0,
          collection_method: 'charge_automatically',
          currency: 'currency',
          custom_fields: [{ name: 'name', value: 'value' }],
          customer: 'customer',
          customer_account: 'customer_account',
          days_until_due: 0,
          default_payment_method: 'default_payment_method',
          default_source: 'default_source',
          default_tax_rates: ['string'],
          description: 'description',
          discounts: [
            {
              coupon: 'coupon',
              discount: 'discount',
              promotion_code: 'promotion_code',
            },
          ],
          due_date: 0,
          effective_at: 0,
          expand: ['string'],
          footer: 'footer',
          from_invoice: { action: 'revision', invoice: 'invoice' },
          issuer: { type: 'account', account: 'account' },
          metadata: { foo: 'string' },
          number: 'number',
          on_behalf_of: 'on_behalf_of',
          payment_settings: {
            default_mandate: 'string',
            payment_method_options: {
              acss_debit: {
                mandate_options: { transaction_type: 'business' },
                verification_method: 'automatic',
              },
              bancontact: { preferred_language: 'de' },
              card: {
                installments: {
                  enabled: true,
                  plan: {
                    type: 'bonus',
                    count: 0,
                    interval: 'month',
                  },
                },
                request_three_d_secure: 'any',
              },
              customer_balance: {
                bank_transfer: {
                  eu_bank_transfer: { country: 'country' },
                  type: 'type',
                },
                funding_type: 'funding_type',
              },
              konbini: {},
              payto: { mandate_options: { amount: 0, purpose: 'dependant_support' } },
              sepa_debit: {},
              us_bank_account: {
                financial_connections: {
                  filters: { account_subcategories: ['checking'] },
                  permissions: ['balances'],
                  prefetch: ['balances'],
                },
                verification_method: 'automatic',
              },
            },
            payment_method_types: ['ach_credit_transfer'],
          },
          pending_invoice_items_behavior: 'exclude',
          rendering: {
            amount_tax_display: '',
            pdf: { page_size: 'a4' },
            template: 'template',
            template_version: 0,
          },
          shipping_cost: {
            shipping_rate: 'shipping_rate',
            shipping_rate_data: {
              display_name: 'display_name',
              delivery_estimate: {
                maximum: { unit: 'business_day', value: 0 },
                minimum: { unit: 'business_day', value: 0 },
              },
              fixed_amount: {
                amount: 0,
                currency: 'currency',
                currency_options: { foo: { amount: 0, tax_behavior: 'exclusive' } },
              },
              metadata: { foo: 'string' },
              tax_behavior: 'exclusive',
              tax_code: 'tax_code',
              type: 'fixed_amount',
            },
          },
          shipping_details: {
            address: {
              city: 'city',
              country: 'country',
              line1: 'line1',
              line2: 'line2',
              postal_code: 'postal_code',
              state: 'state',
            },
            name: 'name',
            phone: 'string',
          },
          statement_descriptor: 'statement_descriptor',
          subscription: 'subscription',
          transfer_data: { destination: 'destination', amount: 0 },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.invoices.list();
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
      client.invoices.list(
        {
          collection_method: 'charge_automatically',
          created: {
            gt: 0,
            gte: 0,
            lt: 0,
            lte: 0,
          },
          customer: 'customer',
          customer_account: 'customer_account',
          due_date: {
            gt: 0,
            gte: 0,
            lt: 0,
            lte: 0,
          },
          ending_before: 'ending_before',
          expand: ['string'],
          limit: 0,
          starting_after: 'starting_after',
          status: 'draft',
          subscription: 'subscription',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('finalize', async () => {
    const responsePromise = client.invoices.finalize('invoice');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('finalize: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.invoices.finalize(
        'invoice',
        { auto_advance: true, expand: ['string'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });
});
