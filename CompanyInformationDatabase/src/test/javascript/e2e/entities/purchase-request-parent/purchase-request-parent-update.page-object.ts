import { element, by, ElementFinder } from 'protractor';

export default class PurchaseRequestParentUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.purchaseRequestParent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  pdfURLPathInput: ElementFinder = element(by.css('input#purchase-request-parent-pdfURLPath'));
  employeeSelect: ElementFinder = element(by.css('select#purchase-request-parent-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPdfURLPathInput(pdfURLPath) {
    await this.pdfURLPathInput.sendKeys(pdfURLPath);
  }

  async getPdfURLPathInput() {
    return this.pdfURLPathInput.getAttribute('value');
  }

  async employeeSelectLastOption() {
    await this.employeeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async employeeSelectOption(option) {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect() {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption() {
    return this.employeeSelect.element(by.css('option:checked')).getText();
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
