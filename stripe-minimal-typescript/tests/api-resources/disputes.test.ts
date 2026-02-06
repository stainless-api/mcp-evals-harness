// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Stripe from '@stainless-commons/stripe-minimal';

const client = new Stripe({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource disputes', () => {
  // Prism tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.disputes.update('dispute');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.disputes.update(
        'dispute',
        {
          evidence: {
            access_activity_log: 'access_activity_log',
            billing_address: 'billing_address',
            cancellation_policy: 'cancellation_policy',
            cancellation_policy_disclosure: 'cancellation_policy_disclosure',
            cancellation_rebuttal: 'cancellation_rebuttal',
            customer_communication: 'customer_communication',
            customer_email_address: 'customer_email_address',
            customer_name: 'customer_name',
            customer_purchase_ip: 'customer_purchase_ip',
            customer_signature: 'customer_signature',
            duplicate_charge_documentation: 'duplicate_charge_documentation',
            duplicate_charge_explanation: 'duplicate_charge_explanation',
            duplicate_charge_id: 'duplicate_charge_id',
            enhanced_evidence: {
              visa_compelling_evidence_3: {
                disputed_transaction: {
                  customer_account_id: 'string',
                  customer_device_fingerprint: 'string',
                  customer_device_id: 'string',
                  customer_email_address: 'string',
                  customer_purchase_ip: 'string',
                  merchandise_or_services: 'merchandise',
                  product_description: 'string',
                  shipping_address: {
                    city: 'string',
                    country: 'string',
                    line1: 'string',
                    line2: 'string',
                    postal_code: 'string',
                    state: 'string',
                  },
                },
                prior_undisputed_transactions: [
                  {
                    charge: 'charge',
                    customer_account_id: 'string',
                    customer_device_fingerprint: 'string',
                    customer_device_id: 'string',
                    customer_email_address: 'string',
                    customer_purchase_ip: 'string',
                    product_description: 'string',
                    shipping_address: {
                      city: 'string',
                      country: 'string',
                      line1: 'string',
                      line2: 'string',
                      postal_code: 'string',
                      state: 'string',
                    },
                  },
                ],
              },
              visa_compliance: { fee_acknowledged: true },
            },
            product_description: 'product_description',
            receipt: 'receipt',
            refund_policy: 'refund_policy',
            refund_policy_disclosure: 'refund_policy_disclosure',
            refund_refusal_explanation: 'refund_refusal_explanation',
            service_date: 'service_date',
            service_documentation: 'service_documentation',
            shipping_address: 'shipping_address',
            shipping_carrier: 'shipping_carrier',
            shipping_date: 'shipping_date',
            shipping_documentation: 'shipping_documentation',
            shipping_tracking_number: 'shipping_tracking_number',
            uncategorized_file: 'uncategorized_file',
            uncategorized_text: 'uncategorized_text',
          },
          expand: ['string'],
          metadata: { foo: 'string' },
          submit: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.disputes.list();
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
      client.disputes.list(
        {
          charge: 'charge',
          created: {
            gt: 0,
            gte: 0,
            lt: 0,
            lte: 0,
          },
          ending_before: 'ending_before',
          expand: ['string'],
          limit: 0,
          payment_intent: 'payment_intent',
          starting_after: 'starting_after',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Stripe.NotFoundError);
  });
});
