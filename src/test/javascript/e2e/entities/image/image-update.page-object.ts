import { element, by, ElementFinder } from 'protractor';

export default class ImageUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.image.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlPathInput: ElementFinder = element(by.css('input#image-urlPath'));
  nameInput: ElementFinder = element(by.css('input#image-name'));
  lastModifiedDateInput: ElementFinder = element(by.css('input#image-lastModifiedDate'));
  sizeInput: ElementFinder = element(by.css('input#image-size'));
  typeInput: ElementFinder = element(by.css('input#image-type'));
  taskIdInput: ElementFinder = element(by.css('input#image-taskId'));
  nonconformanceDetailsIdInput: ElementFinder = element(by.css('input#image-nonconformanceDetailsId'));
  progressTrackIdInput: ElementFinder = element(by.css('input#image-progressTrackId'));
  productSelect: ElementFinder = element(by.css('select#image-product'));
  amendmentSelect: ElementFinder = element(by.css('select#image-amendment'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUrlPathInput(urlPath) {
    await this.urlPathInput.sendKeys(urlPath);
  }

  async getUrlPathInput() {
    return this.urlPathInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setLastModifiedDateInput(lastModifiedDate) {
    await this.lastModifiedDateInput.sendKeys(lastModifiedDate);
  }

  async getLastModifiedDateInput() {
    return this.lastModifiedDateInput.getAttribute('value');
  }

  async setSizeInput(size) {
    await this.sizeInput.sendKeys(size);
  }

  async getSizeInput() {
    return this.sizeInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setTaskIdInput(taskId) {
    await this.taskIdInput.sendKeys(taskId);
  }

  async getTaskIdInput() {
    return this.taskIdInput.getAttribute('value');
  }

  async setNonconformanceDetailsIdInput(nonconformanceDetailsId) {
    await this.nonconformanceDetailsIdInput.sendKeys(nonconformanceDetailsId);
  }

  async getNonconformanceDetailsIdInput() {
    return this.nonconformanceDetailsIdInput.getAttribute('value');
  }

  async setProgressTrackIdInput(progressTrackId) {
    await this.progressTrackIdInput.sendKeys(progressTrackId);
  }

  async getProgressTrackIdInput() {
    return this.progressTrackIdInput.getAttribute('value');
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
