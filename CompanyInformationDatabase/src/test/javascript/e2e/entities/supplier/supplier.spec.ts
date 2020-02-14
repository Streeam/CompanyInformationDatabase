import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SupplierComponentsPage, { SupplierDeleteDialog } from './supplier.page-object';
import SupplierUpdatePage from './supplier-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Supplier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supplierComponentsPage: SupplierComponentsPage;
  let supplierUpdatePage: SupplierUpdatePage;
  let supplierDeleteDialog: SupplierDeleteDialog;

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

  it('should load Suppliers', async () => {
    await navBarPage.getEntityPage('supplier');
    supplierComponentsPage = new SupplierComponentsPage();
    expect(await supplierComponentsPage.getTitle().getText()).to.match(/Suppliers/);
  });

  it('should load create Supplier page', async () => {
    await supplierComponentsPage.clickOnCreateButton();
    supplierUpdatePage = new SupplierUpdatePage();
    expect(await supplierUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Supplier/);
    await supplierUpdatePage.cancel();
  });

  it('should create and save Suppliers', async () => {
    async function createSupplier() {
      await supplierComponentsPage.clickOnCreateButton();
      await supplierUpdatePage.setSupplierCodeInput('supplierCode');
      expect(await supplierUpdatePage.getSupplierCodeInput()).to.match(/supplierCode/);
      await supplierUpdatePage.setSupplierNameInput('supplierName');
      expect(await supplierUpdatePage.getSupplierNameInput()).to.match(/supplierName/);
      await supplierUpdatePage.setSupplierStatusInput('supplierStatus');
      expect(await supplierUpdatePage.getSupplierStatusInput()).to.match(/supplierStatus/);
      await supplierUpdatePage.setEmailInput('email');
      expect(await supplierUpdatePage.getEmailInput()).to.match(/email/);
      await supplierUpdatePage.setPhoneInput('phone');
      expect(await supplierUpdatePage.getPhoneInput()).to.match(/phone/);
      await supplierUpdatePage.setAddressLine1Input('addressLine1');
      expect(await supplierUpdatePage.getAddressLine1Input()).to.match(/addressLine1/);
      await supplierUpdatePage.setAddressLine2Input('addressLine2');
      expect(await supplierUpdatePage.getAddressLine2Input()).to.match(/addressLine2/);
      await supplierUpdatePage.setCityInput('city');
      expect(await supplierUpdatePage.getCityInput()).to.match(/city/);
      await supplierUpdatePage.setCountryInput('country');
      expect(await supplierUpdatePage.getCountryInput()).to.match(/country/);
      await supplierUpdatePage.companySelectLastOption();
      // supplierUpdatePage.productsSelectLastOption();
      await waitUntilDisplayed(supplierUpdatePage.getSaveButton());
      await supplierUpdatePage.save();
      await waitUntilHidden(supplierUpdatePage.getSaveButton());
      expect(await supplierUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSupplier();
    await supplierComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await supplierComponentsPage.countDeleteButtons();
    await createSupplier();

    await supplierComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await supplierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Supplier', async () => {
    await supplierComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await supplierComponentsPage.countDeleteButtons();
    await supplierComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    supplierDeleteDialog = new SupplierDeleteDialog();
    expect(await supplierDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.supplier.delete.question/);
    await supplierDeleteDialog.clickOnConfirmButton();

    await supplierComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await supplierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
