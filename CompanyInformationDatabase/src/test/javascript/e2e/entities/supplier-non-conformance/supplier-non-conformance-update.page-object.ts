import { element, by, ElementFinder } from 'protractor';

export default class SupplierNonConformanceUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.supplierNonConformance.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  actionSelect: ElementFinder = element(by.css('select#supplier-non-conformance-action'));
  labourInput: ElementFinder = element(by.css('input#supplier-non-conformance-labour'));
  concesionDetailsInput: ElementFinder = element(by.css('input#supplier-non-conformance-concesionDetails'));
  rejectionFeeInput: ElementFinder = element(by.css('input#supplier-non-conformance-rejectionFee'));
  nonConformanceTypeSelect: ElementFinder = element(by.css('select#supplier-non-conformance-nonConformanceType'));
  employeeSelect: ElementFinder = element(by.css('select#supplier-non-conformance-employee'));
  supplierSelect: ElementFinder = element(by.css('select#supplier-non-conformance-supplier'));
  nonConformanceDetailsSelect: ElementFinder = element(by.css('select#supplier-non-conformance-nonConformanceDetails'));

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
  async setLabourInput(labour) {
    await this.labourInput.sendKeys(labour);
  }

  async getLabourInput() {
    return this.labourInput.getAttribute('value');
  }

  async setConcesionDetailsInput(concesionDetails) {
    await this.concesionDetailsInput.sendKeys(concesionDetails);
  }

  async getConcesionDetailsInput() {
    return this.concesionDetailsInput.getAttribute('value');
  }

  async setRejectionFeeInput(rejectionFee) {
    await this.rejectionFeeInput.sendKeys(rejectionFee);
  }

  async getRejectionFeeInput() {
    return this.rejectionFeeInput.getAttribute('value');
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

  async supplierSelectLastOption() {
    await this.supplierSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async supplierSelectOption(option) {
    await this.supplierSelect.sendKeys(option);
  }

  getSupplierSelect() {
    return this.supplierSelect;
  }

  async getSupplierSelectedOption() {
    return this.supplierSelect.element(by.css('option:checked')).getText();
  }

  async nonConformanceDetailsSelectLastOption() {
    await this.nonConformanceDetailsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nonConformanceDetailsSelectOption(option) {
    await this.nonConformanceDetailsSelect.sendKeys(option);
  }

  getNonConformanceDetailsSelect() {
    return this.nonConformanceDetailsSelect;
  }

  async getNonConformanceDetailsSelectedOption() {
    return this.nonConformanceDetailsSelect.element(by.css('option:checked')).getText();
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
