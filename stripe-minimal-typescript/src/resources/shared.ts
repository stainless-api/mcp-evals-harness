// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface AccountRequirementsError {
  /**
   * The code for the type of error.
   */
  code:
    | 'external_request'
    | 'information_missing'
    | 'invalid_address_city_state_postal_code'
    | 'invalid_address_highway_contract_box'
    | 'invalid_address_private_mailbox'
    | 'invalid_business_profile_name'
    | 'invalid_business_profile_name_denylisted'
    | 'invalid_company_name_denylisted'
    | 'invalid_dob_age_over_maximum'
    | 'invalid_dob_age_under_18'
    | 'invalid_dob_age_under_minimum'
    | 'invalid_product_description_length'
    | 'invalid_product_description_url_match'
    | 'invalid_representative_country'
    | 'invalid_signator'
    | 'invalid_statement_descriptor_business_mismatch'
    | 'invalid_statement_descriptor_denylisted'
    | 'invalid_statement_descriptor_length'
    | 'invalid_statement_descriptor_prefix_denylisted'
    | 'invalid_statement_descriptor_prefix_mismatch'
    | 'invalid_street_address'
    | 'invalid_tax_id'
    | 'invalid_tax_id_format'
    | 'invalid_tos_acceptance'
    | 'invalid_url_denylisted'
    | 'invalid_url_format'
    | 'invalid_url_web_presence_detected'
    | 'invalid_url_website_business_information_mismatch'
    | 'invalid_url_website_empty'
    | 'invalid_url_website_inaccessible'
    | 'invalid_url_website_inaccessible_geoblocked'
    | 'invalid_url_website_inaccessible_password_protected'
    | 'invalid_url_website_incomplete'
    | 'invalid_url_website_incomplete_cancellation_policy'
    | 'invalid_url_website_incomplete_customer_service_details'
    | 'invalid_url_website_incomplete_legal_restrictions'
    | 'invalid_url_website_incomplete_refund_policy'
    | 'invalid_url_website_incomplete_return_policy'
    | 'invalid_url_website_incomplete_terms_and_conditions'
    | 'invalid_url_website_incomplete_under_construction'
    | 'invalid_url_website_other'
    | 'invalid_value_other'
    | 'unsupported_business_type'
    | 'verification_directors_mismatch'
    | 'verification_document_address_mismatch'
    | 'verification_document_address_missing'
    | 'verification_document_corrupt'
    | 'verification_document_country_not_supported'
    | 'verification_document_directors_mismatch'
    | 'verification_document_dob_mismatch'
    | 'verification_document_duplicate_type'
    | 'verification_document_expired'
    | 'verification_document_failed_copy'
    | 'verification_document_failed_greyscale'
    | 'verification_document_failed_other'
    | 'verification_document_failed_test_mode'
    | 'verification_document_fraudulent'
    | 'verification_document_id_number_mismatch'
    | 'verification_document_id_number_missing'
    | 'verification_document_incomplete'
    | 'verification_document_invalid'
    | 'verification_document_issue_or_expiry_date_missing'
    | 'verification_document_manipulated'
    | 'verification_document_missing_back'
    | 'verification_document_missing_front'
    | 'verification_document_name_mismatch'
    | 'verification_document_name_missing'
    | 'verification_document_nationality_mismatch'
    | 'verification_document_not_readable'
    | 'verification_document_not_signed'
    | 'verification_document_not_uploaded'
    | 'verification_document_photo_mismatch'
    | 'verification_document_too_large'
    | 'verification_document_type_not_supported'
    | 'verification_extraneous_directors'
    | 'verification_failed_address_match'
    | 'verification_failed_authorizer_authority'
    | 'verification_failed_business_iec_number'
    | 'verification_failed_document_match'
    | 'verification_failed_id_number_match'
    | 'verification_failed_keyed_identity'
    | 'verification_failed_keyed_match'
    | 'verification_failed_name_match'
    | 'verification_failed_other'
    | 'verification_failed_representative_authority'
    | 'verification_failed_residential_address'
    | 'verification_failed_tax_id_match'
    | 'verification_failed_tax_id_not_issued'
    | 'verification_legal_entity_structure_mismatch'
    | 'verification_missing_directors'
    | 'verification_missing_executives'
    | 'verification_missing_owners'
    | 'verification_rejected_ownership_exemption_reason'
    | 'verification_requires_additional_memorandum_of_associations'
    | 'verification_requires_additional_proof_of_registration'
    | 'verification_supportability';

  /**
   * An informative message that indicates the error type and provides additional
   * details about the error.
   */
  reason: string;

  /**
   * The specific user onboarding requirement field (in the requirements hash) that
   * needs to be resolved.
   */
  requirement: string;
}

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

