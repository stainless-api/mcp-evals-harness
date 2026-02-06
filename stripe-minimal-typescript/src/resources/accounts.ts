// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountsAPI from './accounts';
import * as CustomersAPI from './customers';
import * as DisputesAPI from './disputes';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Accounts extends APIResource {
  /**
   * <p>Retrieves the details of an account.</p>
   */
  retrieve(
    query: AccountRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Account> {
    return this._client.get('/v1/account', { query, ...options });
  }
}

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
export interface Account {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'account';

  business_profile?: Account.BusinessProfile | null;

  /**
   * The business type.
   */
  business_type?: 'company' | 'government_entity' | 'individual' | 'non_profit' | null;

  capabilities?: Account.Capabilities;

  /**
   * Whether the account can process charges.
   */
  charges_enabled?: boolean;

  company?: Account.Company;

  controller?: Account.Controller;

  /**
   * The account's country.
   */
  country?: string;

  /**
   * Time at which the account was connected. Measured in seconds since the Unix
   * epoch.
   */
  created?: number;

  /**
   * Three-letter ISO currency code representing the default currency for the
   * account. This must be a currency that
   * [Stripe supports in the account's country](https://stripe.com/docs/payouts).
   */
  default_currency?: string;

  /**
   * Whether account details have been submitted. Accounts with Stripe Dashboard
   * access, which includes Standard accounts, cannot receive payouts before this is
   * true. Accounts where this is false should be directed to
   * [an onboarding flow](/connect/onboarding) to finish submitting account details.
   */
  details_submitted?: boolean;

  /**
   * An email address associated with the account. It's not used for authentication
   * and Stripe doesn't market to this field without explicit approval from the
   * platform.
   */
  email?: string | null;

  /**
   * External accounts (bank accounts and debit cards) currently attached to this
   * account. External accounts are only returned for requests where
   * `controller[is_controller]` is true.
   */
  external_accounts?: Account.ExternalAccounts;

  future_requirements?: Account.FutureRequirements;

  groups?: Account.Groups | null;

  /**
   * This is an object representing a person associated with a Stripe account.
   *
   * A platform can only access a subset of data in a person for an account where
   * [account.controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
   * is `stripe`, which includes Standard and Express accounts, after creating an
   * Account Link or Account Session to start Connect onboarding.
   *
   * See the [Standard onboarding](/connect/standard-accounts) or
   * [Express onboarding](/connect/express-accounts) documentation for information
   * about prefilling information and account onboarding steps. Learn more about
   * [handling identity verification with the API](/connect/handling-api-verification#person-information).
   */
  individual?: Account.Individual;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string };

  /**
   * Whether the funds in this account can be paid out.
   */
  payouts_enabled?: boolean;

  requirements?: Account.Requirements;

  settings?: AccountSettings | null;

  tos_acceptance?: Account.TosAcceptance;

  /**
   * The Stripe account type. Can be `standard`, `express`, `custom`, or `none`.
   */
  type?: 'custom' | 'express' | 'none' | 'standard';
}

export namespace Account {
  export interface BusinessProfile {
    annual_revenue?: BusinessProfile.AnnualRevenue | null;

    /**
     * An estimated upper bound of employees, contractors, vendors, etc. currently
     * working for the business.
     */
    estimated_worker_count?: number | null;

    /**
     * [The merchant category code for the account](/connect/setting-mcc). MCCs are
     * used to classify businesses based on the goods or services they provide.
     */
    mcc?: string | null;

    /**
     * Whether the business is a minority-owned, women-owned, and/or LGBTQI+ -owned
     * business.
     */
    minority_owned_business_designation?: Array<
      | 'lgbtqi_owned_business'
      | 'minority_owned_business'
      | 'none_of_these_apply'
      | 'prefer_not_to_answer'
      | 'women_owned_business'
    > | null;

    monthly_estimated_revenue?: BusinessProfile.MonthlyEstimatedRevenue;

    /**
     * The customer-facing business name.
     */
    name?: string | null;

    /**
     * Internal-only description of the product sold or service provided by the
     * business. It's used by Stripe for risk and underwriting purposes.
     */
    product_description?: string | null;

    support_address?: Shared.Address | null;

    /**
     * A publicly available email address for sending support issues to.
     */
    support_email?: string | null;

    /**
     * A publicly available phone number to call with support issues.
     */
    support_phone?: string | null;

    /**
     * A publicly available website for handling support issues.
     */
    support_url?: string | null;

    /**
     * The business's publicly available website.
     */
    url?: string | null;
  }

  export namespace BusinessProfile {
    export interface AnnualRevenue {
      /**
       * A non-negative integer representing the amount in the
       * [smallest currency unit](/currencies#zero-decimal).
       */
      amount?: number | null;

      /**
       * Three-letter
       * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
       * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
       */
      currency?: string | null;

      /**
       * The close-out date of the preceding fiscal year in ISO 8601 format. E.g.
       * 2023-12-31 for the 31st of December, 2023.
       */
      fiscal_year_end?: string | null;
    }

    export interface MonthlyEstimatedRevenue {
      /**
       * A non-negative integer representing how much to charge in the
       * [smallest currency unit](/currencies#zero-decimal).
       */
      amount: number;

      /**
       * Three-letter
       * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
       * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
       */
      currency: string;
    }
  }

