import { element, by, ElementFinder } from 'protractor';

export default class RoutingUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.routing.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  resourceNameInput: ElementFinder = element(by.css('input#routing-resourceName'));
  resourceTypeInput: ElementFinder = element(by.css('input#routing-resourceType'));
  unitRunTimeInput: ElementFinder = element(by.css('input#routing-unitRunTime'));
  partNumberInput: ElementFinder = element(by.css('input#routing-partNumber'));
  layoutTimeInput: ElementFinder = element(by.css('input#routing-layoutTime'));
  uniqueIdentifierInput: ElementFinder = element(by.css('input#routing-uniqueIdentifier'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setResourceNameInput(resourceName) {
    await this.resourceNameInput.sendKeys(resourceName);
  }

  async getResourceNameInput() {
    return this.resourceNameInput.getAttribute('value');
  }

  async setResourceTypeInput(resourceType) {
    await this.resourceTypeInput.sendKeys(resourceType);
  }

  async getResourceTypeInput() {
    return this.resourceTypeInput.getAttribute('value');
  }

  async setUnitRunTimeInput(unitRunTime) {
    await this.unitRunTimeInput.sendKeys(unitRunTime);
  }

  async getUnitRunTimeInput() {
    return this.unitRunTimeInput.getAttribute('value');
  }

  async setPartNumberInput(partNumber) {
    await this.partNumberInput.sendKeys(partNumber);
  }

  async getPartNumberInput() {
    return this.partNumberInput.getAttribute('value');
  }

  async setLayoutTimeInput(layoutTime) {
    await this.layoutTimeInput.sendKeys(layoutTime);
  }

  async getLayoutTimeInput() {
    return this.layoutTimeInput.getAttribute('value');
  }

  async setUniqueIdentifierInput(uniqueIdentifier) {
    await this.uniqueIdentifierInput.sendKeys(uniqueIdentifier);
  }

  async getUniqueIdentifierInput() {
    return this.uniqueIdentifierInput.getAttribute('value');
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
