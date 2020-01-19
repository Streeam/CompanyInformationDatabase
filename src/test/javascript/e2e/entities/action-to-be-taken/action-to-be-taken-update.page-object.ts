import { element, by, ElementFinder } from 'protractor';

export default class ActionToBeTakenUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.actionToBeTaken.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  why1OccurranceInput: ElementFinder = element(by.css('input#action-to-be-taken-why1Occurrance'));
  why2OccurranceInput: ElementFinder = element(by.css('input#action-to-be-taken-why2Occurrance'));
  why3OccurranceInput: ElementFinder = element(by.css('input#action-to-be-taken-why3Occurrance'));
  why4OccurranceInput: ElementFinder = element(by.css('input#action-to-be-taken-why4Occurrance'));
  why5OccurranceInput: ElementFinder = element(by.css('input#action-to-be-taken-why5Occurrance'));
  why1DetectionInput: ElementFinder = element(by.css('input#action-to-be-taken-why1Detection'));
  why2DetectionInput: ElementFinder = element(by.css('input#action-to-be-taken-why2Detection'));
  why3DetactionInput: ElementFinder = element(by.css('input#action-to-be-taken-why3Detaction'));
  why4DetectionInput: ElementFinder = element(by.css('input#action-to-be-taken-why4Detection'));
  why5DetectionInput: ElementFinder = element(by.css('input#action-to-be-taken-why5Detection'));
  rootCauseInput: ElementFinder = element(by.css('input#action-to-be-taken-rootCause'));
  problemInput: ElementFinder = element(by.css('input#action-to-be-taken-problem'));
  nonconformanceIdInput: ElementFinder = element(by.css('input#action-to-be-taken-nonconformanceId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWhy1OccurranceInput(why1Occurrance) {
    await this.why1OccurranceInput.sendKeys(why1Occurrance);
  }

  async getWhy1OccurranceInput() {
    return this.why1OccurranceInput.getAttribute('value');
  }

  async setWhy2OccurranceInput(why2Occurrance) {
    await this.why2OccurranceInput.sendKeys(why2Occurrance);
  }

  async getWhy2OccurranceInput() {
    return this.why2OccurranceInput.getAttribute('value');
  }

  async setWhy3OccurranceInput(why3Occurrance) {
    await this.why3OccurranceInput.sendKeys(why3Occurrance);
  }

  async getWhy3OccurranceInput() {
    return this.why3OccurranceInput.getAttribute('value');
  }

  async setWhy4OccurranceInput(why4Occurrance) {
    await this.why4OccurranceInput.sendKeys(why4Occurrance);
  }

  async getWhy4OccurranceInput() {
    return this.why4OccurranceInput.getAttribute('value');
  }

  async setWhy5OccurranceInput(why5Occurrance) {
    await this.why5OccurranceInput.sendKeys(why5Occurrance);
  }

  async getWhy5OccurranceInput() {
    return this.why5OccurranceInput.getAttribute('value');
  }

  async setWhy1DetectionInput(why1Detection) {
    await this.why1DetectionInput.sendKeys(why1Detection);
  }

  async getWhy1DetectionInput() {
    return this.why1DetectionInput.getAttribute('value');
  }

  async setWhy2DetectionInput(why2Detection) {
    await this.why2DetectionInput.sendKeys(why2Detection);
  }

  async getWhy2DetectionInput() {
    return this.why2DetectionInput.getAttribute('value');
  }

  async setWhy3DetactionInput(why3Detaction) {
    await this.why3DetactionInput.sendKeys(why3Detaction);
  }

  async getWhy3DetactionInput() {
    return this.why3DetactionInput.getAttribute('value');
  }

  async setWhy4DetectionInput(why4Detection) {
    await this.why4DetectionInput.sendKeys(why4Detection);
  }

  async getWhy4DetectionInput() {
    return this.why4DetectionInput.getAttribute('value');
  }

  async setWhy5DetectionInput(why5Detection) {
    await this.why5DetectionInput.sendKeys(why5Detection);
  }

  async getWhy5DetectionInput() {
    return this.why5DetectionInput.getAttribute('value');
  }

  async setRootCauseInput(rootCause) {
    await this.rootCauseInput.sendKeys(rootCause);
  }

  async getRootCauseInput() {
    return this.rootCauseInput.getAttribute('value');
  }

  async setProblemInput(problem) {
    await this.problemInput.sendKeys(problem);
  }

  async getProblemInput() {
    return this.problemInput.getAttribute('value');
  }

  async setNonconformanceIdInput(nonconformanceId) {
    await this.nonconformanceIdInput.sendKeys(nonconformanceId);
  }

  async getNonconformanceIdInput() {
    return this.nonconformanceIdInput.getAttribute('value');
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
