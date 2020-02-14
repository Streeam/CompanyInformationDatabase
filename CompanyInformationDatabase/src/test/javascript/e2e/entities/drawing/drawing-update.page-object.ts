import { element, by, ElementFinder } from 'protractor';

export default class DrawingUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.drawing.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  drawingNumberInput: ElementFinder = element(by.css('input#drawing-drawingNumber'));
  drawingIssueInput: ElementFinder = element(by.css('input#drawing-drawingIssue'));
  urlPathInput: ElementFinder = element(by.css('input#drawing-urlPath'));
  productSelect: ElementFinder = element(by.css('select#drawing-product'));
  amendmentSelect: ElementFinder = element(by.css('select#drawing-amendment'));
  nonConformanceDetailsSelect: ElementFinder = element(by.css('select#drawing-nonConformanceDetails'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDrawingNumberInput(drawingNumber) {
    await this.drawingNumberInput.sendKeys(drawingNumber);
  }

  async getDrawingNumberInput() {
    return this.drawingNumberInput.getAttribute('value');
  }

  async setDrawingIssueInput(drawingIssue) {
    await this.drawingIssueInput.sendKeys(drawingIssue);
  }

  async getDrawingIssueInput() {
    return this.drawingIssueInput.getAttribute('value');
  }

  async setUrlPathInput(urlPath) {
    await this.urlPathInput.sendKeys(urlPath);
  }

  async getUrlPathInput() {
    return this.urlPathInput.getAttribute('value');
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

  async nonConformanceDetailsSelectLastOption() {
    await this.nonConformanceDetailsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nonConformanceDetailsSelectOption(option) {
    await this.nonConformanceDetailsSelect.sendKeys(option);
  }

  getNonConformanceDetailsSelect() {
    return this.nonConformanceDetailsSelect;
  }

  async getNonConformanceDetailsSelectedOption() {
    return this.nonConformanceDetailsSelect.element(by.css('option:checked')).getText();
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
