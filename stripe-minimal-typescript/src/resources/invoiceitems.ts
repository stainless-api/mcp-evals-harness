// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CustomersAPI from './customers';
import * as InvoicesAPI from './invoices';
import * as PricesAPI from './prices';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Invoiceitems extends APIResource {
  /**
   * <p>Creates an item to be added to a draft invoice (up to 250 items per invoice). If no invoice is specified, the item will be on the next invoice created for the customer specified.</p>
   */
  create(
    body: InvoiceitemCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InvoiceitemCreateResponse> {
    return this._client.post('/v1/invoiceitems', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }
}

/**
 * Invoice Items represent the component lines of an
 * [invoice](https://docs.stripe.com/api/invoices). When you create an invoice item
 * with an `invoice` field, it is attached to the specified invoice and included as
 * [an invoice line item](https://docs.stripe.com/api/invoices/line_item) within
 * [invoice.lines](https://docs.stripe.com/api/invoices/object#invoice_object-lines).
 *
 * Invoice Items can be created before you are ready to actually send the invoice.
 * This can be particularly useful when combined with a
 * [subscription](https://docs.stripe.com/api/subscriptions). Sometimes you want to
 * add a charge or credit to a customer, but actually charge or credit the
 * customer's card only at the end of a regular billing cycle. This is useful for
 * combining several charges (to minimize per-transaction fees), or for having
 * Stripe tabulate your usage-based billing totals.
 *
 * Related guides:
 * [Integrate with the Invoicing API](https://docs.stripe.com/invoicing/integration),
 * [Subscription Invoices](https://docs.stripe.com/billing/invoices/subscription#adding-upcoming-invoice-items).
 */
export interface InvoiceitemCreateResponse {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Amount (in the `currency` specified) of the invoice item. This should always be
   * equal to `unit_amount * quantity`.
   */
  amount: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * The ID of the customer to bill for this invoice item.
   */
  customer: string | CustomersAPI.Customer | Shared.DeletedCustomer;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  date: number;

  /**
   * If true, discounts will apply to this invoice item. Always false for prorations.
   */
  discountable: boolean;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'invoiceitem';

  period: InvoiceitemCreateResponse.Period;

  /**
   * Whether the invoice item was created automatically as a proration adjustment
   * when the customer switched plans.
   */
  proration: boolean;

  /**
   * Quantity of units for the invoice item. If the invoice item is a proration, the
   * quantity of the subscription that the proration was computed for.
   */
  quantity: number;

  /**
   * The ID of the account to bill for this invoice item.
   */
  customer_account?: string | null;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to
   * users.
   */
  description?: string | null;

  /**
   * The discounts which apply to the invoice item. Item discounts are applied before
   * invoice discounts. Use `expand[]=discounts` to expand each discount.
   */
  discounts?: Array<string | CustomersAPI.Discount> | null;

  /**
   * The ID of the invoice this invoice item belongs to.
   */
  invoice?: string | InvoicesAPI.Invoice | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * The amount after discounts, but before credits and taxes. This field is `null`
   * for `discountable=true` items.
   */
  net_amount?: number;

  parent?: InvoiceitemCreateResponse.Parent | null;

  pricing?: InvoiceitemCreateResponse.Pricing | null;

  proration_details?: InvoiceitemCreateResponse.ProrationDetails;

  /**
   * The tax rates which apply to the invoice item. When set, the `default_tax_rates`
   * on the invoice do not apply to this invoice item.
   */
  tax_rates?: Array<InvoicesAPI.TaxRate> | null;

  /**
   * ID of the test clock this invoice item belongs to.
   */
  test_clock?: string | Shared.TestHelpersTestClock | null;
}

export namespace InvoiceitemCreateResponse {
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
     * The type of parent that generated this invoice item
     */
    type: 'subscription_details';

    subscription_details?: Parent.SubscriptionDetails | null;
  }

  export namespace Parent {
    export interface SubscriptionDetails {
      /**
       * The subscription that generated this invoice item
       */
      subscription: string;

      /**
       * The subscription item that generated this invoice item
       */
      subscription_item?: string;
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

  export interface ProrationDetails {
    /**
     * Discount amounts applied when the proration was created.
     */
    discount_amounts: Array<InvoicesAPI.DiscountsResourceDiscountAmount>;
  }
}

export interface InvoiceitemCreateParams {
  /**
   * The integer amount in cents (or local equivalent) of the charge to be applied to
   * the upcoming invoice. Passing in a negative `amount` will reduce the
   * `amount_due` on the invoice.
   */
  amount?: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency?: string;

  /**
   * The ID of the customer to bill for this invoice item.
   */
  customer?: string;

  /**
   * The ID of the account representing the customer to bill for this invoice item.
   */
  customer_account?: string;

  /**
   * An arbitrary string which you can attach to the invoice item. The description is
   * displayed in the invoice for easy tracking.
   */
  description?: string;

  /**
   * Controls whether discounts apply to this invoice item. Defaults to false for
   * prorations or negative invoice items, and true for all other invoice items.
   */
  discountable?: boolean;

  /**
   * The coupons and promotion codes to redeem into discounts for the invoice item or
   * invoice line item.
   */
  discounts?: Array<InvoiceitemCreateParams.DiscountsList> | '';

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * The ID of an existing invoice to add this invoice item to. For subscription
   * invoices, when left blank, the invoice item will be added to the next upcoming
   * scheduled invoice. For standalone invoices, the invoice item won't be
   * automatically added unless you pass `pending_invoice_item_behavior: 'include'`
   * when creating the invoice. This is useful when adding invoice items in response
   * to an invoice.created webhook. You can only add invoice items to draft invoices
   * and there is a maximum of 250 items per invoice.
   */
  invoice?: string;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`.
   */
  metadata?: { [key: string]: string } | '';

  /**
   * The period associated with this invoice item. When set to different values, the
   * period will be rendered on the invoice. If you have
   * [Stripe Revenue Recognition](https://docs.stripe.com/revenue-recognition)
   * enabled, the period will be used to recognize and defer revenue. See the
   * [Revenue Recognition documentation](https://docs.stripe.com/revenue-recognition/methodology/subscriptions-and-invoicing)
   * for details.
   */
  period?: InvoiceitemCreateParams.Period;

  /**
   * Data used to generate a new [Price](https://docs.stripe.com/api/prices) object
   * inline.
   */
  price_data?: InvoiceitemCreateParams.PriceData;

  /**
   * The pricing information for the invoice item.
   */
  pricing?: InvoiceitemCreateParams.Pricing;

  /**
   * Non-negative integer. The quantity of units for the invoice item.
   */
  quantity?: number;

  /**
   * The ID of a subscription to add this invoice item to. When left blank, the
   * invoice item is added to the next upcoming scheduled invoice. When set,
   * scheduled invoices for subscriptions other than the specified subscription will
   * ignore the invoice item. Use this when you want to express that an invoice item
   * has been accrued within the context of a particular subscription.
   */
  subscription?: string;

  /**
   * Only required if a
   * [default tax behavior](<https://docs.stripe.com/tax/products-prices-tax-categories-tax-behavior#setting-a-default-tax-behavior-(recommended)>)
   * was not provided in the Stripe Tax settings. Specifies whether the price is
   * considered inclusive of taxes or exclusive of taxes. One of `inclusive`,
   * `exclusive`, or `unspecified`. Once specified as either `inclusive` or
   * `exclusive`, it cannot be changed.
   */
  tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';

  /**
   * A [tax code](https://docs.stripe.com/tax/tax-categories) ID.
   */
  tax_code?: (string & {}) | '';

  /**
   * The tax rates which apply to the invoice item. When set, the `default_tax_rates`
   * on the invoice do not apply to this invoice item.
   */
  tax_rates?: Array<string>;

  /**
   * The decimal unit amount in cents (or local equivalent) of the charge to be
   * applied to the upcoming invoice. This `unit_amount_decimal` will be multiplied
   * by the quantity to get the full amount. Passing in a negative
   * `unit_amount_decimal` will reduce the `amount_due` on the invoice. Accepts at
   * most 12 decimal places.
   */
  unit_amount_decimal?: string;
}

export namespace InvoiceitemCreateParams {
  export interface DiscountsList {
    coupon?: string;

    discount?: string;

    promotion_code?: string;
  }

  /**
   * The period associated with this invoice item. When set to different values, the
   * period will be rendered on the invoice. If you have
   * [Stripe Revenue Recognition](https://docs.stripe.com/revenue-recognition)
   * enabled, the period will be used to recognize and defer revenue. See the
   * [Revenue Recognition documentation](https://docs.stripe.com/revenue-recognition/methodology/subscriptions-and-invoicing)
   * for details.
   */
  export interface Period {
    end: number;

    start: number;
  }

  /**
   * Data used to generate a new [Price](https://docs.stripe.com/api/prices) object
   * inline.
   */
  export interface PriceData {
    currency: string;

    product: string;

    tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';

    unit_amount?: number;

    unit_amount_decimal?: string;
  }

  /**
   * The pricing information for the invoice item.
   */
  export interface Pricing {
    price?: string;
  }
}

export declare namespace Invoiceitems {
  export {
    type InvoiceitemCreateResponse as InvoiceitemCreateResponse,
    type InvoiceitemCreateParams as InvoiceitemCreateParams,
  };
}
