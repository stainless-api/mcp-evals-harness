// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ProductsAPI from './products';
import { APIPromise } from '../core/api-promise';
import { MyCursorIDPage, type MyCursorIDPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Prices extends APIResource {
  /**
   * <p>Creates a new <a href="https://docs.stripe.com/api/prices">Price</a> for an existing <a href="https://docs.stripe.com/api/products">Product</a>. The Price can be recurring or one-time.</p>
   */
  create(body: PriceCreateParams, options?: RequestOptions): APIPromise<Price> {
    return this._client.post('/v1/prices', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * <p>Returns a list of your active prices, excluding <a href="/docs/products-prices/pricing-models#inline-pricing">inline prices</a>. For the list of inactive prices, set <code>active</code> to false.</p>
   */
  list(
    query: PriceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<PricesMyCursorIDPage, Price> {
    return this._client.getAPIList('/v1/prices', MyCursorIDPage<Price>, { query, ...options });
  }
}

export type PricesMyCursorIDPage = MyCursorIDPage<Price>;

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
export interface Price {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Whether the price can be used for new purchases.
   */
  active: boolean;

  /**
   * Describes how to compute the price per period. Either `per_unit` or `tiered`.
   * `per_unit` indicates that the fixed amount (specified in `unit_amount` or
   * `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with
   * `usage_type=licensed`), or per unit of total usage (for prices with
   * `usage_type=metered`). `tiered` indicates that the unit pricing will be computed
   * using a tiering strategy as defined using the `tiers` and `tiers_mode`
   * attributes.
   */
  billing_scheme: 'per_unit' | 'tiered';

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
  object: 'price';

  /**
   * The ID of the product this price is associated with.
   */
  product: string | ProductsAPI.Product | Price.DeletedProduct;

  /**
   * One of `one_time` or `recurring` depending on whether the price is for a
   * one-time purchase or a recurring (subscription) purchase.
   */
  type: 'one_time' | 'recurring';

  /**
   * Prices defined in each available currency option. Each key must be a
   * three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a
   * [supported currency](https://stripe.com/docs/currencies).
   */
  currency_options?: { [key: string]: Price.CurrencyOptions };

  custom_unit_amount?: Price.CustomUnitAmount | null;

  /**
   * A lookup key used to retrieve prices dynamically from a static string. This may
   * be up to 200 characters.
   */
  lookup_key?: string | null;

  /**
   * A brief description of the price, hidden from customers.
   */
  nickname?: string | null;

  recurring?: Price.Recurring | null;

  /**
   * Only required if a
   * [default tax behavior](<https://docs.stripe.com/tax/products-prices-tax-categories-tax-behavior#setting-a-default-tax-behavior-(recommended)>)
   * was not provided in the Stripe Tax settings. Specifies whether the price is
   * considered inclusive of taxes or exclusive of taxes. One of `inclusive`,
   * `exclusive`, or `unspecified`. Once specified as either `inclusive` or
   * `exclusive`, it cannot be changed.
   */
  tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified' | null;

  /**
   * Each element represents a pricing tier. This parameter requires `billing_scheme`
   * to be set to `tiered`. See also the documentation for `billing_scheme`.
   */
  tiers?: Array<Price.Tier>;

  /**
   * Defines if the tiering price should be `graduated` or `volume` based. In
   * `volume`-based tiering, the maximum quantity within a period determines the per
   * unit price. In `graduated` tiering, pricing can change as the quantity grows.
   */
  tiers_mode?: 'graduated' | 'volume' | null;

  transform_quantity?: Price.TransformQuantity | null;

  /**
   * The unit amount in cents (or local equivalent) to be charged, represented as a
   * whole integer if possible. Only set if `billing_scheme=per_unit`.
   */
  unit_amount?: number | null;

  /**
   * The unit amount in cents (or local equivalent) to be charged, represented as a
   * decimal string with at most 12 decimal places. Only set if
   * `billing_scheme=per_unit`.
   */
  unit_amount_decimal?: string | null;
}

export namespace Price {
  export interface DeletedProduct {
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
    object: 'product';
  }

  export interface CurrencyOptions {
    custom_unit_amount?: CurrencyOptions.CustomUnitAmount | null;

    /**
     * Only required if a
     * [default tax behavior](<https://docs.stripe.com/tax/products-prices-tax-categories-tax-behavior#setting-a-default-tax-behavior-(recommended)>)
     * was not provided in the Stripe Tax settings. Specifies whether the price is
     * considered inclusive of taxes or exclusive of taxes. One of `inclusive`,
     * `exclusive`, or `unspecified`. Once specified as either `inclusive` or
     * `exclusive`, it cannot be changed.
     */
    tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified' | null;

    /**
     * Each element represents a pricing tier. This parameter requires `billing_scheme`
     * to be set to `tiered`. See also the documentation for `billing_scheme`.
     */
    tiers?: Array<CurrencyOptions.Tier>;

    /**
     * The unit amount in cents (or local equivalent) to be charged, represented as a
     * whole integer if possible. Only set if `billing_scheme=per_unit`.
     */
    unit_amount?: number | null;

    /**
     * The unit amount in cents (or local equivalent) to be charged, represented as a
     * decimal string with at most 12 decimal places. Only set if
     * `billing_scheme=per_unit`.
     */
    unit_amount_decimal?: string | null;
  }

  export namespace CurrencyOptions {
    export interface CustomUnitAmount {
      /**
       * The maximum unit amount the customer can specify for this item.
       */
      maximum?: number | null;

      /**
       * The minimum unit amount the customer can specify for this item. Must be at least
       * the minimum charge amount.
       */
      minimum?: number | null;

      /**
       * The starting unit amount which can be updated by the customer.
       */
      preset?: number | null;
    }

    export interface Tier {
      /**
       * Price for the entire tier.
       */
      flat_amount?: number | null;

      /**
       * Same as `flat_amount`, but contains a decimal value with at most 12 decimal
       * places.
       */
      flat_amount_decimal?: string | null;

      /**
       * Per unit price for units relevant to the tier.
       */
      unit_amount?: number | null;

      /**
       * Same as `unit_amount`, but contains a decimal value with at most 12 decimal
       * places.
       */
      unit_amount_decimal?: string | null;

      /**
       * Up to and including to this quantity will be contained in the tier.
       */
      up_to?: number | null;
    }
  }

  export interface CustomUnitAmount {
    /**
     * The maximum unit amount the customer can specify for this item.
     */
    maximum?: number | null;

    /**
     * The minimum unit amount the customer can specify for this item. Must be at least
     * the minimum charge amount.
     */
    minimum?: number | null;

    /**
     * The starting unit amount which can be updated by the customer.
     */
    preset?: number | null;
  }

  export interface Recurring {
    /**
     * The frequency at which a subscription is billed. One of `day`, `week`, `month`
     * or `year`.
     */
    interval: 'day' | 'month' | 'week' | 'year';

    /**
     * The number of intervals (specified in the `interval` attribute) between
     * subscription billings. For example, `interval=month` and `interval_count=3`
     * bills every 3 months.
     */
    interval_count: number;

    /**
     * Configures how the quantity per period should be determined. Can be either
     * `metered` or `licensed`. `licensed` automatically bills the `quantity` set when
     * adding it to a subscription. `metered` aggregates the total usage based on usage
     * records. Defaults to `licensed`.
     */
    usage_type: 'licensed' | 'metered';

    /**
     * The meter tracking the usage of a metered price
     */
    meter?: string | null;
  }

  export interface Tier {
    /**
     * Price for the entire tier.
     */
    flat_amount?: number | null;

    /**
     * Same as `flat_amount`, but contains a decimal value with at most 12 decimal
     * places.
     */
    flat_amount_decimal?: string | null;

    /**
     * Per unit price for units relevant to the tier.
     */
    unit_amount?: number | null;

    /**
     * Same as `unit_amount`, but contains a decimal value with at most 12 decimal
     * places.
     */
    unit_amount_decimal?: string | null;

    /**
     * Up to and including to this quantity will be contained in the tier.
     */
    up_to?: number | null;
  }

  export interface TransformQuantity {
    /**
     * Divide usage by this number.
     */
    divide_by: number;

    /**
     * After division, either round the result `up` or `down`.
     */
    round: 'down' | 'up';
  }
}

export interface PriceCreateParams {
  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * Whether the price can be used for new purchases. Defaults to `true`.
   */
  active?: boolean;

  /**
   * Describes how to compute the price per period. Either `per_unit` or `tiered`.
   * `per_unit` indicates that the fixed amount (specified in `unit_amount` or
   * `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with
   * `usage_type=licensed`), or per unit of total usage (for prices with
   * `usage_type=metered`). `tiered` indicates that the unit pricing will be computed
   * using a tiering strategy as defined using the `tiers` and `tiers_mode`
   * attributes.
   */
  billing_scheme?: 'per_unit' | 'tiered';

  /**
   * Prices defined in each available currency option. Each key must be a
   * three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a
   * [supported currency](https://stripe.com/docs/currencies).
   */
  currency_options?: { [key: string]: PriceCreateParams.CurrencyOptions };

  /**
   * When set, provides configuration for the amount to be adjusted by the customer
   * during Checkout Sessions and Payment Links.
   */
  custom_unit_amount?: PriceCreateParams.CustomUnitAmount;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * A lookup key used to retrieve prices dynamically from a static string. This may
   * be up to 200 characters.
   */
  lookup_key?: string;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`.
   */
  metadata?: { [key: string]: string };

  /**
   * A brief description of the price, hidden from customers.
   */
  nickname?: string;

  /**
   * The ID of the [Product](https://docs.stripe.com/api/products) that this
   * [Price](https://docs.stripe.com/api/prices) will belong to.
   */
  product?: string;

  /**
   * These fields can be used to create a new product that this price will belong to.
   */
  product_data?: PriceCreateParams.ProductData;

  /**
   * The recurring components of a price such as `interval` and `usage_type`.
   */
  recurring?: PriceCreateParams.Recurring;

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
   * Each element represents a pricing tier. This parameter requires `billing_scheme`
   * to be set to `tiered`. See also the documentation for `billing_scheme`.
   */
  tiers?: Array<PriceCreateParams.Tier>;

  /**
   * Defines if the tiering price should be `graduated` or `volume` based. In
   * `volume`-based tiering, the maximum quantity within a period determines the per
   * unit price, in `graduated` tiering pricing can successively change as the
   * quantity grows.
   */
  tiers_mode?: 'graduated' | 'volume';

  /**
   * If set to true, will atomically remove the lookup key from the existing price,
   * and assign it to this price.
   */
  transfer_lookup_key?: boolean;

  /**
   * Apply a transformation to the reported usage or set quantity before computing
   * the billed price. Cannot be combined with `tiers`.
   */
  transform_quantity?: PriceCreateParams.TransformQuantity;

  /**
   * A positive integer in cents (or local equivalent) (or 0 for a free price)
   * representing how much to charge. One of `unit_amount`, `unit_amount_decimal`, or
   * `custom_unit_amount` is required, unless `billing_scheme=tiered`.
   */
  unit_amount?: number;

  /**
   * Same as `unit_amount`, but accepts a decimal value in cents (or local
   * equivalent) with at most 12 decimal places. Only one of `unit_amount` and
   * `unit_amount_decimal` can be set.
   */
  unit_amount_decimal?: string;
}

export namespace PriceCreateParams {
  export interface CurrencyOptions {
    custom_unit_amount?: CurrencyOptions.CustomUnitAmount;

    tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';

    tiers?: Array<CurrencyOptions.Tier>;

    unit_amount?: number;

    unit_amount_decimal?: string;
  }

  export namespace CurrencyOptions {
    export interface CustomUnitAmount {
      enabled: boolean;

      maximum?: number;

      minimum?: number;

      preset?: number;
    }

    export interface Tier {
      up_to: 'inf' | number;

      flat_amount?: number;

      flat_amount_decimal?: string;

      unit_amount?: number;

      unit_amount_decimal?: string;
    }
  }

  /**
   * When set, provides configuration for the amount to be adjusted by the customer
   * during Checkout Sessions and Payment Links.
   */
  export interface CustomUnitAmount {
    enabled: boolean;

    maximum?: number;

    minimum?: number;

    preset?: number;
  }

  /**
   * These fields can be used to create a new product that this price will belong to.
   */
  export interface ProductData {
    name: string;

    /**
     * @deprecated
     */
    id?: string;

    active?: boolean;

    metadata?: { [key: string]: string };

    statement_descriptor?: string;

    tax_code?: string;

    unit_label?: string;
  }

  /**
   * The recurring components of a price such as `interval` and `usage_type`.
   */
  export interface Recurring {
    interval: 'day' | 'month' | 'week' | 'year';

    interval_count?: number;

    meter?: string;

    usage_type?: 'licensed' | 'metered';
  }

  export interface Tier {
    up_to: 'inf' | number;

    flat_amount?: number;

    flat_amount_decimal?: string;

    unit_amount?: number;

    unit_amount_decimal?: string;
  }

  /**
   * Apply a transformation to the reported usage or set quantity before computing
   * the billed price. Cannot be combined with `tiers`.
   */
  export interface TransformQuantity {
    divide_by: number;

    round: 'down' | 'up';
  }
}

export interface PriceListParams extends MyCursorIDPageParams {
  /**
   * Only return prices that are active or inactive (e.g., pass `false` to list all
   * inactive prices).
   */
  active?: boolean;

  /**
   * A filter on the list, based on the object `created` field. The value can be a
   * string with an integer Unix timestamp, or it can be a dictionary with a number
   * of different query options.
   */
  created?: PriceListParams.RangeQuerySpecs | number;

  /**
   * Only return prices for the given currency.
   */
  currency?: string;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * Only return the price with these lookup_keys, if any exist. You can specify up
   * to 10 lookup_keys.
   */
  lookup_keys?: Array<string>;

  /**
   * Only return prices for the given product.
   */
  product?: string;

  /**
   * Only return prices with these recurring fields.
   */
  recurring?: PriceListParams.Recurring;

  /**
   * Only return prices of type `recurring` or `one_time`.
   */
  type?: 'one_time' | 'recurring';
}

export namespace PriceListParams {
  export interface RangeQuerySpecs {
    gt?: number;

    gte?: number;

    lt?: number;

    lte?: number;
  }

  /**
   * Only return prices with these recurring fields.
   */
  export interface Recurring {
    interval?: 'day' | 'month' | 'week' | 'year';

    meter?: string;

    usage_type?: 'licensed' | 'metered';
  }
}

export declare namespace Prices {
  export {
    type Price as Price,
    type PricesMyCursorIDPage as PricesMyCursorIDPage,
    type PriceCreateParams as PriceCreateParams,
    type PriceListParams as PriceListParams,
  };
}
