// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as BalanceAPI from './balance';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Balance extends APIResource {
  /**
   * <p>Retrieves the current account balance, based on the authentication that was used to make the request.
   *  For a sample request, see <a href="/docs/connect/account-balances#accounting-for-negative-balances">Accounting for negative balances</a>.</p>
   */
  retrieve(
    query: BalanceRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BalanceRetrieveResponse> {
    return this._client.get('/v1/balance', { query, ...options });
  }
}

export interface BalanceAmount {
  /**
   * Balance amount.
   */
  amount: number;

  /**
   * Three-letter
   * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
   * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  source_types?: BalanceAmountBySourceType;
}

export interface BalanceAmountBySourceType {
  /**
   * Amount coming from
   * [legacy US ACH payments](https://docs.stripe.com/ach-deprecated).
   */
  bank_account?: number;

  /**
   * Amount coming from most payment methods, including cards as well as
   * [non-legacy bank debits](https://docs.stripe.com/payments/bank-debits).
   */
  card?: number;

  /**
   * Amount coming from [FPX](https://docs.stripe.com/payments/fpx), a Malaysian
   * payment method.
   */
  fpx?: number;
}

/**
 * This is an object representing your Stripe balance. You can retrieve it to see
 * the balance currently on your Stripe account.
 *
 * The top-level `available` and `pending` comprise your "payments balance."
 *
 * Related guide:
 * [Balances and settlement time](https://docs.stripe.com/payments/balances),
 * [Understanding Connect account balances](https://docs.stripe.com/connect/account-balances)
 */
export interface BalanceRetrieveResponse {
  /**
   * Available funds that you can transfer or pay out automatically by Stripe or
   * explicitly through the [Transfers API](https://api.stripe.com#transfers) or
   * [Payouts API](https://api.stripe.com#payouts). You can find the available
   * balance for each currency and payment type in the `source_types` property.
   */
  available: Array<BalanceAmount>;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if
   * the object exists in test mode.
   */
  livemode: boolean;

  /**
   * String representing the object's type. Objects of the same type share the same
   * value.
   */
  object: 'balance';

  /**
   * Funds that aren't available in the balance yet. You can find the pending balance
   * for each currency and each payment type in the `source_types` property.
   */
  pending: Array<BalanceAmount>;

  /**
   * Funds held due to negative balances on connected accounts where
   * [account.controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
   * is `application`, which includes Custom accounts. You can find the connect
   * reserve balance for each currency and payment type in the `source_types`
   * property.
   */
  connect_reserved?: Array<BalanceAmount>;

  /**
   * Funds that you can pay out using Instant Payouts.
   */
  instant_available?: Array<BalanceRetrieveResponse.InstantAvailable>;

  issuing?: BalanceRetrieveResponse.Issuing;

  refund_and_dispute_prefunding?: BalanceRetrieveResponse.RefundAndDisputePrefunding;
}

export namespace BalanceRetrieveResponse {
  export interface InstantAvailable {
    /**
     * Balance amount.
     */
    amount: number;

    /**
     * Three-letter
     * [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
     * lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
     */
    currency: string;

    /**
     * Breakdown of balance by destination.
     */
    net_available?: Array<InstantAvailable.NetAvailable>;

    source_types?: BalanceAPI.BalanceAmountBySourceType;
  }

  export namespace InstantAvailable {
    export interface NetAvailable {
      /**
       * Net balance amount, subtracting fees from platform-set pricing.
       */
      amount: number;

      /**
       * ID of the external account for this net balance (not expandable).
       */
      destination: string;

      source_types?: BalanceAPI.BalanceAmountBySourceType;
    }
  }

  export interface Issuing {
    /**
     * Funds that are available for use.
     */
    available: Array<BalanceAPI.BalanceAmount>;
  }

  export interface RefundAndDisputePrefunding {
    /**
     * Funds that are available for use.
     */
    available: Array<BalanceAPI.BalanceAmount>;

    /**
     * Funds that are pending
     */
    pending: Array<BalanceAPI.BalanceAmount>;
  }
}

export interface BalanceRetrieveParams {
  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;
}

export declare namespace Balance {
  export {
    type BalanceAmount as BalanceAmount,
    type BalanceAmountBySourceType as BalanceAmountBySourceType,
    type BalanceRetrieveResponse as BalanceRetrieveResponse,
    type BalanceRetrieveParams as BalanceRetrieveParams,
  };
}
