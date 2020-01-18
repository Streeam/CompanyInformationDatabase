import { element, by, ElementFinder } from 'protractor';

export default class ExtraRoutingsUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.extraRoutings.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  overheadInput: ElementFinder = element(by.css('input#extra-routings-overhead'));
  resourceNameInput: ElementFinder = element(by.css('input#extra-routings-resourceName'));
  runtimeInput: ElementFinder = element(by.css('input#extra-routings-runtime'));
  internalNonConformanceIdInput: ElementFinder = element(by.css('input#extra-routings-internalNonConformanceId'));
  nonconformanceTypeSelect: ElementFinder = element(by.css('select#extra-routings-nonconformanceType'));
  nonconformanceActionSelect: ElementFinder = element(by.css('select#extra-routings-nonconformanceAction'));
  customerNonConformaceIdInput: ElementFinder = element(by.css('input#extra-routings-customerNonConformaceId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setOverheadInput(overhead) {
    await this.overheadInput.sendKeys(overhead);
  }

  async getOverheadInput() {
    return this.overheadInput.getAttribute('value');
  }

  async setResourceNameInput(resourceName) {
    await this.resourceNameInput.sendKeys(resourceName);
  }

  async getResourceNameInput() {
    return this.resourceNameInput.getAttribute('value');
  }

  async setRuntimeInput(runtime) {
    await this.runtimeInput.sendKeys(runtime);
  }

  async getRuntimeInput() {
    return this.runtimeInput.getAttribute('value');
  }

  async setInternalNonConformanceIdInput(internalNonConformanceId) {
    await this.internalNonConformanceIdInput.sendKeys(internalNonConformanceId);
  }

  async getInternalNonConformanceIdInput() {
    return this.internalNonConformanceIdInput.getAttribute('value');
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