export interface Application {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'application';

  /**
   * The name of the application.
   */
  name?: string | null;
}

export interface BillingClocksResourceStatusDetailsAdvancingStatusDetails {
  /**
   * The `frozen_time` that the Test Clock is advancing towards.
   */
  target_frozen_time: number;
}

export interface BillingClocksResourceStatusDetailsStatusDetails {
  advancing?: BillingClocksResourceStatusDetailsAdvancingStatusDetails;
}

export interface DeletedApplication {
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
  object: 'application';

  /**
   * The name of the application.
   */
  name?: string | null;
}

export interface DeletedCustomer {
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
  object: 'customer';
}

export interface DeletedTaxID {
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
  object: 'tax_id';
}

export interface InvoiceSettingCustomField {
  /**
   * The name of the custom field.
   */
  name: string;

  /**
   * The value of the custom field.
   */
  value: string;
}

export interface PaymentFlowsPaymentIntentPresentmentDetails {
  /**
   * Amount intended to be collected by this payment, denominated in
   * `presentment_currency`.
   */
  presentment_amount: number;

  /**
   * Currency presented to the customer during payment.
   */
  presentment_currency: string;
}

export interface PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet {
  /**
   * The type of mobile wallet, one of `apple_pay`, `google_pay`, `samsung_pay`, or
   * `unknown`.
   */
  type: 'apple_pay' | 'google_pay' | 'samsung_pay' | 'unknown';
}

export interface PaymentMethodDetailsCardInstallmentsPlan {
  /**
   * Type of installment plan, one of `fixed_count`, `bonus`, or `revolving`.
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

export interface PaymentMethodDetailsCardPresent {
  /**
   * Two-digit number representing the card's expiration month.
   */
  exp_month: number;

  /**
   * Four-digit number representing the card's expiration year.
   */
  exp_year: number;

  /**
   * Whether this [PaymentIntent](https://docs.stripe.com/api/payment_intents) is
   * eligible for incremental authorizations. Request support using
   * [request_incremental_authorization_support](https://docs.stripe.com/api/payment_intents/create#create_payment_intent-payment_method_options-card_present-request_incremental_authorization_support).
   */
  incremental_authorization_supported: boolean;

  /**
   * Defines whether the authorized amount can be over-captured or not
   */
  overcapture_supported: boolean;

  /**
   * The authorized amount
   */
  amount_authorized?: number | null;

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
   * When using manual capture, a future timestamp after which the charge will be
   * automatically refunded if uncaptured.
   */
  capture_before?: number;

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

  offline?: PaymentMethodDetailsCardPresentOffline | null;

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

  receipt?: PaymentMethodDetailsCardPresentReceipt | null;

  wallet?: PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet;
}

export interface PaymentMethodDetailsCardPresentOffline {
  /**
   * Time at which the payment was collected while offline
   */
  stored_at?: number | null;

  /**
   * The method used to process this payment method offline. Only deferred is
   * allowed.
   */
  type?: 'deferred' | null;
}

export interface PaymentMethodDetailsCardPresentReceipt {
  /**
   * The type of account being debited or credited
   */
  account_type?: 'checking' | 'credit' | 'prepaid' | 'unknown';

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

export interface PaymentMethodDetailsPassthroughCard {
  /**
   * Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`,
   * `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.
   */
  brand?: string | null;

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
   * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
   */
  funding?: string | null;

