// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as PaymentLinksAPI from './payment-links';
import * as AccountsAPI from './accounts';
import * as CustomersAPI from './customers';
import * as InvoicesAPI from './invoices';
import * as PricesAPI from './prices';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class PaymentLinks extends APIResource {
  /**
   * <p>Creates a payment link.</p>
   */
  create(body: PaymentLinkCreateParams, options?: RequestOptions): APIPromise<PaymentLinkCreateResponse> {
    return this._client.post('/v1/payment_links', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }
}

export interface CustomTextPosition {
  /**
   * Text may be up to 1200 characters in length.
   */
  message: string;
}

/**
 * A payment link is a shareable URL that will take your customers to a hosted
 * payment page. A payment link can be shared and used multiple times.
 *
 * When a customer opens a payment link it will open a new
 * [checkout session](https://docs.stripe.com/api/checkout/sessions) to render the
 * payment page. You can use
 * [checkout session events](https://docs.stripe.com/api/events/types#event_types-checkout.session.completed)
 * to track payments through payment links.
 *
 * Related guide: [Payment Links API](https://docs.stripe.com/payment-links)
 */
export interface PaymentLinkCreateResponse {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Whether the payment link's `url` is active. If `false`, customers visiting the
   * URL will be shown a page saying that the link has been deactivated.
   */
  active: boolean;

  after_completion: PaymentLinkCreateResponse.AfterCompletion;

  /**
   * Whether user redeemable promotion codes are enabled.
   */
  allow_promotion_codes: boolean;

  automatic_tax: PaymentLinkCreateResponse.AutomaticTax;

  /**
   * Configuration for collecting the customer's billing address. Defaults to `auto`.
   */
  billing_address_collection: 'auto' | 'required';

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * Collect additional information from your customer using custom fields. Up to 3
   * fields are supported. You can't set this parameter if `ui_mode` is `custom`.
   */
  custom_fields: Array<PaymentLinkCreateResponse.CustomField>;

  custom_text: PaymentLinkCreateResponse.CustomText;

  /**
   * Configuration for Customer creation during checkout.
   */
  customer_creation: 'always' | 'if_required';

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
  object: 'payment_link';

  /**
   * Configuration for collecting a payment method during checkout. Defaults to
   * `always`.
   */
  payment_method_collection: 'always' | 'if_required';

  phone_number_collection: PaymentLinkCreateResponse.PhoneNumberCollection;

  /**
   * The shipping rate options applied to the session.
   */
  shipping_options: Array<PaymentLinkCreateResponse.ShippingOption>;

  /**
   * Indicates the type of transaction being performed which customizes relevant text
   * on the page, such as the submit button.
   */
  submit_type: 'auto' | 'book' | 'donate' | 'pay' | 'subscribe';

  tax_id_collection: PaymentLinkCreateResponse.TaxIDCollection;

  /**
   * The public URL that can be shared with customers.
   */
  url: string;

  /**
   * The ID of the Connect application that created the Payment Link.
   */
  application?: string | Shared.Application | Shared.DeletedApplication | null;

  /**
   * The amount of the application fee (if any) that will be requested to be applied
   * to the payment and transferred to the application owner's Stripe account.
   */
  application_fee_amount?: number | null;

  /**
   * This represents the percentage of the subscription invoice total that will be
   * transferred to the application owner's Stripe account.
   */
  application_fee_percent?: number | null;

  consent_collection?: PaymentLinkCreateResponse.ConsentCollection | null;

  /**
   * The custom message to be displayed to a customer when a payment link is no
   * longer active.
   */
  inactive_message?: string | null;

  invoice_creation?: PaymentLinkCreateResponse.InvoiceCreation | null;

  /**
   * The line items representing what is being sold.
   */
  line_items?: PaymentLinkCreateResponse.LineItems;

  name_collection?: PaymentLinkCreateResponse.NameCollection;

  /**
   * The account on behalf of which to charge. See the
   * [Connect documentation](https://support.stripe.com/questions/sending-invoices-on-behalf-of-connected-accounts)
   * for details.
   */
  on_behalf_of?: string | AccountsAPI.Account | null;

  /**
   * The optional items presented to the customer at checkout.
   */
  optional_items?: Array<PaymentLinkCreateResponse.OptionalItem> | null;

  payment_intent_data?: PaymentLinkCreateResponse.PaymentIntentData | null;

  /**
   * The list of payment method types that customers can use. When `null`, Stripe
   * will dynamically show relevant payment methods you've enabled in your
   * [payment method settings](https://dashboard.stripe.com/settings/payment_methods).
   */
  payment_method_types?: Array<
    | 'affirm'
    | 'afterpay_clearpay'
    | 'alipay'
    | 'alma'
    | 'au_becs_debit'
    | 'bacs_debit'
    | 'bancontact'
    | 'billie'
    | 'blik'
    | 'boleto'
    | 'card'
    | 'cashapp'
    | 'eps'
    | 'fpx'
    | 'giropay'
    | 'grabpay'
    | 'ideal'
    | 'klarna'
    | 'konbini'
    | 'link'
    | 'mb_way'
    | 'mobilepay'
    | 'multibanco'
    | 'oxxo'
    | 'p24'
    | 'pay_by_bank'
    | 'paynow'
    | 'paypal'
    | 'payto'
    | 'pix'
    | 'promptpay'
    | 'satispay'
    | 'sepa_debit'
    | 'sofort'
    | 'swish'
    | 'twint'
    | 'us_bank_account'
    | 'wechat_pay'
    | 'zip'
  > | null;

  restrictions?: PaymentLinkCreateResponse.Restrictions | null;

  shipping_address_collection?: PaymentLinkCreateResponse.ShippingAddressCollection | null;

  subscription_data?: PaymentLinkCreateResponse.SubscriptionData | null;

  transfer_data?: PaymentLinkCreateResponse.TransferData | null;
}

export namespace PaymentLinkCreateResponse {
  export interface AfterCompletion {
    /**
     * The specified behavior after the purchase is complete.
     */
    type: 'hosted_confirmation' | 'redirect';

    hosted_confirmation?: AfterCompletion.HostedConfirmation;

    redirect?: AfterCompletion.Redirect;
  }

  export namespace AfterCompletion {
    export interface HostedConfirmation {
      /**
       * The custom message that is displayed to the customer after the purchase is
       * complete.
       */
      custom_message?: string | null;
    }

    export interface Redirect {
      /**
       * The URL the customer will be redirected to after the purchase is complete.
       */
      url: string;
    }
  }

  export interface AutomaticTax {
    /**
     * If `true`, tax will be calculated automatically using the customer's location.
     */
    enabled: boolean;

    liability?: InvoicesAPI.ConnectAccountReference | null;
  }

  export interface CustomField {
    /**
     * String of your choice that your integration can use to reconcile this field.
     * Must be unique to this field, alphanumeric, and up to 200 characters.
     */
    key: string;

    label: CustomField.Label;

    /**
     * Whether the customer is required to complete the field before completing the
     * Checkout Session. Defaults to `false`.
     */
    optional: boolean;

    /**
     * The type of the field.
     */
    type: 'dropdown' | 'numeric' | 'text';

    dropdown?: CustomField.Dropdown;

    numeric?: CustomField.Numeric;

    text?: CustomField.Text;
  }

  export namespace CustomField {
    export interface Label {
      /**
       * The type of the label.
       */
      type: 'custom';

      /**
       * Custom text for the label, displayed to the customer. Up to 50 characters.
       */
      custom?: string | null;
    }

    export interface Dropdown {
      /**
       * The options available for the customer to select. Up to 200 options allowed.
       */
      options: Array<Dropdown.Option>;

      /**
       * The value that will pre-fill on the payment page.
       */
      default_value?: string | null;
    }

    export namespace Dropdown {
      export interface Option {
        /**
         * The label for the option, displayed to the customer. Up to 100 characters.
         */
        label: string;

        /**
         * The value for this option, not displayed to the customer, used by your
         * integration to reconcile the option selected by the customer. Must be unique to
         * this option, alphanumeric, and up to 100 characters.
         */
        value: string;
      }
    }

    export interface Numeric {
      /**
       * The value that will pre-fill the field on the payment page.
       */
      default_value?: string | null;

      /**
       * The maximum character length constraint for the customer's input.
       */
      maximum_length?: number | null;

      /**
       * The minimum character length requirement for the customer's input.
       */
      minimum_length?: number | null;
    }

    export interface Text {
      /**
       * The value that will pre-fill the field on the payment page.
       */
      default_value?: string | null;

      /**
       * The maximum character length constraint for the customer's input.
       */
      maximum_length?: number | null;

      /**
       * The minimum character length requirement for the customer's input.
       */
      minimum_length?: number | null;
    }
  }

  export interface CustomText {
    after_submit?: PaymentLinksAPI.CustomTextPosition | null;

    shipping_address?: PaymentLinksAPI.CustomTextPosition | null;

    submit?: PaymentLinksAPI.CustomTextPosition | null;

    terms_of_service_acceptance?: PaymentLinksAPI.CustomTextPosition | null;
  }

  export interface PhoneNumberCollection {
    /**
     * If `true`, a phone number will be collected during checkout.
     */
    enabled: boolean;
  }

  export interface ShippingOption {
    /**
     * A non-negative integer in cents representing how much to charge.
     */
    shipping_amount: number;

    /**
     * The ID of the Shipping Rate to use for this shipping option.
     */
    shipping_rate: string | ShippingOption.ShippingRate;
  }

  export namespace ShippingOption {
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
  }

  export interface TaxIDCollection {
    /**
     * Indicates whether tax ID collection is enabled for the session.
     */
    enabled: boolean;

    required: 'if_supported' | 'never';
  }

  export interface ConsentCollection {
    payment_method_reuse_agreement?: ConsentCollection.PaymentMethodReuseAgreement | null;

    /**
     * If set to `auto`, enables the collection of customer consent for promotional
     * communications.
     */
    promotions?: 'auto' | 'none' | null;

    /**
     * If set to `required`, it requires cutomers to accept the terms of service before
     * being able to pay. If set to `none`, customers won't be shown a checkbox to
     * accept the terms of service.
     */
    terms_of_service?: 'none' | 'required' | null;
  }

  export namespace ConsentCollection {
    export interface PaymentMethodReuseAgreement {
      /**
       * Determines the position and visibility of the payment method reuse agreement in
       * the UI. When set to `auto`, Stripe's defaults will be used.
       *
       * When set to `hidden`, the payment method reuse agreement text will always be
       * hidden in the UI.
       */
      position: 'auto' | 'hidden';
    }
  }

  export interface InvoiceCreation {
    /**
     * Enable creating an invoice on successful payment.
     */
    enabled: boolean;

    invoice_data?: InvoiceCreation.InvoiceData | null;
  }

  export namespace InvoiceCreation {
    export interface InvoiceData {
      /**
       * The account tax IDs associated with the invoice.
       */
      account_tax_ids?: Array<string | CustomersAPI.TaxID | Shared.DeletedTaxID> | null;

      /**
       * A list of up to 4 custom fields to be displayed on the invoice.
       */
      custom_fields?: Array<Shared.InvoiceSettingCustomField> | null;

      /**
       * An arbitrary string attached to the object. Often useful for displaying to
       * users.
       */
      description?: string | null;

      /**
       * Footer to be displayed on the invoice.
       */
      footer?: string | null;

      issuer?: InvoicesAPI.ConnectAccountReference | null;

      /**
       * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
       * attach to an object. This can be useful for storing additional information about
       * the object in a structured format.
       */
      metadata?: { [key: string]: string } | null;

      rendering_options?: InvoiceData.RenderingOptions | null;
    }

    export namespace InvoiceData {
      export interface RenderingOptions {
        /**
         * How line-item prices and amounts will be displayed with respect to tax on
         * invoice PDFs.
         */
        amount_tax_display?: string | null;

        /**
         * ID of the invoice rendering template to be used for the generated invoice.
         */
        template?: string | null;
      }
    }
  }

  /**
   * The line items representing what is being sold.
   */
  export interface LineItems {
    /**
     * Details about each object.
     */
    data: Array<LineItems.Data>;

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

  export namespace LineItems {
    /**
     * A line item.
     */
    export interface Data {
      /**
       * Unique identifier for the object.
       */
      id: string;

      /**
       * Total discount amount applied. If no discounts were applied, defaults to 0.
       */
      amount_discount: number;

      /**
       * Total before any discounts or taxes are applied.
       */
      amount_subtotal: number;

      /**
       * Total tax amount applied. If no tax was applied, defaults to 0.
       */
      amount_tax: number;

      /**
       * Total after discounts and taxes.
       */
      amount_total: number;

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
      object: 'item';

      adjustable_quantity?: Data.AdjustableQuantity | null;

      /**
       * An arbitrary string attached to the object. Often useful for displaying to
       * users. Defaults to product name.
       */
      description?: string | null;

      /**
       * The discounts applied to the line item.
       */
      discounts?: Array<Data.Discount>;

      /**
       * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
       * attach to an object. This can be useful for storing additional information about
       * the object in a structured format.
       */
      metadata?: { [key: string]: string } | null;

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
      price?: PricesAPI.Price | null;

      /**
       * The quantity of products being purchased.
       */
      quantity?: number | null;

      /**
       * The taxes applied to the line item.
       */
      taxes?: Array<Data.Tax>;
    }

    export namespace Data {
      export interface AdjustableQuantity {
        enabled: boolean;

        maximum?: number | null;

        minimum?: number | null;
      }

      export interface Discount {
        /**
         * The amount discounted.
         */
        amount: number;

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
        discount: CustomersAPI.Discount;
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
  }

  export interface NameCollection {
    business?: NameCollection.Business;

    individual?: NameCollection.Individual;
  }

  export namespace NameCollection {
    export interface Business {
      /**
       * Indicates whether business name collection is enabled for the payment link.
       */
      enabled: boolean;

      /**
       * Whether the customer is required to complete the field before checking out.
       * Defaults to `false`.
       */
      optional: boolean;
    }

    export interface Individual {
      /**
       * Indicates whether individual name collection is enabled for the payment link.
       */
      enabled: boolean;

      /**
       * Whether the customer is required to complete the field before checking out.
       * Defaults to `false`.
       */
      optional: boolean;
    }
  }

  export interface OptionalItem {
    price: string;

    quantity: number;

    adjustable_quantity?: OptionalItem.AdjustableQuantity | null;
  }

  export namespace OptionalItem {
    export interface AdjustableQuantity {
      /**
       * Set to true if the quantity can be adjusted to any non-negative integer.
       */
      enabled: boolean;

      /**
       * The maximum quantity of this item the customer can purchase. By default this
       * value is 99.
       */
      maximum?: number | null;

      /**
       * The minimum quantity of this item the customer must purchase, if they choose to
       * purchase it. Because this item is optional, the customer will always be able to
       * remove it from their order, even if the `minimum` configured here is greater
       * than 0. By default this value is 0.
       */
      minimum?: number | null;
    }
  }

  export interface PaymentIntentData {
    /**
     * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that will set
     * metadata on [Payment Intents](https://docs.stripe.com/api/payment_intents)
     * generated from this payment link.
     */
    metadata: { [key: string]: string };

    /**
     * Indicates when the funds will be captured from the customer's account.
     */
    capture_method?: 'automatic' | 'automatic_async' | 'manual' | null;

    /**
     * An arbitrary string attached to the object. Often useful for displaying to
     * users.
     */
    description?: string | null;

    /**
     * Indicates that you intend to make future payments with the payment method
     * collected during checkout.
     */
    setup_future_usage?: 'off_session' | 'on_session' | null;

    /**
     * For a non-card payment, information about the charge that appears on the
     * customer's statement when this payment succeeds in creating a charge.
     */
    statement_descriptor?: string | null;

    /**
     * For a card payment, information about the charge that appears on the customer's
     * statement when this payment succeeds in creating a charge. Concatenated with the
     * account's statement descriptor prefix to form the complete statement descriptor.
     */
    statement_descriptor_suffix?: string | null;

    /**
     * A string that identifies the resulting payment as part of a group. See the
     * PaymentIntents
     * [use case for connected accounts](https://docs.stripe.com/connect/separate-charges-and-transfers)
     * for details.
     */
    transfer_group?: string | null;
  }

  export interface Restrictions {
    completed_sessions: Restrictions.CompletedSessions;
  }

  export namespace Restrictions {
    export interface CompletedSessions {
      /**
       * The current number of checkout sessions that have been completed on the payment
       * link which count towards the `completed_sessions` restriction to be met.
       */
      count: number;

      /**
       * The maximum number of checkout sessions that can be completed for the
       * `completed_sessions` restriction to be met.
       */
      limit: number;
    }
  }

  export interface ShippingAddressCollection {
    /**
     * An array of two-letter ISO country codes representing which countries Checkout
     * should provide as options for shipping locations. Unsupported country codes:
     * `AS, CX, CC, CU, HM, IR, KP, MH, FM, NF, MP, PW, SD, SY, UM, VI`.
     */
    allowed_countries: Array<
      | 'AC'
      | 'AD'
      | 'AE'
      | 'AF'
      | 'AG'
      | 'AI'
      | 'AL'
      | 'AM'
      | 'AO'
      | 'AQ'
      | 'AR'
      | 'AT'
      | 'AU'
      | 'AW'
      | 'AX'
      | 'AZ'
      | 'BA'
      | 'BB'
      | 'BD'
      | 'BE'
      | 'BF'
      | 'BG'
      | 'BH'
      | 'BI'
      | 'BJ'
      | 'BL'
      | 'BM'
      | 'BN'
      | 'BO'
      | 'BQ'
      | 'BR'
      | 'BS'
      | 'BT'
      | 'BV'
      | 'BW'
      | 'BY'
      | 'BZ'
      | 'CA'
      | 'CD'
      | 'CF'
      | 'CG'
      | 'CH'
      | 'CI'
      | 'CK'
      | 'CL'
      | 'CM'
      | 'CN'
      | 'CO'
      | 'CR'
      | 'CV'
      | 'CW'
      | 'CY'
      | 'CZ'
      | 'DE'
      | 'DJ'
      | 'DK'
      | 'DM'
      | 'DO'
      | 'DZ'
      | 'EC'
      | 'EE'
      | 'EG'
      | 'EH'
      | 'ER'
      | 'ES'
      | 'ET'
      | 'FI'
      | 'FJ'
      | 'FK'
      | 'FO'
      | 'FR'
      | 'GA'
      | 'GB'
      | 'GD'
      | 'GE'
      | 'GF'
      | 'GG'
      | 'GH'
      | 'GI'
      | 'GL'
      | 'GM'
      | 'GN'
      | 'GP'
      | 'GQ'
      | 'GR'
      | 'GS'
      | 'GT'
      | 'GU'
      | 'GW'
      | 'GY'
      | 'HK'
      | 'HN'
      | 'HR'
      | 'HT'
      | 'HU'
      | 'ID'
      | 'IE'
      | 'IL'
      | 'IM'
      | 'IN'
      | 'IO'
      | 'IQ'
      | 'IS'
      | 'IT'
      | 'JE'
      | 'JM'
      | 'JO'
      | 'JP'
      | 'KE'
      | 'KG'
      | 'KH'
      | 'KI'
      | 'KM'
      | 'KN'
      | 'KR'
      | 'KW'
      | 'KY'
      | 'KZ'
      | 'LA'
      | 'LB'
      | 'LC'
      | 'LI'
      | 'LK'
      | 'LR'
      | 'LS'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'LY'
      | 'MA'
      | 'MC'
      | 'MD'
      | 'ME'
      | 'MF'
      | 'MG'
      | 'MK'
      | 'ML'
      | 'MM'
      | 'MN'
      | 'MO'
      | 'MQ'
      | 'MR'
      | 'MS'
      | 'MT'
      | 'MU'
      | 'MV'
      | 'MW'
      | 'MX'
      | 'MY'
      | 'MZ'
      | 'NA'
      | 'NC'
      | 'NE'
      | 'NG'
      | 'NI'
      | 'NL'
      | 'NO'
      | 'NP'
      | 'NR'
      | 'NU'
      | 'NZ'
      | 'OM'
      | 'PA'
      | 'PE'
      | 'PF'
      | 'PG'
      | 'PH'
      | 'PK'
      | 'PL'
      | 'PM'
      | 'PN'
      | 'PR'
      | 'PS'
      | 'PT'
      | 'PY'
      | 'QA'
      | 'RE'
      | 'RO'
      | 'RS'
      | 'RU'
      | 'RW'
      | 'SA'
      | 'SB'
      | 'SC'
      | 'SD'
      | 'SE'
      | 'SG'
      | 'SH'
      | 'SI'
      | 'SJ'
      | 'SK'
      | 'SL'
      | 'SM'
      | 'SN'
      | 'SO'
      | 'SR'
      | 'SS'
      | 'ST'
      | 'SV'
      | 'SX'
      | 'SZ'
      | 'TA'
      | 'TC'
      | 'TD'
      | 'TF'
      | 'TG'
      | 'TH'
      | 'TJ'
      | 'TK'
      | 'TL'
      | 'TM'
      | 'TN'
      | 'TO'
      | 'TR'
      | 'TT'
      | 'TV'
      | 'TW'
      | 'TZ'
      | 'UA'
      | 'UG'
      | 'US'
      | 'UY'
      | 'UZ'
      | 'VA'
      | 'VC'
      | 'VE'
      | 'VG'
      | 'VN'
      | 'VU'
      | 'WF'
      | 'WS'
      | 'XK'
      | 'YE'
      | 'YT'
      | 'ZA'
      | 'ZM'
      | 'ZW'
      | 'ZZ'
    >;
  }

  export interface SubscriptionData {
    invoice_settings: SubscriptionData.InvoiceSettings;

    /**
     * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that will set
     * metadata on [Subscriptions](https://docs.stripe.com/api/subscriptions) generated
     * from this payment link.
     */
    metadata: { [key: string]: string };

    /**
     * The subscription's description, meant to be displayable to the customer. Use
     * this field to optionally store an explanation of the subscription for rendering
     * in Stripe surfaces and certain local payment methods UIs.
     */
    description?: string | null;

    /**
     * Integer representing the number of trial period days before the customer is
     * charged for the first time.
     */
    trial_period_days?: number | null;

    /**
     * Configures how this subscription behaves during the trial period.
     */
    trial_settings?: SubscriptionData.TrialSettings | null;
  }

  export namespace SubscriptionData {
    export interface InvoiceSettings {
      issuer: InvoicesAPI.ConnectAccountReference;
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

  export interface TransferData {
    /**
     * The connected account receiving the transfer.
     */
    destination: string | AccountsAPI.Account;

    /**
     * The amount in cents (or local equivalent) that will be transferred to the
     * destination account. By default, the entire amount is transferred to the
     * destination.
     */
    amount?: number | null;
  }
}

export interface PaymentLinkCreateParams {
  /**
   * The line items representing what is being sold. Each line item represents an
   * item being sold. Up to 20 line items are supported.
   */
  line_items: Array<PaymentLinkCreateParams.LineItem>;

  /**
   * Behavior after the purchase is complete.
   */
  after_completion?: PaymentLinkCreateParams.AfterCompletion;

  /**
   * Enables user redeemable promotion codes.
   */
  allow_promotion_codes?: boolean;

  /**
   * The amount of the application fee (if any) that will be requested to be applied
   * to the payment and transferred to the application owner's Stripe account. Can
   * only be applied when there are no line items with recurring prices.
   */
  application_fee_amount?: number;

  /**
   * A non-negative decimal between 0 and 100, with at most two decimal places. This
   * represents the percentage of the subscription invoice total that will be
   * transferred to the application owner's Stripe account. There must be at least 1
   * line item with a recurring price to use this field.
   */
  application_fee_percent?: number;

  /**
   * Configuration for automatic tax collection.
   */
  automatic_tax?: PaymentLinkCreateParams.AutomaticTax;

  /**
   * Configuration for collecting the customer's billing address. Defaults to `auto`.
   */
  billing_address_collection?: 'auto' | 'required';

  /**
   * Configure fields to gather active consent from customers.
   */
  consent_collection?: PaymentLinkCreateParams.ConsentCollection;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies)
   * and supported by each line item's price.
   */
  currency?: string;

  /**
   * Collect additional information from your customer using custom fields. Up to 3
   * fields are supported. You can't set this parameter if `ui_mode` is `custom`.
   */
  custom_fields?: Array<PaymentLinkCreateParams.CustomField>;

  /**
   * Display additional text for your customers using custom text. You can't set this
   * parameter if `ui_mode` is `custom`.
   */
  custom_text?: PaymentLinkCreateParams.CustomText;

  /**
   * Configures whether
   * [checkout sessions](https://docs.stripe.com/api/checkout/sessions) created by
   * this payment link create a [Customer](https://docs.stripe.com/api/customers).
   */
  customer_creation?: 'always' | 'if_required';

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * The custom message to be displayed to a customer when a payment link is no
   * longer active.
   */
  inactive_message?: string;

  /**
   * Generate a post-purchase Invoice for one-time payments.
   */
  invoice_creation?: PaymentLinkCreateParams.InvoiceCreation;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`. Metadata associated with this Payment Link will automatically be
   * copied to [checkout sessions](https://docs.stripe.com/api/checkout/sessions)
   * created by this payment link.
   */
  metadata?: { [key: string]: string };

  /**
   * Controls settings applied for collecting the customer's name.
   */
  name_collection?: PaymentLinkCreateParams.NameCollection;

  /**
   * The account on behalf of which to charge.
   */
  on_behalf_of?: string;

  /**
   * A list of optional items the customer can add to their order at checkout. Use
   * this parameter to pass one-time or recurring
   * [Prices](https://docs.stripe.com/api/prices). There is a maximum of 10 optional
   * items allowed on a payment link, and the existing limits on the number of line
   * items allowed on a payment link apply to the combined number of line items and
   * optional items. There is a maximum of 20 combined line items and optional items.
   */
  optional_items?: Array<PaymentLinkCreateParams.OptionalItem>;

  /**
   * A subset of parameters to be passed to PaymentIntent creation for Checkout
   * Sessions in `payment` mode.
   */
  payment_intent_data?: PaymentLinkCreateParams.PaymentIntentData;

  /**
   * Specify whether Checkout should collect a payment method. When set to
   * `if_required`, Checkout will not collect a payment method when the total due for
   * the session is 0.This may occur if the Checkout Session includes a free trial or
   * a discount.
   *
   * Can only be set in `subscription` mode. Defaults to `always`.
   *
   * If you'd like information on how to collect a payment method outside of
   * Checkout, read the guide on
   * [configuring subscriptions with a free trial](https://docs.stripe.com/payments/checkout/free-trials).
   */
  payment_method_collection?: 'always' | 'if_required';

  /**
   * The list of payment method types that customers can use. If no value is passed,
   * Stripe will dynamically show relevant payment methods from your
   * [payment method settings](https://dashboard.stripe.com/settings/payment_methods)
   * (20+ payment methods
   * [supported](https://docs.stripe.com/payments/payment-methods/integration-options#payment-method-product-support)).
   */
  payment_method_types?: Array<
    | 'affirm'
    | 'afterpay_clearpay'
    | 'alipay'
    | 'alma'
    | 'au_becs_debit'
    | 'bacs_debit'
    | 'bancontact'
    | 'billie'
    | 'blik'
    | 'boleto'
    | 'card'
    | 'cashapp'
    | 'eps'
    | 'fpx'
    | 'giropay'
    | 'grabpay'
    | 'ideal'
    | 'klarna'
    | 'konbini'
    | 'link'
    | 'mb_way'
    | 'mobilepay'
    | 'multibanco'
    | 'oxxo'
    | 'p24'
    | 'pay_by_bank'
    | 'paynow'
    | 'paypal'
    | 'payto'
    | 'pix'
    | 'promptpay'
    | 'satispay'
    | 'sepa_debit'
    | 'sofort'
    | 'swish'
    | 'twint'
    | 'us_bank_account'
    | 'wechat_pay'
    | 'zip'
  >;

  /**
   * Controls phone number collection settings during checkout.
   *
   * We recommend that you review your privacy policy and check with your legal
   * contacts.
   */
  phone_number_collection?: PaymentLinkCreateParams.PhoneNumberCollection;

  /**
   * Settings that restrict the usage of a payment link.
   */
  restrictions?: PaymentLinkCreateParams.Restrictions;

  /**
   * Configuration for collecting the customer's shipping address.
   */
  shipping_address_collection?: PaymentLinkCreateParams.ShippingAddressCollection;

  /**
   * The shipping rate options to apply to
   * [checkout sessions](https://docs.stripe.com/api/checkout/sessions) created by
   * this payment link.
   */
  shipping_options?: Array<PaymentLinkCreateParams.ShippingOption>;

  /**
   * Describes the type of transaction being performed in order to customize relevant
   * text on the page, such as the submit button. Changing this value will also
   * affect the hostname in the
   * [url](https://docs.stripe.com/api/payment_links/payment_links/object#url)
   * property (example: `donate.stripe.com`).
   */
  submit_type?: 'auto' | 'book' | 'donate' | 'pay' | 'subscribe';

  /**
   * When creating a subscription, the specified configuration data will be used.
   * There must be at least one line item with a recurring price to use
   * `subscription_data`.
   */
  subscription_data?: PaymentLinkCreateParams.SubscriptionData;

  /**
   * Controls tax ID collection during checkout.
   */
  tax_id_collection?: PaymentLinkCreateParams.TaxIDCollection;

  /**
   * The account (if any) the payments will be attributed to for tax reporting, and
   * where funds from each payment will be transferred to.
   */
  transfer_data?: PaymentLinkCreateParams.TransferData;
}

export namespace PaymentLinkCreateParams {
  export interface LineItem {
    quantity: number;

    adjustable_quantity?: LineItem.AdjustableQuantity;

    price?: string;

    price_data?: LineItem.PriceData;
  }

  export namespace LineItem {
    export interface AdjustableQuantity {
      enabled: boolean;

      maximum?: number;

      minimum?: number;
    }

    export interface PriceData {
      currency: string;

      product?: string;

      product_data?: PriceData.ProductData;

      recurring?: PriceData.Recurring;

      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';

      unit_amount?: number;

      unit_amount_decimal?: string;
    }

    export namespace PriceData {
      export interface ProductData {
        name: string;

        description?: string;

        images?: Array<string>;

        metadata?: { [key: string]: string };

        tax_code?: string;

        unit_label?: string;
      }

      export interface Recurring {
        interval: 'day' | 'month' | 'week' | 'year';

        interval_count?: number;
      }
    }
  }

  /**
   * Behavior after the purchase is complete.
   */
  export interface AfterCompletion {
    type: 'hosted_confirmation' | 'redirect';

    hosted_confirmation?: AfterCompletion.HostedConfirmation;

    redirect?: AfterCompletion.Redirect;
  }

  export namespace AfterCompletion {
    export interface HostedConfirmation {
      custom_message?: string;
    }

    export interface Redirect {
      url: string;
    }
  }

  /**
   * Configuration for automatic tax collection.
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

  /**
   * Configure fields to gather active consent from customers.
   */
  export interface ConsentCollection {
    payment_method_reuse_agreement?: ConsentCollection.PaymentMethodReuseAgreement;

    promotions?: 'auto' | 'none';

    terms_of_service?: 'none' | 'required';
  }

  export namespace ConsentCollection {
    export interface PaymentMethodReuseAgreement {
      position: 'auto' | 'hidden';
    }
  }

  export interface CustomField {
    key: string;

    label: CustomField.Label;

    type: 'dropdown' | 'numeric' | 'text';

    dropdown?: CustomField.Dropdown;

    numeric?: CustomField.Numeric;

    optional?: boolean;

    text?: CustomField.Text;
  }

  export namespace CustomField {
    export interface Label {
      custom: string;

      type: 'custom';
    }

    export interface Dropdown {
      options: Array<Dropdown.Option>;

      default_value?: string;
    }

    export namespace Dropdown {
      export interface Option {
        label: string;

        value: string;
      }
    }

    export interface Numeric {
      default_value?: string;

      maximum_length?: number;

      minimum_length?: number;
    }

    export interface Text {
      default_value?: string;

      maximum_length?: number;

      minimum_length?: number;
    }
  }

  /**
   * Display additional text for your customers using custom text. You can't set this
   * parameter if `ui_mode` is `custom`.
   */
  export interface CustomText {
    after_submit?: CustomText.CustomTextPositionParam | '';

    shipping_address?: CustomText.CustomTextPositionParam | '';

    submit?: CustomText.CustomTextPositionParam | '';

    terms_of_service_acceptance?: CustomText.CustomTextPositionParam | '';
  }

  export namespace CustomText {
    export interface CustomTextPositionParam {
      message: string;
    }

    export interface CustomTextPositionParam {
      message: string;
    }

    export interface CustomTextPositionParam {
      message: string;
    }

    export interface CustomTextPositionParam {
      message: string;
    }
  }

  /**
   * Generate a post-purchase Invoice for one-time payments.
   */
  export interface InvoiceCreation {
    enabled: boolean;

    invoice_data?: InvoiceCreation.InvoiceData;
  }

  export namespace InvoiceCreation {
    export interface InvoiceData {
      account_tax_ids?: Array<string> | '';

      custom_fields?: Array<InvoiceData.CustomFieldsList> | '';

      description?: string;

      footer?: string;

      issuer?: InvoiceData.Issuer;

      metadata?: { [key: string]: string } | '';

      rendering_options?: InvoiceData.CheckoutRenderingOptionsParam | '';
    }

    export namespace InvoiceData {
      export interface CustomFieldsList {
        name: string;

        value: string;
      }

      export interface Issuer {
        type: 'account' | 'self';

        account?: string;
      }

      export interface CheckoutRenderingOptionsParam {
        amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';

        template?: string;
      }
    }
  }

  /**
   * Controls settings applied for collecting the customer's name.
   */
  export interface NameCollection {
    business?: NameCollection.Business;

    individual?: NameCollection.Individual;
  }

  export namespace NameCollection {
    export interface Business {
      enabled: boolean;

      optional?: boolean;
    }

    export interface Individual {
      enabled: boolean;

      optional?: boolean;
    }
  }

  export interface OptionalItem {
    price: string;

    quantity: number;

    adjustable_quantity?: OptionalItem.AdjustableQuantity;
  }

  export namespace OptionalItem {
    export interface AdjustableQuantity {
      enabled: boolean;

      maximum?: number;

      minimum?: number;
    }
  }

  /**
   * A subset of parameters to be passed to PaymentIntent creation for Checkout
   * Sessions in `payment` mode.
   */
  export interface PaymentIntentData {
    capture_method?: 'automatic' | 'automatic_async' | 'manual';

    description?: string;

    metadata?: { [key: string]: string };

    setup_future_usage?: 'off_session' | 'on_session';

    statement_descriptor?: string;

    statement_descriptor_suffix?: string;

    transfer_group?: string;
  }

  /**
   * Controls phone number collection settings during checkout.
   *
   * We recommend that you review your privacy policy and check with your legal
   * contacts.
   */
  export interface PhoneNumberCollection {
    enabled: boolean;
  }

  /**
   * Settings that restrict the usage of a payment link.
   */
  export interface Restrictions {
    completed_sessions: Restrictions.CompletedSessions;
  }

  export namespace Restrictions {
    export interface CompletedSessions {
      limit: number;
    }
  }

  /**
   * Configuration for collecting the customer's shipping address.
   */
  export interface ShippingAddressCollection {
    allowed_countries: Array<
      | 'AC'
      | 'AD'
      | 'AE'
      | 'AF'
      | 'AG'
      | 'AI'
      | 'AL'
      | 'AM'
      | 'AO'
      | 'AQ'
      | 'AR'
      | 'AT'
      | 'AU'
      | 'AW'
      | 'AX'
      | 'AZ'
      | 'BA'
      | 'BB'
      | 'BD'
      | 'BE'
      | 'BF'
      | 'BG'
      | 'BH'
      | 'BI'
      | 'BJ'
      | 'BL'
      | 'BM'
      | 'BN'
      | 'BO'
      | 'BQ'
      | 'BR'
      | 'BS'
      | 'BT'
      | 'BV'
      | 'BW'
      | 'BY'
      | 'BZ'
      | 'CA'
      | 'CD'
      | 'CF'
      | 'CG'
      | 'CH'
      | 'CI'
      | 'CK'
      | 'CL'
      | 'CM'
      | 'CN'
      | 'CO'
      | 'CR'
      | 'CV'
      | 'CW'
      | 'CY'
      | 'CZ'
      | 'DE'
      | 'DJ'
      | 'DK'
      | 'DM'
      | 'DO'
      | 'DZ'
      | 'EC'
      | 'EE'
      | 'EG'
      | 'EH'
      | 'ER'
      | 'ES'
      | 'ET'
      | 'FI'
      | 'FJ'
      | 'FK'
      | 'FO'
      | 'FR'
      | 'GA'
      | 'GB'
      | 'GD'
      | 'GE'
      | 'GF'
      | 'GG'
      | 'GH'
      | 'GI'
      | 'GL'
      | 'GM'
      | 'GN'
      | 'GP'
      | 'GQ'
      | 'GR'
      | 'GS'
      | 'GT'
      | 'GU'
      | 'GW'
      | 'GY'
      | 'HK'
      | 'HN'
      | 'HR'
      | 'HT'
      | 'HU'
      | 'ID'
      | 'IE'
      | 'IL'
      | 'IM'
      | 'IN'
      | 'IO'
      | 'IQ'
      | 'IS'
      | 'IT'
      | 'JE'
      | 'JM'
      | 'JO'
      | 'JP'
      | 'KE'
      | 'KG'
      | 'KH'
      | 'KI'
      | 'KM'
      | 'KN'
      | 'KR'
      | 'KW'
      | 'KY'
      | 'KZ'
      | 'LA'
      | 'LB'
      | 'LC'
      | 'LI'
      | 'LK'
      | 'LR'
      | 'LS'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'LY'
      | 'MA'
      | 'MC'
      | 'MD'
      | 'ME'
      | 'MF'
      | 'MG'
      | 'MK'
      | 'ML'
      | 'MM'
      | 'MN'
      | 'MO'
      | 'MQ'
      | 'MR'
      | 'MS'
      | 'MT'
      | 'MU'
      | 'MV'
      | 'MW'
      | 'MX'
      | 'MY'
      | 'MZ'
      | 'NA'
      | 'NC'
      | 'NE'
      | 'NG'
      | 'NI'
      | 'NL'
      | 'NO'
      | 'NP'
      | 'NR'
      | 'NU'
      | 'NZ'
      | 'OM'
      | 'PA'
      | 'PE'
      | 'PF'
      | 'PG'
      | 'PH'
      | 'PK'
      | 'PL'
      | 'PM'
      | 'PN'
      | 'PR'
      | 'PS'
      | 'PT'
      | 'PY'
      | 'QA'
      | 'RE'
      | 'RO'
      | 'RS'
      | 'RU'
      | 'RW'
      | 'SA'
      | 'SB'
      | 'SC'
      | 'SD'
      | 'SE'
      | 'SG'
      | 'SH'
      | 'SI'
      | 'SJ'
      | 'SK'
      | 'SL'
      | 'SM'
      | 'SN'
      | 'SO'
      | 'SR'
      | 'SS'
      | 'ST'
      | 'SV'
      | 'SX'
      | 'SZ'
      | 'TA'
      | 'TC'
      | 'TD'
      | 'TF'
      | 'TG'
      | 'TH'
      | 'TJ'
      | 'TK'
      | 'TL'
      | 'TM'
      | 'TN'
      | 'TO'
      | 'TR'
      | 'TT'
      | 'TV'
      | 'TW'
      | 'TZ'
      | 'UA'
      | 'UG'
      | 'US'
      | 'UY'
      | 'UZ'
      | 'VA'
      | 'VC'
      | 'VE'
      | 'VG'
      | 'VN'
      | 'VU'
      | 'WF'
      | 'WS'
      | 'XK'
      | 'YE'
      | 'YT'
      | 'ZA'
      | 'ZM'
      | 'ZW'
      | 'ZZ'
    >;
  }

  export interface ShippingOption {
    shipping_rate?: string;
  }

  /**
   * When creating a subscription, the specified configuration data will be used.
   * There must be at least one line item with a recurring price to use
   * `subscription_data`.
   */
  export interface SubscriptionData {
    description?: string;

    invoice_settings?: SubscriptionData.InvoiceSettings;

    metadata?: { [key: string]: string };

    trial_period_days?: number;

    trial_settings?: SubscriptionData.TrialSettings;
  }

  export namespace SubscriptionData {
    export interface InvoiceSettings {
      issuer?: InvoiceSettings.Issuer;
    }

    export namespace InvoiceSettings {
      export interface Issuer {
        type: 'account' | 'self';

        account?: string;
      }
    }

    export interface TrialSettings {
      end_behavior: TrialSettings.EndBehavior;
    }

    export namespace TrialSettings {
      export interface EndBehavior {
        missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
      }
    }
  }

  /**
   * Controls tax ID collection during checkout.
   */
  export interface TaxIDCollection {
    enabled: boolean;

    required?: 'if_supported' | 'never';
  }

  /**
   * The account (if any) the payments will be attributed to for tax reporting, and
   * where funds from each payment will be transferred to.
   */
  export interface TransferData {
    destination: string;

    amount?: number;
  }
}

export declare namespace PaymentLinks {
  export {
    type CustomTextPosition as CustomTextPosition,
    type PaymentLinkCreateResponse as PaymentLinkCreateResponse,
    type PaymentLinkCreateParams as PaymentLinkCreateParams,
  };
}
