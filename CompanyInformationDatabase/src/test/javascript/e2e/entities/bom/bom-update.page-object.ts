import { element, by, ElementFinder } from 'protractor';

export default class BomUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.bom.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantityInput: ElementFinder = element(by.css('input#bom-quantity'));
  sequenceNumberInput: ElementFinder = element(by.css('input#bom-sequenceNumber'));
  partNumberInput: ElementFinder = element(by.css('input#bom-partNumber'));
  childPartNumberInput: ElementFinder = element(by.css('input#bom-childPartNumber'));
  uniqueIdentifierInput: ElementFinder = element(by.css('input#bom-uniqueIdentifier'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setSequenceNumberInput(sequenceNumber) {
    await this.sequenceNumberInput.sendKeys(sequenceNumber);
  }

  async getSequenceNumberInput() {
    return this.sequenceNumberInput.getAttribute('value');
  }

  async setPartNumberInput(partNumber) {
    await this.partNumberInput.sendKeys(partNumber);
  }

  async getPartNumberInput() {
    return this.partNumberInput.getAttribute('value');
  }

  async setChildPartNumberInput(childPartNumber) {
    await this.childPartNumberInput.sendKeys(childPartNumber);
  }

  async getChildPartNumberInput() {
    return this.childPartNumberInput.getAttribute('value');
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