  /**
   * The last four digits of the card.
   */
  last4?: string | null;
}

export interface Shipping {
  address?: Address;

  /**
   * The delivery service that shipped a physical product, such as Fedex, UPS, USPS,
   * etc.
   */
  carrier?: string | null;

  /**
   * Recipient name.
   */
  name?: string;

  /**
   * Recipient phone (including extension).
   */
  phone?: string | null;

  /**
   * The tracking number for a physical product, obtained from the delivery service.
   * If multiple tracking numbers were generated for this purchase, please separate
   * them with commas.
   */
  tracking_number?: string | null;
}

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
export interface Source {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The client secret of the source. Used for client-side retrieval using a
   * publishable key.
   */
  client_secret: string;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * The authentication `flow` of the source. `flow` is one of `redirect`,
   * `receiver`, `code_verification`, `none`.
   */
  flow: string;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'source';

  /**
   * The status of the source, one of `canceled`, `chargeable`, `consumed`, `failed`,
   * or `pending`. Only `chargeable` sources can be used to create a charge.
   */
  status: string;

  /**
   * The `type` of the source. The `type` is a payment method, one of
   * `ach_credit_transfer`, `ach_debit`, `alipay`, `bancontact`, `card`,
   * `card_present`, `eps`, `giropay`, `ideal`, `multibanco`, `klarna`, `p24`,
   * `sepa_debit`, `sofort`, `three_d_secure`, or `wechat`. An additional hash is
   * included on the source with a name matching this value. It contains additional
   * information specific to the [payment method](https://docs.stripe.com/sources)
   * used.
   */
  type:
    | 'ach_credit_transfer'
    | 'ach_debit'
    | 'acss_debit'
    | 'alipay'
    | 'au_becs_debit'
    | 'bancontact'
    | 'card'
    | 'card_present'
    | 'eps'
    | 'giropay'
    | 'ideal'
    | 'klarna'
    | 'multibanco'
    | 'p24'
    | 'sepa_debit'
    | 'sofort'
    | 'three_d_secure'
    | 'wechat';

  ach_credit_transfer?: SourceTypeACHCreditTransfer;

  ach_debit?: SourceTypeACHDebit;

  acss_debit?: SourceTypeAcssDebit;

  alipay?: SourceTypeAlipay;

  /**
   * This field indicates whether this payment method can be shown again to its
   * customer in a checkout flow. Stripe products such as Checkout and Elements use
   * this field to determine whether a payment method can be shown as a saved payment
   * method in a checkout flow. The field defaults to “unspecified”.
   */
  allow_redisplay?: 'always' | 'limited' | 'unspecified' | null;

  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00,
   * or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total
   * amount associated with the source. This is the amount for which the source will
   * be chargeable once ready. Required for `single_use` sources.
   */
  amount?: number | null;

  au_becs_debit?: SourceTypeAuBecsDebit;

  bancontact?: SourceTypeBancontact;

  card?: SourceTypeCard;

  card_present?: SourceTypeCardPresent;

  code_verification?: SourceCodeVerificationFlow;

  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies)
   * associated with the source. This is the currency for which the source will be
   * chargeable once ready. Required for `single_use` sources.
   */
  currency?: string | null;

  /**
   * The ID of the customer to which this source is attached. This will not be
   * present when the source has not been attached to a customer.
   */
  customer?: string;

  eps?: SourceTypeEps;

  giropay?: SourceTypeGiropay;

  ideal?: SourceTypeIdeal;

  klarna?: SourceTypeKlarna;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  multibanco?: SourceTypeMultibanco;

  owner?: SourceOwner | null;

  p24?: SourceTypeP24;

  receiver?: SourceReceiverFlow;

  redirect?: SourceRedirectFlow;

  sepa_debit?: SourceTypeSepaDebit;