  export interface Capabilities {
    /**
     * The status of the Canadian pre-authorized debits payments capability of the
     * account, or whether the account can directly process Canadian pre-authorized
     * debits charges.
     */
    acss_debit_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Affirm capability of the account, or whether the account can
     * directly process Affirm charges.
     */
    affirm_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Afterpay Clearpay capability of the account, or whether the
     * account can directly process Afterpay Clearpay charges.
     */
    afterpay_clearpay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Alma capability of the account, or whether the account can
     * directly process Alma payments.
     */
    alma_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the AmazonPay capability of the account, or whether the account
     * can directly process AmazonPay payments.
     */
    amazon_pay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the BECS Direct Debit (AU) payments capability of the account, or
     * whether the account can directly process BECS Direct Debit (AU) charges.
     */
    au_becs_debit_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Bacs Direct Debits payments capability of the account, or
     * whether the account can directly process Bacs Direct Debits charges.
     */
    bacs_debit_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Bancontact payments capability of the account, or whether the
     * account can directly process Bancontact charges.
     */
    bancontact_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the customer_balance payments capability of the account, or
     * whether the account can directly process customer_balance charges.
     */
    bank_transfer_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Billie capability of the account, or whether the account can
     * directly process Billie payments.
     */
    billie_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the blik payments capability of the account, or whether the
     * account can directly process blik charges.
     */
    blik_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the boleto payments capability of the account, or whether the
     * account can directly process boleto charges.
     */
    boleto_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the card issuing capability of the account, or whether you can use
     * Issuing to distribute funds on cards
     */
    card_issuing?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the card payments capability of the account, or whether the
     * account can directly process credit and debit card charges.
     */
    card_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Cartes Bancaires payments capability of the account, or
     * whether the account can directly process Cartes Bancaires card charges in EUR
     * currency.
     */
    cartes_bancaires_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Cash App Pay capability of the account, or whether the account
     * can directly process Cash App Pay payments.
     */
    cashapp_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Crypto capability of the account, or whether the account can
     * directly process Crypto payments.
     */
    crypto_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the EPS payments capability of the account, or whether the account
     * can directly process EPS charges.
     */
    eps_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the FPX payments capability of the account, or whether the account
     * can directly process FPX charges.
     */
    fpx_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the GB customer_balance payments (GBP currency) capability of the
     * account, or whether the account can directly process GB customer_balance
     * charges.
     */
    gb_bank_transfer_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the giropay payments capability of the account, or whether the
     * account can directly process giropay charges.
     */
    giropay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the GrabPay payments capability of the account, or whether the
     * account can directly process GrabPay charges.
     */
    grabpay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the iDEAL payments capability of the account, or whether the
     * account can directly process iDEAL charges.
     */
    ideal_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the india_international_payments capability of the account, or
     * whether the account can process international charges (non INR) in India.
     */
    india_international_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the JCB payments capability of the account, or whether the account
     * (Japan only) can directly process JCB credit card charges in JPY currency.
     */
    jcb_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Japanese customer_balance payments (JPY currency) capability
     * of the account, or whether the account can directly process Japanese
     * customer_balance charges.
     */
    jp_bank_transfer_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the KakaoPay capability of the account, or whether the account can
     * directly process KakaoPay payments.
     */
    kakao_pay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Klarna payments capability of the account, or whether the
     * account can directly process Klarna charges.
     */
    klarna_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the konbini payments capability of the account, or whether the
     * account can directly process konbini charges.
     */
    konbini_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the KrCard capability of the account, or whether the account can
     * directly process KrCard payments.
     */
    kr_card_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the legacy payments capability of the account.
     */
    legacy_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the link_payments capability of the account, or whether the
     * account can directly process Link charges.
     */
    link_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the MB WAY payments capability of the account, or whether the
     * account can directly process MB WAY charges.
     */
    mb_way_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the MobilePay capability of the account, or whether the account
     * can directly process MobilePay charges.
     */
    mobilepay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Multibanco payments capability of the account, or whether the
     * account can directly process Multibanco charges.
     */
    multibanco_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Mexican customer_balance payments (MXN currency) capability of
     * the account, or whether the account can directly process Mexican
     * customer_balance charges.
     */
    mx_bank_transfer_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the NaverPay capability of the account, or whether the account can
     * directly process NaverPay payments.
     */
    naver_pay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the New Zealand BECS Direct Debit payments capability of the
     * account, or whether the account can directly process New Zealand BECS Direct
     * Debit charges.
     */
    nz_bank_account_becs_debit_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the OXXO payments capability of the account, or whether the
     * account can directly process OXXO charges.
     */
    oxxo_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the P24 payments capability of the account, or whether the account
     * can directly process P24 charges.
     */
    p24_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the pay_by_bank payments capability of the account, or whether the
     * account can directly process pay_by_bank charges.
     */
    pay_by_bank_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Payco capability of the account, or whether the account can
     * directly process Payco payments.
     */
    payco_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the paynow payments capability of the account, or whether the
     * account can directly process paynow charges.
     */
    paynow_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the PayTo capability of the account, or whether the account can
     * directly process PayTo charges.
     */
    payto_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the pix payments capability of the account, or whether the account
     * can directly process pix charges.
     */
    pix_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the promptpay payments capability of the account, or whether the
     * account can directly process promptpay charges.
     */
    promptpay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the RevolutPay capability of the account, or whether the account
     * can directly process RevolutPay payments.
     */
    revolut_pay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the SamsungPay capability of the account, or whether the account
     * can directly process SamsungPay payments.
     */
    samsung_pay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Satispay capability of the account, or whether the account can
     * directly process Satispay payments.
     */
    satispay_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the SEPA customer_balance payments (EUR currency) capability of
     * the account, or whether the account can directly process SEPA customer_balance
     * charges.
     */
    sepa_bank_transfer_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the SEPA Direct Debits payments capability of the account, or
     * whether the account can directly process SEPA Direct Debits charges.
     */
    sepa_debit_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Sofort payments capability of the account, or whether the
     * account can directly process Sofort charges.
     */
    sofort_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Swish capability of the account, or whether the account can
     * directly process Swish payments.
     */
    swish_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the tax reporting 1099-K (US) capability of the account.
     */
    tax_reporting_us_1099_k?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the tax reporting 1099-MISC (US) capability of the account.
     */
    tax_reporting_us_1099_misc?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the transfers capability of the account, or whether your platform
     * can transfer funds to the account.
     */
    transfers?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the banking capability, or whether the account can have bank
     * accounts.
     */
    treasury?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the TWINT capability of the account, or whether the account can
     * directly process TWINT charges.
     */
    twint_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the US bank account ACH payments capability of the account, or
     * whether the account can directly process US bank account charges.
     */
    us_bank_account_ach_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the US customer_balance payments (USD currency) capability of the
     * account, or whether the account can directly process US customer_balance
     * charges.
     */
    us_bank_transfer_payments?: 'active' | 'inactive' | 'pending';

