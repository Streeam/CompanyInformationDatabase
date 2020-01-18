import { element, by, ElementFinder } from 'protractor';

export default class AmendmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.amendment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusSelect: ElementFinder = element(by.css('select#amendment-status'));
  deadlineInput: ElementFinder = element(by.css('input#amendment-deadline'));
  prioritySelect: ElementFinder = element(by.css('select#amendment-priority'));
  proposedDateInput: ElementFinder = element(by.css('input#amendment-proposedDate'));
  currentConditionInput: ElementFinder = element(by.css('input#amendment-currentCondition'));
  proposeAmendmentInput: ElementFinder = element(by.css('input#amendment-proposeAmendment'));
  reasonForChangeInput: ElementFinder = element(by.css('input#amendment-reasonForChange'));
  rejectionReasonInput: ElementFinder = element(by.css('input#amendment-rejectionReason'));
  progressInput: ElementFinder = element(by.css('input#amendment-progress'));
  employeeSelect: ElementFinder = element(by.css('select#amendment-employee'));

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

  async setCurrentConditionInput(currentCondition) {
    await this.currentConditionInput.sendKeys(currentCondition);
  }

  async getCurrentConditionInput() {
    return this.currentConditionInput.getAttribute('value');
  }

  async setProposeAmendmentInput(proposeAmendment) {
    await this.proposeAmendmentInput.sendKeys(proposeAmendment);
  }

  async getProposeAmendmentInput() {
    return this.proposeAmendmentInput.getAttribute('value');
  }

  async setReasonForChangeInput(reasonForChange) {
    await this.reasonForChangeInput.sendKeys(reasonForChange);
  }

  async getReasonForChangeInput() {
    return this.reasonForChangeInput.getAttribute('value');
  }

  async setRejectionReasonInput(rejectionReason) {
    await this.rejectionReasonInput.sendKeys(rejectionReason);
  }

  async getRejectionReasonInput() {
    return this.rejectionReasonInput.getAttribute('value');
  }

  async setProgressInput(progress) {
    await this.progressInput.sendKeys(progress);
  }

  async getProgressInput() {
    return this.progressInput.getAttribute('value');
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
