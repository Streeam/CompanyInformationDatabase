import { element, by, ElementFinder } from 'protractor';

export default class ProcessAuditChecklistUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.processAuditChecklist.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  auditQuestionInput: ElementFinder = element(by.css('input#process-audit-checklist-auditQuestion'));
  compliantInput: ElementFinder = element(by.css('input#process-audit-checklist-compliant'));
  ofiInput: ElementFinder = element(by.css('input#process-audit-checklist-ofi'));
  minorNCInput: ElementFinder = element(by.css('input#process-audit-checklist-minorNC'));
  majorNCInput: ElementFinder = element(by.css('input#process-audit-checklist-majorNC'));
  auditAnswerInput: ElementFinder = element(by.css('input#process-audit-checklist-auditAnswer'));
  opportunitiesForImprovementInput: ElementFinder = element(by.css('input#process-audit-checklist-opportunitiesForImprovement'));
  nonConformanceIdInput: ElementFinder = element(by.css('input#process-audit-checklist-nonConformanceId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAuditQuestionInput(auditQuestion) {
    await this.auditQuestionInput.sendKeys(auditQuestion);
  }

  async getAuditQuestionInput() {
    return this.auditQuestionInput.getAttribute('value');
  }

  getCompliantInput() {
    return this.compliantInput;
  }
  getOfiInput() {
    return this.ofiInput;
  }
  getMinorNCInput() {
    return this.minorNCInput;
  }
  getMajorNCInput() {
    return this.majorNCInput;
  }
  async setAuditAnswerInput(auditAnswer) {
    await this.auditAnswerInput.sendKeys(auditAnswer);
  }

  async getAuditAnswerInput() {
    return this.auditAnswerInput.getAttribute('value');
  }

  async setOpportunitiesForImprovementInput(opportunitiesForImprovement) {
    await this.opportunitiesForImprovementInput.sendKeys(opportunitiesForImprovement);
  }

  async getOpportunitiesForImprovementInput() {
    return this.opportunitiesForImprovementInput.getAttribute('value');
  }

  async setNonConformanceIdInput(nonConformanceId) {
    await this.nonConformanceIdInput.sendKeys(nonConformanceId);
  }

  async getNonConformanceIdInput() {
    return this.nonConformanceIdInput.getAttribute('value');
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