    /**
     * The status of the Zip capability of the account, or whether the account can
     * directly process Zip charges.
     */
    zip_payments?: 'active' | 'inactive' | 'pending';
  }

  export interface Company {
    address?: Shared.Address;

    address_kana?: AccountsAPI.LegalEntityJapanAddress | null;

    address_kanji?: AccountsAPI.LegalEntityJapanAddress | null;

    /**
     * Whether the company's directors have been provided. This Boolean will be `true`
     * if you've manually indicated that all directors are provided via
     * [the `directors_provided` parameter](https://docs.stripe.com/api/accounts/update#update_account-company-directors_provided).
     */
    directors_provided?: boolean;

    directorship_declaration?: Company.DirectorshipDeclaration | null;

    /**
     * Whether the company's executives have been provided. This Boolean will be `true`
     * if you've manually indicated that all executives are provided via
     * [the `executives_provided` parameter](https://docs.stripe.com/api/accounts/update#update_account-company-executives_provided),
     * or if Stripe determined that sufficient executives were provided.
     */
    executives_provided?: boolean;

    /**
     * The export license ID number of the company, also referred as Import Export Code
     * (India only).
     */
    export_license_id?: string;

    /**
     * The purpose code to use for export transactions (India only).
     */
    export_purpose_code?: string;

    /**
     * The company's legal name. Also available for accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    name?: string | null;

    /**
     * The Kana variation of the company's legal name (Japan only). Also available for
     * accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    name_kana?: string | null;

    /**
     * The Kanji variation of the company's legal name (Japan only). Also available for
     * accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    name_kanji?: string | null;

    /**
     * Whether the company's owners have been provided. This Boolean will be `true` if
     * you've manually indicated that all owners are provided via
     * [the `owners_provided` parameter](https://docs.stripe.com/api/accounts/update#update_account-company-owners_provided),
     * or if Stripe determined that sufficient owners were provided. Stripe determines
     * ownership requirements using both the number of owners provided and their total
     * percent ownership (calculated by adding the `percent_ownership` of each owner
     * together).
     */
    owners_provided?: boolean;

    ownership_declaration?: Company.OwnershipDeclaration | null;

    /**
     * This value is used to determine if a business is exempt from providing ultimate
     * beneficial owners. See
     * [this support article](https://support.stripe.com/questions/exemption-from-providing-ownership-details)
     * and
     * [changelog](https://docs.stripe.com/changelog/acacia/2025-01-27/ownership-exemption-reason-accounts-api)
     * for more details.
     */
    ownership_exemption_reason?:
      | 'qualified_entity_exceeds_ownership_threshold'
      | 'qualifies_as_financial_institution';

    /**
     * The company's phone number (used for verification).
     */
    phone?: string | null;

    registration_date?: Company.RegistrationDate;

    representative_declaration?: Company.RepresentativeDeclaration | null;

    /**
     * The category identifying the legal structure of the company or legal entity.
     * Also available for accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`. See
     * [Business structure](https://docs.stripe.com/connect/identity-verification#business-structure)
     * for more details.
     */
    structure?:
      | 'free_zone_establishment'
      | 'free_zone_llc'
      | 'government_instrumentality'
      | 'governmental_unit'
      | 'incorporated_non_profit'
      | 'incorporated_partnership'
      | 'limited_liability_partnership'
      | 'llc'
      | 'multi_member_llc'
      | 'private_company'
      | 'private_corporation'
      | 'private_partnership'
      | 'public_company'
      | 'public_corporation'
      | 'public_partnership'
      | 'registered_charity'
      | 'single_member_llc'
      | 'sole_establishment'
      | 'sole_proprietorship'
      | 'tax_exempt_government_instrumentality'
      | 'unincorporated_association'
      | 'unincorporated_non_profit'
      | 'unincorporated_partnership';

    /**
     * Whether the company's business ID number was provided.
     */
    tax_id_provided?: boolean;

    /**
     * The jurisdiction in which the `tax_id` is registered (Germany-based companies
     * only).
     */
    tax_id_registrar?: string;

    /**
     * Whether the company's business VAT number was provided.
     */
    vat_id_provided?: boolean;

    verification?: Company.Verification | null;
  }

  export namespace Company {
    export interface DirectorshipDeclaration {
      /**
       * The Unix timestamp marking when the directorship declaration attestation was
       * made.
       */
      date?: number | null;

      /**
       * The IP address from which the directorship declaration attestation was made.
       */
      ip?: string | null;

      /**
       * The user-agent string from the browser where the directorship declaration
       * attestation was made.
       */
      user_agent?: string | null;
    }

    export interface OwnershipDeclaration {
      /**
       * The Unix timestamp marking when the beneficial owner attestation was made.
       */
      date?: number | null;

      /**
       * The IP address from which the beneficial owner attestation was made.
       */
      ip?: string | null;

      /**
       * The user-agent string from the browser where the beneficial owner attestation
       * was made.
       */
      user_agent?: string | null;
    }

    export interface RegistrationDate {
      /**
       * The day of registration, between 1 and 31.
       */
      day?: number | null;

      /**
       * The month of registration, between 1 and 12.
       */
      month?: number | null;

      /**
       * The four-digit year of registration.
       */
      year?: number | null;
    }

    export interface RepresentativeDeclaration {
      /**
       * The Unix timestamp marking when the representative declaration attestation was
       * made.
       */
      date?: number | null;

      /**
       * The IP address from which the representative declaration attestation was made.
       */
      ip?: string | null;

      /**
       * The user-agent string from the browser where the representative declaration
       * attestation was made.
       */
      user_agent?: string | null;
    }

    export interface Verification {
      document: Verification.Document;
    }

    export namespace Verification {
      export interface Document {
        /**
         * The back of a document returned by a
         * [file upload](https://api.stripe.com#create_file) with a `purpose` value of
         * `additional_verification`. Note that `additional_verification` files are
         * [not downloadable](/file-upload#uploading-a-file).
         */
        back?: string | DisputesAPI.File | null;

