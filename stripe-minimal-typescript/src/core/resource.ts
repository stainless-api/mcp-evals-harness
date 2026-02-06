// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Stripe } from '../client';

export abstract class APIResource {
  protected _client: Stripe;

  constructor(client: Stripe) {
    this._client = client;
  }
}
