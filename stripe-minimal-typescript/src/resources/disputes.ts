// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DisputesAPI from './disputes';
import * as AccountsAPI from './accounts';
import * as CustomersAPI from './customers';
import * as InvoicesAPI from './invoices';
import * as PaymentIntentsAPI from './payment-intents';
import * as RefundsAPI from './refunds';
import * as Shared from './shared';
import * as SubscriptionsAPI from './subscriptions';
import { APIPromise } from '../core/api-promise';
import { MyCursorIDPage, type MyCursorIDPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Disputes extends APIResource {
  /**
   * <p>When you get a dispute, contacting your customer is always the best first step. If that doesn’t work, you can submit evidence to help us resolve the dispute in your favor. You can do this in your <a href="https://dashboard.stripe.com/disputes">dashboard</a>, but if you prefer, you can use the API to submit evidence programmatically.</p>
   *
   * <p>Depending on your dispute type, different evidence fields will give you a better chance of winning your dispute. To figure out which evidence fields to provide, see our <a href="/docs/disputes/categories">guide to dispute types</a>.</p>
   */
  update(
    dispute: string,
    body: DisputeUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Dispute> {
    return this._client.post(path`/v1/disputes/${dispute}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * <p>Returns a list of your disputes.</p>
   */
  list(
    query: DisputeListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DisputesMyCursorIDPage, Dispute> {
    return this._client.getAPIList('/v1/disputes', MyCursorIDPage<Dispute>, { query, ...options });
  }
}

export type DisputesMyCursorIDPage = MyCursorIDPage<Dispute>;

export interface ApplicationFee {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * ID of the Stripe account this fee was taken from.
   */
  account: string | AccountsAPI.Account;

  /**
   * Amount earned, in cents (or local equivalent).
   */
  amount: number;

  /**
   * Amount in cents (or local equivalent) refunded (can be less than the amount
   * attribute on the fee if a partial refund was issued)
   */
  amount_refunded: number;

  /**
   * ID of the Connect application that earned the fee.
   */
  application: string | Shared.Application;

  /**
   * ID of the charge that the application fee was taken from.
   */
  charge: string | Charge;

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
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'application_fee';

  /**
   * Whether the fee has been fully refunded. If the fee is only partially refunded,
   * this attribute will still be false.
   */
  refunded: boolean;

  /**
   * A list of refunds that have been applied to the fee.
   */
  refunds: ApplicationFee.Refunds;

  /**
   * Balance transaction that describes the impact of this collected application fee
   * on your account balance (not including refunds).
   */
  balance_transaction?: string | BalanceTransaction | null;

  fee_source?: ApplicationFee.FeeSource | null;

  /**
   * ID of the corresponding charge on the platform account, if this fee was the
   * result of a charge using the `destination` parameter.
   */
  originating_transaction?: string | Charge | null;
}

export namespace ApplicationFee {
  /**
   * A list of refunds that have been applied to the fee.
   */
  export interface Refunds {
    /**
     * Details about each object.
     */
    data: Array<DisputesAPI.FeeRefund>;

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

  export interface FeeSource {
    /**
     * Type of object that created the application fee.
     */
    type: 'charge' | 'payout';

    /**
     * Charge ID that created this application fee.
     */
    charge?: string;

    /**
     * Payout ID that created this application fee.
     */
    payout?: string;
  }
}

/**
 * Balance transactions represent funds moving through your Stripe account. Stripe
 * creates them for every type of transaction that enters or leaves your Stripe
 * account balance.
 *
 * Related guide:
 * [Balance transaction types](https://docs.stripe.com/reports/balance-transaction-types)
 */
export interface BalanceTransaction {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Gross amount of this transaction (in cents (or local equivalent)). A positive
   * value represents funds charged to another party, and a negative value represents
   * funds sent to another party.
   */
  amount: number;

  /**
   * The date that the transaction's net funds become available in the Stripe
   * balance.
   */
  available_on: number;

  /**
   * The balance that this transaction impacts.
   */
  balance_type: 'issuing' | 'payments' | 'refund_and_dispute_prefunding' | 'risk_reserved';

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
   * Fees (in cents (or local equivalent)) paid for this transaction. Represented as
   * a positive integer when assessed.
   */
  fee: number;

  /**
   * Detailed breakdown of fees (in cents (or local equivalent)) paid for this
   * transaction.
   */
  fee_details: Array<BalanceTransaction.FeeDetail>;

  /**
   * Net impact to a Stripe balance (in cents (or local equivalent)). A positive
   * value represents incrementing a Stripe balance, and a negative value
   * decrementing a Stripe balance. You can calculate the net impact of a transaction
   * on a balance by `amount` - `fee`
   */
  net: number;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'balance_transaction';

  /**
   * Learn more about how
   * [reporting categories](https://stripe.com/docs/reports/reporting-categories) can
   * help you understand balance transactions from an accounting perspective.
   */
  reporting_category: string;

  /**
   * The transaction's net funds status in the Stripe balance, which are either
   * `available` or `pending`.
   */
  status: string;

  /**
   * Transaction type: `adjustment`, `advance`, `advance_funding`,
   * `anticipation_repayment`, `application_fee`, `application_fee_refund`, `charge`,
   * `climate_order_purchase`, `climate_order_refund`, `connect_collection_transfer`,
   * `contribution`, `issuing_authorization_hold`, `issuing_authorization_release`,
   * `issuing_dispute`, `issuing_transaction`, `obligation_outbound`,
   * `obligation_reversal_inbound`, `payment`, `payment_failure_refund`,
   * `payment_network_reserve_hold`, `payment_network_reserve_release`,
   * `payment_refund`, `payment_reversal`, `payment_unreconciled`, `payout`,
   * `payout_cancel`, `payout_failure`, `payout_minimum_balance_hold`,
   * `payout_minimum_balance_release`, `refund`, `refund_failure`,
   * `reserve_transaction`, `reserved_funds`, `reserve_hold`, `reserve_release`,
   * `stripe_fee`, `stripe_fx_fee`, `stripe_balance_payment_debit`,
   * `stripe_balance_payment_debit_reversal`, `tax_fee`, `topup`, `topup_reversal`,
   * `transfer`, `transfer_cancel`, `transfer_failure`, or `transfer_refund`. Learn
   * more about
   * [balance transaction types and what they represent](https://stripe.com/docs/reports/balance-transaction-types).
   * To classify transactions for accounting purposes, consider `reporting_category`
   * instead.
   */
  type:
    | 'adjustment'
    | 'advance'
    | 'advance_funding'
    | 'anticipation_repayment'
    | 'application_fee'
    | 'application_fee_refund'
    | 'charge'
    | 'climate_order_purchase'
    | 'climate_order_refund'
    | 'connect_collection_transfer'
    | 'contribution'
    | 'issuing_authorization_hold'
    | 'issuing_authorization_release'
    | 'issuing_dispute'
    | 'issuing_transaction'
    | 'obligation_outbound'
    | 'obligation_reversal_inbound'
    | 'payment'
    | 'payment_failure_refund'
    | 'payment_network_reserve_hold'
    | 'payment_network_reserve_release'
    | 'payment_refund'
    | 'payment_reversal'
    | 'payment_unreconciled'
    | 'payout'
    | 'payout_cancel'
    | 'payout_failure'
    | 'payout_minimum_balance_hold'
    | 'payout_minimum_balance_release'
    | 'refund'
    | 'refund_failure'
    | 'reserve_hold'
    | 'reserve_release'
    | 'reserve_transaction'
    | 'reserved_funds'
    | 'stripe_balance_payment_debit'
    | 'stripe_balance_payment_debit_reversal'
    | 'stripe_fee'
    | 'stripe_fx_fee'
    | 'tax_fee'
    | 'topup'
    | 'topup_reversal'
    | 'transfer'
    | 'transfer_cancel'
    | 'transfer_failure'
    | 'transfer_refund';

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * If applicable, this transaction uses an exchange rate. If money converts from
   * currency A to currency B, then the `amount` in currency A, multipled by the
   * `exchange_rate`, equals the `amount` in currency B. For example, if you charge a
   * customer 10.00 EUR, the PaymentIntent's `amount` is `1000` and `currency` is
   * `eur`. If this converts to 12.34 USD in your Stripe account, the
   * BalanceTransaction's `amount` is `1234`, its `currency` is `usd`, and the
   * `exchange_rate` is `1.234`.
   */
  exchange_rate?: number | null;

  /**
   * This transaction relates to the Stripe object.
   */
  source?:
    | string
    | ApplicationFee
    | Charge
    | ConnectCollectionTransfer
    | CustomerCashBalanceTransaction
    | Dispute
    | FeeRefund
    | IssuingAuthorization
    | IssuingDispute
    | IssuingTransaction
    | Payout
    | RefundsAPI.Refund
    | BalanceTransaction.ReserveTransaction
    | BalanceTransaction.TaxDeductedAtSource
    | Topup
    | Transfer
    | RefundsAPI.TransferReversal
    | null;
}

export namespace BalanceTransaction {
  export interface FeeDetail {
    /**
     * Amount of the fee, in cents.
     */
    amount: number;

    /**
     * Three-letter
     * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
     * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
     */
    currency: string;

    /**
     * Type of the fee, one of: `application_fee`, `payment_method_passthrough_fee`,
     * `stripe_fee` or `tax`.
     */
    type: string;

    /**
     * ID of the Connect application that earned the fee.
     */
    application?: string | null;

    /**
     * An arbitrary string attached to the object. Often useful for displaying to
     * users.
     */
    description?: string | null;
  }

  export interface ReserveTransaction {
    /**
     * Unique identifier for the object.
     */
    id: string;

    amount: number;

    /**
     * Three-letter
     * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
     * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
     */
    currency: string;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value.
     */
    object: 'reserve_transaction';

    /**
     * An arbitrary string attached to the object. Often useful for displaying to
     * users.
     */
    description?: string | null;
  }

  export interface TaxDeductedAtSource {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value.
     */
    object: 'tax_deducted_at_source';

    /**
     * The end of the invoicing period. This TDS applies to Stripe fees collected
     * during this invoicing period.
     */
    period_end: number;

    /**
     * The start of the invoicing period. This TDS applies to Stripe fees collected
     * during this invoicing period.
     */
    period_start: number;

    /**
     * The TAN that was supplied to Stripe when TDS was assessed
     */
    tax_deduction_account_number: string;
  }
}

/**
 * The `Charge` object represents a single attempt to move money into your Stripe
 * account. PaymentIntent confirmation is the most common way to create Charges,
 * but [Account Debits](https://docs.stripe.com/connect/account-debits) may also
 * create Charges. Some legacy payment flows create Charges directly, which is not
 * recommended for new integrations.
 */
export interface Charge {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Amount intended to be collected by this payment. A positive integer representing
   * how much to charge in the
   * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal) (e.g.,
   * 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The
   * minimum amount is $0.50 US or
   * [equivalent in charge currency](https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts).
   * The amount value supports up to eight digits (e.g., a value of 99999999 for a
   * USD charge of $999,999.99).
   */
  amount: number;

  /**
   * Amount in cents (or local equivalent) captured (can be less than the amount
   * attribute on the charge if a partial capture was made).
   */
  amount_captured: number;

  /**
   * Amount in cents (or local equivalent) refunded (can be less than the amount
   * attribute on the charge if a partial refund was issued).
   */
  amount_refunded: number;

  billing_details: Charge.BillingDetails;

  /**
   * If the charge was created without capturing, this Boolean represents whether it
   * is still uncaptured or has since been captured.
   */
  captured: boolean;

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
   * Whether the charge has been disputed.
   */
  disputed: boolean;

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
  object: 'charge';

  /**
   * `true` if the charge succeeded, or was successfully authorized for later
   * capture.
   */
  paid: boolean;

  /**
   * Whether the charge has been fully refunded. If the charge is only partially
   * refunded, this attribute will still be false.
   */
  refunded: boolean;

  /**
   * The status of the payment is either `succeeded`, `pending`, or `failed`.
   */
  status: 'failed' | 'pending' | 'succeeded';

  /**
   * ID of the Connect application that created the charge.
   */
  application?: string | Shared.Application | null;

  /**
   * The application fee (if any) for the charge.
   * [See the Connect documentation](https://docs.stripe.com/connect/direct-charges#collect-fees)
   * for details.
   */
  application_fee?: string | ApplicationFee | null;

  /**
   * The amount of the application fee (if any) requested for the charge.
   * [See the Connect documentation](https://docs.stripe.com/connect/direct-charges#collect-fees)
   * for details.
   */
  application_fee_amount?: number | null;

  /**
   * ID of the balance transaction that describes the impact of this charge on your
   * account balance (not including refunds or disputes).
   */
  balance_transaction?: string | BalanceTransaction | null;

  /**
   * The full statement descriptor that is passed to card networks, and that is
   * displayed on your customers' credit card and bank statements. Allows you to see
   * what the statement descriptor looks like after the static and dynamic portions
   * are combined. This value only exists for card payments.
   */
  calculated_statement_descriptor?: string | null;

  /**
   * ID of the customer this charge is for if one exists.
   */
  customer?: string | CustomersAPI.Customer | Shared.DeletedCustomer | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * ID of the balance transaction that describes the reversal of the balance on your
   * account due to payment failure.
   */
  failure_balance_transaction?: string | BalanceTransaction | null;

  /**
   * Error code explaining reason for charge failure if available (see
   * [the errors section](https://docs.stripe.com/error-codes) for a list of codes).
   */
  failure_code?: string | null;

  /**
   * Message to user further explaining reason for charge failure if available.
   */
  failure_message?: string | null;

  fraud_details?: Charge.FraudDetails | null;

  /**
   * The account (if any) the charge was made on behalf of without triggering an
   * automatic transfer. See the
   * [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers)
   * for details.
   */
  on_behalf_of?: string | AccountsAPI.Account | null;

  outcome?: Charge.Outcome | null;

  /**
   * ID of the PaymentIntent associated with this charge, if one exists.
   */
  payment_intent?: string | PaymentIntentsAPI.PaymentIntent | null;

  /**
   * ID of the payment method used in this charge.
   */
  payment_method?: string | null;

  payment_method_details?: PaymentMethodDetails | null;

  presentment_details?: Shared.PaymentFlowsPaymentIntentPresentmentDetails;

  /**
   * Options to configure Radar. See
   * [Radar Session](https://docs.stripe.com/radar/radar-session) for more
   * information.
   */
  radar_options?: Charge.RadarOptions;

  /**
   * This is the email address that the receipt for this charge was sent to.
   */
  receipt_email?: string | null;

  /**
   * This is the transaction number that appears on email receipts sent for this
   * charge. This attribute will be `null` until a receipt has been sent.
   */
  receipt_number?: string | null;

  /**
   * This is the URL to view the receipt for this charge. The receipt is kept
   * up-to-date to the latest state of the charge, including any refunds. If the
   * charge is for an Invoice, the receipt will be stylized as an Invoice receipt.
   */
  receipt_url?: string | null;

  /**
   * A list of refunds that have been applied to the charge.
   */
  refunds?: Charge.Refunds | null;

  /**
   * ID of the review associated with this charge if one exists.
   */
  review?: string | PaymentIntentsAPI.Review | null;

  shipping?: Shared.Shipping | null;

  /**
   * The transfer ID which created this charge. Only present if the charge came from
   * another Stripe account.
   * [See the Connect documentation](https://docs.stripe.com/connect/destination-charges)
   * for details.
   */
  source_transfer?: string | Transfer | null;

  /**
   * For a non-card charge, text that appears on the customer's statement as the
   * statement descriptor. This value overrides the account's default statement
   * descriptor. For information about requirements, including the 22-character
   * limit, see
   * [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors).
   *
   * For a card charge, this value is ignored unless you don't specify a
   * `statement_descriptor_suffix`, in which case this value is used as the suffix.
   */
  statement_descriptor?: string | null;

  /**
   * Provides information about a card charge. Concatenated to the account's
   * [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static)
   * to form the complete statement descriptor that appears on the customer's
   * statement. If the account has no prefix value, the suffix is concatenated to the
   * account's statement descriptor.
   */
  statement_descriptor_suffix?: string | null;

  /**
   * ID of the transfer to the `destination` account (only applicable if the charge
   * was created using the `destination` parameter).
   */
  transfer?: string | Transfer;

  transfer_data?: ChargeTransferData | null;

  /**
   * A string that identifies this transaction as part of a group. See the
   * [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options)
   * for details.
   */
  transfer_group?: string | null;
}

export namespace Charge {
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

  export interface FraudDetails {
    /**
     * Assessments from Stripe. If set, the value is `fraudulent`.
     */
    stripe_report?: string;

    /**
     * Assessments reported by you. If set, possible values of are `safe` and
     * `fraudulent`.
     */
    user_report?: string;
  }

  export interface Outcome {
    /**
     * Possible values are `authorized`, `manual_review`, `issuer_declined`, `blocked`,
     * and `invalid`. See [understanding declines](https://docs.stripe.com/declines)
     * and [Radar reviews](https://docs.stripe.com/radar/reviews) for details.
     */
    type: string;

    /**
     * An enumerated value providing a more detailed explanation on
     * [how to proceed with an error](https://docs.stripe.com/declines#retrying-issuer-declines).
     */
    advice_code?: 'confirm_card_data' | 'do_not_try_again' | 'try_again_later' | null;

    /**
     * For charges declined by the network, a 2 digit code which indicates the advice
     * returned by the network on how to proceed with an error.
     */
    network_advice_code?: string | null;

    /**
     * For charges declined by the network, an alphanumeric code which indicates the
     * reason the charge failed.
     */
    network_decline_code?: string | null;

    /**
     * Possible values are `approved_by_network`, `declined_by_network`,
     * `not_sent_to_network`, and `reversed_after_approval`. The value
     * `reversed_after_approval` indicates the payment was
     * [blocked by Stripe](https://docs.stripe.com/declines#blocked-payments) after
     * bank authorization, and may temporarily appear as "pending" on a cardholder's
     * statement.
     */
    network_status?: string | null;

    /**
     * An enumerated value providing a more detailed explanation of the outcome's
     * `type`. Charges blocked by Radar's default block rule have the value
     * `highest_risk_level`. Charges placed in review by Radar's default review rule
     * have the value `elevated_risk_level`. Charges blocked because the payment is
     * unlikely to be authorized have the value `low_probability_of_authorization`.
     * Charges authorized, blocked, or placed in review by custom rules have the value
     * `rule`. See [understanding declines](https://docs.stripe.com/declines) for more
     * details.
     */
    reason?: string | null;

    /**
     * Stripe Radar's evaluation of the riskiness of the payment. Possible values for
     * evaluated payments are `normal`, `elevated`, `highest`. For non-card payments,
     * and card-based payments predating the public assignment of risk levels, this
     * field will have the value `not_assessed`. In the event of an error in the
     * evaluation, this field will have the value `unknown`. This field is only
     * available with Radar.
     */
    risk_level?: string;

    /**
     * Stripe Radar's evaluation of the riskiness of the payment. Possible values for
     * evaluated payments are between 0 and 100. For non-card payments, card-based
     * payments predating the public assignment of risk scores, or in the event of an
     * error during evaluation, this field will not be present. This field is only
     * available with Radar for Fraud Teams.
     */
    risk_score?: number;

    /**
     * The ID of the Radar rule that matched the payment, if applicable.
     */
    rule?: string | Outcome.Rule;

    /**
     * A human-readable description of the outcome type and reason, designed for you
     * (the recipient of the payment), not your customer.
     */
    seller_message?: string | null;
  }

  export namespace Outcome {
    export interface Rule {
      /**
       * Unique identifier for the object.
       */
      id: string;

      /**
       * The action taken on the payment.
       */
      action: string;

      /**
       * The predicate to evaluate the payment against.
       */
      predicate: string;
    }
  }

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

  /**
   * A list of refunds that have been applied to the charge.
   */
  export interface Refunds {
    /**
     * Details about each object.
     */
    data: Array<RefundsAPI.Refund>;

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
}

export interface ChargeTransferData {
  /**
   * ID of an existing, connected Stripe account to transfer funds to if
   * `transfer_data` was specified in the charge request.
   */
  destination: string | AccountsAPI.Account;

  /**
   * The amount transferred to the destination account, if specified. By default, the
   * entire charge amount is transferred to the destination account.
   */
  amount?: number | null;
}

export interface ConnectCollectionTransfer {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Amount transferred, in cents (or local equivalent).
   */
  amount: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * ID of the account that funds are being collected for.
   */
  destination: string | AccountsAPI.Account;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'connect_collection_transfer';
}

export interface CustomerBalanceResourceCashBalanceTransactionAdjustedForOverdraft {
  /**
   * The
   * [Balance Transaction](https://docs.stripe.com/api/balance_transactions/object)
   * that corresponds to funds taken out of your Stripe balance.
   */
  balance_transaction: string | BalanceTransaction;

  /**
   * The
   * [Cash Balance Transaction](https://docs.stripe.com/api/cash_balance_transactions/object)
   * that brought the customer balance negative, triggering the clawback of funds.
   */
  linked_transaction: string | CustomerCashBalanceTransaction;
}

export interface CustomerBalanceResourceCashBalanceTransactionAppliedToPayment {
  /**
   * The [Payment Intent](https://docs.stripe.com/api/payment_intents/object) that
   * funds were applied to.
   */
  payment_intent: string | PaymentIntentsAPI.PaymentIntent;
}

export interface CustomerBalanceResourceCashBalanceTransactionRefundedFromPayment {
  /**
   * The [Refund](https://docs.stripe.com/api/refunds/object) that moved these funds
   * into the customer's cash balance.
   */
  refund: string | RefundsAPI.Refund;
}

export interface CustomerBalanceResourceCashBalanceTransactionTransferredToBalance {
  /**
   * The
   * [Balance Transaction](https://docs.stripe.com/api/balance_transactions/object)
   * that corresponds to funds transferred to your Stripe balance.
   */
  balance_transaction: string | BalanceTransaction;
}

export interface CustomerBalanceResourceCashBalanceTransactionUnappliedFromPayment {
  /**
   * The [Payment Intent](https://docs.stripe.com/api/payment_intents/object) that
   * funds were unapplied from.
   */
  payment_intent: string | PaymentIntentsAPI.PaymentIntent;
}

/**
 * Customers with certain payments enabled have a cash balance, representing funds
 * that were paid by the customer to a merchant, but have not yet been allocated to
 * a payment. Cash Balance Transactions represent when funds are moved into or out
 * of this balance. This includes funding by the customer, allocation to payments,
 * and refunds to the customer.
 */
export interface CustomerCashBalanceTransaction {
  /**
   * Unique identifier for the object.
   */
  id: string;

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
   * The customer whose available cash balance changed as a result of this
   * transaction.
   */
  customer: string | CustomersAPI.Customer;

  /**
   * The total available cash balance for the specified currency after this
   * transaction was applied. Represented in the
   * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
   */
  ending_balance: number;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * The amount by which the cash balance changed, represented in the
   * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). A
   * positive value represents funds being added to the cash balance, a negative
   * value represents funds being removed from the cash balance.
   */
  net_amount: number;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'customer_cash_balance_transaction';

  /**
   * The type of the cash balance transaction. New types may be added in future. See
   * [Customer Balance](https://docs.stripe.com/payments/customer-balance#types) to
   * learn more about these types.
   */
  type:
    | 'adjusted_for_overdraft'
    | 'applied_to_payment'
    | 'funded'
    | 'funding_reversed'
    | 'refunded_from_payment'
    | 'return_canceled'
    | 'return_initiated'
    | 'transferred_to_balance'
    | 'unapplied_from_payment';

  adjusted_for_overdraft?: CustomerBalanceResourceCashBalanceTransactionAdjustedForOverdraft;

  applied_to_payment?: CustomerBalanceResourceCashBalanceTransactionAppliedToPayment;

  /**
   * The ID of an Account representing a customer whose available cash balance
   * changed as a result of this transaction.
   */
  customer_account?: string | null;

  funded?: CustomerCashBalanceTransaction.Funded;

  refunded_from_payment?: CustomerBalanceResourceCashBalanceTransactionRefundedFromPayment;

  transferred_to_balance?: CustomerBalanceResourceCashBalanceTransactionTransferredToBalance;

  unapplied_from_payment?: CustomerBalanceResourceCashBalanceTransactionUnappliedFromPayment;
}

export namespace CustomerCashBalanceTransaction {
  export interface Funded {
    bank_transfer: Funded.BankTransfer;
  }

  export namespace Funded {
    export interface BankTransfer {
      /**
       * The funding method type used to fund the customer balance. Permitted values
       * include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`,
       * `mx_bank_transfer`, or `us_bank_transfer`.
       */
      type:
        | 'eu_bank_transfer'
        | 'gb_bank_transfer'
        | 'jp_bank_transfer'
        | 'mx_bank_transfer'
        | 'us_bank_transfer';

      eu_bank_transfer?: BankTransfer.EuBankTransfer;

      gb_bank_transfer?: BankTransfer.GBBankTransfer;

      jp_bank_transfer?: BankTransfer.JpBankTransfer;

      /**
       * The user-supplied reference field on the bank transfer.
       */
      reference?: string | null;

      us_bank_transfer?: BankTransfer.UsBankTransfer;
    }

    export namespace BankTransfer {
      export interface EuBankTransfer {
        /**
         * The BIC of the bank of the sender of the funding.
         */
        bic?: string | null;

        /**
         * The last 4 digits of the IBAN of the sender of the funding.
         */
        iban_last4?: string | null;

        /**
         * The full name of the sender, as supplied by the sending bank.
         */
        sender_name?: string | null;
      }

      export interface GBBankTransfer {
        /**
         * The last 4 digits of the account number of the sender of the funding.
         */
        account_number_last4?: string | null;

        /**
         * The full name of the sender, as supplied by the sending bank.
         */
        sender_name?: string | null;

        /**
         * The sort code of the bank of the sender of the funding
         */
        sort_code?: string | null;
      }

      export interface JpBankTransfer {
        /**
         * The name of the bank of the sender of the funding.
         */
        sender_bank?: string | null;

        /**
         * The name of the bank branch of the sender of the funding.
         */
        sender_branch?: string | null;

        /**
         * The full name of the sender, as supplied by the sending bank.
         */
        sender_name?: string | null;
      }

      export interface UsBankTransfer {
        /**
         * The banking network used for this funding.
         */
        network?: 'ach' | 'domestic_wire_us' | 'swift';

        /**
         * The full name of the sender, as supplied by the sending bank.
         */
        sender_name?: string | null;
      }
    }
  }
}

/**
 * A dispute occurs when a customer questions your charge with their card issuer.
 * When this happens, you have the opportunity to respond to the dispute with
 * evidence that shows that the charge is legitimate.
 *
 * Related guide: [Disputes and fraud](https://docs.stripe.com/disputes)
 */
export interface Dispute {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Disputed amount. Usually the amount of the charge, but it can differ (usually
   * because of currency fluctuation or because only part of the order is disputed).
   */
  amount: number;

  /**
   * List of zero, one, or two balance transactions that show funds withdrawn and
   * reinstated to your Stripe account as a result of this dispute.
   */
  balance_transactions: Array<BalanceTransaction>;

  /**
   * ID of the charge that's disputed.
   */
  charge: string | Charge;

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
   * List of eligibility types that are included in `enhanced_evidence`.
   */
  enhanced_eligibility_types: Array<'visa_compelling_evidence_3' | 'visa_compliance'>;

  evidence: Dispute.Evidence;

  evidence_details: Dispute.EvidenceDetails;

  /**
   * If true, it's still possible to refund the disputed payment. After the payment
   * has been fully refunded, no further funds are withdrawn from your Stripe account
   * as a result of this dispute.
   */
  is_charge_refundable: boolean;

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
  object: 'dispute';

  /**
   * Reason given by cardholder for dispute. Possible values are
   * `bank_cannot_process`, `check_returned`, `credit_not_processed`,
   * `customer_initiated`, `debit_not_authorized`, `duplicate`, `fraudulent`,
   * `general`, `incorrect_account_details`, `insufficient_funds`, `noncompliant`,
   * `product_not_received`, `product_unacceptable`, `subscription_canceled`, or
   * `unrecognized`. Learn more about
   * [dispute reasons](https://docs.stripe.com/disputes/categories).
   */
  reason: string;

  /**
   * The current status of a dispute. Possible values
   * include:`warning_needs_response`, `warning_under_review`, `warning_closed`,
   * `needs_response`, `under_review`, `won`, `lost`, or `prevented`.
   */
  status:
    | 'lost'
    | 'needs_response'
    | 'prevented'
    | 'under_review'
    | 'warning_closed'
    | 'warning_needs_response'
    | 'warning_under_review'
    | 'won';

  /**
   * ID of the PaymentIntent that's disputed.
   */
  payment_intent?: string | PaymentIntentsAPI.PaymentIntent | null;

  payment_method_details?: Dispute.PaymentMethodDetails;
}

export namespace Dispute {
  export interface Evidence {
    enhanced_evidence: Evidence.EnhancedEvidence;

    /**
     * Any server or activity logs showing proof that the customer accessed or
     * downloaded the purchased digital product. This information should include IP
     * addresses, corresponding timestamps, and any detailed recorded activity.
     */
    access_activity_log?: string | null;

    /**
     * The billing address provided by the customer.
     */
    billing_address?: string | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Your
     * subscription cancellation policy, as shown to the customer.
     */
    cancellation_policy?: string | DisputesAPI.File | null;

    /**
     * An explanation of how and when the customer was shown your refund policy prior
     * to purchase.
     */
    cancellation_policy_disclosure?: string | null;

    /**
     * A justification for why the customer's subscription was not canceled.
     */
    cancellation_rebuttal?: string | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any
     * communication with the customer that you feel is relevant to your case. Examples
     * include emails proving that the customer received the product or service, or
     * demonstrating their use of or satisfaction with the product or service.
     */
    customer_communication?: string | DisputesAPI.File | null;

    /**
     * The email address of the customer.
     */
    customer_email_address?: string | null;

    /**
     * The name of the customer.
     */
    customer_name?: string | null;

    /**
     * The IP address that the customer used when making the purchase.
     */
    customer_purchase_ip?: string | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A relevant
     * document or contract showing the customer's signature.
     */
    customer_signature?: string | DisputesAPI.File | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload))
     * Documentation for the prior charge that can uniquely identify the charge, such
     * as a receipt, shipping label, work order, etc. This document should be paired
     * with a similar document from the disputed payment that proves the two payments
     * are separate.
     */
    duplicate_charge_documentation?: string | DisputesAPI.File | null;

    /**
     * An explanation of the difference between the disputed charge versus the prior
     * charge that appears to be a duplicate.
     */
    duplicate_charge_explanation?: string | null;

    /**
     * The Stripe ID for the prior charge which appears to be a duplicate of the
     * disputed charge.
     */
    duplicate_charge_id?: string | null;

    /**
     * A description of the product or service that was sold.
     */
    product_description?: string | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any receipt
     * or message sent to the customer notifying them of the charge.
     */
    receipt?: string | DisputesAPI.File | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Your refund
     * policy, as shown to the customer.
     */
    refund_policy?: string | DisputesAPI.File | null;

    /**
     * Documentation demonstrating that the customer was shown your refund policy prior
     * to purchase.
     */
    refund_policy_disclosure?: string | null;

    /**
     * A justification for why the customer is not entitled to a refund.
     */
    refund_refusal_explanation?: string | null;

    /**
     * The date on which the customer received or began receiving the purchased
     * service, in a clear human-readable format.
     */
    service_date?: string | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload))
     * Documentation showing proof that a service was provided to the customer. This
     * could include a copy of a signed contract, work order, or other form of written
     * agreement.
     */
    service_documentation?: string | DisputesAPI.File | null;

    /**
     * The address to which a physical product was shipped. You should try to include
     * as complete address information as possible.
     */
    shipping_address?: string | null;

    /**
     * The delivery service that shipped a physical product, such as Fedex, UPS, USPS,
     * etc. If multiple carriers were used for this purchase, please separate them with
     * commas.
     */
    shipping_carrier?: string | null;

    /**
     * The date on which a physical product began its route to the shipping address, in
     * a clear human-readable format.
     */
    shipping_date?: string | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload))
     * Documentation showing proof that a product was shipped to the customer at the
     * same address the customer provided to you. This could include a copy of the
     * shipment receipt, shipping label, etc. It should show the customer's full
     * shipping address, if possible.
     */
    shipping_documentation?: string | DisputesAPI.File | null;

    /**
     * The tracking number for a physical product, obtained from the delivery service.
     * If multiple tracking numbers were generated for this purchase, please separate
     * them with commas.
     */
    shipping_tracking_number?: string | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any
     * additional evidence or statements.
     */
    uncategorized_file?: string | DisputesAPI.File | null;

    /**
     * Any additional evidence or statements.
     */
    uncategorized_text?: string | null;
  }

  export namespace Evidence {
    export interface EnhancedEvidence {
      visa_compelling_evidence_3?: EnhancedEvidence.VisaCompellingEvidence3;

      visa_compliance?: EnhancedEvidence.VisaCompliance;
    }

    export namespace EnhancedEvidence {
      export interface VisaCompellingEvidence3 {
        /**
         * List of exactly two prior undisputed transaction objects for Visa Compelling
         * Evidence 3.0 evidence submission.
         */
        prior_undisputed_transactions: Array<VisaCompellingEvidence3.PriorUndisputedTransaction>;

        disputed_transaction?: VisaCompellingEvidence3.DisputedTransaction | null;
      }

      export namespace VisaCompellingEvidence3 {
        export interface PriorUndisputedTransaction {
          /**
           * Stripe charge ID for the Visa Compelling Evidence 3.0 eligible prior charge.
           */
          charge: string;

          /**
           * User Account ID used to log into business platform. Must be recognizable by the
           * user.
           */
          customer_account_id?: string | null;

          /**
           * Unique identifier of the cardholder’s device derived from a combination of at
           * least two hardware and software attributes. Must be at least 20 characters.
           */
          customer_device_fingerprint?: string | null;

          /**
           * Unique identifier of the cardholder’s device such as a device serial number
           * (e.g., International Mobile Equipment Identity [IMEI]). Must be at least 15
           * characters.
           */
          customer_device_id?: string | null;

          /**
           * The email address of the customer.
           */
          customer_email_address?: string | null;

          /**
           * The IP address that the customer used when making the purchase.
           */
          customer_purchase_ip?: string | null;

          /**
           * A description of the product or service that was sold.
           */
          product_description?: string | null;

          shipping_address?: PriorUndisputedTransaction.ShippingAddress | null;
        }

        export namespace PriorUndisputedTransaction {
          export interface ShippingAddress {
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

        export interface DisputedTransaction {
          /**
           * User Account ID used to log into business platform. Must be recognizable by the
           * user.
           */
          customer_account_id?: string | null;

          /**
           * Unique identifier of the cardholder’s device derived from a combination of at
           * least two hardware and software attributes. Must be at least 20 characters.
           */
          customer_device_fingerprint?: string | null;

          /**
           * Unique identifier of the cardholder’s device such as a device serial number
           * (e.g., International Mobile Equipment Identity [IMEI]). Must be at least 15
           * characters.
           */
          customer_device_id?: string | null;

          /**
           * The email address of the customer.
           */
          customer_email_address?: string | null;

          /**
           * The IP address that the customer used when making the purchase.
           */
          customer_purchase_ip?: string | null;

          /**
           * Categorization of disputed payment.
           */
          merchandise_or_services?: 'merchandise' | 'services' | null;

          /**
           * A description of the product or service that was sold.
           */
          product_description?: string | null;

          shipping_address?: DisputedTransaction.ShippingAddress | null;
        }

        export namespace DisputedTransaction {
          export interface ShippingAddress {
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

      export interface VisaCompliance {
        /**
         * A field acknowledging the fee incurred when countering a Visa compliance
         * dispute. If this field is set to true, evidence can be submitted for the
         * compliance dispute. Stripe collects a 500 USD (or local equivalent) amount to
         * cover the network costs associated with resolving compliance disputes. Stripe
         * refunds the 500 USD network fee if you win the dispute.
         */
        fee_acknowledged: boolean;
      }
    }
  }

  export interface EvidenceDetails {
    enhanced_eligibility: EvidenceDetails.EnhancedEligibility;

    /**
     * Whether evidence has been staged for this dispute.
     */
    has_evidence: boolean;

    /**
     * Whether the last evidence submission was submitted past the due date. Defaults
     * to `false` if no evidence submissions have occurred. If `true`, then delivery of
     * the latest evidence is _not_ guaranteed.
     */
    past_due: boolean;

    /**
     * The number of times evidence has been submitted. Typically, you may only submit
     * evidence once.
     */
    submission_count: number;

    /**
     * Date by which evidence must be submitted in order to successfully challenge
     * dispute. Will be 0 if the customer's bank or credit card company doesn't allow a
     * response for this particular dispute.
     */
    due_by?: number | null;
  }

  export namespace EvidenceDetails {
    export interface EnhancedEligibility {
      visa_compelling_evidence_3?: EnhancedEligibility.VisaCompellingEvidence3;

      visa_compliance?: EnhancedEligibility.VisaCompliance;
    }

    export namespace EnhancedEligibility {
      export interface VisaCompellingEvidence3 {
        /**
         * List of actions required to qualify dispute for Visa Compelling Evidence 3.0
         * evidence submission.
         */
        required_actions: Array<
          | 'missing_customer_identifiers'
          | 'missing_disputed_transaction_description'
          | 'missing_merchandise_or_services'
          | 'missing_prior_undisputed_transaction_description'
          | 'missing_prior_undisputed_transactions'
        >;

        /**
         * Visa Compelling Evidence 3.0 eligibility status.
         */
        status: 'not_qualified' | 'qualified' | 'requires_action';
      }

      export interface VisaCompliance {
        /**
         * Visa compliance eligibility status.
         */
        status: 'fee_acknowledged' | 'requires_fee_acknowledgement';
      }
    }
  }

  export interface PaymentMethodDetails {
    /**
     * Payment method type.
     */
    type: 'amazon_pay' | 'card' | 'klarna' | 'paypal';

    amazon_pay?: PaymentMethodDetails.AmazonPay;

    card?: PaymentMethodDetails.Card;

    klarna?: PaymentMethodDetails.Klarna;

    paypal?: PaymentMethodDetails.Paypal;
  }

  export namespace PaymentMethodDetails {
    export interface AmazonPay {
      /**
       * The AmazonPay dispute type, chargeback or claim
       */
      dispute_type?: 'chargeback' | 'claim' | null;
    }

    export interface Card {
      /**
       * Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`,
       * `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.
       */
      brand: string;

      /**
       * The type of dispute opened. Different case types may have varying fees and
       * financial impact.
       */
      case_type: 'block' | 'chargeback' | 'compliance' | 'inquiry' | 'resolution';

      /**
       * The card network's specific dispute reason code, which maps to one of Stripe's
       * primary dispute categories to simplify response guidance. The
       * [Network code map](https://stripe.com/docs/disputes/categories#network-code-map)
       * lists all available dispute reason codes by network.
       */
      network_reason_code?: string | null;
    }

    export interface Klarna {
      /**
       * Chargeback loss reason mapped by Stripe from Klarna's chargeback loss reason
       */
      chargeback_loss_reason_code?: string;

      /**
       * The reason for the dispute as defined by Klarna
       */
      reason_code?: string | null;
    }

    export interface Paypal {
      /**
       * The ID of the dispute in PayPal.
       */
      case_id?: string | null;

      /**
       * The reason for the dispute as defined by PayPal
       */
      reason_code?: string | null;
    }
  }
}

/**
 * `Application Fee Refund` objects allow you to refund an application fee that has
 * previously been created but not yet refunded. Funds will be refunded to the
 * Stripe account from which the fee was originally collected.
 *
 * Related guide:
 * [Refunding application fees](https://docs.stripe.com/connect/destination-charges#refunding-app-fee)
 */
export interface FeeRefund {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Amount, in cents (or local equivalent).
   */
  amount: number;

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
   * ID of the application fee that was refunded.
   */
  fee: string | ApplicationFee;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'fee_refund';

  /**
   * Balance transaction that describes the impact on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;
}

/**
 * This object represents files hosted on Stripe's servers. You can upload files
 * with the [create file](https://api.stripe.com#create_file) request (for example,
 * when uploading dispute evidence). Stripe also creates files independently (for
 * example, the results of a [Sigma scheduled query](#scheduled_queries)).
 *
 * Related guide: [File upload guide](https://docs.stripe.com/file-upload)
 */
export interface File {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'file';

  /**
   * The [purpose](https://docs.stripe.com/file-upload#uploading-a-file) of the
   * uploaded file.
   */
  purpose:
    | 'account_requirement'
    | 'additional_verification'
    | 'business_icon'
    | 'business_logo'
    | 'customer_signature'
    | 'dispute_evidence'
    | 'document_provider_identity_document'
    | 'finance_report_run'
    | 'financial_account_statement'
    | 'identity_document'
    | 'identity_document_downloadable'
    | 'issuing_regulatory_reporting'
    | 'pci_document'
    | 'platform_terms_of_service'
    | 'selfie'
    | 'sigma_scheduled_query'
    | 'tax_document_user_upload'
    | 'terminal_android_apk'
    | 'terminal_reader_splashscreen';

  /**
   * The size of the file object in bytes.
   */
  size: number;

  /**
   * The file expires and isn't available at this time in epoch seconds.
   */
  expires_at?: number | null;

  /**
   * The suitable name for saving the file to a filesystem.
   */
  filename?: string | null;

  /**
   * A list of [file links](https://api.stripe.com#file_links) that point at this
   * file.
   */
  links?: File.Links | null;

  /**
   * A suitable title for the document.
   */
  title?: string | null;

  /**
   * The returned file type (for example, `csv`, `pdf`, `jpg`, or `png`).
   */
  type?: string | null;

  /**
   * Use your live secret API key to download the file from this URL.
   */
  url?: string | null;
}

export namespace File {
  /**
   * A list of [file links](https://api.stripe.com#file_links) that point at this
   * file.
   */
  export interface Links {
    /**
     * Details about each object.
     */
    data: Array<DisputesAPI.FileLink>;

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
}

/**
 * To share the contents of a `File` object with non-Stripe users, you can create a
 * `FileLink`. `FileLink`s contain a URL that you can use to retrieve the contents
 * of the file without authentication.
 */
export interface FileLink {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Returns if the link is already expired.
   */
  expired: boolean;

  /**
   * The file object this link points to.
   */
  file: string | File;

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
  object: 'file_link';

  /**
   * Time that the link expires.
   */
  expires_at?: number | null;

  /**
   * The publicly accessible URL to download the file.
   */
  url?: string | null;
}

/**
 * When an [issued card](https://docs.stripe.com/issuing) is used to make a
 * purchase, an Issuing `Authorization` object is created.
 * [Authorizations](https://docs.stripe.com/issuing/purchases/authorizations) must
 * be approved for the purchase to be completed successfully.
 *
 * Related guide:
 * [Issued card authorizations](https://docs.stripe.com/issuing/purchases/authorizations)
 */
export interface IssuingAuthorization {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The total amount that was authorized or rejected. This amount is in `currency`
   * and in the
   * [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal).
   * `amount` should be the same as `merchant_amount`, unless `currency` and
   * `merchant_currency` are different.
   */
  amount: number;

  /**
   * Whether the authorization has been approved.
   */
  approved: boolean;

  /**
   * How the card details were provided.
   */
  authorization_method: 'chip' | 'contactless' | 'keyed_in' | 'online' | 'swipe';

  /**
   * List of balance transactions associated with this authorization.
   */
  balance_transactions: Array<BalanceTransaction>;

  /**
   * You can [create physical or virtual cards](https://docs.stripe.com/issuing) that
   * are issued to cardholders.
   */
  card: IssuingCard;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * The currency of the cardholder. This currency can be different from the currency
   * presented at authorization and the `merchant_currency` field on this
   * authorization. Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * The total amount that was authorized or rejected. This amount is in the
   * `merchant_currency` and in the
   * [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal).
   * `merchant_amount` should be the same as `amount`, unless `merchant_currency` and
   * `currency` are different.
   */
  merchant_amount: number;

  /**
   * The local currency that was presented to the cardholder for the authorization.
   * This currency can be different from the cardholder currency and the `currency`
   * field on this authorization. Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  merchant_currency: string;

  merchant_data: IssuingAuthorization.MerchantData;

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
  object: 'issuing.authorization';

  /**
   * History of every time a `pending_request` authorization was approved/declined,
   * either by you directly or by Stripe (e.g. based on your spending_controls). If
   * the merchant changes the authorization by performing an incremental
   * authorization, you can look at this field to see the previous requests for the
   * authorization. This field can be helpful in determining why a given
   * authorization was approved/declined.
   */
  request_history: Array<IssuingAuthorization.RequestHistory>;

  /**
   * The current status of the authorization in its lifecycle.
   */
  status: 'closed' | 'expired' | 'pending' | 'reversed';

  /**
   * List of [transactions](https://docs.stripe.com/api/issuing/transactions)
   * associated with this authorization.
   */
  transactions: Array<IssuingTransaction>;

  verification_data: IssuingAuthorization.VerificationData;

  /**
   * [Token](https://docs.stripe.com/api/issuing/tokens/object) object used for this
   * authorization. If a network token was not used for this authorization, this
   * field will be null.
   */
  token?: string | IssuingAuthorization.IssuingToken | null;

  amount_details?: IssuingAuthorizationAmountDetails | null;

  /**
   * The cardholder to whom this authorization belongs.
   */
  cardholder?: string | IssuingCardholder | null;

  fleet?: IssuingAuthorization.Fleet | null;

  /**
   * Fraud challenges sent to the cardholder, if this authorization was declined for
   * fraud risk reasons.
   */
  fraud_challenges?: Array<IssuingAuthorization.FraudChallenge> | null;

  fuel?: IssuingAuthorization.Fuel | null;

  network_data?: IssuingAuthorization.NetworkData | null;

  pending_request?: IssuingAuthorization.PendingRequest | null;

  treasury?: IssuingAuthorization.Treasury | null;

  /**
   * Whether the authorization bypassed fraud risk checks because the cardholder has
   * previously completed a fraud challenge on a similar high-risk authorization from
   * the same merchant.
   */
  verified_by_fraud_challenge?: boolean | null;

  /**
   * The digital wallet used for this transaction. One of `apple_pay`, `google_pay`,
   * or `samsung_pay`. Will populate as `null` when no digital wallet was utilized.
   */
  wallet?: string | null;
}

export namespace IssuingAuthorization {
  export interface MerchantData {
    /**
     * A categorization of the seller's type of business. See our
     * [merchant categories guide](https://docs.stripe.com/issuing/merchant-categories)
     * for a list of possible values.
     */
    category: string;

    /**
     * The merchant category code for the seller’s business
     */
    category_code: string;

    /**
     * Identifier assigned to the seller by the card network. Different card networks
     * may assign different network_id fields to the same merchant.
     */
    network_id: string;

    /**
     * City where the seller is located
     */
    city?: string | null;

    /**
     * Country where the seller is located
     */
    country?: string | null;

    /**
     * Name of the seller
     */
    name?: string | null;

    /**
     * Postal code where the seller is located
     */
    postal_code?: string | null;

    /**
     * State where the seller is located
     */
    state?: string | null;

    /**
     * The seller's tax identification number. Currently populated for French merchants
     * only.
     */
    tax_id?: string | null;

    /**
     * An ID assigned by the seller to the location of the sale.
     */
    terminal_id?: string | null;

    /**
     * URL provided by the merchant on a 3DS request
     */
    url?: string | null;
  }

  export interface RequestHistory {
    /**
     * The `pending_request.amount` at the time of the request, presented in your
     * card's currency and in the
     * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
     * Stripe held this amount from your account to fund the authorization if the
     * request was approved.
     */
    amount: number;

    /**
     * Whether this request was approved.
     */
    approved: boolean;

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
     * The `pending_request.merchant_amount` at the time of the request, presented in
     * the `merchant_currency` and in the
     * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
     */
    merchant_amount: number;

    /**
     * The currency that was collected by the merchant and presented to the cardholder
     * for the authorization. Three-letter
     * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
     * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
     */
    merchant_currency: string;

    /**
     * When an authorization is approved or declined by you or by Stripe, this field
     * provides additional detail on the reason for the outcome.
     */
    reason:
      | 'account_disabled'
      | 'card_active'
      | 'card_canceled'
      | 'card_expired'
      | 'card_inactive'
      | 'cardholder_blocked'
      | 'cardholder_inactive'
      | 'cardholder_verification_required'
      | 'insecure_authorization_method'
      | 'insufficient_funds'
      | 'network_fallback'
      | 'not_allowed'
      | 'pin_blocked'
      | 'spending_controls'
      | 'suspected_fraud'
      | 'verification_failed'
      | 'webhook_approved'
      | 'webhook_declined'
      | 'webhook_error'
      | 'webhook_timeout';

    amount_details?: DisputesAPI.IssuingAuthorizationAmountDetails | null;

    /**
     * A code created by Stripe which is shared with the merchant to validate the
     * authorization. This field will be populated if the authorization message was
     * approved. The code typically starts with the letter "S", followed by a six-digit
     * number. For example, "S498162". Please note that the code is not guaranteed to
     * be unique across authorizations.
     */
    authorization_code?: string | null;

    /**
     * The card network's estimate of the likelihood that an authorization is
     * fraudulent. Takes on values between 1 and 99.
     */
    network_risk_score?: number | null;

    /**
     * If the `request_history.reason` is `webhook_error` because the direct webhook
     * response is invalid (for example, parsing errors or missing parameters), we
     * surface a more detailed error message via this field.
     */
    reason_message?: string | null;

    /**
     * Time when the card network received an authorization request from the acquirer
     * in UTC. Referred to by networks as transmission time.
     */
    requested_at?: number | null;
  }

  export interface VerificationData {
    /**
     * Whether the cardholder provided an address first line and if it matched the
     * cardholder’s `billing.address.line1`.
     */
    address_line1_check: 'match' | 'mismatch' | 'not_provided';

    /**
     * Whether the cardholder provided a postal code and if it matched the cardholder’s
     * `billing.address.postal_code`.
     */
    address_postal_code_check: 'match' | 'mismatch' | 'not_provided';

    /**
     * Whether the cardholder provided a CVC and if it matched Stripe’s record.
     */
    cvc_check: 'match' | 'mismatch' | 'not_provided';

    /**
     * Whether the cardholder provided an expiry date and if it matched Stripe’s
     * record.
     */
    expiry_check: 'match' | 'mismatch' | 'not_provided';

    authentication_exemption?: VerificationData.AuthenticationExemption | null;

    /**
     * The postal code submitted as part of the authorization used for postal code
     * verification.
     */
    postal_code?: string | null;

    three_d_secure?: VerificationData.ThreeDSecure | null;
  }

  export namespace VerificationData {
    export interface AuthenticationExemption {
      /**
       * The entity that requested the exemption, either the acquiring merchant or the
       * Issuing user.
       */
      claimed_by: 'acquirer' | 'issuer';

      /**
       * The specific exemption claimed for this authorization.
       */
      type: 'low_value_transaction' | 'transaction_risk_analysis' | 'unknown';
    }

    export interface ThreeDSecure {
      /**
       * The outcome of the 3D Secure authentication request.
       */
      result: 'attempt_acknowledged' | 'authenticated' | 'failed' | 'required';
    }
  }

  /**
   * An issuing token object is created when an issued card is added to a digital
   * wallet. As a [card issuer](https://docs.stripe.com/issuing), you can
   * [view and manage these tokens](https://docs.stripe.com/issuing/controls/token-management)
   * through Stripe.
   */
  export interface IssuingToken {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * Card associated with this token.
     */
    card: string | DisputesAPI.IssuingCard;

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
     * The token service provider / card network associated with the token.
     */
    network: 'mastercard' | 'visa';

    /**
     * Time at which the token was last updated by the card network. Measured in
     * seconds since the Unix epoch.
     */
    network_updated_at: number;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value.
     */
    object: 'issuing.token';

    /**
     * The usage state of the token.
     */
    status: 'active' | 'deleted' | 'requested' | 'suspended';

    /**
     * The hashed ID derived from the device ID from the card network associated with
     * the token.
     */
    device_fingerprint?: string | null;

    /**
     * The last four digits of the token.
     */
    last4?: string;

    network_data?: IssuingToken.NetworkData;

    /**
     * The digital wallet for this token, if one was used.
     */
    wallet_provider?: 'apple_pay' | 'google_pay' | 'samsung_pay';
  }

  export namespace IssuingToken {
    export interface NetworkData {
      /**
       * The network that the token is associated with. An additional hash is included
       * with a name matching this value, containing tokenization data specific to the
       * card network.
       */
      type: 'mastercard' | 'visa';

      device?: NetworkData.Device;

      mastercard?: NetworkData.Mastercard;

      visa?: NetworkData.Visa;

      wallet_provider?: NetworkData.WalletProvider;
    }

    export namespace NetworkData {
      export interface Device {
        /**
         * An obfuscated ID derived from the device ID.
         */
        device_fingerprint?: string;

        /**
         * The IP address of the device at provisioning time.
         */
        ip_address?: string;

        /**
         * The geographic latitude/longitude coordinates of the device at provisioning
         * time. The format is [+-]decimal/[+-]decimal.
         */
        location?: string;

        /**
         * The name of the device used for tokenization.
         */
        name?: string;

        /**
         * The phone number of the device used for tokenization.
         */
        phone_number?: string;

        /**
         * The type of device used for tokenization.
         */
        type?: 'other' | 'phone' | 'watch';
      }

      export interface Mastercard {
        /**
         * The network-unique identifier for the token.
         */
        token_reference_id: string;

        /**
         * The ID of the entity requesting tokenization, specific to MasterCard.
         */
        token_requestor_id: string;

        /**
         * A unique reference ID from MasterCard to represent the card account number.
         */
        card_reference_id?: string;

        /**
         * The name of the entity requesting tokenization, if known. This is directly
         * provided from MasterCard.
         */
        token_requestor_name?: string;
      }

      export interface Visa {
        /**
         * A unique reference ID from Visa to represent the card account number.
         */
        card_reference_id: string;

        /**
         * The network-unique identifier for the token.
         */
        token_reference_id: string;

        /**
         * The ID of the entity requesting tokenization, specific to Visa.
         */
        token_requestor_id: string;

        /**
         * Degree of risk associated with the token between `01` and `99`, with higher
         * number indicating higher risk. A `00` value indicates the token was not scored
         * by Visa.
         */
        token_risk_score?: string;
      }

      export interface WalletProvider {
        /**
         * The wallet provider-given account ID of the digital wallet the token belongs to.
         */
        account_id?: string;

        /**
         * An evaluation on the trustworthiness of the wallet account between 1 and 5. A
         * higher score indicates more trustworthy.
         */
        account_trust_score?: number;

        /**
         * The method used for tokenizing a card.
         */
        card_number_source?: 'app' | 'manual' | 'on_file' | 'other';

        cardholder_address?: WalletProvider.CardholderAddress;

        /**
         * The name of the cardholder tokenizing the card.
         */
        cardholder_name?: string;

        /**
         * An evaluation on the trustworthiness of the device. A higher score indicates
         * more trustworthy.
         */
        device_trust_score?: number;

        /**
         * The hashed email address of the cardholder's account with the wallet provider.
         */
        hashed_account_email_address?: string;

        /**
         * The reasons for suggested tokenization given by the card network.
         */
        reason_codes?: Array<
          | 'account_card_too_new'
          | 'account_recently_changed'
          | 'account_too_new'
          | 'account_too_new_since_launch'
          | 'additional_device'
          | 'data_expired'
          | 'defer_id_v_decision'
          | 'device_recently_lost'
          | 'good_activity_history'
          | 'has_suspended_tokens'
          | 'high_risk'
          | 'inactive_account'
          | 'long_account_tenure'
          | 'low_account_score'
          | 'low_device_score'
          | 'low_phone_number_score'
          | 'network_service_error'
          | 'outside_home_territory'
          | 'provisioning_cardholder_mismatch'
          | 'provisioning_device_and_cardholder_mismatch'
          | 'provisioning_device_mismatch'
          | 'same_device_no_prior_authentication'
          | 'same_device_successful_prior_authentication'
          | 'software_update'
          | 'suspicious_activity'
          | 'too_many_different_cardholders'
          | 'too_many_recent_attempts'
          | 'too_many_recent_tokens'
        >;

        /**
         * The recommendation on responding to the tokenization request.
         */
        suggested_decision?: 'approve' | 'decline' | 'require_auth';

        /**
         * The version of the standard for mapping reason codes followed by the wallet
         * provider.
         */
        suggested_decision_version?: string;
      }

      export namespace WalletProvider {
        export interface CardholderAddress {
          /**
           * The street address of the cardholder tokenizing the card.
           */
          line1: string;

          /**
           * The postal code of the cardholder tokenizing the card.
           */
          postal_code: string;
        }
      }
    }
  }

  export interface Fleet {
    cardholder_prompt_data?: Fleet.CardholderPromptData | null;

    /**
     * The type of purchase.
     */
    purchase_type?: 'fuel_and_non_fuel_purchase' | 'fuel_purchase' | 'non_fuel_purchase' | null;

    reported_breakdown?: Fleet.ReportedBreakdown | null;

    /**
     * The type of fuel service.
     */
    service_type?: 'full_service' | 'non_fuel_transaction' | 'self_service' | null;
  }

  export namespace Fleet {
    export interface CardholderPromptData {
      /**
       * [Deprecated] An alphanumeric ID, though typical point of sales only support
       * numeric entry. The card program can be configured to prompt for a vehicle ID,
       * driver ID, or generic ID.
       */
      alphanumeric_id?: string | null;

      /**
       * Driver ID.
       */
      driver_id?: string | null;

      /**
       * Odometer reading.
       */
      odometer?: number | null;

      /**
       * An alphanumeric ID. This field is used when a vehicle ID, driver ID, or generic
       * ID is entered by the cardholder, but the merchant or card network did not
       * specify the prompt type.
       */
      unspecified_id?: string | null;

      /**
       * User ID.
       */
      user_id?: string | null;

      /**
       * Vehicle number.
       */
      vehicle_number?: string | null;
    }

    export interface ReportedBreakdown {
      fuel?: ReportedBreakdown.Fuel | null;

      non_fuel?: ReportedBreakdown.NonFuel | null;

      tax?: ReportedBreakdown.Tax | null;
    }

    export namespace ReportedBreakdown {
      export interface Fuel {
        /**
         * Gross fuel amount that should equal Fuel Quantity multiplied by Fuel Unit Cost,
         * inclusive of taxes.
         */
        gross_amount_decimal?: string | null;
      }

      export interface NonFuel {
        /**
         * Gross non-fuel amount that should equal the sum of the line items, inclusive of
         * taxes.
         */
        gross_amount_decimal?: string | null;
      }

      export interface Tax {
        /**
         * Amount of state or provincial Sales Tax included in the transaction amount.
         * `null` if not reported by merchant or not subject to tax.
         */
        local_amount_decimal?: string | null;

        /**
         * Amount of national Sales Tax or VAT included in the transaction amount. `null`
         * if not reported by merchant or not subject to tax.
         */
        national_amount_decimal?: string | null;
      }
    }
  }

  export interface FraudChallenge {
    /**
     * The method by which the fraud challenge was delivered to the cardholder.
     */
    channel: 'sms';

    /**
     * The status of the fraud challenge.
     */
    status: 'expired' | 'pending' | 'rejected' | 'undeliverable' | 'verified';

    /**
     * If the challenge is not deliverable, the reason why.
     */
    undeliverable_reason?: 'no_phone_number' | 'unsupported_phone_number' | null;
  }

  export interface Fuel {
    /**
     * [Conexxus Payment System Product Code](https://www.conexxus.org/conexxus-payment-system-product-codes)
     * identifying the primary fuel product purchased.
     */
    industry_product_code?: string | null;

    /**
     * The quantity of `unit`s of fuel that was dispensed, represented as a decimal
     * string with at most 12 decimal places.
     */
    quantity_decimal?: string | null;

    /**
     * The type of fuel that was purchased.
     */
    type?: 'diesel' | 'other' | 'unleaded_plus' | 'unleaded_regular' | 'unleaded_super' | null;

    /**
     * The units for `quantity_decimal`.
     */
    unit?:
      | 'charging_minute'
      | 'imperial_gallon'
      | 'kilogram'
      | 'kilowatt_hour'
      | 'liter'
      | 'other'
      | 'pound'
      | 'us_gallon'
      | null;

    /**
     * The cost in cents per each unit of fuel, represented as a decimal string with at
     * most 12 decimal places.
     */
    unit_cost_decimal?: string | null;
  }

  export interface NetworkData {
    /**
     * Identifier assigned to the acquirer by the card network. Sometimes this value is
     * not provided by the network; in this case, the value will be `null`.
     */
    acquiring_institution_id?: string | null;

    /**
     * The System Trace Audit Number (STAN) is a 6-digit identifier assigned by the
     * acquirer. Prefer `network_data.transaction_id` if present, unless you have
     * special requirements.
     */
    system_trace_audit_number?: string | null;

    /**
     * Unique identifier for the authorization assigned by the card network used to
     * match subsequent messages, disputes, and transactions.
     */
    transaction_id?: string | null;
  }

  export interface PendingRequest {
    /**
     * The additional amount Stripe will hold if the authorization is approved, in the
     * card's
     * [currency](https://docs.stripe.com/api#issuing_authorization_object-pending-request-currency)
     * and in the
     * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
     */
    amount: number;

    /**
     * Three-letter
     * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
     * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
     */
    currency: string;

    /**
     * If set `true`, you may provide
     * [amount](https://docs.stripe.com/api/issuing/authorizations/approve#approve_issuing_authorization-amount)
     * to control how much to hold for the authorization.
     */
    is_amount_controllable: boolean;

    /**
     * The amount the merchant is requesting to be authorized in the
     * `merchant_currency`. The amount is in the
     * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
     */
    merchant_amount: number;

    /**
     * The local currency the merchant is requesting to authorize.
     */
    merchant_currency: string;

    amount_details?: DisputesAPI.IssuingAuthorizationAmountDetails | null;

    /**
     * The card network's estimate of the likelihood that an authorization is
     * fraudulent. Takes on values between 1 and 99.
     */
    network_risk_score?: number | null;
  }

  export interface Treasury {
    /**
     * The array of
     * [ReceivedCredits](https://docs.stripe.com/api/treasury/received_credits)
     * associated with this authorization
     */
    received_credits: Array<string>;

    /**
     * The array of
     * [ReceivedDebits](https://docs.stripe.com/api/treasury/received_debits)
     * associated with this authorization
     */
    received_debits: Array<string>;

    /**
     * The Treasury [Transaction](https://docs.stripe.com/api/treasury/transactions)
     * associated with this authorization
     */
    transaction?: string | null;
  }
}

export interface IssuingAuthorizationAmountDetails {
  /**
   * The fee charged by the ATM for the cash withdrawal.
   */
  atm_fee?: number | null;

  /**
   * The amount of cash requested by the cardholder.
   */
  cashback_amount?: number | null;
}

/**
 * You can [create physical or virtual cards](https://docs.stripe.com/issuing) that
 * are issued to cardholders.
 */
export interface IssuingCard {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The brand of the card.
   */
  brand: string;

  /**
   * An Issuing `Cardholder` object represents an individual or business entity who
   * is [issued](https://docs.stripe.com/issuing) cards.
   *
   * Related guide:
   * [How to create a cardholder](https://docs.stripe.com/issuing/cards/virtual/issue-cards#create-cardholder)
   */
  cardholder: IssuingCardholder;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Supported currencies are `usd` in the US, `eur` in the EU, and `gbp`
   * in the UK.
   */
  currency: string;

  /**
   * The expiration month of the card.
   */
  exp_month: number;

  /**
   * The expiration year of the card.
   */
  exp_year: number;

  /**
   * The last 4 digits of the card number.
   */
  last4: string;

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
  object: 'issuing.card';

  spending_controls: IssuingCard.SpendingControls;

  /**
   * Whether authorizations can be approved on this card. May be blocked from
   * activating cards depending on past-due Cardholder requirements. Defaults to
   * `inactive`.
   */
  status: 'active' | 'canceled' | 'inactive';

  /**
   * The type of the card.
   */
  type: 'physical' | 'virtual';

  /**
   * The reason why the card was canceled.
   */
  cancellation_reason?: 'design_rejected' | 'lost' | 'stolen' | null;

  /**
   * The card's CVC. For security reasons, this is only available for virtual cards,
   * and will be omitted unless you explicitly request it with
   * [the `expand` parameter](https://docs.stripe.com/api/expanding_objects).
   * Additionally, it's only available via the
   * ["Retrieve a card" endpoint](https://docs.stripe.com/api/issuing/cards/retrieve),
   * not via "List all cards" or any other endpoint.
   */
  cvc?: string;

  /**
   * The financial account this card is attached to.
   */
  financial_account?: string | null;

  latest_fraud_warning?: IssuingCard.LatestFraudWarning | null;

  /**
   * The full unredacted card number. For security reasons, this is only available
   * for virtual cards, and will be omitted unless you explicitly request it with
   * [the `expand` parameter](https://docs.stripe.com/api/expanding_objects).
   * Additionally, it's only available via the
   * ["Retrieve a card" endpoint](https://docs.stripe.com/api/issuing/cards/retrieve),
   * not via "List all cards" or any other endpoint.
   */
  number?: string;

  /**
   * The personalization design object belonging to this card.
   */
  personalization_design?: string | IssuingCard.IssuingPersonalizationDesign | null;

  /**
   * The latest card that replaces this card, if any.
   */
  replaced_by?: string | IssuingCard | null;

  /**
   * The card this card replaces, if any.
   */
  replacement_for?: string | IssuingCard | null;

  /**
   * The reason why the previous card needed to be replaced.
   */
  replacement_reason?: 'damaged' | 'expired' | 'lost' | 'stolen' | null;

  /**
   * Text separate from cardholder name, printed on the card.
   */
  second_line?: string | null;

  shipping?: IssuingCard.Shipping | null;

  wallets?: IssuingCard.Wallets | null;
}

export namespace IssuingCard {
  export interface SpendingControls {
    /**
     * Array of strings containing
     * [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category)
     * of authorizations to allow. All other categories will be blocked. Cannot be set
     * with `blocked_categories`.
     */
    allowed_categories?: Array<
      | 'ac_refrigeration_repair'
      | 'accounting_bookkeeping_services'
      | 'advertising_services'
      | 'agricultural_cooperative'
      | 'airlines_air_carriers'
      | 'airports_flying_fields'
      | 'ambulance_services'
      | 'amusement_parks_carnivals'
      | 'antique_reproductions'
      | 'antique_shops'
      | 'aquariums'
      | 'architectural_surveying_services'
      | 'art_dealers_and_galleries'
      | 'artists_supply_and_craft_shops'
      | 'auto_and_home_supply_stores'
      | 'auto_body_repair_shops'
      | 'auto_paint_shops'
      | 'auto_service_shops'
      | 'automated_cash_disburse'
      | 'automated_fuel_dispensers'
      | 'automobile_associations'
      | 'automotive_parts_and_accessories_stores'
      | 'automotive_tire_stores'
      | 'bail_and_bond_payments'
      | 'bakeries'
      | 'bands_orchestras'
      | 'barber_and_beauty_shops'
      | 'betting_casino_gambling'
      | 'bicycle_shops'
      | 'billiard_pool_establishments'
      | 'boat_dealers'
      | 'boat_rentals_and_leases'
      | 'book_stores'
      | 'books_periodicals_and_newspapers'
      | 'bowling_alleys'
      | 'bus_lines'
      | 'business_secretarial_schools'
      | 'buying_shopping_services'
      | 'cable_satellite_and_other_pay_television_and_radio'
      | 'camera_and_photographic_supply_stores'
      | 'candy_nut_and_confectionery_stores'
      | 'car_and_truck_dealers_new_used'
      | 'car_and_truck_dealers_used_only'
      | 'car_rental_agencies'
      | 'car_washes'
      | 'carpentry_services'
      | 'carpet_upholstery_cleaning'
      | 'caterers'
      | 'charitable_and_social_service_organizations_fundraising'
      | 'chemicals_and_allied_products'
      | 'child_care_services'
      | 'childrens_and_infants_wear_stores'
      | 'chiropodists_podiatrists'
      | 'chiropractors'
      | 'cigar_stores_and_stands'
      | 'civic_social_fraternal_associations'
      | 'cleaning_and_maintenance'
      | 'clothing_rental'
      | 'colleges_universities'
      | 'commercial_equipment'
      | 'commercial_footwear'
      | 'commercial_photography_art_and_graphics'
      | 'commuter_transport_and_ferries'
      | 'computer_network_services'
      | 'computer_programming'
      | 'computer_repair'
      | 'computer_software_stores'
      | 'computers_peripherals_and_software'
      | 'concrete_work_services'
      | 'construction_materials'
      | 'consulting_public_relations'
      | 'correspondence_schools'
      | 'cosmetic_stores'
      | 'counseling_services'
      | 'country_clubs'
      | 'courier_services'
      | 'court_costs'
      | 'credit_reporting_agencies'
      | 'cruise_lines'
      | 'dairy_products_stores'
      | 'dance_hall_studios_schools'
      | 'dating_escort_services'
      | 'dentists_orthodontists'
      | 'department_stores'
      | 'detective_agencies'
      | 'digital_goods_applications'
      | 'digital_goods_games'
      | 'digital_goods_large_volume'
      | 'digital_goods_media'
      | 'direct_marketing_catalog_merchant'
      | 'direct_marketing_combination_catalog_and_retail_merchant'
      | 'direct_marketing_inbound_telemarketing'
      | 'direct_marketing_insurance_services'
      | 'direct_marketing_other'
      | 'direct_marketing_outbound_telemarketing'
      | 'direct_marketing_subscription'
      | 'direct_marketing_travel'
      | 'discount_stores'
      | 'doctors'
      | 'door_to_door_sales'
      | 'drapery_window_covering_and_upholstery_stores'
      | 'drinking_places'
      | 'drug_stores_and_pharmacies'
      | 'drugs_drug_proprietaries_and_druggist_sundries'
      | 'dry_cleaners'
      | 'durable_goods'
      | 'duty_free_stores'
      | 'eating_places_restaurants'
      | 'educational_services'
      | 'electric_razor_stores'
      | 'electric_vehicle_charging'
      | 'electrical_parts_and_equipment'
      | 'electrical_services'
      | 'electronics_repair_shops'
      | 'electronics_stores'
      | 'elementary_secondary_schools'
      | 'emergency_services_gcas_visa_use_only'
      | 'employment_temp_agencies'
      | 'equipment_rental'
      | 'exterminating_services'
      | 'family_clothing_stores'
      | 'fast_food_restaurants'
      | 'financial_institutions'
      | 'fines_government_administrative_entities'
      | 'fireplace_fireplace_screens_and_accessories_stores'
      | 'floor_covering_stores'
      | 'florists'
      | 'florists_supplies_nursery_stock_and_flowers'
      | 'freezer_and_locker_meat_provisioners'
      | 'fuel_dealers_non_automotive'
      | 'funeral_services_crematories'
      | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
      | 'furniture_repair_refinishing'
      | 'furriers_and_fur_shops'
      | 'general_services'
      | 'gift_card_novelty_and_souvenir_shops'
      | 'glass_paint_and_wallpaper_stores'
      | 'glassware_crystal_stores'
      | 'golf_courses_public'
      | 'government_licensed_horse_dog_racing_us_region_only'
      | 'government_licensed_online_casions_online_gambling_us_region_only'
      | 'government_owned_lotteries_non_us_region'
      | 'government_owned_lotteries_us_region_only'
      | 'government_services'
      | 'grocery_stores_supermarkets'
      | 'hardware_equipment_and_supplies'
      | 'hardware_stores'
      | 'health_and_beauty_spas'
      | 'hearing_aids_sales_and_supplies'
      | 'heating_plumbing_a_c'
      | 'hobby_toy_and_game_shops'
      | 'home_supply_warehouse_stores'
      | 'hospitals'
      | 'hotels_motels_and_resorts'
      | 'household_appliance_stores'
      | 'industrial_supplies'
      | 'information_retrieval_services'
      | 'insurance_default'
      | 'insurance_underwriting_premiums'
      | 'intra_company_purchases'
      | 'jewelry_stores_watches_clocks_and_silverware_stores'
      | 'landscaping_services'
      | 'laundries'
      | 'laundry_cleaning_services'
      | 'legal_services_attorneys'
      | 'luggage_and_leather_goods_stores'
      | 'lumber_building_materials_stores'
      | 'manual_cash_disburse'
      | 'marinas_service_and_supplies'
      | 'marketplaces'
      | 'masonry_stonework_and_plaster'
      | 'massage_parlors'
      | 'medical_and_dental_labs'
      | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
      | 'medical_services'
      | 'membership_organizations'
      | 'mens_and_boys_clothing_and_accessories_stores'
      | 'mens_womens_clothing_stores'
      | 'metal_service_centers'
      | 'miscellaneous'
      | 'miscellaneous_apparel_and_accessory_shops'
      | 'miscellaneous_auto_dealers'
      | 'miscellaneous_business_services'
      | 'miscellaneous_food_stores'
      | 'miscellaneous_general_merchandise'
      | 'miscellaneous_general_services'
      | 'miscellaneous_home_furnishing_specialty_stores'
      | 'miscellaneous_publishing_and_printing'
      | 'miscellaneous_recreation_services'
      | 'miscellaneous_repair_shops'
      | 'miscellaneous_specialty_retail'
      | 'mobile_home_dealers'
      | 'motion_picture_theaters'
      | 'motor_freight_carriers_and_trucking'
      | 'motor_homes_dealers'
      | 'motor_vehicle_supplies_and_new_parts'
      | 'motorcycle_shops_and_dealers'
      | 'motorcycle_shops_dealers'
      | 'music_stores_musical_instruments_pianos_and_sheet_music'
      | 'news_dealers_and_newsstands'
      | 'non_fi_money_orders'
      | 'non_fi_stored_value_card_purchase_load'
      | 'nondurable_goods'
      | 'nurseries_lawn_and_garden_supply_stores'
      | 'nursing_personal_care'
      | 'office_and_commercial_furniture'
      | 'opticians_eyeglasses'
      | 'optometrists_ophthalmologist'
      | 'orthopedic_goods_prosthetic_devices'
      | 'osteopaths'
      | 'package_stores_beer_wine_and_liquor'
      | 'paints_varnishes_and_supplies'
      | 'parking_lots_garages'
      | 'passenger_railways'
      | 'pawn_shops'
      | 'pet_shops_pet_food_and_supplies'
      | 'petroleum_and_petroleum_products'
      | 'photo_developing'
      | 'photographic_photocopy_microfilm_equipment_and_supplies'
      | 'photographic_studios'
      | 'picture_video_production'
      | 'piece_goods_notions_and_other_dry_goods'
      | 'plumbing_heating_equipment_and_supplies'
      | 'political_organizations'
      | 'postal_services_government_only'
      | 'precious_stones_and_metals_watches_and_jewelry'
      | 'professional_services'
      | 'public_warehousing_and_storage'
      | 'quick_copy_repro_and_blueprint'
      | 'railroads'
      | 'real_estate_agents_and_managers_rentals'
      | 'record_stores'
      | 'recreational_vehicle_rentals'
      | 'religious_goods_stores'
      | 'religious_organizations'
      | 'roofing_siding_sheet_metal'
      | 'secretarial_support_services'
      | 'security_brokers_dealers'
      | 'service_stations'
      | 'sewing_needlework_fabric_and_piece_goods_stores'
      | 'shoe_repair_hat_cleaning'
      | 'shoe_stores'
      | 'small_appliance_repair'
      | 'snowmobile_dealers'
      | 'special_trade_services'
      | 'specialty_cleaning'
      | 'sporting_goods_stores'
      | 'sporting_recreation_camps'
      | 'sports_and_riding_apparel_stores'
      | 'sports_clubs_fields'
      | 'stamp_and_coin_stores'
      | 'stationary_office_supplies_printing_and_writing_paper'
      | 'stationery_stores_office_and_school_supply_stores'
      | 'swimming_pools_sales'
      | 't_ui_travel_germany'
      | 'tailors_alterations'
      | 'tax_payments_government_agencies'
      | 'tax_preparation_services'
      | 'taxicabs_limousines'
      | 'telecommunication_equipment_and_telephone_sales'
      | 'telecommunication_services'
      | 'telegraph_services'
      | 'tent_and_awning_shops'
      | 'testing_laboratories'
      | 'theatrical_ticket_agencies'
      | 'timeshares'
      | 'tire_retreading_and_repair'
      | 'tolls_bridge_fees'
      | 'tourist_attractions_and_exhibits'
      | 'towing_services'
      | 'trailer_parks_campgrounds'
      | 'transportation_services'
      | 'travel_agencies_tour_operators'
      | 'truck_stop_iteration'
      | 'truck_utility_trailer_rentals'
      | 'typesetting_plate_making_and_related_services'
      | 'typewriter_stores'
      | 'u_s_federal_government_agencies_or_departments'
      | 'uniforms_commercial_clothing'
      | 'used_merchandise_and_secondhand_stores'
      | 'utilities'
      | 'variety_stores'
      | 'veterinary_services'
      | 'video_amusement_game_supplies'
      | 'video_game_arcades'
      | 'video_tape_rental_stores'
      | 'vocational_trade_schools'
      | 'watch_jewelry_repair'
      | 'welding_repair'
      | 'wholesale_clubs'
      | 'wig_and_toupee_stores'
      | 'wires_money_orders'
      | 'womens_accessory_and_specialty_shops'
      | 'womens_ready_to_wear_stores'
      | 'wrecking_and_salvage_yards'
    > | null;

    /**
     * Array of strings containing representing countries from which authorizations
     * will be allowed. Authorizations from merchants in all other countries will be
     * declined. Country codes should be ISO 3166 alpha-2 country codes (e.g. `US`).
     * Cannot be set with `blocked_merchant_countries`. Provide an empty value to unset
     * this control.
     */
    allowed_merchant_countries?: Array<string> | null;

    /**
     * Array of strings containing
     * [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category)
     * of authorizations to decline. All other categories will be allowed. Cannot be
     * set with `allowed_categories`.
     */
    blocked_categories?: Array<
      | 'ac_refrigeration_repair'
      | 'accounting_bookkeeping_services'
      | 'advertising_services'
      | 'agricultural_cooperative'
      | 'airlines_air_carriers'
      | 'airports_flying_fields'
      | 'ambulance_services'
      | 'amusement_parks_carnivals'
      | 'antique_reproductions'
      | 'antique_shops'
      | 'aquariums'
      | 'architectural_surveying_services'
      | 'art_dealers_and_galleries'
      | 'artists_supply_and_craft_shops'
      | 'auto_and_home_supply_stores'
      | 'auto_body_repair_shops'
      | 'auto_paint_shops'
      | 'auto_service_shops'
      | 'automated_cash_disburse'
      | 'automated_fuel_dispensers'
      | 'automobile_associations'
      | 'automotive_parts_and_accessories_stores'
      | 'automotive_tire_stores'
      | 'bail_and_bond_payments'
      | 'bakeries'
      | 'bands_orchestras'
      | 'barber_and_beauty_shops'
      | 'betting_casino_gambling'
      | 'bicycle_shops'
      | 'billiard_pool_establishments'
      | 'boat_dealers'
      | 'boat_rentals_and_leases'
      | 'book_stores'
      | 'books_periodicals_and_newspapers'
      | 'bowling_alleys'
      | 'bus_lines'
      | 'business_secretarial_schools'
      | 'buying_shopping_services'
      | 'cable_satellite_and_other_pay_television_and_radio'
      | 'camera_and_photographic_supply_stores'
      | 'candy_nut_and_confectionery_stores'
      | 'car_and_truck_dealers_new_used'
      | 'car_and_truck_dealers_used_only'
      | 'car_rental_agencies'
      | 'car_washes'
      | 'carpentry_services'
      | 'carpet_upholstery_cleaning'
      | 'caterers'
      | 'charitable_and_social_service_organizations_fundraising'
      | 'chemicals_and_allied_products'
      | 'child_care_services'
      | 'childrens_and_infants_wear_stores'
      | 'chiropodists_podiatrists'
      | 'chiropractors'
      | 'cigar_stores_and_stands'
      | 'civic_social_fraternal_associations'
      | 'cleaning_and_maintenance'
      | 'clothing_rental'
      | 'colleges_universities'
      | 'commercial_equipment'
      | 'commercial_footwear'
      | 'commercial_photography_art_and_graphics'
      | 'commuter_transport_and_ferries'
      | 'computer_network_services'
      | 'computer_programming'
      | 'computer_repair'
      | 'computer_software_stores'
      | 'computers_peripherals_and_software'
      | 'concrete_work_services'
      | 'construction_materials'
      | 'consulting_public_relations'
      | 'correspondence_schools'
      | 'cosmetic_stores'
      | 'counseling_services'
      | 'country_clubs'
      | 'courier_services'
      | 'court_costs'
      | 'credit_reporting_agencies'
      | 'cruise_lines'
      | 'dairy_products_stores'
      | 'dance_hall_studios_schools'
      | 'dating_escort_services'
      | 'dentists_orthodontists'
      | 'department_stores'
      | 'detective_agencies'
      | 'digital_goods_applications'
      | 'digital_goods_games'
      | 'digital_goods_large_volume'
      | 'digital_goods_media'
      | 'direct_marketing_catalog_merchant'
      | 'direct_marketing_combination_catalog_and_retail_merchant'
      | 'direct_marketing_inbound_telemarketing'
      | 'direct_marketing_insurance_services'
      | 'direct_marketing_other'
      | 'direct_marketing_outbound_telemarketing'
      | 'direct_marketing_subscription'
      | 'direct_marketing_travel'
      | 'discount_stores'
      | 'doctors'
      | 'door_to_door_sales'
      | 'drapery_window_covering_and_upholstery_stores'
      | 'drinking_places'
      | 'drug_stores_and_pharmacies'
      | 'drugs_drug_proprietaries_and_druggist_sundries'
      | 'dry_cleaners'
      | 'durable_goods'
      | 'duty_free_stores'
      | 'eating_places_restaurants'
      | 'educational_services'
      | 'electric_razor_stores'
      | 'electric_vehicle_charging'
      | 'electrical_parts_and_equipment'
      | 'electrical_services'
      | 'electronics_repair_shops'
      | 'electronics_stores'
      | 'elementary_secondary_schools'
      | 'emergency_services_gcas_visa_use_only'
      | 'employment_temp_agencies'
      | 'equipment_rental'
      | 'exterminating_services'
      | 'family_clothing_stores'
      | 'fast_food_restaurants'
      | 'financial_institutions'
      | 'fines_government_administrative_entities'
      | 'fireplace_fireplace_screens_and_accessories_stores'
      | 'floor_covering_stores'
      | 'florists'
      | 'florists_supplies_nursery_stock_and_flowers'
      | 'freezer_and_locker_meat_provisioners'
      | 'fuel_dealers_non_automotive'
      | 'funeral_services_crematories'
      | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
      | 'furniture_repair_refinishing'
      | 'furriers_and_fur_shops'
      | 'general_services'
      | 'gift_card_novelty_and_souvenir_shops'
      | 'glass_paint_and_wallpaper_stores'
      | 'glassware_crystal_stores'
      | 'golf_courses_public'
      | 'government_licensed_horse_dog_racing_us_region_only'
      | 'government_licensed_online_casions_online_gambling_us_region_only'
      | 'government_owned_lotteries_non_us_region'
      | 'government_owned_lotteries_us_region_only'
      | 'government_services'
      | 'grocery_stores_supermarkets'
      | 'hardware_equipment_and_supplies'
      | 'hardware_stores'
      | 'health_and_beauty_spas'
      | 'hearing_aids_sales_and_supplies'
      | 'heating_plumbing_a_c'
      | 'hobby_toy_and_game_shops'
      | 'home_supply_warehouse_stores'
      | 'hospitals'
      | 'hotels_motels_and_resorts'
      | 'household_appliance_stores'
      | 'industrial_supplies'
      | 'information_retrieval_services'
      | 'insurance_default'
      | 'insurance_underwriting_premiums'
      | 'intra_company_purchases'
      | 'jewelry_stores_watches_clocks_and_silverware_stores'
      | 'landscaping_services'
      | 'laundries'
      | 'laundry_cleaning_services'
      | 'legal_services_attorneys'
      | 'luggage_and_leather_goods_stores'
      | 'lumber_building_materials_stores'
      | 'manual_cash_disburse'
      | 'marinas_service_and_supplies'
      | 'marketplaces'
      | 'masonry_stonework_and_plaster'
      | 'massage_parlors'
      | 'medical_and_dental_labs'
      | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
      | 'medical_services'
      | 'membership_organizations'
      | 'mens_and_boys_clothing_and_accessories_stores'
      | 'mens_womens_clothing_stores'
      | 'metal_service_centers'
      | 'miscellaneous'
      | 'miscellaneous_apparel_and_accessory_shops'
      | 'miscellaneous_auto_dealers'
      | 'miscellaneous_business_services'
      | 'miscellaneous_food_stores'
      | 'miscellaneous_general_merchandise'
      | 'miscellaneous_general_services'
      | 'miscellaneous_home_furnishing_specialty_stores'
      | 'miscellaneous_publishing_and_printing'
      | 'miscellaneous_recreation_services'
      | 'miscellaneous_repair_shops'
      | 'miscellaneous_specialty_retail'
      | 'mobile_home_dealers'
      | 'motion_picture_theaters'
      | 'motor_freight_carriers_and_trucking'
      | 'motor_homes_dealers'
      | 'motor_vehicle_supplies_and_new_parts'
      | 'motorcycle_shops_and_dealers'
      | 'motorcycle_shops_dealers'
      | 'music_stores_musical_instruments_pianos_and_sheet_music'
      | 'news_dealers_and_newsstands'
      | 'non_fi_money_orders'
      | 'non_fi_stored_value_card_purchase_load'
      | 'nondurable_goods'
      | 'nurseries_lawn_and_garden_supply_stores'
      | 'nursing_personal_care'
      | 'office_and_commercial_furniture'
      | 'opticians_eyeglasses'
      | 'optometrists_ophthalmologist'
      | 'orthopedic_goods_prosthetic_devices'
      | 'osteopaths'
      | 'package_stores_beer_wine_and_liquor'
      | 'paints_varnishes_and_supplies'
      | 'parking_lots_garages'
      | 'passenger_railways'
      | 'pawn_shops'
      | 'pet_shops_pet_food_and_supplies'
      | 'petroleum_and_petroleum_products'
      | 'photo_developing'
      | 'photographic_photocopy_microfilm_equipment_and_supplies'
      | 'photographic_studios'
      | 'picture_video_production'
      | 'piece_goods_notions_and_other_dry_goods'
      | 'plumbing_heating_equipment_and_supplies'
      | 'political_organizations'
      | 'postal_services_government_only'
      | 'precious_stones_and_metals_watches_and_jewelry'
      | 'professional_services'
      | 'public_warehousing_and_storage'
      | 'quick_copy_repro_and_blueprint'
      | 'railroads'
      | 'real_estate_agents_and_managers_rentals'
      | 'record_stores'
      | 'recreational_vehicle_rentals'
      | 'religious_goods_stores'
      | 'religious_organizations'
      | 'roofing_siding_sheet_metal'
      | 'secretarial_support_services'
      | 'security_brokers_dealers'
      | 'service_stations'
      | 'sewing_needlework_fabric_and_piece_goods_stores'
      | 'shoe_repair_hat_cleaning'
      | 'shoe_stores'
      | 'small_appliance_repair'
      | 'snowmobile_dealers'
      | 'special_trade_services'
      | 'specialty_cleaning'
      | 'sporting_goods_stores'
      | 'sporting_recreation_camps'
      | 'sports_and_riding_apparel_stores'
      | 'sports_clubs_fields'
      | 'stamp_and_coin_stores'
      | 'stationary_office_supplies_printing_and_writing_paper'
      | 'stationery_stores_office_and_school_supply_stores'
      | 'swimming_pools_sales'
      | 't_ui_travel_germany'
      | 'tailors_alterations'
      | 'tax_payments_government_agencies'
      | 'tax_preparation_services'
      | 'taxicabs_limousines'
      | 'telecommunication_equipment_and_telephone_sales'
      | 'telecommunication_services'
      | 'telegraph_services'
      | 'tent_and_awning_shops'
      | 'testing_laboratories'
      | 'theatrical_ticket_agencies'
      | 'timeshares'
      | 'tire_retreading_and_repair'
      | 'tolls_bridge_fees'
      | 'tourist_attractions_and_exhibits'
      | 'towing_services'
      | 'trailer_parks_campgrounds'
      | 'transportation_services'
      | 'travel_agencies_tour_operators'
      | 'truck_stop_iteration'
      | 'truck_utility_trailer_rentals'
      | 'typesetting_plate_making_and_related_services'
      | 'typewriter_stores'
      | 'u_s_federal_government_agencies_or_departments'
      | 'uniforms_commercial_clothing'
      | 'used_merchandise_and_secondhand_stores'
      | 'utilities'
      | 'variety_stores'
      | 'veterinary_services'
      | 'video_amusement_game_supplies'
      | 'video_game_arcades'
      | 'video_tape_rental_stores'
      | 'vocational_trade_schools'
      | 'watch_jewelry_repair'
      | 'welding_repair'
      | 'wholesale_clubs'
      | 'wig_and_toupee_stores'
      | 'wires_money_orders'
      | 'womens_accessory_and_specialty_shops'
      | 'womens_ready_to_wear_stores'
      | 'wrecking_and_salvage_yards'
    > | null;

    /**
     * Array of strings containing representing countries from which authorizations
     * will be declined. Country codes should be ISO 3166 alpha-2 country codes (e.g.
     * `US`). Cannot be set with `allowed_merchant_countries`. Provide an empty value
     * to unset this control.
     */
    blocked_merchant_countries?: Array<string> | null;

    /**
     * Limit spending with amount-based rules that apply across any cards this card
     * replaced (i.e., its `replacement_for` card and _that_ card's `replacement_for`
     * card, up the chain).
     */
    spending_limits?: Array<SpendingControls.SpendingLimit> | null;

    /**
     * Currency of the amounts within `spending_limits`. Always the same as the
     * currency of the card.
     */
    spending_limits_currency?: string | null;
  }

  export namespace SpendingControls {
    export interface SpendingLimit {
      /**
       * Maximum amount allowed to spend per interval. This amount is in the card's
       * currency and in the
       * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
       */
      amount: number;

      /**
       * Interval (or event) to which the amount applies.
       */
      interval: 'all_time' | 'daily' | 'monthly' | 'per_authorization' | 'weekly' | 'yearly';

      /**
       * Array of strings containing
       * [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category)
       * this limit applies to. Omitting this field will apply the limit to all
       * categories.
       */
      categories?: Array<
        | 'ac_refrigeration_repair'
        | 'accounting_bookkeeping_services'
        | 'advertising_services'
        | 'agricultural_cooperative'
        | 'airlines_air_carriers'
        | 'airports_flying_fields'
        | 'ambulance_services'
        | 'amusement_parks_carnivals'
        | 'antique_reproductions'
        | 'antique_shops'
        | 'aquariums'
        | 'architectural_surveying_services'
        | 'art_dealers_and_galleries'
        | 'artists_supply_and_craft_shops'
        | 'auto_and_home_supply_stores'
        | 'auto_body_repair_shops'
        | 'auto_paint_shops'
        | 'auto_service_shops'
        | 'automated_cash_disburse'
        | 'automated_fuel_dispensers'
        | 'automobile_associations'
        | 'automotive_parts_and_accessories_stores'
        | 'automotive_tire_stores'
        | 'bail_and_bond_payments'
        | 'bakeries'
        | 'bands_orchestras'
        | 'barber_and_beauty_shops'
        | 'betting_casino_gambling'
        | 'bicycle_shops'
        | 'billiard_pool_establishments'
        | 'boat_dealers'
        | 'boat_rentals_and_leases'
        | 'book_stores'
        | 'books_periodicals_and_newspapers'
        | 'bowling_alleys'
        | 'bus_lines'
        | 'business_secretarial_schools'
        | 'buying_shopping_services'
        | 'cable_satellite_and_other_pay_television_and_radio'
        | 'camera_and_photographic_supply_stores'
        | 'candy_nut_and_confectionery_stores'
        | 'car_and_truck_dealers_new_used'
        | 'car_and_truck_dealers_used_only'
        | 'car_rental_agencies'
        | 'car_washes'
        | 'carpentry_services'
        | 'carpet_upholstery_cleaning'
        | 'caterers'
        | 'charitable_and_social_service_organizations_fundraising'
        | 'chemicals_and_allied_products'
        | 'child_care_services'
        | 'childrens_and_infants_wear_stores'
        | 'chiropodists_podiatrists'
        | 'chiropractors'
        | 'cigar_stores_and_stands'
        | 'civic_social_fraternal_associations'
        | 'cleaning_and_maintenance'
        | 'clothing_rental'
        | 'colleges_universities'
        | 'commercial_equipment'
        | 'commercial_footwear'
        | 'commercial_photography_art_and_graphics'
        | 'commuter_transport_and_ferries'
        | 'computer_network_services'
        | 'computer_programming'
        | 'computer_repair'
        | 'computer_software_stores'
        | 'computers_peripherals_and_software'
        | 'concrete_work_services'
        | 'construction_materials'
        | 'consulting_public_relations'
        | 'correspondence_schools'
        | 'cosmetic_stores'
        | 'counseling_services'
        | 'country_clubs'
        | 'courier_services'
        | 'court_costs'
        | 'credit_reporting_agencies'
        | 'cruise_lines'
        | 'dairy_products_stores'
        | 'dance_hall_studios_schools'
        | 'dating_escort_services'
        | 'dentists_orthodontists'
        | 'department_stores'
        | 'detective_agencies'
        | 'digital_goods_applications'
        | 'digital_goods_games'
        | 'digital_goods_large_volume'
        | 'digital_goods_media'
        | 'direct_marketing_catalog_merchant'
        | 'direct_marketing_combination_catalog_and_retail_merchant'
        | 'direct_marketing_inbound_telemarketing'
        | 'direct_marketing_insurance_services'
        | 'direct_marketing_other'
        | 'direct_marketing_outbound_telemarketing'
        | 'direct_marketing_subscription'
        | 'direct_marketing_travel'
        | 'discount_stores'
        | 'doctors'
        | 'door_to_door_sales'
        | 'drapery_window_covering_and_upholstery_stores'
        | 'drinking_places'
        | 'drug_stores_and_pharmacies'
        | 'drugs_drug_proprietaries_and_druggist_sundries'
        | 'dry_cleaners'
        | 'durable_goods'
        | 'duty_free_stores'
        | 'eating_places_restaurants'
        | 'educational_services'
        | 'electric_razor_stores'
        | 'electric_vehicle_charging'
        | 'electrical_parts_and_equipment'
        | 'electrical_services'
        | 'electronics_repair_shops'
        | 'electronics_stores'
        | 'elementary_secondary_schools'
        | 'emergency_services_gcas_visa_use_only'
        | 'employment_temp_agencies'
        | 'equipment_rental'
        | 'exterminating_services'
        | 'family_clothing_stores'
        | 'fast_food_restaurants'
        | 'financial_institutions'
        | 'fines_government_administrative_entities'
        | 'fireplace_fireplace_screens_and_accessories_stores'
        | 'floor_covering_stores'
        | 'florists'
        | 'florists_supplies_nursery_stock_and_flowers'
        | 'freezer_and_locker_meat_provisioners'
        | 'fuel_dealers_non_automotive'
        | 'funeral_services_crematories'
        | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
        | 'furniture_repair_refinishing'
        | 'furriers_and_fur_shops'
        | 'general_services'
        | 'gift_card_novelty_and_souvenir_shops'
        | 'glass_paint_and_wallpaper_stores'
        | 'glassware_crystal_stores'
        | 'golf_courses_public'
        | 'government_licensed_horse_dog_racing_us_region_only'
        | 'government_licensed_online_casions_online_gambling_us_region_only'
        | 'government_owned_lotteries_non_us_region'
        | 'government_owned_lotteries_us_region_only'
        | 'government_services'
        | 'grocery_stores_supermarkets'
        | 'hardware_equipment_and_supplies'
        | 'hardware_stores'
        | 'health_and_beauty_spas'
        | 'hearing_aids_sales_and_supplies'
        | 'heating_plumbing_a_c'
        | 'hobby_toy_and_game_shops'
        | 'home_supply_warehouse_stores'
        | 'hospitals'
        | 'hotels_motels_and_resorts'
        | 'household_appliance_stores'
        | 'industrial_supplies'
        | 'information_retrieval_services'
        | 'insurance_default'
        | 'insurance_underwriting_premiums'
        | 'intra_company_purchases'
        | 'jewelry_stores_watches_clocks_and_silverware_stores'
        | 'landscaping_services'
        | 'laundries'
        | 'laundry_cleaning_services'
        | 'legal_services_attorneys'
        | 'luggage_and_leather_goods_stores'
        | 'lumber_building_materials_stores'
        | 'manual_cash_disburse'
        | 'marinas_service_and_supplies'
        | 'marketplaces'
        | 'masonry_stonework_and_plaster'
        | 'massage_parlors'
        | 'medical_and_dental_labs'
        | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
        | 'medical_services'
        | 'membership_organizations'
        | 'mens_and_boys_clothing_and_accessories_stores'
        | 'mens_womens_clothing_stores'
        | 'metal_service_centers'
        | 'miscellaneous'
        | 'miscellaneous_apparel_and_accessory_shops'
        | 'miscellaneous_auto_dealers'
        | 'miscellaneous_business_services'
        | 'miscellaneous_food_stores'
        | 'miscellaneous_general_merchandise'
        | 'miscellaneous_general_services'
        | 'miscellaneous_home_furnishing_specialty_stores'
        | 'miscellaneous_publishing_and_printing'
        | 'miscellaneous_recreation_services'
        | 'miscellaneous_repair_shops'
        | 'miscellaneous_specialty_retail'
        | 'mobile_home_dealers'
        | 'motion_picture_theaters'
        | 'motor_freight_carriers_and_trucking'
        | 'motor_homes_dealers'
        | 'motor_vehicle_supplies_and_new_parts'
        | 'motorcycle_shops_and_dealers'
        | 'motorcycle_shops_dealers'
        | 'music_stores_musical_instruments_pianos_and_sheet_music'
        | 'news_dealers_and_newsstands'
        | 'non_fi_money_orders'
        | 'non_fi_stored_value_card_purchase_load'
        | 'nondurable_goods'
        | 'nurseries_lawn_and_garden_supply_stores'
        | 'nursing_personal_care'
        | 'office_and_commercial_furniture'
        | 'opticians_eyeglasses'
        | 'optometrists_ophthalmologist'
        | 'orthopedic_goods_prosthetic_devices'
        | 'osteopaths'
        | 'package_stores_beer_wine_and_liquor'
        | 'paints_varnishes_and_supplies'
        | 'parking_lots_garages'
        | 'passenger_railways'
        | 'pawn_shops'
        | 'pet_shops_pet_food_and_supplies'
        | 'petroleum_and_petroleum_products'
        | 'photo_developing'
        | 'photographic_photocopy_microfilm_equipment_and_supplies'
        | 'photographic_studios'
        | 'picture_video_production'
        | 'piece_goods_notions_and_other_dry_goods'
        | 'plumbing_heating_equipment_and_supplies'
        | 'political_organizations'
        | 'postal_services_government_only'
        | 'precious_stones_and_metals_watches_and_jewelry'
        | 'professional_services'
        | 'public_warehousing_and_storage'
        | 'quick_copy_repro_and_blueprint'
        | 'railroads'
        | 'real_estate_agents_and_managers_rentals'
        | 'record_stores'
        | 'recreational_vehicle_rentals'
        | 'religious_goods_stores'
        | 'religious_organizations'
        | 'roofing_siding_sheet_metal'
        | 'secretarial_support_services'
        | 'security_brokers_dealers'
        | 'service_stations'
        | 'sewing_needlework_fabric_and_piece_goods_stores'
        | 'shoe_repair_hat_cleaning'
        | 'shoe_stores'
        | 'small_appliance_repair'
        | 'snowmobile_dealers'
        | 'special_trade_services'
        | 'specialty_cleaning'
        | 'sporting_goods_stores'
        | 'sporting_recreation_camps'
        | 'sports_and_riding_apparel_stores'
        | 'sports_clubs_fields'
        | 'stamp_and_coin_stores'
        | 'stationary_office_supplies_printing_and_writing_paper'
        | 'stationery_stores_office_and_school_supply_stores'
        | 'swimming_pools_sales'
        | 't_ui_travel_germany'
        | 'tailors_alterations'
        | 'tax_payments_government_agencies'
        | 'tax_preparation_services'
        | 'taxicabs_limousines'
        | 'telecommunication_equipment_and_telephone_sales'
        | 'telecommunication_services'
        | 'telegraph_services'
        | 'tent_and_awning_shops'
        | 'testing_laboratories'
        | 'theatrical_ticket_agencies'
        | 'timeshares'
        | 'tire_retreading_and_repair'
        | 'tolls_bridge_fees'
        | 'tourist_attractions_and_exhibits'
        | 'towing_services'
        | 'trailer_parks_campgrounds'
        | 'transportation_services'
        | 'travel_agencies_tour_operators'
        | 'truck_stop_iteration'
        | 'truck_utility_trailer_rentals'
        | 'typesetting_plate_making_and_related_services'
        | 'typewriter_stores'
        | 'u_s_federal_government_agencies_or_departments'
        | 'uniforms_commercial_clothing'
        | 'used_merchandise_and_secondhand_stores'
        | 'utilities'
        | 'variety_stores'
        | 'veterinary_services'
        | 'video_amusement_game_supplies'
        | 'video_game_arcades'
        | 'video_tape_rental_stores'
        | 'vocational_trade_schools'
        | 'watch_jewelry_repair'
        | 'welding_repair'
        | 'wholesale_clubs'
        | 'wig_and_toupee_stores'
        | 'wires_money_orders'
        | 'womens_accessory_and_specialty_shops'
        | 'womens_ready_to_wear_stores'
        | 'wrecking_and_salvage_yards'
      > | null;
    }
  }

  export interface LatestFraudWarning {
    /**
     * Timestamp of the most recent fraud warning.
     */
    started_at?: number | null;

    /**
     * The type of fraud warning that most recently took place on this card. This field
     * updates with every new fraud warning, so the value changes over time. If
     * populated, cancel and reissue the card.
     */
    type?:
      | 'card_testing_exposure'
      | 'fraud_dispute_filed'
      | 'third_party_reported'
      | 'user_indicated_fraud'
      | null;
  }

  /**
   * A Personalization Design is a logical grouping of a Physical Bundle, card logo,
   * and carrier text that represents a product line.
   */
  export interface IssuingPersonalizationDesign {
    /**
     * Unique identifier for the object.
     */
    id: string;

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
    object: 'issuing.personalization_design';

    /**
     * The physical bundle object belonging to this personalization design.
     */
    physical_bundle: string | IssuingPersonalizationDesign.IssuingPhysicalBundle;

    preferences: IssuingPersonalizationDesign.Preferences;

    rejection_reasons: IssuingPersonalizationDesign.RejectionReasons;

    /**
     * Whether this personalization design can be used to create cards.
     */
    status: 'active' | 'inactive' | 'rejected' | 'review';

    /**
     * The file for the card logo to use with physical bundles that support card logos.
     * Must have a `purpose` value of `issuing_logo`.
     */
    card_logo?: string | DisputesAPI.File | null;

    carrier_text?: IssuingPersonalizationDesign.CarrierText | null;

    /**
     * A lookup key used to retrieve personalization designs dynamically from a static
     * string. This may be up to 200 characters.
     */
    lookup_key?: string | null;

    /**
     * Friendly display name.
     */
    name?: string | null;
  }

  export namespace IssuingPersonalizationDesign {
    /**
     * A Physical Bundle represents the bundle of physical items - card stock, carrier
     * letter, and envelope - that is shipped to a cardholder when you create a
     * physical card.
     */
    export interface IssuingPhysicalBundle {
      /**
       * Unique identifier for the object.
       */
      id: string;

      features: IssuingPhysicalBundle.Features;

      /**
       * Has the value `true` if the object exists in live mode or the value `false` if
       * the object exists in test mode.
       */
      livemode: boolean;

      /**
       * Friendly display name.
       */
      name: string;

      /**
       * String representing the object's type. Objects of the same type share the same
       * value.
       */
      object: 'issuing.physical_bundle';

      /**
       * Whether this physical bundle can be used to create cards.
       */
      status: 'active' | 'inactive' | 'review';

      /**
       * Whether this physical bundle is a standard Stripe offering or custom-made for
       * you.
       */
      type: 'custom' | 'standard';
    }

    export namespace IssuingPhysicalBundle {
      export interface Features {
        /**
         * The policy for how to use card logo images in a card design with this physical
         * bundle.
         */
        card_logo: 'optional' | 'required' | 'unsupported';

        /**
         * The policy for how to use carrier letter text in a card design with this
         * physical bundle.
         */
        carrier_text: 'optional' | 'required' | 'unsupported';

        /**
         * The policy for how to use a second line on a card with this physical bundle.
         */
        second_line: 'optional' | 'required' | 'unsupported';
      }
    }

    export interface Preferences {
      /**
       * Whether we use this personalization design to create cards when one isn't
       * specified. A connected account uses the Connect platform's default design if no
       * personalization design is set as the default design.
       */
      is_default: boolean;

      /**
       * Whether this personalization design is used to create cards when one is not
       * specified and a default for this connected account does not exist.
       */
      is_platform_default?: boolean | null;
    }

    export interface RejectionReasons {
      /**
       * The reason(s) the card logo was rejected.
       */
      card_logo?: Array<
        | 'geographic_location'
        | 'inappropriate'
        | 'network_name'
        | 'non_binary_image'
        | 'non_fiat_currency'
        | 'other'
        | 'other_entity'
        | 'promotional_material'
      > | null;

      /**
       * The reason(s) the carrier text was rejected.
       */
      carrier_text?: Array<
        | 'geographic_location'
        | 'inappropriate'
        | 'network_name'
        | 'non_fiat_currency'
        | 'other'
        | 'other_entity'
        | 'promotional_material'
      > | null;
    }

    export interface CarrierText {
      /**
       * The footer body text of the carrier letter.
       */
      footer_body?: string | null;

      /**
       * The footer title text of the carrier letter.
       */
      footer_title?: string | null;

      /**
       * The header body text of the carrier letter.
       */
      header_body?: string | null;

      /**
       * The header title text of the carrier letter.
       */
      header_title?: string | null;
    }
  }

  export interface Shipping {
    address: Shared.Address;

    /**
     * Recipient name.
     */
    name: string;

    /**
     * Shipment service, such as `standard` or `express`.
     */
    service: 'express' | 'priority' | 'standard';

    /**
     * Packaging options.
     */
    type: 'bulk' | 'individual';

    address_validation?: Shipping.AddressValidation | null;

    /**
     * The delivery company that shipped a card.
     */
    carrier?: 'dhl' | 'fedex' | 'royal_mail' | 'usps' | null;

    customs?: Shipping.Customs | null;

    /**
     * A unix timestamp representing a best estimate of when the card will be
     * delivered.
     */
    eta?: number | null;

    /**
     * The phone number of the receiver of the shipment. Our courier partners will use
     * this number to contact you in the event of card delivery issues. For individual
     * shipments to the EU/UK, if this field is empty, we will provide them with the
     * phone number provided when the cardholder was initially created.
     */
    phone_number?: string | null;

    /**
     * Whether a signature is required for card delivery. This feature is only
     * supported for US users. Standard shipping service does not support signature on
     * delivery. The default value for standard shipping service is false and for
     * express and priority services is true.
     */
    require_signature?: boolean | null;

    /**
     * The delivery status of the card.
     */
    status?: 'canceled' | 'delivered' | 'failure' | 'pending' | 'returned' | 'shipped' | 'submitted' | null;

    /**
     * A tracking number for a card shipment.
     */
    tracking_number?: string | null;

    /**
     * A link to the shipping carrier's site where you can view detailed information
     * about a card shipment.
     */
    tracking_url?: string | null;
  }

  export namespace Shipping {
    export interface AddressValidation {
      /**
       * The address validation capabilities to use.
       */
      mode: 'disabled' | 'normalization_only' | 'validation_and_normalization';

      normalized_address?: Shared.Address | null;

      /**
       * The validation result for the shipping address.
       */
      result?: 'indeterminate' | 'likely_deliverable' | 'likely_undeliverable' | null;
    }

    export interface Customs {
      /**
       * A registration number used for customs in Europe. See
       * [https://www.gov.uk/eori](https://www.gov.uk/eori) for the UK and
       * [https://ec.europa.eu/taxation_customs/business/customs-procedures-import-and-export/customs-procedures/economic-operators-registration-and-identification-number-eori_en](https://ec.europa.eu/taxation_customs/business/customs-procedures-import-and-export/customs-procedures/economic-operators-registration-and-identification-number-eori_en)
       * for the EU.
       */
      eori_number?: string | null;
    }
  }

  export interface Wallets {
    apple_pay: Wallets.ApplePay;

    google_pay: Wallets.GooglePay;

    /**
     * Unique identifier for a card used with digital wallets
     */
    primary_account_identifier?: string | null;
  }

  export namespace Wallets {
    export interface ApplePay {
      /**
       * Apple Pay Eligibility
       */
      eligible: boolean;

      /**
       * Reason the card is ineligible for Apple Pay
       */
      ineligible_reason?: 'missing_agreement' | 'missing_cardholder_contact' | 'unsupported_region' | null;
    }

    export interface GooglePay {
      /**
       * Google Pay Eligibility
       */
      eligible: boolean;

      /**
       * Reason the card is ineligible for Google Pay
       */
      ineligible_reason?: 'missing_agreement' | 'missing_cardholder_contact' | 'unsupported_region' | null;
    }
  }
}

/**
 * An Issuing `Cardholder` object represents an individual or business entity who
 * is [issued](https://docs.stripe.com/issuing) cards.
 *
 * Related guide:
 * [How to create a cardholder](https://docs.stripe.com/issuing/cards/virtual/issue-cards#create-cardholder)
 */
export interface IssuingCardholder {
  /**
   * Unique identifier for the object.
   */
  id: string;

  billing: IssuingCardholderAddress;

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
   * The cardholder's name. This will be printed on cards issued to them.
   */
  name: string;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'issuing.cardholder';

  requirements: IssuingCardholderRequirements;

  /**
   * Specifies whether to permit authorizations on this cardholder's cards.
   */
  status: 'active' | 'blocked' | 'inactive';

  /**
   * One of `individual` or `company`. See
   * [Choose a cardholder type](https://docs.stripe.com/issuing/other/choose-cardholder)
   * for more details.
   */
  type: 'company' | 'individual';

  company?: IssuingCardholderCompany | null;

  /**
   * The cardholder's email address.
   */
  email?: string | null;

  individual?: IssuingCardholderIndividual | null;

  /**
   * The cardholder's phone number. This is required for all cardholders who will be
   * creating EU cards. See the
   * [3D Secure documentation](https://docs.stripe.com/issuing/3d-secure#when-is-3d-secure-applied)
   * for more details.
   */
  phone_number?: string | null;

  /**
   * The cardholder’s preferred locales (languages), ordered by preference. Locales
   * can be `de`, `en`, `es`, `fr`, or `it`. This changes the language of the
   * [3D Secure flow](https://docs.stripe.com/issuing/3d-secure) and one-time
   * password messages sent to the cardholder.
   */
  preferred_locales?: Array<'de' | 'en' | 'es' | 'fr' | 'it'> | null;

  spending_controls?: IssuingCardholderAuthorizationControls | null;
}

export interface IssuingCardholderAddress {
  address: Shared.Address;
}

export interface IssuingCardholderAuthorizationControls {
  /**
   * Array of strings containing
   * [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category)
   * of authorizations to allow. All other categories will be blocked. Cannot be set
   * with `blocked_categories`.
   */
  allowed_categories?: Array<
    | 'ac_refrigeration_repair'
    | 'accounting_bookkeeping_services'
    | 'advertising_services'
    | 'agricultural_cooperative'
    | 'airlines_air_carriers'
    | 'airports_flying_fields'
    | 'ambulance_services'
    | 'amusement_parks_carnivals'
    | 'antique_reproductions'
    | 'antique_shops'
    | 'aquariums'
    | 'architectural_surveying_services'
    | 'art_dealers_and_galleries'
    | 'artists_supply_and_craft_shops'
    | 'auto_and_home_supply_stores'
    | 'auto_body_repair_shops'
    | 'auto_paint_shops'
    | 'auto_service_shops'
    | 'automated_cash_disburse'
    | 'automated_fuel_dispensers'
    | 'automobile_associations'
    | 'automotive_parts_and_accessories_stores'
    | 'automotive_tire_stores'
    | 'bail_and_bond_payments'
    | 'bakeries'
    | 'bands_orchestras'
    | 'barber_and_beauty_shops'
    | 'betting_casino_gambling'
    | 'bicycle_shops'
    | 'billiard_pool_establishments'
    | 'boat_dealers'
    | 'boat_rentals_and_leases'
    | 'book_stores'
    | 'books_periodicals_and_newspapers'
    | 'bowling_alleys'
    | 'bus_lines'
    | 'business_secretarial_schools'
    | 'buying_shopping_services'
    | 'cable_satellite_and_other_pay_television_and_radio'
    | 'camera_and_photographic_supply_stores'
    | 'candy_nut_and_confectionery_stores'
    | 'car_and_truck_dealers_new_used'
    | 'car_and_truck_dealers_used_only'
    | 'car_rental_agencies'
    | 'car_washes'
    | 'carpentry_services'
    | 'carpet_upholstery_cleaning'
    | 'caterers'
    | 'charitable_and_social_service_organizations_fundraising'
    | 'chemicals_and_allied_products'
    | 'child_care_services'
    | 'childrens_and_infants_wear_stores'
    | 'chiropodists_podiatrists'
    | 'chiropractors'
    | 'cigar_stores_and_stands'
    | 'civic_social_fraternal_associations'
    | 'cleaning_and_maintenance'
    | 'clothing_rental'
    | 'colleges_universities'
    | 'commercial_equipment'
    | 'commercial_footwear'
    | 'commercial_photography_art_and_graphics'
    | 'commuter_transport_and_ferries'
    | 'computer_network_services'
    | 'computer_programming'
    | 'computer_repair'
    | 'computer_software_stores'
    | 'computers_peripherals_and_software'
    | 'concrete_work_services'
    | 'construction_materials'
    | 'consulting_public_relations'
    | 'correspondence_schools'
    | 'cosmetic_stores'
    | 'counseling_services'
    | 'country_clubs'
    | 'courier_services'
    | 'court_costs'
    | 'credit_reporting_agencies'
    | 'cruise_lines'
    | 'dairy_products_stores'
    | 'dance_hall_studios_schools'
    | 'dating_escort_services'
    | 'dentists_orthodontists'
    | 'department_stores'
    | 'detective_agencies'
    | 'digital_goods_applications'
    | 'digital_goods_games'
    | 'digital_goods_large_volume'
    | 'digital_goods_media'
    | 'direct_marketing_catalog_merchant'
    | 'direct_marketing_combination_catalog_and_retail_merchant'
    | 'direct_marketing_inbound_telemarketing'
    | 'direct_marketing_insurance_services'
    | 'direct_marketing_other'
    | 'direct_marketing_outbound_telemarketing'
    | 'direct_marketing_subscription'
    | 'direct_marketing_travel'
    | 'discount_stores'
    | 'doctors'
    | 'door_to_door_sales'
    | 'drapery_window_covering_and_upholstery_stores'
    | 'drinking_places'
    | 'drug_stores_and_pharmacies'
    | 'drugs_drug_proprietaries_and_druggist_sundries'
    | 'dry_cleaners'
    | 'durable_goods'
    | 'duty_free_stores'
    | 'eating_places_restaurants'
    | 'educational_services'
    | 'electric_razor_stores'
    | 'electric_vehicle_charging'
    | 'electrical_parts_and_equipment'
    | 'electrical_services'
    | 'electronics_repair_shops'
    | 'electronics_stores'
    | 'elementary_secondary_schools'
    | 'emergency_services_gcas_visa_use_only'
    | 'employment_temp_agencies'
    | 'equipment_rental'
    | 'exterminating_services'
    | 'family_clothing_stores'
    | 'fast_food_restaurants'
    | 'financial_institutions'
    | 'fines_government_administrative_entities'
    | 'fireplace_fireplace_screens_and_accessories_stores'
    | 'floor_covering_stores'
    | 'florists'
    | 'florists_supplies_nursery_stock_and_flowers'
    | 'freezer_and_locker_meat_provisioners'
    | 'fuel_dealers_non_automotive'
    | 'funeral_services_crematories'
    | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
    | 'furniture_repair_refinishing'
    | 'furriers_and_fur_shops'
    | 'general_services'
    | 'gift_card_novelty_and_souvenir_shops'
    | 'glass_paint_and_wallpaper_stores'
    | 'glassware_crystal_stores'
    | 'golf_courses_public'
    | 'government_licensed_horse_dog_racing_us_region_only'
    | 'government_licensed_online_casions_online_gambling_us_region_only'
    | 'government_owned_lotteries_non_us_region'
    | 'government_owned_lotteries_us_region_only'
    | 'government_services'
    | 'grocery_stores_supermarkets'
    | 'hardware_equipment_and_supplies'
    | 'hardware_stores'
    | 'health_and_beauty_spas'
    | 'hearing_aids_sales_and_supplies'
    | 'heating_plumbing_a_c'
    | 'hobby_toy_and_game_shops'
    | 'home_supply_warehouse_stores'
    | 'hospitals'
    | 'hotels_motels_and_resorts'
    | 'household_appliance_stores'
    | 'industrial_supplies'
    | 'information_retrieval_services'
    | 'insurance_default'
    | 'insurance_underwriting_premiums'
    | 'intra_company_purchases'
    | 'jewelry_stores_watches_clocks_and_silverware_stores'
    | 'landscaping_services'
    | 'laundries'
    | 'laundry_cleaning_services'
    | 'legal_services_attorneys'
    | 'luggage_and_leather_goods_stores'
    | 'lumber_building_materials_stores'
    | 'manual_cash_disburse'
    | 'marinas_service_and_supplies'
    | 'marketplaces'
    | 'masonry_stonework_and_plaster'
    | 'massage_parlors'
    | 'medical_and_dental_labs'
    | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
    | 'medical_services'
    | 'membership_organizations'
    | 'mens_and_boys_clothing_and_accessories_stores'
    | 'mens_womens_clothing_stores'
    | 'metal_service_centers'
    | 'miscellaneous'
    | 'miscellaneous_apparel_and_accessory_shops'
    | 'miscellaneous_auto_dealers'
    | 'miscellaneous_business_services'
    | 'miscellaneous_food_stores'
    | 'miscellaneous_general_merchandise'
    | 'miscellaneous_general_services'
    | 'miscellaneous_home_furnishing_specialty_stores'
    | 'miscellaneous_publishing_and_printing'
    | 'miscellaneous_recreation_services'
    | 'miscellaneous_repair_shops'
    | 'miscellaneous_specialty_retail'
    | 'mobile_home_dealers'
    | 'motion_picture_theaters'
    | 'motor_freight_carriers_and_trucking'
    | 'motor_homes_dealers'
    | 'motor_vehicle_supplies_and_new_parts'
    | 'motorcycle_shops_and_dealers'
    | 'motorcycle_shops_dealers'
    | 'music_stores_musical_instruments_pianos_and_sheet_music'
    | 'news_dealers_and_newsstands'
    | 'non_fi_money_orders'
    | 'non_fi_stored_value_card_purchase_load'
    | 'nondurable_goods'
    | 'nurseries_lawn_and_garden_supply_stores'
    | 'nursing_personal_care'
    | 'office_and_commercial_furniture'
    | 'opticians_eyeglasses'
    | 'optometrists_ophthalmologist'
    | 'orthopedic_goods_prosthetic_devices'
    | 'osteopaths'
    | 'package_stores_beer_wine_and_liquor'
    | 'paints_varnishes_and_supplies'
    | 'parking_lots_garages'
    | 'passenger_railways'
    | 'pawn_shops'
    | 'pet_shops_pet_food_and_supplies'
    | 'petroleum_and_petroleum_products'
    | 'photo_developing'
    | 'photographic_photocopy_microfilm_equipment_and_supplies'
    | 'photographic_studios'
    | 'picture_video_production'
    | 'piece_goods_notions_and_other_dry_goods'
    | 'plumbing_heating_equipment_and_supplies'
    | 'political_organizations'
    | 'postal_services_government_only'
    | 'precious_stones_and_metals_watches_and_jewelry'
    | 'professional_services'
    | 'public_warehousing_and_storage'
    | 'quick_copy_repro_and_blueprint'
    | 'railroads'
    | 'real_estate_agents_and_managers_rentals'
    | 'record_stores'
    | 'recreational_vehicle_rentals'
    | 'religious_goods_stores'
    | 'religious_organizations'
    | 'roofing_siding_sheet_metal'
    | 'secretarial_support_services'
    | 'security_brokers_dealers'
    | 'service_stations'
    | 'sewing_needlework_fabric_and_piece_goods_stores'
    | 'shoe_repair_hat_cleaning'
    | 'shoe_stores'
    | 'small_appliance_repair'
    | 'snowmobile_dealers'
    | 'special_trade_services'
    | 'specialty_cleaning'
    | 'sporting_goods_stores'
    | 'sporting_recreation_camps'
    | 'sports_and_riding_apparel_stores'
    | 'sports_clubs_fields'
    | 'stamp_and_coin_stores'
    | 'stationary_office_supplies_printing_and_writing_paper'
    | 'stationery_stores_office_and_school_supply_stores'
    | 'swimming_pools_sales'
    | 't_ui_travel_germany'
    | 'tailors_alterations'
    | 'tax_payments_government_agencies'
    | 'tax_preparation_services'
    | 'taxicabs_limousines'
    | 'telecommunication_equipment_and_telephone_sales'
    | 'telecommunication_services'
    | 'telegraph_services'
    | 'tent_and_awning_shops'
    | 'testing_laboratories'
    | 'theatrical_ticket_agencies'
    | 'timeshares'
    | 'tire_retreading_and_repair'
    | 'tolls_bridge_fees'
    | 'tourist_attractions_and_exhibits'
    | 'towing_services'
    | 'trailer_parks_campgrounds'
    | 'transportation_services'
    | 'travel_agencies_tour_operators'
    | 'truck_stop_iteration'
    | 'truck_utility_trailer_rentals'
    | 'typesetting_plate_making_and_related_services'
    | 'typewriter_stores'
    | 'u_s_federal_government_agencies_or_departments'
    | 'uniforms_commercial_clothing'
    | 'used_merchandise_and_secondhand_stores'
    | 'utilities'
    | 'variety_stores'
    | 'veterinary_services'
    | 'video_amusement_game_supplies'
    | 'video_game_arcades'
    | 'video_tape_rental_stores'
    | 'vocational_trade_schools'
    | 'watch_jewelry_repair'
    | 'welding_repair'
    | 'wholesale_clubs'
    | 'wig_and_toupee_stores'
    | 'wires_money_orders'
    | 'womens_accessory_and_specialty_shops'
    | 'womens_ready_to_wear_stores'
    | 'wrecking_and_salvage_yards'
  > | null;

  /**
   * Array of strings containing representing countries from which authorizations
   * will be allowed. Authorizations from merchants in all other countries will be
   * declined. Country codes should be ISO 3166 alpha-2 country codes (e.g. `US`).
   * Cannot be set with `blocked_merchant_countries`. Provide an empty value to unset
   * this control.
   */
  allowed_merchant_countries?: Array<string> | null;

  /**
   * Array of strings containing
   * [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category)
   * of authorizations to decline. All other categories will be allowed. Cannot be
   * set with `allowed_categories`.
   */
  blocked_categories?: Array<
    | 'ac_refrigeration_repair'
    | 'accounting_bookkeeping_services'
    | 'advertising_services'
    | 'agricultural_cooperative'
    | 'airlines_air_carriers'
    | 'airports_flying_fields'
    | 'ambulance_services'
    | 'amusement_parks_carnivals'
    | 'antique_reproductions'
    | 'antique_shops'
    | 'aquariums'
    | 'architectural_surveying_services'
    | 'art_dealers_and_galleries'
    | 'artists_supply_and_craft_shops'
    | 'auto_and_home_supply_stores'
    | 'auto_body_repair_shops'
    | 'auto_paint_shops'
    | 'auto_service_shops'
    | 'automated_cash_disburse'
    | 'automated_fuel_dispensers'
    | 'automobile_associations'
    | 'automotive_parts_and_accessories_stores'
    | 'automotive_tire_stores'
    | 'bail_and_bond_payments'
    | 'bakeries'
    | 'bands_orchestras'
    | 'barber_and_beauty_shops'
    | 'betting_casino_gambling'
    | 'bicycle_shops'
    | 'billiard_pool_establishments'
    | 'boat_dealers'
    | 'boat_rentals_and_leases'
    | 'book_stores'
    | 'books_periodicals_and_newspapers'
    | 'bowling_alleys'
    | 'bus_lines'
    | 'business_secretarial_schools'
    | 'buying_shopping_services'
    | 'cable_satellite_and_other_pay_television_and_radio'
    | 'camera_and_photographic_supply_stores'
    | 'candy_nut_and_confectionery_stores'
    | 'car_and_truck_dealers_new_used'
    | 'car_and_truck_dealers_used_only'
    | 'car_rental_agencies'
    | 'car_washes'
    | 'carpentry_services'
    | 'carpet_upholstery_cleaning'
    | 'caterers'
    | 'charitable_and_social_service_organizations_fundraising'
    | 'chemicals_and_allied_products'
    | 'child_care_services'
    | 'childrens_and_infants_wear_stores'
    | 'chiropodists_podiatrists'
    | 'chiropractors'
    | 'cigar_stores_and_stands'
    | 'civic_social_fraternal_associations'
    | 'cleaning_and_maintenance'
    | 'clothing_rental'
    | 'colleges_universities'
    | 'commercial_equipment'
    | 'commercial_footwear'
    | 'commercial_photography_art_and_graphics'
    | 'commuter_transport_and_ferries'
    | 'computer_network_services'
    | 'computer_programming'
    | 'computer_repair'
    | 'computer_software_stores'
    | 'computers_peripherals_and_software'
    | 'concrete_work_services'
    | 'construction_materials'
    | 'consulting_public_relations'
    | 'correspondence_schools'
    | 'cosmetic_stores'
    | 'counseling_services'
    | 'country_clubs'
    | 'courier_services'
    | 'court_costs'
    | 'credit_reporting_agencies'
    | 'cruise_lines'
    | 'dairy_products_stores'
    | 'dance_hall_studios_schools'
    | 'dating_escort_services'
    | 'dentists_orthodontists'
    | 'department_stores'
    | 'detective_agencies'
    | 'digital_goods_applications'
    | 'digital_goods_games'
    | 'digital_goods_large_volume'
    | 'digital_goods_media'
    | 'direct_marketing_catalog_merchant'
    | 'direct_marketing_combination_catalog_and_retail_merchant'
    | 'direct_marketing_inbound_telemarketing'
    | 'direct_marketing_insurance_services'
    | 'direct_marketing_other'
    | 'direct_marketing_outbound_telemarketing'
    | 'direct_marketing_subscription'
    | 'direct_marketing_travel'
    | 'discount_stores'
    | 'doctors'
    | 'door_to_door_sales'
    | 'drapery_window_covering_and_upholstery_stores'
    | 'drinking_places'
    | 'drug_stores_and_pharmacies'
    | 'drugs_drug_proprietaries_and_druggist_sundries'
    | 'dry_cleaners'
    | 'durable_goods'
    | 'duty_free_stores'
    | 'eating_places_restaurants'
    | 'educational_services'
    | 'electric_razor_stores'
    | 'electric_vehicle_charging'
    | 'electrical_parts_and_equipment'
    | 'electrical_services'
    | 'electronics_repair_shops'
    | 'electronics_stores'
    | 'elementary_secondary_schools'
    | 'emergency_services_gcas_visa_use_only'
    | 'employment_temp_agencies'
    | 'equipment_rental'
    | 'exterminating_services'
    | 'family_clothing_stores'
    | 'fast_food_restaurants'
    | 'financial_institutions'
    | 'fines_government_administrative_entities'
    | 'fireplace_fireplace_screens_and_accessories_stores'
    | 'floor_covering_stores'
    | 'florists'
    | 'florists_supplies_nursery_stock_and_flowers'
    | 'freezer_and_locker_meat_provisioners'
    | 'fuel_dealers_non_automotive'
    | 'funeral_services_crematories'
    | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
    | 'furniture_repair_refinishing'
    | 'furriers_and_fur_shops'
    | 'general_services'
    | 'gift_card_novelty_and_souvenir_shops'
    | 'glass_paint_and_wallpaper_stores'
    | 'glassware_crystal_stores'
    | 'golf_courses_public'
    | 'government_licensed_horse_dog_racing_us_region_only'
    | 'government_licensed_online_casions_online_gambling_us_region_only'
    | 'government_owned_lotteries_non_us_region'
    | 'government_owned_lotteries_us_region_only'
    | 'government_services'
    | 'grocery_stores_supermarkets'
    | 'hardware_equipment_and_supplies'
    | 'hardware_stores'
    | 'health_and_beauty_spas'
    | 'hearing_aids_sales_and_supplies'
    | 'heating_plumbing_a_c'
    | 'hobby_toy_and_game_shops'
    | 'home_supply_warehouse_stores'
    | 'hospitals'
    | 'hotels_motels_and_resorts'
    | 'household_appliance_stores'
    | 'industrial_supplies'
    | 'information_retrieval_services'
    | 'insurance_default'
    | 'insurance_underwriting_premiums'
    | 'intra_company_purchases'
    | 'jewelry_stores_watches_clocks_and_silverware_stores'
    | 'landscaping_services'
    | 'laundries'
    | 'laundry_cleaning_services'
    | 'legal_services_attorneys'
    | 'luggage_and_leather_goods_stores'
    | 'lumber_building_materials_stores'
    | 'manual_cash_disburse'
    | 'marinas_service_and_supplies'
    | 'marketplaces'
    | 'masonry_stonework_and_plaster'
    | 'massage_parlors'
    | 'medical_and_dental_labs'
    | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
    | 'medical_services'
    | 'membership_organizations'
    | 'mens_and_boys_clothing_and_accessories_stores'
    | 'mens_womens_clothing_stores'
    | 'metal_service_centers'
    | 'miscellaneous'
    | 'miscellaneous_apparel_and_accessory_shops'
    | 'miscellaneous_auto_dealers'
    | 'miscellaneous_business_services'
    | 'miscellaneous_food_stores'
    | 'miscellaneous_general_merchandise'
    | 'miscellaneous_general_services'
    | 'miscellaneous_home_furnishing_specialty_stores'
    | 'miscellaneous_publishing_and_printing'
    | 'miscellaneous_recreation_services'
    | 'miscellaneous_repair_shops'
    | 'miscellaneous_specialty_retail'
    | 'mobile_home_dealers'
    | 'motion_picture_theaters'
    | 'motor_freight_carriers_and_trucking'
    | 'motor_homes_dealers'
    | 'motor_vehicle_supplies_and_new_parts'
    | 'motorcycle_shops_and_dealers'
    | 'motorcycle_shops_dealers'
    | 'music_stores_musical_instruments_pianos_and_sheet_music'
    | 'news_dealers_and_newsstands'
    | 'non_fi_money_orders'
    | 'non_fi_stored_value_card_purchase_load'
    | 'nondurable_goods'
    | 'nurseries_lawn_and_garden_supply_stores'
    | 'nursing_personal_care'
    | 'office_and_commercial_furniture'
    | 'opticians_eyeglasses'
    | 'optometrists_ophthalmologist'
    | 'orthopedic_goods_prosthetic_devices'
    | 'osteopaths'
    | 'package_stores_beer_wine_and_liquor'
    | 'paints_varnishes_and_supplies'
    | 'parking_lots_garages'
    | 'passenger_railways'
    | 'pawn_shops'
    | 'pet_shops_pet_food_and_supplies'
    | 'petroleum_and_petroleum_products'
    | 'photo_developing'
    | 'photographic_photocopy_microfilm_equipment_and_supplies'
    | 'photographic_studios'
    | 'picture_video_production'
    | 'piece_goods_notions_and_other_dry_goods'
    | 'plumbing_heating_equipment_and_supplies'
    | 'political_organizations'
    | 'postal_services_government_only'
    | 'precious_stones_and_metals_watches_and_jewelry'
    | 'professional_services'
    | 'public_warehousing_and_storage'
    | 'quick_copy_repro_and_blueprint'
    | 'railroads'
    | 'real_estate_agents_and_managers_rentals'
    | 'record_stores'
    | 'recreational_vehicle_rentals'
    | 'religious_goods_stores'
    | 'religious_organizations'
    | 'roofing_siding_sheet_metal'
    | 'secretarial_support_services'
    | 'security_brokers_dealers'
    | 'service_stations'
    | 'sewing_needlework_fabric_and_piece_goods_stores'
    | 'shoe_repair_hat_cleaning'
    | 'shoe_stores'
    | 'small_appliance_repair'
    | 'snowmobile_dealers'
    | 'special_trade_services'
    | 'specialty_cleaning'
    | 'sporting_goods_stores'
    | 'sporting_recreation_camps'
    | 'sports_and_riding_apparel_stores'
    | 'sports_clubs_fields'
    | 'stamp_and_coin_stores'
    | 'stationary_office_supplies_printing_and_writing_paper'
    | 'stationery_stores_office_and_school_supply_stores'
    | 'swimming_pools_sales'
    | 't_ui_travel_germany'
    | 'tailors_alterations'
    | 'tax_payments_government_agencies'
    | 'tax_preparation_services'
    | 'taxicabs_limousines'
    | 'telecommunication_equipment_and_telephone_sales'
    | 'telecommunication_services'
    | 'telegraph_services'
    | 'tent_and_awning_shops'
    | 'testing_laboratories'
    | 'theatrical_ticket_agencies'
    | 'timeshares'
    | 'tire_retreading_and_repair'
    | 'tolls_bridge_fees'
    | 'tourist_attractions_and_exhibits'
    | 'towing_services'
    | 'trailer_parks_campgrounds'
    | 'transportation_services'
    | 'travel_agencies_tour_operators'
    | 'truck_stop_iteration'
    | 'truck_utility_trailer_rentals'
    | 'typesetting_plate_making_and_related_services'
    | 'typewriter_stores'
    | 'u_s_federal_government_agencies_or_departments'
    | 'uniforms_commercial_clothing'
    | 'used_merchandise_and_secondhand_stores'
    | 'utilities'
    | 'variety_stores'
    | 'veterinary_services'
    | 'video_amusement_game_supplies'
    | 'video_game_arcades'
    | 'video_tape_rental_stores'
    | 'vocational_trade_schools'
    | 'watch_jewelry_repair'
    | 'welding_repair'
    | 'wholesale_clubs'
    | 'wig_and_toupee_stores'
    | 'wires_money_orders'
    | 'womens_accessory_and_specialty_shops'
    | 'womens_ready_to_wear_stores'
    | 'wrecking_and_salvage_yards'
  > | null;

  /**
   * Array of strings containing representing countries from which authorizations
   * will be declined. Country codes should be ISO 3166 alpha-2 country codes (e.g.
   * `US`). Cannot be set with `allowed_merchant_countries`. Provide an empty value
   * to unset this control.
   */
  blocked_merchant_countries?: Array<string> | null;

  /**
   * Limit spending with amount-based rules that apply across this cardholder's
   * cards.
   */
  spending_limits?: Array<IssuingCardholderSpendingLimit> | null;

  /**
   * Currency of the amounts within `spending_limits`.
   */
  spending_limits_currency?: string | null;
}

export interface IssuingCardholderCardIssuing {
  user_terms_acceptance?: IssuingCardholderUserTermsAcceptance | null;
}

export interface IssuingCardholderCompany {
  /**
   * Whether the company's business ID number was provided.
   */
  tax_id_provided: boolean;
}

export interface IssuingCardholderIDDocument {
  /**
   * The back of a document returned by a
   * [file upload](https://api.stripe.com#create_file) with a `purpose` value of
   * `identity_document`.
   */
  back?: string | File | null;

  /**
   * The front of a document returned by a
   * [file upload](https://api.stripe.com#create_file) with a `purpose` value of
   * `identity_document`.
   */
  front?: string | File | null;
}

export interface IssuingCardholderIndividual {
  card_issuing?: IssuingCardholderCardIssuing | null;

  dob?: IssuingCardholderIndividualDob | null;

  /**
   * The first name of this cardholder. Required before activating Cards. This field
   * cannot contain any numbers, special characters (except periods, commas, hyphens,
   * spaces and apostrophes) or non-latin letters.
   */
  first_name?: string | null;

  /**
   * The last name of this cardholder. Required before activating Cards. This field
   * cannot contain any numbers, special characters (except periods, commas, hyphens,
   * spaces and apostrophes) or non-latin letters.
   */
  last_name?: string | null;

  verification?: IssuingCardholderVerification | null;
}

export interface IssuingCardholderIndividualDob {
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

export interface IssuingCardholderRequirements {
  /**
   * If `disabled_reason` is present, all cards will decline authorizations with
   * `cardholder_verification_required` reason.
   */
  disabled_reason?: 'listed' | 'rejected.listed' | 'requirements.past_due' | 'under_review' | null;

  /**
   * Array of fields that need to be collected in order to verify and re-enable the
   * cardholder.
   */
  past_due?: Array<
    | 'company.tax_id'
    | 'individual.card_issuing.user_terms_acceptance.date'
    | 'individual.card_issuing.user_terms_acceptance.ip'
    | 'individual.dob.day'
    | 'individual.dob.month'
    | 'individual.dob.year'
    | 'individual.first_name'
    | 'individual.last_name'
    | 'individual.verification.document'
  > | null;
}

export interface IssuingCardholderSpendingLimit {
  /**
   * Maximum amount allowed to spend per interval. This amount is in the card's
   * currency and in the
   * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
   */
  amount: number;

  /**
   * Interval (or event) to which the amount applies.
   */
  interval: 'all_time' | 'daily' | 'monthly' | 'per_authorization' | 'weekly' | 'yearly';

  /**
   * Array of strings containing
   * [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category)
   * this limit applies to. Omitting this field will apply the limit to all
   * categories.
   */
  categories?: Array<
    | 'ac_refrigeration_repair'
    | 'accounting_bookkeeping_services'
    | 'advertising_services'
    | 'agricultural_cooperative'
    | 'airlines_air_carriers'
    | 'airports_flying_fields'
    | 'ambulance_services'
    | 'amusement_parks_carnivals'
    | 'antique_reproductions'
    | 'antique_shops'
    | 'aquariums'
    | 'architectural_surveying_services'
    | 'art_dealers_and_galleries'
    | 'artists_supply_and_craft_shops'
    | 'auto_and_home_supply_stores'
    | 'auto_body_repair_shops'
    | 'auto_paint_shops'
    | 'auto_service_shops'
    | 'automated_cash_disburse'
    | 'automated_fuel_dispensers'
    | 'automobile_associations'
    | 'automotive_parts_and_accessories_stores'
    | 'automotive_tire_stores'
    | 'bail_and_bond_payments'
    | 'bakeries'
    | 'bands_orchestras'
    | 'barber_and_beauty_shops'
    | 'betting_casino_gambling'
    | 'bicycle_shops'
    | 'billiard_pool_establishments'
    | 'boat_dealers'
    | 'boat_rentals_and_leases'
    | 'book_stores'
    | 'books_periodicals_and_newspapers'
    | 'bowling_alleys'
    | 'bus_lines'
    | 'business_secretarial_schools'
    | 'buying_shopping_services'
    | 'cable_satellite_and_other_pay_television_and_radio'
    | 'camera_and_photographic_supply_stores'
    | 'candy_nut_and_confectionery_stores'
    | 'car_and_truck_dealers_new_used'
    | 'car_and_truck_dealers_used_only'
    | 'car_rental_agencies'
    | 'car_washes'
    | 'carpentry_services'
    | 'carpet_upholstery_cleaning'
    | 'caterers'
    | 'charitable_and_social_service_organizations_fundraising'
    | 'chemicals_and_allied_products'
    | 'child_care_services'
    | 'childrens_and_infants_wear_stores'
    | 'chiropodists_podiatrists'
    | 'chiropractors'
    | 'cigar_stores_and_stands'
    | 'civic_social_fraternal_associations'
    | 'cleaning_and_maintenance'
    | 'clothing_rental'
    | 'colleges_universities'
    | 'commercial_equipment'
    | 'commercial_footwear'
    | 'commercial_photography_art_and_graphics'
    | 'commuter_transport_and_ferries'
    | 'computer_network_services'
    | 'computer_programming'
    | 'computer_repair'
    | 'computer_software_stores'
    | 'computers_peripherals_and_software'
    | 'concrete_work_services'
    | 'construction_materials'
    | 'consulting_public_relations'
    | 'correspondence_schools'
    | 'cosmetic_stores'
    | 'counseling_services'
    | 'country_clubs'
    | 'courier_services'
    | 'court_costs'
    | 'credit_reporting_agencies'
    | 'cruise_lines'
    | 'dairy_products_stores'
    | 'dance_hall_studios_schools'
    | 'dating_escort_services'
    | 'dentists_orthodontists'
    | 'department_stores'
    | 'detective_agencies'
    | 'digital_goods_applications'
    | 'digital_goods_games'
    | 'digital_goods_large_volume'
    | 'digital_goods_media'
    | 'direct_marketing_catalog_merchant'
    | 'direct_marketing_combination_catalog_and_retail_merchant'
    | 'direct_marketing_inbound_telemarketing'
    | 'direct_marketing_insurance_services'
    | 'direct_marketing_other'
    | 'direct_marketing_outbound_telemarketing'
    | 'direct_marketing_subscription'
    | 'direct_marketing_travel'
    | 'discount_stores'
    | 'doctors'
    | 'door_to_door_sales'
    | 'drapery_window_covering_and_upholstery_stores'
    | 'drinking_places'
    | 'drug_stores_and_pharmacies'
    | 'drugs_drug_proprietaries_and_druggist_sundries'
    | 'dry_cleaners'
    | 'durable_goods'
    | 'duty_free_stores'
    | 'eating_places_restaurants'
    | 'educational_services'
    | 'electric_razor_stores'
    | 'electric_vehicle_charging'
    | 'electrical_parts_and_equipment'
    | 'electrical_services'
    | 'electronics_repair_shops'
    | 'electronics_stores'
    | 'elementary_secondary_schools'
    | 'emergency_services_gcas_visa_use_only'
    | 'employment_temp_agencies'
    | 'equipment_rental'
    | 'exterminating_services'
    | 'family_clothing_stores'
    | 'fast_food_restaurants'
    | 'financial_institutions'
    | 'fines_government_administrative_entities'
    | 'fireplace_fireplace_screens_and_accessories_stores'
    | 'floor_covering_stores'
    | 'florists'
    | 'florists_supplies_nursery_stock_and_flowers'
    | 'freezer_and_locker_meat_provisioners'
    | 'fuel_dealers_non_automotive'
    | 'funeral_services_crematories'
    | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
    | 'furniture_repair_refinishing'
    | 'furriers_and_fur_shops'
    | 'general_services'
    | 'gift_card_novelty_and_souvenir_shops'
    | 'glass_paint_and_wallpaper_stores'
    | 'glassware_crystal_stores'
    | 'golf_courses_public'
    | 'government_licensed_horse_dog_racing_us_region_only'
    | 'government_licensed_online_casions_online_gambling_us_region_only'
    | 'government_owned_lotteries_non_us_region'
    | 'government_owned_lotteries_us_region_only'
    | 'government_services'
    | 'grocery_stores_supermarkets'
    | 'hardware_equipment_and_supplies'
    | 'hardware_stores'
    | 'health_and_beauty_spas'
    | 'hearing_aids_sales_and_supplies'
    | 'heating_plumbing_a_c'
    | 'hobby_toy_and_game_shops'
    | 'home_supply_warehouse_stores'
    | 'hospitals'
    | 'hotels_motels_and_resorts'
    | 'household_appliance_stores'
    | 'industrial_supplies'
    | 'information_retrieval_services'
    | 'insurance_default'
    | 'insurance_underwriting_premiums'
    | 'intra_company_purchases'
    | 'jewelry_stores_watches_clocks_and_silverware_stores'
    | 'landscaping_services'
    | 'laundries'
    | 'laundry_cleaning_services'
    | 'legal_services_attorneys'
    | 'luggage_and_leather_goods_stores'
    | 'lumber_building_materials_stores'
    | 'manual_cash_disburse'
    | 'marinas_service_and_supplies'
    | 'marketplaces'
    | 'masonry_stonework_and_plaster'
    | 'massage_parlors'
    | 'medical_and_dental_labs'
    | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
    | 'medical_services'
    | 'membership_organizations'
    | 'mens_and_boys_clothing_and_accessories_stores'
    | 'mens_womens_clothing_stores'
    | 'metal_service_centers'
    | 'miscellaneous'
    | 'miscellaneous_apparel_and_accessory_shops'
    | 'miscellaneous_auto_dealers'
    | 'miscellaneous_business_services'
    | 'miscellaneous_food_stores'
    | 'miscellaneous_general_merchandise'
    | 'miscellaneous_general_services'
    | 'miscellaneous_home_furnishing_specialty_stores'
    | 'miscellaneous_publishing_and_printing'
    | 'miscellaneous_recreation_services'
    | 'miscellaneous_repair_shops'
    | 'miscellaneous_specialty_retail'
    | 'mobile_home_dealers'
    | 'motion_picture_theaters'
    | 'motor_freight_carriers_and_trucking'
    | 'motor_homes_dealers'
    | 'motor_vehicle_supplies_and_new_parts'
    | 'motorcycle_shops_and_dealers'
    | 'motorcycle_shops_dealers'
    | 'music_stores_musical_instruments_pianos_and_sheet_music'
    | 'news_dealers_and_newsstands'
    | 'non_fi_money_orders'
    | 'non_fi_stored_value_card_purchase_load'
    | 'nondurable_goods'
    | 'nurseries_lawn_and_garden_supply_stores'
    | 'nursing_personal_care'
    | 'office_and_commercial_furniture'
    | 'opticians_eyeglasses'
    | 'optometrists_ophthalmologist'
    | 'orthopedic_goods_prosthetic_devices'
    | 'osteopaths'
    | 'package_stores_beer_wine_and_liquor'
    | 'paints_varnishes_and_supplies'
    | 'parking_lots_garages'
    | 'passenger_railways'
    | 'pawn_shops'
    | 'pet_shops_pet_food_and_supplies'
    | 'petroleum_and_petroleum_products'
    | 'photo_developing'
    | 'photographic_photocopy_microfilm_equipment_and_supplies'
    | 'photographic_studios'
    | 'picture_video_production'
    | 'piece_goods_notions_and_other_dry_goods'
    | 'plumbing_heating_equipment_and_supplies'
    | 'political_organizations'
    | 'postal_services_government_only'
    | 'precious_stones_and_metals_watches_and_jewelry'
    | 'professional_services'
    | 'public_warehousing_and_storage'
    | 'quick_copy_repro_and_blueprint'
    | 'railroads'
    | 'real_estate_agents_and_managers_rentals'
    | 'record_stores'
    | 'recreational_vehicle_rentals'
    | 'religious_goods_stores'
    | 'religious_organizations'
    | 'roofing_siding_sheet_metal'
    | 'secretarial_support_services'
    | 'security_brokers_dealers'
    | 'service_stations'
    | 'sewing_needlework_fabric_and_piece_goods_stores'
    | 'shoe_repair_hat_cleaning'
    | 'shoe_stores'
    | 'small_appliance_repair'
    | 'snowmobile_dealers'
    | 'special_trade_services'
    | 'specialty_cleaning'
    | 'sporting_goods_stores'
    | 'sporting_recreation_camps'
    | 'sports_and_riding_apparel_stores'
    | 'sports_clubs_fields'
    | 'stamp_and_coin_stores'
    | 'stationary_office_supplies_printing_and_writing_paper'
    | 'stationery_stores_office_and_school_supply_stores'
    | 'swimming_pools_sales'
    | 't_ui_travel_germany'
    | 'tailors_alterations'
    | 'tax_payments_government_agencies'
    | 'tax_preparation_services'
    | 'taxicabs_limousines'
    | 'telecommunication_equipment_and_telephone_sales'
    | 'telecommunication_services'
    | 'telegraph_services'
    | 'tent_and_awning_shops'
    | 'testing_laboratories'
    | 'theatrical_ticket_agencies'
    | 'timeshares'
    | 'tire_retreading_and_repair'
    | 'tolls_bridge_fees'
    | 'tourist_attractions_and_exhibits'
    | 'towing_services'
    | 'trailer_parks_campgrounds'
    | 'transportation_services'
    | 'travel_agencies_tour_operators'
    | 'truck_stop_iteration'
    | 'truck_utility_trailer_rentals'
    | 'typesetting_plate_making_and_related_services'
    | 'typewriter_stores'
    | 'u_s_federal_government_agencies_or_departments'
    | 'uniforms_commercial_clothing'
    | 'used_merchandise_and_secondhand_stores'
    | 'utilities'
    | 'variety_stores'
    | 'veterinary_services'
    | 'video_amusement_game_supplies'
    | 'video_game_arcades'
    | 'video_tape_rental_stores'
    | 'vocational_trade_schools'
    | 'watch_jewelry_repair'
    | 'welding_repair'
    | 'wholesale_clubs'
    | 'wig_and_toupee_stores'
    | 'wires_money_orders'
    | 'womens_accessory_and_specialty_shops'
    | 'womens_ready_to_wear_stores'
    | 'wrecking_and_salvage_yards'
  > | null;
}

export interface IssuingCardholderUserTermsAcceptance {
  /**
   * The Unix timestamp marking when the cardholder accepted the Authorized User
   * Terms.
   */
  date?: number | null;

  /**
   * The IP address from which the cardholder accepted the Authorized User Terms.
   */
  ip?: string | null;

  /**
   * The user agent of the browser from which the cardholder accepted the Authorized
   * User Terms.
   */
  user_agent?: string | null;
}

export interface IssuingCardholderVerification {
  document?: IssuingCardholderIDDocument | null;
}

/**
 * As a [card issuer](https://docs.stripe.com/issuing), you can dispute
 * transactions that the cardholder does not recognize, suspects to be fraudulent,
 * or has other issues with.
 *
 * Related guide:
 * [Issuing disputes](https://docs.stripe.com/issuing/purchases/disputes)
 */
export interface IssuingDispute {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Disputed amount in the card's currency and in the
   * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
   * Usually the amount of the `transaction`, but can differ (usually because of
   * currency fluctuation).
   */
  amount: number;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * The currency the `transaction` was made in.
   */
  currency: string;

  evidence: IssuingDispute.Evidence;

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
  object: 'issuing.dispute';

  /**
   * Current status of the dispute.
   */
  status: 'expired' | 'lost' | 'submitted' | 'unsubmitted' | 'won';

  /**
   * The transaction being disputed.
   */
  transaction: string | IssuingTransaction;

  /**
   * List of balance transactions associated with the dispute.
   */
  balance_transactions?: Array<BalanceTransaction> | null;

  /**
   * The enum that describes the dispute loss outcome. If the dispute is not lost,
   * this field will be absent. New enum values may be added in the future, so be
   * sure to handle unknown values.
   */
  loss_reason?:
    | 'cardholder_authentication_issuer_liability'
    | 'eci5_token_transaction_with_tavv'
    | 'excess_disputes_in_timeframe'
    | 'has_not_met_the_minimum_dispute_amount_requirements'
    | 'invalid_duplicate_dispute'
    | 'invalid_incorrect_amount_dispute'
    | 'invalid_no_authorization'
    | 'invalid_use_of_disputes'
    | 'merchandise_delivered_or_shipped'
    | 'merchandise_or_service_as_described'
    | 'not_cancelled'
    | 'other'
    | 'refund_issued'
    | 'submitted_beyond_allowable_time_limit'
    | 'transaction_3ds_required'
    | 'transaction_approved_after_prior_fraud_dispute'
    | 'transaction_authorized'
    | 'transaction_electronically_read'
    | 'transaction_qualifies_for_visa_easy_payment_service'
    | 'transaction_unattended';

  treasury?: IssuingDispute.Treasury | null;
}

export namespace IssuingDispute {
  export interface Evidence {
    /**
     * The reason for filing the dispute. Its value will match the field containing the
     * evidence.
     */
    reason:
      | 'canceled'
      | 'duplicate'
      | 'fraudulent'
      | 'merchandise_not_as_described'
      | 'no_valid_authorization'
      | 'not_received'
      | 'other'
      | 'service_not_as_described';

    canceled?: Evidence.Canceled;

    duplicate?: Evidence.Duplicate;

    fraudulent?: Evidence.Fraudulent;

    merchandise_not_as_described?: Evidence.MerchandiseNotAsDescribed;

    no_valid_authorization?: Evidence.NoValidAuthorization;

    not_received?: Evidence.NotReceived;

    other?: Evidence.Other;

    service_not_as_described?: Evidence.ServiceNotAsDescribed;
  }

  export namespace Evidence {
    export interface Canceled {
      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional
       * documentation supporting the dispute.
       */
      additional_documentation?: string | DisputesAPI.File | null;

      /**
       * Date when order was canceled.
       */
      canceled_at?: number | null;

      /**
       * Whether the cardholder was provided with a cancellation policy.
       */
      cancellation_policy_provided?: boolean | null;

      /**
       * Reason for canceling the order.
       */
      cancellation_reason?: string | null;

      /**
       * Date when the cardholder expected to receive the product.
       */
      expected_at?: number | null;

      /**
       * Explanation of why the cardholder is disputing this transaction.
       */
      explanation?: string | null;

      /**
       * Description of the merchandise or service that was purchased.
       */
      product_description?: string | null;

      /**
       * Whether the product was a merchandise or service.
       */
      product_type?: 'merchandise' | 'service' | null;

      /**
       * Result of cardholder's attempt to return the product.
       */
      return_status?: 'merchant_rejected' | 'successful' | null;

      /**
       * Date when the product was returned or attempted to be returned.
       */
      returned_at?: number | null;
    }

    export interface Duplicate {
      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional
       * documentation supporting the dispute.
       */
      additional_documentation?: string | DisputesAPI.File | null;

      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Copy of the
       * card statement showing that the product had already been paid for.
       */
      card_statement?: string | DisputesAPI.File | null;

      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Copy of the
       * receipt showing that the product had been paid for in cash.
       */
      cash_receipt?: string | DisputesAPI.File | null;

      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Image of the
       * front and back of the check that was used to pay for the product.
       */
      check_image?: string | DisputesAPI.File | null;

      /**
       * Explanation of why the cardholder is disputing this transaction.
       */
      explanation?: string | null;

      /**
       * Transaction (e.g., ipi\_...) that the disputed transaction is a duplicate of. Of
       * the two or more transactions that are copies of each other, this is original
       * undisputed one.
       */
      original_transaction?: string | null;
    }

    export interface Fraudulent {
      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional
       * documentation supporting the dispute.
       */
      additional_documentation?: string | DisputesAPI.File | null;

      /**
       * Explanation of why the cardholder is disputing this transaction.
       */
      explanation?: string | null;
    }

    export interface MerchandiseNotAsDescribed {
      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional
       * documentation supporting the dispute.
       */
      additional_documentation?: string | DisputesAPI.File | null;

      /**
       * Explanation of why the cardholder is disputing this transaction.
       */
      explanation?: string | null;

      /**
       * Date when the product was received.
       */
      received_at?: number | null;

      /**
       * Description of the cardholder's attempt to return the product.
       */
      return_description?: string | null;

      /**
       * Result of cardholder's attempt to return the product.
       */
      return_status?: 'merchant_rejected' | 'successful' | null;

      /**
       * Date when the product was returned or attempted to be returned.
       */
      returned_at?: number | null;
    }

    export interface NoValidAuthorization {
      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional
       * documentation supporting the dispute.
       */
      additional_documentation?: string | DisputesAPI.File | null;

      /**
       * Explanation of why the cardholder is disputing this transaction.
       */
      explanation?: string | null;
    }

    export interface NotReceived {
      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional
       * documentation supporting the dispute.
       */
      additional_documentation?: string | DisputesAPI.File | null;

      /**
       * Date when the cardholder expected to receive the product.
       */
      expected_at?: number | null;

      /**
       * Explanation of why the cardholder is disputing this transaction.
       */
      explanation?: string | null;

      /**
       * Description of the merchandise or service that was purchased.
       */
      product_description?: string | null;

      /**
       * Whether the product was a merchandise or service.
       */
      product_type?: 'merchandise' | 'service' | null;
    }

    export interface Other {
      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional
       * documentation supporting the dispute.
       */
      additional_documentation?: string | DisputesAPI.File | null;

      /**
       * Explanation of why the cardholder is disputing this transaction.
       */
      explanation?: string | null;

      /**
       * Description of the merchandise or service that was purchased.
       */
      product_description?: string | null;

      /**
       * Whether the product was a merchandise or service.
       */
      product_type?: 'merchandise' | 'service' | null;
    }

    export interface ServiceNotAsDescribed {
      /**
       * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional
       * documentation supporting the dispute.
       */
      additional_documentation?: string | DisputesAPI.File | null;

      /**
       * Date when order was canceled.
       */
      canceled_at?: number | null;

      /**
       * Reason for canceling the order.
       */
      cancellation_reason?: string | null;

      /**
       * Explanation of why the cardholder is disputing this transaction.
       */
      explanation?: string | null;

      /**
       * Date when the product was received.
       */
      received_at?: number | null;
    }
  }

  export interface Treasury {
    /**
     * The Treasury
     * [ReceivedDebit](https://docs.stripe.com/api/treasury/received_debits) that is
     * being disputed.
     */
    received_debit: string;

    /**
     * The Treasury
     * [DebitReversal](https://docs.stripe.com/api/treasury/debit_reversals)
     * representing this Issuing dispute
     */
    debit_reversal?: string | null;
  }
}

/**
 * Any use of an [issued card](https://docs.stripe.com/issuing) that results in
 * funds entering or leaving your Stripe account, such as a completed purchase or
 * refund, is represented by an Issuing `Transaction` object.
 *
 * Related guide:
 * [Issued card transactions](https://docs.stripe.com/issuing/purchases/transactions)
 */
export interface IssuingTransaction {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The transaction amount, which will be reflected in your balance. This amount is
   * in your currency and in the
   * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
   */
  amount: number;

  /**
   * The card used to make this transaction.
   */
  card: string | IssuingCard;

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
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * The amount that the merchant will receive, denominated in `merchant_currency`
   * and in the
   * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). It
   * will be different from `amount` if the merchant is taking payment in a different
   * currency.
   */
  merchant_amount: number;

  /**
   * The currency with which the merchant is taking payment.
   */
  merchant_currency: string;

  merchant_data: IssuingTransaction.MerchantData;

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
  object: 'issuing.transaction';

  /**
   * The nature of the transaction.
   */
  type: 'capture' | 'refund';

  /**
   * [Token](https://docs.stripe.com/api/issuing/tokens/object) object used for this
   * transaction. If a network token was not used for this transaction, this field
   * will be null.
   */
  token?: string | IssuingTransaction.IssuingToken | null;

  amount_details?: IssuingTransaction.AmountDetails | null;

  /**
   * The `Authorization` object that led to this transaction.
   */
  authorization?: string | IssuingAuthorization | null;

  /**
   * ID of the
   * [balance transaction](https://docs.stripe.com/api/balance_transactions)
   * associated with this transaction.
   */
  balance_transaction?: string | BalanceTransaction | null;

  /**
   * The cardholder to whom this transaction belongs.
   */
  cardholder?: string | IssuingCardholder | null;

  /**
   * If you've disputed the transaction, the ID of the dispute.
   */
  dispute?: string | IssuingDispute | null;

  network_data?: IssuingTransaction.NetworkData | null;

  purchase_details?: IssuingTransaction.PurchaseDetails | null;

  treasury?: IssuingTransaction.Treasury | null;

  /**
   * The digital wallet used for this transaction. One of `apple_pay`, `google_pay`,
   * or `samsung_pay`.
   */
  wallet?: 'apple_pay' | 'google_pay' | 'samsung_pay' | null;
}

export namespace IssuingTransaction {
  export interface MerchantData {
    /**
     * A categorization of the seller's type of business. See our
     * [merchant categories guide](https://docs.stripe.com/issuing/merchant-categories)
     * for a list of possible values.
     */
    category: string;

    /**
     * The merchant category code for the seller’s business
     */
    category_code: string;

    /**
     * Identifier assigned to the seller by the card network. Different card networks
     * may assign different network_id fields to the same merchant.
     */
    network_id: string;

    /**
     * City where the seller is located
     */
    city?: string | null;

    /**
     * Country where the seller is located
     */
    country?: string | null;

    /**
     * Name of the seller
     */
    name?: string | null;

    /**
     * Postal code where the seller is located
     */
    postal_code?: string | null;

    /**
     * State where the seller is located
     */
    state?: string | null;

    /**
     * The seller's tax identification number. Currently populated for French merchants
     * only.
     */
    tax_id?: string | null;

    /**
     * An ID assigned by the seller to the location of the sale.
     */
    terminal_id?: string | null;

    /**
     * URL provided by the merchant on a 3DS request
     */
    url?: string | null;
  }

  /**
   * An issuing token object is created when an issued card is added to a digital
   * wallet. As a [card issuer](https://docs.stripe.com/issuing), you can
   * [view and manage these tokens](https://docs.stripe.com/issuing/controls/token-management)
   * through Stripe.
   */
  export interface IssuingToken {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * Card associated with this token.
     */
    card: string | DisputesAPI.IssuingCard;

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
     * The token service provider / card network associated with the token.
     */
    network: 'mastercard' | 'visa';

    /**
     * Time at which the token was last updated by the card network. Measured in
     * seconds since the Unix epoch.
     */
    network_updated_at: number;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value.
     */
    object: 'issuing.token';

    /**
     * The usage state of the token.
     */
    status: 'active' | 'deleted' | 'requested' | 'suspended';

    /**
     * The hashed ID derived from the device ID from the card network associated with
     * the token.
     */
    device_fingerprint?: string | null;

    /**
     * The last four digits of the token.
     */
    last4?: string;

    network_data?: IssuingToken.NetworkData;

    /**
     * The digital wallet for this token, if one was used.
     */
    wallet_provider?: 'apple_pay' | 'google_pay' | 'samsung_pay';
  }

  export namespace IssuingToken {
    export interface NetworkData {
      /**
       * The network that the token is associated with. An additional hash is included
       * with a name matching this value, containing tokenization data specific to the
       * card network.
       */
      type: 'mastercard' | 'visa';

      device?: NetworkData.Device;

      mastercard?: NetworkData.Mastercard;

      visa?: NetworkData.Visa;

      wallet_provider?: NetworkData.WalletProvider;
    }

    export namespace NetworkData {
      export interface Device {
        /**
         * An obfuscated ID derived from the device ID.
         */
        device_fingerprint?: string;

        /**
         * The IP address of the device at provisioning time.
         */
        ip_address?: string;

        /**
         * The geographic latitude/longitude coordinates of the device at provisioning
         * time. The format is [+-]decimal/[+-]decimal.
         */
        location?: string;

        /**
         * The name of the device used for tokenization.
         */
        name?: string;

        /**
         * The phone number of the device used for tokenization.
         */
        phone_number?: string;

        /**
         * The type of device used for tokenization.
         */
        type?: 'other' | 'phone' | 'watch';
      }

      export interface Mastercard {
        /**
         * The network-unique identifier for the token.
         */
        token_reference_id: string;

        /**
         * The ID of the entity requesting tokenization, specific to MasterCard.
         */
        token_requestor_id: string;

        /**
         * A unique reference ID from MasterCard to represent the card account number.
         */
        card_reference_id?: string;

        /**
         * The name of the entity requesting tokenization, if known. This is directly
         * provided from MasterCard.
         */
        token_requestor_name?: string;
      }

      export interface Visa {
        /**
         * A unique reference ID from Visa to represent the card account number.
         */
        card_reference_id: string;

        /**
         * The network-unique identifier for the token.
         */
        token_reference_id: string;

        /**
         * The ID of the entity requesting tokenization, specific to Visa.
         */
        token_requestor_id: string;

        /**
         * Degree of risk associated with the token between `01` and `99`, with higher
         * number indicating higher risk. A `00` value indicates the token was not scored
         * by Visa.
         */
        token_risk_score?: string;
      }

      export interface WalletProvider {
        /**
         * The wallet provider-given account ID of the digital wallet the token belongs to.
         */
        account_id?: string;

        /**
         * An evaluation on the trustworthiness of the wallet account between 1 and 5. A
         * higher score indicates more trustworthy.
         */
        account_trust_score?: number;

        /**
         * The method used for tokenizing a card.
         */
        card_number_source?: 'app' | 'manual' | 'on_file' | 'other';

        cardholder_address?: WalletProvider.CardholderAddress;

        /**
         * The name of the cardholder tokenizing the card.
         */
        cardholder_name?: string;

        /**
         * An evaluation on the trustworthiness of the device. A higher score indicates
         * more trustworthy.
         */
        device_trust_score?: number;

        /**
         * The hashed email address of the cardholder's account with the wallet provider.
         */
        hashed_account_email_address?: string;

        /**
         * The reasons for suggested tokenization given by the card network.
         */
        reason_codes?: Array<
          | 'account_card_too_new'
          | 'account_recently_changed'
          | 'account_too_new'
          | 'account_too_new_since_launch'
          | 'additional_device'
          | 'data_expired'
          | 'defer_id_v_decision'
          | 'device_recently_lost'
          | 'good_activity_history'
          | 'has_suspended_tokens'
          | 'high_risk'
          | 'inactive_account'
          | 'long_account_tenure'
          | 'low_account_score'
          | 'low_device_score'
          | 'low_phone_number_score'
          | 'network_service_error'
          | 'outside_home_territory'
          | 'provisioning_cardholder_mismatch'
          | 'provisioning_device_and_cardholder_mismatch'
          | 'provisioning_device_mismatch'
          | 'same_device_no_prior_authentication'
          | 'same_device_successful_prior_authentication'
          | 'software_update'
          | 'suspicious_activity'
          | 'too_many_different_cardholders'
          | 'too_many_recent_attempts'
          | 'too_many_recent_tokens'
        >;

        /**
         * The recommendation on responding to the tokenization request.
         */
        suggested_decision?: 'approve' | 'decline' | 'require_auth';

        /**
         * The version of the standard for mapping reason codes followed by the wallet
         * provider.
         */
        suggested_decision_version?: string;
      }

      export namespace WalletProvider {
        export interface CardholderAddress {
          /**
           * The street address of the cardholder tokenizing the card.
           */
          line1: string;

          /**
           * The postal code of the cardholder tokenizing the card.
           */
          postal_code: string;
        }
      }
    }
  }

  export interface AmountDetails {
    /**
     * The fee charged by the ATM for the cash withdrawal.
     */
    atm_fee?: number | null;

    /**
     * The amount of cash requested by the cardholder.
     */
    cashback_amount?: number | null;
  }

  export interface NetworkData {
    /**
     * A code created by Stripe which is shared with the merchant to validate the
     * authorization. This field will be populated if the authorization message was
     * approved. The code typically starts with the letter "S", followed by a six-digit
     * number. For example, "S498162". Please note that the code is not guaranteed to
     * be unique across authorizations.
     */
    authorization_code?: string | null;

    /**
     * The date the transaction was processed by the card network. This can be
     * different from the date the seller recorded the transaction depending on when
     * the acquirer submits the transaction to the network.
     */
    processing_date?: string | null;

    /**
     * Unique identifier for the authorization assigned by the card network used to
     * match subsequent messages, disputes, and transactions.
     */
    transaction_id?: string | null;
  }

  export interface PurchaseDetails {
    fleet?: PurchaseDetails.Fleet | null;

    flight?: PurchaseDetails.Flight | null;

    fuel?: PurchaseDetails.Fuel | null;

    lodging?: PurchaseDetails.Lodging | null;

    /**
     * The line items in the purchase.
     */
    receipt?: Array<PurchaseDetails.Receipt> | null;

    /**
     * A merchant-specific order number.
     */
    reference?: string | null;
  }

  export namespace PurchaseDetails {
    export interface Fleet {
      cardholder_prompt_data?: Fleet.CardholderPromptData | null;

      /**
       * The type of purchase. One of `fuel_purchase`, `non_fuel_purchase`, or
       * `fuel_and_non_fuel_purchase`.
       */
      purchase_type?: string | null;

      reported_breakdown?: Fleet.ReportedBreakdown | null;

      /**
       * The type of fuel service. One of `non_fuel_transaction`, `full_service`, or
       * `self_service`.
       */
      service_type?: string | null;
    }

    export namespace Fleet {
      export interface CardholderPromptData {
        /**
         * Driver ID.
         */
        driver_id?: string | null;

        /**
         * Odometer reading.
         */
        odometer?: number | null;

        /**
         * An alphanumeric ID. This field is used when a vehicle ID, driver ID, or generic
         * ID is entered by the cardholder, but the merchant or card network did not
         * specify the prompt type.
         */
        unspecified_id?: string | null;

        /**
         * User ID.
         */
        user_id?: string | null;

        /**
         * Vehicle number.
         */
        vehicle_number?: string | null;
      }

      export interface ReportedBreakdown {
        fuel?: ReportedBreakdown.Fuel | null;

        non_fuel?: ReportedBreakdown.NonFuel | null;

        tax?: ReportedBreakdown.Tax | null;
      }

      export namespace ReportedBreakdown {
        export interface Fuel {
          /**
           * Gross fuel amount that should equal Fuel Volume multipled by Fuel Unit Cost,
           * inclusive of taxes.
           */
          gross_amount_decimal?: string | null;
        }

        export interface NonFuel {
          /**
           * Gross non-fuel amount that should equal the sum of the line items, inclusive of
           * taxes.
           */
          gross_amount_decimal?: string | null;
        }

        export interface Tax {
          /**
           * Amount of state or provincial Sales Tax included in the transaction amount. Null
           * if not reported by merchant or not subject to tax.
           */
          local_amount_decimal?: string | null;

          /**
           * Amount of national Sales Tax or VAT included in the transaction amount. Null if
           * not reported by merchant or not subject to tax.
           */
          national_amount_decimal?: string | null;
        }
      }
    }

    export interface Flight {
      /**
       * The time that the flight departed.
       */
      departure_at?: number | null;

      /**
       * The name of the passenger.
       */
      passenger_name?: string | null;

      /**
       * Whether the ticket is refundable.
       */
      refundable?: boolean | null;

      /**
       * The legs of the trip.
       */
      segments?: Array<Flight.Segment> | null;

      /**
       * The travel agency that issued the ticket.
       */
      travel_agency?: string | null;
    }

    export namespace Flight {
      export interface Segment {
        /**
         * The three-letter IATA airport code of the flight's destination.
         */
        arrival_airport_code?: string | null;

        /**
         * The airline carrier code.
         */
        carrier?: string | null;

        /**
         * The three-letter IATA airport code that the flight departed from.
         */
        departure_airport_code?: string | null;

        /**
         * The flight number.
         */
        flight_number?: string | null;

        /**
         * The flight's service class.
         */
        service_class?: string | null;

        /**
         * Whether a stopover is allowed on this flight.
         */
        stopover_allowed?: boolean | null;
      }
    }

    export interface Fuel {
      /**
       * The type of fuel that was purchased. One of `diesel`, `unleaded_plus`,
       * `unleaded_regular`, `unleaded_super`, or `other`.
       */
      type: string;

      /**
       * The units for `quantity_decimal`. One of `charging_minute`, `imperial_gallon`,
       * `kilogram`, `kilowatt_hour`, `liter`, `pound`, `us_gallon`, or `other`.
       */
      unit: string;

      /**
       * The cost in cents per each unit of fuel, represented as a decimal string with at
       * most 12 decimal places.
       */
      unit_cost_decimal: string;

      /**
       * [Conexxus Payment System Product Code](https://www.conexxus.org/conexxus-payment-system-product-codes)
       * identifying the primary fuel product purchased.
       */
      industry_product_code?: string | null;

      /**
       * The quantity of `unit`s of fuel that was dispensed, represented as a decimal
       * string with at most 12 decimal places.
       */
      quantity_decimal?: string | null;
    }

    export interface Lodging {
      /**
       * The time of checking into the lodging.
       */
      check_in_at?: number | null;

      /**
       * The number of nights stayed at the lodging.
       */
      nights?: number | null;
    }

    export interface Receipt {
      /**
       * The description of the item. The maximum length of this field is 26 characters.
       */
      description?: string | null;

      /**
       * The quantity of the item.
       */
      quantity?: number | null;

      /**
       * The total for this line item in cents.
       */
      total?: number | null;

      /**
       * The unit cost of the item in cents.
       */
      unit_cost?: number | null;
    }
  }

  export interface Treasury {
    /**
     * The Treasury
     * [ReceivedCredit](https://docs.stripe.com/api/treasury/received_credits)
     * representing this Issuing transaction if it is a refund
     */
    received_credit?: string | null;

    /**
     * The Treasury
     * [ReceivedDebit](https://docs.stripe.com/api/treasury/received_debits)
     * representing this Issuing transaction if it is a capture
     */
    received_debit?: string | null;
  }
}

export interface PaymentMethodDetails {
  /**
   * The type of transaction-specific details of the payment method used in the
   * payment. See
   * [PaymentMethod.type](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type)
   * for the full list of possible types. An additional hash is included on
   * `payment_method_details` with a name matching this value. It contains
   * information specific to the payment method.
   */
  type: string;

  ach_credit_transfer?: PaymentMethodDetails.ACHCreditTransfer;

  ach_debit?: PaymentMethodDetails.ACHDebit;

  acss_debit?: PaymentMethodDetails.AcssDebit;

  affirm?: PaymentMethodDetails.Affirm;

  afterpay_clearpay?: PaymentMethodDetails.AfterpayClearpay;

  alipay?: PaymentMethodDetails.Alipay;

  alma?: PaymentMethodDetails.Alma;

  amazon_pay?: PaymentMethodDetails.AmazonPay;

  au_becs_debit?: PaymentMethodDetails.AuBecsDebit;

  bacs_debit?: PaymentMethodDetails.BacsDebit;

  bancontact?: PaymentMethodDetailsBancontactDispute;

  billie?: PaymentMethodDetails.Billie;

  blik?: PaymentMethodDetails.Blik;

  boleto?: PaymentMethodDetails.Boleto;

  card?: PaymentMethodDetails.Card;

  card_present?: Shared.PaymentMethodDetailsCardPresent;

  cashapp?: PaymentMethodDetails.Cashapp;

  crypto?: PaymentMethodDetails.Crypto;

  customer_balance?: PaymentMethodDetails.CustomerBalance;

  eps?: PaymentMethodDetails.Eps;

  fpx?: PaymentMethodDetails.Fpx;

  giropay?: PaymentMethodDetails.Giropay;

  grabpay?: PaymentMethodDetails.Grabpay;

  ideal?: PaymentMethodDetailsIdealDispute;

  interac_present?: PaymentMethodDetails.InteracPresent;

  kakao_pay?: PaymentMethodDetails.KakaoPay;

  klarna?: PaymentMethodDetails.Klarna;

  konbini?: PaymentMethodDetails.Konbini;

  kr_card?: PaymentMethodDetails.KrCard;

  link?: PaymentMethodDetails.Link;

  mb_way?: PaymentMethodDetails.MBWay;

  mobilepay?: PaymentMethodDetails.Mobilepay;

  multibanco?: PaymentMethodDetails.Multibanco;

  naver_pay?: PaymentMethodDetails.NaverPay;

  nz_bank_account?: PaymentMethodDetails.NzBankAccount;

  oxxo?: PaymentMethodDetails.Oxxo;

  p24?: PaymentMethodDetails.P24;

  pay_by_bank?: PaymentMethodDetails.PayByBank;

  payco?: PaymentMethodDetails.Payco;

  paynow?: PaymentMethodDetails.Paynow;

  paypal?: PaymentMethodDetails.Paypal;

  payto?: PaymentMethodDetails.Payto;

  pix?: PaymentMethodDetails.Pix;

  promptpay?: PaymentMethodDetails.Promptpay;

  revolut_pay?: PaymentMethodDetails.RevolutPay;

  samsung_pay?: PaymentMethodDetails.SamsungPay;

  satispay?: PaymentMethodDetails.Satispay;

  sepa_debit?: PaymentMethodDetails.SepaDebit;

  sofort?: PaymentMethodDetailsSofortDispute;

  stripe_account?: PaymentMethodDetails.StripeAccount;

  swish?: PaymentMethodDetails.Swish;

  twint?: PaymentMethodDetails.Twint;

  us_bank_account?: PaymentMethodDetailsUsBankAccount;

  wechat?: PaymentMethodDetails.Wechat;

  wechat_pay?: PaymentMethodDetails.WechatPay;

  zip?: PaymentMethodDetails.Zip;
}

export namespace PaymentMethodDetails {
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

  export interface Card {
    /**
     * Two-digit number representing the card's expiration month.
     */
    exp_month: number;

    /**
     * Four-digit number representing the card's expiration year.
     */
    exp_year: number;

    /**
     * The authorized amount.
     */
    amount_authorized?: number | null;

    /**
     * Authorization code on the charge.
     */
    authorization_code?: string | null;

    /**
     * Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`,
     * `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.
     */
    brand?: string | null;

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

    extended_authorization?: Card.ExtendedAuthorization;

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

    incremental_authorization?: Card.IncrementalAuthorization;

    installments?: Card.Installments | null;

    /**
     * The last four digits of the card.
     */
    last4?: string | null;

    /**
     * ID of the mandate used to make this payment or created by it.
     */
    mandate?: string | null;

    multicapture?: Card.Multicapture;

    /**
     * Identifies which network this charge was processed on. Can be `amex`,
     * `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `interac`, `jcb`, `link`,
     * `mastercard`, `unionpay`, `visa`, or `unknown`.
     */
    network?: string | null;

    network_token?: Card.NetworkToken | null;

    /**
     * This is used by the financial networks to identify a transaction. Visa calls
     * this the Transaction ID, Mastercard calls this the Trace ID, and American
     * Express calls this the Acquirer Reference Data. This value will be present if it
     * is returned by the financial network in the authorization response, and null
     * otherwise.
     */
    network_transaction_id?: string | null;

    overcapture?: Card.Overcapture;

    /**
     * Status of a card based on the card issuer.
     */
    regulated_status?: 'regulated' | 'unregulated' | null;

    three_d_secure?: Card.ThreeDSecure | null;

    wallet?: Card.Wallet | null;
  }

  export namespace Card {
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

    export interface ExtendedAuthorization {
      /**
       * Indicates whether or not the capture window is extended beyond the standard
       * authorization.
       */
      status: 'disabled' | 'enabled';
    }

    export interface IncrementalAuthorization {
      /**
       * Indicates whether or not the incremental authorization feature is supported.
       */
      status: 'available' | 'unavailable';
    }

    export interface Installments {
      plan?: Shared.PaymentMethodDetailsCardInstallmentsPlan | null;
    }

    export interface Multicapture {
      /**
       * Indicates whether or not multiple captures are supported.
       */
      status: 'available' | 'unavailable';
    }

    export interface NetworkToken {
      /**
       * Indicates if Stripe used a network token, either user provided or Stripe managed
       * when processing the transaction.
       */
      used: boolean;
    }

    export interface Overcapture {
      /**
       * The maximum amount that can be captured.
       */
      maximum_amount_capturable: number;

      /**
       * Indicates whether or not the authorized amount can be over-captured.
       */
      status: 'available' | 'unavailable';
    }

    export interface ThreeDSecure {
      /**
       * For authenticated transactions: how the customer was authenticated by the
       * issuing bank.
       */
      authentication_flow?: 'challenge' | 'frictionless' | null;

      /**
       * The Electronic Commerce Indicator (ECI). A protocol-level field indicating what
       * degree of authentication was performed.
       */
      electronic_commerce_indicator?: '01' | '02' | '05' | '06' | '07' | null;

      /**
       * The exemption requested via 3DS and accepted by the issuer at authentication
       * time.
       */
      exemption_indicator?: 'low_risk' | 'none' | null;

      /**
       * Whether Stripe requested the value of `exemption_indicator` in the transaction.
       * This will depend on the outcome of Stripe's internal risk assessment.
       */
      exemption_indicator_applied?: boolean;

      /**
       * Indicates the outcome of 3D Secure authentication.
       */
      result?:
        | 'attempt_acknowledged'
        | 'authenticated'
        | 'exempted'
        | 'failed'
        | 'not_supported'
        | 'processing_error'
        | null;

      /**
       * Additional information about why 3D Secure succeeded or failed based on the
       * `result`.
       */
      result_reason?:
        | 'abandoned'
        | 'bypassed'
        | 'canceled'
        | 'card_not_enrolled'
        | 'network_not_supported'
        | 'protocol_error'
        | 'rejected'
        | null;

      /**
       * The 3D Secure 1 XID or 3D Secure 2 Directory Server Transaction ID (dsTransId)
       * for this payment.
       */
      transaction_id?: string | null;

      /**
       * The version of 3D Secure that was used.
       */
      version?: '1.0.2' | '2.1.0' | '2.2.0' | '2.3.0' | '2.3.1' | null;
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

export interface PaymentMethodDetailsBancontactDispute {
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
   * The ID of the SEPA Direct Debit PaymentMethod which was generated by this
   * Charge.
   */
  generated_sepa_debit?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * The mandate for the SEPA Direct Debit PaymentMethod which was generated by this
   * Charge.
   */
  generated_sepa_debit_mandate?: string | SubscriptionsAPI.Mandate | null;

  /**
   * Last four characters of the IBAN.
   */
  iban_last4?: string | null;

  /**
   * Preferred language of the Bancontact authorization page that the customer is
   * redirected to. Can be one of `en`, `de`, `fr`, or `nl`
   */
  preferred_language?: 'de' | 'en' | 'fr' | 'nl' | null;

  /**
   * Owner's verified full name. Values are verified or provided by Bancontact
   * directly (if supported) at the time of authorization or settlement. They cannot
   * be set or mutated.
   */
  verified_name?: string | null;
}

export interface PaymentMethodDetailsIdealDispute {
  /**
   * The customer's bank. Can be one of `abn_amro`, `adyen`, `asn_bank`, `bunq`,
   * `buut`, `finom`, `handelsbanken`, `ing`, `knab`, `mollie`, `moneyou`, `n26`,
   * `nn`, `rabobank`, `regiobank`, `revolut`, `sns_bank`, `triodos_bank`,
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
   * The Bank Identifier Code of the customer's bank.
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

  /**
   * The ID of the SEPA Direct Debit PaymentMethod which was generated by this
   * Charge.
   */
  generated_sepa_debit?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * The mandate for the SEPA Direct Debit PaymentMethod which was generated by this
   * Charge.
   */
  generated_sepa_debit_mandate?: string | SubscriptionsAPI.Mandate | null;

  /**
   * Last four characters of the IBAN.
   */
  iban_last4?: string | null;

  /**
   * Unique transaction ID generated by iDEAL.
   */
  transaction_id?: string | null;

  /**
   * Owner's verified full name. Values are verified or provided by iDEAL directly
   * (if supported) at the time of authorization or settlement. They cannot be set or
   * mutated.
   */
  verified_name?: string | null;
}

export interface PaymentMethodDetailsSofortDispute {
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
   * Two-letter ISO code representing the country the bank account is located in.
   */
  country?: string | null;

  /**
   * The ID of the SEPA Direct Debit PaymentMethod which was generated by this
   * Charge.
   */
  generated_sepa_debit?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * The mandate for the SEPA Direct Debit PaymentMethod which was generated by this
   * Charge.
   */
  generated_sepa_debit_mandate?: string | SubscriptionsAPI.Mandate | null;

  /**
   * Last four characters of the IBAN.
   */
  iban_last4?: string | null;

  /**
   * Preferred language of the SOFORT authorization page that the customer is
   * redirected to. Can be one of `de`, `en`, `es`, `fr`, `it`, `nl`, or `pl`
   */
  preferred_language?: 'de' | 'en' | 'es' | 'fr' | 'it' | 'nl' | 'pl' | null;

  /**
   * Owner's verified full name. Values are verified or provided by SOFORT directly
   * (if supported) at the time of authorization or settlement. They cannot be set or
   * mutated.
   */
  verified_name?: string | null;
}

export interface PaymentMethodDetailsUsBankAccount {
  /**
   * Account holder type: individual or company.
   */
  account_holder_type?: 'company' | 'individual' | null;

  /**
   * Account type: checkings or savings. Defaults to checking if omitted.
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
  mandate?: string | SubscriptionsAPI.Mandate;

  /**
   * Reference number to locate ACH payments with customer's bank.
   */
  payment_reference?: string | null;

  /**
   * Routing number of the bank account.
   */
  routing_number?: string | null;
}

/**
 * A `Payout` object is created when you receive funds from Stripe, or when you
 * initiate a payout to either a bank account or debit card of a
 * [connected Stripe account](/docs/connect/bank-debit-card-payouts). You can
 * retrieve individual payouts, and list all payouts. Payouts are made on
 * [varying schedules](/docs/connect/manage-payout-schedule), depending on your
 * country and industry.
 *
 * Related guide: [Receiving payouts](https://docs.stripe.com/payouts)
 */
export interface Payout {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The amount (in cents (or local equivalent)) that transfers to your bank account
   * or debit card.
   */
  amount: number;

  /**
   * Date that you can expect the payout to arrive in the bank. This factors in
   * delays to account for weekends or bank holidays.
   */
  arrival_date: number;

  /**
   * Returns `true` if the payout is created by an
   * [automated payout schedule](https://docs.stripe.com/payouts#payout-schedule) and
   * `false` if it's
   * [requested manually](https://stripe.com/docs/payouts#manual-payouts).
   */
  automatic: boolean;

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
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * The method used to send this payout, which can be `standard` or `instant`.
   * `instant` is supported for payouts to debit cards and bank accounts in certain
   * countries. Learn more about
   * [bank support for Instant Payouts](https://stripe.com/docs/payouts/instant-payouts-banks).
   */
  method: string;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'payout';

  /**
   * If `completed`, you can use the
   * [Balance Transactions API](https://docs.stripe.com/api/balance_transactions/list#balance_transaction_list-payout)
   * to list all balance transactions that are paid out in this payout.
   */
  reconciliation_status: 'completed' | 'in_progress' | 'not_applicable';

  /**
   * The source balance this payout came from, which can be one of the following:
   * `card`, `fpx`, or `bank_account`.
   */
  source_type: string;

  /**
   * Current status of the payout: `paid`, `pending`, `in_transit`, `canceled` or
   * `failed`. A payout is `pending` until it's submitted to the bank, when it
   * becomes `in_transit`. The status changes to `paid` if the transaction succeeds,
   * or to `failed` or `canceled` (within 5 business days). Some payouts that fail
   * might initially show as `paid`, then change to `failed`.
   */
  status: string;

  /**
   * Can be `bank_account` or `card`.
   */
  type: 'bank_account' | 'card';

  /**
   * The application fee (if any) for the payout.
   * [See the Connect documentation](https://docs.stripe.com/connect/instant-payouts#monetization-and-fees)
   * for details.
   */
  application_fee?: string | ApplicationFee | null;

  /**
   * The amount of the application fee (if any) requested for the payout.
   * [See the Connect documentation](https://docs.stripe.com/connect/instant-payouts#monetization-and-fees)
   * for details.
   */
  application_fee_amount?: number | null;

  /**
   * ID of the balance transaction that describes the impact of this payout on your
   * account balance.
   */
  balance_transaction?: string | BalanceTransaction | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * ID of the bank account or card the payout is sent to.
   */
  destination?:
    | string
    | CustomersAPI.BankAccount
    | CustomersAPI.Card
    | Payout.DeletedBankAccount
    | Payout.DeletedCard
    | null;

  /**
   * If the payout fails or cancels, this is the ID of the balance transaction that
   * reverses the initial balance transaction and returns the funds from the failed
   * payout back in your balance.
   */
  failure_balance_transaction?: string | BalanceTransaction | null;

  /**
   * Error code that provides a reason for a payout failure, if available. View our
   * [list of failure codes](https://docs.stripe.com/api#payout_failures).
   */
  failure_code?: string | null;

  /**
   * Message that provides the reason for a payout failure, if available.
   */
  failure_message?: string | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * If the payout reverses another, this is the ID of the original payout.
   */
  original_payout?: string | Payout | null;

  /**
   * ID of the v2 FinancialAccount the funds are sent to.
   */
  payout_method?: string | null;

  /**
   * If the payout reverses, this is the ID of the payout that reverses this payout.
   */
  reversed_by?: string | Payout | null;

  /**
   * Extra information about a payout that displays on the user's bank statement.
   */
  statement_descriptor?: string | null;

  trace_id?: Payout.TraceID | null;
}

export namespace Payout {
  export interface DeletedBankAccount {
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
    object: 'bank_account';

    /**
     * Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid
     * out to the bank account.
     */
    currency?: string | null;
  }

  export interface DeletedCard {
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
    object: 'card';

    /**
     * Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid
     * out to the bank account.
     */
    currency?: string | null;
  }

  export interface TraceID {
    /**
     * Possible values are `pending`, `supported`, and `unsupported`. When
     * `payout.status` is `pending` or `in_transit`, this will be `pending`. When the
     * payout transitions to `paid`, `failed`, or `canceled`, this status will become
     * `supported` or `unsupported` shortly after in most cases. In some cases, this
     * may appear as `pending` for up to 10 days after `arrival_date` until
     * transitioning to `supported` or `unsupported`.
     */
    status: string;

    /**
     * The trace ID value if `trace_id.status` is `supported`, otherwise `nil`.
     */
    value?: string | null;
  }
}

/**
 * To top up your Stripe balance, you create a top-up object. You can retrieve
 * individual top-ups, as well as list all top-ups. Top-ups are identified by a
 * unique, random ID.
 *
 * Related guide:
 * [Topping up your platform account](https://docs.stripe.com/connect/top-ups)
 */
export interface Topup {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Amount transferred.
   */
  amount: number;

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
  object: 'topup';

  /**
   * The status of the top-up is either `canceled`, `failed`, `pending`, `reversed`,
   * or `succeeded`.
   */
  status: 'canceled' | 'failed' | 'pending' | 'reversed' | 'succeeded';

  /**
   * ID of the balance transaction that describes the impact of this top-up on your
   * account balance. May not be specified depending on status of top-up.
   */
  balance_transaction?: string | BalanceTransaction | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * Date the funds are expected to arrive in your Stripe account for payouts. This
   * factors in delays like weekends or bank holidays. May not be specified depending
   * on status of top-up.
   */
  expected_availability_date?: number | null;

  /**
   * Error code explaining reason for top-up failure if available (see
   * [the errors section](https://docs.stripe.com/api#errors) for a list of codes).
   */
  failure_code?: string | null;

  /**
   * Message to user further explaining reason for top-up failure if available.
   */
  failure_message?: string | null;

  /**
   * `Source` objects allow you to accept a variety of payment methods. They
   * represent a customer's payment instrument, and can be used with the Stripe API
   * just like a `Card` object: once chargeable, they can be charged, or can be
   * attached to customers.
   *
   * Stripe doesn't recommend using the deprecated
   * [Sources API](https://docs.stripe.com/api/sources). We recommend that you adopt
   * the [PaymentMethods API](https://docs.stripe.com/api/payment_methods). This
   * newer API provides access to our latest features and payment method types.
   *
   * Related guides: [Sources API](https://docs.stripe.com/sources) and
   * [Sources & Customers](https://docs.stripe.com/sources/customers).
   */
  source?: Shared.Source | null;

  /**
   * Extra information about a top-up. This will appear on your source's bank
   * statement. It must contain at least one letter.
   */
  statement_descriptor?: string | null;

  /**
   * A string that identifies this top-up as part of a group.
   */
  transfer_group?: string | null;
}

/**
 * A `Transfer` object is created when you move funds between Stripe accounts as
 * part of Connect.
 *
 * Before April 6, 2017, transfers also represented movement of funds from a Stripe
 * account to a card or bank account. This behavior has since been split out into a
 * [Payout](https://api.stripe.com#payout_object) object, with corresponding payout
 * endpoints. For more information, read about the
 * [transfer/payout split](https://docs.stripe.com/transfer-payout-split).
 *
 * Related guide:
 * [Creating separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers)
 */
export interface Transfer {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Amount in cents (or local equivalent) to be transferred.
   */
  amount: number;

  /**
   * Amount in cents (or local equivalent) reversed (can be less than the amount
   * attribute on the transfer if a partial reversal was issued).
   */
  amount_reversed: number;

  /**
   * Time that this record of the transfer was first created.
   */
  created: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

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
  object: 'transfer';

  /**
   * A list of reversals that have been applied to the transfer.
   */
  reversals: Transfer.Reversals;

  /**
   * Whether the transfer has been fully reversed. If the transfer is only partially
   * reversed, this attribute will still be false.
   */
  reversed: boolean;

  /**
   * Balance transaction that describes the impact of this transfer on your account
   * balance.
   */
  balance_transaction?: string | BalanceTransaction | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * ID of the Stripe account the transfer was sent to.
   */
  destination?: string | AccountsAPI.Account | null;

  /**
   * If the destination is a Stripe account, this will be the ID of the payment that
   * the destination account received for the transfer.
   */
  destination_payment?: string | Charge;

  /**
   * ID of the charge that was used to fund the transfer. If null, the transfer was
   * funded from the available balance.
   */
  source_transaction?: string | Charge | null;

  /**
   * The source balance this transfer came from. One of `card`, `fpx`, or
   * `bank_account`.
   */
  source_type?: string;

  /**
   * A string that identifies this transaction as part of a group. See the
   * [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options)
   * for details.
   */
  transfer_group?: string | null;
}

export namespace Transfer {
  /**
   * A list of reversals that have been applied to the transfer.
   */
  export interface Reversals {
    /**
     * Details about each object.
     */
    data: Array<RefundsAPI.TransferReversal>;

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
}

export interface DisputeUpdateParams {
  /**
   * Evidence to upload, to respond to a dispute. Updating any field in the hash will
   * submit all fields in the hash for review. The combined character count of all
   * fields is limited to 150,000.
   */
  evidence?: DisputeUpdateParams.Evidence;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`.
   */
  metadata?: { [key: string]: string } | '';

  /**
   * Whether to immediately submit evidence to the bank. If `false`, evidence is
   * staged on the dispute. Staged evidence is visible in the API and Dashboard, and
   * can be submitted to the bank by making another request with this attribute set
   * to `true` (the default).
   */
  submit?: boolean;
}

export namespace DisputeUpdateParams {
  /**
   * Evidence to upload, to respond to a dispute. Updating any field in the hash will
   * submit all fields in the hash for review. The combined character count of all
   * fields is limited to 150,000.
   */
  export interface Evidence {
    access_activity_log?: string;

    billing_address?: string;

    cancellation_policy?: string;

    cancellation_policy_disclosure?: string;

    cancellation_rebuttal?: string;

    customer_communication?: string;

    customer_email_address?: string;

    customer_name?: string;

    customer_purchase_ip?: string;

    customer_signature?: string;

    duplicate_charge_documentation?: string;

    duplicate_charge_explanation?: string;

    duplicate_charge_id?: string;

    enhanced_evidence?: Evidence.EnhancedEvidence | '';

    product_description?: string;

    receipt?: string;

    refund_policy?: string;

    refund_policy_disclosure?: string;

    refund_refusal_explanation?: string;

    service_date?: string;

    service_documentation?: string;

    shipping_address?: string;

    shipping_carrier?: string;

    shipping_date?: string;

    shipping_documentation?: string;

    shipping_tracking_number?: string;

    uncategorized_file?: string;

    uncategorized_text?: string;
  }

  export namespace Evidence {
    export interface EnhancedEvidence {
      visa_compelling_evidence_3?: EnhancedEvidence.VisaCompellingEvidence3;

      visa_compliance?: EnhancedEvidence.VisaCompliance;
    }

    export namespace EnhancedEvidence {
      export interface VisaCompellingEvidence3 {
        disputed_transaction?: VisaCompellingEvidence3.DisputedTransaction;

        prior_undisputed_transactions?: Array<VisaCompellingEvidence3.PriorUndisputedTransaction>;
      }

      export namespace VisaCompellingEvidence3 {
        export interface DisputedTransaction {
          customer_account_id?: (string & {}) | '';

          customer_device_fingerprint?: (string & {}) | '';

          customer_device_id?: (string & {}) | '';

          customer_email_address?: (string & {}) | '';

          customer_purchase_ip?: (string & {}) | '';

          merchandise_or_services?: 'merchandise' | 'services';

          product_description?: (string & {}) | '';

          shipping_address?: DisputedTransaction.ShippingAddress;
        }

        export namespace DisputedTransaction {
          export interface ShippingAddress {
            city?: (string & {}) | '';

            country?: (string & {}) | '';

            line1?: (string & {}) | '';

            line2?: (string & {}) | '';

            postal_code?: (string & {}) | '';

            state?: (string & {}) | '';
          }
        }

        export interface PriorUndisputedTransaction {
          charge: string;

          customer_account_id?: (string & {}) | '';

          customer_device_fingerprint?: (string & {}) | '';

          customer_device_id?: (string & {}) | '';

          customer_email_address?: (string & {}) | '';

          customer_purchase_ip?: (string & {}) | '';

          product_description?: (string & {}) | '';

          shipping_address?: PriorUndisputedTransaction.ShippingAddress;
        }

        export namespace PriorUndisputedTransaction {
          export interface ShippingAddress {
            city?: (string & {}) | '';

            country?: (string & {}) | '';

            line1?: (string & {}) | '';

            line2?: (string & {}) | '';

            postal_code?: (string & {}) | '';

            state?: (string & {}) | '';
          }
        }
      }

      export interface VisaCompliance {
        fee_acknowledged?: boolean;
      }
    }
  }
}

export interface DisputeListParams extends MyCursorIDPageParams {
  /**
   * Only return disputes associated to the charge specified by this charge ID.
   */
  charge?: string;

  /**
   * Only return disputes that were created during the given date interval.
   */
  created?: DisputeListParams.RangeQuerySpecs | number;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * Only return disputes associated to the PaymentIntent specified by this
   * PaymentIntent ID.
   */
  payment_intent?: string;
}

export namespace DisputeListParams {
  export interface RangeQuerySpecs {
    gt?: number;

    gte?: number;

    lt?: number;

    lte?: number;
  }
}

export declare namespace Disputes {
  export {
    type ApplicationFee as ApplicationFee,
    type BalanceTransaction as BalanceTransaction,
    type Charge as Charge,
    type ChargeTransferData as ChargeTransferData,
    type ConnectCollectionTransfer as ConnectCollectionTransfer,
    type CustomerBalanceResourceCashBalanceTransactionAdjustedForOverdraft as CustomerBalanceResourceCashBalanceTransactionAdjustedForOverdraft,
    type CustomerBalanceResourceCashBalanceTransactionAppliedToPayment as CustomerBalanceResourceCashBalanceTransactionAppliedToPayment,
    type CustomerBalanceResourceCashBalanceTransactionRefundedFromPayment as CustomerBalanceResourceCashBalanceTransactionRefundedFromPayment,
    type CustomerBalanceResourceCashBalanceTransactionTransferredToBalance as CustomerBalanceResourceCashBalanceTransactionTransferredToBalance,
    type CustomerBalanceResourceCashBalanceTransactionUnappliedFromPayment as CustomerBalanceResourceCashBalanceTransactionUnappliedFromPayment,
    type CustomerCashBalanceTransaction as CustomerCashBalanceTransaction,
    type Dispute as Dispute,
    type FeeRefund as FeeRefund,
    type File as File,
    type FileLink as FileLink,
    type IssuingAuthorization as IssuingAuthorization,
    type IssuingAuthorizationAmountDetails as IssuingAuthorizationAmountDetails,
    type IssuingCard as IssuingCard,
    type IssuingCardholder as IssuingCardholder,
    type IssuingCardholderAddress as IssuingCardholderAddress,
    type IssuingCardholderAuthorizationControls as IssuingCardholderAuthorizationControls,
    type IssuingCardholderCardIssuing as IssuingCardholderCardIssuing,
    type IssuingCardholderCompany as IssuingCardholderCompany,
    type IssuingCardholderIDDocument as IssuingCardholderIDDocument,
    type IssuingCardholderIndividual as IssuingCardholderIndividual,
    type IssuingCardholderIndividualDob as IssuingCardholderIndividualDob,
    type IssuingCardholderRequirements as IssuingCardholderRequirements,
    type IssuingCardholderSpendingLimit as IssuingCardholderSpendingLimit,
    type IssuingCardholderUserTermsAcceptance as IssuingCardholderUserTermsAcceptance,
    type IssuingCardholderVerification as IssuingCardholderVerification,
    type IssuingDispute as IssuingDispute,
    type IssuingTransaction as IssuingTransaction,
    type PaymentMethodDetails as PaymentMethodDetails,
    type PaymentMethodDetailsBancontactDispute as PaymentMethodDetailsBancontactDispute,
    type PaymentMethodDetailsIdealDispute as PaymentMethodDetailsIdealDispute,
    type PaymentMethodDetailsSofortDispute as PaymentMethodDetailsSofortDispute,
    type PaymentMethodDetailsUsBankAccount as PaymentMethodDetailsUsBankAccount,
    type Payout as Payout,
    type Topup as Topup,
    type Transfer as Transfer,
    type DisputesMyCursorIDPage as DisputesMyCursorIDPage,
    type DisputeUpdateParams as DisputeUpdateParams,
    type DisputeListParams as DisputeListParams,
  };
}