        /**
         * A user-displayable string describing the verification state of this document.
         */
        details?: string | null;

        /**
         * One of `document_corrupt`, `document_expired`, `document_failed_copy`,
         * `document_failed_greyscale`, `document_failed_other`,
         * `document_failed_test_mode`, `document_fraudulent`, `document_incomplete`,
         * `document_invalid`, `document_manipulated`, `document_not_readable`,
         * `document_not_uploaded`, `document_type_not_supported`, or `document_too_large`.
         * A machine-readable code specifying the verification state for this document.
         */
        details_code?: string | null;

        /**
         * The front of a document returned by a
         * [file upload](https://api.stripe.com#create_file) with a `purpose` value of
         * `additional_verification`. Note that `additional_verification` files are
         * [not downloadable](/file-upload#uploading-a-file).
         */
        front?: string | DisputesAPI.File | null;
      }
    }
  }

  export interface Controller {
    /**
     * The controller type. Can be `application`, if a Connect application controls the
     * account, or `account`, if the account controls itself.
     */
    type: 'account' | 'application';

    fees?: Controller.Fees;

    /**
     * `true` if the Connect application retrieving the resource controls the account
     * and can therefore exercise
     * [platform controls](https://docs.stripe.com/connect/platform-controls-for-standard-accounts).
     * Otherwise, this field is null.
     */
    is_controller?: boolean;

    losses?: Controller.Losses;

    /**
     * A value indicating responsibility for collecting requirements on this account.
     * Only returned when the Connect application retrieving the resource controls the
     * account.
     */
    requirement_collection?: 'application' | 'stripe';

    stripe_dashboard?: Controller.StripeDashboard;
  }

  export namespace Controller {
    export interface Fees {
      /**
       * A value indicating the responsible payer of a bundle of Stripe fees for
       * pricing-control eligible products on this account. Learn more about
       * [fee behavior on connected accounts](https://docs.stripe.com/connect/direct-charges-fee-payer-behavior).
       */
      payer: 'account' | 'application' | 'application_custom' | 'application_express';
    }

    export interface Losses {
      /**
       * A value indicating who is liable when this account can't pay back negative
       * balances from payments.
       */
      payments: 'application' | 'stripe';
    }

    export interface StripeDashboard {
      /**
       * A value indicating the Stripe dashboard this account has access to independent
       * of the Connect application.
       */
      type: 'express' | 'full' | 'none';
    }
  }

  /**
   * External accounts (bank accounts and debit cards) currently attached to this
   * account. External accounts are only returned for requests where
   * `controller[is_controller]` is true.
   */
  export interface ExternalAccounts {
    /**
     * The list contains all external accounts that have been attached to the Stripe
     * account. These may be bank accounts or cards.
     */
    data: Array<CustomersAPI.BankAccount | CustomersAPI.Card>;

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

  export interface FutureRequirements {
    /**
     * Fields that are due and can be resolved by providing the corresponding
     * alternative fields instead. Many alternatives can list the same
     * `original_fields_due`, and any of these alternatives can serve as a pathway for
     * attempting to resolve the fields again. Re-providing `original_fields_due` also
     * serves as a pathway for attempting to resolve the fields again.
     */
    alternatives?: Array<AccountsAPI.AccountRequirementsAlternative> | null;

    /**
     * Date on which `future_requirements` becomes the main `requirements` hash and
     * `future_requirements` becomes empty. After the transition, `currently_due`
     * requirements may immediately become `past_due`, but the account may also be
     * given a grace period depending on its enablement state prior to transitioning.
     */
    current_deadline?: number | null;

    /**
     * Fields that need to be resolved to keep the account enabled. If not resolved by
     * `future_requirements[current_deadline]`, these fields will transition to the
     * main `requirements` hash.
     */
    currently_due?: Array<string> | null;

    /**
     * This is typed as an enum for consistency with `requirements.disabled_reason`.
     */
    disabled_reason?:
      | 'action_required.requested_capabilities'
      | 'listed'
      | 'other'
      | 'platform_paused'
      | 'rejected.fraud'
      | 'rejected.incomplete_verification'
      | 'rejected.listed'
      | 'rejected.other'
      | 'rejected.platform_fraud'
      | 'rejected.platform_other'
      | 'rejected.platform_terms_of_service'
      | 'rejected.terms_of_service'
      | 'requirements.past_due'
      | 'requirements.pending_verification'
      | 'under_review'
      | null;

    /**
     * Details about validation and verification failures for `due` requirements that
     * must be resolved.
     */
    errors?: Array<Shared.AccountRequirementsError> | null;

    /**
     * Fields you must collect when all thresholds are reached. As they become
     * required, they appear in `currently_due` as well.
     */
    eventually_due?: Array<string> | null;

    /**
     * Fields that haven't been resolved by `requirements.current_deadline`. These
     * fields need to be resolved to enable the capability on the account.
     * `future_requirements.past_due` is a subset of `requirements.past_due`.
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

  export interface Groups {
    /**
     * The group the account is in to determine their payments pricing, and null if the
     * account is on customized pricing.
     * [See the Platform pricing tool documentation](https://docs.stripe.com/connect/platform-pricing-tools)
     * for details.
     */
    payments_pricing?: string | null;
  }

  /**
   * This is an object representing a person associated with a Stripe account.
   *
   * A platform can only access a subset of data in a person for an account where
   * [account.controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
   * is `stripe`, which includes Standard and Express accounts, after creating an
   * Account Link or Account Session to start Connect onboarding.
   *
   * See the [Standard onboarding](/connect/standard-accounts) or
   * [Express onboarding](/connect/express-accounts) documentation for information
   * about prefilling information and account onboarding steps. Learn more about
   * [handling identity verification with the API](/connect/handling-api-verification#person-information).
   */
  export interface Individual {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * The account the person is associated with.
     */
    account: string;

    /**
     * Time at which the object was created. Measured in seconds since the Unix epoch.
     */
    created: number;

    /**
     * String representing the object's type. Objects of the same type share the same
     * value.
     */
    object: 'person';

    additional_tos_acceptances?: Individual.AdditionalTosAcceptances;

