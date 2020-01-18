import { element, by, ElementFinder } from 'protractor';

export default class NonConformanceTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.nonConformanceType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  rejectionCodeInput: ElementFinder = element(by.css('input#non-conformance-type-rejectionCode'));
  rejectionTitleInput: ElementFinder = element(by.css('input#non-conformance-type-rejectionTitle'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRejectionCodeInput(rejectionCode) {
    await this.rejectionCodeInput.sendKeys(rejectionCode);
  }

  async getRejectionCodeInput() {
    return this.rejectionCodeInput.getAttribute('value');
  }

  async setRejectionTitleInput(rejectionTitle) {
    await this.rejectionTitleInput.sendKeys(rejectionTitle);
  }

  async getRejectionTitleInput() {
    return this.rejectionTitleInput.getAttribute('value');
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