  sofort?: SourceTypeSofort;

  source_order?: SourceOrder;

  /**
   * Extra information about a source. This will appear on your customer's statement
   * every time you charge the source.
   */
  statement_descriptor?: string | null;

  three_d_secure?: SourceTypeThreeDSecure;

  /**
   * Either `reusable` or `single_use`. Whether this source should be reusable or
   * not. Some source types may or may not be reusable by construction, while others
   * may leave the option at creation. If an incompatible value is passed, an error
   * will be returned.
   */
  usage?: string | null;

  wechat?: SourceTypeWechat;
}

export interface SourceCodeVerificationFlow {
  /**
   * The number of attempts remaining to authenticate the source object with a
   * verification code.
   */
  attempts_remaining: number;

  /**
   * The status of the code verification, either `pending` (awaiting verification,
   * `attempts_remaining` should be greater than 0), `succeeded` (successful
   * verification) or `failed` (failed verification, cannot be verified anymore as
   * `attempts_remaining` should be 0).
   */
  status: string;
}

export interface SourceOrder {
  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00,
   * or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total
   * amount for the order.
   */
  amount: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * The email address of the customer placing the order.
   */
  email?: string;

  /**
   * List of items constituting the order.
   */
  items?: Array<SourceOrderItem> | null;

  shipping?: Shipping;
}

export interface SourceOrderItem {
  /**
   * The amount (price) for this order item.
   */
  amount?: number | null;

  /**
   * This currency of this order item. Required when `amount` is present.
   */
  currency?: string | null;

  /**
   * Human-readable description for this order item.
   */
  description?: string | null;

  /**
   * The ID of the associated object for this line item. Expandable if not null
   * (e.g., expandable to a SKU).
   */
  parent?: string | null;

  /**
   * The quantity of this order item. When type is `sku`, this is the number of
   * instances of the SKU to be ordered.
   */
  quantity?: number;

  /**
   * The type of this order item. Must be `sku`, `tax`, or `shipping`.
   */
  type?: string | null;
}

export interface SourceOwner {
  address?: Address | null;

  /**
   * Owner's email address.
   */
  email?: string | null;

  /**
   * Owner's full name.
   */
  name?: string | null;

  /**
   * Owner's phone number (including extension).
   */
  phone?: string | null;

  verified_address?: Address | null;

  /**
   * Verified owner's email address. Verified values are verified or provided by the
   * payment method directly (and if supported) at the time of authorization or
   * settlement. They cannot be set or mutated.
   */
  verified_email?: string | null;

  /**
   * Verified owner's full name. Verified values are verified or provided by the
   * payment method directly (and if supported) at the time of authorization or
   * settlement. They cannot be set or mutated.
   */
  verified_name?: string | null;

  /**
   * Verified owner's phone number (including extension). Verified values are
   * verified or provided by the payment method directly (and if supported) at the
   * time of authorization or settlement. They cannot be set or mutated.
   */
  verified_phone?: string | null;
}

export interface SourceReceiverFlow {
  /**
   * The total amount that was moved to your balance. This is almost always equal to
   * the amount charged. In rare cases when customers deposit excess funds and we are
   * unable to refund those, those funds get moved to your balance and show up in
   * amount_charged as well. The amount charged is expressed in the source's
   * currency.
   */
  amount_charged: number;

  /**
   * The total amount received by the receiver source.
   * `amount_received = amount_returned + amount_charged` should be true for consumed
   * sources unless customers deposit excess funds. The amount received is expressed
   * in the source's currency.
   */
  amount_received: number;

  /**
   * The total amount that was returned to the customer. The amount returned is
   * expressed in the source's currency.
   */
  amount_returned: number;

  /**
   * Type of refund attribute method, one of `email`, `manual`, or `none`.
   */
  refund_attributes_method: string;

  /**
   * Type of refund attribute status, one of `missing`, `requested`, or `available`.
   */
  refund_attributes_status: string;