    address?: Shared.Address;

    address_kana?: AccountsAPI.LegalEntityJapanAddress | null;

    address_kanji?: AccountsAPI.LegalEntityJapanAddress | null;

    dob?: Individual.Dob;

    /**
     * The person's email address. Also available for accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    email?: string | null;

    /**
     * The person's first name. Also available for accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    first_name?: string | null;

    /**
     * The Kana variation of the person's first name (Japan only). Also available for
     * accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    first_name_kana?: string | null;

    /**
     * The Kanji variation of the person's first name (Japan only). Also available for
     * accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    first_name_kanji?: string | null;

    /**
     * A list of alternate names or aliases that the person is known by. Also available
     * for accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    full_name_aliases?: Array<string>;

    future_requirements?: Individual.FutureRequirements | null;

    /**
     * The person's gender.
     */
    gender?: string | null;

    /**
     * Whether the person's `id_number` was provided. True if either the full ID number
     * was provided or if only the required part of the ID number was provided (ex.
     * last four of an individual's SSN for the US indicated by `ssn_last_4_provided`).
     */
    id_number_provided?: boolean;

    /**
     * Whether the person's `id_number_secondary` was provided.
     */
    id_number_secondary_provided?: boolean;

    /**
     * The person's last name. Also available for accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    last_name?: string | null;

    /**
     * The Kana variation of the person's last name (Japan only). Also available for
     * accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    last_name_kana?: string | null;

    /**
     * The Kanji variation of the person's last name (Japan only). Also available for
     * accounts where
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `stripe`.
     */
    last_name_kanji?: string | null;

    /**
     * The person's maiden name.
     */
    maiden_name?: string | null;

    /**
     * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
     * attach to an object. This can be useful for storing additional information about
     * the object in a structured format.
     */
    metadata?: { [key: string]: string };

    /**
     * The country where the person is a national.
     */
    nationality?: string | null;

    /**
     * The person's phone number.
     */
    phone?: string | null;

    /**
     * Indicates if the person or any of their representatives, family members, or
     * other closely related persons, declares that they hold or have held an important
     * public job or function, in any jurisdiction.
     */
    political_exposure?: 'existing' | 'none';

    registered_address?: Shared.Address;

    relationship?: Individual.Relationship;

    requirements?: Individual.Requirements | null;

    /**
     * Whether the last four digits of the person's Social Security number have been
     * provided (U.S. only).
     */
    ssn_last_4_provided?: boolean;

    us_cfpb_data?: Individual.UsCfpbData | null;

    verification?: Individual.Verification;
  }

  export namespace Individual {
    export interface AdditionalTosAcceptances {
      account?: AdditionalTosAcceptances.Account | null;
    }

    export namespace AdditionalTosAcceptances {
      export interface Account {
        /**
         * The Unix timestamp marking when the legal guardian accepted the service
         * agreement.
         */
        date?: number | null;

        /**
         * The IP address from which the legal guardian accepted the service agreement.
         */
        ip?: string | null;

        /**
         * The user agent of the browser from which the legal guardian accepted the service
         * agreement.
         */
        user_agent?: string | null;
      }
    }

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

    export interface FutureRequirements {
      /**
       * Fields that need to be resolved to keep the person's account enabled. If not
       * resolved by the account's `future_requirements[current_deadline]`, these fields
       * will transition to the main `requirements` hash, and may immediately become
       * `past_due`, but the account may also be given a grace period depending on the
       * account's enablement state prior to transition.
       */
      currently_due: Array<string>;

      /**
       * Details about validation and verification failures for `due` requirements that
       * must be resolved.
       */
      errors: Array<Shared.AccountRequirementsError>;

      /**
       * Fields you must collect when all thresholds are reached. As they become
       * required, they appear in `currently_due` as well, and the account's
       * `future_requirements[current_deadline]` becomes set.
       */
      eventually_due: Array<string>;

      /**
       * Fields that haven't been resolved by the account's
       * `requirements.current_deadline`. These fields need to be resolved to enable the
       * person's account. `future_requirements.past_due` is a subset of
       * `requirements.past_due`.
       */
      past_due: Array<string>;

      /**
       * Fields that are being reviewed, or might become required depending on the
       * results of a review. If the review fails, these fields can move to
       * `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might
       * appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in
       * `pending_verification` if one verification fails but another is still pending.
       */
      pending_verification: Array<string>;

      /**
       * Fields that are due and can be resolved by providing the corresponding
       * alternative fields instead. Many alternatives can list the same
       * `original_fields_due`, and any of these alternatives can serve as a pathway for
       * attempting to resolve the fields again. Re-providing `original_fields_due` also
       * serves as a pathway for attempting to resolve the fields again.
       */
      alternatives?: Array<AccountsAPI.AccountRequirementsAlternative> | null;
    }

    export interface Relationship {
      /**
       * Whether the person is the authorizer of the account's representative.
       */
      authorizer?: boolean | null;

      /**
       * Whether the person is a director of the account's legal entity. Directors are
       * typically members of the governing board of the company, or responsible for
       * ensuring the company meets its regulatory obligations.
       */
      director?: boolean | null;

      /**
       * Whether the person has significant responsibility to control, manage, or direct
       * the organization.
       */
      executive?: boolean | null;

      /**
       * Whether the person is the legal guardian of the account's representative.
       */
      legal_guardian?: boolean | null;

      /**
       * Whether the person is an owner of the account’s legal entity.
       */
      owner?: boolean | null;

      /**
       * The percent owned by the person of the account's legal entity.
       */
      percent_ownership?: number | null;

      /**
       * Whether the person is authorized as the primary representative of the account.
       * This is the person nominated by the business to provide information about
       * themselves, and general information about the account. There can only be one
       * representative at any given time. At the time the account is created, this
       * person should be set to the person responsible for opening the account.
       */
      representative?: boolean | null;

      /**
       * The person's title (e.g., CEO, Support Engineer).
       */
      title?: string | null;
    }

    export interface Requirements {
      /**
       * Fields that need to be resolved to keep the person's account enabled. If not
       * resolved by the account's `current_deadline`, these fields will appear in
       * `past_due` as well, and the account is disabled.
       */
      currently_due: Array<string>;

