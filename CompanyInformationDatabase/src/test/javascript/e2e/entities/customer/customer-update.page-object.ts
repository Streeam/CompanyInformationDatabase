import { element, by, ElementFinder } from 'protractor';

export default class CustomerUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.customer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  customerCodeInput: ElementFinder = element(by.css('input#customer-customerCode'));
  customerNameInput: ElementFinder = element(by.css('input#customer-customerName'));
  customerStatusInput: ElementFinder = element(by.css('input#customer-customerStatus'));
  countryInput: ElementFinder = element(by.css('input#customer-country'));
  customerCurencyInput: ElementFinder = element(by.css('input#customer-customerCurency'));
  addressInput: ElementFinder = element(by.css('input#customer-address'));
  websiteInput: ElementFinder = element(by.css('input#customer-website'));
  emailInput: ElementFinder = element(by.css('input#customer-email'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCustomerCodeInput(customerCode) {
    await this.customerCodeInput.sendKeys(customerCode);
  }

  async getCustomerCodeInput() {
    return this.customerCodeInput.getAttribute('value');
  }

  async setCustomerNameInput(customerName) {
    await this.customerNameInput.sendKeys(customerName);
  }

  async getCustomerNameInput() {
    return this.customerNameInput.getAttribute('value');
  }

  async setCustomerStatusInput(customerStatus) {
    await this.customerStatusInput.sendKeys(customerStatus);
  }

  async getCustomerStatusInput() {
    return this.customerStatusInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async setCustomerCurencyInput(customerCurency) {
    await this.customerCurencyInput.sendKeys(customerCurency);
  }

  async getCustomerCurencyInput() {
    return this.customerCurencyInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setWebsiteInput(website) {
    await this.websiteInput.sendKeys(website);
  }

  async getWebsiteInput() {
    return this.websiteInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
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
