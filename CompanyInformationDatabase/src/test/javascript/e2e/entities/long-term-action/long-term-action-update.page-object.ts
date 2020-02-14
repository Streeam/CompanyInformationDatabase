import { element, by, ElementFinder } from 'protractor';

export default class LongTermActionUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.longTermAction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nonConformanceIdInput: ElementFinder = element(by.css('input#long-term-action-nonConformanceId'));
  descriptionInput: ElementFinder = element(by.css('input#long-term-action-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNonConformanceIdInput(nonConformanceId) {
    await this.nonConformanceIdInput.sendKeys(nonConformanceId);
  }

  async getNonConformanceIdInput() {
    return this.nonConformanceIdInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
