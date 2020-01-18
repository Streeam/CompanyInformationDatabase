import { element, by, ElementFinder } from 'protractor';

export default class ClientNonConformanceUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.clientNonConformance.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nonConformanceTypeSelect: ElementFinder = element(by.css('select#client-non-conformance-nonConformanceType'));
  statusSelect: ElementFinder = element(by.css('select#client-non-conformance-status'));
  nonconformanceDetailsIdInput: ElementFinder = element(by.css('input#client-non-conformance-nonconformanceDetailsId'));
  rejectionReasonDetailsInput: ElementFinder = element(by.css('input#client-non-conformance-rejectionReasonDetails'));
  actionToBeTakenDetailsInput: ElementFinder = element(by.css('input#client-non-conformance-actionToBeTakenDetails'));
  shortTermDetailsInput: ElementFinder = element(by.css('input#client-non-conformance-shortTermDetails'));
  longTermDetailsInput: ElementFinder = element(by.css('input#client-non-conformance-longTermDetails'));
  currentDateInput: ElementFinder = element(by.css('input#client-non-conformance-currentDate'));
  rejectionDateInput: ElementFinder = element(by.css('input#client-non-conformance-rejectionDate'));
  underWarrantyInput: ElementFinder = element(by.css('input#client-non-conformance-underWarranty'));
  quantityInput: ElementFinder = element(by.css('input#client-non-conformance-quantity'));
  labourRateInput: ElementFinder = element(by.css('input#client-non-conformance-labourRate'));
  customerSelect: ElementFinder = element(by.css('select#client-non-conformance-customer'));
  culpableEmployeesSelect: ElementFinder = element(by.css('select#client-non-conformance-culpableEmployees'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNonConformanceTypeSelect(nonConformanceType) {
    await this.nonConformanceTypeSelect.sendKeys(nonConformanceType);
  }

  async getNonConformanceTypeSelect() {
    return this.nonConformanceTypeSelect.element(by.css('option:checked')).getText();
  }

  async nonConformanceTypeSelectLastOption() {
    await this.nonConformanceTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
  async setNonconformanceDetailsIdInput(nonconformanceDetailsId) {
    await this.nonconformanceDetailsIdInput.sendKeys(nonconformanceDetailsId);
  }

  async getNonconformanceDetailsIdInput() {
    return this.nonconformanceDetailsIdInput.getAttribute('value');
  }

  async setRejectionReasonDetailsInput(rejectionReasonDetails) {
    await this.rejectionReasonDetailsInput.sendKeys(rejectionReasonDetails);
  }

  async getRejectionReasonDetailsInput() {
    return this.rejectionReasonDetailsInput.getAttribute('value');
  }

  async setActionToBeTakenDetailsInput(actionToBeTakenDetails) {
    await this.actionToBeTakenDetailsInput.sendKeys(actionToBeTakenDetails);
  }

  async getActionToBeTakenDetailsInput() {
    return this.actionToBeTakenDetailsInput.getAttribute('value');
  }

  async setShortTermDetailsInput(shortTermDetails) {
    await this.shortTermDetailsInput.sendKeys(shortTermDetails);
  }

  async getShortTermDetailsInput() {
    return this.shortTermDetailsInput.getAttribute('value');
  }

  async setLongTermDetailsInput(longTermDetails) {
    await this.longTermDetailsInput.sendKeys(longTermDetails);
  }

  async getLongTermDetailsInput() {
    return this.longTermDetailsInput.getAttribute('value');
  }

  async setCurrentDateInput(currentDate) {
    await this.currentDateInput.sendKeys(currentDate);
  }

  async getCurrentDateInput() {
    return this.currentDateInput.getAttribute('value');
  }

  async setRejectionDateInput(rejectionDate) {
    await this.rejectionDateInput.sendKeys(rejectionDate);
  }

  async getRejectionDateInput() {
    return this.rejectionDateInput.getAttribute('value');
  }

  getUnderWarrantyInput() {
    return this.underWarrantyInput;
  }
  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setLabourRateInput(labourRate) {
    await this.labourRateInput.sendKeys(labourRate);
  }

  async getLabourRateInput() {
    return this.labourRateInput.getAttribute('value');
  }

  async customerSelectLastOption() {
    await this.customerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async customerSelectOption(option) {
    await this.customerSelect.sendKeys(option);
  }

  getCustomerSelect() {
    return this.customerSelect;
  }

  async getCustomerSelectedOption() {
    return this.customerSelect.element(by.css('option:checked')).getText();
  }

  async culpableEmployeesSelectLastOption() {
    await this.culpableEmployeesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async culpableEmployeesSelectOption(option) {
    await this.culpableEmployeesSelect.sendKeys(option);
  }

  getCulpableEmployeesSelect() {
    return this.culpableEmployeesSelect;
  }

  async getCulpableEmployeesSelectedOption() {
    return this.culpableEmployeesSelect.element(by.css('option:checked')).getText();
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