      /**
       * Details about validation and verification failures for `due` requirements that
       * must be resolved.
       */
      errors: Array<Shared.AccountRequirementsError>;

      /**
       * Fields you must collect when all thresholds are reached. As they become
       * required, they appear in `currently_due` as well, and the account's
       * `current_deadline` becomes set.
       */
      eventually_due: Array<string>;

      /**
       * Fields that haven't been resolved by `current_deadline`. These fields need to be
       * resolved to enable the person's account.
       */
      past_due: Array<string>;

      /**
       * Fields that are being reviewed, or might become required depending on the
       * results of a review. If the review fails, these fields can move to
       * `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might
       * appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in
       * `pending_verification` if one verification fails but another is still pending.
       */
      pending_verification: Array<string>;

      /**
       * Fields that are due and can be resolved by providing the corresponding
       * alternative fields instead. Many alternatives can list the same
       * `original_fields_due`, and any of these alternatives can serve as a pathway for
       * attempting to resolve the fields again. Re-providing `original_fields_due` also
       * serves as a pathway for attempting to resolve the fields again.
       */
      alternatives?: Array<AccountsAPI.AccountRequirementsAlternative> | null;
    }

    export interface UsCfpbData {
      ethnicity_details?: UsCfpbData.EthnicityDetails | null;

      race_details?: UsCfpbData.RaceDetails | null;

      /**
       * The persons self-identified gender
       */
      self_identified_gender?: string | null;
    }

    export namespace UsCfpbData {
      export interface EthnicityDetails {
        /**
         * The persons ethnicity
         */
        ethnicity?: Array<
          | 'cuban'
          | 'hispanic_or_latino'
          | 'mexican'
          | 'not_hispanic_or_latino'
          | 'other_hispanic_or_latino'
          | 'prefer_not_to_answer'
          | 'puerto_rican'
        > | null;

        /**
         * Please specify your origin, when other is selected.
         */
        ethnicity_other?: string | null;
      }

      export interface RaceDetails {
        /**
         * The persons race.
         */
        race?: Array<
          | 'african_american'
          | 'american_indian_or_alaska_native'
          | 'asian'
          | 'asian_indian'
          | 'black_or_african_american'
          | 'chinese'
          | 'ethiopian'
          | 'filipino'
          | 'guamanian_or_chamorro'
          | 'haitian'
          | 'jamaican'
          | 'japanese'
          | 'korean'
          | 'native_hawaiian'
          | 'native_hawaiian_or_other_pacific_islander'
          | 'nigerian'
          | 'other_asian'
          | 'other_black_or_african_american'
          | 'other_pacific_islander'
          | 'prefer_not_to_answer'
          | 'samoan'
          | 'somali'
          | 'vietnamese'
          | 'white'
        > | null;

        /**
         * Please specify your race, when other is selected.
         */
        race_other?: string | null;
      }
    }

    export interface Verification {
      /**
       * The state of verification for the person. Possible values are `unverified`,
       * `pending`, or `verified`. Please refer
       * [guide](https://docs.stripe.com/connect/handling-api-verification) to handle
       * verification updates.
       */
      status: string;

      additional_document?: Verification.AdditionalDocument | null;

      /**
       * A user-displayable string describing the verification state for the person. For
       * example, this may say "Provided identity information could not be verified".
       */
      details?: string | null;

      /**
       * One of `document_address_mismatch`, `document_dob_mismatch`,
       * `document_duplicate_type`, `document_id_number_mismatch`,
       * `document_name_mismatch`, `document_nationality_mismatch`,
       * `failed_keyed_identity`, or `failed_other`. A machine-readable code specifying
       * the verification state for the person.
       */
      details_code?: string | null;

      document?: Verification.Document;
    }

    export namespace Verification {
      export interface AdditionalDocument {
        /**
         * The back of an ID returned by a
         * [file upload](https://api.stripe.com#create_file) with a `purpose` value of
         * `identity_document`.
         */
        back?: string | DisputesAPI.File | null;

        /**
         * A user-displayable string describing the verification state of this document.
         * For example, if a document is uploaded and the picture is too fuzzy, this may
         * say "Identity document is too unclear to read".
         */
        details?: string | null;

        /**
         * One of `document_corrupt`, `document_country_not_supported`, `document_expired`,
         * `document_failed_copy`, `document_failed_other`, `document_failed_test_mode`,
         * `document_fraudulent`, `document_failed_greyscale`, `document_incomplete`,
         * `document_invalid`, `document_manipulated`, `document_missing_back`,
         * `document_missing_front`, `document_not_readable`, `document_not_uploaded`,
         * `document_photo_mismatch`, `document_too_large`, or
         * `document_type_not_supported`. A machine-readable code specifying the
         * verification state for this document.
         */
        details_code?: string | null;

        /**
         * The front of an ID returned by a
         * [file upload](https://api.stripe.com#create_file) with a `purpose` value of
         * `identity_document`.
         */
        front?: string | DisputesAPI.File | null;
      }

      export interface Document {
        /**
         * The back of an ID returned by a
         * [file upload](https://api.stripe.com#create_file) with a `purpose` value of
         * `identity_document`.
         */
        back?: string | DisputesAPI.File | null;

        /**
         * A user-displayable string describing the verification state of this document.
         * For example, if a document is uploaded and the picture is too fuzzy, this may
         * say "Identity document is too unclear to read".
         */
        details?: string | null;

        /**
         * One of `document_corrupt`, `document_country_not_supported`, `document_expired`,
         * `document_failed_copy`, `document_failed_other`, `document_failed_test_mode`,
         * `document_fraudulent`, `document_failed_greyscale`, `document_incomplete`,
         * `document_invalid`, `document_manipulated`, `document_missing_back`,
         * `document_missing_front`, `document_not_readable`, `document_not_uploaded`,
         * `document_photo_mismatch`, `document_too_large`, or
         * `document_type_not_supported`. A machine-readable code specifying the
         * verification state for this document.
         */
        details_code?: string | null;

