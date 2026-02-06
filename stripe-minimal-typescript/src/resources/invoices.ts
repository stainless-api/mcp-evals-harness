// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvoicesAPI from './invoices';
import * as AccountsAPI from './accounts';
import * as CouponsAPI from './coupons';
import * as CustomersAPI from './customers';
import * as DisputesAPI from './disputes';
import * as PaymentIntentsAPI from './payment-intents';
import * as PricesAPI from './prices';
import * as Shared from './shared';
import * as SubscriptionsAPI from './subscriptions';
import { APIPromise } from '../core/api-promise';
import { MyCursorIDPage, type MyCursorIDPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Invoices extends APIResource {
  /**
   * <p>This endpoint creates a draft invoice for a given customer. The invoice remains a draft until you <a href="#finalize_invoice">finalize</a> the invoice, which allows you to <a href="/api/invoices/pay">pay</a> or <a href="/api/invoices/send">send</a> the invoice to your customers.</p>
   */
  create(body: InvoiceCreateParams | null | undefined = {}, options?: RequestOptions): APIPromise<Invoice> {
    return this._client.post('/v1/invoices', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * <p>You can list all invoices, or list the invoices for a specific customer. The invoices are returned sorted by creation date, with the most recently created invoices appearing first.</p>
   */
  list(
    query: InvoiceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InvoicesMyCursorIDPage, Invoice> {
    return this._client.getAPIList('/v1/invoices', MyCursorIDPage<Invoice>, { query, ...options });
  }

  /**
   * <p>Stripe automatically finalizes drafts before sending and attempting payment on invoices. However, if you’d like to finalize a draft invoice manually, you can do so using this method.</p>
   */
  finalize(
    invoice: string,
    body: InvoiceFinalizeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Invoice> {
    return this._client.post(path`/v1/invoices/${invoice}/finalize`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }
}

export type InvoicesMyCursorIDPage = MyCursorIDPage<Invoice>;

export interface APIErrors {
  /**
   * The type of error returned. One of `api_error`, `card_error`,
   * `idempotency_error`, or `invalid_request_error`
   */
  type: 'api_error' | 'card_error' | 'idempotency_error' | 'invalid_request_error';

  /**
   * For card errors resulting from a card issuer decline, a short string indicating
   * [how to proceed with an error](https://docs.stripe.com/declines#retrying-issuer-declines)
   * if they provide one.
   */
  advice_code?: string;

  /**
   * For card errors, the ID of the failed charge.
   */
  charge?: string;

  /**
   * For some errors that could be handled programmatically, a short string
   * indicating the [error code](https://docs.stripe.com/error-codes) reported.
   */
  code?: string;

  /**
   * For card errors resulting from a card issuer decline, a short string indicating
   * the
   * [card issuer's reason for the decline](https://docs.stripe.com/declines#issuer-declines)
   * if they provide one.
   */
  decline_code?: string;

  /**
   * A URL to more information about the
   * [error code](https://docs.stripe.com/error-codes) reported.
   */
  doc_url?: string;

  /**
   * A human-readable message providing more details about the error. For card
   * errors, these messages can be shown to your users.
   */
  message?: string;

  /**
   * For card errors resulting from a card issuer decline, a 2 digit code which
   * indicates the advice given to merchant by the card network on how to proceed
   * with an error.
   */
  network_advice_code?: string;

  /**
   * For payments declined by the network, an alphanumeric code which indicates the
   * reason the payment failed.
   */
  network_decline_code?: string;

  /**
   * If the error is parameter-specific, the parameter related to the error. For
   * example, you can use this to display a message near the correct form field.
   */
  param?: string;

  /**
   * A PaymentIntent guides you through the process of collecting a payment from your
   * customer. We recommend that you create exactly one PaymentIntent for each order
   * or customer session in your system. You can reference the PaymentIntent later to
   * see the history of payment attempts for a particular session.
   *
   * A PaymentIntent transitions through
   * [multiple statuses](/payments/paymentintents/lifecycle) throughout its lifetime
   * as it interfaces with Stripe.js to perform authentication flows and ultimately
   * creates at most one successful charge.
   *
   * Related guide:
   * [Payment Intents API](https://docs.stripe.com/payments/payment-intents)
   */
  payment_intent?: PaymentIntentsAPI.PaymentIntent;

  /**
   * PaymentMethod objects represent your customer's payment instruments. You can use
   * them with [PaymentIntents](https://docs.stripe.com/payments/payment-intents) to
   * collect payments or save them to Customer objects to store instrument details
   * for future payments.
   *
   * Related guides:
   * [Payment Methods](https://docs.stripe.com/payments/payment-methods) and
   * [More Payment Scenarios](https://docs.stripe.com/payments/more-payment-scenarios).
   */
  payment_method?: PaymentMethod;

  /**
   * If the error is specific to the type of payment method, the payment method type
   * that had a problem. This field is only populated for invoice-related errors.
   */
  payment_method_type?: string;

  /**
   * A URL to the request log entry in your dashboard.
   */
  request_log_url?: string;

  /**
   * A SetupIntent guides you through the process of setting up and saving a
   * customer's payment credentials for future payments. For example, you can use a
   * SetupIntent to set up and save your customer's card without immediately
   * collecting a payment. Later, you can use
   * [PaymentIntents](https://api.stripe.com#payment_intents) to drive the payment
   * flow.
   *
   * Create a SetupIntent when you're ready to collect your customer's payment
   * credentials. Don't maintain long-lived, unconfirmed SetupIntents because they
   * might not be valid. The SetupIntent transitions through multiple
   * [statuses](https://docs.stripe.com/payments/intents#intent-statuses) as it
   * guides you through the setup process.
   *
   * Successful SetupIntents result in payment credentials that are optimized for
   * future payments. For example, cardholders in
   * [certain regions](https://stripe.com/guides/strong-customer-authentication)
   * might need to be run through
   * [Strong Customer Authentication](https://docs.stripe.com/strong-customer-authentication)
   * during payment method collection to streamline later
   * [off-session payments](https://docs.stripe.com/payments/setup-intents). If you
   * use the SetupIntent with a
   * [Customer](https://api.stripe.com#setup_intent_object-customer), it
   * automatically attaches the resulting payment method to that Customer after
   * successful setup. We recommend using SetupIntents or
   * [setup_future_usage](https://api.stripe.com#payment_intent_object-setup_future_usage)
   * on PaymentIntents to save payment methods to prevent saving invalid or
   * unoptimized payment methods.
   *
   * By using SetupIntents, you can reduce friction for your customers, even as
   * regulations change over time.
   *
   * Related guide:
   * [Setup Intents API](https://docs.stripe.com/payments/setup-intents)
   */
  setup_intent?: SubscriptionsAPI.SetupIntent;

  /**
   * The [source object](https://docs.stripe.com/api/sources/object) for errors
   * returned on a request involving a source.
   */
  source?: CustomersAPI.BankAccount | CustomersAPI.Card | Shared.Source;
}

export interface AutomaticTaxInvoice {
  /**
   * Whether Stripe automatically computes tax on this invoice. Note that
   * incompatible invoice items (invoice items with manually specified
   * [tax rates](https://docs.stripe.com/api/tax_rates), negative amounts, or
   * `tax_behavior=unspecified`) cannot be added to automatic tax invoices.
   */
  enabled: boolean;

  /**
   * If Stripe disabled automatic tax, this enum describes why.
   */
  disabled_reason?: 'finalization_requires_location_inputs' | 'finalization_system_error' | null;

  liability?: ConnectAccountReference | null;

  /**
   * The tax provider powering automatic tax.
   */
  provider?: string | null;

  /**
   * The status of the most recent automated tax calculation for this invoice.
   */
  status?: 'complete' | 'failed' | 'requires_location_inputs' | null;
}

export interface BillingBillResourceInvoicingParentsInvoiceParent {
  /**
   * The type of parent that generated this invoice
   */
  type: 'quote_details' | 'subscription_details';

  quote_details?: BillingBillResourceInvoicingParentsInvoiceParent.QuoteDetails | null;

  subscription_details?: BillingBillResourceInvoicingParentsInvoiceSubscriptionParent | null;
}

export namespace BillingBillResourceInvoicingParentsInvoiceParent {
  export interface QuoteDetails {
    /**
     * The quote that generated this invoice
     */
    quote: string;
  }
}

export interface BillingBillResourceInvoicingParentsInvoiceSubscriptionParent {
  /**
   * The subscription that generated this invoice
   */
  subscription: string | SubscriptionsAPI.Subscription;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) defined as
   * subscription metadata when an invoice is created. Becomes an immutable snapshot
   * of the subscription metadata at the time of invoice finalization. _Note: This
   * attribute is populated only for invoices created on or after June 29, 2023._
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Only set for upcoming invoices that preview prorations. The time used to
   * calculate prorations.
   */
  subscription_proration_date?: number;
}

/**
 * A credit balance transaction is a resource representing a transaction (either a
 * credit or a debit) against an existing credit grant.
 */
export interface BillingCreditBalanceTransaction {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * The credit grant associated with this credit balance transaction.
   */
  credit_grant: string | BillingCreditGrant;

  /**
   * The effective time of this credit balance transaction.
   */
  effective_at: number;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'billing.credit_balance_transaction';

  credit?: BillingCreditGrantsResourceBalanceCredit | null;

  debit?: BillingCreditGrantsResourceBalanceDebit | null;

  /**
   * ID of the test clock this credit balance transaction belongs to.
   */
  test_clock?: string | Shared.TestHelpersTestClock | null;

  /**
   * The type of credit balance transaction (credit or debit).
   */
  type?: 'credit' | 'debit' | null;
}

/**
 * A credit grant is an API resource that documents the allocation of some billing
 * credits to a customer.
 *
 * Related guide:
 * [Billing credits](https://docs.stripe.com/billing/subscriptions/usage-based/billing-credits)
 */
export interface BillingCreditGrant {
  /**
   * Unique identifier for the object.
   */
  id: string;

  amount: BillingCreditGrantsResourceAmount;

  applicability_config: BillingCreditGrant.ApplicabilityConfig;

  /**
   * The category of this credit grant. This is for tracking purposes and isn't
   * displayed to the customer.
   */
  category: 'paid' | 'promotional';

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * ID of the customer receiving the billing credits.
   */
  customer: string | CustomersAPI.Customer | Shared.DeletedCustomer;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata: { [key: string]: string };

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'billing.credit_grant';

  /**
   * Time at which the object was last updated. Measured in seconds since the Unix
   * epoch.
   */
  updated: number;

  /**
   * ID of the account representing the customer receiving the billing credits
   */
  customer_account?: string | null;

  /**
   * The time when the billing credits become effective-when they're eligible for
   * use.
   */
  effective_at?: number | null;

  /**
   * The time when the billing credits expire. If not present, the billing credits
   * don't expire.
   */
  expires_at?: number | null;

  /**
   * A descriptive name shown in dashboard.
   */
  name?: string | null;

  /**
   * The priority for applying this credit grant. The highest priority is 0 and the
   * lowest is 100.
   */
  priority?: number | null;

  /**
   * ID of the test clock this credit grant belongs to.
   */
  test_clock?: string | Shared.TestHelpersTestClock | null;

  /**
   * The time when this credit grant was voided. If not present, the credit grant
   * hasn't been voided.
   */
  voided_at?: number | null;
}

export namespace BillingCreditGrant {
  export interface ApplicabilityConfig {
    scope: ApplicabilityConfig.Scope;
  }

  export namespace ApplicabilityConfig {
    export interface Scope {
      /**
       * The price type that credit grants can apply to. We currently only support the
       * `metered` price type. This refers to prices that have a
       * [Billing Meter](https://docs.stripe.com/api/billing/meter) attached to them.
       * Cannot be used in combination with `prices`.
       */
      price_type?: 'metered';

      /**
       * The prices that credit grants can apply to. We currently only support `metered`
       * prices. This refers to prices that have a
       * [Billing Meter](https://docs.stripe.com/api/billing/meter) attached to them.
       * Cannot be used in combination with `price_type`.
       */
      prices?: Array<Scope.Price>;
    }

    export namespace Scope {
      export interface Price {
        /**
         * Unique identifier for the object.
         */
        id?: string | null;
      }
    }
  }
}

export interface BillingCreditGrantsResourceAmount {
  /**
   * The type of this amount. We currently only support `monetary` billing credits.
   */
  type: 'monetary';

  monetary?: BillingCreditGrantsResourceMonetaryAmount | null;
}

export interface BillingCreditGrantsResourceBalanceCredit {
  amount: BillingCreditGrantsResourceAmount;

  /**
   * The type of credit transaction.
   */
  type: 'credits_application_invoice_voided' | 'credits_granted';

  credits_application_invoice_voided?: BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided | null;
}

export interface BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided {
  /**
   * The invoice to which the reinstated billing credits were originally applied.
   */
  invoice: string | Invoice;

  /**
   * The invoice line item to which the reinstated billing credits were originally
   * applied.
   */
  invoice_line_item: string;
}

export interface BillingCreditGrantsResourceBalanceCreditsApplied {
  /**
   * The invoice to which the billing credits were applied.
   */
  invoice: string | Invoice;

  /**
   * The invoice line item to which the billing credits were applied.
   */
  invoice_line_item: string;
}

export interface BillingCreditGrantsResourceBalanceDebit {
  amount: BillingCreditGrantsResourceAmount;

  /**
   * The type of debit transaction.
   */
  type: 'credits_applied' | 'credits_expired' | 'credits_voided';

  credits_applied?: BillingCreditGrantsResourceBalanceCreditsApplied | null;
}

export interface BillingCreditGrantsResourceMonetaryAmount {
  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * A positive integer representing the amount.
   */
  value: number;
}

export interface ConnectAccountReference {
  /**
   * Type of the account referenced.
   */
  type: 'account' | 'self';

  /**
   * The connected account being referenced when `type` is `account`.
   */
  account?: string | AccountsAPI.Account;
}

export interface DeletedDiscount {
  /**
   * The ID of the discount object. Discounts cannot be fetched by ID. Use
   * `expand[]=discounts` in API calls to expand discount IDs in an array.
   */
  id: string;

  /**
   * Always true for a deleted object
   */
  deleted: true;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'discount';

  source: DeletedDiscount.Source;

  /**
   * Date that the coupon was applied.
   */
  start: number;

  /**
   * The Checkout session that this coupon is applied to, if it is applied to a
   * particular session in payment mode. Will not be present for subscription mode.
   */
  checkout_session?: string | null;

  /**
   * The ID of the customer associated with this discount.
   */
  customer?: string | CustomersAPI.Customer | Shared.DeletedCustomer | null;

  /**
   * The ID of the account representing the customer associated with this discount.
   */
  customer_account?: string | null;

  /**
   * The invoice that the discount's coupon was applied to, if it was applied
   * directly to a particular invoice.
   */
  invoice?: string | null;

  /**
   * The invoice item `id` (or invoice line item `id` for invoice line items of
   * type='subscription') that the discount's coupon was applied to, if it was
   * applied directly to a particular invoice item or invoice line item.
   */
  invoice_item?: string | null;

  /**
   * The promotion code applied to create this discount.
   */
  promotion_code?: string | CustomersAPI.PromotionCode | null;

  /**
   * The subscription that this coupon is applied to, if it is applied to a
   * particular subscription.
   */
  subscription?: string | null;

  /**
   * The subscription item that this coupon is applied to, if it is applied to a
   * particular subscription item.
   */
  subscription_item?: string | null;
}

export namespace DeletedDiscount {
  export interface Source {
    /**
     * The source type of the discount.
     */
    type: 'coupon';

    /**
     * The coupon that was redeemed to create this discount.
     */
    coupon?: string | CouponsAPI.Coupon | null;
  }
}

export interface DiscountsResourceDiscountAmount {
  /**
   * The amount, in cents (or local equivalent), of the discount.
   */
  amount: number;

  /**
   * The discount that was applied to get this discount amount.
   */
  discount: string | CustomersAPI.Discount | DeletedDiscount;
}

/**
 * Invoices are statements of amounts owed by a customer, and are either generated
 * one-off, or generated periodically from a subscription.
 *
 * They contain [invoice items](https://api.stripe.com#invoiceitems), and proration
 * adjustments that may be caused by subscription upgrades/downgrades (if
 * necessary).
 *
 * If your invoice is configured to be billed through automatic charges, Stripe
 * automatically finalizes your invoice and attempts payment. Note that finalizing
 * the invoice,
 * [when automatic](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection),
 * does not happen immediately as the invoice is created. Stripe waits until one
 * hour after the last webhook was successfully sent (or the last webhook timed out
 * after failing). If you (and the platforms you may have connected to) have no
 * webhooks configured, Stripe waits one hour after creation to finalize the
 * invoice.
 *
 * If your invoice is configured to be billed by sending an email, then based on
 * your [email settings](https://dashboard.stripe.com/account/billing/automatic),
 * Stripe will email the invoice to your customer and await payment. These emails
 * can contain a link to a hosted page to pay the invoice.
 *
 * Stripe applies any customer credit on the account before determining the amount
 * due for the invoice (i.e., the amount that will be actually charged). If the
 * amount due for the invoice is less than Stripe's
 * [minimum allowed charge per currency](/docs/currencies#minimum-and-maximum-charge-amounts),
 * the invoice is automatically marked paid, and we add the amount due to the
 * customer's credit balance which is applied to the next invoice.
 *
 * More details on the customer's credit balance are
 * [here](https://docs.stripe.com/billing/customer/balance).
 *
 * Related guide:
 * [Send invoices to customers](https://docs.stripe.com/billing/invoices/sending)
 */
export interface Invoice {
  /**
   * Unique identifier for the object. For preview invoices created using the
   * [create preview](https://stripe.com/docs/api/invoices/create_preview) endpoint,
   * this id will be prefixed with `upcoming_in`.
   */
  id: string;

  /**
   * Final amount due at this time for this invoice. If the invoice's total is
   * smaller than the minimum charge amount, for example, or if there is account
   * credit that can be applied to the invoice, the `amount_due` may be 0. If there
   * is a positive `starting_balance` for the invoice (the customer owes money), the
   * `amount_due` will also take that into account. The charge that gets generated
   * for the invoice will be for the amount specified in `amount_due`.
   */
  amount_due: number;

  /**
   * Amount that was overpaid on the invoice. The amount overpaid is credited to the
   * customer's credit balance.
   */
  amount_overpaid: number;

  /**
   * The amount, in cents (or local equivalent), that was paid.
   */
  amount_paid: number;

  /**
   * The difference between amount_due and amount_paid, in cents (or local
   * equivalent).
   */
  amount_remaining: number;

  /**
   * This is the sum of all the shipping amounts.
   */
  amount_shipping: number;

  /**
   * Number of payment attempts made for this invoice, from the perspective of the
   * payment retry schedule. Any payment attempt counts as the first attempt, and
   * subsequently only automatic retries increment the attempt count. In other words,
   * manual payment attempts after the first attempt do not affect the retry
   * schedule. If a failure is returned with a non-retryable return code, the invoice
   * can no longer be retried unless a new payment method is obtained. Retries will
   * continue to be scheduled, and attempt_count will continue to increment, but
   * retries will only be executed if a new payment method is obtained.
   */
  attempt_count: number;

  /**
   * Whether an attempt has been made to pay the invoice. An invoice is not attempted
   * until 1 hour after the `invoice.created` webhook, for example, so you might not
   * want to display that invoice as unpaid to your users.
   */
  attempted: boolean;

  /**
   * Controls whether Stripe performs
   * [automatic collection](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection)
   * of the invoice. If `false`, the invoice's state doesn't automatically advance
   * without an explicit action.
   */
  auto_advance: boolean;

  automatic_tax: AutomaticTaxInvoice;

  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically,
   * Stripe will attempt to pay this invoice using the default source attached to the
   * customer. When sending an invoice, Stripe will email this invoice to the
   * customer with payment instructions.
   */
  collection_method: 'charge_automatically' | 'send_invoice';

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * The ID of the customer to bill.
   */
  customer: string | CustomersAPI.Customer | Shared.DeletedCustomer;

  /**
   * The tax rates applied to this invoice, if any.
   */
  default_tax_rates: Array<TaxRate>;

  /**
   * The discounts applied to the invoice. Line item discounts are applied before
   * invoice discounts. Use `expand[]=discounts` to expand each discount.
   */
  discounts: Array<string | CustomersAPI.Discount | DeletedDiscount>;

  issuer: ConnectAccountReference;

  /**
   * The individual line items that make up the invoice. `lines` is sorted as
   * follows: (1) pending invoice items (including prorations) in reverse
   * chronological order, (2) subscription items in reverse chronological order, and
   * (3) invoice items added after invoice creation in chronological order.
   */
  lines: Invoice.Lines;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'invoice';

  payment_settings: Invoice.PaymentSettings;

  /**
   * End of the usage period during which invoice items were added to this invoice.
   * This looks back one period for a subscription invoice. Use the
   * [line item period](/api/invoices/line_item#invoice_line_item_object-period) to
   * get the service period for each price.
   */
  period_end: number;

  /**
   * Start of the usage period during which invoice items were added to this invoice.
   * This looks back one period for a subscription invoice. Use the
   * [line item period](/api/invoices/line_item#invoice_line_item_object-period) to
   * get the service period for each price.
   */
  period_start: number;

  /**
   * Total amount of all post-payment credit notes issued for this invoice.
   */
  post_payment_credit_notes_amount: number;

  /**
   * Total amount of all pre-payment credit notes issued for this invoice.
   */
  pre_payment_credit_notes_amount: number;

  /**
   * Starting customer balance before the invoice is finalized. If the invoice has
   * not been finalized yet, this will be the current customer balance. For revision
   * invoices, this also includes any customer balance that was applied to the
   * original invoice.
   */
  starting_balance: number;

  status_transitions: Invoice.StatusTransitions;

  /**
   * Total of all subscriptions, invoice items, and prorations on the invoice before
   * any invoice level discount or exclusive tax is applied. Item discounts are
   * already incorporated
   */
  subtotal: number;

  /**
   * Total after discounts and taxes.
   */
  total: number;

  /**
   * The country of the business associated with this invoice, most often the
   * business creating the invoice.
   */
  account_country?: string | null;

  /**
   * The public name of the business associated with this invoice, most often the
   * business creating the invoice.
   */
  account_name?: string | null;

  /**
   * The account tax IDs associated with the invoice. Only editable when the invoice
   * is a draft.
   */
  account_tax_ids?: Array<string | CustomersAPI.TaxID | Shared.DeletedTaxID> | null;

  /**
   * ID of the Connect Application that created the invoice.
   */
  application?: string | Shared.Application | Shared.DeletedApplication | null;

  /**
   * The time when this invoice is currently scheduled to be automatically finalized.
   * The field will be `null` if the invoice is not scheduled to finalize in the
   * future. If the invoice is not in the draft state, this field will always be
   * `null` - see `finalized_at` for the time when an already-finalized invoice was
   * finalized.
   */
  automatically_finalizes_at?: number | null;

  /**
   * Indicates the reason why the invoice was created.
   *
   * - `manual`: Unrelated to a subscription, for example, created via the invoice
   *   editor.
   * - `subscription`: No longer in use. Applies to subscriptions from before May
   *   2018 where no distinction was made between updates, cycles, and thresholds.
   * - `subscription_create`: A new subscription was created.
   * - `subscription_cycle`: A subscription advanced into a new period.
   * - `subscription_threshold`: A subscription reached a billing threshold.
   * - `subscription_update`: A subscription was updated.
   * - `upcoming`: Reserved for upcoming invoices created through the Create Preview
   *   Invoice API or when an `invoice.upcoming` event is generated for an upcoming
   *   invoice on a subscription.
   */
  billing_reason?:
    | 'automatic_pending_invoice_item_invoice'
    | 'manual'
    | 'quote_accept'
    | 'subscription'
    | 'subscription_create'
    | 'subscription_cycle'
    | 'subscription_threshold'
    | 'subscription_update'
    | 'upcoming'
    | null;

  confirmation_secret?: Invoice.ConfirmationSecret | null;

  /**
   * Custom fields displayed on the invoice.
   */
  custom_fields?: Array<Shared.InvoiceSettingCustomField> | null;

  /**
   * The ID of the account representing the customer to bill.
   */
  customer_account?: string | null;

  customer_address?: Shared.Address | null;

  /**
   * The customer's email. Until the invoice is finalized, this field will equal
   * `customer.email`. Once the invoice is finalized, this field will no longer be
   * updated.
   */
  customer_email?: string | null;

  /**
   * The customer's name. Until the invoice is finalized, this field will equal
   * `customer.name`. Once the invoice is finalized, this field will no longer be
   * updated.
   */
  customer_name?: string | null;

  /**
   * The customer's phone number. Until the invoice is finalized, this field will
   * equal `customer.phone`. Once the invoice is finalized, this field will no longer
   * be updated.
   */
  customer_phone?: string | null;

  customer_shipping?: Shared.Shipping | null;

  /**
   * The customer's tax exempt status. Until the invoice is finalized, this field
   * will equal `customer.tax_exempt`. Once the invoice is finalized, this field will
   * no longer be updated.
   */
  customer_tax_exempt?: 'exempt' | 'none' | 'reverse' | null;

  /**
   * The customer's tax IDs. Until the invoice is finalized, this field will contain
   * the same tax IDs as `customer.tax_ids`. Once the invoice is finalized, this
   * field will no longer be updated.
   */
  customer_tax_ids?: Array<Invoice.CustomerTaxID> | null;

  /**
   * ID of the default payment method for the invoice. It must belong to the customer
   * associated with the invoice. If not set, defaults to the subscription's default
   * payment method, if any, or to the default payment method in the customer's
   * invoice settings.
   */
  default_payment_method?: string | PaymentMethod | null;

  /**
   * ID of the default payment source for the invoice. It must belong to the customer
   * associated with the invoice and be in a chargeable state. If not set, defaults
   * to the subscription's default source, if any, or to the customer's default
   * source.
   */
  default_source?: string | CustomersAPI.BankAccount | CustomersAPI.Card | Shared.Source | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users. Referenced as 'memo' in the Dashboard.
   */
  description?: string | null;

  /**
   * The date on which payment for this invoice is due. This value will be `null` for
   * invoices where `collection_method=charge_automatically`.
   */
  due_date?: number | null;

  /**
   * The date when this invoice is in effect. Same as `finalized_at` unless
   * overwritten. When defined, this value replaces the system-generated 'Date of
   * issue' printed on the invoice PDF and receipt.
   */
  effective_at?: number | null;

  /**
   * Ending customer balance after the invoice is finalized. Invoices are finalized
   * approximately an hour after successful webhook delivery or when payment
   * collection is attempted for the invoice. If the invoice has not been finalized
   * yet, this will be null.
   */
  ending_balance?: number | null;

  /**
   * Footer displayed on the invoice.
   */
  footer?: string | null;

  from_invoice?: InvoicesResourceFromInvoice | null;

  /**
   * The URL for the hosted invoice page, which allows customers to view and pay an
   * invoice. If the invoice has not been finalized yet, this will be null.
   */
  hosted_invoice_url?: string | null;

  /**
   * The link to download the PDF for the invoice. If the invoice has not been
   * finalized yet, this will be null.
   */
  invoice_pdf?: string | null;

  last_finalization_error?: APIErrors | null;

  /**
   * The ID of the most recent non-draft revision of this invoice
   */
  latest_revision?: string | Invoice | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * The time at which payment will next be attempted. This value will be `null` for
   * invoices where `collection_method=send_invoice`.
   */
  next_payment_attempt?: number | null;

  /**
   * A unique, identifying string that appears on emails sent to the customer for
   * this invoice. This starts with the customer's unique invoice_prefix if it is
   * specified.
   */
  number?: string | null;

  /**
   * The account (if any) for which the funds of the invoice payment are intended. If
   * set, the invoice will be presented with the branding and support information of
   * the specified account. See the
   * [Invoices with Connect](https://docs.stripe.com/billing/invoices/connect)
   * documentation for details.
   */
  on_behalf_of?: string | AccountsAPI.Account | null;

  parent?: BillingBillResourceInvoicingParentsInvoiceParent | null;

  /**
   * Payments for this invoice
   */
  payments?: Invoice.Payments;

  /**
   * This is the transaction number that appears on email receipts sent for this
   * invoice.
   */
  receipt_number?: string | null;

  rendering?: Invoice.Rendering | null;

  shipping_cost?: Invoice.ShippingCost | null;

  shipping_details?: Shared.Shipping | null;

  /**
   * Extra information about an invoice for the customer's credit card statement.
   */
  statement_descriptor?: string | null;

  /**
   * The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or
   * `void`.
   * [Learn more](https://docs.stripe.com/billing/invoices/workflow#workflow-overview)
   */
  status?: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void' | null;

  /**
   * The integer amount in cents (or local equivalent) representing the subtotal of
   * the invoice before any invoice level discount or tax is applied. Item discounts
   * are already incorporated
   */
  subtotal_excluding_tax?: number | null;

  /**
   * ID of the test clock this invoice belongs to.
   */
  test_clock?: string | Shared.TestHelpersTestClock | null;

  threshold_reason?: Invoice.ThresholdReason;

  /**
   * The aggregate amounts calculated per discount across all line items.
   */
  total_discount_amounts?: Array<DiscountsResourceDiscountAmount> | null;

  /**
   * The integer amount in cents (or local equivalent) representing the total amount
   * of the invoice including all discounts but excluding all tax.
   */
  total_excluding_tax?: number | null;

  /**
   * Contains pretax credit amounts (ex: discount, credit grants, etc) that apply to
   * this invoice. This is a combined list of total_pretax_credit_amounts across all
   * invoice line items.
   */
  total_pretax_credit_amounts?: Array<InvoicesResourcePretaxCreditAmount> | null;

  /**
   * The aggregate tax information of all line items.
   */
  total_taxes?: Array<Invoice.TotalTax> | null;

  /**
   * Invoices are automatically paid or sent 1 hour after webhooks are delivered, or
   * until all webhook delivery attempts have
   * [been exhausted](https://docs.stripe.com/billing/webhooks#understand). This
   * field tracks the time when webhooks for this invoice were successfully
   * delivered. If the invoice had no webhooks to deliver, this will be set while the
   * invoice is being created.
   */
  webhooks_delivered_at?: number | null;
}

export namespace Invoice {
  /**
   * The individual line items that make up the invoice. `lines` is sorted as
   * follows: (1) pending invoice items (including prorations) in reverse
   * chronological order, (2) subscription items in reverse chronological order, and
   * (3) invoice items added after invoice creation in chronological order.
   */
  export interface Lines {
    /**
     * Details about each object.
     */
    data: Array<InvoicesAPI.LineItem>;

    /**
     * True if this list has another page of items after this one that can be fetched.
     */
    has_more: boolean;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value. Always has the value `list`.
     */
    object: 'list';

    /**
     * The URL where this list can be accessed.
     */
    url: string;
  }

  export interface PaymentSettings {
    /**
     * ID of the mandate to be used for this invoice. It must correspond to the payment
     * method used to pay the invoice, including the invoice's default_payment_method
     * or default_source, if set.
     */
    default_mandate?: string | null;

    payment_method_options?: PaymentSettings.PaymentMethodOptions | null;

    /**
     * The list of payment method types (e.g. card) to provide to the invoice’s
     * PaymentIntent. If not set, Stripe attempts to automatically determine the types
     * to use by looking at the invoice’s default payment method, the subscription’s
     * default payment method, the customer’s default payment method, and your
     * [invoice template settings](https://dashboard.stripe.com/settings/billing/invoice).
     */
    payment_method_types?: Array<
      | 'ach_credit_transfer'
      | 'ach_debit'
      | 'acss_debit'
      | 'affirm'
      | 'amazon_pay'
      | 'au_becs_debit'
      | 'bacs_debit'
      | 'bancontact'
      | 'boleto'
      | 'card'
      | 'cashapp'
      | 'crypto'
      | 'custom'
      | 'customer_balance'
      | 'eps'
      | 'fpx'
      | 'giropay'
      | 'grabpay'
      | 'ideal'
      | 'jp_credit_transfer'
      | 'kakao_pay'
      | 'klarna'
      | 'konbini'
      | 'kr_card'
      | 'link'
      | 'multibanco'
      | 'naver_pay'
      | 'nz_bank_account'
      | 'p24'
      | 'payco'
      | 'paynow'
      | 'paypal'
      | 'payto'
      | 'promptpay'
      | 'revolut_pay'
      | 'sepa_credit_transfer'
      | 'sepa_debit'
      | 'sofort'
      | 'swish'
      | 'us_bank_account'
      | 'wechat_pay'
    > | null;
  }

  export namespace PaymentSettings {
    export interface PaymentMethodOptions {
      acss_debit?: PaymentMethodOptions.AcssDebit | null;

      bancontact?: PaymentMethodOptions.Bancontact | null;

      card?: PaymentMethodOptions.Card | null;

      customer_balance?: PaymentMethodOptions.CustomerBalance | null;

      konbini?: PaymentMethodOptions.Konbini | null;

      payto?: PaymentMethodOptions.Payto | null;

      sepa_debit?: PaymentMethodOptions.SepaDebit | null;

      us_bank_account?: PaymentMethodOptions.UsBankAccount | null;
    }

    export namespace PaymentMethodOptions {
      export interface AcssDebit {
        mandate_options?: AcssDebit.MandateOptions;

        /**
         * Bank account verification method.
         */
        verification_method?: 'automatic' | 'instant' | 'microdeposits';
      }

      export namespace AcssDebit {
        export interface MandateOptions {
          /**
           * Transaction type of the mandate.
           */
          transaction_type?: 'business' | 'personal' | null;
        }
      }

      export interface Bancontact {
        /**
         * Preferred language of the Bancontact authorization page that the customer is
         * redirected to.
         */
        preferred_language: 'de' | 'en' | 'fr' | 'nl';
      }

      export interface Card {
        installments?: Card.Installments;

        /**
         * We strongly recommend that you rely on our SCA Engine to automatically prompt
         * your customers for authentication based on risk level and
         * [other requirements](https://docs.stripe.com/strong-customer-authentication).
         * However, if you wish to request 3D Secure based on logic from your own fraud
         * engine, provide this option. Read our guide on
         * [manually requesting 3D Secure](https://docs.stripe.com/payments/3d-secure/authentication-flow#manual-three-ds)
         * for more information on how this configuration interacts with Radar and our SCA
         * Engine.
         */
        request_three_d_secure?: 'any' | 'automatic' | 'challenge' | null;
      }

      export namespace Card {
        export interface Installments {
          /**
           * Whether Installments are enabled for this Invoice.
           */
          enabled?: boolean | null;
        }
      }

      export interface CustomerBalance {
        bank_transfer?: CustomerBalance.BankTransfer;

        /**
         * The funding method type to be used when there are not enough funds in the
         * customer balance. Permitted values include: `bank_transfer`.
         */
        funding_type?: 'bank_transfer' | null;
      }

      export namespace CustomerBalance {
        export interface BankTransfer {
          eu_bank_transfer?: BankTransfer.EuBankTransfer;

          /**
           * The bank transfer type that can be used for funding. Permitted values include:
           * `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`,
           * or `us_bank_transfer`.
           */
          type?: string | null;
        }

        export namespace BankTransfer {
          export interface EuBankTransfer {
            /**
             * The desired country code of the bank account information. Permitted values
             * include: `BE`, `DE`, `ES`, `FR`, `IE`, or `NL`.
             */
            country: 'BE' | 'DE' | 'ES' | 'FR' | 'IE' | 'NL';
          }
        }
      }

      export interface Konbini {}

      export interface Payto {
        mandate_options?: Payto.MandateOptions;
      }

      export namespace Payto {
        export interface MandateOptions {
          /**
           * The maximum amount that can be collected in a single invoice. If you don't
           * specify a maximum, then there is no limit.
           */
          amount?: number | null;

          /**
           * Only `maximum` is supported.
           */
          amount_type?: 'fixed' | 'maximum' | null;

          /**
           * The purpose for which payments are made. Has a default value based on your
           * merchant category code.
           */
          purpose?:
            | 'dependant_support'
            | 'government'
            | 'loan'
            | 'mortgage'
            | 'other'
            | 'pension'
            | 'personal'
            | 'retail'
            | 'salary'
            | 'tax'
            | 'utility'
            | null;
        }
      }

      export interface SepaDebit {}

      export interface UsBankAccount {
        financial_connections?: UsBankAccount.FinancialConnections;

        /**
         * Bank account verification method.
         */
        verification_method?: 'automatic' | 'instant' | 'microdeposits';
      }

      export namespace UsBankAccount {
        export interface FinancialConnections {
          filters?: FinancialConnections.Filters;

          /**
           * The list of permissions to request. The `payment_method` permission must be
           * included.
           */
          permissions?: Array<'balances' | 'ownership' | 'payment_method' | 'transactions'>;

          /**
           * Data features requested to be retrieved upon account creation.
           */
          prefetch?: Array<'balances' | 'ownership' | 'transactions'> | null;
        }

        export namespace FinancialConnections {
          export interface Filters {
            /**
             * The account subcategories to use to filter for possible accounts to link. Valid
             * subcategories are `checking` and `savings`.
             */
            account_subcategories?: Array<'checking' | 'savings'>;
          }
        }
      }
    }
  }

  export interface StatusTransitions {
    /**
     * The time that the invoice draft was finalized.
     */
    finalized_at?: number | null;

    /**
     * The time that the invoice was marked uncollectible.
     */
    marked_uncollectible_at?: number | null;

    /**
     * The time that the invoice was paid.
     */
    paid_at?: number | null;

    /**
     * The time that the invoice was voided.
     */
    voided_at?: number | null;
  }

  export interface ConfirmationSecret {
    /**
     * The client_secret of the payment that Stripe creates for the invoice after
     * finalization.
     */
    client_secret: string;

    /**
     * The type of client_secret. Currently this is always payment_intent, referencing
     * the default payment_intent that Stripe creates during invoice finalization
     */
    type: string;
  }

  export interface CustomerTaxID {
    /**
     * The type of the tax ID, one of `ad_nrt`, `ar_cuit`, `eu_vat`, `bo_tin`,
     * `br_cnpj`, `br_cpf`, `cn_tin`, `co_nit`, `cr_tin`, `do_rcn`, `ec_ruc`,
     * `eu_oss_vat`, `hr_oib`, `pe_ruc`, `ro_tin`, `rs_pib`, `sv_nit`, `uy_ruc`,
     * `ve_rif`, `vn_tin`, `gb_vat`, `nz_gst`, `au_abn`, `au_arn`, `in_gst`, `no_vat`,
     * `no_voec`, `za_vat`, `ch_vat`, `mx_rfc`, `sg_uen`, `ru_inn`, `ru_kpp`, `ca_bn`,
     * `hk_br`, `es_cif`, `pl_nip`, `tw_vat`, `th_vat`, `jp_cn`, `jp_rn`, `jp_trn`,
     * `li_uid`, `li_vat`, `my_itn`, `us_ein`, `kr_brn`, `ca_qst`, `ca_gst_hst`,
     * `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `my_sst`, `sg_gst`, `ae_trn`, `cl_tin`,
     * `sa_vat`, `id_npwp`, `my_frp`, `il_vat`, `ge_vat`, `ua_vat`, `is_vat`, `bg_uic`,
     * `hu_tin`, `si_tin`, `ke_pin`, `tr_tin`, `eg_tin`, `ph_tin`, `al_tin`, `bh_vat`,
     * `kz_bin`, `ng_tin`, `om_vat`, `de_stn`, `ch_uid`, `tz_vat`, `uz_vat`, `uz_tin`,
     * `md_vat`, `ma_vat`, `by_tin`, `ao_tin`, `bs_tin`, `bb_tin`, `cd_nif`, `mr_nif`,
     * `me_pib`, `zw_tin`, `ba_tin`, `gn_nif`, `mk_vat`, `sr_fin`, `sn_ninea`,
     * `am_tin`, `np_pan`, `tj_tin`, `ug_tin`, `zm_tin`, `kh_tin`, `aw_tin`, `az_tin`,
     * `bd_bin`, `bj_ifu`, `et_tin`, `kg_tin`, `la_tin`, `cm_niu`, `cv_nif`, `bf_ifu`,
     * or `unknown`
     */
    type:
      | 'ad_nrt'
      | 'ae_trn'
      | 'al_tin'
      | 'am_tin'
      | 'ao_tin'
      | 'ar_cuit'
      | 'au_abn'
      | 'au_arn'
      | 'aw_tin'
      | 'az_tin'
      | 'ba_tin'
      | 'bb_tin'
      | 'bd_bin'
      | 'bf_ifu'
      | 'bg_uic'
      | 'bh_vat'
      | 'bj_ifu'
      | 'bo_tin'
      | 'br_cnpj'
      | 'br_cpf'
      | 'bs_tin'
      | 'by_tin'
      | 'ca_bn'
      | 'ca_gst_hst'
      | 'ca_pst_bc'
      | 'ca_pst_mb'
      | 'ca_pst_sk'
      | 'ca_qst'
      | 'cd_nif'
      | 'ch_uid'
      | 'ch_vat'
      | 'cl_tin'
      | 'cm_niu'
      | 'cn_tin'
      | 'co_nit'
      | 'cr_tin'
      | 'cv_nif'
      | 'de_stn'
      | 'do_rcn'
      | 'ec_ruc'
      | 'eg_tin'
      | 'es_cif'
      | 'et_tin'
      | 'eu_oss_vat'
      | 'eu_vat'
      | 'gb_vat'
      | 'ge_vat'
      | 'gn_nif'
      | 'hk_br'
      | 'hr_oib'
      | 'hu_tin'
      | 'id_npwp'
      | 'il_vat'
      | 'in_gst'
      | 'is_vat'
      | 'jp_cn'
      | 'jp_rn'
      | 'jp_trn'
      | 'ke_pin'
      | 'kg_tin'
      | 'kh_tin'
      | 'kr_brn'
      | 'kz_bin'
      | 'la_tin'
      | 'li_uid'
      | 'li_vat'
      | 'ma_vat'
      | 'md_vat'
      | 'me_pib'
      | 'mk_vat'
      | 'mr_nif'
      | 'mx_rfc'
      | 'my_frp'
      | 'my_itn'
      | 'my_sst'
      | 'ng_tin'
      | 'no_vat'
      | 'no_voec'
      | 'np_pan'
      | 'nz_gst'
      | 'om_vat'
      | 'pe_ruc'
      | 'ph_tin'
      | 'pl_nip'
      | 'ro_tin'
      | 'rs_pib'
      | 'ru_inn'
      | 'ru_kpp'
      | 'sa_vat'
      | 'sg_gst'
      | 'sg_uen'
      | 'si_tin'
      | 'sn_ninea'
      | 'sr_fin'
      | 'sv_nit'
      | 'th_vat'
      | 'tj_tin'
      | 'tr_tin'
      | 'tw_vat'
      | 'tz_vat'
      | 'ua_vat'
      | 'ug_tin'
      | 'unknown'
      | 'us_ein'
      | 'uy_ruc'
      | 'uz_tin'
      | 'uz_vat'
      | 've_rif'
      | 'vn_tin'
      | 'za_vat'
      | 'zm_tin'
      | 'zw_tin';

    /**
     * The value of the tax ID.
     */
    value?: string | null;
  }

  /**
   * Payments for this invoice
   */
  export interface Payments {
    /**
     * Details about each object.
     */
    data: Array<InvoicesAPI.InvoicePayment>;

    /**
     * True if this list has another page of items after this one that can be fetched.
     */
    has_more: boolean;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value. Always has the value `list`.
     */
    object: 'list';

    /**
     * The URL where this list can be accessed.
     */
    url: string;
  }

  export interface Rendering {
    /**
     * How line-item prices and amounts will be displayed with respect to tax on
     * invoice PDFs.
     */
    amount_tax_display?: string | null;

    pdf?: Rendering.Pdf | null;

    /**
     * ID of the rendering template that the invoice is formatted by.
     */
    template?: string | null;

    /**
     * Version of the rendering template that the invoice is using.
     */
    template_version?: number | null;
  }

  export namespace Rendering {
    export interface Pdf {
      /**
       * Page size of invoice pdf. Options include a4, letter, and auto. If set to auto,
       * page size will be switched to a4 or letter based on customer locale.
       */
      page_size?: 'a4' | 'auto' | 'letter' | null;
    }
  }

  export interface ShippingCost {
    /**
     * Total shipping cost before any taxes are applied.
     */
    amount_subtotal: number;

    /**
     * Total tax amount applied due to shipping costs. If no tax was applied, defaults
     * to 0.
     */
    amount_tax: number;

    /**
     * Total shipping cost after taxes are applied.
     */
    amount_total: number;

    /**
     * The ID of the ShippingRate for this invoice.
     */
    shipping_rate?: string | ShippingCost.ShippingRate | null;

    /**
     * The taxes applied to the shipping rate.
     */
    taxes?: Array<ShippingCost.Tax>;
  }

  export namespace ShippingCost {
    /**
     * Shipping rates describe the price of shipping presented to your customers and
     * applied to a purchase. For more information, see
     * [Charge for shipping](https://docs.stripe.com/payments/during-payment/charge-shipping).
     */
    export interface ShippingRate {
      /**
       * Unique identifier for the object.
       */
      id: string;

      /**
       * Whether the shipping rate can be used for new purchases. Defaults to `true`.
       */
      active: boolean;

      /**
       * Time at which the object was created. Measured in seconds since the Unix epoch.
       */
      created: number;

      /**
       * Has the value `true` if the object exists in live mode or the value `false` if
       * the object exists in test mode.
       */
      livemode: boolean;

      /**
       * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
       * attach to an object. This can be useful for storing additional information about
       * the object in a structured format.
       */
      metadata: { [key: string]: string };

      /**
       * String representing the object's type. Objects of the same type share the same
       * value.
       */
      object: 'shipping_rate';

      /**
       * The type of calculation to use on the shipping rate.
       */
      type: 'fixed_amount';

      delivery_estimate?: ShippingRate.DeliveryEstimate | null;

      /**
       * The name of the shipping rate, meant to be displayable to the customer. This
       * will appear on CheckoutSessions.
       */
      display_name?: string | null;

      fixed_amount?: ShippingRate.FixedAmount;

      /**
       * Specifies whether the rate is considered inclusive of taxes or exclusive of
       * taxes. One of `inclusive`, `exclusive`, or `unspecified`.
       */
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified' | null;

      /**
       * A [tax code](https://docs.stripe.com/tax/tax-categories) ID. The Shipping tax
       * code is `txcd_92010001`.
       */
      tax_code?: string | Shared.TaxCode | null;
    }

    export namespace ShippingRate {
      export interface DeliveryEstimate {
        maximum?: InvoicesAPI.ShippingRateDeliveryEstimateBound | null;

        minimum?: InvoicesAPI.ShippingRateDeliveryEstimateBound | null;
      }

      export interface FixedAmount {
        /**
         * A non-negative integer in cents representing how much to charge.
         */
        amount: number;

        /**
         * Three-letter
         * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
         * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
         */
        currency: string;

        /**
         * Shipping rates defined in each available currency option. Each key must be a
         * three-letter
         * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a
         * [supported currency](https://stripe.com/docs/currencies).
         */
        currency_options?: { [key: string]: FixedAmount.CurrencyOptions };
      }

      export namespace FixedAmount {
        export interface CurrencyOptions {
          /**
           * A non-negative integer in cents representing how much to charge.
           */
          amount: number;

          /**
           * Specifies whether the rate is considered inclusive of taxes or exclusive of
           * taxes. One of `inclusive`, `exclusive`, or `unspecified`.
           */
          tax_behavior: 'exclusive' | 'inclusive' | 'unspecified';
        }
      }
    }

    export interface Tax {
      /**
       * Amount of tax applied for this rate.
       */
      amount: number;

      /**
       * Tax rates can be applied to [invoices](/invoicing/taxes/tax-rates),
       * [subscriptions](/billing/taxes/tax-rates) and
       * [Checkout Sessions](/payments/checkout/use-manual-tax-rates) to collect tax.
       *
       * Related guide: [Tax rates](/billing/taxes/tax-rates)
       */
      rate: InvoicesAPI.TaxRate;

      /**
       * The reasoning behind this tax, for example, if the product is tax exempt. The
       * possible values for this field may be extended as new tax rules are supported.
       */
      taxability_reason?:
        | 'customer_exempt'
        | 'not_collecting'
        | 'not_subject_to_tax'
        | 'not_supported'
        | 'portion_product_exempt'
        | 'portion_reduced_rated'
        | 'portion_standard_rated'
        | 'product_exempt'
        | 'product_exempt_holiday'
        | 'proportionally_rated'
        | 'reduced_rated'
        | 'reverse_charge'
        | 'standard_rated'
        | 'taxable_basis_reduced'
        | 'zero_rated'
        | null;

      /**
       * The amount on which tax is calculated, in cents (or local equivalent).
       */
      taxable_amount?: number | null;
    }
  }

  export interface ThresholdReason {
    /**
     * Indicates which line items triggered a threshold invoice.
     */
    item_reasons: Array<ThresholdReason.ItemReason>;

    /**
     * The total invoice amount threshold boundary if it triggered the threshold
     * invoice.
     */
    amount_gte?: number | null;
  }

  export namespace ThresholdReason {
    export interface ItemReason {
      /**
       * The IDs of the line items that triggered the threshold invoice.
       */
      line_item_ids: Array<string>;

      /**
       * The quantity threshold boundary that applied to the given line item.
       */
      usage_gte: number;
    }
  }

  export interface TotalTax {
    /**
     * The amount of the tax, in cents (or local equivalent).
     */
    amount: number;

    /**
     * Whether this tax is inclusive or exclusive.
     */
    tax_behavior: 'exclusive' | 'inclusive';

    /**
     * The reasoning behind this tax, for example, if the product is tax exempt. The
     * possible values for this field may be extended as new tax rules are supported.
     */
    taxability_reason:
      | 'customer_exempt'
      | 'not_available'
      | 'not_collecting'
      | 'not_subject_to_tax'
      | 'not_supported'
      | 'portion_product_exempt'
      | 'portion_reduced_rated'
      | 'portion_standard_rated'
      | 'product_exempt'
      | 'product_exempt_holiday'
      | 'proportionally_rated'
      | 'reduced_rated'
      | 'reverse_charge'
      | 'standard_rated'
      | 'taxable_basis_reduced'
      | 'zero_rated';

    /**
     * The type of tax information.
     */
    type: 'tax_rate_details';

    tax_rate_details?: TotalTax.TaxRateDetails | null;

    /**
     * The amount on which tax is calculated, in cents (or local equivalent).
     */
    taxable_amount?: number | null;
  }

  export namespace TotalTax {
    export interface TaxRateDetails {
      /**
       * ID of the tax rate
       */
      tax_rate: string;
    }
  }
}

/**
 * Invoice Payments represent payments made against invoices. Invoice Payments can
 * be accessed in two ways:
 *
 * 1. By expanding the `payments` field on the
 *    [Invoice](https://api.stripe.com#invoice) resource.
 * 2. By using the Invoice Payment retrieve and list endpoints.
 *
 * Invoice Payments include the mapping between payment objects, such as Payment
 * Intent, and Invoices. This resource and its endpoints allows you to easily track
 * if a payment is associated with a specific invoice and monitor the allocation
 * details of the payments.
 */
export interface InvoicePayment {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Amount intended to be paid toward this invoice, in cents (or local equivalent)
   */
  amount_requested: number;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * The invoice that was paid.
   */
  invoice: string | Invoice | InvoicePayment.DeletedInvoice;

  /**
   * Stripe automatically creates a default InvoicePayment when the invoice is
   * finalized, and keeps it synchronized with the invoice’s `amount_remaining`. The
   * PaymentIntent associated with the default payment can’t be edited or canceled
   * directly.
   */
  is_default: boolean;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'invoice_payment';

  payment: InvoicesPaymentsInvoicePaymentAssociatedPayment;

  /**
   * The status of the payment, one of `open`, `paid`, or `canceled`.
   */
  status: string;

  status_transitions: InvoicePayment.StatusTransitions;

  /**
   * Amount that was actually paid for this invoice, in cents (or local equivalent).
   * This field is null until the payment is `paid`. This amount can be less than the
   * `amount_requested` if the PaymentIntent’s `amount_received` is not sufficient to
   * pay all of the invoices that it is attached to.
   */
  amount_paid?: number | null;
}

export namespace InvoicePayment {
  export interface DeletedInvoice {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * Always true for a deleted object
     */
    deleted: true;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value.
     */
    object: 'invoice';
  }

  export interface StatusTransitions {
    /**
     * The time that the payment was canceled.
     */
    canceled_at?: number | null;

    /**
     * The time that the payment succeeded.
     */
    paid_at?: number | null;
  }
}

export interface InvoicesPaymentsInvoicePaymentAssociatedPayment {
  /**
   * Type of payment object associated with this invoice payment.
   */
  type: 'charge' | 'payment_intent' | 'payment_record';

  /**
   * ID of the successful charge for this payment when `type` is `charge`.Note:
   * charge is only surfaced if the charge object is not associated with a payment
   * intent. If the charge object does have a payment intent, the Invoice Payment
   * surfaces the payment intent instead.
   */
  charge?: string | DisputesAPI.Charge;

  /**
   * ID of the PaymentIntent associated with this payment when `type` is
   * `payment_intent`. Note: This property is only populated for invoices finalized
   * on or after March 15th, 2019.
   */
  payment_intent?: string | PaymentIntentsAPI.PaymentIntent;

  /**
   * ID of the PaymentRecord associated with this payment when `type` is
   * `payment_record`.
   */
  payment_record?: string | PaymentRecord;
}

export interface InvoicesResourceFromInvoice {
  /**
   * The relation between this invoice and the cloned invoice
   */
  action: string;

  /**
   * The invoice that was cloned.
   */
  invoice: string | Invoice;
}

export interface InvoicesResourcePretaxCreditAmount {
  /**
   * The amount, in cents (or local equivalent), of the pretax credit amount.
   */
  amount: number;

  /**
   * Type of the pretax credit amount referenced.
   */
  type: 'credit_balance_transaction' | 'discount';

  /**
   * The credit balance transaction that was applied to get this pretax credit
   * amount.
   */
  credit_balance_transaction?: string | BillingCreditBalanceTransaction | null;

  /**
   * The discount that was applied to get this pretax credit amount.
   */
  discount?: string | CustomersAPI.Discount | DeletedDiscount;
}

/**
 * Invoice Line Items represent the individual lines within an
 * [invoice](https://docs.stripe.com/api/invoices) and only exist within the
 * context of an invoice.
 *
 * Each line item is backed by either an
 * [invoice item](https://docs.stripe.com/api/invoiceitems) or a
 * [subscription item](https://docs.stripe.com/api/subscription_items).
 */
export interface LineItem {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The amount, in cents (or local equivalent).
   */
  amount: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * If true, discounts will apply to this line item. Always false for prorations.
   */
  discountable: boolean;

  /**
   * The discounts applied to the invoice line item. Line item discounts are applied
   * before invoice discounts. Use `expand[]=discounts` to expand each discount.
   */
  discounts: Array<string | CustomersAPI.Discount>;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Note that for line items with
   * `type=subscription`, `metadata` reflects the current metadata from the
   * subscription associated with the line item, unless the invoice line was directly
   * updated with different metadata after creation.
   */
  metadata: { [key: string]: string };

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'line_item';

  period: LineItem.Period;

  /**
   * The subtotal of the line item, in cents (or local equivalent), before any
   * discounts or taxes.
   */
  subtotal: number;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * The amount of discount calculated per discount for this line item.
   */
  discount_amounts?: Array<DiscountsResourceDiscountAmount> | null;

  /**
   * The ID of the invoice that contains this line item.
   */
  invoice?: string | null;

  parent?: LineItem.Parent | null;

  /**
   * Contains pretax credit amounts (ex: discount, credit grants, etc) that apply to
   * this line item.
   */
  pretax_credit_amounts?: Array<InvoicesResourcePretaxCreditAmount> | null;

  pricing?: LineItem.Pricing | null;

  /**
   * The quantity of the subscription, if the line item is a subscription or a
   * proration.
   */
  quantity?: number | null;

  /**
   * Subscriptions allow you to charge a customer on a recurring basis.
   *
   * Related guide:
   * [Creating subscriptions](https://docs.stripe.com/billing/subscriptions/creating)
   */
  subscription?: string | SubscriptionsAPI.Subscription | null;

  /**
   * The tax information of the line item.
   */
  taxes?: Array<LineItem.Tax> | null;
}

export namespace LineItem {
  export interface Period {
    /**
     * The end of the period, which must be greater than or equal to the start. This
     * value is inclusive.
     */
    end: number;

    /**
     * The start of the period. This value is inclusive.
     */
    start: number;
  }

  export interface Parent {
    /**
     * The type of parent that generated this line item
     */
    type: 'invoice_item_details' | 'subscription_item_details';

    invoice_item_details?: Parent.InvoiceItemDetails | null;

    subscription_item_details?: Parent.SubscriptionItemDetails | null;
  }

  export namespace Parent {
    export interface InvoiceItemDetails {
      /**
       * The invoice item that generated this line item
       */
      invoice_item: string;

      /**
       * Whether this is a proration
       */
      proration: boolean;

      proration_details?: InvoiceItemDetails.ProrationDetails | null;

      /**
       * The subscription that the invoice item belongs to
       */
      subscription?: string | null;
    }

    export namespace InvoiceItemDetails {
      export interface ProrationDetails {
        credited_items?: ProrationDetails.CreditedItems | null;
      }

      export namespace ProrationDetails {
        export interface CreditedItems {
          /**
           * Invoice containing the credited invoice line items
           */
          invoice: string;

          /**
           * Credited invoice line items
           */
          invoice_line_items: Array<string>;
        }
      }
    }

    export interface SubscriptionItemDetails {
      /**
       * Whether this is a proration
       */
      proration: boolean;

      /**
       * The subscription item that generated this line item
       */
      subscription_item: string;

      /**
       * The invoice item that generated this line item
       */
      invoice_item?: string | null;

      proration_details?: SubscriptionItemDetails.ProrationDetails | null;

      /**
       * The subscription that the subscription item belongs to
       */
      subscription?: string | null;
    }

    export namespace SubscriptionItemDetails {
      export interface ProrationDetails {
        credited_items?: ProrationDetails.CreditedItems | null;
      }

      export namespace ProrationDetails {
        export interface CreditedItems {
          /**
           * Invoice containing the credited invoice line items
           */
          invoice: string;

          /**
           * Credited invoice line items
           */
          invoice_line_items: Array<string>;
        }
      }
    }
  }

  export interface Pricing {
    /**
     * The type of the pricing details.
     */
    type: 'price_details';

    price_details?: Pricing.PriceDetails;

    /**
     * The unit amount (in the `currency` specified) of the item which contains a
     * decimal value with at most 12 decimal places.
     */
    unit_amount_decimal?: string | null;
  }

  export namespace Pricing {
    export interface PriceDetails {
      /**
       * The ID of the price this item is associated with.
       */
      price: string | PricesAPI.Price;

      /**
       * The ID of the product this item is associated with.
       */
      product: string;
    }
  }

  export interface Tax {
    /**
     * The amount of the tax, in cents (or local equivalent).
     */
    amount: number;

    /**
     * Whether this tax is inclusive or exclusive.
     */
    tax_behavior: 'exclusive' | 'inclusive';

    /**
     * The reasoning behind this tax, for example, if the product is tax exempt. The
     * possible values for this field may be extended as new tax rules are supported.
     */
    taxability_reason:
      | 'customer_exempt'
      | 'not_available'
      | 'not_collecting'
      | 'not_subject_to_tax'
      | 'not_supported'
      | 'portion_product_exempt'
      | 'portion_reduced_rated'
      | 'portion_standard_rated'
      | 'product_exempt'
      | 'product_exempt_holiday'
      | 'proportionally_rated'
      | 'reduced_rated'
      | 'reverse_charge'
      | 'standard_rated'
      | 'taxable_basis_reduced'
      | 'zero_rated';

    /**
     * The type of tax information.
     */
    type: 'tax_rate_details';

    tax_rate_details?: Tax.TaxRateDetails | null;

    /**
     * The amount on which tax is calculated, in cents (or local equivalent).
     */
    taxable_amount?: number | null;
  }

  export namespace Tax {
    export interface TaxRateDetails {
      /**
       * ID of the tax rate
       */
      tax_rate: string;
    }
  }
}

/**
 * PaymentMethod objects represent your customer's payment instruments. You can use
 * them with [PaymentIntents](https://docs.stripe.com/payments/payment-intents) to
 * collect payments or save them to Customer objects to store instrument details
 * for future payments.
 *
 * Related guides:
 * [Payment Methods](https://docs.stripe.com/payments/payment-methods) and
 * [More Payment Scenarios](https://docs.stripe.com/payments/more-payment-scenarios).
 */
export interface PaymentMethod {
  /**
   * Unique identifier for the object.
   */
  id: string;

  billing_details: PaymentMethod.BillingDetails;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'payment_method';

  /**
   * The type of the PaymentMethod. An additional hash is included on the
   * PaymentMethod with a name matching this value. It contains additional
   * information specific to the PaymentMethod type.
   */
  type:
    | 'acss_debit'
    | 'affirm'
    | 'afterpay_clearpay'
    | 'alipay'
    | 'alma'
    | 'amazon_pay'
    | 'au_becs_debit'
    | 'bacs_debit'
    | 'bancontact'
    | 'billie'
    | 'blik'
    | 'boleto'
    | 'card'
    | 'card_present'
    | 'cashapp'
    | 'crypto'
    | 'custom'
    | 'customer_balance'
    | 'eps'
    | 'fpx'
    | 'giropay'
    | 'grabpay'
    | 'ideal'
    | 'interac_present'
    | 'kakao_pay'
    | 'klarna'
    | 'konbini'
    | 'kr_card'
    | 'link'
    | 'mb_way'
    | 'mobilepay'
    | 'multibanco'
    | 'naver_pay'
    | 'nz_bank_account'
    | 'oxxo'
    | 'p24'
    | 'pay_by_bank'
    | 'payco'
    | 'paynow'
    | 'paypal'
    | 'payto'
    | 'pix'
    | 'promptpay'
    | 'revolut_pay'
    | 'samsung_pay'
    | 'satispay'
    | 'sepa_debit'
    | 'sofort'
    | 'swish'
    | 'twint'
    | 'us_bank_account'
    | 'wechat_pay'
    | 'zip';

  acss_debit?: PaymentMethod.AcssDebit;

  affirm?: PaymentMethod.Affirm;

  afterpay_clearpay?: PaymentMethod.AfterpayClearpay;

  alipay?: PaymentMethod.Alipay;

  /**
   * This field indicates whether this payment method can be shown again to its
   * customer in a checkout flow. Stripe products such as Checkout and Elements use
   * this field to determine whether a payment method can be shown as a saved payment
   * method in a checkout flow. The field defaults to “unspecified”.
   */
  allow_redisplay?: 'always' | 'limited' | 'unspecified';

  alma?: PaymentMethod.Alma;

  amazon_pay?: PaymentMethod.AmazonPay;

  au_becs_debit?: PaymentMethod.AuBecsDebit;

  bacs_debit?: PaymentMethod.BacsDebit;

  bancontact?: PaymentMethod.Bancontact;

  billie?: PaymentMethod.Billie;

  blik?: PaymentMethod.Blik;

  boleto?: PaymentMethod.Boleto;

  card?: PaymentMethodCard;

  card_present?: PaymentMethod.CardPresent;

  cashapp?: PaymentMethod.Cashapp;

  crypto?: PaymentMethod.Crypto;

  custom?: PaymentMethod.Custom;

  /**
   * The ID of the Customer to which this PaymentMethod is saved. This will not be
   * set when the PaymentMethod has not been saved to a Customer.
   */
  customer?: string | CustomersAPI.Customer | null;

  customer_account?: string | null;

  customer_balance?: PaymentMethod.CustomerBalance;

  eps?: PaymentMethod.Eps;

  fpx?: PaymentMethod.Fpx;

  giropay?: PaymentMethod.Giropay;

  grabpay?: PaymentMethod.Grabpay;

  ideal?: PaymentMethod.Ideal;

  interac_present?: PaymentMethod.InteracPresent;

  kakao_pay?: PaymentMethod.KakaoPay;

  klarna?: PaymentMethod.Klarna;

  konbini?: PaymentMethod.Konbini;

  kr_card?: PaymentMethod.KrCard;

  link?: PaymentMethod.Link;

  mb_way?: PaymentMethod.MBWay;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  mobilepay?: PaymentMethod.Mobilepay;

  multibanco?: PaymentMethod.Multibanco;

  naver_pay?: PaymentMethod.NaverPay;

  nz_bank_account?: PaymentMethod.NzBankAccount;

  oxxo?: PaymentMethod.Oxxo;

  p24?: PaymentMethod.P24;

  pay_by_bank?: PaymentMethod.PayByBank;

  payco?: PaymentMethod.Payco;

  paynow?: PaymentMethod.Paynow;

  paypal?: PaymentMethod.Paypal;

  payto?: PaymentMethod.Payto;

  pix?: PaymentMethod.Pix;

  promptpay?: PaymentMethod.Promptpay;

  /**
   * Options to configure Radar. See
   * [Radar Session](https://docs.stripe.com/radar/radar-session) for more
   * information.
   */
  radar_options?: PaymentMethod.RadarOptions;

  revolut_pay?: PaymentMethod.RevolutPay;

  samsung_pay?: PaymentMethod.SamsungPay;

  satispay?: PaymentMethod.Satispay;

  sepa_debit?: PaymentMethodSepaDebit;

  sofort?: PaymentMethod.Sofort;

  swish?: PaymentMethod.Swish;

  twint?: PaymentMethod.Twint;

  us_bank_account?: PaymentMethod.UsBankAccount;

  wechat_pay?: PaymentMethod.WechatPay;

  zip?: PaymentMethod.Zip;
}

export namespace PaymentMethod {
  export interface BillingDetails {
    address?: Shared.Address | null;

    /**
     * Email address.
     */
    email?: string | null;

    /**
     * Full name.
     */
    name?: string | null;

    /**
     * Billing phone number (including extension).
     */
    phone?: string | null;

    /**
     * Taxpayer identification number. Used only for transactions between LATAM buyers
     * and non-LATAM sellers.
     */
    tax_id?: string | null;
  }

  export interface AcssDebit {
    /**
     * Name of the bank associated with the bank account.
     */
    bank_name?: string | null;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Institution number of the bank account.
     */
    institution_number?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    /**
     * Transit number of the bank account.
     */
    transit_number?: string | null;
  }

  export interface Affirm {}

  export interface AfterpayClearpay {}

  export interface Alipay {}

  export interface Alma {}

  export interface AmazonPay {}

  export interface AuBecsDebit {
    /**
     * Six-digit number identifying bank and branch associated with this bank account.
     */
    bsb_number?: string | null;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;
  }

  export interface BacsDebit {
    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    /**
     * Sort code of the bank account. (e.g., `10-20-30`)
     */
    sort_code?: string | null;
  }

  export interface Bancontact {}

  export interface Billie {}

  export interface Blik {}

  export interface Boleto {
    /**
     * Uniquely identifies the customer tax id (CNPJ or CPF)
     */
    tax_id: string;
  }

  export interface CardPresent {
    /**
     * Two-digit number representing the card's expiration month.
     */
    exp_month: number;

    /**
     * Four-digit number representing the card's expiration year.
     */
    exp_year: number;

    /**
     * Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`,
     * `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.
     */
    brand?: string | null;

    /**
     * The [product code](https://stripe.com/docs/card-product-codes) that identifies
     * the specific program or product associated with a card.
     */
    brand_product?: string | null;

    /**
     * The cardholder name as read from the card, in
     * [ISO 7813](https://en.wikipedia.org/wiki/ISO/IEC_7813) format. May include
     * alphanumeric characters, special characters and first/last name separator (`/`).
     * In some cases, the cardholder name may not be available depending on how the
     * issuer has configured the card. Cardholder name is typically not available on
     * swipe or contactless payments, such as those made with Apple Pay and Google Pay.
     */
    cardholder_name?: string | null;

    /**
     * Two-letter ISO code representing the country of the card. You could use this
     * attribute to get a sense of the international breakdown of cards you've
     * collected.
     */
    country?: string | null;

    /**
     * A high-level description of the type of cards issued in this range.
     */
    description?: string | null;

    /**
     * Uniquely identifies this particular card number. You can use this attribute to
     * check whether two customers who’ve signed up with you are using the same card
     * number, for example. For payment methods that tokenize card information (Apple
     * Pay, Google Pay), the tokenized number might be provided instead of the
     * underlying card number.
     *
     * _As of May 1, 2021, card fingerprint in India for Connect changed to allow two
     * fingerprints for the same card---one for India and one for the rest of the
     * world._
     */
    fingerprint?: string | null;

    /**
     * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
     */
    funding?: string | null;

    /**
     * The name of the card's issuing bank.
     */
    issuer?: string | null;

    /**
     * The last four digits of the card.
     */
    last4?: string | null;

    networks?: CardPresent.Networks | null;

    offline?: Shared.PaymentMethodDetailsCardPresentOffline | null;

    /**
     * The languages that the issuing bank recommends using for localizing any
     * customer-facing text, as read from the card. Referenced from EMV tag 5F2D, data
     * encoded on the card's chip.
     */
    preferred_locales?: Array<string> | null;

    /**
     * How card details were read in this transaction.
     */
    read_method?:
      | 'contact_emv'
      | 'contactless_emv'
      | 'contactless_magstripe_mode'
      | 'magnetic_stripe_fallback'
      | 'magnetic_stripe_track2'
      | null;

    wallet?: Shared.PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet;
  }

  export namespace CardPresent {
    export interface Networks {
      /**
       * All networks available for selection via
       * [payment_method_options.card.network](/api/payment_intents/confirm#confirm_payment_intent-payment_method_options-card-network).
       */
      available: Array<string>;

      /**
       * The preferred network for the card.
       */
      preferred?: string | null;
    }
  }

  export interface Cashapp {
    /**
     * A unique and immutable identifier assigned by Cash App to every buyer.
     */
    buyer_id?: string | null;

    /**
     * A public identifier for buyers using Cash App.
     */
    cashtag?: string | null;
  }

  export interface Crypto {}

  export interface Custom {
    /**
     * ID of the Dashboard-only CustomPaymentMethodType. Not expandable.
     */
    type: string;

    /**
     * Display name of the Dashboard-only CustomPaymentMethodType.
     */
    display_name?: string | null;

    logo?: Custom.Logo | null;
  }

  export namespace Custom {
    export interface Logo {
      /**
       * URL of the Dashboard-only CustomPaymentMethodType logo.
       */
      url: string;

      /**
       * Content type of the Dashboard-only CustomPaymentMethodType logo.
       */
      content_type?: string | null;
    }
  }

  export interface CustomerBalance {}

  export interface Eps {
    /**
     * The customer's bank. Should be one of `arzte_und_apotheker_bank`,
     * `austrian_anadi_bank_ag`, `bank_austria`, `bankhaus_carl_spangler`,
     * `bankhaus_schelhammer_und_schattera_ag`, `bawag_psk_ag`, `bks_bank_ag`,
     * `brull_kallmus_bank_ag`, `btv_vier_lander_bank`, `capital_bank_grawe_gruppe_ag`,
     * `deutsche_bank_ag`, `dolomitenbank`, `easybank_ag`, `erste_bank_und_sparkassen`,
     * `hypo_alpeadriabank_international_ag`,
     * `hypo_noe_lb_fur_niederosterreich_u_wien`,
     * `hypo_oberosterreich_salzburg_steiermark`, `hypo_tirol_bank_ag`,
     * `hypo_vorarlberg_bank_ag`, `hypo_bank_burgenland_aktiengesellschaft`,
     * `marchfelder_bank`, `oberbank_ag`, `raiffeisen_bankengruppe_osterreich`,
     * `schoellerbank_ag`, `sparda_bank_wien`, `volksbank_gruppe`,
     * `volkskreditbank_ag`, or `vr_bank_braunau`.
     */
    bank?:
      | 'arzte_und_apotheker_bank'
      | 'austrian_anadi_bank_ag'
      | 'bank_austria'
      | 'bankhaus_carl_spangler'
      | 'bankhaus_schelhammer_und_schattera_ag'
      | 'bawag_psk_ag'
      | 'bks_bank_ag'
      | 'brull_kallmus_bank_ag'
      | 'btv_vier_lander_bank'
      | 'capital_bank_grawe_gruppe_ag'
      | 'deutsche_bank_ag'
      | 'dolomitenbank'
      | 'easybank_ag'
      | 'erste_bank_und_sparkassen'
      | 'hypo_alpeadriabank_international_ag'
      | 'hypo_bank_burgenland_aktiengesellschaft'
      | 'hypo_noe_lb_fur_niederosterreich_u_wien'
      | 'hypo_oberosterreich_salzburg_steiermark'
      | 'hypo_tirol_bank_ag'
      | 'hypo_vorarlberg_bank_ag'
      | 'marchfelder_bank'
      | 'oberbank_ag'
      | 'raiffeisen_bankengruppe_osterreich'
      | 'schoellerbank_ag'
      | 'sparda_bank_wien'
      | 'volksbank_gruppe'
      | 'volkskreditbank_ag'
      | 'vr_bank_braunau'
      | null;
  }

  export interface Fpx {
    /**
     * The customer's bank, if provided. Can be one of `affin_bank`, `agrobank`,
     * `alliance_bank`, `ambank`, `bank_islam`, `bank_muamalat`, `bank_rakyat`, `bsn`,
     * `cimb`, `hong_leong_bank`, `hsbc`, `kfh`, `maybank2u`, `ocbc`, `public_bank`,
     * `rhb`, `standard_chartered`, `uob`, `deutsche_bank`, `maybank2e`,
     * `pb_enterprise`, or `bank_of_china`.
     */
    bank:
      | 'affin_bank'
      | 'agrobank'
      | 'alliance_bank'
      | 'ambank'
      | 'bank_islam'
      | 'bank_muamalat'
      | 'bank_of_china'
      | 'bank_rakyat'
      | 'bsn'
      | 'cimb'
      | 'deutsche_bank'
      | 'hong_leong_bank'
      | 'hsbc'
      | 'kfh'
      | 'maybank2e'
      | 'maybank2u'
      | 'ocbc'
      | 'pb_enterprise'
      | 'public_bank'
      | 'rhb'
      | 'standard_chartered'
      | 'uob';
  }

  export interface Giropay {}

  export interface Grabpay {}

  export interface Ideal {
    /**
     * The customer's bank, if provided. Can be one of `abn_amro`, `adyen`, `asn_bank`,
     * `bunq`, `buut`, `finom`, `handelsbanken`, `ing`, `knab`, `mollie`, `moneyou`,
     * `n26`, `nn`, `rabobank`, `regiobank`, `revolut`, `sns_bank`, `triodos_bank`,
     * `van_lanschot`, or `yoursafe`.
     */
    bank?:
      | 'abn_amro'
      | 'adyen'
      | 'asn_bank'
      | 'bunq'
      | 'buut'
      | 'finom'
      | 'handelsbanken'
      | 'ing'
      | 'knab'
      | 'mollie'
      | 'moneyou'
      | 'n26'
      | 'nn'
      | 'rabobank'
      | 'regiobank'
      | 'revolut'
      | 'sns_bank'
      | 'triodos_bank'
      | 'van_lanschot'
      | 'yoursafe'
      | null;

    /**
     * The Bank Identifier Code of the customer's bank, if the bank was provided.
     */
    bic?:
      | 'ABNANL2A'
      | 'ADYBNL2A'
      | 'ASNBNL21'
      | 'BITSNL2A'
      | 'BUNQNL2A'
      | 'BUUTNL2A'
      | 'FNOMNL22'
      | 'FVLBNL22'
      | 'HANDNL2A'
      | 'INGBNL2A'
      | 'KNABNL2H'
      | 'MLLENL2A'
      | 'MOYONL21'
      | 'NNBANL2G'
      | 'NTSBDEB1'
      | 'RABONL2U'
      | 'RBRBNL21'
      | 'REVOIE23'
      | 'REVOLT21'
      | 'SNSBNL2A'
      | 'TRIONL2U'
      | null;
  }

  export interface InteracPresent {
    /**
     * Two-digit number representing the card's expiration month.
     */
    exp_month: number;

    /**
     * Four-digit number representing the card's expiration year.
     */
    exp_year: number;

    /**
     * Card brand. Can be `interac`, `mastercard` or `visa`.
     */
    brand?: string | null;

    /**
     * The cardholder name as read from the card, in
     * [ISO 7813](https://en.wikipedia.org/wiki/ISO/IEC_7813) format. May include
     * alphanumeric characters, special characters and first/last name separator (`/`).
     * In some cases, the cardholder name may not be available depending on how the
     * issuer has configured the card. Cardholder name is typically not available on
     * swipe or contactless payments, such as those made with Apple Pay and Google Pay.
     */
    cardholder_name?: string | null;

    /**
     * Two-letter ISO code representing the country of the card. You could use this
     * attribute to get a sense of the international breakdown of cards you've
     * collected.
     */
    country?: string | null;

    /**
     * A high-level description of the type of cards issued in this range.
     */
    description?: string | null;

    /**
     * Uniquely identifies this particular card number. You can use this attribute to
     * check whether two customers who’ve signed up with you are using the same card
     * number, for example. For payment methods that tokenize card information (Apple
     * Pay, Google Pay), the tokenized number might be provided instead of the
     * underlying card number.
     *
     * _As of May 1, 2021, card fingerprint in India for Connect changed to allow two
     * fingerprints for the same card---one for India and one for the rest of the
     * world._
     */
    fingerprint?: string | null;

    /**
     * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
     */
    funding?: string | null;

    /**
     * The name of the card's issuing bank.
     */
    issuer?: string | null;

    /**
     * The last four digits of the card.
     */
    last4?: string | null;

    networks?: InteracPresent.Networks | null;

    /**
     * The languages that the issuing bank recommends using for localizing any
     * customer-facing text, as read from the card. Referenced from EMV tag 5F2D, data
     * encoded on the card's chip.
     */
    preferred_locales?: Array<string> | null;

    /**
     * How card details were read in this transaction.
     */
    read_method?:
      | 'contact_emv'
      | 'contactless_emv'
      | 'contactless_magstripe_mode'
      | 'magnetic_stripe_fallback'
      | 'magnetic_stripe_track2'
      | null;
  }

  export namespace InteracPresent {
    export interface Networks {
      /**
       * All networks available for selection via
       * [payment_method_options.card.network](/api/payment_intents/confirm#confirm_payment_intent-payment_method_options-card-network).
       */
      available: Array<string>;

      /**
       * The preferred network for the card.
       */
      preferred?: string | null;
    }
  }

  export interface KakaoPay {}

  export interface Klarna {
    dob?: Klarna.Dob | null;
  }

  export namespace Klarna {
    export interface Dob {
      /**
       * The day of birth, between 1 and 31.
       */
      day?: number | null;

      /**
       * The month of birth, between 1 and 12.
       */
      month?: number | null;

      /**
       * The four-digit year of birth.
       */
      year?: number | null;
    }
  }

  export interface Konbini {}

  export interface KrCard {
    /**
     * The local credit or debit card brand.
     */
    brand?:
      | 'bc'
      | 'citi'
      | 'hana'
      | 'hyundai'
      | 'jeju'
      | 'jeonbuk'
      | 'kakaobank'
      | 'kbank'
      | 'kdbbank'
      | 'kookmin'
      | 'kwangju'
      | 'lotte'
      | 'mg'
      | 'nh'
      | 'post'
      | 'samsung'
      | 'savingsbank'
      | 'shinhan'
      | 'shinhyup'
      | 'suhyup'
      | 'tossbank'
      | 'woori'
      | null;

    /**
     * The last four digits of the card. This may not be present for American Express
     * cards.
     */
    last4?: string | null;
  }

  export interface Link {
    /**
     * Account owner's email address.
     */
    email?: string | null;
  }

  export interface MBWay {}

  export interface Mobilepay {}

  export interface Multibanco {}

  export interface NaverPay {
    /**
     * Whether to fund this transaction with Naver Pay points or a card.
     */
    funding: 'card' | 'points';

    /**
     * Uniquely identifies this particular Naver Pay account. You can use this
     * attribute to check whether two Naver Pay accounts are the same.
     */
    buyer_id?: string | null;
  }

  export interface NzBankAccount {
    /**
     * The numeric code for the bank account's bank.
     */
    bank_code: string;

    /**
     * The name of the bank.
     */
    bank_name: string;

    /**
     * The numeric code for the bank account's bank branch.
     */
    branch_code: string;

    /**
     * Last four digits of the bank account number.
     */
    last4: string;

    /**
     * The name on the bank account. Only present if the account holder name is
     * different from the name of the authorized signatory collected in the
     * PaymentMethod’s billing details.
     */
    account_holder_name?: string | null;

    /**
     * The suffix of the bank account number.
     */
    suffix?: string | null;
  }

  export interface Oxxo {}

  export interface P24 {
    /**
     * The customer's bank, if provided.
     */
    bank?:
      | 'alior_bank'
      | 'bank_millennium'
      | 'bank_nowy_bfg_sa'
      | 'bank_pekao_sa'
      | 'banki_spbdzielcze'
      | 'blik'
      | 'bnp_paribas'
      | 'boz'
      | 'citi_handlowy'
      | 'credit_agricole'
      | 'envelobank'
      | 'etransfer_pocztowy24'
      | 'getin_bank'
      | 'ideabank'
      | 'ing'
      | 'inteligo'
      | 'mbank_mtransfer'
      | 'nest_przelew'
      | 'noble_pay'
      | 'pbac_z_ipko'
      | 'plus_bank'
      | 'santander_przelew24'
      | 'tmobile_usbugi_bankowe'
      | 'toyota_bank'
      | 'velobank'
      | 'volkswagen_bank'
      | null;
  }

  export interface PayByBank {}

  export interface Payco {}

  export interface Paynow {}

  export interface Paypal {
    /**
     * Two-letter ISO code representing the buyer's country. Values are provided by
     * PayPal directly (if supported) at the time of authorization or settlement. They
     * cannot be set or mutated.
     */
    country?: string | null;

    /**
     * Owner's email. Values are provided by PayPal directly (if supported) at the time
     * of authorization or settlement. They cannot be set or mutated.
     */
    payer_email?: string | null;

    /**
     * PayPal account PayerID. This identifier uniquely identifies the PayPal customer.
     */
    payer_id?: string | null;
  }

  export interface Payto {
    /**
     * Bank-State-Branch number of the bank account.
     */
    bsb_number?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    /**
     * The PayID alias for the bank account.
     */
    pay_id?: string | null;
  }

  export interface Pix {}

  export interface Promptpay {}

  /**
   * Options to configure Radar. See
   * [Radar Session](https://docs.stripe.com/radar/radar-session) for more
   * information.
   */
  export interface RadarOptions {
    /**
     * A [Radar Session](https://docs.stripe.com/radar/radar-session) is a snapshot of
     * the browser metadata and device details that help Radar make more accurate
     * predictions on your payments.
     */
    session?: string;
  }

  export interface RevolutPay {}

  export interface SamsungPay {}

  export interface Satispay {}

  export interface Sofort {
    /**
     * Two-letter ISO code representing the country the bank account is located in.
     */
    country?: string | null;
  }

  export interface Swish {}

  export interface Twint {}

  export interface UsBankAccount {
    /**
     * Account holder type: individual or company.
     */
    account_holder_type?: 'company' | 'individual' | null;

    /**
     * Account type: checkings or savings. Defaults to checking if omitted.
     */
    account_type?: 'checking' | 'savings' | null;

    /**
     * The name of the bank.
     */
    bank_name?: string | null;

    /**
     * The ID of the Financial Connections Account used to create the payment method.
     */
    financial_connections_account?: string | null;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    networks?: UsBankAccount.Networks | null;

    /**
     * Routing number of the bank account.
     */
    routing_number?: string | null;

    status_details?: UsBankAccount.StatusDetails | null;
  }

  export namespace UsBankAccount {
    export interface Networks {
      /**
       * All supported networks.
       */
      supported: Array<'ach' | 'us_domestic_wire'>;

      /**
       * The preferred network.
       */
      preferred?: string | null;
    }

    export interface StatusDetails {
      blocked?: StatusDetails.Blocked;
    }

    export namespace StatusDetails {
      export interface Blocked {
        /**
         * The ACH network code that resulted in this block.
         */
        network_code?:
          | 'R02'
          | 'R03'
          | 'R04'
          | 'R05'
          | 'R07'
          | 'R08'
          | 'R10'
          | 'R11'
          | 'R16'
          | 'R20'
          | 'R29'
          | 'R31'
          | null;

        /**
         * The reason why this PaymentMethod's fingerprint has been blocked
         */
        reason?:
          | 'bank_account_closed'
          | 'bank_account_frozen'
          | 'bank_account_invalid_details'
          | 'bank_account_restricted'
          | 'bank_account_unusable'
          | 'debit_not_authorized'
          | 'tokenized_account_number_deactivated'
          | null;
      }
    }
  }

  export interface WechatPay {}

  export interface Zip {}
}

export interface PaymentMethodCard {
  /**
   * Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`,
   * `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.
   */
  brand: string;

  /**
   * Two-digit number representing the card's expiration month.
   */
  exp_month: number;

  /**
   * Four-digit number representing the card's expiration year.
   */
  exp_year: number;

  /**
   * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
   */
  funding: string;

  /**
   * The last four digits of the card.
   */
  last4: string;

  checks?: PaymentMethodCard.Checks | null;

  /**
   * Two-letter ISO code representing the country of the card. You could use this
   * attribute to get a sense of the international breakdown of cards you've
   * collected.
   */
  country?: string | null;

  /**
   * The brand to use when displaying the card, this accounts for customer's brand
   * choice on dual-branded cards. Can be `american_express`, `cartes_bancaires`,
   * `diners_club`, `discover`, `eftpos_australia`, `interac`, `jcb`, `mastercard`,
   * `union_pay`, `visa`, or `other` and may contain more values in the future.
   */
  display_brand?: string | null;

  /**
   * Uniquely identifies this particular card number. You can use this attribute to
   * check whether two customers who’ve signed up with you are using the same card
   * number, for example. For payment methods that tokenize card information (Apple
   * Pay, Google Pay), the tokenized number might be provided instead of the
   * underlying card number.
   *
   * _As of May 1, 2021, card fingerprint in India for Connect changed to allow two
   * fingerprints for the same card---one for India and one for the rest of the
   * world._
   */
  fingerprint?: string | null;

  generated_from?: PaymentMethodCardGeneratedCard | null;

  networks?: PaymentMethodCard.Networks | null;

  /**
   * Status of a card based on the card issuer.
   */
  regulated_status?: 'regulated' | 'unregulated' | null;

  three_d_secure_usage?: PaymentMethodCard.ThreeDSecureUsage | null;

  wallet?: PaymentMethodCard.Wallet | null;
}

export namespace PaymentMethodCard {
  export interface Checks {
    /**
     * If a address line1 was provided, results of the check, one of `pass`, `fail`,
     * `unavailable`, or `unchecked`.
     */
    address_line1_check?: string | null;

    /**
     * If a address postal code was provided, results of the check, one of `pass`,
     * `fail`, `unavailable`, or `unchecked`.
     */
    address_postal_code_check?: string | null;

    /**
     * If a CVC was provided, results of the check, one of `pass`, `fail`,
     * `unavailable`, or `unchecked`.
     */
    cvc_check?: string | null;
  }

  export interface Networks {
    /**
     * All networks available for selection via
     * [payment_method_options.card.network](/api/payment_intents/confirm#confirm_payment_intent-payment_method_options-card-network).
     */
    available: Array<string>;

    /**
     * The preferred network for co-branded cards. Can be `cartes_bancaires`,
     * `mastercard`, `visa` or `invalid_preference` if requested network is not valid
     * for the card.
     */
    preferred?: string | null;
  }

  export interface ThreeDSecureUsage {
    /**
     * Whether 3D Secure is supported on this card.
     */
    supported: boolean;
  }

  export interface Wallet {
    /**
     * The type of the card wallet, one of `amex_express_checkout`, `apple_pay`,
     * `google_pay`, `masterpass`, `samsung_pay`, `visa_checkout`, or `link`. An
     * additional hash is included on the Wallet subhash with a name matching this
     * value. It contains additional information specific to the card wallet type.
     */
    type:
      | 'amex_express_checkout'
      | 'apple_pay'
      | 'google_pay'
      | 'link'
      | 'masterpass'
      | 'samsung_pay'
      | 'visa_checkout';

    amex_express_checkout?: Wallet.AmexExpressCheckout;

    apple_pay?: Wallet.ApplePay;

    /**
     * (For tokenized numbers only.) The last four digits of the device account number.
     */
    dynamic_last4?: string | null;

    google_pay?: Wallet.GooglePay;

    link?: Wallet.Link;

    masterpass?: Wallet.Masterpass;

    samsung_pay?: Wallet.SamsungPay;

    visa_checkout?: Wallet.VisaCheckout;
  }

  export namespace Wallet {
    export interface AmexExpressCheckout {}

    export interface ApplePay {}

    export interface GooglePay {}

    export interface Link {}

    export interface Masterpass {
      billing_address?: Shared.Address | null;

      /**
       * Owner's verified email. Values are verified or provided by the wallet directly
       * (if supported) at the time of authorization or settlement. They cannot be set or
       * mutated.
       */
      email?: string | null;

      /**
       * Owner's verified full name. Values are verified or provided by the wallet
       * directly (if supported) at the time of authorization or settlement. They cannot
       * be set or mutated.
       */
      name?: string | null;

      shipping_address?: Shared.Address | null;
    }

    export interface SamsungPay {}

    export interface VisaCheckout {
      billing_address?: Shared.Address | null;

      /**
       * Owner's verified email. Values are verified or provided by the wallet directly
       * (if supported) at the time of authorization or settlement. They cannot be set or
       * mutated.
       */
      email?: string | null;

      /**
       * Owner's verified full name. Values are verified or provided by the wallet
       * directly (if supported) at the time of authorization or settlement. They cannot
       * be set or mutated.
       */
      name?: string | null;

      shipping_address?: Shared.Address | null;
    }
  }
}

export interface PaymentMethodCardGeneratedCard {
  /**
   * The charge that created this object.
   */
  charge?: string | null;

  payment_method_details?: PaymentMethodCardGeneratedCard.PaymentMethodDetails | null;

  /**
   * The ID of the SetupAttempt that generated this PaymentMethod, if any.
   */
  setup_attempt?: string | SubscriptionsAPI.SetupAttempt | null;
}

export namespace PaymentMethodCardGeneratedCard {
  export interface PaymentMethodDetails {
    /**
     * The type of payment method transaction-specific details from the transaction
     * that generated this `card` payment method. Always `card_present`.
     */
    type: string;

    card_present?: Shared.PaymentMethodDetailsCardPresent;
  }
}

export interface PaymentMethodDetailsPaymentRecordUsBankAccount {
  /**
   * The type of entity that holds the account. This can be either 'individual' or
   * 'company'.
   */
  account_holder_type?: 'company' | 'individual' | null;

  /**
   * The type of the bank account. This can be either 'checking' or 'savings'.
   */
  account_type?: 'checking' | 'savings' | null;

  /**
   * Name of the bank associated with the bank account.
   */
  bank_name?: string | null;

  /**
   * Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD
   * format.
   */
  expected_debit_date?: string | null;

  /**
   * Uniquely identifies this particular bank account. You can use this attribute to
   * check whether two bank accounts are the same.
   */
  fingerprint?: string | null;

  /**
   * Last four digits of the bank account number.
   */
  last4?: string | null;

  /**
   * ID of the mandate used to make this payment.
   */
  mandate?: string | SubscriptionsAPI.Mandate;

  /**
   * The ACH payment reference for this transaction.
   */
  payment_reference?: string | null;

  /**
   * The routing number for the bank account.
   */
  routing_number?: string | null;
}

export interface PaymentMethodSepaDebit {
  /**
   * Bank code of bank associated with the bank account.
   */
  bank_code?: string | null;

  /**
   * Branch code of bank associated with the bank account.
   */
  branch_code?: string | null;

  /**
   * Two-letter ISO code representing the country the bank account is located in.
   */
  country?: string | null;

  /**
   * Uniquely identifies this particular bank account. You can use this attribute to
   * check whether two bank accounts are the same.
   */
  fingerprint?: string | null;

  generated_from?: SepaDebitGeneratedFrom | null;

  /**
   * Last four characters of the IBAN.
   */
  last4?: string | null;
}

/**
 * A Payment Record is a resource that allows you to represent payments that occur
 * on- or off-Stripe. For example, you can create a Payment Record to model a
 * payment made on a different payment processor, in order to mark an Invoice as
 * paid and a Subscription as active. Payment Records consist of one or more
 * Payment Attempt Records, which represent individual attempts made on a payment
 * network.
 */
export interface PaymentRecord {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * A representation of an amount of money, consisting of an amount and a currency.
   */
  amount: PaymentsPrimitivesPaymentRecordsResourceAmount;

  /**
   * A representation of an amount of money, consisting of an amount and a currency.
   */
  amount_authorized: PaymentsPrimitivesPaymentRecordsResourceAmount;

  /**
   * A representation of an amount of money, consisting of an amount and a currency.
   */
  amount_canceled: PaymentsPrimitivesPaymentRecordsResourceAmount;

  /**
   * A representation of an amount of money, consisting of an amount and a currency.
   */
  amount_failed: PaymentsPrimitivesPaymentRecordsResourceAmount;

  /**
   * A representation of an amount of money, consisting of an amount and a currency.
   */
  amount_guaranteed: PaymentsPrimitivesPaymentRecordsResourceAmount;

  /**
   * A representation of an amount of money, consisting of an amount and a currency.
   */
  amount_refunded: PaymentsPrimitivesPaymentRecordsResourceAmount;

  /**
   * A representation of an amount of money, consisting of an amount and a currency.
   */
  amount_requested: PaymentsPrimitivesPaymentRecordsResourceAmount;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata: { [key: string]: string };

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'payment_record';

  /**
   * Processor information associated with this payment.
   */
  processor_details: PaymentRecord.ProcessorDetails;

  /**
   * Indicates who reported the payment.
   */
  reported_by: 'self' | 'stripe';

  /**
   * ID of the Connect application that created the PaymentRecord.
   */
  application?: string | null;

  /**
   * Information about the customer for this payment.
   */
  customer_details?: PaymentRecord.CustomerDetails | null;

  /**
   * Indicates whether the customer was present in your checkout flow during this
   * payment.
   */
  customer_presence?: 'off_session' | 'on_session' | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * ID of the latest Payment Attempt Record attached to this Payment Record.
   */
  latest_payment_attempt_record?: string | null;

  /**
   * Details about the Payment Method used in this payment attempt.
   */
  payment_method_details?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails | null;

  /**
   * The customer's shipping information associated with this payment.
   */
  shipping_details?: PaymentRecord.ShippingDetails | null;
}

export namespace PaymentRecord {
  /**
   * Processor information associated with this payment.
   */
  export interface ProcessorDetails {
    /**
     * The processor used for this payment attempt.
     */
    type: 'custom';

    /**
     * Custom processors represent payment processors not modeled directly in the
     * Stripe API. This resource consists of details about the custom processor used
     * for this payment attempt.
     */
    custom?: ProcessorDetails.Custom;
  }

  export namespace ProcessorDetails {
    /**
     * Custom processors represent payment processors not modeled directly in the
     * Stripe API. This resource consists of details about the custom processor used
     * for this payment attempt.
     */
    export interface Custom {
      /**
       * An opaque string for manual reconciliation of this payment, for example a check
       * number or a payment processor ID.
       */
      payment_reference?: string | null;
    }
  }

  /**
   * Information about the customer for this payment.
   */
  export interface CustomerDetails {
    /**
     * ID of the Stripe Customer associated with this payment.
     */
    customer?: string | null;

    /**
     * The customer's email address.
     */
    email?: string | null;

    /**
     * The customer's name.
     */
    name?: string | null;

    /**
     * The customer's phone number.
     */
    phone?: string | null;
  }

  /**
   * The customer's shipping information associated with this payment.
   */
  export interface ShippingDetails {
    /**
     * A representation of a physical address.
     */
    address: ShippingDetails.Address;

    /**
     * The shipping recipient's name.
     */
    name?: string | null;

    /**
     * The shipping recipient's phone number.
     */
    phone?: string | null;
  }

  export namespace ShippingDetails {
    /**
     * A representation of a physical address.
     */
    export interface Address {
      /**
       * City, district, suburb, town, or village.
       */
      city?: string | null;

      /**
       * Two-letter country code
       * ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
       */
      country?: string | null;

      /**
       * Address line 1, such as the street, PO Box, or company name.
       */
      line1?: string | null;

      /**
       * Address line 2, such as the apartment, suite, unit, or building.
       */
      line2?: string | null;

      /**
       * ZIP or postal code.
       */
      postal_code?: string | null;

      /**
       * State, county, province, or region
       * ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).
       */
      state?: string | null;
    }
  }
}

/**
 * A representation of an amount of money, consisting of an amount and a currency.
 */
export interface PaymentsPrimitivesPaymentRecordsResourceAmount {
  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * A positive integer representing the amount in the currency's
   * [minor unit](https://docs.stripe.com/currencies#zero-decimal). For example,
   * `100` can represent 1 USD or 100 JPY.
   */
  value: number;
}

/**
 * Details about the Payment Method used in this payment attempt.
 */
export interface PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails {
  /**
   * The type of transaction-specific details of the payment method used in the
   * payment. See
   * [PaymentMethod.type](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type)
   * for the full list of possible types. An additional hash is included on
   * `payment_method_details` with a name matching this value. It contains
   * information specific to the payment method.
   */
  type: string;

  ach_credit_transfer?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.ACHCreditTransfer;

  ach_debit?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.ACHDebit;

  acss_debit?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.AcssDebit;

  affirm?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Affirm;

  afterpay_clearpay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.AfterpayClearpay;

  alipay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Alipay;

  alma?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Alma;

  amazon_pay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.AmazonPay;

  au_becs_debit?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.AuBecsDebit;

  bacs_debit?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.BacsDebit;

  bancontact?: DisputesAPI.PaymentMethodDetailsBancontactDispute;

  billie?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Billie;

  /**
   * Billing details used by the customer for this payment.
   */
  billing_details?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.BillingDetails | null;

  blik?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Blik;

  boleto?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Boleto;

  /**
   * Details of the card used for this payment attempt.
   */
  card?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Card;

  card_present?: Shared.PaymentMethodDetailsCardPresent;

  cashapp?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Cashapp;

  crypto?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Crypto;

  /**
   * Custom Payment Methods represent Payment Method types not modeled directly in
   * the Stripe API. This resource consists of details about the custom payment
   * method used for this payment attempt.
   */
  custom?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Custom;

  customer_balance?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.CustomerBalance;

  eps?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Eps;

  fpx?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Fpx;

  giropay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Giropay;

  grabpay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Grabpay;

  ideal?: DisputesAPI.PaymentMethodDetailsIdealDispute;

  interac_present?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.InteracPresent;

  kakao_pay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.KakaoPay;

  klarna?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Klarna;

  konbini?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Konbini;

  kr_card?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.KrCard;

  link?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Link;

  mb_way?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.MBWay;

  mobilepay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Mobilepay;

  multibanco?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Multibanco;

  naver_pay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.NaverPay;

  nz_bank_account?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.NzBankAccount;

  oxxo?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Oxxo;

  p24?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.P24;

  pay_by_bank?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.PayByBank;

  payco?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Payco;

  /**
   * ID of the Stripe PaymentMethod used to make this payment.
   */
  payment_method?: string | null;

  paynow?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Paynow;

  paypal?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Paypal;

  payto?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Payto;

  pix?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Pix;

  promptpay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Promptpay;

  revolut_pay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.RevolutPay;

  samsung_pay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.SamsungPay;

  satispay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Satispay;

  sepa_debit?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.SepaDebit;

  sofort?: DisputesAPI.PaymentMethodDetailsSofortDispute;

  stripe_account?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.StripeAccount;

  swish?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Swish;

  twint?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Twint;

  us_bank_account?: PaymentMethodDetailsPaymentRecordUsBankAccount;

  wechat?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Wechat;

  wechat_pay?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.WechatPay;

  zip?: PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails.Zip;
}

export namespace PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails {
  export interface ACHCreditTransfer {
    /**
     * Account number to transfer funds to.
     */
    account_number?: string | null;

    /**
     * Name of the bank associated with the routing number.
     */
    bank_name?: string | null;

    /**
     * Routing transit number for the bank account to transfer funds to.
     */
    routing_number?: string | null;

    /**
     * SWIFT code of the bank associated with the routing number.
     */
    swift_code?: string | null;
  }

  export interface ACHDebit {
    /**
     * Type of entity that holds the account. This can be either `individual` or
     * `company`.
     */
    account_holder_type?: 'company' | 'individual' | null;

    /**
     * Name of the bank associated with the bank account.
     */
    bank_name?: string | null;

    /**
     * Two-letter ISO code representing the country the bank account is located in.
     */
    country?: string | null;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    /**
     * Routing transit number of the bank account.
     */
    routing_number?: string | null;
  }

  export interface AcssDebit {
    /**
     * Name of the bank associated with the bank account.
     */
    bank_name?: string | null;

    /**
     * Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD
     * format.
     */
    expected_debit_date?: string;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Institution number of the bank account
     */
    institution_number?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    /**
     * ID of the mandate used to make this payment.
     */
    mandate?: string;

    /**
     * Transit number of the bank account.
     */
    transit_number?: string | null;
  }

  export interface Affirm {
    /**
     * ID of the [location](https://docs.stripe.com/api/terminal/locations) that this
     * transaction's reader is assigned to.
     */
    location?: string;

    /**
     * ID of the [reader](https://docs.stripe.com/api/terminal/readers) this
     * transaction was made on.
     */
    reader?: string;

    /**
     * The Affirm transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export interface AfterpayClearpay {
    /**
     * The Afterpay order ID associated with this payment intent.
     */
    order_id?: string | null;

    /**
     * Order identifier shown to the merchant in Afterpay’s online portal.
     */
    reference?: string | null;
  }

  export interface Alipay {
    /**
     * Uniquely identifies this particular Alipay account. You can use this attribute
     * to check whether two Alipay accounts are the same.
     */
    buyer_id?: string;

    /**
     * Uniquely identifies this particular Alipay account. You can use this attribute
     * to check whether two Alipay accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Transaction ID of this particular Alipay transaction.
     */
    transaction_id?: string | null;
  }

  export interface Alma {
    installments?: Alma.Installments;

    /**
     * The Alma transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export namespace Alma {
    export interface Installments {
      /**
       * The number of installments.
       */
      count: number;
    }
  }

  export interface AmazonPay {
    funding?: AmazonPay.Funding;

    /**
     * The Amazon Pay transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export namespace AmazonPay {
    export interface Funding {
      card?: Shared.PaymentMethodDetailsPassthroughCard;

      /**
       * funding type of the underlying payment method.
       */
      type?: 'card' | null;
    }
  }

  export interface AuBecsDebit {
    /**
     * Bank-State-Branch number of the bank account.
     */
    bsb_number?: string | null;

    /**
     * Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD
     * format.
     */
    expected_debit_date?: string;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    /**
     * ID of the mandate used to make this payment.
     */
    mandate?: string;
  }

  export interface BacsDebit {
    /**
     * Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD
     * format.
     */
    expected_debit_date?: string;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    /**
     * ID of the mandate used to make this payment.
     */
    mandate?: string | null;

    /**
     * Sort code of the bank account. (e.g., `10-20-30`)
     */
    sort_code?: string | null;
  }

  export interface Billie {
    /**
     * The Billie transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  /**
   * Billing details used by the customer for this payment.
   */
  export interface BillingDetails {
    /**
     * A representation of a physical address.
     */
    address: BillingDetails.Address;

    /**
     * The billing email associated with the method of payment.
     */
    email?: string | null;

    /**
     * The billing name associated with the method of payment.
     */
    name?: string | null;

    /**
     * The billing phone number associated with the method of payment.
     */
    phone?: string | null;
  }

  export namespace BillingDetails {
    /**
     * A representation of a physical address.
     */
    export interface Address {
      /**
       * City, district, suburb, town, or village.
       */
      city?: string | null;

      /**
       * Two-letter country code
       * ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
       */
      country?: string | null;

      /**
       * Address line 1, such as the street, PO Box, or company name.
       */
      line1?: string | null;

      /**
       * Address line 2, such as the apartment, suite, unit, or building.
       */
      line2?: string | null;

      /**
       * ZIP or postal code.
       */
      postal_code?: string | null;

      /**
       * State, county, province, or region
       * ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).
       */
      state?: string | null;
    }
  }

  export interface Blik {
    /**
     * A unique and immutable identifier assigned by BLIK to every buyer.
     */
    buyer_id?: string | null;
  }

  export interface Boleto {
    /**
     * The tax ID of the customer (CPF for individuals consumers or CNPJ for businesses
     * consumers)
     */
    tax_id: string;
  }

  /**
   * Details of the card used for this payment attempt.
   */
  export interface Card {
    /**
     * Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`,
     * `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.
     */
    brand:
      | 'amex'
      | 'cartes_bancaires'
      | 'diners'
      | 'discover'
      | 'eftpos_au'
      | 'interac'
      | 'jcb'
      | 'link'
      | 'mastercard'
      | 'unionpay'
      | 'unknown'
      | 'visa';

    /**
     * Two-digit number representing the card's expiration month.
     */
    exp_month: number;

    /**
     * Four-digit number representing the card's expiration year.
     */
    exp_year: number;

    /**
     * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
     */
    funding: 'credit' | 'debit' | 'prepaid' | 'unknown';

    /**
     * The last four digits of the card.
     */
    last4: string;

    /**
     * The authorization code of the payment.
     */
    authorization_code?: string | null;

    /**
     * When using manual capture, a future timestamp at which the charge will be
     * automatically refunded if uncaptured.
     */
    capture_before?: number;

    checks?: Card.Checks | null;

    /**
     * Two-letter ISO code representing the country of the card. You could use this
     * attribute to get a sense of the international breakdown of cards you've
     * collected.
     */
    country?: string | null;

    /**
     * A high-level description of the type of cards issued in this range.
     */
    description?: string | null;

    /**
     * Uniquely identifies this particular card number. You can use this attribute to
     * check whether two customers who’ve signed up with you are using the same card
     * number, for example. For payment methods that tokenize card information (Apple
     * Pay, Google Pay), the tokenized number might be provided instead of the
     * underlying card number.
     *
     * _As of May 1, 2021, card fingerprint in India for Connect changed to allow two
     * fingerprints for the same card---one for India and one for the rest of the
     * world._
     */
    fingerprint?: string | null;

    /**
     * Issuer identification number of the card.
     */
    iin?: string | null;

    installments?: Card.Installments | null;

    /**
     * The name of the card's issuing bank.
     */
    issuer?: string | null;

    /**
     * Identifies which network this charge was processed on. Can be `amex`,
     * `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `interac`, `jcb`, `link`,
     * `mastercard`, `unionpay`, `visa`, or `unknown`.
     */
    network?:
      | 'amex'
      | 'cartes_bancaires'
      | 'diners'
      | 'discover'
      | 'eftpos_au'
      | 'interac'
      | 'jcb'
      | 'link'
      | 'mastercard'
      | 'unionpay'
      | 'unknown'
      | 'visa'
      | null;

    /**
     * Advice code from the card network for the failed payment.
     */
    network_advice_code?: string | null;

    /**
     * Decline code from the card network for the failed payment.
     */
    network_decline_code?: string | null;

    network_token?: Card.NetworkToken | null;

    /**
     * This is used by the financial networks to identify a transaction. Visa calls
     * this the Transaction ID, Mastercard calls this the Trace ID, and American
     * Express calls this the Acquirer Reference Data. This value will be present if it
     * is returned by the financial network in the authorization response, and null
     * otherwise.
     */
    network_transaction_id?: string | null;

    /**
     * The transaction type that was passed for an off-session, Merchant-Initiated
     * transaction, one of `recurring` or `unscheduled`.
     */
    stored_credential_usage?: 'recurring' | 'unscheduled' | null;

    three_d_secure?: Card.ThreeDSecure | null;

    wallet?: Card.Wallet | null;
  }

  export namespace Card {
    export interface Checks {
      address_line1_check?: 'fail' | 'pass' | 'unavailable' | 'unchecked' | null;

      address_postal_code_check?: 'fail' | 'pass' | 'unavailable' | 'unchecked' | null;

      cvc_check?: 'fail' | 'pass' | 'unavailable' | 'unchecked' | null;
    }

    export interface Installments {
      plan?: Installments.Plan | null;
    }

    export namespace Installments {
      export interface Plan {
        /**
         * Type of installment plan, one of `fixed_count`, `revolving`, or `bonus`.
         */
        type: 'bonus' | 'fixed_count' | 'revolving';

        /**
         * For `fixed_count` installment plans, this is the number of installment payments
         * your customer will make to their credit card.
         */
        count?: number | null;

        /**
         * For `fixed_count` installment plans, this is the interval between installment
         * payments your customer will make to their credit card. One of `month`.
         */
        interval?: 'month' | null;
      }
    }

    export interface NetworkToken {
      /**
       * Indicates if Stripe used a network token, either user provided or Stripe managed
       * when processing the transaction.
       */
      used: boolean;
    }

    export interface ThreeDSecure {
      authentication_flow?: 'challenge' | 'frictionless' | null;

      result?:
        | 'attempt_acknowledged'
        | 'authenticated'
        | 'exempted'
        | 'failed'
        | 'not_supported'
        | 'processing_error'
        | null;

      result_reason?:
        | 'abandoned'
        | 'bypassed'
        | 'canceled'
        | 'card_not_enrolled'
        | 'network_not_supported'
        | 'protocol_error'
        | 'rejected'
        | null;

      version?: '1.0.2' | '2.1.0' | '2.2.0' | null;
    }

    export interface Wallet {
      /**
       * The type of the card wallet, one of `apple_pay` or `google_pay`. An additional
       * hash is included on the Wallet subhash with a name matching this value. It
       * contains additional information specific to the card wallet type.
       */
      type: string;

      apple_pay?: Wallet.ApplePay;

      /**
       * (For tokenized numbers only.) The last four digits of the device account number.
       */
      dynamic_last4?: string;

      google_pay?: Wallet.GooglePay;
    }

    export namespace Wallet {
      export interface ApplePay {
        /**
         * Type of the apple_pay transaction, one of `apple_pay` or `apple_pay_later`.
         */
        type: string;
      }

      export interface GooglePay {}
    }
  }

  export interface Cashapp {
    /**
     * A unique and immutable identifier assigned by Cash App to every buyer.
     */
    buyer_id?: string | null;

    /**
     * A public identifier for buyers using Cash App.
     */
    cashtag?: string | null;

    /**
     * A unique and immutable identifier of payments assigned by Cash App
     */
    transaction_id?: string | null;
  }

  export interface Crypto {
    /**
     * The wallet address of the customer.
     */
    buyer_address?: string;

    /**
     * The blockchain network that the transaction was sent on.
     */
    network?: 'base' | 'ethereum' | 'polygon' | 'solana';

    /**
     * The token currency that the transaction was sent with.
     */
    token_currency?: 'usdc' | 'usdg' | 'usdp';

    /**
     * The blockchain transaction hash of the crypto payment.
     */
    transaction_hash?: string;
  }

  /**
   * Custom Payment Methods represent Payment Method types not modeled directly in
   * the Stripe API. This resource consists of details about the custom payment
   * method used for this payment attempt.
   */
  export interface Custom {
    /**
     * Display name for the custom (user-defined) payment method type used to make this
     * payment.
     */
    display_name: string;

    /**
     * The custom payment method type associated with this payment.
     */
    type?: string | null;
  }

  export interface CustomerBalance {}

  export interface Eps {
    /**
     * The customer's bank. Should be one of `arzte_und_apotheker_bank`,
     * `austrian_anadi_bank_ag`, `bank_austria`, `bankhaus_carl_spangler`,
     * `bankhaus_schelhammer_und_schattera_ag`, `bawag_psk_ag`, `bks_bank_ag`,
     * `brull_kallmus_bank_ag`, `btv_vier_lander_bank`, `capital_bank_grawe_gruppe_ag`,
     * `deutsche_bank_ag`, `dolomitenbank`, `easybank_ag`, `erste_bank_und_sparkassen`,
     * `hypo_alpeadriabank_international_ag`,
     * `hypo_noe_lb_fur_niederosterreich_u_wien`,
     * `hypo_oberosterreich_salzburg_steiermark`, `hypo_tirol_bank_ag`,
     * `hypo_vorarlberg_bank_ag`, `hypo_bank_burgenland_aktiengesellschaft`,
     * `marchfelder_bank`, `oberbank_ag`, `raiffeisen_bankengruppe_osterreich`,
     * `schoellerbank_ag`, `sparda_bank_wien`, `volksbank_gruppe`,
     * `volkskreditbank_ag`, or `vr_bank_braunau`.
     */
    bank?:
      | 'arzte_und_apotheker_bank'
      | 'austrian_anadi_bank_ag'
      | 'bank_austria'
      | 'bankhaus_carl_spangler'
      | 'bankhaus_schelhammer_und_schattera_ag'
      | 'bawag_psk_ag'
      | 'bks_bank_ag'
      | 'brull_kallmus_bank_ag'
      | 'btv_vier_lander_bank'
      | 'capital_bank_grawe_gruppe_ag'
      | 'deutsche_bank_ag'
      | 'dolomitenbank'
      | 'easybank_ag'
      | 'erste_bank_und_sparkassen'
      | 'hypo_alpeadriabank_international_ag'
      | 'hypo_bank_burgenland_aktiengesellschaft'
      | 'hypo_noe_lb_fur_niederosterreich_u_wien'
      | 'hypo_oberosterreich_salzburg_steiermark'
      | 'hypo_tirol_bank_ag'
      | 'hypo_vorarlberg_bank_ag'
      | 'marchfelder_bank'
      | 'oberbank_ag'
      | 'raiffeisen_bankengruppe_osterreich'
      | 'schoellerbank_ag'
      | 'sparda_bank_wien'
      | 'volksbank_gruppe'
      | 'volkskreditbank_ag'
      | 'vr_bank_braunau'
      | null;

    /**
     * Owner's verified full name. Values are verified or provided by EPS directly (if
     * supported) at the time of authorization or settlement. They cannot be set or
     * mutated. EPS rarely provides this information so the attribute is usually empty.
     */
    verified_name?: string | null;
  }

  export interface Fpx {
    /**
     * The customer's bank. Can be one of `affin_bank`, `agrobank`, `alliance_bank`,
     * `ambank`, `bank_islam`, `bank_muamalat`, `bank_rakyat`, `bsn`, `cimb`,
     * `hong_leong_bank`, `hsbc`, `kfh`, `maybank2u`, `ocbc`, `public_bank`, `rhb`,
     * `standard_chartered`, `uob`, `deutsche_bank`, `maybank2e`, `pb_enterprise`, or
     * `bank_of_china`.
     */
    bank:
      | 'affin_bank'
      | 'agrobank'
      | 'alliance_bank'
      | 'ambank'
      | 'bank_islam'
      | 'bank_muamalat'
      | 'bank_of_china'
      | 'bank_rakyat'
      | 'bsn'
      | 'cimb'
      | 'deutsche_bank'
      | 'hong_leong_bank'
      | 'hsbc'
      | 'kfh'
      | 'maybank2e'
      | 'maybank2u'
      | 'ocbc'
      | 'pb_enterprise'
      | 'public_bank'
      | 'rhb'
      | 'standard_chartered'
      | 'uob';

    /**
     * Unique transaction id generated by FPX for every request from the merchant
     */
    transaction_id?: string | null;
  }

  export interface Giropay {
    /**
     * Bank code of bank associated with the bank account.
     */
    bank_code?: string | null;

    /**
     * Name of the bank associated with the bank account.
     */
    bank_name?: string | null;

    /**
     * Bank Identifier Code of the bank associated with the bank account.
     */
    bic?: string | null;

    /**
     * Owner's verified full name. Values are verified or provided by Giropay directly
     * (if supported) at the time of authorization or settlement. They cannot be set or
     * mutated. Giropay rarely provides this information so the attribute is usually
     * empty.
     */
    verified_name?: string | null;
  }

  export interface Grabpay {
    /**
     * Unique transaction id generated by GrabPay
     */
    transaction_id?: string | null;
  }

  export interface InteracPresent {
    /**
     * Two-digit number representing the card's expiration month.
     */
    exp_month: number;

    /**
     * Four-digit number representing the card's expiration year.
     */
    exp_year: number;

    /**
     * Card brand. Can be `interac`, `mastercard` or `visa`.
     */
    brand?: string | null;

    /**
     * The cardholder name as read from the card, in
     * [ISO 7813](https://en.wikipedia.org/wiki/ISO/IEC_7813) format. May include
     * alphanumeric characters, special characters and first/last name separator (`/`).
     * In some cases, the cardholder name may not be available depending on how the
     * issuer has configured the card. Cardholder name is typically not available on
     * swipe or contactless payments, such as those made with Apple Pay and Google Pay.
     */
    cardholder_name?: string | null;

    /**
     * Two-letter ISO code representing the country of the card. You could use this
     * attribute to get a sense of the international breakdown of cards you've
     * collected.
     */
    country?: string | null;

    /**
     * A high-level description of the type of cards issued in this range.
     */
    description?: string | null;

    /**
     * Authorization response cryptogram.
     */
    emv_auth_data?: string | null;

    /**
     * Uniquely identifies this particular card number. You can use this attribute to
     * check whether two customers who’ve signed up with you are using the same card
     * number, for example. For payment methods that tokenize card information (Apple
     * Pay, Google Pay), the tokenized number might be provided instead of the
     * underlying card number.
     *
     * _As of May 1, 2021, card fingerprint in India for Connect changed to allow two
     * fingerprints for the same card---one for India and one for the rest of the
     * world._
     */
    fingerprint?: string | null;

    /**
     * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
     */
    funding?: string | null;

    /**
     * ID of a card PaymentMethod generated from the card_present PaymentMethod that
     * may be attached to a Customer for future transactions. Only present if it was
     * possible to generate a card PaymentMethod.
     */
    generated_card?: string | null;

    /**
     * The name of the card's issuing bank.
     */
    issuer?: string | null;

    /**
     * The last four digits of the card.
     */
    last4?: string | null;

    /**
     * Identifies which network this charge was processed on. Can be `amex`,
     * `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `interac`, `jcb`, `link`,
     * `mastercard`, `unionpay`, `visa`, or `unknown`.
     */
    network?: string | null;

    /**
     * This is used by the financial networks to identify a transaction. Visa calls
     * this the Transaction ID, Mastercard calls this the Trace ID, and American
     * Express calls this the Acquirer Reference Data. This value will be present if it
     * is returned by the financial network in the authorization response, and null
     * otherwise.
     */
    network_transaction_id?: string | null;

    /**
     * The languages that the issuing bank recommends using for localizing any
     * customer-facing text, as read from the card. Referenced from EMV tag 5F2D, data
     * encoded on the card's chip.
     */
    preferred_locales?: Array<string> | null;

    /**
     * How card details were read in this transaction.
     */
    read_method?:
      | 'contact_emv'
      | 'contactless_emv'
      | 'contactless_magstripe_mode'
      | 'magnetic_stripe_fallback'
      | 'magnetic_stripe_track2'
      | null;

    receipt?: InteracPresent.Receipt | null;
  }

  export namespace InteracPresent {
    export interface Receipt {
      /**
       * The type of account being debited or credited
       */
      account_type?: 'checking' | 'savings' | 'unknown';

      /**
       * The Application Cryptogram, a unique value generated by the card to authenticate
       * the transaction with issuers.
       */
      application_cryptogram?: string | null;

      /**
       * The Application Identifier (AID) on the card used to determine which networks
       * are eligible to process the transaction. Referenced from EMV tag 9F12, data
       * encoded on the card's chip.
       */
      application_preferred_name?: string | null;

      /**
       * Identifier for this transaction.
       */
      authorization_code?: string | null;

      /**
       * EMV tag 8A. A code returned by the card issuer.
       */
      authorization_response_code?: string | null;

      /**
       * Describes the method used by the cardholder to verify ownership of the card. One
       * of the following: `approval`, `failure`, `none`, `offline_pin`,
       * `offline_pin_and_signature`, `online_pin`, or `signature`.
       */
      cardholder_verification_method?: string | null;

      /**
       * Similar to the application_preferred_name, identifying the applications (AIDs)
       * available on the card. Referenced from EMV tag 84.
       */
      dedicated_file_name?: string | null;

      /**
       * A 5-byte string that records the checks and validations that occur between the
       * card and the terminal. These checks determine how the terminal processes the
       * transaction and what risk tolerance is acceptable. Referenced from EMV Tag 95.
       */
      terminal_verification_results?: string | null;

      /**
       * An indication of which steps were completed during the card read process.
       * Referenced from EMV Tag 9B.
       */
      transaction_status_information?: string | null;
    }
  }

  export interface KakaoPay {
    /**
     * A unique identifier for the buyer as determined by the local payment processor.
     */
    buyer_id?: string | null;

    /**
     * The Kakao Pay transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export interface Klarna {
    payer_details?: Klarna.PayerDetails | null;

    /**
     * The Klarna payment method used for this transaction. Can be one of `pay_later`,
     * `pay_now`, `pay_with_financing`, or `pay_in_installments`
     */
    payment_method_category?: string | null;

    /**
     * Preferred language of the Klarna authorization page that the customer is
     * redirected to. Can be one of `de-AT`, `en-AT`, `nl-BE`, `fr-BE`, `en-BE`,
     * `de-DE`, `en-DE`, `da-DK`, `en-DK`, `es-ES`, `en-ES`, `fi-FI`, `sv-FI`, `en-FI`,
     * `en-GB`, `en-IE`, `it-IT`, `en-IT`, `nl-NL`, `en-NL`, `nb-NO`, `en-NO`, `sv-SE`,
     * `en-SE`, `en-US`, `es-US`, `fr-FR`, `en-FR`, `cs-CZ`, `en-CZ`, `ro-RO`, `en-RO`,
     * `el-GR`, `en-GR`, `en-AU`, `en-NZ`, `en-CA`, `fr-CA`, `pl-PL`, `en-PL`, `pt-PT`,
     * `en-PT`, `de-CH`, `fr-CH`, `it-CH`, or `en-CH`
     */
    preferred_locale?: string | null;
  }

  export namespace Klarna {
    export interface PayerDetails {
      address?: PayerDetails.Address | null;
    }

    export namespace PayerDetails {
      export interface Address {
        /**
         * The payer address country
         */
        country?: string | null;
      }
    }
  }

  export interface Konbini {
    store?: Konbini.Store | null;
  }

  export namespace Konbini {
    export interface Store {
      /**
       * The name of the convenience store chain where the payment was completed.
       */
      chain?: 'familymart' | 'lawson' | 'ministop' | 'seicomart' | null;
    }
  }

  export interface KrCard {
    /**
     * The local credit or debit card brand.
     */
    brand?:
      | 'bc'
      | 'citi'
      | 'hana'
      | 'hyundai'
      | 'jeju'
      | 'jeonbuk'
      | 'kakaobank'
      | 'kbank'
      | 'kdbbank'
      | 'kookmin'
      | 'kwangju'
      | 'lotte'
      | 'mg'
      | 'nh'
      | 'post'
      | 'samsung'
      | 'savingsbank'
      | 'shinhan'
      | 'shinhyup'
      | 'suhyup'
      | 'tossbank'
      | 'woori'
      | null;

    /**
     * A unique identifier for the buyer as determined by the local payment processor.
     */
    buyer_id?: string | null;

    /**
     * The last four digits of the card. This may not be present for American Express
     * cards.
     */
    last4?: string | null;

    /**
     * The Korean Card transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export interface Link {
    /**
     * Two-letter ISO code representing the funding source country beneath the Link
     * payment. You could use this attribute to get a sense of international fees.
     */
    country?: string | null;
  }

  export interface MBWay {}

  export interface Mobilepay {
    card?: Mobilepay.Card | null;
  }

  export namespace Mobilepay {
    export interface Card {
      /**
       * Brand of the card used in the transaction
       */
      brand?: string | null;

      /**
       * Two-letter ISO code representing the country of the card
       */
      country?: string | null;

      /**
       * Two digit number representing the card's expiration month
       */
      exp_month?: number | null;

      /**
       * Two digit number representing the card's expiration year
       */
      exp_year?: number | null;

      /**
       * The last 4 digits of the card
       */
      last4?: string | null;
    }
  }

  export interface Multibanco {
    /**
     * Entity number associated with this Multibanco payment.
     */
    entity?: string | null;

    /**
     * Reference number associated with this Multibanco payment.
     */
    reference?: string | null;
  }

  export interface NaverPay {
    /**
     * A unique identifier for the buyer as determined by the local payment processor.
     */
    buyer_id?: string | null;

    /**
     * The Naver Pay transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export interface NzBankAccount {
    /**
     * The numeric code for the bank account's bank.
     */
    bank_code: string;

    /**
     * The name of the bank.
     */
    bank_name: string;

    /**
     * The numeric code for the bank account's bank branch.
     */
    branch_code: string;

    /**
     * Last four digits of the bank account number.
     */
    last4: string;

    /**
     * The name on the bank account. Only present if the account holder name is
     * different from the name of the authorized signatory collected in the
     * PaymentMethod’s billing details.
     */
    account_holder_name?: string | null;

    /**
     * Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD
     * format.
     */
    expected_debit_date?: string;

    /**
     * The suffix of the bank account number.
     */
    suffix?: string | null;
  }

  export interface Oxxo {
    /**
     * OXXO reference number
     */
    number?: string | null;
  }

  export interface P24 {
    /**
     * The customer's bank. Can be one of `ing`, `citi_handlowy`,
     * `tmobile_usbugi_bankowe`, `plus_bank`, `etransfer_pocztowy24`,
     * `banki_spbdzielcze`, `bank_nowy_bfg_sa`, `getin_bank`, `velobank`, `blik`,
     * `noble_pay`, `ideabank`, `envelobank`, `santander_przelew24`, `nest_przelew`,
     * `mbank_mtransfer`, `inteligo`, `pbac_z_ipko`, `bnp_paribas`, `credit_agricole`,
     * `toyota_bank`, `bank_pekao_sa`, `volkswagen_bank`, `bank_millennium`,
     * `alior_bank`, or `boz`.
     */
    bank?:
      | 'alior_bank'
      | 'bank_millennium'
      | 'bank_nowy_bfg_sa'
      | 'bank_pekao_sa'
      | 'banki_spbdzielcze'
      | 'blik'
      | 'bnp_paribas'
      | 'boz'
      | 'citi_handlowy'
      | 'credit_agricole'
      | 'envelobank'
      | 'etransfer_pocztowy24'
      | 'getin_bank'
      | 'ideabank'
      | 'ing'
      | 'inteligo'
      | 'mbank_mtransfer'
      | 'nest_przelew'
      | 'noble_pay'
      | 'pbac_z_ipko'
      | 'plus_bank'
      | 'santander_przelew24'
      | 'tmobile_usbugi_bankowe'
      | 'toyota_bank'
      | 'velobank'
      | 'volkswagen_bank'
      | null;

    /**
     * Unique reference for this Przelewy24 payment.
     */
    reference?: string | null;

    /**
     * Owner's verified full name. Values are verified or provided by Przelewy24
     * directly (if supported) at the time of authorization or settlement. They cannot
     * be set or mutated. Przelewy24 rarely provides this information so the attribute
     * is usually empty.
     */
    verified_name?: string | null;
  }

  export interface PayByBank {}

  export interface Payco {
    /**
     * A unique identifier for the buyer as determined by the local payment processor.
     */
    buyer_id?: string | null;

    /**
     * The Payco transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export interface Paynow {
    /**
     * ID of the [location](https://docs.stripe.com/api/terminal/locations) that this
     * transaction's reader is assigned to.
     */
    location?: string;

    /**
     * ID of the [reader](https://docs.stripe.com/api/terminal/readers) this
     * transaction was made on.
     */
    reader?: string;

    /**
     * Reference number associated with this PayNow payment
     */
    reference?: string | null;
  }

  export interface Paypal {
    /**
     * Two-letter ISO code representing the buyer's country. Values are provided by
     * PayPal directly (if supported) at the time of authorization or settlement. They
     * cannot be set or mutated.
     */
    country?: string | null;

    /**
     * Owner's email. Values are provided by PayPal directly (if supported) at the time
     * of authorization or settlement. They cannot be set or mutated.
     */
    payer_email?: string | null;

    /**
     * PayPal account PayerID. This identifier uniquely identifies the PayPal customer.
     */
    payer_id?: string | null;

    /**
     * Owner's full name. Values provided by PayPal directly (if supported) at the time
     * of authorization or settlement. They cannot be set or mutated.
     */
    payer_name?: string | null;

    seller_protection?: Paypal.SellerProtection | null;

    /**
     * A unique ID generated by PayPal for this transaction.
     */
    transaction_id?: string | null;
  }

  export namespace Paypal {
    export interface SellerProtection {
      /**
       * Indicates whether the transaction is eligible for PayPal's seller protection.
       */
      status: 'eligible' | 'not_eligible' | 'partially_eligible';

      /**
       * An array of conditions that are covered for the transaction, if applicable.
       */
      dispute_categories?: Array<'fraudulent' | 'product_not_received'> | null;
    }
  }

  export interface Payto {
    /**
     * Bank-State-Branch number of the bank account.
     */
    bsb_number?: string | null;

    /**
     * Last four digits of the bank account number.
     */
    last4?: string | null;

    /**
     * ID of the mandate used to make this payment.
     */
    mandate?: string;

    /**
     * The PayID alias for the bank account.
     */
    pay_id?: string | null;
  }

  export interface Pix {
    /**
     * Unique transaction id generated by BCB
     */
    bank_transaction_id?: string | null;
  }

  export interface Promptpay {
    /**
     * Bill reference generated by PromptPay
     */
    reference?: string | null;
  }

  export interface RevolutPay {
    funding?: RevolutPay.Funding;

    /**
     * The Revolut Pay transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export namespace RevolutPay {
    export interface Funding {
      card?: Shared.PaymentMethodDetailsPassthroughCard;

      /**
       * funding type of the underlying payment method.
       */
      type?: 'card' | null;
    }
  }

  export interface SamsungPay {
    /**
     * A unique identifier for the buyer as determined by the local payment processor.
     */
    buyer_id?: string | null;

    /**
     * The Samsung Pay transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export interface Satispay {
    /**
     * The Satispay transaction ID associated with this payment.
     */
    transaction_id?: string | null;
  }

  export interface SepaDebit {
    /**
     * Bank code of bank associated with the bank account.
     */
    bank_code?: string | null;

    /**
     * Branch code of bank associated with the bank account.
     */
    branch_code?: string | null;

    /**
     * Two-letter ISO code representing the country the bank account is located in.
     */
    country?: string | null;

    /**
     * Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD
     * format.
     */
    expected_debit_date?: string;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to
     * check whether two bank accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * Last four characters of the IBAN.
     */
    last4?: string | null;

    /**
     * Find the ID of the mandate used for this payment under the
     * [payment_method_details.sepa_debit.mandate](https://docs.stripe.com/api/charges/object#charge_object-payment_method_details-sepa_debit-mandate)
     * property on the Charge. Use this mandate ID to
     * [retrieve the Mandate](https://docs.stripe.com/api/mandates/retrieve).
     */
    mandate?: string | null;
  }

  export interface StripeAccount {}

  export interface Swish {
    /**
     * Uniquely identifies the payer's Swish account. You can use this attribute to
     * check whether two Swish transactions were paid for by the same payer
     */
    fingerprint?: string | null;

    /**
     * Payer bank reference number for the payment
     */
    payment_reference?: string | null;

    /**
     * The last four digits of the Swish account phone number
     */
    verified_phone_last4?: string | null;
  }

  export interface Twint {}

  export interface Wechat {}

  export interface WechatPay {
    /**
     * Uniquely identifies this particular WeChat Pay account. You can use this
     * attribute to check whether two WeChat accounts are the same.
     */
    fingerprint?: string | null;

    /**
     * ID of the [location](https://docs.stripe.com/api/terminal/locations) that this
     * transaction's reader is assigned to.
     */
    location?: string;

    /**
     * ID of the [reader](https://docs.stripe.com/api/terminal/readers) this
     * transaction was made on.
     */
    reader?: string;

    /**
     * Transaction ID of this particular WeChat Pay transaction.
     */
    transaction_id?: string | null;
  }

  export interface Zip {}
}

export interface SepaDebitGeneratedFrom {
  /**
   * The ID of the Charge that generated this PaymentMethod, if any.
   */
  charge?: string | DisputesAPI.Charge | null;

  /**
   * The ID of the SetupAttempt that generated this PaymentMethod, if any.
   */
  setup_attempt?: string | SubscriptionsAPI.SetupAttempt | null;
}

export interface ShippingRateDeliveryEstimateBound {
  /**
   * A unit of time.
   */
  unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';

  /**
   * Must be greater than 0.
   */
  value: number;
}

/**
 * Tax rates can be applied to [invoices](/invoicing/taxes/tax-rates),
 * [subscriptions](/billing/taxes/tax-rates) and
 * [Checkout Sessions](/payments/checkout/use-manual-tax-rates) to collect tax.
 *
 * Related guide: [Tax rates](/billing/taxes/tax-rates)
 */
export interface TaxRate {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Defaults to `true`. When set to `false`, this tax rate cannot be used with new
   * applications or Checkout Sessions, but will still work for subscriptions and
   * invoices that already have it set.
   */
  active: boolean;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * The display name of the tax rates as it will appear to your customer on their
   * receipt email, PDF, and the hosted invoice page.
   */
  display_name: string;

  /**
   * This specifies if the tax rate is inclusive or exclusive.
   */
  inclusive: boolean;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'tax_rate';

  /**
   * Tax rate percentage out of 100. For tax calculations with
   * automatic_tax[enabled]=true, this percentage includes the statutory tax rate of
   * non-taxable jurisdictions.
   */
  percentage: number;

  /**
   * Two-letter country code
   * ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
   */
  country?: string | null;

  /**
   * An arbitrary string attached to the tax rate for your internal use only. It will
   * not be visible to your customers.
   */
  description?: string | null;

  /**
   * Actual/effective tax rate percentage out of 100. For tax calculations with
   * automatic_tax[enabled]=true, this percentage reflects the rate actually used to
   * calculate tax based on the product's taxability and whether the user is
   * registered to collect taxes in the corresponding jurisdiction.
   */
  effective_percentage?: number | null;

  /**
   * The amount of the tax rate when the
   * ` rate_type`` is  `flat_amount`. Tax rates with `rate_type` `percentage`can vary based on the transaction, resulting in this field being`null`.
   * This field exposes the amount and currency of the flat tax rate.
   */
  flat_amount?: TaxRate.FlatAmount | null;

  /**
   * The jurisdiction for the tax rate. You can use this label field for tax
   * reporting purposes. It also appears on your customer’s invoice.
   */
  jurisdiction?: string | null;

  /**
   * The level of the jurisdiction that imposes this tax rate. Will be `null` for
   * manually defined tax rates.
   */
  jurisdiction_level?: 'city' | 'country' | 'county' | 'district' | 'multiple' | 'state' | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Indicates the type of tax rate applied to the taxable amount. This value can be
   * `null` when no tax applies to the location. This field is only present for
   * TaxRates created by Stripe Tax.
   */
  rate_type?: 'flat_amount' | 'percentage' | null;

  /**
   * [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2), without
   * country prefix. For example, "NY" for New York, United States.
   */
  state?: string | null;

  /**
   * The high-level tax type, such as `vat` or `sales_tax`.
   */
  tax_type?:
    | 'amusement_tax'
    | 'communications_tax'
    | 'gst'
    | 'hst'
    | 'igst'
    | 'jct'
    | 'lease_tax'
    | 'pst'
    | 'qst'
    | 'retail_delivery_fee'
    | 'rst'
    | 'sales_tax'
    | 'service_tax'
    | 'vat'
    | null;
}

export namespace TaxRate {
  /**
   * The amount of the tax rate when the
   * ` rate_type`` is  `flat_amount`. Tax rates with `rate_type` `percentage`can vary based on the transaction, resulting in this field being`null`.
   * This field exposes the amount and currency of the flat tax rate.
   */
  export interface FlatAmount {
    /**
     * Amount of the tax when the `rate_type` is `flat_amount`. This positive integer
     * represents how much to charge in the smallest currency unit (e.g., 100 cents to
     * charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The amount value
     * supports up to eight digits (e.g., a value of 99999999 for a USD charge of
     * $999,999.99).
     */
    amount: number;

    /**
     * Three-letter ISO currency code, in lowercase.
     */
    currency: string;
  }
}

export interface InvoiceCreateParams {
  /**
   * The account tax IDs associated with the invoice. Only editable when the invoice
   * is a draft.
   */
  account_tax_ids?: Array<string> | '';

  /**
   * A fee in cents (or local equivalent) that will be applied to the invoice and
   * transferred to the application owner's Stripe account. The request must be made
   * with an OAuth key or the Stripe-Account header in order to take an application
   * fee. For more information, see the application fees
   * [documentation](https://docs.stripe.com/billing/invoices/connect#collecting-fees).
   */
  application_fee_amount?: number;

  /**
   * Controls whether Stripe performs
   * [automatic collection](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection)
   * of the invoice. If `false`, the invoice's state doesn't automatically advance
   * without an explicit action. Defaults to false.
   */
  auto_advance?: boolean;

  /**
   * Settings for automatic tax lookup for this invoice.
   */
  automatic_tax?: InvoiceCreateParams.AutomaticTax;

  /**
   * The time when this invoice should be scheduled to finalize (up to 5 years in the
   * future). The invoice is finalized at this time if it's still in draft state.
   */
  automatically_finalizes_at?: number;

  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically,
   * Stripe will attempt to pay this invoice using the default source attached to the
   * customer. When sending an invoice, Stripe will email this invoice to the
   * customer with payment instructions. Defaults to `charge_automatically`.
   */
  collection_method?: 'charge_automatically' | 'send_invoice';

  /**
   * The currency to create this invoice in. Defaults to that of `customer` if not
   * specified.
   */
  currency?: string;

  /**
   * A list of up to 4 custom fields to be displayed on the invoice.
   */
  custom_fields?: Array<InvoiceCreateParams.CustomFieldsList> | '';

  /**
   * The ID of the customer to bill.
   */
  customer?: string;

  /**
   * The ID of the account to bill.
   */
  customer_account?: string;

  /**
   * The number of days from when the invoice is created until it is due. Valid only
   * for invoices where `collection_method=send_invoice`.
   */
  days_until_due?: number;

  /**
   * ID of the default payment method for the invoice. It must belong to the customer
   * associated with the invoice. If not set, defaults to the subscription's default
   * payment method, if any, or to the default payment method in the customer's
   * invoice settings.
   */
  default_payment_method?: string;

  /**
   * ID of the default payment source for the invoice. It must belong to the customer
   * associated with the invoice and be in a chargeable state. If not set, defaults
   * to the subscription's default source, if any, or to the customer's default
   * source.
   */
  default_source?: string;

  /**
   * The tax rates that will apply to any line item that does not have `tax_rates`
   * set.
   */
  default_tax_rates?: Array<string>;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users. Referenced as 'memo' in the Dashboard.
   */
  description?: string;

  /**
   * The coupons and promotion codes to redeem into discounts for the invoice. If not
   * specified, inherits the discount from the invoice's customer. Pass an empty
   * string to avoid inheriting any discounts.
   */
  discounts?: Array<InvoiceCreateParams.DiscountsList> | '';

  /**
   * The date on which payment for this invoice is due. Valid only for invoices where
   * `collection_method=send_invoice`.
   */
  due_date?: number;

  /**
   * The date when this invoice is in effect. Same as `finalized_at` unless
   * overwritten. When defined, this value replaces the system-generated 'Date of
   * issue' printed on the invoice PDF and receipt.
   */
  effective_at?: number;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * Footer to be displayed on the invoice.
   */
  footer?: string;

  /**
   * Revise an existing invoice. The new invoice will be created in `status=draft`.
   * See the
   * [revision documentation](https://docs.stripe.com/invoicing/invoice-revisions)
   * for more details.
   */
  from_invoice?: InvoiceCreateParams.FromInvoice;

  /**
   * The connected account that issues the invoice. The invoice is presented with the
   * branding and support information of the specified account.
   */
  issuer?: InvoiceCreateParams.Issuer;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`.
   */
  metadata?: { [key: string]: string } | '';

  /**
   * Set the number for this invoice. If no number is present then a number will be
   * assigned automatically when the invoice is finalized. In many markets,
   * regulations require invoices to be unique, sequential and / or gapless. You are
   * responsible for ensuring this is true across all your different invoicing
   * systems in the event that you edit the invoice number using our API. If you use
   * only Stripe for your invoices and do not change invoice numbers, Stripe handles
   * this aspect of compliance for you automatically.
   */
  number?: string;

  /**
   * The account (if any) for which the funds of the invoice payment are intended. If
   * set, the invoice will be presented with the branding and support information of
   * the specified account. See the
   * [Invoices with Connect](https://docs.stripe.com/billing/invoices/connect)
   * documentation for details.
   */
  on_behalf_of?: string;

  /**
   * Configuration settings for the PaymentIntent that is generated when the invoice
   * is finalized.
   */
  payment_settings?: InvoiceCreateParams.PaymentSettings;

  /**
   * How to handle pending invoice items on invoice creation. Defaults to `exclude`
   * if the parameter is omitted.
   */
  pending_invoice_items_behavior?: 'exclude' | 'include';

  /**
   * The rendering-related settings that control how the invoice is displayed on
   * customer-facing surfaces such as PDF and Hosted Invoice Page.
   */
  rendering?: InvoiceCreateParams.Rendering;

  /**
   * Settings for the cost of shipping for this invoice.
   */
  shipping_cost?: InvoiceCreateParams.ShippingCost;

  /**
   * Shipping details for the invoice. The Invoice PDF will use the
   * `shipping_details` value if it is set, otherwise the PDF will render the
   * shipping address from the customer.
   */
  shipping_details?: InvoiceCreateParams.ShippingDetails;

  /**
   * Extra information about a charge for the customer's credit card statement. It
   * must contain at least one letter. If not specified and this invoice is part of a
   * subscription, the default `statement_descriptor` will be set to the first
   * subscription item's product's `statement_descriptor`.
   */
  statement_descriptor?: string;

  /**
   * The ID of the subscription to invoice, if any. If set, the created invoice will
   * only include pending invoice items for that subscription. The subscription's
   * billing cycle and regular subscription events won't be affected.
   */
  subscription?: string;

  /**
   * If specified, the funds from the invoice will be transferred to the destination
   * and the ID of the resulting transfer will be found on the invoice's charge.
   */
  transfer_data?: InvoiceCreateParams.TransferData;
}

export namespace InvoiceCreateParams {
  /**
   * Settings for automatic tax lookup for this invoice.
   */
  export interface AutomaticTax {
    enabled: boolean;

    liability?: AutomaticTax.Liability;
  }

  export namespace AutomaticTax {
    export interface Liability {
      type: 'account' | 'self';

      account?: string;
    }
  }

  export interface CustomFieldsList {
    name: string;

    value: string;
  }

  export interface DiscountsList {
    coupon?: string;

    discount?: string;

    promotion_code?: string;
  }

  /**
   * Revise an existing invoice. The new invoice will be created in `status=draft`.
   * See the
   * [revision documentation](https://docs.stripe.com/invoicing/invoice-revisions)
   * for more details.
   */
  export interface FromInvoice {
    action: 'revision';

    invoice: string;
  }

  /**
   * The connected account that issues the invoice. The invoice is presented with the
   * branding and support information of the specified account.
   */
  export interface Issuer {
    type: 'account' | 'self';

    account?: string;
  }

  /**
   * Configuration settings for the PaymentIntent that is generated when the invoice
   * is finalized.
   */
  export interface PaymentSettings {
    default_mandate?: (string & {}) | '';

    payment_method_options?: PaymentSettings.PaymentMethodOptions;

    payment_method_types?:
      | Array<
          | 'ach_credit_transfer'
          | 'ach_debit'
          | 'acss_debit'
          | 'affirm'
          | 'amazon_pay'
          | 'au_becs_debit'
          | 'bacs_debit'
          | 'bancontact'
          | 'boleto'
          | 'card'
          | 'cashapp'
          | 'crypto'
          | 'custom'
          | 'customer_balance'
          | 'eps'
          | 'fpx'
          | 'giropay'
          | 'grabpay'
          | 'ideal'
          | 'jp_credit_transfer'
          | 'kakao_pay'
          | 'klarna'
          | 'konbini'
          | 'kr_card'
          | 'link'
          | 'multibanco'
          | 'naver_pay'
          | 'nz_bank_account'
          | 'p24'
          | 'payco'
          | 'paynow'
          | 'paypal'
          | 'payto'
          | 'promptpay'
          | 'revolut_pay'
          | 'sepa_credit_transfer'
          | 'sepa_debit'
          | 'sofort'
          | 'swish'
          | 'us_bank_account'
          | 'wechat_pay'
        >
      | '';
  }

  export namespace PaymentSettings {
    export interface PaymentMethodOptions {
      acss_debit?: PaymentMethodOptions.InvoicePaymentMethodOptionsParam | '';

      bancontact?: PaymentMethodOptions.InvoicePaymentMethodOptionsParam | '';

      card?: PaymentMethodOptions.InvoicePaymentMethodOptionsParam | '';

      customer_balance?: PaymentMethodOptions.InvoicePaymentMethodOptionsParam | '';

      konbini?: unknown | '';

      payto?: PaymentMethodOptions.InvoicePaymentMethodOptionsParam | '';

      sepa_debit?: unknown | '';

      us_bank_account?: PaymentMethodOptions.InvoicePaymentMethodOptionsParam | '';
    }

    export namespace PaymentMethodOptions {
      export interface InvoicePaymentMethodOptionsParam {
        mandate_options?: InvoicePaymentMethodOptionsParam.MandateOptions;

        verification_method?: 'automatic' | 'instant' | 'microdeposits';
      }

      export namespace InvoicePaymentMethodOptionsParam {
        export interface MandateOptions {
          transaction_type?: 'business' | 'personal';
        }
      }

      export interface InvoicePaymentMethodOptionsParam {
        preferred_language?: 'de' | 'en' | 'fr' | 'nl';
      }

      export interface InvoicePaymentMethodOptionsParam {
        installments?: InvoicePaymentMethodOptionsParam.Installments;

        request_three_d_secure?: 'any' | 'automatic' | 'challenge';
      }

      export namespace InvoicePaymentMethodOptionsParam {
        export interface Installments {
          enabled?: boolean;

          plan?: Installments.InstallmentPlan | '';
        }

        export namespace Installments {
          export interface InstallmentPlan {
            type: 'bonus' | 'fixed_count' | 'revolving';

            count?: number;

            interval?: 'month';
          }
        }
      }

      export interface InvoicePaymentMethodOptionsParam {
        bank_transfer?: InvoicePaymentMethodOptionsParam.BankTransfer;

        funding_type?: string;
      }

      export namespace InvoicePaymentMethodOptionsParam {
        export interface BankTransfer {
          eu_bank_transfer?: BankTransfer.EuBankTransfer;

          type?: string;
        }

        export namespace BankTransfer {
          export interface EuBankTransfer {
            country: string;
          }
        }
      }

      export interface InvoicePaymentMethodOptionsParam {
        mandate_options?: InvoicePaymentMethodOptionsParam.MandateOptions;
      }

      export namespace InvoicePaymentMethodOptionsParam {
        export interface MandateOptions {
          amount?: number;

          purpose?:
            | 'dependant_support'
            | 'government'
            | 'loan'
            | 'mortgage'
            | 'other'
            | 'pension'
            | 'personal'
            | 'retail'
            | 'salary'
            | 'tax'
            | 'utility';
        }
      }

      export interface InvoicePaymentMethodOptionsParam {
        financial_connections?: InvoicePaymentMethodOptionsParam.FinancialConnections;

        verification_method?: 'automatic' | 'instant' | 'microdeposits';
      }

      export namespace InvoicePaymentMethodOptionsParam {
        export interface FinancialConnections {
          filters?: FinancialConnections.Filters;

          permissions?: Array<'balances' | 'ownership' | 'payment_method' | 'transactions'>;

          prefetch?: Array<'balances' | 'ownership' | 'transactions'>;
        }

        export namespace FinancialConnections {
          export interface Filters {
            account_subcategories?: Array<'checking' | 'savings'>;
          }
        }
      }
    }
  }

  /**
   * The rendering-related settings that control how the invoice is displayed on
   * customer-facing surfaces such as PDF and Hosted Invoice Page.
   */
  export interface Rendering {
    amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';

    pdf?: Rendering.Pdf;

    template?: string;

    template_version?: number | '';
  }

  export namespace Rendering {
    export interface Pdf {
      page_size?: 'a4' | 'auto' | 'letter';
    }
  }

  /**
   * Settings for the cost of shipping for this invoice.
   */
  export interface ShippingCost {
    shipping_rate?: string;

    shipping_rate_data?: ShippingCost.ShippingRateData;
  }

  export namespace ShippingCost {
    export interface ShippingRateData {
      display_name: string;

      delivery_estimate?: ShippingRateData.DeliveryEstimate;

      fixed_amount?: ShippingRateData.FixedAmount;

      metadata?: { [key: string]: string };

      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';

      tax_code?: string;

      type?: 'fixed_amount';
    }

    export namespace ShippingRateData {
      export interface DeliveryEstimate {
        maximum?: DeliveryEstimate.Maximum;

        minimum?: DeliveryEstimate.Minimum;
      }

      export namespace DeliveryEstimate {
        export interface Maximum {
          unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';

          value: number;
        }

        export interface Minimum {
          unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';

          value: number;
        }
      }

      export interface FixedAmount {
        amount: number;

        currency: string;

        currency_options?: { [key: string]: FixedAmount.CurrencyOptions };
      }

      export namespace FixedAmount {
        export interface CurrencyOptions {
          amount: number;

          tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
        }
      }
    }
  }

  /**
   * Shipping details for the invoice. The Invoice PDF will use the
   * `shipping_details` value if it is set, otherwise the PDF will render the
   * shipping address from the customer.
   */
  export interface ShippingDetails {
    address: ShippingDetails.Address;

    name: string;

    phone?: (string & {}) | '';
  }

  export namespace ShippingDetails {
    export interface Address {
      city?: string;

      country?: string;

      line1?: string;

      line2?: string;

      postal_code?: string;

      state?: string;
    }
  }

  /**
   * If specified, the funds from the invoice will be transferred to the destination
   * and the ID of the resulting transfer will be found on the invoice's charge.
   */
  export interface TransferData {
    destination: string;

    amount?: number;
  }
}

export interface InvoiceListParams extends MyCursorIDPageParams {
  /**
   * The collection method of the invoice to retrieve. Either `charge_automatically`
   * or `send_invoice`.
   */
  collection_method?: 'charge_automatically' | 'send_invoice';

  /**
   * Only return invoices that were created during the given date interval.
   */
  created?: InvoiceListParams.RangeQuerySpecs | number;

  /**
   * Only return invoices for the customer specified by this customer ID.
   */
  customer?: string;

  /**
   * Only return invoices for the account representing the customer specified by this
   * account ID.
   */
  customer_account?: string;

  due_date?: InvoiceListParams.RangeQuerySpecs | number;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or
   * `void`.
   * [Learn more](https://docs.stripe.com/billing/invoices/workflow#workflow-overview)
   */
  status?: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';

  /**
   * Only return invoices for the subscription specified by this subscription ID.
   */
  subscription?: string;
}

export namespace InvoiceListParams {
  export interface RangeQuerySpecs {
    gt?: number;

    gte?: number;

    lt?: number;

    lte?: number;
  }

  export interface RangeQuerySpecs {
    gt?: number;

    gte?: number;

    lt?: number;

    lte?: number;
  }
}

export interface InvoiceFinalizeParams {
  /**
   * Controls whether Stripe performs
   * [automatic collection](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection)
   * of the invoice. If `false`, the invoice's state doesn't automatically advance
   * without an explicit action.
   */
  auto_advance?: boolean;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;
}

export declare namespace Invoices {
  export {
    type APIErrors as APIErrors,
    type AutomaticTaxInvoice as AutomaticTaxInvoice,
    type BillingBillResourceInvoicingParentsInvoiceParent as BillingBillResourceInvoicingParentsInvoiceParent,
    type BillingBillResourceInvoicingParentsInvoiceSubscriptionParent as BillingBillResourceInvoicingParentsInvoiceSubscriptionParent,
    type BillingCreditBalanceTransaction as BillingCreditBalanceTransaction,
    type BillingCreditGrant as BillingCreditGrant,
    type BillingCreditGrantsResourceAmount as BillingCreditGrantsResourceAmount,
    type BillingCreditGrantsResourceBalanceCredit as BillingCreditGrantsResourceBalanceCredit,
    type BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided as BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided,
    type BillingCreditGrantsResourceBalanceCreditsApplied as BillingCreditGrantsResourceBalanceCreditsApplied,
    type BillingCreditGrantsResourceBalanceDebit as BillingCreditGrantsResourceBalanceDebit,
    type BillingCreditGrantsResourceMonetaryAmount as BillingCreditGrantsResourceMonetaryAmount,
    type ConnectAccountReference as ConnectAccountReference,
    type DeletedDiscount as DeletedDiscount,
    type DiscountsResourceDiscountAmount as DiscountsResourceDiscountAmount,
    type Invoice as Invoice,
    type InvoicePayment as InvoicePayment,
    type InvoicesPaymentsInvoicePaymentAssociatedPayment as InvoicesPaymentsInvoicePaymentAssociatedPayment,
    type InvoicesResourceFromInvoice as InvoicesResourceFromInvoice,
    type InvoicesResourcePretaxCreditAmount as InvoicesResourcePretaxCreditAmount,
    type LineItem as LineItem,
    type PaymentMethod as PaymentMethod,
    type PaymentMethodCard as PaymentMethodCard,
    type PaymentMethodCardGeneratedCard as PaymentMethodCardGeneratedCard,
    type PaymentMethodDetailsPaymentRecordUsBankAccount as PaymentMethodDetailsPaymentRecordUsBankAccount,
    type PaymentMethodSepaDebit as PaymentMethodSepaDebit,
    type PaymentRecord as PaymentRecord,
    type PaymentsPrimitivesPaymentRecordsResourceAmount as PaymentsPrimitivesPaymentRecordsResourceAmount,
    type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails as PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails,
    type SepaDebitGeneratedFrom as SepaDebitGeneratedFrom,
    type ShippingRateDeliveryEstimateBound as ShippingRateDeliveryEstimateBound,
    type TaxRate as TaxRate,
    type InvoicesMyCursorIDPage as InvoicesMyCursorIDPage,
    type InvoiceCreateParams as InvoiceCreateParams,
    type InvoiceListParams as InvoiceListParams,
    type InvoiceFinalizeParams as InvoiceFinalizeParams,
  };
}
