// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import * as qs from './internal/qs';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Pagination from './core/pagination';
import { AbstractPage, type MyCursorIDPageParams, MyCursorIDPageResponse } from './core/pagination';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import {
  Account,
  AccountInvoicesSettings,
  AccountRequirementsAlternative,
  AccountRetrieveParams,
  AccountSettings,
  Accounts,
  LegalEntityJapanAddress,
} from './resources/accounts';
import {
  Balance,
  BalanceAmount,
  BalanceAmountBySourceType,
  BalanceRetrieveParams,
  BalanceRetrieveResponse,
} from './resources/balance';
import {
  Coupon,
  CouponCreateParams,
  CouponListParams,
  Coupons,
  CouponsMyCursorIDPage,
} from './resources/coupons';
import {
  BankAccount,
  Card,
  Customer,
  CustomerCreateParams,
  CustomerListParams,
  Customers,
  CustomersMyCursorIDPage,
  Discount,
  InvoiceSetting,
  PromotionCode,
  TaxID,
  TaxIDsOwner,
} from './resources/customers';
import {
  ApplicationFee,
  BalanceTransaction,
  Charge,
  ChargeTransferData,
  ConnectCollectionTransfer,
  CustomerBalanceResourceCashBalanceTransactionAdjustedForOverdraft,
  CustomerBalanceResourceCashBalanceTransactionAppliedToPayment,
  CustomerBalanceResourceCashBalanceTransactionRefundedFromPayment,
  CustomerBalanceResourceCashBalanceTransactionTransferredToBalance,
  CustomerBalanceResourceCashBalanceTransactionUnappliedFromPayment,
  CustomerCashBalanceTransaction,
  Dispute,
  DisputeListParams,
  DisputeUpdateParams,
  Disputes,
  DisputesMyCursorIDPage,
  FeeRefund,
  File,
  FileLink,
  IssuingAuthorization,
  IssuingAuthorizationAmountDetails,
  IssuingCard,
  IssuingCardholder,
  IssuingCardholderAddress,
  IssuingCardholderAuthorizationControls,
  IssuingCardholderCardIssuing,
  IssuingCardholderCompany,
  IssuingCardholderIDDocument,
  IssuingCardholderIndividual,
  IssuingCardholderIndividualDob,
  IssuingCardholderRequirements,
  IssuingCardholderSpendingLimit,
  IssuingCardholderUserTermsAcceptance,
  IssuingCardholderVerification,
  IssuingDispute,
  IssuingTransaction,
  PaymentMethodDetails,
  PaymentMethodDetailsBancontactDispute,
  PaymentMethodDetailsIdealDispute,
  PaymentMethodDetailsSofortDispute,
  PaymentMethodDetailsUsBankAccount,
  Payout,
  Topup,
  Transfer,
} from './resources/disputes';
import { InvoiceitemCreateParams, InvoiceitemCreateResponse, Invoiceitems } from './resources/invoiceitems';
import {
  APIErrors,
  AutomaticTaxInvoice,
  BillingBillResourceInvoicingParentsInvoiceParent,
  BillingBillResourceInvoicingParentsInvoiceSubscriptionParent,
  BillingCreditBalanceTransaction,
  BillingCreditGrant,
  BillingCreditGrantsResourceAmount,
  BillingCreditGrantsResourceBalanceCredit,
  BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided,
  BillingCreditGrantsResourceBalanceCreditsApplied,
  BillingCreditGrantsResourceBalanceDebit,
  BillingCreditGrantsResourceMonetaryAmount,
  ConnectAccountReference,
  DeletedDiscount,
  DiscountsResourceDiscountAmount,
  Invoice,
  InvoiceCreateParams,
  InvoiceFinalizeParams,
  InvoiceListParams,
  InvoicePayment,
  Invoices,
  InvoicesMyCursorIDPage,
  InvoicesPaymentsInvoicePaymentAssociatedPayment,
  InvoicesResourceFromInvoice,
  InvoicesResourcePretaxCreditAmount,
  LineItem,
  PaymentMethod,
  PaymentMethodCard,
  PaymentMethodCardGeneratedCard,
  PaymentMethodDetailsPaymentRecordUsBankAccount,
  PaymentMethodSepaDebit,
  PaymentRecord,
  PaymentsPrimitivesPaymentRecordsResourceAmount,
  PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails,
  SepaDebitGeneratedFrom,
  ShippingRateDeliveryEstimateBound,
  TaxRate,
} from './resources/invoices';
import {
  PaymentFlowsInstallmentOptions,
  PaymentIntent,
  PaymentIntentListParams,
  PaymentIntentPaymentMethodOptionsMandateOptionsPayto,
  PaymentIntentTypeSpecificPaymentMethodOptionsClient,
  PaymentIntents,
  PaymentIntentsMyCursorIDPage,
  PaymentMethodOptionsCardPresentRouting,
  PaymentTransferData,
  Review,
} from './resources/payment-intents';
import {
  CustomTextPosition,
  PaymentLinkCreateParams,
  PaymentLinkCreateResponse,
  PaymentLinks,
} from './resources/payment-links';
import { Price, PriceCreateParams, PriceListParams, Prices, PricesMyCursorIDPage } from './resources/prices';
import {
  Product,
  ProductCreateParams,
  ProductListParams,
  Products,
  ProductsMyCursorIDPage,
} from './resources/products';
import { Refund, RefundCreateParams, Refunds, TransferReversal } from './resources/refunds';
import {
  AutomaticTaxSubscription,
  DefaultSettings,
  DefaultSettingsAutomaticTax,
  Mandate,
  PaymentMethodDetailsBancontactSetupAttempt,
  PaymentMethodDetailsIdealSetupAttempt,
  PaymentMethodDetailsSofortSetupAttempt,
  PendingUpdate,
  PhaseAutomaticTax,
  Schedule,
  ScheduleAddInvoiceItem,
  ScheduleConfigurationItem,
  SchedulePhaseConfiguration,
  SchedulePhaseSetting,
  ScheduleSetting,
  SetupAttempt,
  SetupAttemptPaymentMethodDetails,
  SetupAttemptPaymentMethodDetailsCardPresent,
  SetupIntent,
  SetupIntentPaymentMethodOptionsMandateOptionsPayto,
  SetupIntentTypeSpecificPaymentMethodOptionsClient,
  StackableDiscount,
  Subscription,
  SubscriptionBillingThresholds,
  SubscriptionCancelParams,
  SubscriptionInvoiceSettings,
  SubscriptionItem,
  SubscriptionListParams,
  SubscriptionTransferData,
  SubscriptionUpdateParams,
  Subscriptions,
  SubscriptionsMyCursorIDPage,
} from './resources/subscriptions';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

