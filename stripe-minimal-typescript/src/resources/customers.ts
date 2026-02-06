// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CustomersAPI from './customers';
import * as AccountsAPI from './accounts';
import * as CouponsAPI from './coupons';
import * as InvoicesAPI from './invoices';
import * as Shared from './shared';
import * as SubscriptionsAPI from './subscriptions';
import { APIPromise } from '../core/api-promise';
import { MyCursorIDPage, type MyCursorIDPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Customers extends APIResource {
  /**
   * <p>Creates a new customer object.</p>
   */
  create(body: CustomerCreateParams | null | undefined = {}, options?: RequestOptions): APIPromise<Customer> {
    return this._client.post('/v1/customers', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * <p>Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.</p>
   */
  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CustomersMyCursorIDPage, Customer> {
    return this._client.getAPIList('/v1/customers', MyCursorIDPage<Customer>, { query, ...options });
  }
}

export type CustomersMyCursorIDPage = MyCursorIDPage<Customer>;

/**
 * These bank accounts are payment methods on `Customer` objects.
 *
 * On the other hand [External Accounts](/api#external_accounts) are transfer
 * destinations on `Account` objects for connected accounts. They can be bank
 * accounts or debit cards as well, and are documented in the links above.
 *
 * Related guide: [Bank debits and transfers](/payments/bank-debits-transfers)
 */
export interface BankAccount {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Two-letter ISO code representing the country the bank account is located in.
   */
  country: string;

  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid
   * out to the bank account.
   */
  currency: string;

  /**
   * The last four digits of the bank account number.
   */
  last4: string;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'bank_account';

  /**
   * For bank accounts, possible values are `new`, `validated`, `verified`,
   * `verification_failed`, `tokenized_account_number_deactivated` or `errored`. A
   * bank account that hasn't had any activity or validation performed is `new`. If
   * Stripe can determine that the bank account exists, its status will be
   * `validated`. Note that there often isn’t enough information to know (e.g., for
   * smaller credit unions), and the validation is not always run. If customer bank
   * account verification has succeeded, the bank account status will be `verified`.
   * If the verification failed for any reason, such as microdeposit failure, the
   * status will be `verification_failed`. If the status is
   * `tokenized_account_number_deactivated`, the account utilizes a tokenized account
   * number which has been deactivated due to expiration or revocation. This account
   * will need to be reverified to continue using it for money movement. If a payout
   * sent to this bank account fails, we'll set the status to `errored` and will not
   * continue to send
   * [scheduled payouts](https://stripe.com/docs/payouts#payout-schedule) until the
   * bank details are updated.
   *
   * For external accounts, possible values are `new`, `errored`,
   * `verification_failed`, and `tokenized_account_number_deactivated`. If a payout
   * fails, the status is set to `errored` and scheduled payouts are stopped until
   * account details are updated. In the US and India, if we can't
   * [verify the owner of the bank account](https://support.stripe.com/questions/bank-account-ownership-verification),
   * we'll set the status to `verification_failed`. Other validations aren't run
   * against external accounts because they're only used for payouts. This means the
   * other statuses don't apply.
   */
  status: string;

  /**
   * The account this bank account belongs to. Only applicable on Accounts (not
   * customers or recipients) This property is only available when returned as an
   * [External Account](/api/external_account_bank_accounts/object) where
   * [controller.is_controller](/api/accounts/object#account_object-controller-is_controller)
   * is `true`.
   */
  account?: string | AccountsAPI.Account | null;

  /**
   * The name of the person or business that owns the bank account.
   */
  account_holder_name?: string | null;

  /**
   * The type of entity that holds the account. This can be either `individual` or
   * `company`.
   */
  account_holder_type?: string | null;

  /**
   * The bank account type. This can only be `checking` or `savings` in most
   * countries. In Japan, this can only be `futsu` or `toza`.
   */
  account_type?: string | null;

  /**
   * A set of available payout methods for this bank account. Only values from this
   * set should be passed as the `method` when creating a payout.
   */
  available_payout_methods?: Array<'instant' | 'standard'> | null;

  /**
   * Name of the bank associated with the routing number (e.g., `WELLS FARGO`).
   */
  bank_name?: string | null;

  /**
   * The ID of the customer that the bank account is associated with.
   */
  customer?: string | Customer | Shared.DeletedCustomer | null;

  /**
   * Whether this bank account is the default external account for its currency.
   */
  default_for_currency?: boolean | null;

  /**
   * Uniquely identifies this particular bank account. You can use this attribute to
   * check whether two bank accounts are the same.
   */
  fingerprint?: string | null;

  future_requirements?: BankAccount.FutureRequirements | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  requirements?: BankAccount.Requirements | null;

  /**
   * The routing transit number for the bank account.
   */
  routing_number?: string | null;
}

export namespace BankAccount {
  export interface FutureRequirements {
    /**
     * Fields that need to be resolved to keep the external account enabled. If not
     * resolved by `current_deadline`, these fields will appear in `past_due` as well,
     * and the account is disabled.
     */
    currently_due?: Array<string> | null;

    /**
     * Details about validation and verification failures for `due` requirements that
     * must be resolved.
     */
    errors?: Array<Shared.AccountRequirementsError> | null;

    /**
     * Fields that haven't been resolved by `current_deadline`. These fields need to be
     * resolved to enable the external account.
     */
    past_due?: Array<string> | null;

    /**
     * Fields that are being reviewed, or might become required depending on the
     * results of a review. If the review fails, these fields can move to
     * `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might
     * appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in
     * `pending_verification` if one verification fails but another is still pending.
     */
    pending_verification?: Array<string> | null;
  }

  export interface Requirements {
    /**
     * Fields that need to be resolved to keep the external account enabled. If not
     * resolved by `current_deadline`, these fields will appear in `past_due` as well,
     * and the account is disabled.
     */
    currently_due?: Array<string> | null;

    /**
     * Details about validation and verification failures for `due` requirements that
     * must be resolved.
     */
    errors?: Array<Shared.AccountRequirementsError> | null;

    /**
     * Fields that haven't been resolved by `current_deadline`. These fields need to be
     * resolved to enable the external account.
     */
    past_due?: Array<string> | null;

    /**
     * Fields that are being reviewed, or might become required depending on the
     * results of a review. If the review fails, these fields can move to
     * `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might
     * appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in
     * `pending_verification` if one verification fails but another is still pending.
     */
    pending_verification?: Array<string> | null;
  }
}

/**
 * You can store multiple cards on a customer in order to charge the customer
 * later. You can also store multiple debit cards on a recipient in order to
 * transfer to those cards later.
 *
 * Related guide:
 * [Card payments with Sources](https://docs.stripe.com/sources/cards)
 */
export interface Card {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Card brand. Can be `American Express`, `Cartes Bancaires`, `Diners Club`,
   * `Discover`, `Eftpos Australia`, `Girocard`, `JCB`, `MasterCard`, `UnionPay`,
   * `Visa`, or `Unknown`.
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

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'card';

  /**
   * This is an object representing a Stripe account. You can retrieve it to see
   * properties on the account like its current requirements or if the account is
   * enabled to make live charges or receive payouts.
   *
   * For accounts where
   * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
   * is `application`, which includes Custom accounts, the properties below are
   * always returned.
   *
   * For accounts where
   * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
   * is `stripe`, which includes Standard and Express accounts, some properties are
   * only returned until you create an [Account Link](/api/account_links) or
   * [Account Session](/api/account_sessions) to start Connect Onboarding. Learn
   * about the [differences between accounts](/connect/accounts).
   */
  account?: string | AccountsAPI.Account | null;

  /**
   * City/District/Suburb/Town/Village.
   */
  address_city?: string | null;

  /**
   * Billing address country, if provided when creating card.
   */
  address_country?: string | null;

  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  address_line1?: string | null;

  /**
   * If `address_line1` was provided, results of the check: `pass`, `fail`,
   * `unavailable`, or `unchecked`.
   */
  address_line1_check?: string | null;

  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  address_line2?: string | null;

  /**
   * State/County/Province/Region.
   */
  address_state?: string | null;

  /**
   * ZIP or postal code.
   */
  address_zip?: string | null;

  /**
   * If `address_zip` was provided, results of the check: `pass`, `fail`,
   * `unavailable`, or `unchecked`.
   */
  address_zip_check?: string | null;

  /**
   * This field indicates whether this payment method can be shown again to its
   * customer in a checkout flow. Stripe products such as Checkout and Elements use
   * this field to determine whether a payment method can be shown as a saved payment
   * method in a checkout flow. The field defaults to “unspecified”.
   */
  allow_redisplay?: 'always' | 'limited' | 'unspecified' | null;

  /**
   * A set of available payout methods for this card. Only values from this set
   * should be passed as the `method` when creating a payout.
   */
  available_payout_methods?: Array<'instant' | 'standard'> | null;

  /**
   * Two-letter ISO code representing the country of the card. You could use this
   * attribute to get a sense of the international breakdown of cards you've
   * collected.
   */
  country?: string | null;

  /**
   * Three-letter
   * [ISO code for currency](https://www.iso.org/iso-4217-currency-codes.html) in
   * lowercase. Must be a [supported currency](https://docs.stripe.com/currencies).
   * Only applicable on accounts (not customers or recipients). The card can be used
   * as a transfer destination for funds in this currency. This property is only
   * available when returned as an
   * [External Account](/api/external_account_cards/object) where
   * [controller.is_controller](/api/accounts/object#account_object-controller-is_controller)
   * is `true`.
   */
  currency?: string | null;

  /**
   * The customer that this card belongs to. This attribute will not be in the card
   * object if the card belongs to an account or recipient instead.
   */
  customer?: string | Customer | Shared.DeletedCustomer | null;

  /**
   * If a CVC was provided, results of the check: `pass`, `fail`, `unavailable`, or
   * `unchecked`. A result of unchecked indicates that CVC was provided but hasn't
   * been checked yet. Checks are typically performed when attaching a card to a
   * Customer object, or when creating a charge. For more details, see
   * [Check if a card is valid without a charge](https://support.stripe.com/questions/check-if-a-card-is-valid-without-a-charge).
   */
  cvc_check?: string | null;

  /**
   * Whether this card is the default external account for its currency. This
   * property is only available for accounts where
   * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
   * is `application`, which includes Custom accounts.
   */
  default_for_currency?: boolean | null;

  /**
   * (For tokenized numbers only.) The last four digits of the device account number.
   */
  dynamic_last4?: string | null;

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
  iin?: string;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Cardholder name.
   */
  name?: string | null;

  networks?: Card.Networks;

  /**
   * Status of a card based on the card issuer.
   */
  regulated_status?: 'regulated' | 'unregulated' | null;

  /**
   * For external accounts that are cards, possible values are `new` and `errored`.
   * If a payout fails, the status is set to `errored` and
   * [scheduled payouts](https://stripe.com/docs/payouts#payout-schedule) are stopped
   * until account details are updated.
   */
  status?: string | null;

  /**
   * If the card number is tokenized, this is the method that was used. Can be
   * `android_pay` (includes Google Pay), `apple_pay`, `masterpass`, `visa_checkout`,
   * or null.
   */
  tokenization_method?: string | null;
}

export namespace Card {
  export interface Networks {
    /**
     * The preferred network for co-branded cards. Can be `cartes_bancaires`,
     * `mastercard`, `visa` or `invalid_preference` if requested network is not valid
     * for the card.
     */
    preferred?: string | null;
  }
}

/**
 * This object represents a customer of your business. Use it to
 * [create recurring charges](https://docs.stripe.com/invoicing/customer),
 * [save payment](https://docs.stripe.com/payments/save-during-payment) and contact
 * information, and track payments that belong to the same customer.
 */
export interface Customer {
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
  object: 'customer';

  address?: Shared.Address | null;

  /**
   * The current balance, if any, that's stored on the customer in their default
   * currency. If negative, the customer has credit to apply to their next invoice.
   * If positive, the customer has an amount owed that's added to their next invoice.
   * The balance only considers amounts that Stripe hasn't successfully applied to
   * any invoice. It doesn't reflect unpaid invoices. This balance is only taken into
   * account after invoices finalize. For multi-currency balances, see
   * [invoice_credit_balance](https://docs.stripe.com/api/customers/object#customer_object-invoice_credit_balance).
   */
  balance?: number;

  /**
   * The customer's business name.
   */
  business_name?: string;

  /**
   * A customer's `Cash balance` represents real funds. Customers can add funds to
   * their cash balance by sending a bank transfer. These funds can be used for
   * payment and can eventually be paid out to your bank account.
   */
  cash_balance?: Customer.CashBalance | null;

  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) the
   * customer can be charged in for recurring billing purposes.
   */
  currency?: string | null;

  /**
   * The ID of an Account representing a customer. You can use this ID with any v1
   * API that accepts a customer_account parameter.
   */
  customer_account?: string | null;

  /**
   * ID of the default payment source for the customer.
   *
   * If you use payment methods created through the PaymentMethods API, see the
   * [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method)
   * field instead.
   */
  default_source?: string | BankAccount | Card | Shared.Source | null;

  /**
   * Tracks the most recent state change on any invoice belonging to the customer.
   * Paying an invoice or marking it uncollectible via the API will set this field to
   * false. An automatic payment failure or passing the `invoice.due_date` will set
   * this field to `true`.
   *
   * If an invoice becomes uncollectible by
   * [dunning](https://docs.stripe.com/billing/automatic-collection), `delinquent`
   * doesn't reset to `false`.
   *
   * If you care whether the customer has paid their most recent subscription
   * invoice, use `subscription.status` instead. Paying or marking uncollectible any
   * customer invoice regardless of whether it is the latest invoice for a
   * subscription will always set this field to `false`.
   */
  delinquent?: boolean | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * A discount represents the actual application of a
   * [coupon](https://api.stripe.com#coupons) or
   * [promotion code](https://api.stripe.com#promotion_codes). It contains
   * information about when the discount began, when it will end, and what it is
   * applied to.
   *
   * Related guide:
   * [Applying discounts to subscriptions](https://docs.stripe.com/billing/subscriptions/discounts)
   */
  discount?: Discount | null;

  /**
   * The customer's email address.
   */
  email?: string | null;

  /**
   * The customer's individual name.
   */
  individual_name?: string;

  /**
   * The current multi-currency balances, if any, that's stored on the customer. If
   * positive in a currency, the customer has a credit to apply to their next invoice
   * denominated in that currency. If negative, the customer has an amount owed
   * that's added to their next invoice denominated in that currency. These balances
   * don't apply to unpaid invoices. They solely track amounts that Stripe hasn't
   * successfully applied to any invoice. Stripe only applies a balance in a specific
   * currency to an invoice after that invoice (which is in the same currency)
   * finalizes.
   */
  invoice_credit_balance?: { [key: string]: number };

  /**
   * The prefix for the customer used to generate unique invoice numbers.
   */
  invoice_prefix?: string | null;

  invoice_settings?: InvoiceSetting;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string };

  /**
   * The customer's full name or business name.
   */
  name?: string | null;

  /**
   * The suffix of the customer's next invoice number (for example, 0001). When the
   * account uses account level sequencing, this parameter is ignored in API requests
   * and the field omitted in API responses.
   */
  next_invoice_sequence?: number;

  /**
   * The customer's phone number.
   */
  phone?: string | null;

  /**
   * The customer's preferred locales (languages), ordered by preference.
   */
  preferred_locales?: Array<string> | null;

  shipping?: Shared.Shipping | null;

  /**
   * The customer's payment sources, if any.
   */
  sources?: Customer.Sources;

  /**
   * The customer's current subscriptions, if any.
   */
  subscriptions?: Customer.Subscriptions;

  tax?: Customer.Tax;

  /**
   * Describes the customer's tax exemption status, which is `none`, `exempt`, or
   * `reverse`. When set to `reverse`, invoice and receipt PDFs include the following
   * text: **"Reverse charge"**.
   */
  tax_exempt?: 'exempt' | 'none' | 'reverse' | null;

  /**
   * The customer's tax IDs.
   */
  tax_ids?: Customer.TaxIDs;

  /**
   * ID of the test clock that this customer belongs to.
   */
  test_clock?: string | Shared.TestHelpersTestClock | null;
}

export namespace Customer {
  /**
   * A customer's `Cash balance` represents real funds. Customers can add funds to
   * their cash balance by sending a bank transfer. These funds can be used for
   * payment and can eventually be paid out to your bank account.
   */
  export interface CashBalance {
    /**
     * The ID of the customer whose cash balance this object represents.
     */
    customer: string;

    /**
     * Has the value `true` if the object exists in live mode or the value `false` if
     * the object exists in test mode.
     */
    livemode: boolean;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value.
     */
    object: 'cash_balance';

    settings: CashBalance.Settings;

    /**
     * A hash of all cash balances available to this customer. You cannot delete a
     * customer with any cash balances, even if the balance is 0. Amounts are
     * represented in the
     * [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).
     */
    available?: { [key: string]: number } | null;

    /**
     * The ID of an Account representing a customer whose cash balance this object
     * represents.
     */
    customer_account?: string | null;
  }

  export namespace CashBalance {
    export interface Settings {
      /**
       * The configuration for how funds that land in the customer cash balance are
       * reconciled.
       */
      reconciliation_mode: 'automatic' | 'manual';

      /**
       * A flag to indicate if reconciliation mode returned is the user's default or is
       * specific to this customer cash balance
       */
      using_merchant_default: boolean;
    }
  }

  /**
   * The customer's payment sources, if any.
   */
  export interface Sources {
    /**
     * Details about each object.
     */
    data: Array<CustomersAPI.BankAccount | CustomersAPI.Card | Shared.Source>;

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

  /**
   * The customer's current subscriptions, if any.
   */
  export interface Subscriptions {
    /**
     * Details about each object.
     */
    data: Array<SubscriptionsAPI.Subscription>;

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

  export interface Tax {
    /**
     * Surfaces if automatic tax computation is possible given the current customer
     * location information.
     */
    automatic_tax: 'failed' | 'not_collecting' | 'supported' | 'unrecognized_location';

    /**
     * The tax calculation provider used for location resolution. Defaults to `stripe`
     * when not using a [third-party provider](/tax/third-party-apps).
     */
    provider: 'anrok' | 'avalara' | 'sphere' | 'stripe';

    /**
     * A recent IP address of the customer used for tax reporting and tax location
     * inference.
     */
    ip_address?: string | null;

    location?: Tax.Location | null;
  }

  export namespace Tax {
    export interface Location {
      /**
       * The identified tax country of the customer.
       */
      country: string;

      /**
       * The data source used to infer the customer's location.
       */
      source: 'billing_address' | 'ip_address' | 'payment_method' | 'shipping_destination';

      /**
       * The identified tax state, county, province, or region of the customer.
       */
      state?: string | null;
    }
  }

  /**
   * The customer's tax IDs.
   */
  export interface TaxIDs {
    /**
     * Details about each object.
     */
    data: Array<CustomersAPI.TaxID>;

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
 * A discount represents the actual application of a
 * [coupon](https://api.stripe.com#coupons) or
 * [promotion code](https://api.stripe.com#promotion_codes). It contains
 * information about when the discount began, when it will end, and what it is
 * applied to.
 *
 * Related guide:
 * [Applying discounts to subscriptions](https://docs.stripe.com/billing/subscriptions/discounts)
 */
export interface Discount {
  /**
   * The ID of the discount object. Discounts cannot be fetched by ID. Use
   * `expand[]=discounts` in API calls to expand discount IDs in an array.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'discount';

  source: Discount.Source;

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
  customer?: string | Customer | Shared.DeletedCustomer | null;

  /**
   * The ID of the account representing the customer associated with this discount.
   */
  customer_account?: string | null;

  /**
   * If the coupon has a duration of `repeating`, the date that this discount will
   * end. If the coupon has a duration of `once` or `forever`, this attribute will be
   * null.
   */
  end?: number | null;

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
  promotion_code?: string | PromotionCode | null;

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

export namespace Discount {
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

export interface InvoiceSetting {
  /**
   * Default custom fields to be displayed on invoices for this customer.
   */
  custom_fields?: Array<Shared.InvoiceSettingCustomField> | null;

  /**
   * ID of a payment method that's attached to the customer, to be used as the
   * customer's default payment method for subscriptions and invoices.
   */
  default_payment_method?: string | InvoicesAPI.PaymentMethod | null;

  /**
   * Default footer to be displayed on invoices for this customer.
   */
  footer?: string | null;

  rendering_options?: InvoiceSetting.RenderingOptions | null;
}

export namespace InvoiceSetting {
  export interface RenderingOptions {
    /**
     * How line-item prices and amounts will be displayed with respect to tax on
     * invoice PDFs.
     */
    amount_tax_display?: string | null;

    /**
     * ID of the invoice rendering template to be used for this customer's invoices. If
     * set, the template will be used on all invoices for this customer unless a
     * template is set directly on the invoice.
     */
    template?: string | null;
  }
}

/**
 * A Promotion Code represents a customer-redeemable code for an underlying
 * promotion. You can create multiple codes for a single promotion.
 *
 * If you enable promotion codes in your
 * [customer portal configuration](https://docs.stripe.com/customer-management/configure-portal),
 * then customers can redeem a code themselves when updating a subscription in the
 * portal. Customers can also view the currently active promotion codes and coupons
 * on each of their subscriptions in the portal.
 */
export interface PromotionCode {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Whether the promotion code is currently active. A promotion code is only active
   * if the coupon is also valid.
   */
  active: boolean;

  /**
   * The customer-facing code. Regardless of case, this code must be unique across
   * all active promotion codes for each customer. Valid characters are lower case
   * letters (a-z), upper case letters (A-Z), and digits (0-9).
   */
  code: string;

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
  object: 'promotion_code';

  promotion: PromotionCode.Promotion;

  restrictions: PromotionCode.Restrictions;

  /**
   * Number of times this promotion code has been used.
   */
  times_redeemed: number;

  /**
   * The customer who can use this promotion code.
   */
  customer?: string | Customer | Shared.DeletedCustomer | null;

  /**
   * The account representing the customer who can use this promotion code.
   */
  customer_account?: string | null;

  /**
   * Date at which the promotion code can no longer be redeemed.
   */
  expires_at?: number | null;

  /**
   * Maximum number of times this promotion code can be redeemed.
   */
  max_redemptions?: number | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;
}

export namespace PromotionCode {
  export interface Promotion {
    /**
     * The type of promotion.
     */
    type: 'coupon';

    /**
     * If promotion `type` is `coupon`, the coupon for this promotion.
     */
    coupon?: string | CouponsAPI.Coupon | null;
  }

  export interface Restrictions {
    /**
     * A Boolean indicating if the Promotion Code should only be redeemed for Customers
     * without any successful payments or invoices
     */
    first_time_transaction: boolean;

    /**
     * Promotion code restrictions defined in each available currency option. Each key
     * must be a three-letter
     * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a
     * [supported currency](https://stripe.com/docs/currencies).
     */
    currency_options?: { [key: string]: Restrictions.CurrencyOptions };

    /**
     * Minimum amount required to redeem this Promotion Code into a Coupon (e.g., a
     * purchase must be $100 or more to work).
     */
    minimum_amount?: number | null;

    /**
     * Three-letter [ISO code](https://stripe.com/docs/currencies) for minimum_amount
     */
    minimum_amount_currency?: string | null;
  }

  export namespace Restrictions {
    export interface CurrencyOptions {
      /**
       * Minimum amount required to redeem this Promotion Code into a Coupon (e.g., a
       * purchase must be $100 or more to work).
       */
      minimum_amount: number;
    }
  }
}

/**
 * You can add one or multiple tax IDs to a
 * [customer](https://docs.stripe.com/api/customers) or account. Customer and
 * account tax IDs get displayed on related invoices and credit notes.
 *
 * Related guides:
 * [Customer tax identification numbers](https://docs.stripe.com/billing/taxes/tax-ids),
 * [Account tax IDs](https://docs.stripe.com/invoicing/connect#account-tax-ids)
 */
export interface TaxID {
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
  object: 'tax_id';

  /**
   * Type of the tax ID, one of `ad_nrt`, `ae_trn`, `al_tin`, `am_tin`, `ao_tin`,
   * `ar_cuit`, `au_abn`, `au_arn`, `aw_tin`, `az_tin`, `ba_tin`, `bb_tin`, `bd_bin`,
   * `bf_ifu`, `bg_uic`, `bh_vat`, `bj_ifu`, `bo_tin`, `br_cnpj`, `br_cpf`, `bs_tin`,
   * `by_tin`, `ca_bn`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`,
   * `ca_qst`, `cd_nif`, `ch_uid`, `ch_vat`, `cl_tin`, `cm_niu`, `cn_tin`, `co_nit`,
   * `cr_tin`, `cv_nif`, `de_stn`, `do_rcn`, `ec_ruc`, `eg_tin`, `es_cif`, `et_tin`,
   * `eu_oss_vat`, `eu_vat`, `gb_vat`, `ge_vat`, `gn_nif`, `hk_br`, `hr_oib`,
   * `hu_tin`, `id_npwp`, `il_vat`, `in_gst`, `is_vat`, `jp_cn`, `jp_rn`, `jp_trn`,
   * `ke_pin`, `kg_tin`, `kh_tin`, `kr_brn`, `kz_bin`, `la_tin`, `li_uid`, `li_vat`,
   * `ma_vat`, `md_vat`, `me_pib`, `mk_vat`, `mr_nif`, `mx_rfc`, `my_frp`, `my_itn`,
   * `my_sst`, `ng_tin`, `no_vat`, `no_voec`, `np_pan`, `nz_gst`, `om_vat`, `pe_ruc`,
   * `ph_tin`, `pl_nip`, `ro_tin`, `rs_pib`, `ru_inn`, `ru_kpp`, `sa_vat`, `sg_gst`,
   * `sg_uen`, `si_tin`, `sn_ninea`, `sr_fin`, `sv_nit`, `th_vat`, `tj_tin`,
   * `tr_tin`, `tw_vat`, `tz_vat`, `ua_vat`, `ug_tin`, `us_ein`, `uy_ruc`, `uz_tin`,
   * `uz_vat`, `ve_rif`, `vn_tin`, `za_vat`, `zm_tin`, or `zw_tin`. Note that some
   * legacy tax IDs have type `unknown`
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
   * Value of the tax ID.
   */
  value: string;

  /**
   * Two-letter ISO code representing the country of the tax ID.
   */
  country?: string | null;

  /**
   * ID of the customer.
   */
  customer?: string | Customer | null;

  /**
   * ID of the Account representing the customer.
   */
  customer_account?: string | null;

  owner?: TaxIDsOwner | null;

  verification?: TaxID.Verification | null;
}

export namespace TaxID {
  export interface Verification {
    /**
     * Verification status, one of `pending`, `verified`, `unverified`, or
     * `unavailable`.
     */
    status: 'pending' | 'unavailable' | 'unverified' | 'verified';

    /**
     * Verified address.
     */
    verified_address?: string | null;

    /**
     * Verified name.
     */
    verified_name?: string | null;
  }
}

export interface TaxIDsOwner {
  /**
   * Type of owner referenced.
   */
  type: 'account' | 'application' | 'customer' | 'self';

  /**
   * The account being referenced when `type` is `account`.
   */
  account?: string | AccountsAPI.Account;

  /**
   * The Connect Application being referenced when `type` is `application`.
   */
  application?: string | Shared.Application;

  /**
   * The customer being referenced when `type` is `customer`.
   */
  customer?: string | Customer;

  /**
   * The Account representing the customer being referenced when `type` is
   * `customer`.
   */
  customer_account?: string | null;
}

export interface CustomerCreateParams {
  /**
   * The customer's address. Learn about
   * [country-specific requirements for calculating tax](https://docs.stripe.com/invoicing/taxes?dashboard-or-api=dashboard#set-up-customer).
   */
  address?: CustomerCreateParams.OptionalFieldsCustomerAddress | '';

  /**
   * An integer amount in cents (or local equivalent) that represents the customer's
   * current balance, which affect the customer's future invoices. A negative amount
   * represents a credit that decreases the amount due on an invoice; a positive
   * amount increases the amount due on an invoice.
   */
  balance?: number;

  /**
   * The customer's business name. This may be up to _150 characters_.
   */
  business_name?: (string & {}) | '';

  /**
   * Balance information and default balance settings for this customer.
   */
  cash_balance?: CustomerCreateParams.CashBalance;

  /**
   * An arbitrary string that you can attach to a customer object. It is displayed
   * alongside the customer in the dashboard.
   */
  description?: string;

  /**
   * Customer's email address. It's displayed alongside the customer in your
   * dashboard and can be useful for searching and tracking. This may be up to _512
   * characters_.
   */
  email?: string;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * The customer's full name. This may be up to _150 characters_.
   */
  individual_name?: (string & {}) | '';

  /**
   * The prefix for the customer used to generate unique invoice numbers. Must be
   * 3–12 uppercase letters or numbers.
   */
  invoice_prefix?: string;

  /**
   * Default invoice settings for this customer.
   */
  invoice_settings?: CustomerCreateParams.InvoiceSettings;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`.
   */
  metadata?: { [key: string]: string } | '';

  /**
   * The customer's full name or business name.
   */
  name?: string;

  /**
   * The sequence to be used on the customer's next invoice. Defaults to 1.
   */
  next_invoice_sequence?: number;

  payment_method?: string;

  /**
   * The customer's phone number.
   */
  phone?: string;

  /**
   * Customer's preferred languages, ordered by preference.
   */
  preferred_locales?: Array<string>;

  /**
   * The customer's shipping information. Appears on invoices emailed to this
   * customer.
   */
  shipping?: CustomerCreateParams.CustomerShipping | '';

  source?: string;

  /**
   * Tax details about the customer.
   */
  tax?: CustomerCreateParams.Tax;

  /**
   * The customer's tax exemption. One of `none`, `exempt`, or `reverse`.
   */
  tax_exempt?: '' | 'exempt' | 'none' | 'reverse';

  /**
   * The customer's tax IDs.
   */
  tax_id_data?: Array<CustomerCreateParams.TaxIDData>;

  /**
   * ID of the test clock to attach to the customer.
   */
  test_clock?: string;
}

export namespace CustomerCreateParams {
  export interface OptionalFieldsCustomerAddress {
    city?: string;

    country?: string;

    line1?: string;

    line2?: string;

    postal_code?: string;

    state?: string;
  }

  /**
   * Balance information and default balance settings for this customer.
   */
  export interface CashBalance {
    settings?: CashBalance.Settings;
  }

  export namespace CashBalance {
    export interface Settings {
      reconciliation_mode?: 'automatic' | 'manual' | 'merchant_default';
    }
  }

  /**
   * Default invoice settings for this customer.
   */
  export interface InvoiceSettings {
    custom_fields?: Array<InvoiceSettings.CustomFieldsList> | '';

    default_payment_method?: string;

    footer?: string;

    rendering_options?: InvoiceSettings.CustomerRenderingOptionsParam | '';
  }

  export namespace InvoiceSettings {
    export interface CustomFieldsList {
      name: string;

      value: string;
    }

    export interface CustomerRenderingOptionsParam {
      amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';

      template?: string;
    }
  }

  export interface CustomerShipping {
    address: CustomerShipping.Address;

    name: string;

    phone?: string;
  }

  export namespace CustomerShipping {
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
   * Tax details about the customer.
   */
  export interface Tax {
    ip_address?: (string & {}) | '';

    validate_location?: 'deferred' | 'immediately';
  }

  export interface TaxIDData {
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
      | 'us_ein'
      | 'uy_ruc'
      | 'uz_tin'
      | 'uz_vat'
      | 've_rif'
      | 'vn_tin'
      | 'za_vat'
      | 'zm_tin'
      | 'zw_tin';

    value: string;
  }
}

export interface CustomerListParams extends MyCursorIDPageParams {
  /**
   * Only return customers that were created during the given date interval.
   */
  created?: CustomerListParams.RangeQuerySpecs | number;

  /**
   * A case-sensitive filter on the list based on the customer's `email` field. The
   * value must be a string.
   */
  email?: string;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * Provides a list of customers that are associated with the specified test clock.
   * The response will not include customers with test clocks if this parameter is
   * not set.
   */
  test_clock?: string;
}

export namespace CustomerListParams {
  export interface RangeQuerySpecs {
    gt?: number;

    gte?: number;

    lt?: number;

    lte?: number;
  }
}

export declare namespace Customers {
  export {
    type BankAccount as BankAccount,
    type Card as Card,
    type Customer as Customer,
    type Discount as Discount,
    type InvoiceSetting as InvoiceSetting,
    type PromotionCode as PromotionCode,
    type TaxID as TaxID,
    type TaxIDsOwner as TaxIDsOwner,
    type CustomersMyCursorIDPage as CustomersMyCursorIDPage,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerListParams as CustomerListParams,
  };
}
