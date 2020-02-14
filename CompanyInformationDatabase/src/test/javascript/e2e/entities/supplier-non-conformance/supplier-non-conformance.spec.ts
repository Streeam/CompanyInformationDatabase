import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SupplierNonConformanceComponentsPage, { SupplierNonConformanceDeleteDialog } from './supplier-non-conformance.page-object';
import SupplierNonConformanceUpdatePage from './supplier-non-conformance-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('SupplierNonConformance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supplierNonConformanceComponentsPage: SupplierNonConformanceComponentsPage;
  let supplierNonConformanceUpdatePage: SupplierNonConformanceUpdatePage;
  let supplierNonConformanceDeleteDialog: SupplierNonConformanceDeleteDialog;

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

  it('should load SupplierNonConformances', async () => {
    await navBarPage.getEntityPage('supplier-non-conformance');
    supplierNonConformanceComponentsPage = new SupplierNonConformanceComponentsPage();
    expect(await supplierNonConformanceComponentsPage.getTitle().getText()).to.match(/Supplier Non Conformances/);
  });

  it('should load create SupplierNonConformance page', async () => {
    await supplierNonConformanceComponentsPage.clickOnCreateButton();
    supplierNonConformanceUpdatePage = new SupplierNonConformanceUpdatePage();
    expect(await supplierNonConformanceUpdatePage.getPageTitle().getText()).to.match(/Create or edit a SupplierNonConformance/);
    await supplierNonConformanceUpdatePage.cancel();
  });

  it('should create and save SupplierNonConformances', async () => {
    async function createSupplierNonConformance() {
      await supplierNonConformanceComponentsPage.clickOnCreateButton();
      await supplierNonConformanceUpdatePage.actionSelectLastOption();
      await supplierNonConformanceUpdatePage.setLabourInput('5');
      expect(await supplierNonConformanceUpdatePage.getLabourInput()).to.eq('5');
      await supplierNonConformanceUpdatePage.setConcesionDetailsInput('concesionDetails');
      expect(await supplierNonConformanceUpdatePage.getConcesionDetailsInput()).to.match(/concesionDetails/);
      await supplierNonConformanceUpdatePage.setRejectionFeeInput('5');
      expect(await supplierNonConformanceUpdatePage.getRejectionFeeInput()).to.eq('5');
      await supplierNonConformanceUpdatePage.nonConformanceTypeSelectLastOption();
      await supplierNonConformanceUpdatePage.employeeSelectLastOption();
      await supplierNonConformanceUpdatePage.supplierSelectLastOption();
      await supplierNonConformanceUpdatePage.nonConformanceDetailsSelectLastOption();
      await waitUntilDisplayed(supplierNonConformanceUpdatePage.getSaveButton());
      await supplierNonConformanceUpdatePage.save();
      await waitUntilHidden(supplierNonConformanceUpdatePage.getSaveButton());
      expect(await supplierNonConformanceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSupplierNonConformance();
    await supplierNonConformanceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await supplierNonConformanceComponentsPage.countDeleteButtons();
    await createSupplierNonConformance();

    await supplierNonConformanceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await supplierNonConformanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SupplierNonConformance', async () => {
    await supplierNonConformanceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await supplierNonConformanceComponentsPage.countDeleteButtons();
    await supplierNonConformanceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    supplierNonConformanceDeleteDialog = new SupplierNonConformanceDeleteDialog();
    expect(await supplierNonConformanceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /cidApp.supplierNonConformance.delete.question/
    );
    await supplierNonConformanceDeleteDialog.clickOnConfirmButton();

    await supplierNonConformanceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await supplierNonConformanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
