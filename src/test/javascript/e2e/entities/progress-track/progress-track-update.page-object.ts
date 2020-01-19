import { element, by, ElementFinder } from 'protractor';

export default class ProgressTrackUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.progressTrack.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  progressDescriptionInput: ElementFinder = element(by.css('textarea#progress-track-progressDescription'));
  completeInput: ElementFinder = element(by.css('input#progress-track-complete'));
  dateInput: ElementFinder = element(by.css('input#progress-track-date'));
  taskSelect: ElementFinder = element(by.css('select#progress-track-task'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setProgressDescriptionInput(progressDescription) {
    await this.progressDescriptionInput.sendKeys(progressDescription);
  }

  async getProgressDescriptionInput() {
    return this.progressDescriptionInput.getAttribute('value');
  }

  getCompleteInput() {
    return this.completeInput;
  }
  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async taskSelectLastOption() {
    await this.taskSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async taskSelectOption(option) {
    await this.taskSelect.sendKeys(option);
  }

  getTaskSelect() {
    return this.taskSelect;
  }

  async getTaskSelectedOption() {
    return this.taskSelect.element(by.css('option:checked')).getText();
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
