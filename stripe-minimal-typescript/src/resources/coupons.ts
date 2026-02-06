// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { MyCursorIDPage, type MyCursorIDPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Coupons extends APIResource {
  /**
   * <p>You can create coupons easily via the <a href="https://dashboard.stripe.com/coupons">coupon management</a> page of the Stripe dashboard. Coupon creation is also accessible via the API if you need to create coupons on the fly.</p>
   *
   * <p>A coupon has either a <code>percent_off</code> or an <code>amount_off</code> and <code>currency</code>. If you set an <code>amount_off</code>, that amount will be subtracted from any invoice’s subtotal. For example, an invoice with a subtotal of <currency>100</currency> will have a final total of <currency>0</currency> if a coupon with an <code>amount_off</code> of <amount>200</amount> is applied to it and an invoice with a subtotal of <currency>300</currency> will have a final total of <currency>100</currency> if a coupon with an <code>amount_off</code> of <amount>200</amount> is applied to it.</p>
   */
  create(body: CouponCreateParams | null | undefined = {}, options?: RequestOptions): APIPromise<Coupon> {
    return this._client.post('/v1/coupons', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * <p>Returns a list of your coupons.</p>
   */
  list(
    query: CouponListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CouponsMyCursorIDPage, Coupon> {
    return this._client.getAPIList('/v1/coupons', MyCursorIDPage<Coupon>, { query, ...options });
  }
}

export type CouponsMyCursorIDPage = MyCursorIDPage<Coupon>;

/**
 * A coupon contains information about a percent-off or amount-off discount you
 * might want to apply to a customer. Coupons may be applied to
 * [subscriptions](https://api.stripe.com#subscriptions),
 * [invoices](https://api.stripe.com#invoices),
 * [checkout sessions](https://docs.stripe.com/api/checkout/sessions),
 * [quotes](https://api.stripe.com#quotes), and more. Coupons do not work with
 * conventional one-off [charges](https://api.stripe.com#create_charge) or
 * [payment intents](https://docs.stripe.com/api/payment_intents).
 */
export interface Coupon {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * One of `forever`, `once`, or `repeating`. Describes how long a customer who
   * applies this coupon will get the discount.
   */
  duration: 'forever' | 'once' | 'repeating';

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'coupon';

  /**
   * Number of times this coupon has been applied to a customer.
   */
  times_redeemed: number;

  /**
   * Taking account of the above properties, whether this coupon can still be applied
   * to a customer.
   */
  valid: boolean;

  /**
   * Amount (in the `currency` specified) that will be taken off the subtotal of any
   * invoices for this customer.
   */
  amount_off?: number | null;

  applies_to?: Coupon.AppliesTo;

  /**
   * If `amount_off` has been set, the three-letter
   * [ISO code for the currency](https://stripe.com/docs/currencies) of the amount to
   * take off.
   */
  currency?: string | null;

  /**
   * Coupons defined in each available currency option. Each key must be a
   * three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a
   * [supported currency](https://stripe.com/docs/currencies).
   */
  currency_options?: { [key: string]: Coupon.CurrencyOptions };

  /**
   * If `duration` is `repeating`, the number of months the coupon applies. Null if
   * coupon `duration` is `forever` or `once`.
   */
  duration_in_months?: number | null;

  /**
   * Maximum number of times this coupon can be redeemed, in total, across all
   * customers, before it is no longer valid.
   */
  max_redemptions?: number | null;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Name of the coupon displayed to customers on for instance invoices or receipts.
   */
  name?: string | null;

  /**
   * Percent that will be taken off the subtotal of any invoices for this customer
   * for the duration of the coupon. For example, a coupon with percent_off of 50
   * will make a $ (or local equivalent)100 invoice $ (or local equivalent)50
   * instead.
   */
  percent_off?: number | null;

  /**
   * Date after which the coupon can no longer be redeemed.
   */
  redeem_by?: number | null;
}

export namespace Coupon {
  export interface AppliesTo {
    /**
     * A list of product IDs this coupon applies to
     */
    products: Array<string>;
  }

  export interface CurrencyOptions {
    /**
     * Amount (in the `currency` specified) that will be taken off the subtotal of any
     * invoices for this customer.
     */
    amount_off: number;
  }
}

export interface CouponCreateParams {
  /**
   * Unique string of your choice that will be used to identify this coupon when
   * applying it to a customer. If you don't want to specify a particular code, you
   * can leave the ID blank and we'll generate a random code for you.
   */
  id?: string;

  /**
   * A positive integer representing the amount to subtract from an invoice total
   * (required if `percent_off` is not passed).
   */
  amount_off?: number;

  /**
   * A hash containing directions for what this Coupon will apply discounts to.
   */
  applies_to?: CouponCreateParams.AppliesTo;

  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) of
   * the `amount_off` parameter (required if `amount_off` is passed).
   */
  currency?: string;

  /**
   * Coupons defined in each available currency option (only supported if
   * `amount_off` is passed). Each key must be a three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a
   * [supported currency](https://stripe.com/docs/currencies).
   */
  currency_options?: { [key: string]: CouponCreateParams.CurrencyOptions };

  /**
   * Specifies how long the discount will be in effect if used on a subscription.
   * Defaults to `once`.
   */
  duration?: 'forever' | 'once' | 'repeating';

  /**
   * Required only if `duration` is `repeating`, in which case it must be a positive
   * integer that specifies the number of months the discount will be in effect.
   */
  duration_in_months?: number;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * A positive integer specifying the number of times the coupon can be redeemed
   * before it's no longer valid. For example, you might have a 50% off coupon that
   * the first 20 readers of your blog can use.
   */
  max_redemptions?: number;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`.
   */
  metadata?: { [key: string]: string } | '';

  /**
   * Name of the coupon displayed to customers on, for instance invoices, or
   * receipts. By default the `id` is shown if `name` is not set.
   */
  name?: string;

  /**
   * A positive float larger than 0, and smaller or equal to 100, that represents the
   * discount the coupon will apply (required if `amount_off` is not passed).
   */
  percent_off?: number;

  /**
   * Unix timestamp specifying the last time at which the coupon can be redeemed
   * (cannot be set to more than 5 years in the future). After the redeem_by date,
   * the coupon can no longer be applied to new customers.
   */
  redeem_by?: number;
}

export namespace CouponCreateParams {
  /**
   * A hash containing directions for what this Coupon will apply discounts to.
   */
  export interface AppliesTo {
    products?: Array<string>;
  }

  export interface CurrencyOptions {
    amount_off: number;
  }
}

export interface CouponListParams extends MyCursorIDPageParams {
  /**
   * A filter on the list, based on the object `created` field. The value can be a
   * string with an integer Unix timestamp, or it can be a dictionary with a number
   * of different query options.
   */
  created?: CouponListParams.RangeQuerySpecs | number;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;
}

export namespace CouponListParams {
  export interface RangeQuerySpecs {
    gt?: number;

    gte?: number;

    lt?: number;

    lte?: number;
  }
}

export declare namespace Coupons {
  export {
    type Coupon as Coupon,
    type CouponsMyCursorIDPage as CouponsMyCursorIDPage,
    type CouponCreateParams as CouponCreateParams,
    type CouponListParams as CouponListParams,
  };
}
