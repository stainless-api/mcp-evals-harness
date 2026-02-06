# Shared

Types:

- <code><a href="./src/resources/shared.ts">AccountRequirementsError</a></code>
- <code><a href="./src/resources/shared.ts">Address</a></code>
- <code><a href="./src/resources/shared.ts">Application</a></code>
- <code><a href="./src/resources/shared.ts">BillingClocksResourceStatusDetailsAdvancingStatusDetails</a></code>
- <code><a href="./src/resources/shared.ts">BillingClocksResourceStatusDetailsStatusDetails</a></code>
- <code><a href="./src/resources/shared.ts">DeletedApplication</a></code>
- <code><a href="./src/resources/shared.ts">DeletedCustomer</a></code>
- <code><a href="./src/resources/shared.ts">DeletedTaxID</a></code>
- <code><a href="./src/resources/shared.ts">InvoiceSettingCustomField</a></code>
- <code><a href="./src/resources/shared.ts">PaymentFlowsPaymentIntentPresentmentDetails</a></code>
- <code><a href="./src/resources/shared.ts">PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet</a></code>
- <code><a href="./src/resources/shared.ts">PaymentMethodDetailsCardInstallmentsPlan</a></code>
- <code><a href="./src/resources/shared.ts">PaymentMethodDetailsCardPresent</a></code>
- <code><a href="./src/resources/shared.ts">PaymentMethodDetailsCardPresentOffline</a></code>
- <code><a href="./src/resources/shared.ts">PaymentMethodDetailsCardPresentReceipt</a></code>
- <code><a href="./src/resources/shared.ts">PaymentMethodDetailsPassthroughCard</a></code>
- <code><a href="./src/resources/shared.ts">Shipping</a></code>
- <code><a href="./src/resources/shared.ts">Source</a></code>
- <code><a href="./src/resources/shared.ts">SourceCodeVerificationFlow</a></code>
- <code><a href="./src/resources/shared.ts">SourceOrder</a></code>
- <code><a href="./src/resources/shared.ts">SourceOrderItem</a></code>
- <code><a href="./src/resources/shared.ts">SourceOwner</a></code>
- <code><a href="./src/resources/shared.ts">SourceReceiverFlow</a></code>
- <code><a href="./src/resources/shared.ts">SourceRedirectFlow</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeACHCreditTransfer</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeACHDebit</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeAcssDebit</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeAlipay</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeAuBecsDebit</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeBancontact</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeCard</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeCardPresent</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeEps</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeGiropay</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeIdeal</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeKlarna</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeMultibanco</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeP24</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeSepaDebit</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeSofort</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeThreeDSecure</a></code>
- <code><a href="./src/resources/shared.ts">SourceTypeWechat</a></code>
- <code><a href="./src/resources/shared.ts">TaxCode</a></code>
- <code><a href="./src/resources/shared.ts">TestHelpersTestClock</a></code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">Account</a></code>
- <code><a href="./src/resources/accounts.ts">AccountInvoicesSettings</a></code>
- <code><a href="./src/resources/accounts.ts">AccountRequirementsAlternative</a></code>
- <code><a href="./src/resources/accounts.ts">AccountSettings</a></code>
- <code><a href="./src/resources/accounts.ts">LegalEntityJapanAddress</a></code>

Methods:

- <code title="get /v1/account">client.accounts.<a href="./src/resources/accounts.ts">retrieve</a>({ ...params }) -> Account</code>

# Balance

Types:

- <code><a href="./src/resources/balance.ts">BalanceAmount</a></code>
- <code><a href="./src/resources/balance.ts">BalanceAmountBySourceType</a></code>
- <code><a href="./src/resources/balance.ts">BalanceRetrieveResponse</a></code>

Methods:

- <code title="get /v1/balance">client.balance.<a href="./src/resources/balance.ts">retrieve</a>({ ...params }) -> BalanceRetrieveResponse</code>

# Coupons

Types:

- <code><a href="./src/resources/coupons.ts">Coupon</a></code>

Methods:

- <code title="post /v1/coupons">client.coupons.<a href="./src/resources/coupons.ts">create</a>({ ...params }) -> Coupon</code>
- <code title="get /v1/coupons">client.coupons.<a href="./src/resources/coupons.ts">list</a>({ ...params }) -> CouponsMyCursorIDPage</code>

# Customers

Types:

- <code><a href="./src/resources/customers.ts">BankAccount</a></code>
- <code><a href="./src/resources/customers.ts">Card</a></code>
- <code><a href="./src/resources/customers.ts">Customer</a></code>
- <code><a href="./src/resources/customers.ts">Discount</a></code>
- <code><a href="./src/resources/customers.ts">InvoiceSetting</a></code>
- <code><a href="./src/resources/customers.ts">PromotionCode</a></code>
- <code><a href="./src/resources/customers.ts">TaxID</a></code>
- <code><a href="./src/resources/customers.ts">TaxIDsOwner</a></code>

Methods:

- <code title="post /v1/customers">client.customers.<a href="./src/resources/customers.ts">create</a>({ ...params }) -> Customer</code>
- <code title="get /v1/customers">client.customers.<a href="./src/resources/customers.ts">list</a>({ ...params }) -> CustomersMyCursorIDPage</code>

# Disputes

Types:

- <code><a href="./src/resources/disputes.ts">ApplicationFee</a></code>
- <code><a href="./src/resources/disputes.ts">BalanceTransaction</a></code>
- <code><a href="./src/resources/disputes.ts">Charge</a></code>
- <code><a href="./src/resources/disputes.ts">ChargeTransferData</a></code>
- <code><a href="./src/resources/disputes.ts">ConnectCollectionTransfer</a></code>
- <code><a href="./src/resources/disputes.ts">CustomerBalanceResourceCashBalanceTransactionAdjustedForOverdraft</a></code>
- <code><a href="./src/resources/disputes.ts">CustomerBalanceResourceCashBalanceTransactionAppliedToPayment</a></code>
- <code><a href="./src/resources/disputes.ts">CustomerBalanceResourceCashBalanceTransactionRefundedFromPayment</a></code>
- <code><a href="./src/resources/disputes.ts">CustomerBalanceResourceCashBalanceTransactionTransferredToBalance</a></code>
- <code><a href="./src/resources/disputes.ts">CustomerBalanceResourceCashBalanceTransactionUnappliedFromPayment</a></code>
- <code><a href="./src/resources/disputes.ts">CustomerCashBalanceTransaction</a></code>
- <code><a href="./src/resources/disputes.ts">Dispute</a></code>
- <code><a href="./src/resources/disputes.ts">FeeRefund</a></code>
- <code><a href="./src/resources/disputes.ts">File</a></code>
- <code><a href="./src/resources/disputes.ts">FileLink</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingAuthorization</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingAuthorizationAmountDetails</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCard</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholder</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderAddress</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderAuthorizationControls</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderCardIssuing</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderCompany</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderIDDocument</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderIndividual</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderIndividualDob</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderRequirements</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderSpendingLimit</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderUserTermsAcceptance</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingCardholderVerification</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingDispute</a></code>
- <code><a href="./src/resources/disputes.ts">IssuingTransaction</a></code>
- <code><a href="./src/resources/disputes.ts">PaymentMethodDetails</a></code>
- <code><a href="./src/resources/disputes.ts">PaymentMethodDetailsBancontactDispute</a></code>
- <code><a href="./src/resources/disputes.ts">PaymentMethodDetailsIdealDispute</a></code>
- <code><a href="./src/resources/disputes.ts">PaymentMethodDetailsSofortDispute</a></code>
- <code><a href="./src/resources/disputes.ts">PaymentMethodDetailsUsBankAccount</a></code>
- <code><a href="./src/resources/disputes.ts">Payout</a></code>
- <code><a href="./src/resources/disputes.ts">Topup</a></code>
- <code><a href="./src/resources/disputes.ts">Transfer</a></code>

Methods:

- <code title="post /v1/disputes/{dispute}">client.disputes.<a href="./src/resources/disputes.ts">update</a>(dispute, { ...params }) -> Dispute</code>
- <code title="get /v1/disputes">client.disputes.<a href="./src/resources/disputes.ts">list</a>({ ...params }) -> DisputesMyCursorIDPage</code>

# Invoices

Types:

- <code><a href="./src/resources/invoices.ts">APIErrors</a></code>
- <code><a href="./src/resources/invoices.ts">AutomaticTaxInvoice</a></code>
- <code><a href="./src/resources/invoices.ts">BillingBillResourceInvoicingParentsInvoiceParent</a></code>
- <code><a href="./src/resources/invoices.ts">BillingBillResourceInvoicingParentsInvoiceSubscriptionParent</a></code>
- <code><a href="./src/resources/invoices.ts">BillingCreditBalanceTransaction</a></code>
- <code><a href="./src/resources/invoices.ts">BillingCreditGrant</a></code>
- <code><a href="./src/resources/invoices.ts">BillingCreditGrantsResourceAmount</a></code>
- <code><a href="./src/resources/invoices.ts">BillingCreditGrantsResourceBalanceCredit</a></code>
- <code><a href="./src/resources/invoices.ts">BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided</a></code>
- <code><a href="./src/resources/invoices.ts">BillingCreditGrantsResourceBalanceCreditsApplied</a></code>
- <code><a href="./src/resources/invoices.ts">BillingCreditGrantsResourceBalanceDebit</a></code>
- <code><a href="./src/resources/invoices.ts">BillingCreditGrantsResourceMonetaryAmount</a></code>
- <code><a href="./src/resources/invoices.ts">ConnectAccountReference</a></code>
- <code><a href="./src/resources/invoices.ts">DeletedDiscount</a></code>
- <code><a href="./src/resources/invoices.ts">DiscountsResourceDiscountAmount</a></code>
- <code><a href="./src/resources/invoices.ts">Invoice</a></code>
- <code><a href="./src/resources/invoices.ts">InvoicePayment</a></code>
- <code><a href="./src/resources/invoices.ts">InvoicesPaymentsInvoicePaymentAssociatedPayment</a></code>
- <code><a href="./src/resources/invoices.ts">InvoicesResourceFromInvoice</a></code>
- <code><a href="./src/resources/invoices.ts">InvoicesResourcePretaxCreditAmount</a></code>
- <code><a href="./src/resources/invoices.ts">LineItem</a></code>
- <code><a href="./src/resources/invoices.ts">PaymentMethod</a></code>
- <code><a href="./src/resources/invoices.ts">PaymentMethodCard</a></code>
- <code><a href="./src/resources/invoices.ts">PaymentMethodCardGeneratedCard</a></code>
- <code><a href="./src/resources/invoices.ts">PaymentMethodDetailsPaymentRecordUsBankAccount</a></code>
- <code><a href="./src/resources/invoices.ts">PaymentMethodSepaDebit</a></code>
- <code><a href="./src/resources/invoices.ts">PaymentRecord</a></code>
- <code><a href="./src/resources/invoices.ts">PaymentsPrimitivesPaymentRecordsResourceAmount</a></code>
- <code><a href="./src/resources/invoices.ts">PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails</a></code>
- <code><a href="./src/resources/invoices.ts">SepaDebitGeneratedFrom</a></code>
- <code><a href="./src/resources/invoices.ts">ShippingRateDeliveryEstimateBound</a></code>
- <code><a href="./src/resources/invoices.ts">TaxRate</a></code>

Methods:

- <code title="post /v1/invoices">client.invoices.<a href="./src/resources/invoices.ts">create</a>({ ...params }) -> Invoice</code>
- <code title="get /v1/invoices">client.invoices.<a href="./src/resources/invoices.ts">list</a>({ ...params }) -> InvoicesMyCursorIDPage</code>
- <code title="post /v1/invoices/{invoice}/finalize">client.invoices.<a href="./src/resources/invoices.ts">finalize</a>(invoice, { ...params }) -> Invoice</code>

# Invoiceitems

Types:

- <code><a href="./src/resources/invoiceitems.ts">InvoiceitemCreateResponse</a></code>

Methods:

- <code title="post /v1/invoiceitems">client.invoiceitems.<a href="./src/resources/invoiceitems.ts">create</a>({ ...params }) -> InvoiceitemCreateResponse</code>

# PaymentLinks

Types:

- <code><a href="./src/resources/payment-links.ts">CustomTextPosition</a></code>
- <code><a href="./src/resources/payment-links.ts">PaymentLinkCreateResponse</a></code>

Methods:

- <code title="post /v1/payment_links">client.paymentLinks.<a href="./src/resources/payment-links.ts">create</a>({ ...params }) -> PaymentLinkCreateResponse</code>

# PaymentIntents

Types:

- <code><a href="./src/resources/payment-intents.ts">PaymentFlowsInstallmentOptions</a></code>
- <code><a href="./src/resources/payment-intents.ts">PaymentIntent</a></code>
- <code><a href="./src/resources/payment-intents.ts">PaymentIntentPaymentMethodOptionsMandateOptionsPayto</a></code>
- <code><a href="./src/resources/payment-intents.ts">PaymentIntentTypeSpecificPaymentMethodOptionsClient</a></code>
- <code><a href="./src/resources/payment-intents.ts">PaymentMethodOptionsCardPresentRouting</a></code>
- <code><a href="./src/resources/payment-intents.ts">PaymentTransferData</a></code>
- <code><a href="./src/resources/payment-intents.ts">Review</a></code>