export interface ClientOptions {
  /**
   * Bearer HTTP authentication. Allowed headers-- Authorization: Bearer <api_key>
   */
  apiKey?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['STRIPE_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['STRIPE_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Stripe API.
 */
export class Stripe {
  apiKey: string | null;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Stripe API.
   *
   * @param {string | null | undefined} [opts.apiKey=process.env['STRIPE_SECRET_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['STRIPE_BASE_URL'] ?? https://api.stripe.com/] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('STRIPE_BASE_URL'),
    apiKey = readEnv('STRIPE_SECRET_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.stripe.com/`,
    };

    this.baseURL = options.baseURL!;
    this.timeout = options.timeout ?? Stripe.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('STRIPE_LOG'), "process.env['STRIPE_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.apiKey = apiKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.stripe.com/';
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    if (this.apiKey && values.get('authorization')) {
      return;
    }
    if (nulls.has('authorization')) {
      return;
    }

    throw new Error(
      'Could not resolve authentication method. Expected the apiKey to be set. Or for the "Authorization" headers to be explicitly omitted',
    );
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    if (this.apiKey == null) {
      return undefined;
    }
    return buildHeaders([{ Authorization: `Bearer ${this.apiKey}` }]);
  }

  protected stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'comma' });
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: PromiseOrValue<RequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    return this.requestAPIList(
      Page,
      opts && 'then' in opts ?
        opts.then((opts) => ({ method: 'get', path, ...opts }))
      : { method: 'get', path, ...opts },
    );
  }

