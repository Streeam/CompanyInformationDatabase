import { element, by, ElementFinder } from 'protractor';

export default class VersionUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.version.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  versionNumberInput: ElementFinder = element(by.css('input#version-versionNumber'));
  versionStatusInput: ElementFinder = element(by.css('input#version-versionStatus'));
  issueNumberInput: ElementFinder = element(by.css('input#version-issueNumber'));
  productSelect: ElementFinder = element(by.css('select#version-product'));
  amendmentSelect: ElementFinder = element(by.css('select#version-amendment'));
  prototypeSelect: ElementFinder = element(by.css('select#version-prototype'));
  routingSelect: ElementFinder = element(by.css('select#version-routing'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setVersionNumberInput(versionNumber) {
    await this.versionNumberInput.sendKeys(versionNumber);
  }

  async getVersionNumberInput() {
    return this.versionNumberInput.getAttribute('value');
  }

  async setVersionStatusInput(versionStatus) {
    await this.versionStatusInput.sendKeys(versionStatus);
  }

  async getVersionStatusInput() {
    return this.versionStatusInput.getAttribute('value');
  }

  async setIssueNumberInput(issueNumber) {
    await this.issueNumberInput.sendKeys(issueNumber);
  }

  async getIssueNumberInput() {
    return this.issueNumberInput.getAttribute('value');
  }

  async productSelectLastOption() {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option) {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect() {
    return this.productSelect;
  }

  async getProductSelectedOption() {
    return this.productSelect.element(by.css('option:checked')).getText();
  }

  async amendmentSelectLastOption() {
    await this.amendmentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async amendmentSelectOption(option) {
    await this.amendmentSelect.sendKeys(option);
  }

  getAmendmentSelect() {
    return this.amendmentSelect;
  }

  async getAmendmentSelectedOption() {
    return this.amendmentSelect.element(by.css('option:checked')).getText();
  }

  async prototypeSelectLastOption() {
    await this.prototypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async prototypeSelectOption(option) {
    await this.prototypeSelect.sendKeys(option);
  }

  getPrototypeSelect() {
    return this.prototypeSelect;
  }

  async getPrototypeSelectedOption() {
    return this.prototypeSelect.element(by.css('option:checked')).getText();
  }

  async routingSelectLastOption() {
    await this.routingSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async routingSelectOption(option) {
    await this.routingSelect.sendKeys(option);
  }

  getRoutingSelect() {
    return this.routingSelect;
  }

  async getRoutingSelectedOption() {
    return this.routingSelect.element(by.css('option:checked')).getText();
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
