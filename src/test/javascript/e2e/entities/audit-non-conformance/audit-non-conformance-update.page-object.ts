import { element, by, ElementFinder } from 'protractor';

export default class AuditNonConformanceUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.auditNonConformance.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  auditNonConformanceFirstTypeSelect: ElementFinder = element(by.css('select#audit-non-conformance-auditNonConformanceFirstType'));
  auditNonConformanceSecondTypeSelect: ElementFinder = element(by.css('select#audit-non-conformance-auditNonConformanceSecondType'));
  employeeSelect: ElementFinder = element(by.css('select#audit-non-conformance-employee'));
  nonConformanceDetailsSelect: ElementFinder = element(by.css('select#audit-non-conformance-nonConformanceDetails'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAuditNonConformanceFirstTypeSelect(auditNonConformanceFirstType) {
    await this.auditNonConformanceFirstTypeSelect.sendKeys(auditNonConformanceFirstType);
  }

  async getAuditNonConformanceFirstTypeSelect() {
    return this.auditNonConformanceFirstTypeSelect.element(by.css('option:checked')).getText();
  }

  async auditNonConformanceFirstTypeSelectLastOption() {
    await this.auditNonConformanceFirstTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setAuditNonConformanceSecondTypeSelect(auditNonConformanceSecondType) {
    await this.auditNonConformanceSecondTypeSelect.sendKeys(auditNonConformanceSecondType);
  }

  async getAuditNonConformanceSecondTypeSelect() {
    return this.auditNonConformanceSecondTypeSelect.element(by.css('option:checked')).getText();
  }

  async auditNonConformanceSecondTypeSelectLastOption() {
    await this.auditNonConformanceSecondTypeSelect
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
