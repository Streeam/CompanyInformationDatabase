import { element, by, ElementFinder } from 'protractor';

export default class EmployeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.employee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  jobTitleInput: ElementFinder = element(by.css('input#employee-jobTitle'));
  hiredDateInput: ElementFinder = element(by.css('input#employee-hiredDate'));
  userSelect: ElementFinder = element(by.css('select#employee-user'));
  roleSelect: ElementFinder = element(by.css('select#employee-role'));
  internalNonConformanceSelect: ElementFinder = element(by.css('select#employee-internalNonConformance'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  async setJobTitleInput(jobTitle) {
    await this.jobTitleInput.sendKeys(jobTitle);
  }

  async getJobTitleInput() {
    return this.jobTitleInput.getAttribute('value');
  }

  async setHiredDateInput(hiredDate) {
    await this.hiredDateInput.sendKeys(hiredDate);
  }

  async getHiredDateInput() {
    return this.hiredDateInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async roleSelectLastOption() {
    await this.roleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async roleSelectOption(option) {
    await this.roleSelect.sendKeys(option);
  }

  getRoleSelect() {
    return this.roleSelect;
  }

  async getRoleSelectedOption() {
    return this.roleSelect.element(by.css('option:checked')).getText();
  }

  async internalNonConformanceSelectLastOption() {
    await this.internalNonConformanceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async internalNonConformanceSelectOption(option) {
    await this.internalNonConformanceSelect.sendKeys(option);
  }

  getInternalNonConformanceSelect() {
    return this.internalNonConformanceSelect;
  }

  async getInternalNonConformanceSelectedOption() {
    return this.internalNonConformanceSelect.element(by.css('option:checked')).getText();
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
