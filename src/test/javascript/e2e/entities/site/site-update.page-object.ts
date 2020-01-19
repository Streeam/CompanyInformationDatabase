import { element, by, ElementFinder } from 'protractor';

export default class SiteUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.site.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  siteInput: ElementFinder = element(by.css('input#site-site'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSiteInput(site) {
    await this.siteInput.sendKeys(site);
  }

  async getSiteInput() {
    return this.siteInput.getAttribute('value');
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