        /**
         * The front of an ID returned by a
         * [file upload](https://api.stripe.com#create_file) with a `purpose` value of
         * `identity_document`.
         */
        front?: string | DisputesAPI.File | null;
      }
    }
  }

  export interface Requirements {
    /**
     * Fields that are due and can be resolved by providing the corresponding
     * alternative fields instead. Many alternatives can list the same
     * `original_fields_due`, and any of these alternatives can serve as a pathway for
     * attempting to resolve the fields again. Re-providing `original_fields_due` also
     * serves as a pathway for attempting to resolve the fields again.
     */
    alternatives?: Array<AccountsAPI.AccountRequirementsAlternative> | null;

    /**
     * Date by which the fields in `currently_due` must be collected to keep the
     * account enabled. These fields may disable the account sooner if the next
     * threshold is reached before they are collected.
     */
    current_deadline?: number | null;

    /**
     * Fields that need to be resolved to keep the account enabled. If not resolved by
     * `current_deadline`, these fields will appear in `past_due` as well, and the
     * account is disabled.
     */
    currently_due?: Array<string> | null;

    /**
     * If the account is disabled, this enum describes why.
     * [Learn more about handling verification issues](https://docs.stripe.com/connect/handling-api-verification).
     */
    disabled_reason?:
      | 'action_required.requested_capabilities'
      | 'listed'
      | 'other'
      | 'platform_paused'
      | 'rejected.fraud'
      | 'rejected.incomplete_verification'
      | 'rejected.listed'
      | 'rejected.other'
      | 'rejected.platform_fraud'
      | 'rejected.platform_other'
      | 'rejected.platform_terms_of_service'
      | 'rejected.terms_of_service'
      | 'requirements.past_due'
      | 'requirements.pending_verification'
      | 'under_review'
      | null;

    /**
     * Details about validation and verification failures for `due` requirements that
     * must be resolved.
     */
    errors?: Array<Shared.AccountRequirementsError> | null;

    /**
     * Fields you must collect when all thresholds are reached. As they become
     * required, they appear in `currently_due` as well, and `current_deadline` becomes
     * set.
     */
    eventually_due?: Array<string> | null;

    /**
     * Fields that haven't been resolved by `current_deadline`. These fields need to be
     * resolved to enable the account.
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

  export interface TosAcceptance {
    /**
     * The Unix timestamp marking when the account representative accepted their
     * service agreement
     */
    date?: number | null;

    /**
     * The IP address from which the account representative accepted their service
     * agreement
     */
    ip?: string | null;

    /**
     * The user's service agreement type
     */
    service_agreement?: string;

    /**
     * The user agent of the browser from which the account representative accepted
     * their service agreement
     */
    user_agent?: string | null;
  }
}

export interface AccountInvoicesSettings {
  /**
   * The list of default Account Tax IDs to automatically include on invoices.
   * Account Tax IDs get added when an invoice is finalized.
   */
  default_account_tax_ids?: Array<string | CustomersAPI.TaxID> | null;

  /**
   * Whether to save the payment method after a payment is completed for a one-time
   * invoice or a subscription invoice when the customer already has a default
   * payment method on the hosted invoice page.
   */
  hosted_payment_method_save?: 'always' | 'never' | 'offer' | null;
}

export interface AccountRequirementsAlternative {
  /**
   * Fields that can be provided to resolve all fields in `original_fields_due`.
   */
  alternative_fields_due: Array<string>;

  /**
   * Fields that are due and can be resolved by providing all fields in
   * `alternative_fields_due`.
   */
  original_fields_due: Array<string>;
}

export interface AccountSettings {
  branding: AccountSettings.Branding;

  card_payments: AccountSettings.CardPayments;

  dashboard: AccountSettings.Dashboard;

  payments: AccountSettings.Payments;

  bacs_debit_payments?: AccountSettings.BacsDebitPayments;

  card_issuing?: AccountSettings.CardIssuing;

  invoices?: AccountInvoicesSettings;

  payouts?: AccountSettings.Payouts;

  sepa_debit_payments?: AccountSettings.SepaDebitPayments;

  treasury?: AccountSettings.Treasury;
}

export namespace AccountSettings {
  export interface Branding {
    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) An icon for
     * the account. Must be square and at least 128px x 128px.
     */
    icon?: string | DisputesAPI.File | null;

    /**
     * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A logo for
     * the account that will be used in Checkout instead of the icon and without the
     * account's name next to it if provided. Must be at least 128px x 128px.
     */
    logo?: string | DisputesAPI.File | null;

    /**
     * A CSS hex color value representing the primary branding color for this account
     */
    primary_color?: string | null;

    /**
     * A CSS hex color value representing the secondary branding color for this account
     */
    secondary_color?: string | null;
  }

  export interface CardPayments {
    decline_on?: CardPayments.DeclineOn;

    /**
     * The default text that appears on credit card statements when a charge is made.
     * This field prefixes any dynamic `statement_descriptor` specified on the charge.
     * `statement_descriptor_prefix` is useful for maximizing descriptor space for the
     * dynamic portion.
     */
    statement_descriptor_prefix?: string | null;

    /**
     * The Kana variation of the default text that appears on credit card statements
     * when a charge is made (Japan only). This field prefixes any dynamic
     * `statement_descriptor_suffix_kana` specified on the charge.
     * `statement_descriptor_prefix_kana` is useful for maximizing descriptor space for
     * the dynamic portion.
     */
    statement_descriptor_prefix_kana?: string | null;

    /**
     * The Kanji variation of the default text that appears on credit card statements
     * when a charge is made (Japan only). This field prefixes any dynamic
     * `statement_descriptor_suffix_kanji` specified on the charge.
     * `statement_descriptor_prefix_kanji` is useful for maximizing descriptor space
     * for the dynamic portion.
     */
    statement_descriptor_prefix_kanji?: string | null;
  }

  export namespace CardPayments {
    export interface DeclineOn {
      /**
       * Whether Stripe automatically declines charges with an incorrect ZIP or postal
       * code. This setting only applies when a ZIP or postal code is provided and they
       * fail bank verification.
       */
      avs_failure: boolean;

