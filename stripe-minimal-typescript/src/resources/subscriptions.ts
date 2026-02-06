// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SubscriptionsAPI from './subscriptions';
import * as AccountsAPI from './accounts';
import * as CouponsAPI from './coupons';
import * as CustomersAPI from './customers';
import * as InvoicesAPI from './invoices';
import * as PricesAPI from './prices';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { MyCursorIDPage, type MyCursorIDPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Subscriptions extends APIResource {
  /**
   * <p>Updates an existing subscription to match the specified parameters.
   * When changing prices or quantities, we optionally prorate the price we charge next month to make up for any price changes.
   * To preview how the proration is calculated, use the <a href="/docs/api/invoices/create_preview">create preview</a> endpoint.</p>
   *
   * <p>By default, we prorate subscription changes. For example, if a customer signs up on May 1 for a <currency>100</currency> price, they’ll be billed <currency>100</currency> immediately. If on May 15 they switch to a <currency>200</currency> price, then on June 1 they’ll be billed <currency>250</currency> (<currency>200</currency> for a renewal of her subscription, plus a <currency>50</currency> prorating adjustment for half of the previous month’s <currency>100</currency> difference). Similarly, a downgrade generates a credit that is applied to the next invoice. We also prorate when you make quantity changes.</p>
   *
   * <p>Switching prices does not normally change the billing date or generate an immediate charge unless:</p>
   *
   * <ul>
   * <li>The billing interval is changed (for example, from monthly to yearly).</li>
   * <li>The subscription moves from free to paid.</li>
   * <li>A trial starts or ends.</li>
   * </ul>
   *
   * <p>In these cases, we apply a credit for the unused time on the previous price, immediately charge the customer using the new price, and reset the billing date. Learn about how <a href="/docs/billing/subscriptions/upgrade-downgrade#immediate-payment">Stripe immediately attempts payment for subscription changes</a>.</p>
   *
   * <p>If you want to charge for an upgrade immediately, pass <code>proration_behavior</code> as <code>always_invoice</code> to create prorations, automatically invoice the customer for those proration adjustments, and attempt to collect payment. If you pass <code>create_prorations</code>, the prorations are created but not automatically invoiced. If you want to bill the customer for the prorations before the subscription’s renewal date, you need to manually <a href="/docs/api/invoices/create">invoice the customer</a>.</p>
   *
   * <p>If you don’t want to prorate, set the <code>proration_behavior</code> option to <code>none</code>. With this option, the customer is billed <currency>100</currency> on May 1 and <currency>200</currency> on June 1. Similarly, if you set <code>proration_behavior</code> to <code>none</code> when switching between different billing intervals (for example, from monthly to yearly), we don’t generate any credits for the old subscription’s unused time. We still reset the billing date and bill immediately for the new subscription.</p>
   *
   * <p>Updating the quantity on a subscription many times in an hour may result in <a href="/docs/rate-limits">rate limiting</a>. If you need to bill for a frequently changing quantity, consider integrating <a href="/docs/billing/subscriptions/usage-based">usage-based billing</a> instead.</p>
   */
  update(
    subscriptionExposedID: string,
    body: SubscriptionUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Subscription> {
    return this._client.post(path`/v1/subscriptions/${subscriptionExposedID}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * <p>By default, returns a list of subscriptions that have not been canceled. In order to list canceled subscriptions, specify <code>status=canceled</code>.</p>
   */
  list(
    query: SubscriptionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SubscriptionsMyCursorIDPage, Subscription> {
    return this._client.getAPIList('/v1/subscriptions', MyCursorIDPage<Subscription>, { query, ...options });
  }

  /**
   * <p>Cancels a customer’s subscription immediately. The customer won’t be charged again for the subscription. After it’s canceled, you can no longer update the subscription or its <a href="/metadata">metadata</a>.</p>
   *
   * <p>Any pending invoice items that you’ve created are still charged at the end of the period, unless manually <a href="#delete_invoiceitem">deleted</a>. If you’ve set the subscription to cancel at the end of the period, any pending prorations are also left in place and collected at the end of the period. But if the subscription is set to cancel immediately, pending prorations are removed if <code>invoice_now</code> and <code>prorate</code> are both set to true.</p>
   *
   * <p>By default, upon subscription cancellation, Stripe stops automatic collection of all finalized invoices for the customer. This is intended to prevent unexpected payment attempts after the customer has canceled a subscription. However, you can resume automatic collection of the invoices manually after subscription cancellation to have us proceed. Or, you could check for unpaid invoices before allowing the customer to cancel the subscription at all.</p>
   */
  cancel(
    subscriptionExposedID: string,
    body: SubscriptionCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Subscription> {
    return this._client.delete(path`/v1/subscriptions/${subscriptionExposedID}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }
}

export type SubscriptionsMyCursorIDPage = MyCursorIDPage<Subscription>;

export interface AutomaticTaxSubscription {
  /**
   * Whether Stripe automatically computes tax on this subscription.
   */
  enabled: boolean;

  /**
   * If Stripe disabled automatic tax, this enum describes why.
   */
  disabled_reason?: 'requires_location_inputs' | null;

  liability?: InvoicesAPI.ConnectAccountReference | null;
}

export interface DefaultSettings {
  /**
   * Possible values are `phase_start` or `automatic`. If `phase_start` then billing
   * cycle anchor of the subscription is set to the start of the phase when entering
   * the phase. If `automatic` then the billing cycle anchor is automatically
   * modified as needed when entering the phase. For more information, see the
   * billing cycle
   * [documentation](https://docs.stripe.com/billing/subscriptions/billing-cycle).
   */
  billing_cycle_anchor: 'automatic' | 'phase_start';

  invoice_settings: ScheduleSetting;

  /**
   * A non-negative decimal between 0 and 100, with at most two decimal places. This
   * represents the percentage of the subscription invoice total that will be
   * transferred to the application owner's Stripe account during this phase of the
   * schedule.
   */
  application_fee_percent?: number | null;

  automatic_tax?: DefaultSettingsAutomaticTax;

  billing_thresholds?: SubscriptionBillingThresholds | null;

  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically,
   * Stripe will attempt to pay the underlying subscription at the end of each
   * billing cycle using the default source attached to the customer. When sending an
   * invoice, Stripe will email your customer an invoice with payment instructions
   * and mark the subscription as `active`.
   */
  collection_method?: 'charge_automatically' | 'send_invoice' | null;

  /**
   * ID of the default payment method for the subscription schedule. If not set,
   * invoices will use the default payment method in the customer's invoice settings.
   */
  default_payment_method?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * Subscription description, meant to be displayable to the customer. Use this
   * field to optionally store an explanation of the subscription for rendering in
   * Stripe surfaces and certain local payment methods UIs.
   */
  description?: string | null;

  /**
   * The account (if any) the charge was made on behalf of for charges associated
   * with the schedule's subscription. See the Connect documentation for details.
   */
  on_behalf_of?: string | AccountsAPI.Account | null;

  transfer_data?: SubscriptionTransferData | null;
}

export interface DefaultSettingsAutomaticTax {
  /**
   * Whether Stripe automatically computes tax on invoices created during this phase.
   */
  enabled: boolean;

  /**
   * If Stripe disabled automatic tax, this enum describes why.
   */
  disabled_reason?: 'requires_location_inputs' | null;

  liability?: InvoicesAPI.ConnectAccountReference | null;
}

/**
 * A Mandate is a record of the permission that your customer gives you to debit
 * their payment method.
 */
export interface Mandate {
  /**
   * Unique identifier for the object.
   */
  id: string;

  customer_acceptance: Mandate.CustomerAcceptance;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'mandate';

  /**
   * ID of the payment method associated with this mandate.
   */
  payment_method: string | InvoicesAPI.PaymentMethod;

  payment_method_details: Mandate.PaymentMethodDetails;

  /**
   * The mandate status indicates whether or not you can use it to initiate a
   * payment.
   */
  status: 'active' | 'inactive' | 'pending';

  /**
   * The type of the mandate.
   */
  type: 'multi_use' | 'single_use';

  multi_use?: Mandate.MultiUse;

  /**
   * The account (if any) that the mandate is intended for.
   */
  on_behalf_of?: string;

  single_use?: Mandate.SingleUse;
}

export namespace Mandate {
  export interface CustomerAcceptance {
    /**
     * The mandate includes the type of customer acceptance information, such as:
     * `online` or `offline`.
     */
    type: 'offline' | 'online';

    /**
     * The time that the customer accepts the mandate.
     */
    accepted_at?: number | null;

    offline?: CustomerAcceptance.Offline;

    online?: CustomerAcceptance.Online;
  }

  export namespace CustomerAcceptance {
    export interface Offline {}

    export interface Online {
      /**
       * The customer accepts the mandate from this IP address.
       */
      ip_address?: string | null;

      /**
       * The customer accepts the mandate using the user agent of the browser.
       */
      user_agent?: string | null;
    }
  }

  export interface PaymentMethodDetails {
    /**
     * This mandate corresponds with a specific payment method type. The
     * `payment_method_details` includes an additional hash with the same name and
     * contains mandate information that's specific to that payment method.
     */
    type: string;

    acss_debit?: PaymentMethodDetails.AcssDebit;

    amazon_pay?: PaymentMethodDetails.AmazonPay;

    au_becs_debit?: PaymentMethodDetails.AuBecsDebit;

    bacs_debit?: PaymentMethodDetails.BacsDebit;

    card?: PaymentMethodDetails.Card;

    cashapp?: PaymentMethodDetails.Cashapp;

    kakao_pay?: PaymentMethodDetails.KakaoPay;

    klarna?: PaymentMethodDetails.Klarna;

    kr_card?: PaymentMethodDetails.KrCard;

    link?: PaymentMethodDetails.Link;

    naver_pay?: PaymentMethodDetails.NaverPay;

    nz_bank_account?: PaymentMethodDetails.NzBankAccount;

    paypal?: PaymentMethodDetails.Paypal;

    payto?: PaymentMethodDetails.Payto;

    revolut_pay?: PaymentMethodDetails.RevolutPay;

    sepa_debit?: PaymentMethodDetails.SepaDebit;

    us_bank_account?: PaymentMethodDetails.UsBankAccount;
  }

  export namespace PaymentMethodDetails {
    export interface AcssDebit {
      /**
       * Payment schedule for the mandate.
       */
      payment_schedule: 'combined' | 'interval' | 'sporadic';

      /**
       * Transaction type of the mandate.
       */
      transaction_type: 'business' | 'personal';

      /**
       * List of Stripe products where this mandate can be selected automatically.
       */
      default_for?: Array<'invoice' | 'subscription'>;

      /**
       * Description of the interval. Only required if the 'payment_schedule' parameter
       * is 'interval' or 'combined'.
       */
      interval_description?: string | null;
    }

    export interface AmazonPay {}

    export interface AuBecsDebit {
      /**
       * The URL of the mandate. This URL generally contains sensitive information about
       * the customer and should be shared with them exclusively.
       */
      url: string;
    }

    export interface BacsDebit {
      /**
       * The status of the mandate on the Bacs network. Can be one of `pending`,
       * `revoked`, `refused`, or `accepted`.
       */
      network_status: 'accepted' | 'pending' | 'refused' | 'revoked';

      /**
       * The unique reference identifying the mandate on the Bacs network.
       */
      reference: string;

      /**
       * The URL that will contain the mandate that the customer has signed.
       */
      url: string;

      /**
       * When the mandate is revoked on the Bacs network this field displays the reason
       * for the revocation.
       */
      revocation_reason?:
        | 'account_closed'
        | 'bank_account_restricted'
        | 'bank_ownership_changed'
        | 'could_not_process'
        | 'debit_not_authorized'
        | null;
    }

    export interface Card {}

    export interface Cashapp {}

    export interface KakaoPay {}

    export interface Klarna {}

    export interface KrCard {}

    export interface Link {}

    export interface NaverPay {}

    export interface NzBankAccount {}

    export interface Paypal {
      /**
       * The PayPal Billing Agreement ID (BAID). This is an ID generated by PayPal which
       * represents the mandate between the merchant and the customer.
       */
      billing_agreement_id?: string | null;

      /**
       * PayPal account PayerID. This identifier uniquely identifies the PayPal customer.
       */
      payer_id?: string | null;
    }

    export interface Payto {
      /**
       * The type of amount that will be collected. The amount charged must be exact or
       * up to the value of `amount` param for `fixed` or `maximum` type respectively.
       * Defaults to `maximum`.
       */
      amount_type: 'fixed' | 'maximum';

      /**
       * The periodicity at which payments will be collected. Defaults to `adhoc`.
       */
      payment_schedule:
        | 'adhoc'
        | 'annual'
        | 'daily'
        | 'fortnightly'
        | 'monthly'
        | 'quarterly'
        | 'semi_annual'
        | 'weekly';

      /**
       * Amount that will be collected. It is required when `amount_type` is `fixed`.
       */
      amount?: number | null;

      /**
       * Date, in YYYY-MM-DD format, after which payments will not be collected. Defaults
       * to no end date.
       */
      end_date?: string | null;

      /**
       * The number of payments that will be made during a payment period. Defaults to 1
       * except for when `payment_schedule` is `adhoc`. In that case, it defaults to no
       * limit.
       */
      payments_per_period?: number | null;

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

      /**
       * Date, in YYYY-MM-DD format, from which payments will be collected. Defaults to
       * confirmation time.
       */
      start_date?: string | null;
    }

    export interface RevolutPay {}

    export interface SepaDebit {
      /**
       * The unique reference of the mandate.
       */
      reference: string;

      /**
       * The URL of the mandate. This URL generally contains sensitive information about
       * the customer and should be shared with them exclusively.
       */
      url: string;
    }

    export interface UsBankAccount {
      /**
       * Mandate collection method
       */
      collection_method?: 'paper';
    }
  }

  export interface MultiUse {}

  export interface SingleUse {
    /**
     * The amount of the payment on a single use mandate.
     */
    amount: number;

    /**
     * The currency of the payment on a single use mandate.
     */
    currency: string;
  }
}

export interface PaymentMethodDetailsBancontactSetupAttempt {
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
   * SetupAttempt.
   */
  generated_sepa_debit?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * The mandate for the SEPA Direct Debit PaymentMethod which was generated by this
   * SetupAttempt.
   */
  generated_sepa_debit_mandate?: string | Mandate | null;

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

export interface PaymentMethodDetailsIdealSetupAttempt {
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
   * SetupAttempt.
   */
  generated_sepa_debit?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * The mandate for the SEPA Direct Debit PaymentMethod which was generated by this
   * SetupAttempt.
   */
  generated_sepa_debit_mandate?: string | Mandate | null;

  /**
   * Last four characters of the IBAN.
   */
  iban_last4?: string | null;

  /**
   * Owner's verified full name. Values are verified or provided by iDEAL directly
   * (if supported) at the time of authorization or settlement. They cannot be set or
   * mutated.
   */
  verified_name?: string | null;
}

export interface PaymentMethodDetailsSofortSetupAttempt {
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
   * SetupAttempt.
   */
  generated_sepa_debit?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * The mandate for the SEPA Direct Debit PaymentMethod which was generated by this
   * SetupAttempt.
   */
  generated_sepa_debit_mandate?: string | Mandate | null;

  /**
   * Last four characters of the IBAN.
   */
  iban_last4?: string | null;

  /**
   * Preferred language of the Sofort authorization page that the customer is
   * redirected to. Can be one of `en`, `de`, `fr`, or `nl`
   */
  preferred_language?: 'de' | 'en' | 'fr' | 'nl' | null;

  /**
   * Owner's verified full name. Values are verified or provided by Sofort directly
   * (if supported) at the time of authorization or settlement. They cannot be set or
   * mutated.
   */
  verified_name?: string | null;
}

/**
 * Pending Updates store the changes pending from a previous update that will be
 * applied to the Subscription upon successful payment.
 */
export interface PendingUpdate {
  /**
   * The point after which the changes reflected by this update will be discarded and
   * no longer applied.
   */
  expires_at: number;

  /**
   * If the update is applied, determines the date of the first full invoice, and,
   * for plans with `month` or `year` intervals, the day of the month for subsequent
   * invoices. The timestamp is in UTC format.
   */
  billing_cycle_anchor?: number | null;

  /**
   * List of subscription items, each with an attached plan, that will be set if the
   * update is applied.
   */
  subscription_items?: Array<SubscriptionItem> | null;

  /**
   * Unix timestamp representing the end of the trial period the customer will get
   * before being charged for the first time, if the update is applied.
   */
  trial_end?: number | null;

  /**
   * Indicates if a plan's `trial_period_days` should be applied to the subscription.
   * Setting `trial_end` per subscription is preferred, and this defaults to `false`.
   * Setting this flag to `true` together with `trial_end` is not allowed. See
   * [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials)
   * to learn more.
   */
  trial_from_plan?: boolean | null;
}

export interface PhaseAutomaticTax {
  /**
   * Whether Stripe automatically computes tax on invoices created during this phase.
   */
  enabled: boolean;

  /**
   * If Stripe disabled automatic tax, this enum describes why.
   */
  disabled_reason?: 'requires_location_inputs' | null;

  liability?: InvoicesAPI.ConnectAccountReference | null;
}

/**
 * A subscription schedule allows you to create and manage the lifecycle of a
 * subscription by predefining expected changes.
 *
 * Related guide:
 * [Subscription schedules](https://docs.stripe.com/billing/subscriptions/subscription-schedules)
 */
export interface Schedule {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The billing mode of the subscription.
   */
  billing_mode: Schedule.BillingMode;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * ID of the customer who owns the subscription schedule.
   */
  customer: string | CustomersAPI.Customer | Shared.DeletedCustomer;

  default_settings: DefaultSettings;

  /**
   * Behavior of the subscription schedule and underlying subscription when it ends.
   * Possible values are `release` or `cancel` with the default being `release`.
   * `release` will end the subscription schedule and keep the underlying
   * subscription running. `cancel` will end the subscription schedule and cancel the
   * underlying subscription.
   */
  end_behavior: 'cancel' | 'none' | 'release' | 'renew';

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'subscription_schedule';

  /**
   * Configuration for the subscription schedule's phases.
   */
  phases: Array<SchedulePhaseConfiguration>;

  /**
   * The present status of the subscription schedule. Possible values are
   * `not_started`, `active`, `completed`, `released`, and `canceled`. You can read
   * more about the different states in our
   * [behavior guide](https://docs.stripe.com/billing/subscriptions/subscription-schedules).
   */
  status: 'active' | 'canceled' | 'completed' | 'not_started' | 'released';

  /**
   * ID of the Connect Application that created the schedule.
   */
  application?: string | Shared.Application | Shared.DeletedApplication | null;

  /**
   * Time at which the subscription schedule was canceled. Measured in seconds since
   * the Unix epoch.
   */
  canceled_at?: number | null;

  /**
   * Time at which the subscription schedule was completed. Measured in seconds since
   * the Unix epoch.
   */
  completed_at?: number | null;

  current_phase?: Schedule.CurrentPhase | null;

  /**
   * ID of the account who owns the subscription schedule.
   */
  customer_account?: string | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Time at which the subscription schedule was released. Measured in seconds since
   * the Unix epoch.
   */
  released_at?: number | null;

  /**
   * ID of the subscription once managed by the subscription schedule (if it is
   * released).
   */
  released_subscription?: string | null;

  /**
   * ID of the subscription managed by the subscription schedule.
   */
  subscription?: string | Subscription | null;

  /**
   * ID of the test clock this subscription schedule belongs to.
   */
  test_clock?: string | Shared.TestHelpersTestClock | null;
}

export namespace Schedule {
  /**
   * The billing mode of the subscription.
   */
  export interface BillingMode {
    /**
     * Controls how prorations and invoices for subscriptions are calculated and
     * orchestrated.
     */
    type: 'classic' | 'flexible';

    flexible?: BillingMode.Flexible | null;

    /**
     * Details on when the current billing_mode was adopted.
     */
    updated_at?: number;
  }

  export namespace BillingMode {
    export interface Flexible {
      /**
       * Controls how invoices and invoice items display proration amounts and discount
       * amounts.
       */
      proration_discounts?: 'included' | 'itemized';
    }
  }

  export interface CurrentPhase {
    /**
     * The end of this phase of the subscription schedule.
     */
    end_date: number;

    /**
     * The start of this phase of the subscription schedule.
     */
    start_date: number;
  }
}

/**
 * An Add Invoice Item describes the prices and quantities that will be added as
 * pending invoice items when entering a phase.
 */
export interface ScheduleAddInvoiceItem {
  /**
   * The stackable discounts that will be applied to the item.
   */
  discounts: Array<StackableDiscount>;

  period: ScheduleAddInvoiceItem.Period;

  /**
   * ID of the price used to generate the invoice item.
   */
  price: string | PricesAPI.Price | ScheduleAddInvoiceItem.DeletedPrice;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * The quantity of the invoice item.
   */
  quantity?: number | null;

  /**
   * The tax rates which apply to the item. When set, the `default_tax_rates` do not
   * apply to this item.
   */
  tax_rates?: Array<InvoicesAPI.TaxRate> | null;
}

export namespace ScheduleAddInvoiceItem {
  export interface Period {
    end: Period.End;

    start: Period.Start;
  }

  export namespace Period {
    export interface End {
      /**
       * Select how to calculate the end of the invoice item period.
       */
      type: 'min_item_period_end' | 'phase_end' | 'timestamp';

      /**
       * A precise Unix timestamp for the end of the invoice item period. Must be greater
       * than or equal to `period.start`.
       */
      timestamp?: number;
    }

    export interface Start {
      /**
       * Select how to calculate the start of the invoice item period.
       */
      type: 'max_item_period_start' | 'phase_start' | 'timestamp';

      /**
       * A precise Unix timestamp for the start of the invoice item period. Must be less
       * than or equal to `period.end`.
       */
      timestamp?: number;
    }
  }

  export interface DeletedPrice {
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
    object: 'price';
  }
}

/**
 * A phase item describes the price and quantity of a phase.
 */
export interface ScheduleConfigurationItem {
  /**
   * The discounts applied to the subscription item. Subscription item discounts are
   * applied before subscription discounts. Use `expand[]=discounts` to expand each
   * discount.
   */
  discounts: Array<StackableDiscount>;

  /**
   * ID of the price to which the customer should be subscribed.
   */
  price: string | PricesAPI.Price | ScheduleConfigurationItem.DeletedPrice;

  billing_thresholds?: ScheduleConfigurationItem.BillingThresholds | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an item. Metadata on this item will update the underlying subscription
   * item's `metadata` when the phase is entered.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Quantity of the plan to which the customer should be subscribed.
   */
  quantity?: number;

  /**
   * The tax rates which apply to this `phase_item`. When set, the
   * `default_tax_rates` on the phase do not apply to this `phase_item`.
   */
  tax_rates?: Array<InvoicesAPI.TaxRate> | null;
}

export namespace ScheduleConfigurationItem {
  export interface DeletedPrice {
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
    object: 'price';
  }

  export interface BillingThresholds {
    /**
     * Usage threshold that triggers the subscription to create an invoice
     */
    usage_gte?: number | null;
  }
}

/**
 * A phase describes the plans, coupon, and trialing status of a subscription for a
 * predefined time period.
 */
export interface SchedulePhaseConfiguration {
  /**
   * A list of prices and quantities that will generate invoice items appended to the
   * next invoice for this phase.
   */
  add_invoice_items: Array<ScheduleAddInvoiceItem>;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * The stackable discounts that will be applied to the subscription on this phase.
   * Subscription item discounts are applied before subscription discounts.
   */
  discounts: Array<StackableDiscount>;

  /**
   * The end of this phase of the subscription schedule.
   */
  end_date: number;

  /**
   * Subscription items to configure the subscription to during this phase of the
   * subscription schedule.
   */
  items: Array<ScheduleConfigurationItem>;

  /**
   * When transitioning phases, controls how prorations are handled (if any).
   * Possible values are `create_prorations`, `none`, and `always_invoice`.
   */
  proration_behavior: 'always_invoice' | 'create_prorations' | 'none';

  /**
   * The start of this phase of the subscription schedule.
   */
  start_date: number;

  /**
   * A non-negative decimal between 0 and 100, with at most two decimal places. This
   * represents the percentage of the subscription invoice total that will be
   * transferred to the application owner's Stripe account during this phase of the
   * schedule.
   */
  application_fee_percent?: number | null;

  automatic_tax?: PhaseAutomaticTax;

  /**
   * Possible values are `phase_start` or `automatic`. If `phase_start` then billing
   * cycle anchor of the subscription is set to the start of the phase when entering
   * the phase. If `automatic` then the billing cycle anchor is automatically
   * modified as needed when entering the phase. For more information, see the
   * billing cycle
   * [documentation](https://docs.stripe.com/billing/subscriptions/billing-cycle).
   */
  billing_cycle_anchor?: 'automatic' | 'phase_start' | null;

  billing_thresholds?: SubscriptionBillingThresholds | null;

  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically,
   * Stripe will attempt to pay the underlying subscription at the end of each
   * billing cycle using the default source attached to the customer. When sending an
   * invoice, Stripe will email your customer an invoice with payment instructions
   * and mark the subscription as `active`.
   */
  collection_method?: 'charge_automatically' | 'send_invoice' | null;

  /**
   * ID of the default payment method for the subscription schedule. It must belong
   * to the customer associated with the subscription schedule. If not set, invoices
   * will use the default payment method in the customer's invoice settings.
   */
  default_payment_method?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * The default tax rates to apply to the subscription during this phase of the
   * subscription schedule.
   */
  default_tax_rates?: Array<InvoicesAPI.TaxRate> | null;

  /**
   * Subscription description, meant to be displayable to the customer. Use this
   * field to optionally store an explanation of the subscription for rendering in
   * Stripe surfaces and certain local payment methods UIs.
   */
  description?: string | null;

  invoice_settings?: SchedulePhaseSetting | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to a phase. Metadata on a schedule's phase will update the underlying
   * subscription's `metadata` when the phase is entered. Updating the underlying
   * subscription's `metadata` directly will not affect the current phase's
   * `metadata`.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * The account (if any) the charge was made on behalf of for charges associated
   * with the schedule's subscription. See the Connect documentation for details.
   */
  on_behalf_of?: string | AccountsAPI.Account | null;

  transfer_data?: SubscriptionTransferData | null;

  /**
   * When the trial ends within the phase.
   */
  trial_end?: number | null;
}

export interface SchedulePhaseSetting {
  /**
   * The account tax IDs associated with this phase of the subscription schedule.
   * Will be set on invoices generated by this phase of the subscription schedule.
   */
  account_tax_ids?: Array<string | CustomersAPI.TaxID | Shared.DeletedTaxID> | null;

  /**
   * Number of days within which a customer must pay invoices generated by this
   * subscription schedule. This value will be `null` for subscription schedules
   * where `billing=charge_automatically`.
   */
  days_until_due?: number | null;

  issuer?: InvoicesAPI.ConnectAccountReference | null;
}

export interface ScheduleSetting {
  issuer: InvoicesAPI.ConnectAccountReference;

  /**
   * The account tax IDs associated with the subscription schedule. Will be set on
   * invoices generated by the subscription schedule.
   */
  account_tax_ids?: Array<string | CustomersAPI.TaxID | Shared.DeletedTaxID> | null;

  /**
   * Number of days within which a customer must pay invoices generated by this
   * subscription schedule. This value will be `null` for subscription schedules
   * where `billing=charge_automatically`.
   */
  days_until_due?: number | null;
}

/**
 * A SetupAttempt describes one attempted confirmation of a SetupIntent, whether
 * that confirmation is successful or unsuccessful. You can use SetupAttempts to
 * inspect details of a specific attempt at setting up a payment method using a
 * SetupIntent.
 */
export interface SetupAttempt {
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
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'setup_attempt';

  /**
   * ID of the payment method used with this SetupAttempt.
   */
  payment_method: string | InvoicesAPI.PaymentMethod;

  payment_method_details: SetupAttemptPaymentMethodDetails;

  /**
   * ID of the SetupIntent that this attempt belongs to.
   */
  setup_intent: string | SetupIntent;

  /**
   * Status of this SetupAttempt, one of `requires_confirmation`, `requires_action`,
   * `processing`, `succeeded`, `failed`, or `abandoned`.
   */
  status: string;

  /**
   * The value of
   * [usage](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-usage)
   * on the SetupIntent at the time of this confirmation, one of `off_session` or
   * `on_session`.
   */
  usage: string;

  /**
   * The value of
   * [application](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-application)
   * on the SetupIntent at the time of this confirmation.
   */
  application?: string | Shared.Application | null;

  /**
   * If present, the SetupIntent's payment method will be attached to the in-context
   * Stripe Account.
   *
   * It can only be used for this Stripe Account’s own money movement flows like
   * InboundTransfer and OutboundTransfers. It cannot be set to true when setting up
   * a PaymentMethod for a Customer, and defaults to false when attaching a
   * PaymentMethod to a Customer.
   */
  attach_to_self?: boolean;

  /**
   * The value of
   * [customer](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-customer)
   * on the SetupIntent at the time of this confirmation.
   */
  customer?: string | CustomersAPI.Customer | Shared.DeletedCustomer | null;

  /**
   * The value of
   * [customer_account](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-customer_account)
   * on the SetupIntent at the time of this confirmation.
   */
  customer_account?: string | null;

  /**
   * Indicates the directions of money movement for which this payment method is
   * intended to be used.
   *
   * Include `inbound` if you intend to use the payment method as the origin to pull
   * funds from. Include `outbound` if you intend to use the payment method as the
   * destination to send funds to. You can include both if you intend to use the
   * payment method for both purposes.
   */
  flow_directions?: Array<'inbound' | 'outbound'> | null;

  /**
   * The value of
   * [on_behalf_of](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-on_behalf_of)
   * on the SetupIntent at the time of this confirmation.
   */
  on_behalf_of?: string | AccountsAPI.Account | null;

  setup_error?: InvoicesAPI.APIErrors | null;
}

export interface SetupAttemptPaymentMethodDetails {
  /**
   * The type of the payment method used in the SetupIntent (e.g., `card`). An
   * additional hash is included on `payment_method_details` with a name matching
   * this value. It contains confirmation-specific information for the payment
   * method.
   */
  type: string;

  acss_debit?: SetupAttemptPaymentMethodDetails.AcssDebit;

  amazon_pay?: SetupAttemptPaymentMethodDetails.AmazonPay;

  au_becs_debit?: SetupAttemptPaymentMethodDetails.AuBecsDebit;

  bacs_debit?: SetupAttemptPaymentMethodDetails.BacsDebit;

  bancontact?: PaymentMethodDetailsBancontactSetupAttempt;

  boleto?: SetupAttemptPaymentMethodDetails.Boleto;

  card?: SetupAttemptPaymentMethodDetails.Card;

  card_present?: SetupAttemptPaymentMethodDetailsCardPresent;

  cashapp?: SetupAttemptPaymentMethodDetails.Cashapp;

  ideal?: PaymentMethodDetailsIdealSetupAttempt;

  kakao_pay?: SetupAttemptPaymentMethodDetails.KakaoPay;

  klarna?: SetupAttemptPaymentMethodDetails.Klarna;

  kr_card?: SetupAttemptPaymentMethodDetails.KrCard;

  link?: SetupAttemptPaymentMethodDetails.Link;

  naver_pay?: SetupAttemptPaymentMethodDetails.NaverPay;

  nz_bank_account?: SetupAttemptPaymentMethodDetails.NzBankAccount;

  paypal?: SetupAttemptPaymentMethodDetails.Paypal;

  payto?: SetupAttemptPaymentMethodDetails.Payto;

  revolut_pay?: SetupAttemptPaymentMethodDetails.RevolutPay;

  sepa_debit?: SetupAttemptPaymentMethodDetails.SepaDebit;

  sofort?: PaymentMethodDetailsSofortSetupAttempt;

  us_bank_account?: SetupAttemptPaymentMethodDetails.UsBankAccount;
}

export namespace SetupAttemptPaymentMethodDetails {
  export interface AcssDebit {}

  export interface AmazonPay {}

  export interface AuBecsDebit {}

  export interface BacsDebit {}

  export interface Boleto {}

  export interface Card {
    /**
     * Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`,
     * `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.
     */
    brand?: string | null;

    checks?: Card.Checks | null;

    /**
     * Two-letter ISO code representing the country of the card. You could use this
     * attribute to get a sense of the international breakdown of cards you've
     * collected.
     */
    country?: string | null;

    /**
     * Two-digit number representing the card's expiration month.
     */
    exp_month?: number | null;

    /**
     * Four-digit number representing the card's expiration year.
     */
    exp_year?: number | null;

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
     * The last four digits of the card.
     */
    last4?: string | null;

    /**
     * Identifies which network this charge was processed on. Can be `amex`,
     * `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `interac`, `jcb`, `link`,
     * `mastercard`, `unionpay`, `visa`, or `unknown`.
     */
    network?: string | null;

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
       * The type of the card wallet, one of `apple_pay`, `google_pay`, or `link`. An
       * additional hash is included on the Wallet subhash with a name matching this
       * value. It contains additional information specific to the card wallet type.
       */
      type: 'apple_pay' | 'google_pay' | 'link';

      apple_pay?: Wallet.ApplePay;

      google_pay?: Wallet.GooglePay;
    }

    export namespace Wallet {
      export interface ApplePay {}

      export interface GooglePay {}
    }
  }

  export interface Cashapp {}

  export interface KakaoPay {}

  export interface Klarna {}

  export interface KrCard {}

  export interface Link {}

  export interface NaverPay {
    /**
     * Uniquely identifies this particular Naver Pay account. You can use this
     * attribute to check whether two Naver Pay accounts are the same.
     */
    buyer_id?: string;
  }

  export interface NzBankAccount {}

  export interface Paypal {}

  export interface Payto {}

  export interface RevolutPay {}

  export interface SepaDebit {}

  export interface UsBankAccount {}
}

export interface SetupAttemptPaymentMethodDetailsCardPresent {
  /**
   * The ID of the Card PaymentMethod which was generated by this SetupAttempt.
   */
  generated_card?: string | InvoicesAPI.PaymentMethod | null;

  offline?: Shared.PaymentMethodDetailsCardPresentOffline | null;
}

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
export interface SetupIntent {
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
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'setup_intent';

  /**
   * The list of payment method types (e.g. card) that this SetupIntent is allowed to
   * set up. A list of valid payment method types can be found
   * [here](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type).
   */
  payment_method_types: Array<string>;

  /**
   * [Status](https://docs.stripe.com/payments/intents#intent-statuses) of this
   * SetupIntent, one of `requires_payment_method`, `requires_confirmation`,
   * `requires_action`, `processing`, `canceled`, or `succeeded`.
   */
  status:
    | 'canceled'
    | 'processing'
    | 'requires_action'
    | 'requires_confirmation'
    | 'requires_payment_method'
    | 'succeeded';

  /**
   * Indicates how the payment method is intended to be used in the future.
   *
   * Use `on_session` if you intend to only reuse the payment method when the
   * customer is in your checkout flow. Use `off_session` if your customer may or may
   * not be in your checkout flow. If not provided, this value defaults to
   * `off_session`.
   */
  usage: string;

  /**
   * ID of the Connect application that created the SetupIntent.
   */
  application?: string | Shared.Application | null;

  /**
   * If present, the SetupIntent's payment method will be attached to the in-context
   * Stripe Account.
   *
   * It can only be used for this Stripe Account’s own money movement flows like
   * InboundTransfer and OutboundTransfers. It cannot be set to true when setting up
   * a PaymentMethod for a Customer, and defaults to false when attaching a
   * PaymentMethod to a Customer.
   */
  attach_to_self?: boolean;

  automatic_payment_methods?: SetupIntent.AutomaticPaymentMethods | null;

  /**
   * Reason for cancellation of this SetupIntent, one of `abandoned`,
   * `requested_by_customer`, or `duplicate`.
   */
  cancellation_reason?: 'abandoned' | 'duplicate' | 'requested_by_customer' | null;

  /**
   * The client secret of this SetupIntent. Used for client-side retrieval using a
   * publishable key.
   *
   * The client secret can be used to complete payment setup from your frontend. It
   * should not be stored, logged, or exposed to anyone other than the customer. Make
   * sure that you have TLS enabled on any page that includes the client secret.
   */
  client_secret?: string | null;

  /**
   * ID of the Customer this SetupIntent belongs to, if one exists.
   *
   * If present, the SetupIntent's payment method will be attached to the Customer on
   * successful setup. Payment methods attached to other Customers cannot be used
   * with this SetupIntent.
   */
  customer?: string | CustomersAPI.Customer | Shared.DeletedCustomer | null;

  /**
   * ID of the Account this SetupIntent belongs to, if one exists.
   *
   * If present, the SetupIntent's payment method will be attached to the Account on
   * successful setup. Payment methods attached to other Accounts cannot be used with
   * this SetupIntent.
   */
  customer_account?: string | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * Payment method types that are excluded from this SetupIntent.
   */
  excluded_payment_method_types?: Array<
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
    | 'cashapp'
    | 'crypto'
    | 'customer_balance'
    | 'eps'
    | 'fpx'
    | 'giropay'
    | 'grabpay'
    | 'ideal'
    | 'kakao_pay'
    | 'klarna'
    | 'konbini'
    | 'kr_card'
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
    | 'zip'
  > | null;

  /**
   * Indicates the directions of money movement for which this payment method is
   * intended to be used.
   *
   * Include `inbound` if you intend to use the payment method as the origin to pull
   * funds from. Include `outbound` if you intend to use the payment method as the
   * destination to send funds to. You can include both if you intend to use the
   * payment method for both purposes.
   */
  flow_directions?: Array<'inbound' | 'outbound'> | null;

  last_setup_error?: InvoicesAPI.APIErrors | null;

  /**
   * The most recent SetupAttempt for this SetupIntent.
   */
  latest_attempt?: string | SetupAttempt | null;

  /**
   * ID of the multi use Mandate generated by the SetupIntent.
   */
  mandate?: string | Mandate | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  next_action?: SetupIntent.NextAction | null;

  /**
   * The account (if any) for which the setup is intended.
   */
  on_behalf_of?: string | AccountsAPI.Account | null;

  /**
   * ID of the payment method used with this SetupIntent. If the payment method is
   * `card_present` and isn't a digital wallet, then the
   * [generated_card](https://docs.stripe.com/api/setup_attempts/object#setup_attempt_object-payment_method_details-card_present-generated_card)
   * associated with the `latest_attempt` is attached to the Customer instead.
   */
  payment_method?: string | InvoicesAPI.PaymentMethod | null;

  payment_method_configuration_details?: SetupIntent.PaymentMethodConfigurationDetails | null;

  payment_method_options?: SetupIntent.PaymentMethodOptions | null;

  /**
   * ID of the single_use Mandate generated by the SetupIntent.
   */
  single_use_mandate?: string | Mandate | null;
}

export namespace SetupIntent {
  export interface AutomaticPaymentMethods {
    /**
     * Controls whether this SetupIntent will accept redirect-based payment methods.
     *
     * Redirect-based payment methods may require your customer to be redirected to a
     * payment method's app or site for authentication or additional steps. To
     * [confirm](https://docs.stripe.com/api/setup_intents/confirm) this SetupIntent,
     * you may be required to provide a `return_url` to redirect customers back to your
     * site after they authenticate or complete the setup.
     */
    allow_redirects?: 'always' | 'never';

    /**
     * Automatically calculates compatible payment methods
     */
    enabled?: boolean | null;
  }

  export interface NextAction {
    /**
     * Type of the next action to perform. Refer to the other child attributes under
     * `next_action` for available values. Examples include: `redirect_to_url`,
     * `use_stripe_sdk`, `alipay_handle_redirect`, `oxxo_display_details`, or
     * `verify_with_microdeposits`.
     */
    type: string;

    cashapp_handle_redirect_or_display_qr_code?: NextAction.CashappHandleRedirectOrDisplayQrCode;

    redirect_to_url?: NextAction.RedirectToURL;

    /**
     * When confirming a SetupIntent with Stripe.js, Stripe.js depends on the contents
     * of this dictionary to invoke authentication flows. The shape of the contents is
     * subject to change and is only intended to be used by Stripe.js.
     */
    use_stripe_sdk?: unknown;

    verify_with_microdeposits?: NextAction.VerifyWithMicrodeposits;
  }

  export namespace NextAction {
    export interface CashappHandleRedirectOrDisplayQrCode {
      /**
       * The URL to the hosted Cash App Pay instructions page, which allows customers to
       * view the QR code, and supports QR code refreshing on expiration.
       */
      hosted_instructions_url: string;

      /**
       * The url for mobile redirect based auth
       */
      mobile_auth_url: string;

      qr_code: CashappHandleRedirectOrDisplayQrCode.QrCode;
    }

    export namespace CashappHandleRedirectOrDisplayQrCode {
      export interface QrCode {
        /**
         * The date (unix timestamp) when the QR code expires.
         */
        expires_at: number;

        /**
         * The image_url_png string used to render QR code
         */
        image_url_png: string;

        /**
         * The image_url_svg string used to render QR code
         */
        image_url_svg: string;
      }
    }

    export interface RedirectToURL {
      /**
       * If the customer does not exit their browser while authenticating, they will be
       * redirected to this specified URL after completion.
       */
      return_url?: string | null;

      /**
       * The URL you must redirect your customer to in order to authenticate.
       */
      url?: string | null;
    }

    export interface VerifyWithMicrodeposits {
      /**
       * The timestamp when the microdeposits are expected to land.
       */
      arrival_date: number;

      /**
       * The URL for the hosted verification page, which allows customers to verify their
       * bank account.
       */
      hosted_verification_url: string;

      /**
       * The type of the microdeposit sent to the customer. Used to distinguish between
       * different verification methods.
       */
      microdeposit_type?: 'amounts' | 'descriptor_code' | null;
    }
  }

  export interface PaymentMethodConfigurationDetails {
    /**
     * ID of the payment method configuration used.
     */
    id: string;

    /**
     * ID of the parent payment method configuration used.
     */
    parent?: string | null;
  }

  export interface PaymentMethodOptions {
    acss_debit?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsAcssDebit
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    amazon_pay?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsAmazonPay
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    bacs_debit?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsBacsDebit
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    card?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsCard
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    card_present?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsCardPresent
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    klarna?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsKlarna
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    link?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsLink
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    paypal?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsPaypal
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    payto?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsPayto
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    sepa_debit?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsSepaDebit
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;

    us_bank_account?:
      | PaymentMethodOptions.SetupIntentPaymentMethodOptionsUsBankAccount
      | SubscriptionsAPI.SetupIntentTypeSpecificPaymentMethodOptionsClient;
  }

  export namespace PaymentMethodOptions {
    export interface SetupIntentPaymentMethodOptionsAcssDebit {
      /**
       * Currency supported by the bank account
       */
      currency?: 'cad' | 'usd' | null;

      mandate_options?: SetupIntentPaymentMethodOptionsAcssDebit.MandateOptions;

      /**
       * Bank account verification method.
       */
      verification_method?: 'automatic' | 'instant' | 'microdeposits';
    }

    export namespace SetupIntentPaymentMethodOptionsAcssDebit {
      export interface MandateOptions {
        /**
         * A URL for custom mandate text
         */
        custom_mandate_url?: string;

        /**
         * List of Stripe products where this mandate can be selected automatically.
         */
        default_for?: Array<'invoice' | 'subscription'>;

        /**
         * Description of the interval. Only required if the 'payment_schedule' parameter
         * is 'interval' or 'combined'.
         */
        interval_description?: string | null;

        /**
         * Payment schedule for the mandate.
         */
        payment_schedule?: 'combined' | 'interval' | 'sporadic' | null;

        /**
         * Transaction type of the mandate.
         */
        transaction_type?: 'business' | 'personal' | null;
      }
    }

    export interface SetupIntentPaymentMethodOptionsAmazonPay {}

    export interface SetupIntentPaymentMethodOptionsBacsDebit {
      mandate_options?: SetupIntentPaymentMethodOptionsBacsDebit.MandateOptions;
    }

    export namespace SetupIntentPaymentMethodOptionsBacsDebit {
      export interface MandateOptions {
        /**
         * Prefix used to generate the Mandate reference. Must be at most 12 characters
         * long. Must consist of only uppercase letters, numbers, spaces, or the following
         * special characters: '/', '\_', '-', '&', '.'. Cannot begin with 'DDIC' or
         * 'STRIPE'.
         */
        reference_prefix?: string;
      }
    }

    export interface SetupIntentPaymentMethodOptionsCard {
      mandate_options?: SetupIntentPaymentMethodOptionsCard.MandateOptions | null;

      /**
       * Selected network to process this SetupIntent on. Depends on the available
       * networks of the card attached to the setup intent. Can be only set confirm-time.
       */
      network?:
        | 'amex'
        | 'cartes_bancaires'
        | 'diners'
        | 'discover'
        | 'eftpos_au'
        | 'girocard'
        | 'interac'
        | 'jcb'
        | 'link'
        | 'mastercard'
        | 'unionpay'
        | 'unknown'
        | 'visa'
        | null;

      /**
       * We strongly recommend that you rely on our SCA Engine to automatically prompt
       * your customers for authentication based on risk level and
       * [other requirements](https://docs.stripe.com/strong-customer-authentication).
       * However, if you wish to request 3D Secure based on logic from your own fraud
       * engine, provide this option. If not provided, this value defaults to
       * `automatic`. Read our guide on
       * [manually requesting 3D Secure](https://docs.stripe.com/payments/3d-secure/authentication-flow#manual-three-ds)
       * for more information on how this configuration interacts with Radar and our SCA
       * Engine.
       */
      request_three_d_secure?: 'any' | 'automatic' | 'challenge' | null;
    }

    export namespace SetupIntentPaymentMethodOptionsCard {
      export interface MandateOptions {
        /**
         * Amount to be charged for future payments.
         */
        amount: number;

        /**
         * One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact
         * amount to be charged in future payments. If `maximum`, the amount charged can be
         * up to the value passed for the `amount` param.
         */
        amount_type: 'fixed' | 'maximum';

        /**
         * Three-letter
         * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
         * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
         */
        currency: string;

        /**
         * Specifies payment frequency. One of `day`, `week`, `month`, `year`, or
         * `sporadic`.
         */
        interval: 'day' | 'month' | 'sporadic' | 'week' | 'year';

        /**
         * Unique identifier for the mandate or subscription.
         */
        reference: string;

        /**
         * Start date of the mandate or subscription. Start date should not be lesser than
         * yesterday.
         */
        start_date: number;

        /**
         * A description of the mandate or subscription that is meant to be displayed to
         * the customer.
         */
        description?: string | null;

        /**
         * End date of the mandate or subscription. If not provided, the mandate will be
         * active until canceled. If provided, end date should be after start date.
         */
        end_date?: number | null;

        /**
         * The number of intervals between payments. For example, `interval=month` and
         * `interval_count=3` indicates one payment every three months. Maximum of one year
         * interval allowed (1 year, 12 months, or 52 weeks). This parameter is optional
         * when `interval=sporadic`.
         */
        interval_count?: number | null;

        /**
         * Specifies the type of mandates supported. Possible values are `india`.
         */
        supported_types?: Array<'india'> | null;
      }
    }

    export interface SetupIntentPaymentMethodOptionsCardPresent {}

    export interface SetupIntentPaymentMethodOptionsKlarna {
      /**
       * The currency of the setup intent. Three letter ISO currency code.
       */
      currency?: string | null;

      /**
       * Preferred locale of the Klarna checkout page that the customer is redirected to.
       */
      preferred_locale?: string | null;
    }

    export interface SetupIntentPaymentMethodOptionsLink {}

    export interface SetupIntentPaymentMethodOptionsPaypal {
      /**
       * The PayPal Billing Agreement ID (BAID). This is an ID generated by PayPal which
       * represents the mandate between the merchant and the customer.
       */
      billing_agreement_id?: string | null;
    }

    export interface SetupIntentPaymentMethodOptionsPayto {
      mandate_options?: SubscriptionsAPI.SetupIntentPaymentMethodOptionsMandateOptionsPayto;
    }

    export interface SetupIntentPaymentMethodOptionsSepaDebit {
      mandate_options?: SetupIntentPaymentMethodOptionsSepaDebit.MandateOptions;
    }

    export namespace SetupIntentPaymentMethodOptionsSepaDebit {
      export interface MandateOptions {
        /**
         * Prefix used to generate the Mandate reference. Must be at most 12 characters
         * long. Must consist of only uppercase letters, numbers, spaces, or the following
         * special characters: '/', '\_', '-', '&', '.'. Cannot begin with 'STRIPE'.
         */
        reference_prefix?: string;
      }
    }

    export interface SetupIntentPaymentMethodOptionsUsBankAccount {
      financial_connections?: SetupIntentPaymentMethodOptionsUsBankAccount.FinancialConnections;

      mandate_options?: SetupIntentPaymentMethodOptionsUsBankAccount.MandateOptions;

      /**
       * Bank account verification method.
       */
      verification_method?: 'automatic' | 'instant' | 'microdeposits';
    }

    export namespace SetupIntentPaymentMethodOptionsUsBankAccount {
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

        /**
         * For webview integrations only. Upon completing OAuth login in the native
         * browser, the user will be redirected to this URL to return to your app.
         */
        return_url?: string;
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

      export interface MandateOptions {
        /**
         * Mandate collection method
         */
        collection_method?: 'paper';
      }
    }
  }
}

export interface SetupIntentPaymentMethodOptionsMandateOptionsPayto {
  /**
   * Amount that will be collected. It is required when `amount_type` is `fixed`.
   */
  amount?: number | null;

  /**
   * The type of amount that will be collected. The amount charged must be exact or
   * up to the value of `amount` param for `fixed` or `maximum` type respectively.
   * Defaults to `maximum`.
   */
  amount_type?: 'fixed' | 'maximum' | null;

  /**
   * Date, in YYYY-MM-DD format, after which payments will not be collected. Defaults
   * to no end date.
   */
  end_date?: string | null;

  /**
   * The periodicity at which payments will be collected. Defaults to `adhoc`.
   */
  payment_schedule?:
    | 'adhoc'
    | 'annual'
    | 'daily'
    | 'fortnightly'
    | 'monthly'
    | 'quarterly'
    | 'semi_annual'
    | 'weekly'
    | null;

  /**
   * The number of payments that will be made during a payment period. Defaults to 1
   * except for when `payment_schedule` is `adhoc`. In that case, it defaults to no
   * limit.
   */
  payments_per_period?: number | null;

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

  /**
   * Date, in YYYY-MM-DD format, from which payments will be collected. Defaults to
   * confirmation time.
   */
  start_date?: string | null;
}

export interface SetupIntentTypeSpecificPaymentMethodOptionsClient {
  mandate_options?: SetupIntentPaymentMethodOptionsMandateOptionsPayto;

  /**
   * Bank account verification method.
   */
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
}

export interface StackableDiscount {
  /**
   * ID of the coupon to create a new discount for.
   */
  coupon?: string | CouponsAPI.Coupon | null;

  /**
   * ID of an existing discount on the object (or one of its ancestors) to reuse.
   */
  discount?: string | CustomersAPI.Discount | null;

  /**
   * ID of the promotion code to create a new discount for.
   */
  promotion_code?: string | CustomersAPI.PromotionCode | null;
}

/**
 * Subscriptions allow you to charge a customer on a recurring basis.
 *
 * Related guide:
 * [Creating subscriptions](https://docs.stripe.com/billing/subscriptions/creating)
 */
export interface Subscription {
  /**
   * Unique identifier for the object.
   */
  id: string;

  automatic_tax: AutomaticTaxSubscription;

  /**
   * The reference point that aligns future
   * [billing cycle](https://docs.stripe.com/subscriptions/billing-cycle) dates. It
   * sets the day of week for `week` intervals, the day of month for `month` and
   * `year` intervals, and the month of year for `year` intervals. The timestamp is
   * in UTC format.
   */
  billing_cycle_anchor: number;

  /**
   * The billing mode of the subscription.
   */
  billing_mode: Subscription.BillingMode;

  /**
   * Whether this subscription will (if `status=active`) or did (if
   * `status=canceled`) cancel at the end of the current billing period.
   */
  cancel_at_period_end: boolean;

  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically,
   * Stripe will attempt to pay this subscription at the end of the cycle using the
   * default source attached to the customer. When sending an invoice, Stripe will
   * email your customer an invoice with payment instructions and mark the
   * subscription as `active`.
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
   * ID of the customer who owns the subscription.
   */
  customer: string | CustomersAPI.Customer | Shared.DeletedCustomer;

  /**
   * The discounts applied to the subscription. Subscription item discounts are
   * applied before subscription discounts. Use `expand[]=discounts` to expand each
   * discount.
   */
  discounts: Array<string | CustomersAPI.Discount>;

  invoice_settings: SubscriptionInvoiceSettings;

  /**
   * List of subscription items, each with an attached price.
   */
  items: Subscription.Items;

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
  object: 'subscription';

  /**
   * Date when the subscription was first created. The date might differ from the
   * `created` date due to backdating.
   */
  start_date: number;

  /**
   * Possible values are `incomplete`, `incomplete_expired`, `trialing`, `active`,
   * `past_due`, `canceled`, `unpaid`, or `paused`.
   *
   * For `collection_method=charge_automatically` a subscription moves into
   * `incomplete` if the initial payment attempt fails. A subscription in this status
   * can only have metadata and default_source updated. Once the first invoice is
   * paid, the subscription moves into an `active` status. If the first invoice is
   * not paid within 23 hours, the subscription transitions to `incomplete_expired`.
   * This is a terminal status, the open invoice will be voided and no further
   * invoices will be generated.
   *
   * A subscription that is currently in a trial period is `trialing` and moves to
   * `active` when the trial period is over.
   *
   * A subscription can only enter a `paused` status
   * [when a trial ends without a payment method](https://docs.stripe.com/billing/subscriptions/trials#create-free-trials-without-payment).
   * A `paused` subscription doesn't generate invoices and can be resumed after your
   * customer adds their payment method. The `paused` status is different from
   * [pausing collection](https://docs.stripe.com/billing/subscriptions/pause-payment),
   * which still generates invoices and leaves the subscription's status unchanged.
   *
   * If subscription `collection_method=charge_automatically`, it becomes `past_due`
   * when payment is required but cannot be paid (due to failed payment or awaiting
   * additional user actions). Once Stripe has exhausted all payment retry attempts,
   * the subscription will become `canceled` or `unpaid` (depending on your
   * subscriptions settings).
   *
   * If subscription `collection_method=send_invoice` it becomes `past_due` when its
   * invoice is not paid by the due date, and `canceled` or `unpaid` if it is still
   * not paid by an additional deadline after that. Note that when a subscription has
   * a status of `unpaid`, no subsequent invoices will be attempted (invoices will be
   * created, but then immediately automatically closed). After receiving updated
   * payment information from a customer, you may choose to reopen and pay their
   * closed invoices.
   */
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';

  /**
   * ID of the Connect Application that created the subscription.
   */
  application?: string | Shared.Application | Shared.DeletedApplication | null;

  /**
   * A non-negative decimal between 0 and 100, with at most two decimal places. This
   * represents the percentage of the subscription invoice total that will be
   * transferred to the application owner's Stripe account.
   */
  application_fee_percent?: number | null;

  billing_cycle_anchor_config?: Subscription.BillingCycleAnchorConfig | null;

  billing_thresholds?: SubscriptionBillingThresholds | null;

  /**
   * A date in the future at which the subscription will automatically get canceled
   */
  cancel_at?: number | null;

  /**
   * If the subscription has been canceled, the date of that cancellation. If the
   * subscription was canceled with `cancel_at_period_end`, `canceled_at` will
   * reflect the time of the most recent update request, not the end of the
   * subscription period when the subscription is automatically moved to a canceled
   * state.
   */
  canceled_at?: number | null;

  cancellation_details?: Subscription.CancellationDetails | null;

  /**
   * ID of the account representing the customer who owns the subscription.
   */
  customer_account?: string | null;

  /**
   * Number of days a customer has to pay invoices generated by this subscription.
   * This value will be `null` for subscriptions where
   * `collection_method=charge_automatically`.
   */
  days_until_due?: number | null;

  /**
   * ID of the default payment method for the subscription. It must belong to the
   * customer associated with the subscription. This takes precedence over
   * `default_source`. If neither are set, invoices will use the customer's
   * [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method)
   * or
   * [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).
   */
  default_payment_method?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * ID of the default payment source for the subscription. It must belong to the
   * customer associated with the subscription and be in a chargeable state. If
   * `default_payment_method` is also set, `default_payment_method` will take
   * precedence. If neither are set, invoices will use the customer's
   * [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method)
   * or
   * [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).
   */
  default_source?: string | CustomersAPI.BankAccount | CustomersAPI.Card | Shared.Source | null;

  /**
   * The tax rates that will apply to any subscription item that does not have
   * `tax_rates` set. Invoices created will have their `default_tax_rates` populated
   * from the subscription.
   */
  default_tax_rates?: Array<InvoicesAPI.TaxRate> | null;

  /**
   * The subscription's description, meant to be displayable to the customer. Use
   * this field to optionally store an explanation of the subscription for rendering
   * in Stripe surfaces and certain local payment methods UIs.
   */
  description?: string | null;

  /**
   * If the subscription has ended, the date the subscription ended.
   */
  ended_at?: number | null;

  /**
   * The most recent invoice this subscription has generated over its lifecycle (for
   * example, when it cycles or is updated).
   */
  latest_invoice?: string | InvoicesAPI.Invoice | null;

  /**
   * Specifies the approximate timestamp on which any pending invoice items will be
   * billed according to the schedule provided at `pending_invoice_item_interval`.
   */
  next_pending_invoice_item_invoice?: number | null;

  /**
   * The account (if any) the charge was made on behalf of for charges associated
   * with this subscription. See the
   * [Connect documentation](https://docs.stripe.com/connect/subscriptions#on-behalf-of)
   * for details.
   */
  on_behalf_of?: string | AccountsAPI.Account | null;

  /**
   * The Pause Collection settings determine how we will pause collection for this
   * subscription and for how long the subscription should be paused.
   */
  pause_collection?: Subscription.PauseCollection | null;

  payment_settings?: Subscription.PaymentSettings | null;

  pending_invoice_item_interval?: Subscription.PendingInvoiceItemInterval | null;

  /**
   * You can use this [SetupIntent](https://docs.stripe.com/api/setup_intents) to
   * collect user authentication when creating a subscription without immediate
   * payment or updating a subscription's payment method, allowing you to optimize
   * for off-session payments. Learn more in the
   * [SCA Migration Guide](https://docs.stripe.com/billing/migration/strong-customer-authentication#scenario-2).
   */
  pending_setup_intent?: string | SetupIntent | null;

  /**
   * Pending Updates store the changes pending from a previous update that will be
   * applied to the Subscription upon successful payment.
   */
  pending_update?: PendingUpdate | null;

  /**
   * The schedule attached to the subscription
   */
  schedule?: string | Schedule | null;

  /**
   * ID of the test clock this subscription belongs to.
   */
  test_clock?: string | Shared.TestHelpersTestClock | null;

  transfer_data?: SubscriptionTransferData | null;

  /**
   * If the subscription has a trial, the end of that trial.
   */
  trial_end?: number | null;

  /**
   * Configures how this subscription behaves during the trial period.
   */
  trial_settings?: Subscription.TrialSettings | null;

  /**
   * If the subscription has a trial, the beginning of that trial.
   */
  trial_start?: number | null;
}

export namespace Subscription {
  /**
   * The billing mode of the subscription.
   */
  export interface BillingMode {
    /**
     * Controls how prorations and invoices for subscriptions are calculated and
     * orchestrated.
     */
    type: 'classic' | 'flexible';

    flexible?: BillingMode.Flexible | null;

    /**
     * Details on when the current billing_mode was adopted.
     */
    updated_at?: number;
  }

  export namespace BillingMode {
    export interface Flexible {
      /**
       * Controls how invoices and invoice items display proration amounts and discount
       * amounts.
       */
      proration_discounts?: 'included' | 'itemized';
    }
  }

  /**
   * List of subscription items, each with an attached price.
   */
  export interface Items {
    /**
     * Details about each object.
     */
    data: Array<SubscriptionsAPI.SubscriptionItem>;

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

  export interface BillingCycleAnchorConfig {
    /**
     * The day of the month of the billing_cycle_anchor.
     */
    day_of_month: number;

    /**
     * The hour of the day of the billing_cycle_anchor.
     */
    hour?: number | null;

    /**
     * The minute of the hour of the billing_cycle_anchor.
     */
    minute?: number | null;

    /**
     * The month to start full cycle billing periods.
     */
    month?: number | null;

    /**
     * The second of the minute of the billing_cycle_anchor.
     */
    second?: number | null;
  }

  export interface CancellationDetails {
    /**
     * Additional comments about why the user canceled the subscription, if the
     * subscription was canceled explicitly by the user.
     */
    comment?: string | null;

    /**
     * The customer submitted reason for why they canceled, if the subscription was
     * canceled explicitly by the user.
     */
    feedback?:
      | 'customer_service'
      | 'low_quality'
      | 'missing_features'
      | 'other'
      | 'switched_service'
      | 'too_complex'
      | 'too_expensive'
      | 'unused'
      | null;

    /**
     * Why this subscription was canceled.
     */
    reason?: 'cancellation_requested' | 'payment_disputed' | 'payment_failed' | null;
  }

  /**
   * The Pause Collection settings determine how we will pause collection for this
   * subscription and for how long the subscription should be paused.
   */
  export interface PauseCollection {
    /**
     * The payment collection behavior for this subscription while paused. One of
     * `keep_as_draft`, `mark_uncollectible`, or `void`.
     */
    behavior: 'keep_as_draft' | 'mark_uncollectible' | 'void';

    /**
     * The time after which the subscription will resume collecting payments.
     */
    resumes_at?: number | null;
  }

  export interface PaymentSettings {
    payment_method_options?: PaymentSettings.PaymentMethodOptions | null;

    /**
     * The list of payment method types to provide to every invoice created by the
     * subscription. If not set, Stripe attempts to automatically determine the types
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

    /**
     * Configure whether Stripe updates `subscription.default_payment_method` when
     * payment succeeds. Defaults to `off`.
     */
    save_default_payment_method?: 'off' | 'on_subscription' | null;
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
        mandate_options?: Card.MandateOptions;

        /**
         * Selected network to process this Subscription on. Depends on the available
         * networks of the card attached to the Subscription. Can be only set confirm-time.
         */
        network?:
          | 'amex'
          | 'cartes_bancaires'
          | 'diners'
          | 'discover'
          | 'eftpos_au'
          | 'girocard'
          | 'interac'
          | 'jcb'
          | 'link'
          | 'mastercard'
          | 'unionpay'
          | 'unknown'
          | 'visa'
          | null;

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
        export interface MandateOptions {
          /**
           * Amount to be charged for future payments.
           */
          amount?: number | null;

          /**
           * One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact
           * amount to be charged in future payments. If `maximum`, the amount charged can be
           * up to the value passed for the `amount` param.
           */
          amount_type?: 'fixed' | 'maximum' | null;

          /**
           * A description of the mandate or subscription that is meant to be displayed to
           * the customer.
           */
          description?: string | null;
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

  export interface PendingInvoiceItemInterval {
    /**
     * Specifies invoicing frequency. Either `day`, `week`, `month` or `year`.
     */
    interval: 'day' | 'month' | 'week' | 'year';

    /**
     * The number of intervals between invoices. For example, `interval=month` and
     * `interval_count=3` bills every 3 months. Maximum of one year interval allowed (1
     * year, 12 months, or 52 weeks).
     */
    interval_count: number;
  }

  /**
   * Configures how this subscription behaves during the trial period.
   */
  export interface TrialSettings {
    /**
     * Defines how a subscription behaves when a free trial ends.
     */
    end_behavior: TrialSettings.EndBehavior;
  }

  export namespace TrialSettings {
    /**
     * Defines how a subscription behaves when a free trial ends.
     */
    export interface EndBehavior {
      /**
       * Indicates how the subscription should change when the trial ends if the user did
       * not provide a payment method.
       */
      missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
    }
  }
}

export interface SubscriptionBillingThresholds {
  /**
   * Monetary threshold that triggers the subscription to create an invoice
   */
  amount_gte?: number | null;

  /**
   * Indicates if the `billing_cycle_anchor` should be reset when a threshold is
   * reached. If true, `billing_cycle_anchor` will be updated to the date/time the
   * threshold was last reached; otherwise, the value will remain unchanged. This
   * value may not be `true` if the subscription contains items with plans that have
   * `aggregate_usage=last_ever`.
   */
  reset_billing_cycle_anchor?: boolean | null;
}

export interface SubscriptionInvoiceSettings {
  issuer: InvoicesAPI.ConnectAccountReference;

  /**
   * The account tax IDs associated with the subscription. Will be set on invoices
   * generated by the subscription.
   */
  account_tax_ids?: Array<string | CustomersAPI.TaxID | Shared.DeletedTaxID> | null;
}

/**
 * Subscription items allow you to create customer subscriptions with more than one
 * plan, making it easy to represent complex billing relationships.
 */
export interface SubscriptionItem {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * The end time of this subscription item's current billing period.
   */
  current_period_end: number;

  /**
   * The start time of this subscription item's current billing period.
   */
  current_period_start: number;

  /**
   * The discounts applied to the subscription item. Subscription item discounts are
   * applied before subscription discounts. Use `expand[]=discounts` to expand each
   * discount.
   */
  discounts: Array<string | CustomersAPI.Discount>;

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
  object: 'subscription_item';

  /**
   * Prices define the unit cost, currency, and (optional) billing cycle for both
   * recurring and one-time purchases of products.
   * [Products](https://api.stripe.com#products) help you track inventory or
   * provisioning, and prices help you track payment terms. Different physical goods
   * or levels of service should be represented by products, and pricing options
   * should be represented by prices. This approach lets you change prices without
   * having to change your provisioning scheme.
   *
   * For example, you might have a single "gold" product that has prices for
   * $10/month, $100/year, and €9 once.
   *
   * Related guides:
   * [Set up a subscription](https://docs.stripe.com/billing/subscriptions/set-up-subscription),
   * [create an invoice](https://docs.stripe.com/billing/invoices/create), and more
   * about [products and prices](https://docs.stripe.com/products-prices/overview).
   */
  price: PricesAPI.Price;

  /**
   * The `subscription` this `subscription_item` belongs to.
   */
  subscription: string;

  billing_thresholds?: SubscriptionItem.BillingThresholds | null;

  /**
   * The [quantity](https://docs.stripe.com/subscriptions/quantities) of the plan to
   * which the customer should be subscribed.
   */
  quantity?: number;

  /**
   * The tax rates which apply to this `subscription_item`. When set, the
   * `default_tax_rates` on the subscription do not apply to this
   * `subscription_item`.
   */
  tax_rates?: Array<InvoicesAPI.TaxRate> | null;
}

export namespace SubscriptionItem {
  export interface BillingThresholds {
    /**
     * Usage threshold that triggers the subscription to create an invoice
     */
    usage_gte?: number | null;
  }
}

export interface SubscriptionTransferData {
  /**
   * The account where funds from the payment will be transferred to upon payment
   * success.
   */
  destination: string | AccountsAPI.Account;

  /**
   * A non-negative decimal between 0 and 100, with at most two decimal places. This
   * represents the percentage of the subscription invoice total that will be
   * transferred to the destination account. By default, the entire amount is
   * transferred to the destination.
   */
  amount_percent?: number | null;
}

export interface SubscriptionUpdateParams {
  /**
   * A list of prices and quantities that will generate invoice items appended to the
   * next invoice for this subscription. You may pass up to 20 items.
   */
  add_invoice_items?: Array<SubscriptionUpdateParams.AddInvoiceItem>;

  /**
   * A non-negative decimal between 0 and 100, with at most two decimal places. This
   * represents the percentage of the subscription invoice total that will be
   * transferred to the application owner's Stripe account. The request must be made
   * by a platform account on a connected account in order to set an application fee
   * percentage. For more information, see the application fees
   * [documentation](https://stripe.com/docs/connect/subscriptions#collecting-fees-on-subscriptions).
   */
  application_fee_percent?: number | '';

  /**
   * Automatic tax settings for this subscription. We recommend you only include this
   * parameter when the existing value is being changed.
   */
  automatic_tax?: SubscriptionUpdateParams.AutomaticTax;

  /**
   * Either `now` or `unchanged`. Setting the value to `now` resets the
   * subscription's billing cycle anchor to the current time (in UTC). For more
   * information, see the billing cycle
   * [documentation](https://docs.stripe.com/billing/subscriptions/billing-cycle).
   */
  billing_cycle_anchor?: 'now' | 'unchanged';

  /**
   * Define thresholds at which an invoice will be sent, and the subscription
   * advanced to a new billing period. When updating, pass an empty string to remove
   * previously-defined thresholds.
   */
  billing_thresholds?: SubscriptionUpdateParams.BillingThresholdsParam | '';

  /**
   * A timestamp at which the subscription should cancel. If set to a date before the
   * current period ends, this will cause a proration if prorations have been enabled
   * using `proration_behavior`. If set during a future period, this will always
   * cause a proration for that period.
   */
  cancel_at?: '' | 'max_period_end' | 'min_period_end' | number;

  /**
   * Indicate whether this subscription should cancel at the end of the current
   * period (`current_period_end`). Defaults to `false`.
   */
  cancel_at_period_end?: boolean;

  /**
   * Details about why this subscription was cancelled
   */
  cancellation_details?: SubscriptionUpdateParams.CancellationDetails;

  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically,
   * Stripe will attempt to pay this subscription at the end of the cycle using the
   * default source attached to the customer. When sending an invoice, Stripe will
   * email your customer an invoice with payment instructions and mark the
   * subscription as `active`. Defaults to `charge_automatically`.
   */
  collection_method?: 'charge_automatically' | 'send_invoice';

  /**
   * Number of days a customer has to pay invoices generated by this subscription.
   * Valid only for subscriptions where `collection_method` is set to `send_invoice`.
   */
  days_until_due?: number;

  /**
   * ID of the default payment method for the subscription. It must belong to the
   * customer associated with the subscription. This takes precedence over
   * `default_source`. If neither are set, invoices will use the customer's
   * [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method)
   * or
   * [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).
   */
  default_payment_method?: string;

  /**
   * ID of the default payment source for the subscription. It must belong to the
   * customer associated with the subscription and be in a chargeable state. If
   * `default_payment_method` is also set, `default_payment_method` will take
   * precedence. If neither are set, invoices will use the customer's
   * [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method)
   * or
   * [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).
   */
  default_source?: (string & {}) | '';

  /**
   * The tax rates that will apply to any subscription item that does not have
   * `tax_rates` set. Invoices created will have their `default_tax_rates` populated
   * from the subscription. Pass an empty string to remove previously-defined tax
   * rates.
   */
  default_tax_rates?: Array<string> | '';

  /**
   * The subscription's description, meant to be displayable to the customer. Use
   * this field to optionally store an explanation of the subscription for rendering
   * in Stripe surfaces and certain local payment methods UIs.
   */
  description?: (string & {}) | '';

  /**
   * The coupons to redeem into discounts for the subscription. If not specified or
   * empty, inherits the discount from the subscription's customer.
   */
  discounts?: Array<SubscriptionUpdateParams.DiscountsList> | '';

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * All invoices will be billed using the specified settings.
   */
  invoice_settings?: SubscriptionUpdateParams.InvoiceSettings;

  /**
   * A list of up to 20 subscription items, each with an attached price.
   */
  items?: Array<SubscriptionUpdateParams.Item>;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`.
   */
  metadata?: { [key: string]: string } | '';

  /**
   * Indicates if a customer is on or off-session while an invoice payment is
   * attempted. Defaults to `false` (on-session).
   */
  off_session?: boolean;

  /**
   * The account on behalf of which to charge, for each of the subscription's
   * invoices.
   */
  on_behalf_of?: (string & {}) | '';

  /**
   * If specified, payment collection for this subscription will be paused. Note that
   * the subscription status will be unchanged and will not be updated to `paused`.
   * Learn more about
   * [pausing collection](https://docs.stripe.com/billing/subscriptions/pause-payment).
   */
  pause_collection?: SubscriptionUpdateParams.PauseCollectionParam | '';

  /**
   * Use `allow_incomplete` to transition the subscription to `status=past_due` if a
   * payment is required but cannot be paid. This allows you to manage scenarios
   * where additional user actions are needed to pay a subscription's invoice. For
   * example, SCA regulation may require 3DS authentication to complete payment. See
   * the
   * [SCA Migration Guide](https://docs.stripe.com/billing/migration/strong-customer-authentication)
   * for Billing to learn more. This is the default behavior.
   *
   * Use `default_incomplete` to transition the subscription to `status=past_due`
   * when payment is required and await explicit confirmation of the invoice's
   * payment intent. This allows simpler management of scenarios where additional
   * user actions are needed to pay a subscription’s invoice. Such as failed
   * payments,
   * [SCA regulation](https://docs.stripe.com/billing/migration/strong-customer-authentication),
   * or collecting a mandate for a bank debit payment method.
   *
   * Use `pending_if_incomplete` to update the subscription using
   * [pending updates](https://docs.stripe.com/billing/subscriptions/pending-updates).
   * When you use `pending_if_incomplete` you can only pass the parameters
   * [supported by pending updates](https://docs.stripe.com/billing/pending-updates-reference#supported-attributes).
   *
   * Use `error_if_incomplete` if you want Stripe to return an HTTP 402 status code
   * if a subscription's invoice cannot be paid. For example, if a payment method
   * requires 3DS authentication due to SCA regulation and further user action is
   * needed, this parameter does not update the subscription and returns an error
   * instead. This was the default behavior for API versions prior to 2019-03-14. See
   * the [changelog](https://docs.stripe.com/changelog/2019-03-14) to learn more.
   */
  payment_behavior?:
    | 'allow_incomplete'
    | 'default_incomplete'
    | 'error_if_incomplete'
    | 'pending_if_incomplete';

  /**
   * Payment settings to pass to invoices created by the subscription.
   */
  payment_settings?: SubscriptionUpdateParams.PaymentSettings;

  /**
   * Specifies an interval for how often to bill for any pending invoice items. It is
   * analogous to calling
   * [Create an invoice](https://docs.stripe.com/api#create_invoice) for the given
   * subscription at the specified interval.
   */
  pending_invoice_item_interval?: SubscriptionUpdateParams.PendingInvoiceItemIntervalParams | '';

  /**
   * Determines how to handle
   * [prorations](https://docs.stripe.com/billing/subscriptions/prorations) when the
   * billing cycle changes (e.g., when switching plans, resetting
   * `billing_cycle_anchor=now`, or starting a trial), or if an item's `quantity`
   * changes. The default value is `create_prorations`.
   */
  proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';

  /**
   * If set, prorations will be calculated as though the subscription was updated at
   * the given time. This can be used to apply exactly the same prorations that were
   * previewed with the
   * [create preview](https://stripe.com/docs/api/invoices/create_preview) endpoint.
   * `proration_date` can also be used to implement custom proration logic, such as
   * prorating by day instead of by second, by providing the time that you wish to
   * use for proration calculations.
   */
  proration_date?: number;

  /**
   * If specified, the funds from the subscription's invoices will be transferred to
   * the destination and the ID of the resulting transfers will be found on the
   * resulting charges. This will be unset if you POST an empty value.
   */
  transfer_data?: SubscriptionUpdateParams.TransferDataSpecs | '';

  /**
   * Unix timestamp representing the end of the trial period the customer will get
   * before being charged for the first time. This will always overwrite any trials
   * that might apply via a subscribed plan. If set, `trial_end` will override the
   * default trial period of the plan the customer is being subscribed to. The
   * `billing_cycle_anchor` will be updated to the `trial_end` value. The special
   * value `now` can be provided to end the customer's trial immediately. Can be at
   * most two years from `billing_cycle_anchor`.
   */
  trial_end?: 'now' | number;

  /**
   * Indicates if a plan's `trial_period_days` should be applied to the subscription.
   * Setting `trial_end` per subscription is preferred, and this defaults to `false`.
   * Setting this flag to `true` together with `trial_end` is not allowed. See
   * [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials)
   * to learn more.
   */
  trial_from_plan?: boolean;

  /**
   * Settings related to subscription trials.
   */
  trial_settings?: SubscriptionUpdateParams.TrialSettings;
}

export namespace SubscriptionUpdateParams {
  export interface AddInvoiceItem {
    discounts?: Array<AddInvoiceItem.Discount>;

    metadata?: { [key: string]: string };

    period?: AddInvoiceItem.Period;

    price?: string;

    price_data?: AddInvoiceItem.PriceData;

    quantity?: number;

    tax_rates?: Array<string> | '';
  }

  export namespace AddInvoiceItem {
    export interface Discount {
      coupon?: string;

      discount?: string;

      promotion_code?: string;
    }

    export interface Period {
      end: Period.End;

      start: Period.Start;
    }

    export namespace Period {
      export interface End {
        type: 'min_item_period_end' | 'timestamp';

        timestamp?: number;
      }

      export interface Start {
        type: 'max_item_period_start' | 'now' | 'timestamp';

        timestamp?: number;
      }
    }

    export interface PriceData {
      currency: string;

      product: string;

      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';

      unit_amount?: number;

      unit_amount_decimal?: string;
    }
  }

  /**
   * Automatic tax settings for this subscription. We recommend you only include this
   * parameter when the existing value is being changed.
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

  export interface BillingThresholdsParam {
    amount_gte?: number;

    reset_billing_cycle_anchor?: boolean;
  }

  /**
   * Details about why this subscription was cancelled
   */
  export interface CancellationDetails {
    comment?: (string & {}) | '';

    feedback?:
      | ''
      | 'customer_service'
      | 'low_quality'
      | 'missing_features'
      | 'other'
      | 'switched_service'
      | 'too_complex'
      | 'too_expensive'
      | 'unused';
  }

  export interface DiscountsList {
    coupon?: string;

    discount?: string;

    promotion_code?: string;
  }

  /**
   * All invoices will be billed using the specified settings.
   */
  export interface InvoiceSettings {
    account_tax_ids?: Array<string> | '';

    issuer?: InvoiceSettings.Issuer;
  }

  export namespace InvoiceSettings {
    export interface Issuer {
      type: 'account' | 'self';

      account?: string;
    }
  }

  export interface Item {
    id?: string;

    billing_thresholds?: Item.ItemBillingThresholdsParam | '';

    clear_usage?: boolean;

    deleted?: boolean;

    discounts?: Array<Item.DiscountsList> | '';

    metadata?: { [key: string]: string } | '';

    price?: string;

    price_data?: Item.PriceData;

    quantity?: number;

    tax_rates?: Array<string> | '';
  }

  export namespace Item {
    export interface ItemBillingThresholdsParam {
      usage_gte: number;
    }

    export interface DiscountsList {
      coupon?: string;

      discount?: string;

      promotion_code?: string;
    }

    export interface PriceData {
      currency: string;

      product: string;

      recurring: PriceData.Recurring;

      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';

      unit_amount?: number;

      unit_amount_decimal?: string;
    }

    export namespace PriceData {
      export interface Recurring {
        interval: 'day' | 'month' | 'week' | 'year';

        interval_count?: number;
      }
    }
  }

  export interface PauseCollectionParam {
    behavior: 'keep_as_draft' | 'mark_uncollectible' | 'void';

    resumes_at?: number;
  }

  /**
   * Payment settings to pass to invoices created by the subscription.
   */
  export interface PaymentSettings {
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

    save_default_payment_method?: 'off' | 'on_subscription';
  }

  export namespace PaymentSettings {
    export interface PaymentMethodOptions {
      acss_debit?: PaymentMethodOptions.InvoicePaymentMethodOptionsParam | '';

      bancontact?: PaymentMethodOptions.InvoicePaymentMethodOptionsParam | '';

      card?: PaymentMethodOptions.SubscriptionPaymentMethodOptionsParam | '';

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

      export interface SubscriptionPaymentMethodOptionsParam {
        mandate_options?: SubscriptionPaymentMethodOptionsParam.MandateOptions;

        network?:
          | 'amex'
          | 'cartes_bancaires'
          | 'diners'
          | 'discover'
          | 'eftpos_au'
          | 'girocard'
          | 'interac'
          | 'jcb'
          | 'link'
          | 'mastercard'
          | 'unionpay'
          | 'unknown'
          | 'visa';

        request_three_d_secure?: 'any' | 'automatic' | 'challenge';
      }

      export namespace SubscriptionPaymentMethodOptionsParam {
        export interface MandateOptions {
          amount?: number;

          amount_type?: 'fixed' | 'maximum';

          description?: string;
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

  export interface PendingInvoiceItemIntervalParams {
    interval: 'day' | 'month' | 'week' | 'year';

    interval_count?: number;
  }

  export interface TransferDataSpecs {
    destination: string;

    amount_percent?: number;
  }

  /**
   * Settings related to subscription trials.
   */
  export interface TrialSettings {
    end_behavior: TrialSettings.EndBehavior;
  }

  export namespace TrialSettings {
    export interface EndBehavior {
      missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
    }
  }
}

export interface SubscriptionListParams extends MyCursorIDPageParams {
  /**
   * Filter subscriptions by their automatic tax settings.
   */
  automatic_tax?: SubscriptionListParams.AutomaticTax;

  /**
   * The collection method of the subscriptions to retrieve. Either
   * `charge_automatically` or `send_invoice`.
   */
  collection_method?: 'charge_automatically' | 'send_invoice';

  /**
   * Only return subscriptions that were created during the given date interval.
   */
  created?: SubscriptionListParams.RangeQuerySpecs | number;

  /**
   * Only return subscriptions whose minimum item current_period_end falls within the
   * given date interval.
   */
  current_period_end?: SubscriptionListParams.RangeQuerySpecs | number;

  /**
   * Only return subscriptions whose maximum item current_period_start falls within
   * the given date interval.
   */
  current_period_start?: SubscriptionListParams.RangeQuerySpecs | number;

  /**
   * The ID of the customer whose subscriptions you're retrieving.
   */
  customer?: string;

  /**
   * The ID of the account representing the customer whose subscriptions you're
   * retrieving.
   */
  customer_account?: string;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * Filter for subscriptions that contain this recurring price ID.
   */
  price?: string;

  /**
   * The status of the subscriptions to retrieve. Passing in a value of `canceled`
   * will return all canceled subscriptions, including those belonging to deleted
   * customers. Pass `ended` to find subscriptions that are canceled and
   * subscriptions that are expired due to
   * [incomplete payment](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses).
   * Passing in a value of `all` will return subscriptions of all statuses. If no
   * value is supplied, all subscriptions that have not been canceled are returned.
   */
  status?:
    | 'active'
    | 'all'
    | 'canceled'
    | 'ended'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';

  /**
   * Filter for subscriptions that are associated with the specified test clock. The
   * response will not include subscriptions with test clocks if this and the
   * customer parameter is not set.
   */
  test_clock?: string;
}

export namespace SubscriptionListParams {
  /**
   * Filter subscriptions by their automatic tax settings.
   */
  export interface AutomaticTax {
    enabled: boolean;
  }

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

  export interface RangeQuerySpecs {
    gt?: number;

    gte?: number;

    lt?: number;

    lte?: number;
  }
}

export interface SubscriptionCancelParams {
  /**
   * Details about why this subscription was cancelled
   */
  cancellation_details?: SubscriptionCancelParams.CancellationDetails;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * Will generate a final invoice that invoices for any un-invoiced metered usage
   * and new/pending proration invoice items. Defaults to `false`.
   */
  invoice_now?: boolean;

  /**
   * Will generate a proration invoice item that credits remaining unused time until
   * the subscription period end. Defaults to `false`.
   */
  prorate?: boolean;
}

export namespace SubscriptionCancelParams {
  /**
   * Details about why this subscription was cancelled
   */
  export interface CancellationDetails {
    comment?: (string & {}) | '';

    feedback?:
      | ''
      | 'customer_service'
      | 'low_quality'
      | 'missing_features'
      | 'other'
      | 'switched_service'
      | 'too_complex'
      | 'too_expensive'
      | 'unused';
  }
}

export declare namespace Subscriptions {
  export {
    type AutomaticTaxSubscription as AutomaticTaxSubscription,
    type DefaultSettings as DefaultSettings,
    type DefaultSettingsAutomaticTax as DefaultSettingsAutomaticTax,
    type Mandate as Mandate,
    type PaymentMethodDetailsBancontactSetupAttempt as PaymentMethodDetailsBancontactSetupAttempt,
    type PaymentMethodDetailsIdealSetupAttempt as PaymentMethodDetailsIdealSetupAttempt,
    type PaymentMethodDetailsSofortSetupAttempt as PaymentMethodDetailsSofortSetupAttempt,
    type PendingUpdate as PendingUpdate,
    type PhaseAutomaticTax as PhaseAutomaticTax,
    type Schedule as Schedule,
    type ScheduleAddInvoiceItem as ScheduleAddInvoiceItem,
    type ScheduleConfigurationItem as ScheduleConfigurationItem,
    type SchedulePhaseConfiguration as SchedulePhaseConfiguration,
    type SchedulePhaseSetting as SchedulePhaseSetting,
    type ScheduleSetting as ScheduleSetting,
    type SetupAttempt as SetupAttempt,
    type SetupAttemptPaymentMethodDetails as SetupAttemptPaymentMethodDetails,
    type SetupAttemptPaymentMethodDetailsCardPresent as SetupAttemptPaymentMethodDetailsCardPresent,
    type SetupIntent as SetupIntent,
    type SetupIntentPaymentMethodOptionsMandateOptionsPayto as SetupIntentPaymentMethodOptionsMandateOptionsPayto,
    type SetupIntentTypeSpecificPaymentMethodOptionsClient as SetupIntentTypeSpecificPaymentMethodOptionsClient,
    type StackableDiscount as StackableDiscount,
    type Subscription as Subscription,
    type SubscriptionBillingThresholds as SubscriptionBillingThresholds,
    type SubscriptionInvoiceSettings as SubscriptionInvoiceSettings,
    type SubscriptionItem as SubscriptionItem,
    type SubscriptionTransferData as SubscriptionTransferData,
    type SubscriptionsMyCursorIDPage as SubscriptionsMyCursorIDPage,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionCancelParams as SubscriptionCancelParams,
  };
}