  requestAPIList<
    Item = unknown,
    PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
  >(
    Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
    options: PromiseOrValue<FinalRequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    const request = this.makeRequest(options, null, undefined);
    return new Pagination.PagePromise<PageClass, Item>(this as any as Stripe, request, Page);
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    const abort = this._makeAbort(controller);
    if (signal) signal.addEventListener('abort', abort, { once: true });

    const timeout = setTimeout(abort, ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private _makeAbort(controller: AbortController) {
    // note: we can't just inline this method inside `fetchWithTimeout()` because then the closure
    //       would capture all request options, and cause a memory leak.
    return () => controller.abort();
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Stripe = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static StripeError = Errors.StripeError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  accounts: API.Accounts = new API.Accounts(this);
  balance: API.Balance = new API.Balance(this);
  coupons: API.Coupons = new API.Coupons(this);
  customers: API.Customers = new API.Customers(this);
  disputes: API.Disputes = new API.Disputes(this);
  invoices: API.Invoices = new API.Invoices(this);
  invoiceitems: API.Invoiceitems = new API.Invoiceitems(this);
  paymentLinks: API.PaymentLinks = new API.PaymentLinks(this);
  paymentIntents: API.PaymentIntents = new API.PaymentIntents(this);
  prices: API.Prices = new API.Prices(this);
  products: API.Products = new API.Products(this);
  refunds: API.Refunds = new API.Refunds(this);
  subscriptions: API.Subscriptions = new API.Subscriptions(this);
}

Stripe.Accounts = Accounts;
Stripe.Balance = Balance;
Stripe.Coupons = Coupons;
Stripe.Customers = Customers;
Stripe.Disputes = Disputes;
Stripe.Invoices = Invoices;
Stripe.Invoiceitems = Invoiceitems;
Stripe.PaymentLinks = PaymentLinks;
Stripe.PaymentIntents = PaymentIntents;
Stripe.Prices = Prices;
Stripe.Products = Products;
Stripe.Refunds = Refunds;
Stripe.Subscriptions = Subscriptions;

export declare namespace Stripe {
  export type RequestOptions = Opts.RequestOptions;

  export import MyCursorIDPage = Pagination.MyCursorIDPage;
  export {
    type MyCursorIDPageParams as MyCursorIDPageParams,
    type MyCursorIDPageResponse as MyCursorIDPageResponse,
  };

  export {
    Accounts as Accounts,
    type Account as Account,
    type AccountInvoicesSettings as AccountInvoicesSettings,
    type AccountRequirementsAlternative as AccountRequirementsAlternative,
    type AccountSettings as AccountSettings,
    type LegalEntityJapanAddress as LegalEntityJapanAddress,
    type AccountRetrieveParams as AccountRetrieveParams,
  };

  export {
    Balance as Balance,
    type BalanceAmount as BalanceAmount,
    type BalanceAmountBySourceType as BalanceAmountBySourceType,
    type BalanceRetrieveResponse as BalanceRetrieveResponse,
    type BalanceRetrieveParams as BalanceRetrieveParams,
  };

  export {
    Coupons as Coupons,
    type Coupon as Coupon,
    type CouponsMyCursorIDPage as CouponsMyCursorIDPage,
    type CouponCreateParams as CouponCreateParams,
    type CouponListParams as CouponListParams,
  };

  export {
    Customers as Customers,
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

  export {
    Disputes as Disputes,
    type ApplicationFee as ApplicationFee,
    type BalanceTransaction as BalanceTransaction,
    type Charge as Charge,
    type ChargeTransferData as ChargeTransferData,
    type ConnectCollectionTransfer as ConnectCollectionTransfer,
    type CustomerBalanceResourceCashBalanceTransactionAdjustedForOverdraft as CustomerBalanceResourceCashBalanceTransactionAdjustedForOverdraft,
    type CustomerBalanceResourceCashBalanceTransactionAppliedToPayment as CustomerBalanceResourceCashBalanceTransactionAppliedToPayment,
    type CustomerBalanceResourceCashBalanceTransactionRefundedFromPayment as CustomerBalanceResourceCashBalanceTransactionRefundedFromPayment,
    type CustomerBalanceResourceCashBalanceTransactionTransferredToBalance as CustomerBalanceResourceCashBalanceTransactionTransferredToBalance,
    type CustomerBalanceResourceCashBalanceTransactionUnappliedFromPayment as CustomerBalanceResourceCashBalanceTransactionUnappliedFromPayment,
    type CustomerCashBalanceTransaction as CustomerCashBalanceTransaction,
    type Dispute as Dispute,
    type FeeRefund as FeeRefund,
    type File as File,
    type FileLink as FileLink,
    type IssuingAuthorization as IssuingAuthorization,
    type IssuingAuthorizationAmountDetails as IssuingAuthorizationAmountDetails,
    type IssuingCard as IssuingCard,
    type IssuingCardholder as IssuingCardholder,
    type IssuingCardholderAddress as IssuingCardholderAddress,
    type IssuingCardholderAuthorizationControls as IssuingCardholderAuthorizationControls,
    type IssuingCardholderCardIssuing as IssuingCardholderCardIssuing,
    type IssuingCardholderCompany as IssuingCardholderCompany,
    type IssuingCardholderIDDocument as IssuingCardholderIDDocument,
    type IssuingCardholderIndividual as IssuingCardholderIndividual,
    type IssuingCardholderIndividualDob as IssuingCardholderIndividualDob,
    type IssuingCardholderRequirements as IssuingCardholderRequirements,
    type IssuingCardholderSpendingLimit as IssuingCardholderSpendingLimit,
    type IssuingCardholderUserTermsAcceptance as IssuingCardholderUserTermsAcceptance,
    type IssuingCardholderVerification as IssuingCardholderVerification,
    type IssuingDispute as IssuingDispute,
    type IssuingTransaction as IssuingTransaction,
    type PaymentMethodDetails as PaymentMethodDetails,
    type PaymentMethodDetailsBancontactDispute as PaymentMethodDetailsBancontactDispute,
    type PaymentMethodDetailsIdealDispute as PaymentMethodDetailsIdealDispute,
    type PaymentMethodDetailsSofortDispute as PaymentMethodDetailsSofortDispute,
    type PaymentMethodDetailsUsBankAccount as PaymentMethodDetailsUsBankAccount,
    type Payout as Payout,
    type Topup as Topup,
    type Transfer as Transfer,
    type DisputesMyCursorIDPage as DisputesMyCursorIDPage,
    type DisputeUpdateParams as DisputeUpdateParams,
    type DisputeListParams as DisputeListParams,
  };

  export {
    Invoices as Invoices,
    type APIErrors as APIErrors,
    type AutomaticTaxInvoice as AutomaticTaxInvoice,
    type BillingBillResourceInvoicingParentsInvoiceParent as BillingBillResourceInvoicingParentsInvoiceParent,
    type BillingBillResourceInvoicingParentsInvoiceSubscriptionParent as BillingBillResourceInvoicingParentsInvoiceSubscriptionParent,
    type BillingCreditBalanceTransaction as BillingCreditBalanceTransaction,
    type BillingCreditGrant as BillingCreditGrant,
    type BillingCreditGrantsResourceAmount as BillingCreditGrantsResourceAmount,
    type BillingCreditGrantsResourceBalanceCredit as BillingCreditGrantsResourceBalanceCredit,
    type BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided as BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided,
    type BillingCreditGrantsResourceBalanceCreditsApplied as BillingCreditGrantsResourceBalanceCreditsApplied,
    type BillingCreditGrantsResourceBalanceDebit as BillingCreditGrantsResourceBalanceDebit,
    type BillingCreditGrantsResourceMonetaryAmount as BillingCreditGrantsResourceMonetaryAmount,
    type ConnectAccountReference as ConnectAccountReference,
    type DeletedDiscount as DeletedDiscount,
    type DiscountsResourceDiscountAmount as DiscountsResourceDiscountAmount,
    type Invoice as Invoice,
    type InvoicePayment as InvoicePayment,
    type InvoicesPaymentsInvoicePaymentAssociatedPayment as InvoicesPaymentsInvoicePaymentAssociatedPayment,
    type InvoicesResourceFromInvoice as InvoicesResourceFromInvoice,
    type InvoicesResourcePretaxCreditAmount as InvoicesResourcePretaxCreditAmount,
    type LineItem as LineItem,
    type PaymentMethod as PaymentMethod,
    type PaymentMethodCard as PaymentMethodCard,
    type PaymentMethodCardGeneratedCard as PaymentMethodCardGeneratedCard,
    type PaymentMethodDetailsPaymentRecordUsBankAccount as PaymentMethodDetailsPaymentRecordUsBankAccount,
    type PaymentMethodSepaDebit as PaymentMethodSepaDebit,
    type PaymentRecord as PaymentRecord,
    type PaymentsPrimitivesPaymentRecordsResourceAmount as PaymentsPrimitivesPaymentRecordsResourceAmount,
    type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails as PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails,
    type SepaDebitGeneratedFrom as SepaDebitGeneratedFrom,
    type ShippingRateDeliveryEstimateBound as ShippingRateDeliveryEstimateBound,
    type TaxRate as TaxRate,
    type InvoicesMyCursorIDPage as InvoicesMyCursorIDPage,
    type InvoiceCreateParams as InvoiceCreateParams,
    type InvoiceListParams as InvoiceListParams,
    type InvoiceFinalizeParams as InvoiceFinalizeParams,
  };

  export {
    Invoiceitems as Invoiceitems,
    type InvoiceitemCreateResponse as InvoiceitemCreateResponse,
    type InvoiceitemCreateParams as InvoiceitemCreateParams,
  };

  export {
    PaymentLinks as PaymentLinks,
    type CustomTextPosition as CustomTextPosition,
    type PaymentLinkCreateResponse as PaymentLinkCreateResponse,
    type PaymentLinkCreateParams as PaymentLinkCreateParams,
  };

  export {
    PaymentIntents as PaymentIntents,
    type PaymentFlowsInstallmentOptions as PaymentFlowsInstallmentOptions,
    type PaymentIntent as PaymentIntent,
    type PaymentIntentPaymentMethodOptionsMandateOptionsPayto as PaymentIntentPaymentMethodOptionsMandateOptionsPayto,
    type PaymentIntentTypeSpecificPaymentMethodOptionsClient as PaymentIntentTypeSpecificPaymentMethodOptionsClient,
    type PaymentMethodOptionsCardPresentRouting as PaymentMethodOptionsCardPresentRouting,
    type PaymentTransferData as PaymentTransferData,
    type Review as Review,
    type PaymentIntentsMyCursorIDPage as PaymentIntentsMyCursorIDPage,
    type PaymentIntentListParams as PaymentIntentListParams,
  };

  export {
    Prices as Prices,
    type Price as Price,
    type PricesMyCursorIDPage as PricesMyCursorIDPage,
    type PriceCreateParams as PriceCreateParams,
    type PriceListParams as PriceListParams,
  };

  export {
    Products as Products,
    type Product as Product,
    type ProductsMyCursorIDPage as ProductsMyCursorIDPage,
    type ProductCreateParams as ProductCreateParams,
    type ProductListParams as ProductListParams,
  };

  export {
    Refunds as Refunds,
    type Refund as Refund,
    type TransferReversal as TransferReversal,
    type RefundCreateParams as RefundCreateParams,
  };

  export {
    Subscriptions as Subscriptions,
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

  export type AccountRequirementsError = API.AccountRequirementsError;
  export type Address = API.Address;
  export type Application = API.Application;
  export type BillingClocksResourceStatusDetailsAdvancingStatusDetails =
    API.BillingClocksResourceStatusDetailsAdvancingStatusDetails;
  export type BillingClocksResourceStatusDetailsStatusDetails =
    API.BillingClocksResourceStatusDetailsStatusDetails;
  export type DeletedApplication = API.DeletedApplication;
  export type DeletedCustomer = API.DeletedCustomer;
  export type DeletedTaxID = API.DeletedTaxID;
  export type InvoiceSettingCustomField = API.InvoiceSettingCustomField;
  export type PaymentFlowsPaymentIntentPresentmentDetails = API.PaymentFlowsPaymentIntentPresentmentDetails;
  export type PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet =
    API.PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet;
  export type PaymentMethodDetailsCardInstallmentsPlan = API.PaymentMethodDetailsCardInstallmentsPlan;
  export type PaymentMethodDetailsCardPresent = API.PaymentMethodDetailsCardPresent;
  export type PaymentMethodDetailsCardPresentOffline = API.PaymentMethodDetailsCardPresentOffline;
  export type PaymentMethodDetailsCardPresentReceipt = API.PaymentMethodDetailsCardPresentReceipt;
  export type PaymentMethodDetailsPassthroughCard = API.PaymentMethodDetailsPassthroughCard;
  export type Shipping = API.Shipping;
  export type Source = API.Source;
  export type SourceCodeVerificationFlow = API.SourceCodeVerificationFlow;
  export type SourceOrder = API.SourceOrder;
  export type SourceOrderItem = API.SourceOrderItem;
  export type SourceOwner = API.SourceOwner;
  export type SourceReceiverFlow = API.SourceReceiverFlow;
  export type SourceRedirectFlow = API.SourceRedirectFlow;
  export type SourceTypeACHCreditTransfer = API.SourceTypeACHCreditTransfer;
  export type SourceTypeACHDebit = API.SourceTypeACHDebit;
  export type SourceTypeAcssDebit = API.SourceTypeAcssDebit;
  export type SourceTypeAlipay = API.SourceTypeAlipay;
  export type SourceTypeAuBecsDebit = API.SourceTypeAuBecsDebit;
  export type SourceTypeBancontact = API.SourceTypeBancontact;
  export type SourceTypeCard = API.SourceTypeCard;
  export type SourceTypeCardPresent = API.SourceTypeCardPresent;
  export type SourceTypeEps = API.SourceTypeEps;
  export type SourceTypeGiropay = API.SourceTypeGiropay;
  export type SourceTypeIdeal = API.SourceTypeIdeal;
  export type SourceTypeKlarna = API.SourceTypeKlarna;
  export type SourceTypeMultibanco = API.SourceTypeMultibanco;
  export type SourceTypeP24 = API.SourceTypeP24;
  export type SourceTypeSepaDebit = API.SourceTypeSepaDebit;
  export type SourceTypeSofort = API.SourceTypeSofort;
  export type SourceTypeThreeDSecure = API.SourceTypeThreeDSecure;
  export type SourceTypeWechat = API.SourceTypeWechat;
  export type TaxCode = API.TaxCode;
  export type TestHelpersTestClock = API.TestHelpersTestClock;
}