      /**
       * Whether Stripe automatically declines charges with an incorrect CVC. This
       * setting only applies when a CVC is provided and it fails bank verification.
       */
      cvc_failure: boolean;
    }
  }

  export interface Dashboard {
    /**
     * The display name for this account. This is used on the Stripe Dashboard to
     * differentiate between accounts.
     */
    display_name?: string | null;

    /**
     * The timezone used in the Stripe Dashboard for this account. A list of possible
     * time zone values is maintained at the
     * [IANA Time Zone Database](http://www.iana.org/time-zones).
     */
    timezone?: string | null;
  }

  export interface Payments {
    /**
     * The default text that appears on credit card statements when a charge is made.
     * This field prefixes any dynamic `statement_descriptor` specified on the charge.
     */
    statement_descriptor?: string | null;

    /**
     * The Kana variation of `statement_descriptor` used for charges in Japan. Japanese
     * statement descriptors have
     * [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors#set-japanese-statement-descriptors).
     */
    statement_descriptor_kana?: string | null;

    /**
     * The Kanji variation of `statement_descriptor` used for charges in Japan.
     * Japanese statement descriptors have
     * [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors#set-japanese-statement-descriptors).
     */
    statement_descriptor_kanji?: string | null;
  }

  export interface BacsDebitPayments {
    /**
     * The Bacs Direct Debit display name for this account. For payments made with Bacs
     * Direct Debit, this name appears on the mandate as the statement descriptor.
     * Mobile banking apps display it as the name of the business. To use custom
     * branding, set the Bacs Direct Debit Display Name during or right after creation.
     * Custom branding incurs an additional monthly fee for the platform. The fee
     * appears 5 business days after requesting Bacs. If you don't set the display name
     * before requesting Bacs capability, it's automatically set as "Stripe" and the
     * account is onboarded to Stripe branding, which is free.
     */
    display_name?: string | null;

    /**
     * The Bacs Direct Debit Service user number for this account. For payments made
     * with Bacs Direct Debit, this number is a unique identifier of the account with
     * our banking partners.
     */
    service_user_number?: string | null;
  }

  export interface CardIssuing {
    tos_acceptance?: CardIssuing.TosAcceptance;
  }

  export namespace CardIssuing {
    export interface TosAcceptance {
      /**
       * The Unix timestamp marking when the account representative accepted the service
       * agreement.
       */
      date?: number | null;

      /**
       * The IP address from which the account representative accepted the service
       * agreement.
       */
      ip?: string | null;

      /**
       * The user agent of the browser from which the account representative accepted the
       * service agreement.
       */
      user_agent?: string;
    }
  }

  export interface Payouts {
    /**
     * A Boolean indicating if Stripe should try to reclaim negative balances from an
     * attached bank account. See
     * [Understanding Connect account balances](/connect/account-balances) for details.
     * The default value is `false` when
     * [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
     * is `application`, which includes Custom accounts, otherwise `true`.
     */
    debit_negative_balances: boolean;

    schedule: Payouts.Schedule;

    /**
     * The text that appears on the bank account statement for payouts. If not set,
     * this defaults to the platform's bank descriptor as set in the Dashboard.
     */
    statement_descriptor?: string | null;
  }

  export namespace Payouts {
    export interface Schedule {
      /**
       * The number of days charges for the account will be held before being paid out.
       */
      delay_days: number;

      /**
       * How frequently funds will be paid out. One of `manual` (payouts only created via
       * API call), `daily`, `weekly`, or `monthly`.
       */
      interval: string;

      /**
       * The day of the month funds will be paid out. Only shown if `interval` is
       * monthly. Payouts scheduled between the 29th and 31st of the month are sent on
       * the last day of shorter months.
       */
      monthly_anchor?: number;

      /**
       * The days of the month funds will be paid out. Only shown if `interval` is
       * monthly. Payouts scheduled between the 29th and 31st of the month are sent on
       * the last day of shorter months.
       */
      monthly_payout_days?: Array<number>;

      /**
       * The day of the week funds will be paid out, of the style 'monday', 'tuesday',
       * etc. Only shown if `interval` is weekly.
       */
      weekly_anchor?: string;

      /**
       * The days of the week when available funds are paid out, specified as an array,
       * for example, [`monday`, `tuesday`]. Only shown if `interval` is weekly.
       */
      weekly_payout_days?: Array<'friday' | 'monday' | 'thursday' | 'tuesday' | 'wednesday'>;
    }
  }

  export interface SepaDebitPayments {
    /**
     * SEPA creditor identifier that identifies the company making the payment.
     */
    creditor_id?: string;
  }

  export interface Treasury {
    tos_acceptance?: Treasury.TosAcceptance;
  }

  export namespace Treasury {
    export interface TosAcceptance {
      /**
       * The Unix timestamp marking when the account representative accepted the service
       * agreement.
       */
      date?: number | null;

      /**
       * The IP address from which the account representative accepted the service
       * agreement.
       */
      ip?: string | null;

      /**
       * The user agent of the browser from which the account representative accepted the
       * service agreement.
       */
      user_agent?: string;
    }
  }
}

export interface LegalEntityJapanAddress {
  /**
   * City/Ward.
   */
  city?: string | null;

  /**
   * Two-letter country code
   * ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
   */
  country?: string | null;

  /**
   * Block/Building number.
   */
  line1?: string | null;

  /**
   * Building details.
   */
  line2?: string | null;

  /**
   * ZIP or postal code.
   */
  postal_code?: string | null;

  /**
   * Prefecture.
   */
  state?: string | null;

  /**
   * Town/cho-me.
   */
  town?: string | null;
}

export interface AccountRetrieveParams {
  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;
}

export declare namespace Accounts {
  export {
    type Account as Account,
    type AccountInvoicesSettings as AccountInvoicesSettings,
    type AccountRequirementsAlternative as AccountRequirementsAlternative,
    type AccountSettings as AccountSettings,
    type LegalEntityJapanAddress as LegalEntityJapanAddress,
    type AccountRetrieveParams as AccountRetrieveParams,
  };
}
