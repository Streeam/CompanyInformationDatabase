import { element, by, ElementFinder } from 'protractor';

export default class ExtraBomsUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.extraBoms.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  partNumberInput: ElementFinder = element(by.css('input#extra-boms-partNumber'));
  partDescriptionInput: ElementFinder = element(by.css('input#extra-boms-partDescription'));
  priceInput: ElementFinder = element(by.css('input#extra-boms-price'));
  quantityInput: ElementFinder = element(by.css('input#extra-boms-quantity'));
  nonconformanceTypeSelect: ElementFinder = element(by.css('select#extra-boms-nonconformanceType'));
  nonconformanceActionSelect: ElementFinder = element(by.css('select#extra-boms-nonconformanceAction'));
  internalNonconformanceIdInput: ElementFinder = element(by.css('input#extra-boms-internalNonconformanceId'));
  customerNonConformaceIdInput: ElementFinder = element(by.css('input#extra-boms-customerNonConformaceId'));

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

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setNonconformanceTypeSelect(nonconformanceType) {
    await this.nonconformanceTypeSelect.sendKeys(nonconformanceType);
  }

  async getNonconformanceTypeSelect() {
    return this.nonconformanceTypeSelect.element(by.css('option:checked')).getText();
  }

  async nonconformanceTypeSelectLastOption() {
    await this.nonconformanceTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setNonconformanceActionSelect(nonconformanceAction) {
    await this.nonconformanceActionSelect.sendKeys(nonconformanceAction);
  }

  async getNonconformanceActionSelect() {
    return this.nonconformanceActionSelect.element(by.css('option:checked')).getText();
  }

  async nonconformanceActionSelectLastOption() {
    await this.nonconformanceActionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setInternalNonconformanceIdInput(internalNonconformanceId) {
    await this.internalNonconformanceIdInput.sendKeys(internalNonconformanceId);
  }

  async getInternalNonconformanceIdInput() {
    return this.internalNonconformanceIdInput.getAttribute('value');
  }

  async setCustomerNonConformaceIdInput(customerNonConformaceId) {
    await this.customerNonConformaceIdInput.sendKeys(customerNonConformaceId);
  }

  async getCustomerNonConformaceIdInput() {
    return this.customerNonConformaceIdInput.getAttribute('value');
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
