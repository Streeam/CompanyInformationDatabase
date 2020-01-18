import { element, by, ElementFinder } from 'protractor';

export default class SalesOrderUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.salesOrder.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  salesOrderNumberInput: ElementFinder = element(by.css('input#sales-order-salesOrderNumber'));
  dateRaisedInput: ElementFinder = element(by.css('input#sales-order-dateRaised'));
  soSalesStatusInput: ElementFinder = element(by.css('input#sales-order-soSalesStatus'));
  secondSalesReferenceInput: ElementFinder = element(by.css('input#sales-order-secondSalesReference'));
  currencyCodeInput: ElementFinder = element(by.css('input#sales-order-currencyCode'));
  exchangeRateInput: ElementFinder = element(by.css('input#sales-order-exchangeRate'));
  discountPercentInput: ElementFinder = element(by.css('input#sales-order-discountPercent'));
  contactNameInput: ElementFinder = element(by.css('input#sales-order-contactName'));
  ourContactInput: ElementFinder = element(by.css('input#sales-order-ourContact'));
  invoiceAddressInput: ElementFinder = element(by.css('input#sales-order-invoiceAddress'));
  invoiceCountryCodeInput: ElementFinder = element(by.css('input#sales-order-invoiceCountryCode'));
  salesOrderTitleInput: ElementFinder = element(by.css('input#sales-order-salesOrderTitle'));
  salesAnalysis1Input: ElementFinder = element(by.css('input#sales-order-salesAnalysis1'));
  salesAnalysis2Input: ElementFinder = element(by.css('input#sales-order-salesAnalysis2'));
  salesAnalysis3Input: ElementFinder = element(by.css('input#sales-order-salesAnalysis3'));
  salesAnalysis4Input: ElementFinder = element(by.css('input#sales-order-salesAnalysis4'));
  salesAnalysis5Input: ElementFinder = element(by.css('input#sales-order-salesAnalysis5'));
  salesAnalysis6Input: ElementFinder = element(by.css('input#sales-order-salesAnalysis6'));
  memo1Input: ElementFinder = element(by.css('input#sales-order-memo1'));
  memo2Input: ElementFinder = element(by.css('input#sales-order-memo2'));
  memo3Input: ElementFinder = element(by.css('input#sales-order-memo3'));
  memo4Input: ElementFinder = element(by.css('input#sales-order-memo4'));
  memo5Input: ElementFinder = element(by.css('input#sales-order-memo5'));
  memo6Input: ElementFinder = element(by.css('input#sales-order-memo6'));
  stockAnalysis01Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis01'));
  stockAnalysis02Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis02'));
  stockAnalysis03Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis03'));
  stockAnalysis04Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis04'));
  stockAnalysis05Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis05'));
  stockAnalysis06Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis06'));
  stockAnalysis07Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis07'));
  stockAnalysis08Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis08'));
  stockAnalysis09Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis09'));
  stockAnalysis10Input: ElementFinder = element(by.css('input#sales-order-stockAnalysis10'));
  deliveryCodeInput: ElementFinder = element(by.css('input#sales-order-deliveryCode'));
  transactionCodeInput: ElementFinder = element(by.css('input#sales-order-transactionCode'));
  codeInput: ElementFinder = element(by.css('input#sales-order-code'));
  salesOrderStatusCodeInput: ElementFinder = element(by.css('input#sales-order-salesOrderStatusCode'));
  despatchStatusIDInput: ElementFinder = element(by.css('input#sales-order-despatchStatusID'));
  divisionInput: ElementFinder = element(by.css('input#sales-order-division'));
  lineNumberInput: ElementFinder = element(by.css('input#sales-order-lineNumber'));
  despatchStatusCodeInput: ElementFinder = element(by.css('input#sales-order-despatchStatusCode'));
  quantityOrderedInput: ElementFinder = element(by.css('input#sales-order-quantityOrdered'));
  quantityOutstandingInput: ElementFinder = element(by.css('input#sales-order-quantityOutstanding'));
  quantityDespatchedInput: ElementFinder = element(by.css('input#sales-order-quantityDespatched'));
  despatchDateInput: ElementFinder = element(by.css('input#sales-order-despatchDate'));
  custRequiredDateInput: ElementFinder = element(by.css('input#sales-order-custRequiredDate'));
  unitPriceInput: ElementFinder = element(by.css('input#sales-order-unitPrice'));
  unitPriceinBaseInput: ElementFinder = element(by.css('input#sales-order-unitPriceinBase'));
  lineDiscountPercentInput: ElementFinder = element(by.css('input#sales-order-lineDiscountPercent'));
  marginPercentInput: ElementFinder = element(by.css('input#sales-order-marginPercent'));
  lineTotalInput: ElementFinder = element(by.css('input#sales-order-lineTotal'));
  lineTotalinBaseInput: ElementFinder = element(by.css('input#sales-order-lineTotalinBase'));
  taxCodeInput: ElementFinder = element(by.css('input#sales-order-taxCode'));
  nominalCodeInput: ElementFinder = element(by.css('input#sales-order-nominalCode'));
  onHoldInput: ElementFinder = element(by.css('input#sales-order-onHold'));
  rCodeInput: ElementFinder = element(by.css('input#sales-order-rCode'));
  standardMarginInput: ElementFinder = element(by.css('input#sales-order-standardMargin'));
  deliveryAddressInput: ElementFinder = element(by.css('input#sales-order-deliveryAddress'));
  deliveryAddressDescriptionInput: ElementFinder = element(by.css('input#sales-order-deliveryAddressDescription'));
  deliveryCountryCodeInput: ElementFinder = element(by.css('input#sales-order-deliveryCountryCode'));
  salesOrderStatusInput: ElementFinder = element(by.css('input#sales-order-salesOrderStatus'));
  customerSelect: ElementFinder = element(by.css('select#sales-order-customer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSalesOrderNumberInput(salesOrderNumber) {
    await this.salesOrderNumberInput.sendKeys(salesOrderNumber);
  }

  async getSalesOrderNumberInput() {
    return this.salesOrderNumberInput.getAttribute('value');
  }

  async setDateRaisedInput(dateRaised) {
    await this.dateRaisedInput.sendKeys(dateRaised);
  }

  async getDateRaisedInput() {
    return this.dateRaisedInput.getAttribute('value');
  }

  async setSoSalesStatusInput(soSalesStatus) {
    await this.soSalesStatusInput.sendKeys(soSalesStatus);
  }

  async getSoSalesStatusInput() {
    return this.soSalesStatusInput.getAttribute('value');
  }

  async setSecondSalesReferenceInput(secondSalesReference) {
    await this.secondSalesReferenceInput.sendKeys(secondSalesReference);
  }

  async getSecondSalesReferenceInput() {
    return this.secondSalesReferenceInput.getAttribute('value');
  }

  async setCurrencyCodeInput(currencyCode) {
    await this.currencyCodeInput.sendKeys(currencyCode);
  }

  async getCurrencyCodeInput() {
    return this.currencyCodeInput.getAttribute('value');
  }

  async setExchangeRateInput(exchangeRate) {
    await this.exchangeRateInput.sendKeys(exchangeRate);
  }

  async getExchangeRateInput() {
    return this.exchangeRateInput.getAttribute('value');
  }

  async setDiscountPercentInput(discountPercent) {
    await this.discountPercentInput.sendKeys(discountPercent);
  }

  async getDiscountPercentInput() {
    return this.discountPercentInput.getAttribute('value');
  }

  async setContactNameInput(contactName) {
    await this.contactNameInput.sendKeys(contactName);
  }

  async getContactNameInput() {
    return this.contactNameInput.getAttribute('value');
  }

  async setOurContactInput(ourContact) {
    await this.ourContactInput.sendKeys(ourContact);
  }

  async getOurContactInput() {
    return this.ourContactInput.getAttribute('value');
  }

  async setInvoiceAddressInput(invoiceAddress) {
    await this.invoiceAddressInput.sendKeys(invoiceAddress);
  }

  async getInvoiceAddressInput() {
    return this.invoiceAddressInput.getAttribute('value');
  }

  async setInvoiceCountryCodeInput(invoiceCountryCode) {
    await this.invoiceCountryCodeInput.sendKeys(invoiceCountryCode);
  }

  async getInvoiceCountryCodeInput() {
    return this.invoiceCountryCodeInput.getAttribute('value');
  }

  async setSalesOrderTitleInput(salesOrderTitle) {
    await this.salesOrderTitleInput.sendKeys(salesOrderTitle);
  }

  async getSalesOrderTitleInput() {
    return this.salesOrderTitleInput.getAttribute('value');
  }

  async setSalesAnalysis1Input(salesAnalysis1) {
    await this.salesAnalysis1Input.sendKeys(salesAnalysis1);
  }

  async getSalesAnalysis1Input() {
    return this.salesAnalysis1Input.getAttribute('value');
  }

  async setSalesAnalysis2Input(salesAnalysis2) {
    await this.salesAnalysis2Input.sendKeys(salesAnalysis2);
  }

  async getSalesAnalysis2Input() {
    return this.salesAnalysis2Input.getAttribute('value');
  }

  async setSalesAnalysis3Input(salesAnalysis3) {
    await this.salesAnalysis3Input.sendKeys(salesAnalysis3);
  }

  async getSalesAnalysis3Input() {
    return this.salesAnalysis3Input.getAttribute('value');
  }

  async setSalesAnalysis4Input(salesAnalysis4) {
    await this.salesAnalysis4Input.sendKeys(salesAnalysis4);
  }

  async getSalesAnalysis4Input() {
    return this.salesAnalysis4Input.getAttribute('value');
  }

  async setSalesAnalysis5Input(salesAnalysis5) {
    await this.salesAnalysis5Input.sendKeys(salesAnalysis5);
  }

  async getSalesAnalysis5Input() {
    return this.salesAnalysis5Input.getAttribute('value');
  }

  async setSalesAnalysis6Input(salesAnalysis6) {
    await this.salesAnalysis6Input.sendKeys(salesAnalysis6);
  }

  async getSalesAnalysis6Input() {
    return this.salesAnalysis6Input.getAttribute('value');
  }

  async setMemo1Input(memo1) {
    await this.memo1Input.sendKeys(memo1);
  }

  async getMemo1Input() {
    return this.memo1Input.getAttribute('value');
  }

  async setMemo2Input(memo2) {
    await this.memo2Input.sendKeys(memo2);
  }

  async getMemo2Input() {
    return this.memo2Input.getAttribute('value');
  }

  async setMemo3Input(memo3) {
    await this.memo3Input.sendKeys(memo3);
  }

  async getMemo3Input() {
    return this.memo3Input.getAttribute('value');
  }

  async setMemo4Input(memo4) {
    await this.memo4Input.sendKeys(memo4);
  }

  async getMemo4Input() {
    return this.memo4Input.getAttribute('value');
  }

  async setMemo5Input(memo5) {
    await this.memo5Input.sendKeys(memo5);
  }

  async getMemo5Input() {
    return this.memo5Input.getAttribute('value');
  }

  async setMemo6Input(memo6) {
    await this.memo6Input.sendKeys(memo6);
  }

  async getMemo6Input() {
    return this.memo6Input.getAttribute('value');
  }

  async setStockAnalysis01Input(stockAnalysis01) {
    await this.stockAnalysis01Input.sendKeys(stockAnalysis01);
  }

  async getStockAnalysis01Input() {
    return this.stockAnalysis01Input.getAttribute('value');
  }

  async setStockAnalysis02Input(stockAnalysis02) {
    await this.stockAnalysis02Input.sendKeys(stockAnalysis02);
  }

  async getStockAnalysis02Input() {
    return this.stockAnalysis02Input.getAttribute('value');
  }

  async setStockAnalysis03Input(stockAnalysis03) {
    await this.stockAnalysis03Input.sendKeys(stockAnalysis03);
  }

  async getStockAnalysis03Input() {
    return this.stockAnalysis03Input.getAttribute('value');
  }

  async setStockAnalysis04Input(stockAnalysis04) {
    await this.stockAnalysis04Input.sendKeys(stockAnalysis04);
  }

  async getStockAnalysis04Input() {
    return this.stockAnalysis04Input.getAttribute('value');
  }

  async setStockAnalysis05Input(stockAnalysis05) {
    await this.stockAnalysis05Input.sendKeys(stockAnalysis05);
  }

  async getStockAnalysis05Input() {
    return this.stockAnalysis05Input.getAttribute('value');
  }

  async setStockAnalysis06Input(stockAnalysis06) {
    await this.stockAnalysis06Input.sendKeys(stockAnalysis06);
  }

  async getStockAnalysis06Input() {
    return this.stockAnalysis06Input.getAttribute('value');
  }

  async setStockAnalysis07Input(stockAnalysis07) {
    await this.stockAnalysis07Input.sendKeys(stockAnalysis07);
  }

  async getStockAnalysis07Input() {
    return this.stockAnalysis07Input.getAttribute('value');
  }

  async setStockAnalysis08Input(stockAnalysis08) {
    await this.stockAnalysis08Input.sendKeys(stockAnalysis08);
  }

  async getStockAnalysis08Input() {
    return this.stockAnalysis08Input.getAttribute('value');
  }

  async setStockAnalysis09Input(stockAnalysis09) {
    await this.stockAnalysis09Input.sendKeys(stockAnalysis09);
  }

  async getStockAnalysis09Input() {
    return this.stockAnalysis09Input.getAttribute('value');
  }

  async setStockAnalysis10Input(stockAnalysis10) {
    await this.stockAnalysis10Input.sendKeys(stockAnalysis10);
  }

  async getStockAnalysis10Input() {
    return this.stockAnalysis10Input.getAttribute('value');
  }

  async setDeliveryCodeInput(deliveryCode) {
    await this.deliveryCodeInput.sendKeys(deliveryCode);
  }

  async getDeliveryCodeInput() {
    return this.deliveryCodeInput.getAttribute('value');
  }

  async setTransactionCodeInput(transactionCode) {
    await this.transactionCodeInput.sendKeys(transactionCode);
  }

  async getTransactionCodeInput() {
    return this.transactionCodeInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setSalesOrderStatusCodeInput(salesOrderStatusCode) {
    await this.salesOrderStatusCodeInput.sendKeys(salesOrderStatusCode);
  }

  async getSalesOrderStatusCodeInput() {
    return this.salesOrderStatusCodeInput.getAttribute('value');
  }

  async setDespatchStatusIDInput(despatchStatusID) {
    await this.despatchStatusIDInput.sendKeys(despatchStatusID);
  }

  async getDespatchStatusIDInput() {
    return this.despatchStatusIDInput.getAttribute('value');
  }

  async setDivisionInput(division) {
    await this.divisionInput.sendKeys(division);
  }

  async getDivisionInput() {
    return this.divisionInput.getAttribute('value');
  }

  async setLineNumberInput(lineNumber) {
    await this.lineNumberInput.sendKeys(lineNumber);
  }

  async getLineNumberInput() {
    return this.lineNumberInput.getAttribute('value');
  }

  async setDespatchStatusCodeInput(despatchStatusCode) {
    await this.despatchStatusCodeInput.sendKeys(despatchStatusCode);
  }

  async getDespatchStatusCodeInput() {
    return this.despatchStatusCodeInput.getAttribute('value');
  }

  async setQuantityOrderedInput(quantityOrdered) {
    await this.quantityOrderedInput.sendKeys(quantityOrdered);
  }

  async getQuantityOrderedInput() {
    return this.quantityOrderedInput.getAttribute('value');
  }

  async setQuantityOutstandingInput(quantityOutstanding) {
    await this.quantityOutstandingInput.sendKeys(quantityOutstanding);
  }

  async getQuantityOutstandingInput() {
    return this.quantityOutstandingInput.getAttribute('value');
  }

  async setQuantityDespatchedInput(quantityDespatched) {
    await this.quantityDespatchedInput.sendKeys(quantityDespatched);
  }

  async getQuantityDespatchedInput() {
    return this.quantityDespatchedInput.getAttribute('value');
  }

  async setDespatchDateInput(despatchDate) {
    await this.despatchDateInput.sendKeys(despatchDate);
  }

  async getDespatchDateInput() {
    return this.despatchDateInput.getAttribute('value');
  }

  async setCustRequiredDateInput(custRequiredDate) {
    await this.custRequiredDateInput.sendKeys(custRequiredDate);
  }

  async getCustRequiredDateInput() {
    return this.custRequiredDateInput.getAttribute('value');
  }

  async setUnitPriceInput(unitPrice) {
    await this.unitPriceInput.sendKeys(unitPrice);
  }

  async getUnitPriceInput() {
    return this.unitPriceInput.getAttribute('value');
  }

  async setUnitPriceinBaseInput(unitPriceinBase) {
    await this.unitPriceinBaseInput.sendKeys(unitPriceinBase);
  }

  async getUnitPriceinBaseInput() {
    return this.unitPriceinBaseInput.getAttribute('value');
  }

  async setLineDiscountPercentInput(lineDiscountPercent) {
    await this.lineDiscountPercentInput.sendKeys(lineDiscountPercent);
  }

  async getLineDiscountPercentInput() {
    return this.lineDiscountPercentInput.getAttribute('value');
  }

  async setMarginPercentInput(marginPercent) {
    await this.marginPercentInput.sendKeys(marginPercent);
  }

  async getMarginPercentInput() {
    return this.marginPercentInput.getAttribute('value');
  }

  async setLineTotalInput(lineTotal) {
    await this.lineTotalInput.sendKeys(lineTotal);
  }

  async getLineTotalInput() {
    return this.lineTotalInput.getAttribute('value');
  }

  async setLineTotalinBaseInput(lineTotalinBase) {
    await this.lineTotalinBaseInput.sendKeys(lineTotalinBase);
  }

  async getLineTotalinBaseInput() {
    return this.lineTotalinBaseInput.getAttribute('value');
  }

  async setTaxCodeInput(taxCode) {
    await this.taxCodeInput.sendKeys(taxCode);
  }

  async getTaxCodeInput() {
    return this.taxCodeInput.getAttribute('value');
  }

  async setNominalCodeInput(nominalCode) {
    await this.nominalCodeInput.sendKeys(nominalCode);
  }

  async getNominalCodeInput() {
    return this.nominalCodeInput.getAttribute('value');
  }

  getOnHoldInput() {
    return this.onHoldInput;
  }
  async setRCodeInput(rCode) {
    await this.rCodeInput.sendKeys(rCode);
  }

  async getRCodeInput() {
    return this.rCodeInput.getAttribute('value');
  }

  async setStandardMarginInput(standardMargin) {
    await this.standardMarginInput.sendKeys(standardMargin);
  }

  async getStandardMarginInput() {
    return this.standardMarginInput.getAttribute('value');
  }

  async setDeliveryAddressInput(deliveryAddress) {
    await this.deliveryAddressInput.sendKeys(deliveryAddress);
  }

  async getDeliveryAddressInput() {
    return this.deliveryAddressInput.getAttribute('value');
  }

  async setDeliveryAddressDescriptionInput(deliveryAddressDescription) {
    await this.deliveryAddressDescriptionInput.sendKeys(deliveryAddressDescription);
  }

  async getDeliveryAddressDescriptionInput() {
    return this.deliveryAddressDescriptionInput.getAttribute('value');
  }

  async setDeliveryCountryCodeInput(deliveryCountryCode) {
    await this.deliveryCountryCodeInput.sendKeys(deliveryCountryCode);
  }

  async getDeliveryCountryCodeInput() {
    return this.deliveryCountryCodeInput.getAttribute('value');
  }

  async setSalesOrderStatusInput(salesOrderStatus) {
    await this.salesOrderStatusInput.sendKeys(salesOrderStatus);
  }

  async getSalesOrderStatusInput() {
    return this.salesOrderStatusInput.getAttribute('value');
  }

  async customerSelectLastOption() {
    await this.customerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async customerSelectOption(option) {
    await this.customerSelect.sendKeys(option);
  }

  getCustomerSelect() {
    return this.customerSelect;
  }

  async getCustomerSelectedOption() {
    return this.customerSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
