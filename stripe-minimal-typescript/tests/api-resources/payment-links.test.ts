// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource paymentLinks', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.paymentLinks.create({ line_items: [{ quantity: 0 }] });
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
    const response = await client.paymentLinks.create({
      line_items: [
        {
          quantity: 0,
          adjustable_quantity: {
            enabled: true,
            maximum: 0,
            minimum: 0,
          },
          price: 'price',
          price_data: {
            currency: 'currency',
            product: 'product',
            product_data: {
              name: 'name',
              description: 'description',
              images: ['string'],
              metadata: { foo: 'string' },
              tax_code: 'tax_code',
              unit_label: 'unit_label',
            },
            recurring: { interval: 'day', interval_count: 0 },
            tax_behavior: 'exclusive',
            unit_amount: 0,
            unit_amount_decimal: 'unit_amount_decimal',
          },
        },
      ],
      after_completion: {
        type: 'hosted_confirmation',
        hosted_confirmation: { custom_message: 'custom_message' },
        redirect: { url: 'url' },
      },
      allow_promotion_codes: true,
      application_fee_amount: 0,
      application_fee_percent: 0,
      automatic_tax: {
        enabled: true,
        liability: { type: 'account', account: 'account' },
      },
      billing_address_collection: 'auto',
      consent_collection: {
        payment_method_reuse_agreement: { position: 'auto' },
        promotions: 'auto',
        terms_of_service: 'none',
      },
      currency: 'currency',
      custom_fields: [
        {
          key: 'key',
          label: { custom: 'custom', type: 'custom' },
          type: 'dropdown',
          dropdown: { options: [{ label: 'label', value: 'value' }], default_value: 'default_value' },
          numeric: {
            default_value: 'default_value',
            maximum_length: 0,
            minimum_length: 0,
          },
          optional: true,
          text: {
            default_value: 'default_value',
            maximum_length: 0,
            minimum_length: 0,
          },
        },
      ],
      custom_text: {
        after_submit: { message: 'message' },
        shipping_address: { message: 'message' },
        submit: { message: 'message' },
        terms_of_service_acceptance: { message: 'message' },
      },
      customer_creation: 'always',
      expand: ['string'],
      inactive_message: 'inactive_message',
      invoice_creation: {
        enabled: true,
        invoice_data: {
          account_tax_ids: ['string'],
          custom_fields: [{ name: 'name', value: 'value' }],
          description: 'description',
          footer: 'footer',
          issuer: { type: 'account', account: 'account' },
          metadata: { foo: 'string' },
          rendering_options: { amount_tax_display: '', template: 'template' },
        },
      },
      metadata: { foo: 'string' },
      name_collection: {
        business: { enabled: true, optional: true },
        individual: { enabled: true, optional: true },
      },
      on_behalf_of: 'on_behalf_of',
      optional_items: [
        {
          price: 'price',
          quantity: 0,
          adjustable_quantity: {
            enabled: true,
            maximum: 0,
            minimum: 0,
          },
        },
      ],
      payment_intent_data: {
        capture_method: 'automatic',
        description: 'description',
        metadata: { foo: 'string' },
        setup_future_usage: 'off_session',
        statement_descriptor: 'statement_descriptor',
        statement_descriptor_suffix: 'statement_descriptor_suffix',
        transfer_group: 'transfer_group',
      },
      payment_method_collection: 'always',
      payment_method_types: ['affirm'],
      phone_number_collection: { enabled: true },
      restrictions: { completed_sessions: { limit: 0 } },
      shipping_address_collection: { allowed_countries: ['AC'] },
      shipping_options: [{ shipping_rate: 'shipping_rate' }],
      submit_type: 'auto',
      subscription_data: {
        description: 'description',
        invoice_settings: { issuer: { type: 'account', account: 'account' } },
        metadata: { foo: 'string' },
        trial_period_days: 0,
        trial_settings: { end_behavior: { missing_payment_method: 'cancel' } },
      },
      tax_id_collection: { enabled: true, required: 'if_supported' },
      transfer_data: { destination: 'destination', amount: 0 },
    });
  });
});
