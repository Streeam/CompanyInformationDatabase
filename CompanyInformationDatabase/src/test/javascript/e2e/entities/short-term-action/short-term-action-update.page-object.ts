import { element, by, ElementFinder } from 'protractor';

export default class ShortTermActionUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.shortTermAction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#short-term-action-description'));
  nonConformanceIdInput: ElementFinder = element(by.css('input#short-term-action-nonConformanceId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setNonConformanceIdInput(nonConformanceId) {
    await this.nonConformanceIdInput.sendKeys(nonConformanceId);
  }

  async getNonConformanceIdInput() {
    return this.nonConformanceIdInput.getAttribute('value');
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
