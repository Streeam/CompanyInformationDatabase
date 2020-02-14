import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CustomerComponentsPage, { CustomerDeleteDialog } from './customer.page-object';
import CustomerUpdatePage from './customer-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Customer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerComponentsPage: CustomerComponentsPage;
  let customerUpdatePage: CustomerUpdatePage;
  let customerDeleteDialog: CustomerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Customers', async () => {
    await navBarPage.getEntityPage('customer');
    customerComponentsPage = new CustomerComponentsPage();
    expect(await customerComponentsPage.getTitle().getText()).to.match(/Customers/);
  });

  it('should load create Customer page', async () => {
    await customerComponentsPage.clickOnCreateButton();
    customerUpdatePage = new CustomerUpdatePage();
    expect(await customerUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Customer/);
    await customerUpdatePage.cancel();
  });

  it('should create and save Customers', async () => {
    async function createCustomer() {
      await customerComponentsPage.clickOnCreateButton();
      await customerUpdatePage.setCustomerCodeInput('customerCode');
      expect(await customerUpdatePage.getCustomerCodeInput()).to.match(/customerCode/);
      await customerUpdatePage.setCustomerNameInput('customerName');
      expect(await customerUpdatePage.getCustomerNameInput()).to.match(/customerName/);
      await customerUpdatePage.setCustomerStatusInput('customerStatus');
      expect(await customerUpdatePage.getCustomerStatusInput()).to.match(/customerStatus/);
      await customerUpdatePage.setCountryInput('country');
      expect(await customerUpdatePage.getCountryInput()).to.match(/country/);
      await customerUpdatePage.setCustomerCurencyInput('customerCurency');
      expect(await customerUpdatePage.getCustomerCurencyInput()).to.match(/customerCurency/);
      await customerUpdatePage.setAddressInput('address');
      expect(await customerUpdatePage.getAddressInput()).to.match(/address/);
      await customerUpdatePage.setWebsiteInput('website');
      expect(await customerUpdatePage.getWebsiteInput()).to.match(/website/);
      await customerUpdatePage.setEmailInput('email');
      expect(await customerUpdatePage.getEmailInput()).to.match(/email/);
      await waitUntilDisplayed(customerUpdatePage.getSaveButton());
      await customerUpdatePage.save();
      await waitUntilHidden(customerUpdatePage.getSaveButton());
      expect(await customerUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCustomer();
    await customerComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await customerComponentsPage.countDeleteButtons();
    await createCustomer();

    await customerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Customer', async () => {
    await customerComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await customerComponentsPage.countDeleteButtons();
    await customerComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    customerDeleteDialog = new CustomerDeleteDialog();
    expect(await customerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.customer.delete.question/);
    await customerDeleteDialog.clickOnConfirmButton();

    await customerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
