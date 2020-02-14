import { element, by, ElementFinder } from 'protractor';

export default class TaskUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.task.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  taskDescriptionInput: ElementFinder = element(by.css('input#task-taskDescription'));
  startDateInput: ElementFinder = element(by.css('input#task-startDate'));
  endDateInput: ElementFinder = element(by.css('input#task-endDate'));
  progressInput: ElementFinder = element(by.css('input#task-progress'));
  statusSelect: ElementFinder = element(by.css('select#task-status'));
  prioritySelect: ElementFinder = element(by.css('select#task-priority'));
  nonconformanceIdInput: ElementFinder = element(by.css('input#task-nonconformanceId'));
  employeeIdInput: ElementFinder = element(by.css('input#task-employeeId'));
  amendmentSelect: ElementFinder = element(by.css('select#task-amendment'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTaskDescriptionInput(taskDescription) {
    await this.taskDescriptionInput.sendKeys(taskDescription);
  }

  async getTaskDescriptionInput() {
    return this.taskDescriptionInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  async setProgressInput(progress) {
    await this.progressInput.sendKeys(progress);
  }

  async getProgressInput() {
    return this.progressInput.getAttribute('value');
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
  async setNonconformanceIdInput(nonconformanceId) {
    await this.nonconformanceIdInput.sendKeys(nonconformanceId);
  }

  async getNonconformanceIdInput() {
    return this.nonconformanceIdInput.getAttribute('value');
  }

  async setEmployeeIdInput(employeeId) {
    await this.employeeIdInput.sendKeys(employeeId);
  }

  async getEmployeeIdInput() {
    return this.employeeIdInput.getAttribute('value');
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
