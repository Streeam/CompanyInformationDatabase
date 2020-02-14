import { element, by, ElementFinder } from 'protractor';

export default class AfterSaleExpensesUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.afterSaleExpenses.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#after-sale-expenses-date'));
  descriptionInput: ElementFinder = element(by.css('input#after-sale-expenses-description'));
  costInput: ElementFinder = element(by.css('input#after-sale-expenses-cost'));
  employeeIdInput: ElementFinder = element(by.css('input#after-sale-expenses-employeeId'));
  customerNonConformanceIdInput: ElementFinder = element(by.css('input#after-sale-expenses-customerNonConformanceId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setCostInput(cost) {
    await this.costInput.sendKeys(cost);
  }

  async getCostInput() {
    return this.costInput.getAttribute('value');
  }

  async setEmployeeIdInput(employeeId) {
    await this.employeeIdInput.sendKeys(employeeId);
  }

  async getEmployeeIdInput() {
    return this.employeeIdInput.getAttribute('value');
  }

  async setCustomerNonConformanceIdInput(customerNonConformanceId) {
    await this.customerNonConformanceIdInput.sendKeys(customerNonConformanceId);
  }

  async getCustomerNonConformanceIdInput() {
    return this.customerNonConformanceIdInput.getAttribute('value');
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