Methods:

- <code title="get /v1/payment_intents">client.paymentIntents.<a href="./src/resources/payment-intents.ts">list</a>({ ...params }) -> PaymentIntentsMyCursorIDPage</code>

# Prices

Types:

- <code><a href="./src/resources/prices.ts">Price</a></code>

Methods:

- <code title="post /v1/prices">client.prices.<a href="./src/resources/prices.ts">create</a>({ ...params }) -> Price</code>
- <code title="get /v1/prices">client.prices.<a href="./src/resources/prices.ts">list</a>({ ...params }) -> PricesMyCursorIDPage</code>

# Products

Types:

- <code><a href="./src/resources/products.ts">Product</a></code>

Methods:

- <code title="post /v1/products">client.products.<a href="./src/resources/products.ts">create</a>({ ...params }) -> Product</code>
- <code title="get /v1/products">client.products.<a href="./src/resources/products.ts">list</a>({ ...params }) -> ProductsMyCursorIDPage</code>

# Refunds

Types:

- <code><a href="./src/resources/refunds.ts">Refund</a></code>
- <code><a href="./src/resources/refunds.ts">TransferReversal</a></code>

Methods:

- <code title="post /v1/refunds">client.refunds.<a href="./src/resources/refunds.ts">create</a>({ ...params }) -> Refund</code>

# Subscriptions

Types:

- <code><a href="./src/resources/subscriptions.ts">AutomaticTaxSubscription</a></code>
- <code><a href="./src/resources/subscriptions.ts">DefaultSettings</a></code>
- <code><a href="./src/resources/subscriptions.ts">DefaultSettingsAutomaticTax</a></code>
- <code><a href="./src/resources/subscriptions.ts">Mandate</a></code>
- <code><a href="./src/resources/subscriptions.ts">PaymentMethodDetailsBancontactSetupAttempt</a></code>
- <code><a href="./src/resources/subscriptions.ts">PaymentMethodDetailsIdealSetupAttempt</a></code>
- <code><a href="./src/resources/subscriptions.ts">PaymentMethodDetailsSofortSetupAttempt</a></code>
- <code><a href="./src/resources/subscriptions.ts">PendingUpdate</a></code>
- <code><a href="./src/resources/subscriptions.ts">PhaseAutomaticTax</a></code>
- <code><a href="./src/resources/subscriptions.ts">Schedule</a></code>
- <code><a href="./src/resources/subscriptions.ts">ScheduleAddInvoiceItem</a></code>
- <code><a href="./src/resources/subscriptions.ts">ScheduleConfigurationItem</a></code>
- <code><a href="./src/resources/subscriptions.ts">SchedulePhaseConfiguration</a></code>
- <code><a href="./src/resources/subscriptions.ts">SchedulePhaseSetting</a></code>
- <code><a href="./src/resources/subscriptions.ts">ScheduleSetting</a></code>
- <code><a href="./src/resources/subscriptions.ts">SetupAttempt</a></code>
- <code><a href="./src/resources/subscriptions.ts">SetupAttemptPaymentMethodDetails</a></code>
- <code><a href="./src/resources/subscriptions.ts">SetupAttemptPaymentMethodDetailsCardPresent</a></code>
- <code><a href="./src/resources/subscriptions.ts">SetupIntent</a></code>
- <code><a href="./src/resources/subscriptions.ts">SetupIntentPaymentMethodOptionsMandateOptionsPayto</a></code>
- <code><a href="./src/resources/subscriptions.ts">SetupIntentTypeSpecificPaymentMethodOptionsClient</a></code>
- <code><a href="./src/resources/subscriptions.ts">StackableDiscount</a></code>
- <code><a href="./src/resources/subscriptions.ts">Subscription</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionBillingThresholds</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionInvoiceSettings</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionItem</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionTransferData</a></code>

Methods:

- <code title="post /v1/subscriptions/{subscription_exposed_id}">client.subscriptions.<a href="./src/resources/subscriptions.ts">update</a>(subscriptionExposedID, { ...params }) -> Subscription</code>
- <code title="get /v1/subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">list</a>({ ...params }) -> SubscriptionsMyCursorIDPage</code>
- <code title="delete /v1/subscriptions/{subscription_exposed_id}">client.subscriptions.<a href="./src/resources/subscriptions.ts">cancel</a>(subscriptionExposedID, { ...params }) -> Subscription</code>
