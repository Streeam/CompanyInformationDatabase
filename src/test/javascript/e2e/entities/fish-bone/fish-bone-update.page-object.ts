import { element, by, ElementFinder } from 'protractor';

export default class FishBoneUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.fishBone.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fishboneTypesSelect: ElementFinder = element(by.css('select#fish-bone-fishboneTypes'));
  subCategoryInput: ElementFinder = element(by.css('input#fish-bone-subCategory'));
  rootCauseIdInput: ElementFinder = element(by.css('input#fish-bone-rootCauseId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFishboneTypesSelect(fishboneTypes) {
    await this.fishboneTypesSelect.sendKeys(fishboneTypes);
  }

  async getFishboneTypesSelect() {
    return this.fishboneTypesSelect.element(by.css('option:checked')).getText();
  }

  async fishboneTypesSelectLastOption() {
    await this.fishboneTypesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setSubCategoryInput(subCategory) {
    await this.subCategoryInput.sendKeys(subCategory);
  }

  async getSubCategoryInput() {
    return this.subCategoryInput.getAttribute('value');
  }

  async setRootCauseIdInput(rootCauseId) {
    await this.rootCauseIdInput.sendKeys(rootCauseId);
  }

  async getRootCauseIdInput() {
    return this.rootCauseIdInput.getAttribute('value');
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
