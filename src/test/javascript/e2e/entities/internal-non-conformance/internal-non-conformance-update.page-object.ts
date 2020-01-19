import { element, by, ElementFinder } from 'protractor';

export default class InternalNonConformanceUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.internalNonConformance.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  actionSelect: ElementFinder = element(by.css('select#internal-non-conformance-action'));
  curentDateInput: ElementFinder = element(by.css('input#internal-non-conformance-curentDate'));
  rejectionDateInput: ElementFinder = element(by.css('input#internal-non-conformance-rejectionDate'));
  rejectionReasonDetailsInput: ElementFinder = element(by.css('input#internal-non-conformance-rejectionReasonDetails'));
  labourRateInput: ElementFinder = element(by.css('input#internal-non-conformance-labourRate'));
  nonconformanceDetailsIdInput: ElementFinder = element(by.css('input#internal-non-conformance-nonconformanceDetailsId'));
  statusSelect: ElementFinder = element(by.css('select#internal-non-conformance-status'));
  quantityInput: ElementFinder = element(by.css('input#internal-non-conformance-quantity'));
  employeeSelect: ElementFinder = element(by.css('select#internal-non-conformance-employee'));
  siteSelect: ElementFinder = element(by.css('select#internal-non-conformance-site'));
  departmentSelect: ElementFinder = element(by.css('select#internal-non-conformance-department'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setActionSelect(action) {
    await this.actionSelect.sendKeys(action);
  }

  async getActionSelect() {
    return this.actionSelect.element(by.css('option:checked')).getText();
  }

  async actionSelectLastOption() {
    await this.actionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setCurentDateInput(curentDate) {
    await this.curentDateInput.sendKeys(curentDate);
  }

  async getCurentDateInput() {
    return this.curentDateInput.getAttribute('value');
  }

  async setRejectionDateInput(rejectionDate) {
    await this.rejectionDateInput.sendKeys(rejectionDate);
  }

  async getRejectionDateInput() {
    return this.rejectionDateInput.getAttribute('value');
  }

  async setRejectionReasonDetailsInput(rejectionReasonDetails) {
    await this.rejectionReasonDetailsInput.sendKeys(rejectionReasonDetails);
  }

  async getRejectionReasonDetailsInput() {
    return this.rejectionReasonDetailsInput.getAttribute('value');
  }

  async setLabourRateInput(labourRate) {
    await this.labourRateInput.sendKeys(labourRate);
  }

  async getLabourRateInput() {
    return this.labourRateInput.getAttribute('value');
  }

  async setNonconformanceDetailsIdInput(nonconformanceDetailsId) {
    await this.nonconformanceDetailsIdInput.sendKeys(nonconformanceDetailsId);
  }

  async getNonconformanceDetailsIdInput() {
    return this.nonconformanceDetailsIdInput.getAttribute('value');
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
  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
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

  async siteSelectLastOption() {
    await this.siteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async siteSelectOption(option) {
    await this.siteSelect.sendKeys(option);
  }

  getSiteSelect() {
    return this.siteSelect;
  }

  async getSiteSelectedOption() {
    return this.siteSelect.element(by.css('option:checked')).getText();
  }

  async departmentSelectLastOption() {
    await this.departmentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
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
