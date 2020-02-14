import { element, by, ElementFinder } from 'protractor';

export default class SupplierUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.supplier.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  supplierCodeInput: ElementFinder = element(by.css('input#supplier-supplierCode'));
  supplierNameInput: ElementFinder = element(by.css('input#supplier-supplierName'));
  supplierStatusInput: ElementFinder = element(by.css('input#supplier-supplierStatus'));
  emailInput: ElementFinder = element(by.css('input#supplier-email'));
  phoneInput: ElementFinder = element(by.css('input#supplier-phone'));
  addressLine1Input: ElementFinder = element(by.css('input#supplier-addressLine1'));
  addressLine2Input: ElementFinder = element(by.css('input#supplier-addressLine2'));
  cityInput: ElementFinder = element(by.css('input#supplier-city'));
  countryInput: ElementFinder = element(by.css('input#supplier-country'));
  companySelect: ElementFinder = element(by.css('select#supplier-company'));
  productsSelect: ElementFinder = element(by.css('select#supplier-products'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSupplierCodeInput(supplierCode) {
    await this.supplierCodeInput.sendKeys(supplierCode);
  }

  async getSupplierCodeInput() {
    return this.supplierCodeInput.getAttribute('value');
  }

  async setSupplierNameInput(supplierName) {
    await this.supplierNameInput.sendKeys(supplierName);
  }

  async getSupplierNameInput() {
    return this.supplierNameInput.getAttribute('value');
  }

  async setSupplierStatusInput(supplierStatus) {
    await this.supplierStatusInput.sendKeys(supplierStatus);
  }

  async getSupplierStatusInput() {
    return this.supplierStatusInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setAddressLine1Input(addressLine1) {
    await this.addressLine1Input.sendKeys(addressLine1);
  }

  async getAddressLine1Input() {
    return this.addressLine1Input.getAttribute('value');
  }

  async setAddressLine2Input(addressLine2) {
    await this.addressLine2Input.sendKeys(addressLine2);
  }

  async getAddressLine2Input() {
    return this.addressLine2Input.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async companySelectLastOption() {
    await this.companySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async companySelectOption(option) {
    await this.companySelect.sendKeys(option);
  }

  getCompanySelect() {
    return this.companySelect;
  }

  async getCompanySelectedOption() {
    return this.companySelect.element(by.css('option:checked')).getText();
  }

  async productsSelectLastOption() {
    await this.productsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productsSelectOption(option) {
    await this.productsSelect.sendKeys(option);
  }

  getProductsSelect() {
    return this.productsSelect;
  }

  async getProductsSelectedOption() {
    return this.productsSelect.element(by.css('option:checked')).getText();
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
