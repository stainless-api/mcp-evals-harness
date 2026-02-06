// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as PricesAPI from './prices';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { MyCursorIDPage, type MyCursorIDPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Products extends APIResource {
  /**
   * <p>Creates a new product object.</p>
   */
  create(body: ProductCreateParams, options?: RequestOptions): APIPromise<Product> {
    return this._client.post('/v1/products', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * <p>Returns a list of your products. The products are returned sorted by creation date, with the most recently created products appearing first.</p>
   */
  list(
    query: ProductListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ProductsMyCursorIDPage, Product> {
    return this._client.getAPIList('/v1/products', MyCursorIDPage<Product>, { query, ...options });
  }
}

export type ProductsMyCursorIDPage = MyCursorIDPage<Product>;

/**
 * Products describe the specific goods or services you offer to your customers.
 * For example, you might offer a Standard and Premium version of your goods or
 * service; each version would be a separate Product. They can be used in
 * conjunction with [Prices](https://api.stripe.com#prices) to configure pricing in
 * Payment Links, Checkout, and Subscriptions.
 *
 * Related guides:
 * [Set up a subscription](https://docs.stripe.com/billing/subscriptions/set-up-subscription),
 * [share a Payment Link](https://docs.stripe.com/payment-links),
 * [accept payments with Checkout](https://docs.stripe.com/payments/accept-a-payment#create-product-prices-upfront),
 * and more about
 * [Products and Prices](https://docs.stripe.com/products-prices/overview)
 */
export interface Product {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Whether the product is currently available for purchase.
   */
  active: boolean;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * A list of up to 8 URLs of images for this product, meant to be displayable to
   * the customer.
   */
  images: Array<string>;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * A list of up to 15 marketing features for this product. These are displayed in
   * [pricing tables](https://docs.stripe.com/payments/checkout/pricing-table).
   */
  marketing_features: Array<Product.MarketingFeature>;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format.
   */
  metadata: { [key: string]: string };

  /**
   * The product's name, meant to be displayable to the customer.
   */
  name: string;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'product';

  /**
   * Time at which the object was last updated. Measured in seconds since the Unix
   * epoch.
   */
  updated: number;

  /**
   * The ID of the [Price](https://docs.stripe.com/api/prices) object that is the
   * default price for this product.
   */
  default_price?: string | PricesAPI.Price | null;

  /**
   * The product's description, meant to be displayable to the customer. Use this
   * field to optionally store a long form explanation of the product being sold for
   * your own rendering purposes.
   */
  description?: string | null;

  package_dimensions?: Product.PackageDimensions | null;

  /**
   * Whether this product is shipped (i.e., physical goods).
   */
  shippable?: boolean | null;

  /**
   * Extra information about a product which will appear on your customer's credit
   * card statement. In the case that multiple products are billed at once, the first
   * statement descriptor will be used. Only used for subscription payments.
   */
  statement_descriptor?: string | null;

  /**
   * A [tax code](https://docs.stripe.com/tax/tax-categories) ID.
   */
  tax_code?: string | Shared.TaxCode | null;

  /**
   * A label that represents units of this product. When set, this will be included
   * in customers' receipts, invoices, Checkout, and the customer portal.
   */
  unit_label?: string | null;

  /**
   * A URL of a publicly-accessible webpage for this product.
   */
  url?: string | null;
}

export namespace Product {
  export interface MarketingFeature {
    /**
     * The marketing feature name. Up to 80 characters long.
     */
    name?: string;
  }

  export interface PackageDimensions {
    /**
     * Height, in inches.
     */
    height: number;

    /**
     * Length, in inches.
     */
    length: number;

    /**
     * Weight, in ounces.
     */
    weight: number;

    /**
     * Width, in inches.
     */
    width: number;
  }
}

export interface ProductCreateParams {
  /**
   * The product's name, meant to be displayable to the customer.
   */
  name: string;

  /**
   * An identifier will be randomly generated by Stripe. You can optionally override
   * this ID, but the ID must be unique across all products in your Stripe account.
   */
  id?: string;

  /**
   * Whether the product is currently available for purchase. Defaults to `true`.
   */
  active?: boolean;

  /**
   * Data used to generate a new [Price](https://docs.stripe.com/api/prices) object.
   * This Price will be set as the default price for this product.
   */
  default_price_data?: ProductCreateParams.DefaultPriceData;

  /**
   * The product's description, meant to be displayable to the customer. Use this
   * field to optionally store a long form explanation of the product being sold for
   * your own rendering purposes.
   */
  description?: string;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * A list of up to 8 URLs of images for this product, meant to be displayable to
   * the customer.
   */
  images?: Array<string>;

  /**
   * A list of up to 15 marketing features for this product. These are displayed in
   * [pricing tables](https://docs.stripe.com/payments/checkout/pricing-table).
   */
  marketing_features?: Array<ProductCreateParams.MarketingFeature>;

  /**
   * Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can
   * attach to an object. This can be useful for storing additional information about
   * the object in a structured format. Individual keys can be unset by posting an
   * empty value to them. All keys can be unset by posting an empty value to
   * `metadata`.
   */
  metadata?: { [key: string]: string };

  /**
   * The dimensions of this product for shipping purposes.
   */
  package_dimensions?: ProductCreateParams.PackageDimensions;

  /**
   * Whether this product is shipped (i.e., physical goods).
   */
  shippable?: boolean;

  /**
   * An arbitrary string to be displayed on your customer's credit card or bank
   * statement. While most banks display this information consistently, some may
   * display it incorrectly or not at all.
   *
   * This may be up to 22 characters. The statement description may not include `<`,
   * `>`, `\`, `"`, `'` characters, and will appear on your customer's statement in
   * capital letters. Non-ASCII characters are automatically stripped. It must
   * contain at least one letter. Only used for subscription payments.
   */
  statement_descriptor?: string;

  /**
   * A [tax code](https://docs.stripe.com/tax/tax-categories) ID.
   */
  tax_code?: string;

  /**
   * A label that represents units of this product. When set, this will be included
   * in customers' receipts, invoices, Checkout, and the customer portal.
   */
  unit_label?: string;

  /**
   * A URL of a publicly-accessible webpage for this product.
   */
  url?: string;
}

export namespace ProductCreateParams {
  /**
   * Data used to generate a new [Price](https://docs.stripe.com/api/prices) object.
   * This Price will be set as the default price for this product.
   */
  export interface DefaultPriceData {
    currency: string;

    currency_options?: { [key: string]: DefaultPriceData.CurrencyOptions };

    custom_unit_amount?: DefaultPriceData.CustomUnitAmount;

    metadata?: { [key: string]: string };

    recurring?: DefaultPriceData.Recurring;

    tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';

    unit_amount?: number;

    unit_amount_decimal?: string;
  }

  export namespace DefaultPriceData {
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

    export interface CustomUnitAmount {
      enabled: boolean;

      maximum?: number;

      minimum?: number;

      preset?: number;
    }

    export interface Recurring {
      interval: 'day' | 'month' | 'week' | 'year';

      interval_count?: number;
    }
  }

  export interface MarketingFeature {
    name: string;
  }

  /**
   * The dimensions of this product for shipping purposes.
   */
  export interface PackageDimensions {
    height: number;

    length: number;

    weight: number;

    width: number;
  }
}

export interface ProductListParams extends MyCursorIDPageParams {
  /**
   * Only return products that are active or inactive (e.g., pass `false` to list all
   * inactive products).
   */
  active?: boolean;

  /**
   * Only return products that were created during the given date interval.
   */
  created?: ProductListParams.RangeQuerySpecs | number;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * Only return products with the given IDs. Cannot be used with
   * [starting_after](https://api.stripe.com#list_products-starting_after) or
   * [ending_before](https://api.stripe.com#list_products-ending_before).
   */
  ids?: Array<string>;

  /**
   * Only return products that can be shipped (i.e., physical, not digital products).
   */
  shippable?: boolean;

  /**
   * Only return products with the given url.
   */
  url?: string;
}

export namespace ProductListParams {
  export interface RangeQuerySpecs {
    gt?: number;

    gte?: number;

    lt?: number;

    lte?: number;
  }
}

export declare namespace Products {
  export {
    type Product as Product,
    type ProductsMyCursorIDPage as ProductsMyCursorIDPage,
    type ProductCreateParams as ProductCreateParams,
    type ProductListParams as ProductListParams,
  };
}
