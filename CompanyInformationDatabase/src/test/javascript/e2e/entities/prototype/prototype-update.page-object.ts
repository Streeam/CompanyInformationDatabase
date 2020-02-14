import { element, by, ElementFinder } from 'protractor';

export default class PrototypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.prototype.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusSelect: ElementFinder = element(by.css('select#prototype-status'));
  deadlineInput: ElementFinder = element(by.css('input#prototype-deadline'));
  prioritySelect: ElementFinder = element(by.css('select#prototype-priority'));
  proposedDateInput: ElementFinder = element(by.css('input#prototype-proposedDate'));
  progressInput: ElementFinder = element(by.css('input#prototype-progress'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setDeadlineInput(deadline) {
    await this.deadlineInput.sendKeys(deadline);
  }

  async getDeadlineInput() {
    return this.deadlineInput.getAttribute('value');
  }

  async setPrioritySelect(priority) {
    await this.prioritySelect.sendKeys(priority);
  }

  async getPrioritySelect() {
    return this.prioritySelect.element(by.css('option:checked')).getText();
  }

  async prioritySelectLastOption() {
    await this.prioritySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setProposedDateInput(proposedDate) {
    await this.proposedDateInput.sendKeys(proposedDate);
  }

  async getProposedDateInput() {
    return this.proposedDateInput.getAttribute('value');
  }

  async setProgressInput(progress) {
    await this.progressInput.sendKeys(progress);
  }

  async getProgressInput() {
    return this.progressInput.getAttribute('value');
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
