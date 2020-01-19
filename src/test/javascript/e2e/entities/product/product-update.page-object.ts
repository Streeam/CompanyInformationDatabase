import { element, by, ElementFinder } from 'protractor';

export default class ProductUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.product.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  partNumberInput: ElementFinder = element(by.css('input#product-partNumber'));
  partDescriptionInput: ElementFinder = element(by.css('input#product-partDescription'));
  releaseDateInput: ElementFinder = element(by.css('input#product-releaseDate'));
  productGroupCodeInput: ElementFinder = element(by.css('input#product-productGroupCode'));
  siteInput: ElementFinder = element(by.css('input#product-site'));
  departamentInput: ElementFinder = element(by.css('input#product-departament'));
  methodTypeInput: ElementFinder = element(by.css('input#product-methodType'));
  methodStatusInput: ElementFinder = element(by.css('input#product-methodStatus'));
  primeInput: ElementFinder = element(by.css('input#product-prime'));
  unitOfMeasureInput: ElementFinder = element(by.css('input#product-unitOfMeasure'));
  supplierPartNumberInput: ElementFinder = element(by.css('input#product-supplierPartNumber'));
  supplierPartDescriptionInput: ElementFinder = element(by.css('input#product-supplierPartDescription'));
  curencyInput: ElementFinder = element(by.css('input#product-curency'));
  leadTimeInput: ElementFinder = element(by.css('input#product-leadTime'));
  minQuantityInput: ElementFinder = element(by.css('input#product-minQuantity'));
  latestUnitMaterialCostInput: ElementFinder = element(by.css('input#product-latestUnitMaterialCost'));
  costInSupplierCurrencyInput: ElementFinder = element(by.css('input#product-costInSupplierCurrency'));
  supplierPriceInput: ElementFinder = element(by.css('input#product-supplierPrice'));
  costInBaseCurrencyInput: ElementFinder = element(by.css('input#product-costInBaseCurrency'));
  scrapPercentageInput: ElementFinder = element(by.css('input#product-scrapPercentage'));
  onHandStockInput: ElementFinder = element(by.css('input#product-onHandStock'));
  standardComponentCostInput: ElementFinder = element(by.css('input#product-standardComponentCost'));
  standardSubContractCostInput: ElementFinder = element(by.css('input#product-standardSubContractCost'));
  standardUnitMaterialCostInput: ElementFinder = element(by.css('input#product-standardUnitMaterialCost'));
  standardSetCostInput: ElementFinder = element(by.css('input#product-standardSetCost'));
  standardRunCostInput: ElementFinder = element(by.css('input#product-standardRunCost'));
  standardLandedCost1Input: ElementFinder = element(by.css('input#product-standardLandedCost1'));
  standardLandedCost2Input: ElementFinder = element(by.css('input#product-standardLandedCost2'));
  standardLandedCost3Input: ElementFinder = element(by.css('input#product-standardLandedCost3'));
  comment1Input: ElementFinder = element(by.css('input#product-comment1'));
  comment2Input: ElementFinder = element(by.css('input#product-comment2'));
  comment3Input: ElementFinder = element(by.css('input#product-comment3'));
  reviewDate1Input: ElementFinder = element(by.css('input#product-reviewDate1'));
  reviewDate2Input: ElementFinder = element(by.css('input#product-reviewDate2'));
  reviewDate3Input: ElementFinder = element(by.css('input#product-reviewDate3'));
  standardTotalCostInput: ElementFinder = element(by.css('input#product-standardTotalCost'));
  minBarchSizeInput: ElementFinder = element(by.css('input#product-minBarchSize'));
  obsoleteInput: ElementFinder = element(by.css('input#product-obsolete'));
  orderMultiplerInput: ElementFinder = element(by.css('input#product-orderMultipler'));
  bomSelect: ElementFinder = element(by.css('select#product-bom'));
  routingsSelect: ElementFinder = element(by.css('select#product-routings'));
  salesOrderSelect: ElementFinder = element(by.css('select#product-salesOrder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPartNumberInput(partNumber) {
    await this.partNumberInput.sendKeys(partNumber);
  }

  async getPartNumberInput() {
    return this.partNumberInput.getAttribute('value');
  }

  async setPartDescriptionInput(partDescription) {
    await this.partDescriptionInput.sendKeys(partDescription);
  }

  async getPartDescriptionInput() {
    return this.partDescriptionInput.getAttribute('value');
  }

  async setReleaseDateInput(releaseDate) {
    await this.releaseDateInput.sendKeys(releaseDate);
  }

  async getReleaseDateInput() {
    return this.releaseDateInput.getAttribute('value');
  }

  async setProductGroupCodeInput(productGroupCode) {
    await this.productGroupCodeInput.sendKeys(productGroupCode);
  }

  async getProductGroupCodeInput() {
    return this.productGroupCodeInput.getAttribute('value');
  }

  async setSiteInput(site) {
    await this.siteInput.sendKeys(site);
  }

  async getSiteInput() {
    return this.siteInput.getAttribute('value');
  }

  async setDepartamentInput(departament) {
    await this.departamentInput.sendKeys(departament);
  }

  async getDepartamentInput() {
    return this.departamentInput.getAttribute('value');
  }

  async setMethodTypeInput(methodType) {
    await this.methodTypeInput.sendKeys(methodType);
  }

  async getMethodTypeInput() {
    return this.methodTypeInput.getAttribute('value');
  }

  async setMethodStatusInput(methodStatus) {
    await this.methodStatusInput.sendKeys(methodStatus);
  }

  async getMethodStatusInput() {
    return this.methodStatusInput.getAttribute('value');
  }

  getPrimeInput() {
    return this.primeInput;
  }
  async setUnitOfMeasureInput(unitOfMeasure) {
    await this.unitOfMeasureInput.sendKeys(unitOfMeasure);
  }

  async getUnitOfMeasureInput() {
    return this.unitOfMeasureInput.getAttribute('value');
  }

  async setSupplierPartNumberInput(supplierPartNumber) {
    await this.supplierPartNumberInput.sendKeys(supplierPartNumber);
  }

  async getSupplierPartNumberInput() {
    return this.supplierPartNumberInput.getAttribute('value');
  }

  async setSupplierPartDescriptionInput(supplierPartDescription) {
    await this.supplierPartDescriptionInput.sendKeys(supplierPartDescription);
  }

  async getSupplierPartDescriptionInput() {
    return this.supplierPartDescriptionInput.getAttribute('value');
  }

  async setCurencyInput(curency) {
    await this.curencyInput.sendKeys(curency);
  }

  async getCurencyInput() {
    return this.curencyInput.getAttribute('value');
  }

  async setLeadTimeInput(leadTime) {
    await this.leadTimeInput.sendKeys(leadTime);
  }

  async getLeadTimeInput() {
    return this.leadTimeInput.getAttribute('value');
  }

  async setMinQuantityInput(minQuantity) {
    await this.minQuantityInput.sendKeys(minQuantity);
  }

  async getMinQuantityInput() {
    return this.minQuantityInput.getAttribute('value');
  }

  async setLatestUnitMaterialCostInput(latestUnitMaterialCost) {
    await this.latestUnitMaterialCostInput.sendKeys(latestUnitMaterialCost);
  }

  async getLatestUnitMaterialCostInput() {
    return this.latestUnitMaterialCostInput.getAttribute('value');
  }

  async setCostInSupplierCurrencyInput(costInSupplierCurrency) {
    await this.costInSupplierCurrencyInput.sendKeys(costInSupplierCurrency);
  }

  async getCostInSupplierCurrencyInput() {
    return this.costInSupplierCurrencyInput.getAttribute('value');
  }

  async setSupplierPriceInput(supplierPrice) {
    await this.supplierPriceInput.sendKeys(supplierPrice);
  }

  async getSupplierPriceInput() {
    return this.supplierPriceInput.getAttribute('value');
  }

  async setCostInBaseCurrencyInput(costInBaseCurrency) {
    await this.costInBaseCurrencyInput.sendKeys(costInBaseCurrency);
  }

  async getCostInBaseCurrencyInput() {
    return this.costInBaseCurrencyInput.getAttribute('value');
  }

  async setScrapPercentageInput(scrapPercentage) {
    await this.scrapPercentageInput.sendKeys(scrapPercentage);
  }

  async getScrapPercentageInput() {
    return this.scrapPercentageInput.getAttribute('value');
  }

  async setOnHandStockInput(onHandStock) {
    await this.onHandStockInput.sendKeys(onHandStock);
  }

  async getOnHandStockInput() {
    return this.onHandStockInput.getAttribute('value');
  }

  async setStandardComponentCostInput(standardComponentCost) {
    await this.standardComponentCostInput.sendKeys(standardComponentCost);
  }

  async getStandardComponentCostInput() {
    return this.standardComponentCostInput.getAttribute('value');
  }

  async setStandardSubContractCostInput(standardSubContractCost) {
    await this.standardSubContractCostInput.sendKeys(standardSubContractCost);
  }

  async getStandardSubContractCostInput() {
    return this.standardSubContractCostInput.getAttribute('value');
  }

  async setStandardUnitMaterialCostInput(standardUnitMaterialCost) {
    await this.standardUnitMaterialCostInput.sendKeys(standardUnitMaterialCost);
  }

  async getStandardUnitMaterialCostInput() {
    return this.standardUnitMaterialCostInput.getAttribute('value');
  }

  async setStandardSetCostInput(standardSetCost) {
    await this.standardSetCostInput.sendKeys(standardSetCost);
  }

  async getStandardSetCostInput() {
    return this.standardSetCostInput.getAttribute('value');
  }

  async setStandardRunCostInput(standardRunCost) {
    await this.standardRunCostInput.sendKeys(standardRunCost);
  }

  async getStandardRunCostInput() {
    return this.standardRunCostInput.getAttribute('value');
  }

  async setStandardLandedCost1Input(standardLandedCost1) {
    await this.standardLandedCost1Input.sendKeys(standardLandedCost1);
  }

  async getStandardLandedCost1Input() {
    return this.standardLandedCost1Input.getAttribute('value');
  }

  async setStandardLandedCost2Input(standardLandedCost2) {
    await this.standardLandedCost2Input.sendKeys(standardLandedCost2);
  }

  async getStandardLandedCost2Input() {
    return this.standardLandedCost2Input.getAttribute('value');
  }

  async setStandardLandedCost3Input(standardLandedCost3) {
    await this.standardLandedCost3Input.sendKeys(standardLandedCost3);
  }

  async getStandardLandedCost3Input() {
    return this.standardLandedCost3Input.getAttribute('value');
  }

  async setComment1Input(comment1) {
    await this.comment1Input.sendKeys(comment1);
  }

  async getComment1Input() {
    return this.comment1Input.getAttribute('value');
  }

  async setComment2Input(comment2) {
    await this.comment2Input.sendKeys(comment2);
  }

  async getComment2Input() {
    return this.comment2Input.getAttribute('value');
  }

  async setComment3Input(comment3) {
    await this.comment3Input.sendKeys(comment3);
  }

  async getComment3Input() {
    return this.comment3Input.getAttribute('value');
  }

  async setReviewDate1Input(reviewDate1) {
    await this.reviewDate1Input.sendKeys(reviewDate1);
  }

  async getReviewDate1Input() {
    return this.reviewDate1Input.getAttribute('value');
  }

  async setReviewDate2Input(reviewDate2) {
    await this.reviewDate2Input.sendKeys(reviewDate2);
  }

  async getReviewDate2Input() {
    return this.reviewDate2Input.getAttribute('value');
  }

  async setReviewDate3Input(reviewDate3) {
    await this.reviewDate3Input.sendKeys(reviewDate3);
  }

  async getReviewDate3Input() {
    return this.reviewDate3Input.getAttribute('value');
  }

  async setStandardTotalCostInput(standardTotalCost) {
    await this.standardTotalCostInput.sendKeys(standardTotalCost);
  }

  async getStandardTotalCostInput() {
    return this.standardTotalCostInput.getAttribute('value');
  }

  async setMinBarchSizeInput(minBarchSize) {
    await this.minBarchSizeInput.sendKeys(minBarchSize);
  }

  async getMinBarchSizeInput() {
    return this.minBarchSizeInput.getAttribute('value');
  }

  getObsoleteInput() {
    return this.obsoleteInput;
  }
  async setOrderMultiplerInput(orderMultipler) {
    await this.orderMultiplerInput.sendKeys(orderMultipler);
  }

  async getOrderMultiplerInput() {
    return this.orderMultiplerInput.getAttribute('value');
  }

  async bomSelectLastOption() {
    await this.bomSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async bomSelectOption(option) {
    await this.bomSelect.sendKeys(option);
  }

  getBomSelect() {
    return this.bomSelect;
  }

  async getBomSelectedOption() {
    return this.bomSelect.element(by.css('option:checked')).getText();
  }

  async routingsSelectLastOption() {
    await this.routingsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async routingsSelectOption(option) {
    await this.routingsSelect.sendKeys(option);
  }

  getRoutingsSelect() {
    return this.routingsSelect;
  }

  async getRoutingsSelectedOption() {
    return this.routingsSelect.element(by.css('option:checked')).getText();
  }

  async salesOrderSelectLastOption() {
    await this.salesOrderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async salesOrderSelectOption(option) {
    await this.salesOrderSelect.sendKeys(option);
  }

  getSalesOrderSelect() {
    return this.salesOrderSelect;
  }

  async getSalesOrderSelectedOption() {
    return this.salesOrderSelect.element(by.css('option:checked')).getText();
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