  /**
   * The address of the receiver source. This is the value that should be
   * communicated to the customer to send their funds to.
   */
  address?: string | null;
}

export interface SourceRedirectFlow {
  /**
   * The URL you provide to redirect the customer to after they authenticated their
   * payment.
   */
  return_url: string;

  /**
   * The status of the redirect, either `pending` (ready to be used by your customer
   * to authenticate the transaction), `succeeded` (successful authentication, cannot
   * be reused) or `not_required` (redirect should not be used) or `failed` (failed
   * authentication, cannot be reused).
   */
  status: string;

  /**
   * The URL provided to you to redirect a customer to as part of a `redirect`
   * authentication flow.
   */
  url: string;

  /**
   * The failure reason for the redirect, either `user_abort` (the customer aborted
   * or dropped out of the redirect flow), `declined` (the authentication failed or
   * the transaction was declined), or `processing_error` (the redirect failed due to
   * a technical error). Present only if the redirect status is `failed`.
   */
  failure_reason?: string | null;
}

export interface SourceTypeACHCreditTransfer {
  account_number?: string | null;

  bank_name?: string | null;

  fingerprint?: string | null;

  refund_account_holder_name?: string | null;

  refund_account_holder_type?: string | null;

  refund_routing_number?: string | null;

  routing_number?: string | null;

  swift_code?: string | null;
}

export interface SourceTypeACHDebit {
  bank_name?: string | null;

  country?: string | null;

  fingerprint?: string | null;

  last4?: string | null;

  routing_number?: string | null;

  type?: string | null;
}

export interface SourceTypeAcssDebit {
  bank_address_city?: string | null;

  bank_address_line_1?: string | null;

  bank_address_line_2?: string | null;

  bank_address_postal_code?: string | null;

  bank_name?: string | null;

  category?: string | null;

  country?: string | null;

  fingerprint?: string | null;

  last4?: string | null;

  routing_number?: string | null;
}

export interface SourceTypeAlipay {
  data_string?: string | null;

  native_url?: string | null;

  statement_descriptor?: string | null;
}

export interface SourceTypeAuBecsDebit {
  bsb_number?: string | null;

  fingerprint?: string | null;

  last4?: string | null;
}

export interface SourceTypeBancontact {
  bank_code?: string | null;

  bank_name?: string | null;

  bic?: string | null;

  iban_last4?: string | null;

  preferred_language?: string | null;

  statement_descriptor?: string | null;
}

export interface SourceTypeCard {
  address_line1_check?: string | null;

  address_zip_check?: string | null;

  brand?: string | null;

  country?: string | null;

  cvc_check?: string | null;

  dynamic_last4?: string | null;

  exp_month?: number | null;

  exp_year?: number | null;

  fingerprint?: string;

  funding?: string | null;

  last4?: string | null;

  name?: string | null;

  three_d_secure?: string;

  tokenization_method?: string | null;
}

export interface SourceTypeCardPresent {
  application_cryptogram?: string;

  application_preferred_name?: string;

  authorization_code?: string | null;

  authorization_response_code?: string;

  brand?: string | null;

  country?: string | null;

  cvm_type?: string;

  data_type?: string | null;

  dedicated_file_name?: string;

  emv_auth_data?: string;

  evidence_customer_signature?: string | null;

  evidence_transaction_certificate?: string | null;

  exp_month?: number | null;

  exp_year?: number | null;

  fingerprint?: string;

  funding?: string | null;

  last4?: string | null;

  pos_device_id?: string | null;

  pos_entry_mode?: string;

  read_method?: string | null;

  reader?: string | null;

  terminal_verification_results?: string;

  transaction_status_information?: string;
}

export interface SourceTypeEps {
  reference?: string | null;

  statement_descriptor?: string | null;
}

export interface SourceTypeGiropay {
  bank_code?: string | null;

  bank_name?: string | null;

  bic?: string | null;

  statement_descriptor?: string | null;
}

export interface SourceTypeIdeal {
  bank?: string | null;

  bic?: string | null;

