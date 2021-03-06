import { element, by, ElementFinder } from 'protractor';

export default class CompanyUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.company.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#company-name'));
  emailInput: ElementFinder = element(by.css('input#company-email'));
  phoneInput: ElementFinder = element(by.css('input#company-phone'));
  addressLine1Input: ElementFinder = element(by.css('input#company-addressLine1'));
  addressLine2Input: ElementFinder = element(by.css('input#company-addressLine2'));
  cityInput: ElementFinder = element(by.css('input#company-city'));
  countryInput: ElementFinder = element(by.css('input#company-country'));
  postcodeInput: ElementFinder = element(by.css('input#company-postcode'));
  companyLogoInput: ElementFinder = element(by.css('input#file_companyLogo'));
  overheadRateInput: ElementFinder = element(by.css('input#company-overheadRate'));
  linkedinInput: ElementFinder = element(by.css('input#company-linkedin'));
  facebookInput: ElementFinder = element(by.css('input#company-facebook'));
  twitterInput: ElementFinder = element(by.css('input#company-twitter'));
  websiteInput: ElementFinder = element(by.css('input#company-website'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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

  async setPostcodeInput(postcode) {
    await this.postcodeInput.sendKeys(postcode);
  }

  async getPostcodeInput() {
    return this.postcodeInput.getAttribute('value');
  }

  async setCompanyLogoInput(companyLogo) {
    await this.companyLogoInput.sendKeys(companyLogo);
  }

  async getCompanyLogoInput() {
    return this.companyLogoInput.getAttribute('value');
  }

  async setOverheadRateInput(overheadRate) {
    await this.overheadRateInput.sendKeys(overheadRate);
  }

  async getOverheadRateInput() {
    return this.overheadRateInput.getAttribute('value');
  }

  async setLinkedinInput(linkedin) {
    await this.linkedinInput.sendKeys(linkedin);
  }

  async getLinkedinInput() {
    return this.linkedinInput.getAttribute('value');
  }

  async setFacebookInput(facebook) {
    await this.facebookInput.sendKeys(facebook);
  }

  async getFacebookInput() {
    return this.facebookInput.getAttribute('value');
  }

  async setTwitterInput(twitter) {
    await this.twitterInput.sendKeys(twitter);
  }

  async getTwitterInput() {
    return this.twitterInput.getAttribute('value');
  }

  async setWebsiteInput(website) {
    await this.websiteInput.sendKeys(website);
  }

  async getWebsiteInput() {
    return this.websiteInput.getAttribute('value');
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
