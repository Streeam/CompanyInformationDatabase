import { element, by, ElementFinder } from 'protractor';

export default class NotificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.notification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  commentInput: ElementFinder = element(by.css('input#notification-comment'));
  readInput: ElementFinder = element(by.css('input#notification-read'));
  formatSelect: ElementFinder = element(by.css('select#notification-format'));
  referencedEmployeeInput: ElementFinder = element(by.css('input#notification-referencedEmployee'));
  sentDateInput: ElementFinder = element(by.css('input#notification-sentDate'));
  employeeIdInput: ElementFinder = element(by.css('input#notification-employeeId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return this.commentInput.getAttribute('value');
  }

  getReadInput() {
    return this.readInput;
  }
  async setFormatSelect(format) {
    await this.formatSelect.sendKeys(format);
  }

  async getFormatSelect() {
    return this.formatSelect.element(by.css('option:checked')).getText();
  }

  async formatSelectLastOption() {
    await this.formatSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setReferencedEmployeeInput(referencedEmployee) {
    await this.referencedEmployeeInput.sendKeys(referencedEmployee);
  }

  async getReferencedEmployeeInput() {
    return this.referencedEmployeeInput.getAttribute('value');
  }

  async setSentDateInput(sentDate) {
    await this.sentDateInput.sendKeys(sentDate);
  }

  async getSentDateInput() {
    return this.sentDateInput.getAttribute('value');
  }

  async setEmployeeIdInput(employeeId) {
    await this.employeeIdInput.sendKeys(employeeId);
  }

  async getEmployeeIdInput() {
    return this.employeeIdInput.getAttribute('value');
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
