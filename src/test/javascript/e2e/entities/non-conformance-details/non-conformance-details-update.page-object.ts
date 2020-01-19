import { element, by, ElementFinder } from 'protractor';

export default class NonConformanceDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.nonConformanceDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  deadlineInput: ElementFinder = element(by.css('input#non-conformance-details-deadline'));
  statusSelect: ElementFinder = element(by.css('select#non-conformance-details-status'));
  progressInput: ElementFinder = element(by.css('input#non-conformance-details-progress'));
  prioritySelect: ElementFinder = element(by.css('select#non-conformance-details-priority'));
  nonconformanceSelect: ElementFinder = element(by.css('select#non-conformance-details-nonconformance'));
  currentDateInput: ElementFinder = element(by.css('input#non-conformance-details-currentDate'));
  productSelect: ElementFinder = element(by.css('select#non-conformance-details-product'));
  routingSelect: ElementFinder = element(by.css('select#non-conformance-details-routing'));
  employeeSelect: ElementFinder = element(by.css('select#non-conformance-details-employee'));
  nonConformanceTypeSelect: ElementFinder = element(by.css('select#non-conformance-details-nonConformanceType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDeadlineInput(deadline) {
    await this.deadlineInput.sendKeys(deadline);
  }

  async getDeadlineInput() {
    return this.deadlineInput.getAttribute('value');
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
  async setProgressInput(progress) {
    await this.progressInput.sendKeys(progress);
  }

  async getProgressInput() {
    return this.progressInput.getAttribute('value');
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
  async setNonconformanceSelect(nonconformance) {
    await this.nonconformanceSelect.sendKeys(nonconformance);
  }

  async getNonconformanceSelect() {
    return this.nonconformanceSelect.element(by.css('option:checked')).getText();
  }

  async nonconformanceSelectLastOption() {
    await this.nonconformanceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setCurrentDateInput(currentDate) {
    await this.currentDateInput.sendKeys(currentDate);
  }

  async getCurrentDateInput() {
    return this.currentDateInput.getAttribute('value');
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

  async routingSelectLastOption() {
    await this.routingSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async routingSelectOption(option) {
    await this.routingSelect.sendKeys(option);
  }

  getRoutingSelect() {
    return this.routingSelect;
  }

  async getRoutingSelectedOption() {
    return this.routingSelect.element(by.css('option:checked')).getText();
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

  async nonConformanceTypeSelectLastOption() {
    await this.nonConformanceTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nonConformanceTypeSelectOption(option) {
    await this.nonConformanceTypeSelect.sendKeys(option);
  }

  getNonConformanceTypeSelect() {
    return this.nonConformanceTypeSelect;
  }

  async getNonConformanceTypeSelectedOption() {
    return this.nonConformanceTypeSelect.element(by.css('option:checked')).getText();
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
