#!/usr/bin/env node
/**
 * MCP Server generated from OpenAPI spec for stripe-api v2026-01-28.clover
 * Generated on: 2026-02-06T16:31:54.064Z
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
  type CallToolRequest
} from "@modelcontextprotocol/sdk/types.js";

import { z, ZodError } from 'zod';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

/**
 * Type definition for JSON objects
 */
type JsonObject = Record<string, any>;

/**
 * Interface for MCP Tool Definition
 */
interface McpToolDefinition {
    name: string;
    description: string;
    inputSchema: any;
    method: string;
    pathTemplate: string;
    executionParameters: { name: string, in: string }[];
    requestBodyContentType?: string;
    securityRequirements: any[];
}

/**
 * Server configuration
 */
export const SERVER_NAME = "stripe-api";
export const SERVER_VERSION = "2026-01-28.clover";
export const API_BASE_URL = "https://api.stripe.com";

/**
 * MCP Server instance
 */
const server = new Server(
    { name: SERVER_NAME, version: SERVER_VERSION },
    { capabilities: { tools: {} } }
);

/**
 * Map of tool definitions by name
 */
const toolDefinitionMap: Map<string, McpToolDefinition> = new Map([

  ["GetAccount", {
    name: "GetAccount",
    description: `<p>Retrieves the details of an account.</p>`,
    inputSchema: {"type":"object","properties":{"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."}}},
    method: "get",
    pathTemplate: "/v1/account",
    executionParameters: [{"name":"expand","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetBalance", {
    name: "GetBalance",
    description: `<p>Retrieves the current account balance, based on the authentication that was used to make the request.
 For a sample request, see <a href="/docs/connect/account-balances#accounting-for-negative-balances">Accounting for negative balances</a>.</p>`,
    inputSchema: {"type":"object","properties":{"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."}}},
    method: "get",
    pathTemplate: "/v1/balance",
    executionParameters: [{"name":"expand","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetCoupons", {
    name: "GetCoupons",
    description: `<p>Returns a list of your coupons.</p>`,
    inputSchema: {"type":"object","properties":{"created":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options."},"ending_before":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list."},"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."},"limit":{"type":"number","description":"A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."},"starting_after":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."}}},
    method: "get",
    pathTemplate: "/v1/coupons",
    executionParameters: [{"name":"created","in":"query"},{"name":"ending_before","in":"query"},{"name":"expand","in":"query"},{"name":"limit","in":"query"},{"name":"starting_after","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostCoupons", {
    name: "PostCoupons",
    description: `<p>You can create coupons easily via the <a href="https://dashboard.stripe.com/coupons">coupon management</a> page of the Stripe dashboard. Coupon creation is also accessible via the API if you need to create coupons on the fly.</p>

<p>A coupon has either a <code>percent_off</code> or an <code>amount_off</code> and <code>currency</code>. If you set an <code>amount_off</code>, that amount will be subtracted from any invoice’s subtotal. For example, an invoice with a subtotal of <currency>100</currency> will have a final total of <currency>0</currency> if a coupon with an <code>amount_off</code> of <amount>200</amount> is applied to it and an invoice with a subtotal of <currency>300</currency> will have a final total of <currency>100</currency> if a coupon with an <code>amount_off</code> of <amount>200</amount> is applied to it.</p>`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}}},
    method: "post",
    pathTemplate: "/v1/coupons",
    executionParameters: [],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetCustomers", {
    name: "GetCustomers",
    description: `<p>Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.</p>`,
    inputSchema: {"type":"object","properties":{"created":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"Only return customers that were created during the given date interval."},"email":{"maxLength":512,"type":"string","description":"A case-sensitive filter on the list based on the customer's `email` field. The value must be a string."},"ending_before":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list."},"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."},"limit":{"type":"number","description":"A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."},"starting_after":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."},"test_clock":{"maxLength":5000,"type":"string","description":"Provides a list of customers that are associated with the specified test clock. The response will not include customers with test clocks if this parameter is not set."}}},
    method: "get",
    pathTemplate: "/v1/customers",
    executionParameters: [{"name":"created","in":"query"},{"name":"email","in":"query"},{"name":"ending_before","in":"query"},{"name":"expand","in":"query"},{"name":"limit","in":"query"},{"name":"starting_after","in":"query"},{"name":"test_clock","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostCustomers", {
    name: "PostCustomers",
    description: `<p>Creates a new customer object.</p>`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}}},
    method: "post",
    pathTemplate: "/v1/customers",
    executionParameters: [],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetDisputes", {
    name: "GetDisputes",
    description: `<p>Returns a list of your disputes.</p>`,
    inputSchema: {"type":"object","properties":{"charge":{"maxLength":5000,"type":"string","description":"Only return disputes associated to the charge specified by this charge ID."},"created":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"Only return disputes that were created during the given date interval."},"ending_before":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list."},"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."},"limit":{"type":"number","description":"A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."},"payment_intent":{"maxLength":5000,"type":"string","description":"Only return disputes associated to the PaymentIntent specified by this PaymentIntent ID."},"starting_after":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."}}},
    method: "get",
    pathTemplate: "/v1/disputes",
    executionParameters: [{"name":"charge","in":"query"},{"name":"created","in":"query"},{"name":"ending_before","in":"query"},{"name":"expand","in":"query"},{"name":"limit","in":"query"},{"name":"payment_intent","in":"query"},{"name":"starting_after","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostDisputesDispute", {
    name: "PostDisputesDispute",
    description: `<p>When you get a dispute, contacting your customer is always the best first step. If that doesn’t work, you can submit evidence to help us resolve the dispute in your favor. You can do this in your <a href="https://dashboard.stripe.com/disputes">dashboard</a>, but if you prefer, you can use the API to submit evidence programmatically.</p>

<p>Depending on your dispute type, different evidence fields will give you a better chance of winning your dispute. To figure out which evidence fields to provide, see our <a href="/docs/disputes/categories">guide to dispute types</a>.</p>`,
    inputSchema: {"type":"object","properties":{"dispute":{"maxLength":5000,"type":"string"},"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}},"required":["dispute"]},
    method: "post",
    pathTemplate: "/v1/disputes/{dispute}",
    executionParameters: [{"name":"dispute","in":"path"}],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetInvoices", {
    name: "GetInvoices",
    description: `<p>You can list all invoices, or list the invoices for a specific customer. The invoices are returned sorted by creation date, with the most recently created invoices appearing first.</p>`,
    inputSchema: {"type":"object","properties":{"collection_method":{"type":"string","enum":["charge_automatically","send_invoice"],"description":"The collection method of the invoice to retrieve. Either `charge_automatically` or `send_invoice`."},"created":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"Only return invoices that were created during the given date interval."},"customer":{"maxLength":5000,"type":"string","description":"Only return invoices for the customer specified by this customer ID."},"customer_account":{"maxLength":5000,"type":"string","description":"Only return invoices for the account representing the customer specified by this account ID."},"due_date":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}]},"ending_before":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list."},"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."},"limit":{"type":"number","description":"A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."},"starting_after":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."},"status":{"type":"string","enum":["draft","open","paid","uncollectible","void"],"description":"The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`. [Learn more](https://docs.stripe.com/billing/invoices/workflow#workflow-overview)"},"subscription":{"maxLength":5000,"type":"string","description":"Only return invoices for the subscription specified by this subscription ID."}}},
    method: "get",
    pathTemplate: "/v1/invoices",
    executionParameters: [{"name":"collection_method","in":"query"},{"name":"created","in":"query"},{"name":"customer","in":"query"},{"name":"customer_account","in":"query"},{"name":"due_date","in":"query"},{"name":"ending_before","in":"query"},{"name":"expand","in":"query"},{"name":"limit","in":"query"},{"name":"starting_after","in":"query"},{"name":"status","in":"query"},{"name":"subscription","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostInvoices", {
    name: "PostInvoices",
    description: `<p>This endpoint creates a draft invoice for a given customer. The invoice remains a draft until you <a href="#finalize_invoice">finalize</a> the invoice, which allows you to <a href="/api/invoices/pay">pay</a> or <a href="/api/invoices/send">send</a> the invoice to your customers.</p>`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}}},
    method: "post",
    pathTemplate: "/v1/invoices",
    executionParameters: [],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostInvoiceitems", {
    name: "PostInvoiceitems",
    description: `<p>Creates an item to be added to a draft invoice (up to 250 items per invoice). If no invoice is specified, the item will be on the next invoice created for the customer specified.</p>`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}}},
    method: "post",
    pathTemplate: "/v1/invoiceitems",
    executionParameters: [],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostInvoicesInvoiceFinalize", {
    name: "PostInvoicesInvoiceFinalize",
    description: `<p>Stripe automatically finalizes drafts before sending and attempting payment on invoices. However, if you’d like to finalize a draft invoice manually, you can do so using this method.</p>`,
    inputSchema: {"type":"object","properties":{"invoice":{"maxLength":5000,"type":"string"},"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}},"required":["invoice"]},
    method: "post",
    pathTemplate: "/v1/invoices/{invoice}/finalize",
    executionParameters: [{"name":"invoice","in":"path"}],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostPaymentLinks", {
    name: "PostPaymentLinks",
    description: `<p>Creates a payment link.</p>`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/v1/payment_links",
    executionParameters: [],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetPaymentIntents", {
    name: "GetPaymentIntents",
    description: `<p>Returns a list of PaymentIntents.</p>`,
    inputSchema: {"type":"object","properties":{"created":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp or a dictionary with a number of different query options."},"customer":{"maxLength":5000,"type":"string","description":"Only return PaymentIntents for the customer that this customer ID specifies."},"customer_account":{"maxLength":5000,"type":"string","description":"Only return PaymentIntents for the account representing the customer that this ID specifies."},"ending_before":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list."},"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."},"limit":{"type":"number","description":"A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."},"starting_after":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."}}},
    method: "get",
    pathTemplate: "/v1/payment_intents",
    executionParameters: [{"name":"created","in":"query"},{"name":"customer","in":"query"},{"name":"customer_account","in":"query"},{"name":"ending_before","in":"query"},{"name":"expand","in":"query"},{"name":"limit","in":"query"},{"name":"starting_after","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetPrices", {
    name: "GetPrices",
    description: `<p>Returns a list of your active prices, excluding <a href="/docs/products-prices/pricing-models#inline-pricing">inline prices</a>. For the list of inactive prices, set <code>active</code> to false.</p>`,
    inputSchema: {"type":"object","properties":{"active":{"type":"boolean","description":"Only return prices that are active or inactive (e.g., pass `false` to list all inactive prices)."},"created":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options."},"currency":{"type":"string","format":"currency","description":"Only return prices for the given currency."},"ending_before":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list."},"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."},"limit":{"type":"number","description":"A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."},"lookup_keys":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Only return the price with these lookup_keys, if any exist. You can specify up to 10 lookup_keys."},"product":{"maxLength":5000,"type":"string","description":"Only return prices for the given product."},"recurring":{"title":"all_prices_recurring_params","type":"object","properties":{"interval":{"type":"string","enum":["day","month","week","year"]},"meter":{"maxLength":5000,"type":"string"},"usage_type":{"type":"string","enum":["licensed","metered"]}},"description":"Only return prices with these recurring fields."},"starting_after":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."},"type":{"type":"string","enum":["one_time","recurring"],"description":"Only return prices of type `recurring` or `one_time`."}}},
    method: "get",
    pathTemplate: "/v1/prices",
    executionParameters: [{"name":"active","in":"query"},{"name":"created","in":"query"},{"name":"currency","in":"query"},{"name":"ending_before","in":"query"},{"name":"expand","in":"query"},{"name":"limit","in":"query"},{"name":"lookup_keys","in":"query"},{"name":"product","in":"query"},{"name":"recurring","in":"query"},{"name":"starting_after","in":"query"},{"name":"type","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostPrices", {
    name: "PostPrices",
    description: `<p>Creates a new <a href="https://docs.stripe.com/api/prices">Price</a> for an existing <a href="https://docs.stripe.com/api/products">Product</a>. The Price can be recurring or one-time.</p>`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/v1/prices",
    executionParameters: [],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetProducts", {
    name: "GetProducts",
    description: `<p>Returns a list of your products. The products are returned sorted by creation date, with the most recently created products appearing first.</p>`,
    inputSchema: {"type":"object","properties":{"active":{"type":"boolean","description":"Only return products that are active or inactive (e.g., pass `false` to list all inactive products)."},"created":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"Only return products that were created during the given date interval."},"ending_before":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list."},"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."},"ids":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Only return products with the given IDs. Cannot be used with [starting_after](https://api.stripe.com#list_products-starting_after) or [ending_before](https://api.stripe.com#list_products-ending_before)."},"limit":{"type":"number","description":"A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."},"shippable":{"type":"boolean","description":"Only return products that can be shipped (i.e., physical, not digital products)."},"starting_after":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."},"url":{"maxLength":5000,"type":"string","description":"Only return products with the given url."}}},
    method: "get",
    pathTemplate: "/v1/products",
    executionParameters: [{"name":"active","in":"query"},{"name":"created","in":"query"},{"name":"ending_before","in":"query"},{"name":"expand","in":"query"},{"name":"ids","in":"query"},{"name":"limit","in":"query"},{"name":"shippable","in":"query"},{"name":"starting_after","in":"query"},{"name":"url","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostProducts", {
    name: "PostProducts",
    description: `<p>Creates a new product object.</p>`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/v1/products",
    executionParameters: [],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostRefunds", {
    name: "PostRefunds",
    description: `<p>When you create a new refund, you must specify a Charge or a PaymentIntent object on which to create it.</p>

<p>Creating a new refund will refund a charge that has previously been created but not yet refunded.
Funds will be refunded to the credit or debit card that was originally charged.</p>

<p>You can optionally refund only part of a charge.
You can do so multiple times, until the entire charge has been refunded.</p>

<p>Once entirely refunded, a charge can’t be refunded again.
This method will raise an error when called on an already-refunded charge,
or when trying to refund more money than is left on a charge.</p>`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}}},
    method: "post",
    pathTemplate: "/v1/refunds",
    executionParameters: [],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["GetSubscriptions", {
    name: "GetSubscriptions",
    description: `<p>By default, returns a list of subscriptions that have not been canceled. In order to list canceled subscriptions, specify <code>status=canceled</code>.</p>`,
    inputSchema: {"type":"object","properties":{"automatic_tax":{"title":"automatic_tax_filter_params","required":["enabled"],"type":"object","properties":{"enabled":{"type":"boolean"}},"description":"Filter subscriptions by their automatic tax settings."},"collection_method":{"type":"string","enum":["charge_automatically","send_invoice"],"description":"The collection method of the subscriptions to retrieve. Either `charge_automatically` or `send_invoice`."},"created":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"Only return subscriptions that were created during the given date interval."},"current_period_end":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"Only return subscriptions whose minimum item current_period_end falls within the given date interval."},"current_period_start":{"anyOf":[{"title":"range_query_specs","type":"object","properties":{"gt":{"type":"integer"},"gte":{"type":"integer"},"lt":{"type":"integer"},"lte":{"type":"integer"}}},{"type":"integer"}],"description":"Only return subscriptions whose maximum item current_period_start falls within the given date interval."},"customer":{"maxLength":5000,"type":"string","description":"The ID of the customer whose subscriptions you're retrieving."},"customer_account":{"maxLength":5000,"type":"string","description":"The ID of the account representing the customer whose subscriptions you're retrieving."},"ending_before":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list."},"expand":{"type":"array","items":{"maxLength":5000,"type":"string"},"description":"Specifies which fields in the response should be expanded."},"limit":{"type":"number","description":"A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."},"price":{"maxLength":5000,"type":"string","description":"Filter for subscriptions that contain this recurring price ID."},"starting_after":{"maxLength":5000,"type":"string","description":"A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."},"status":{"type":"string","enum":["active","all","canceled","ended","incomplete","incomplete_expired","past_due","paused","trialing","unpaid"],"description":"The status of the subscriptions to retrieve. Passing in a value of `canceled` will return all canceled subscriptions, including those belonging to deleted customers. Pass `ended` to find subscriptions that are canceled and subscriptions that are expired due to [incomplete payment](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses). Passing in a value of `all` will return subscriptions of all statuses. If no value is supplied, all subscriptions that have not been canceled are returned."},"test_clock":{"maxLength":5000,"type":"string","description":"Filter for subscriptions that are associated with the specified test clock. The response will not include subscriptions with test clocks if this and the customer parameter is not set."}}},
    method: "get",
    pathTemplate: "/v1/subscriptions",
    executionParameters: [{"name":"automatic_tax","in":"query"},{"name":"collection_method","in":"query"},{"name":"created","in":"query"},{"name":"current_period_end","in":"query"},{"name":"current_period_start","in":"query"},{"name":"customer","in":"query"},{"name":"customer_account","in":"query"},{"name":"ending_before","in":"query"},{"name":"expand","in":"query"},{"name":"limit","in":"query"},{"name":"price","in":"query"},{"name":"starting_after","in":"query"},{"name":"status","in":"query"},{"name":"test_clock","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["PostSubscriptionsSubscriptionExposedId", {
    name: "PostSubscriptionsSubscriptionExposedId",
    description: `<p>Updates an existing subscription to match the specified parameters.
When changing prices or quantities, we optionally prorate the price we charge next month to make up for any price changes.
To preview how the proration is calculated, use the <a href="/docs/api/invoices/create_preview">create preview</a> endpoint.</p>

<p>By default, we prorate subscription changes. For example, if a customer signs up on May 1 for a <currency>100</currency> price, they’ll be billed <currency>100</currency> immediately. If on May 15 they switch to a <currency>200</currency> price, then on June 1 they’ll be billed <currency>250</currency> (<currency>200</currency> for a renewal of her subscription, plus a <currency>50</currency> prorating adjustment for half of the previous month’s <currency>100</currency> difference). Similarly, a downgrade generates a credit that is applied to the next invoice. We also prorate when you make quantity changes.</p>

<p>Switching prices does not normally change the billing date or generate an immediate charge unless:</p>

<ul>
<li>The billing interval is changed (for example, from monthly to yearly).</li>
<li>The subscription moves from free to paid.</li>
<li>A trial starts or ends.</li>
</ul>

<p>In these cases, we apply a credit for the unused time on the previous price, immediately charge the customer using the new price, and reset the billing date. Learn about how <a href="/docs/billing/subscriptions/upgrade-downgrade#immediate-payment">Stripe immediately attempts payment for subscription changes</a>.</p>

<p>If you want to charge for an upgrade immediately, pass <code>proration_behavior</code> as <code>always_invoice</code> to create prorations, automatically invoice the customer for those proration adjustments, and attempt to collect payment. If you pass <code>create_prorations</code>, the prorations are created but not automatically invoiced. If you want to bill the customer for the prorations before the subscription’s renewal date, you need to manually <a href="/docs/api/invoices/create">invoice the customer</a>.</p>

<p>If you don’t want to prorate, set the <code>proration_behavior</code> option to <code>none</code>. With this option, the customer is billed <currency>100</currency> on May 1 and <currency>200</currency> on June 1. Similarly, if you set <code>proration_behavior</code> to <code>none</code> when switching between different billing intervals (for example, from monthly to yearly), we don’t generate any credits for the old subscription’s unused time. We still reset the billing date and bill immediately for the new subscription.</p>

<p>Updating the quantity on a subscription many times in an hour may result in <a href="/docs/rate-limits">rate limiting</a>. If you need to bill for a frequently changing quantity, consider integrating <a href="/docs/billing/subscriptions/usage-based">usage-based billing</a> instead.</p>`,
    inputSchema: {"type":"object","properties":{"subscription_exposed_id":{"maxLength":5000,"type":"string"},"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}},"required":["subscription_exposed_id"]},
    method: "post",
    pathTemplate: "/v1/subscriptions/{subscription_exposed_id}",
    executionParameters: [{"name":"subscription_exposed_id","in":"path"}],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["DeleteSubscriptionsSubscriptionExposedId", {
    name: "DeleteSubscriptionsSubscriptionExposedId",
    description: `<p>Cancels a customer’s subscription immediately. The customer won’t be charged again for the subscription. After it’s canceled, you can no longer update the subscription or its <a href="/metadata">metadata</a>.</p>

<p>Any pending invoice items that you’ve created are still charged at the end of the period, unless manually <a href="#delete_invoiceitem">deleted</a>. If you’ve set the subscription to cancel at the end of the period, any pending prorations are also left in place and collected at the end of the period. But if the subscription is set to cancel immediately, pending prorations are removed if <code>invoice_now</code> and <code>prorate</code> are both set to true.</p>

<p>By default, upon subscription cancellation, Stripe stops automatic collection of all finalized invoices for the customer. This is intended to prevent unexpected payment attempts after the customer has canceled a subscription. However, you can resume automatic collection of the invoices manually after subscription cancellation to have us proceed. Or, you could check for unpaid invoices before allowing the customer to cancel the subscription at all.</p>`,
    inputSchema: {"type":"object","properties":{"subscription_exposed_id":{"maxLength":5000,"type":"string"},"requestBody":{"type":"string","description":"Request body (content type: application/x-www-form-urlencoded)"}},"required":["subscription_exposed_id"]},
    method: "delete",
    pathTemplate: "/v1/subscriptions/{subscription_exposed_id}",
    executionParameters: [{"name":"subscription_exposed_id","in":"path"}],
    requestBodyContentType: "application/x-www-form-urlencoded",
    securityRequirements: [{"bearerAuth":[]}]
  }],
]);

/**
 * Security schemes from the OpenAPI spec
 */
const securitySchemes =   {
    "bearerAuth": {
      "type": "http",
      "description": "Bearer HTTP authentication. Allowed headers-- Authorization: Bearer <api_key>",
      "scheme": "bearer",
      "bearerFormat": "auth-scheme"
    }
  };


server.setRequestHandler(ListToolsRequestSchema, async () => {
  const toolsForClient: Tool[] = Array.from(toolDefinitionMap.values()).map(def => ({
    name: def.name,
    description: def.description,
    inputSchema: def.inputSchema
  }));
  return { tools: toolsForClient };
});


server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {
  const { name: toolName, arguments: toolArgs } = request.params;
  const toolDefinition = toolDefinitionMap.get(toolName);
  if (!toolDefinition) {
    console.error(`Error: Unknown tool requested: ${toolName}`);
    return { content: [{ type: "text", text: `Error: Unknown tool requested: ${toolName}` }] };
  }
  return await executeApiTool(toolName, toolDefinition, toolArgs ?? {}, securitySchemes);
});



/**
 * Type definition for cached OAuth tokens
 */
interface TokenCacheEntry {
    token: string;
    expiresAt: number;
}

/**
 * Declare global __oauthTokenCache property for TypeScript
 */
declare global {
    var __oauthTokenCache: Record<string, TokenCacheEntry> | undefined;
}

/**
 * Acquires an OAuth2 token using client credentials flow
 * 
 * @param schemeName Name of the security scheme
 * @param scheme OAuth2 security scheme
 * @returns Acquired token or null if unable to acquire
 */
async function acquireOAuth2Token(schemeName: string, scheme: any): Promise<string | null | undefined> {
    try {
        // Check if we have the necessary credentials
        const clientId = process.env[`OAUTH_CLIENT_ID_SCHEMENAME`];
        const clientSecret = process.env[`OAUTH_CLIENT_SECRET_SCHEMENAME`];
        const scopes = process.env[`OAUTH_SCOPES_SCHEMENAME`];
        
        if (!clientId || !clientSecret) {
            console.error(`Missing client credentials for OAuth2 scheme '${schemeName}'`);
            return null;
        }
        
        // Initialize token cache if needed
        if (typeof global.__oauthTokenCache === 'undefined') {
            global.__oauthTokenCache = {};
        }
        
        // Check if we have a cached token
        const cacheKey = `${schemeName}_${clientId}`;
        const cachedToken = global.__oauthTokenCache[cacheKey];
        const now = Date.now();
        
        if (cachedToken && cachedToken.expiresAt > now) {
            console.error(`Using cached OAuth2 token for '${schemeName}' (expires in ${Math.floor((cachedToken.expiresAt - now) / 1000)} seconds)`);
            return cachedToken.token;
        }
        
        // Determine token URL based on flow type
        let tokenUrl = '';
        if (scheme.flows?.clientCredentials?.tokenUrl) {
            tokenUrl = scheme.flows.clientCredentials.tokenUrl;
            console.error(`Using client credentials flow for '${schemeName}'`);
        } else if (scheme.flows?.password?.tokenUrl) {
            tokenUrl = scheme.flows.password.tokenUrl;
            console.error(`Using password flow for '${schemeName}'`);
        } else {
            console.error(`No supported OAuth2 flow found for '${schemeName}'`);
            return null;
        }
        
        // Prepare the token request
        let formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        
        // Add scopes if specified
        if (scopes) {
            formData.append('scope', scopes);
        }
        
        console.error(`Requesting OAuth2 token from ${tokenUrl}`);
        
        // Make the token request
        const response = await axios({
            method: 'POST',
            url: tokenUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            data: formData.toString()
        });
        
        // Process the response
        if (response.data?.access_token) {
            const token = response.data.access_token;
            const expiresIn = response.data.expires_in || 3600; // Default to 1 hour
            
            // Cache the token
            global.__oauthTokenCache[cacheKey] = {
                token,
                expiresAt: now + (expiresIn * 1000) - 60000 // Expire 1 minute early
            };
            
            console.error(`Successfully acquired OAuth2 token for '${schemeName}' (expires in ${expiresIn} seconds)`);
            return token;
        } else {
            console.error(`Failed to acquire OAuth2 token for '${schemeName}': No access_token in response`);
            return null;
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error acquiring OAuth2 token for '${schemeName}':`, errorMessage);
        return null;
    }
}


/**
 * Executes an API tool with the provided arguments
 * 
 * @param toolName Name of the tool to execute
 * @param definition Tool definition
 * @param toolArgs Arguments provided by the user
 * @param allSecuritySchemes Security schemes from the OpenAPI spec
 * @returns Call tool result
 */
async function executeApiTool(
    toolName: string,
    definition: McpToolDefinition,
    toolArgs: JsonObject,
    allSecuritySchemes: Record<string, any>
): Promise<CallToolResult> {
  try {
    // Validate arguments against the input schema
    let validatedArgs: JsonObject;
    try {
        const zodSchema = getZodSchemaFromJsonSchema(definition.inputSchema, toolName);
        const argsToParse = (typeof toolArgs === 'object' && toolArgs !== null) ? toolArgs : {};
        validatedArgs = zodSchema.parse(argsToParse);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const validationErrorMessage = `Invalid arguments for tool '${toolName}': ${error.errors.map(e => `${e.path.join('.')} (${e.code}): ${e.message}`).join(', ')}`;
            return { content: [{ type: 'text', text: validationErrorMessage }] };
        } else {
             const errorMessage = error instanceof Error ? error.message : String(error);
             return { content: [{ type: 'text', text: `Internal error during validation setup: ${errorMessage}` }] };
        }
    }

    // Prepare URL, query parameters, headers, and request body
    let urlPath = definition.pathTemplate;
    const queryParams: Record<string, any> = {};
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    let requestBodyData: any = undefined;

    // Apply parameters to the URL path, query, or headers
    definition.executionParameters.forEach((param) => {
        const value = validatedArgs[param.name];
        if (typeof value !== 'undefined' && value !== null) {
            if (param.in === 'path') {
                urlPath = urlPath.replace(`{${param.name}}`, encodeURIComponent(String(value)));
            }
            else if (param.in === 'query') {
                queryParams[param.name] = value;
            }
            else if (param.in === 'header') {
                headers[param.name.toLowerCase()] = String(value);
            }
        }
    });

    // Ensure all path parameters are resolved
    if (urlPath.includes('{')) {
        throw new Error(`Failed to resolve path parameters: ${urlPath}`);
    }
    
    // Construct the full URL
    const requestUrl = API_BASE_URL ? `${API_BASE_URL}${urlPath}` : urlPath;

    // Handle request body if needed
    if (definition.requestBodyContentType && typeof validatedArgs['requestBody'] !== 'undefined') {
        requestBodyData = validatedArgs['requestBody'];
        headers['content-type'] = definition.requestBodyContentType;
    }


    // Apply security requirements if available
    // Security requirements use OR between array items and AND within each object
    const appliedSecurity = definition.securityRequirements?.find(req => {
        // Try each security requirement (combined with OR)
        return Object.entries(req).every(([schemeName, scopesArray]) => {
            const scheme = allSecuritySchemes[schemeName];
            if (!scheme) return false;
            
            // API Key security (header, query, cookie)
            if (scheme.type === 'apiKey') {
                return !!process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            // HTTP security (basic, bearer)
            if (scheme.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    return !!process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    return !!process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] && 
                           !!process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
            }
            
            // OAuth2 security
            if (scheme.type === 'oauth2') {
                // Check for pre-existing token
                if (process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    return true;
                }
                
                // Check for client credentials for auto-acquisition
                if (process.env[`OAUTH_CLIENT_ID_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] &&
                    process.env[`OAUTH_CLIENT_SECRET_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    // Verify we have a supported flow
                    if (scheme.flows?.clientCredentials || scheme.flows?.password) {
                        return true;
                    }
                }
                
                return false;
            }
            
            // OpenID Connect
            if (scheme.type === 'openIdConnect') {
                return !!process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            return false;
        });
    });

    // If we found matching security scheme(s), apply them
    if (appliedSecurity) {
        // Apply each security scheme from this requirement (combined with AND)
        for (const [schemeName, scopesArray] of Object.entries(appliedSecurity)) {
            const scheme = allSecuritySchemes[schemeName];
            
            // API Key security
            if (scheme?.type === 'apiKey') {
                const apiKey = process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (apiKey) {
                    if (scheme.in === 'header') {
                        headers[scheme.name.toLowerCase()] = apiKey;
                        console.error(`Applied API key '${schemeName}' in header '${scheme.name}'`);
                    }
                    else if (scheme.in === 'query') {
                        queryParams[scheme.name] = apiKey;
                        console.error(`Applied API key '${schemeName}' in query parameter '${scheme.name}'`);
                    }
                    else if (scheme.in === 'cookie') {
                        // Add the cookie, preserving other cookies if they exist
                        headers['cookie'] = `${scheme.name}=${apiKey}${headers['cookie'] ? `; ${headers['cookie']}` : ''}`;
                        console.error(`Applied API key '${schemeName}' in cookie '${scheme.name}'`);
                    }
                }
            } 
            // HTTP security (Bearer or Basic)
            else if (scheme?.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    const token = process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (token) {
                        headers['authorization'] = `Bearer ${token}`;
                        console.error(`Applied Bearer token for '${schemeName}'`);
                    }
                } 
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    const username = process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    const password = process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (username && password) {
                        headers['authorization'] = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
                        console.error(`Applied Basic authentication for '${schemeName}'`);
                    }
                }
            }
            // OAuth2 security
            else if (scheme?.type === 'oauth2') {
                // First try to use a pre-provided token
                let token = process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                
                // If no token but we have client credentials, try to acquire a token
                if (!token && (scheme.flows?.clientCredentials || scheme.flows?.password)) {
                    console.error(`Attempting to acquire OAuth token for '${schemeName}'`);
                    token = (await acquireOAuth2Token(schemeName, scheme)) ?? '';
                }
                
                // Apply token if available
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OAuth2 token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
            // OpenID Connect
            else if (scheme?.type === 'openIdConnect') {
                const token = process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OpenID Connect token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
        }
    } 
    // Log warning if security is required but not available
    else if (definition.securityRequirements?.length > 0) {
        // First generate a more readable representation of the security requirements
        const securityRequirementsString = definition.securityRequirements
            .map(req => {
                const parts = Object.entries(req)
                    .map(([name, scopesArray]) => {
                        const scopes = scopesArray as string[];
                        if (scopes.length === 0) return name;
                        return `${name} (scopes: ${scopes.join(', ')})`;
                    })
                    .join(' AND ');
                return `[${parts}]`;
            })
            .join(' OR ');
            
        console.warn(`Tool '${toolName}' requires security: ${securityRequirementsString}, but no suitable credentials found.`);
    }
    

    // Prepare the axios request configuration
    const config: AxiosRequestConfig = {
      method: definition.method.toUpperCase(), 
      url: requestUrl, 
      params: queryParams, 
      headers: headers,
      ...(requestBodyData !== undefined && { data: requestBodyData }),
    };

    // Log request info to stderr (doesn't affect MCP output)
    console.error(`Executing tool "${toolName}": ${config.method} ${config.url}`);
    
    // Execute the request
    const response = await axios(config);

    // Process and format the response
    let responseText = '';
    const contentType = response.headers['content-type']?.toLowerCase() || '';
    
    // Handle JSON responses
    if (contentType.includes('application/json') && typeof response.data === 'object' && response.data !== null) {
         try { 
             responseText = JSON.stringify(response.data, null, 2); 
         } catch (e) { 
             responseText = "[Stringify Error]"; 
         }
    } 
    // Handle string responses
    else if (typeof response.data === 'string') { 
         responseText = response.data; 
    }
    // Handle other response types
    else if (response.data !== undefined && response.data !== null) { 
         responseText = String(response.data); 
    }
    // Handle empty responses
    else { 
         responseText = `(Status: ${response.status} - No body content)`; 
    }
    
    // Return formatted response
    return { 
        content: [ 
            { 
                type: "text", 
                text: `API Response (Status: ${response.status}):\n${responseText}` 
            } 
        ], 
    };

  } catch (error: unknown) {
    // Handle errors during execution
    let errorMessage: string;
    
    // Format Axios errors specially
    if (axios.isAxiosError(error)) { 
        errorMessage = formatApiError(error); 
    }
    // Handle standard errors
    else if (error instanceof Error) { 
        errorMessage = error.message; 
    }
    // Handle unexpected error types
    else { 
        errorMessage = 'Unexpected error: ' + String(error); 
    }
    
    // Log error to stderr
    console.error(`Error during execution of tool '${toolName}':`, errorMessage);
    
    // Return error message to client
    return { content: [{ type: "text", text: errorMessage }] };
  }
}


/**
 * Main function to start the server
 */
async function main() {
// Set up stdio transport
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`${SERVER_NAME} MCP Server (v${SERVER_VERSION}) running on stdio${API_BASE_URL ? `, proxying API at ${API_BASE_URL}` : ''}`);
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
}

/**
 * Cleanup function for graceful shutdown
 */
async function cleanup() {
    console.error("Shutting down MCP server...");
    process.exit(0);
}

// Register signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start the server
main().catch((error) => {
  console.error("Fatal error in main execution:", error);
  process.exit(1);
});

/**
 * Formats API errors for better readability
 * 
 * @param error Axios error
 * @returns Formatted error message
 */
function formatApiError(error: AxiosError): string {
    let message = 'API request failed.';
    if (error.response) {
        message = `API Error: Status ${error.response.status} (${error.response.statusText || 'Status text not available'}). `;
        const responseData = error.response.data;
        const MAX_LEN = 200;
        if (typeof responseData === 'string') { 
            message += `Response: ${responseData.substring(0, MAX_LEN)}${responseData.length > MAX_LEN ? '...' : ''}`; 
        }
        else if (responseData) { 
            try { 
                const jsonString = JSON.stringify(responseData); 
                message += `Response: ${jsonString.substring(0, MAX_LEN)}${jsonString.length > MAX_LEN ? '...' : ''}`; 
            } catch { 
                message += 'Response: [Could not serialize data]'; 
            } 
        }
        else { 
            message += 'No response body received.'; 
        }
    } else if (error.request) {
        message = 'API Network Error: No response received from server.';
        if (error.code) message += ` (Code: ${error.code})`;
    } else { 
        message += `API Request Setup Error: ${error.message}`; 
    }
    return message;
}

/**
 * Converts a JSON Schema to a Zod schema for runtime validation
 * 
 * @param jsonSchema JSON Schema
 * @param toolName Tool name for error reporting
 * @returns Zod schema
 */
function getZodSchemaFromJsonSchema(jsonSchema: any, toolName: string): z.ZodTypeAny {
    if (typeof jsonSchema !== 'object' || jsonSchema === null) { 
        return z.object({}).passthrough(); 
    }
    try {
        const zodSchemaString = jsonSchemaToZod(jsonSchema);
        const zodSchema = eval(zodSchemaString);
        if (typeof zodSchema?.parse !== 'function') { 
            throw new Error('Eval did not produce a valid Zod schema.'); 
        }
        return zodSchema as z.ZodTypeAny;
    } catch (err: any) {
        console.error(`Failed to generate/evaluate Zod schema for '${toolName}':`, err);
        return z.object({}).passthrough();
    }
}
