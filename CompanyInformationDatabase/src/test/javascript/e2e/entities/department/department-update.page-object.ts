import { element, by, ElementFinder } from 'protractor';

export default class DepartmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.department.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  departmentInput: ElementFinder = element(by.css('input#department-department'));
  siteSelect: ElementFinder = element(by.css('select#department-site'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDepartmentInput(department) {
    await this.departmentInput.sendKeys(department);
  }

  async getDepartmentInput() {
    return this.departmentInput.getAttribute('value');
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