  iban_last4?: string | null;

  statement_descriptor?: string | null;
}

export interface SourceTypeKlarna {
  background_image_url?: string;

  client_token?: string | null;

  first_name?: string;

  last_name?: string;

  locale?: string;

  logo_url?: string;

  page_title?: string;

  pay_later_asset_urls_descriptive?: string;

  pay_later_asset_urls_standard?: string;

  pay_later_name?: string;

  pay_later_redirect_url?: string;

  pay_now_asset_urls_descriptive?: string;

  pay_now_asset_urls_standard?: string;

  pay_now_name?: string;

  pay_now_redirect_url?: string;

  pay_over_time_asset_urls_descriptive?: string;

  pay_over_time_asset_urls_standard?: string;

  pay_over_time_name?: string;

  pay_over_time_redirect_url?: string;

  payment_method_categories?: string;

  purchase_country?: string;

  purchase_type?: string;

  redirect_url?: string;

  shipping_delay?: number;

  shipping_first_name?: string;

  shipping_last_name?: string;
}

export interface SourceTypeMultibanco {
  entity?: string | null;

  reference?: string | null;

  refund_account_holder_address_city?: string | null;

  refund_account_holder_address_country?: string | null;

  refund_account_holder_address_line1?: string | null;

  refund_account_holder_address_line2?: string | null;

  refund_account_holder_address_postal_code?: string | null;

  refund_account_holder_address_state?: string | null;

  refund_account_holder_name?: string | null;

  refund_iban?: string | null;
}

export interface SourceTypeP24 {
  reference?: string | null;
}

export interface SourceTypeSepaDebit {
  bank_code?: string | null;

  branch_code?: string | null;

  country?: string | null;

  fingerprint?: string | null;

  last4?: string | null;

  mandate_reference?: string | null;

  mandate_url?: string | null;
}

export interface SourceTypeSofort {
  bank_code?: string | null;

  bank_name?: string | null;

  bic?: string | null;

  country?: string | null;

  iban_last4?: string | null;

  preferred_language?: string | null;

  statement_descriptor?: string | null;
}

export interface SourceTypeThreeDSecure {
  address_line1_check?: string | null;

  address_zip_check?: string | null;

  authenticated?: boolean | null;

  brand?: string | null;

  card?: string | null;

  country?: string | null;

  customer?: string | null;

  cvc_check?: string | null;

  dynamic_last4?: string | null;

  exp_month?: number | null;

  exp_year?: number | null;

  fingerprint?: string;

  funding?: string | null;

  last4?: string | null;

  name?: string | null;

  three_d_secure?: string;

  tokenization_method?: string | null;
}

export interface SourceTypeWechat {
  prepay_id?: string;

  qr_code_url?: string | null;

  statement_descriptor?: string;
}

/**
 * [Tax codes](https://stripe.com/docs/tax/tax-categories) classify goods and
 * services for tax purposes.
 */
export interface TaxCode {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * A detailed description of which types of products the tax code represents.
   */
  description: string;

  /**
   * A short name for the tax code.
   */
  name: string;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'tax_code';
}

/**
 * A test clock enables deterministic control over objects in testmode. With a test
 * clock, you can create objects at a frozen time in the past or future, and
 * advance to a specific future time to observe webhooks and state changes. After
 * the clock advances, you can either validate the current state of your scenario
 * (and test your assumptions), change the current state of your scenario (and test
 * more complex scenarios), or keep advancing forward in time.
 */
export interface TestHelpersTestClock {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Time at which this clock is scheduled to auto delete.
   */
  deletes_after: number;

  /**
   * Time at which all objects belonging to this clock are frozen.
   */
  frozen_time: number;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'test_helpers.test_clock';

  /**
   * The status of the Test Clock.
   */
  status: 'advancing' | 'internal_failure' | 'ready';

  status_details: BillingClocksResourceStatusDetailsStatusDetails;

  /**
   * The custom name supplied at creation.
   */
  name?: string | null;
}
