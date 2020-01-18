import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PurchaseRequestParentComponentsPage, { PurchaseRequestParentDeleteDialog } from './purchase-request-parent.page-object';
import PurchaseRequestParentUpdatePage from './purchase-request-parent-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('PurchaseRequestParent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let purchaseRequestParentComponentsPage: PurchaseRequestParentComponentsPage;
  let purchaseRequestParentUpdatePage: PurchaseRequestParentUpdatePage;
  let purchaseRequestParentDeleteDialog: PurchaseRequestParentDeleteDialog;

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

  it('should load PurchaseRequestParents', async () => {
    await navBarPage.getEntityPage('purchase-request-parent');
    purchaseRequestParentComponentsPage = new PurchaseRequestParentComponentsPage();
    expect(await purchaseRequestParentComponentsPage.getTitle().getText()).to.match(/Purchase Request Parents/);
  });

  it('should load create PurchaseRequestParent page', async () => {
    await purchaseRequestParentComponentsPage.clickOnCreateButton();
    purchaseRequestParentUpdatePage = new PurchaseRequestParentUpdatePage();
    expect(await purchaseRequestParentUpdatePage.getPageTitle().getText()).to.match(/Create or edit a PurchaseRequestParent/);
    await purchaseRequestParentUpdatePage.cancel();
  });

  it('should create and save PurchaseRequestParents', async () => {
    async function createPurchaseRequestParent() {
      await purchaseRequestParentComponentsPage.clickOnCreateButton();
      await purchaseRequestParentUpdatePage.setPdfURLPathInput('pdfURLPath');
      expect(await purchaseRequestParentUpdatePage.getPdfURLPathInput()).to.match(/pdfURLPath/);
      await purchaseRequestParentUpdatePage.employeeSelectLastOption();
      await waitUntilDisplayed(purchaseRequestParentUpdatePage.getSaveButton());
      await purchaseRequestParentUpdatePage.save();
      await waitUntilHidden(purchaseRequestParentUpdatePage.getSaveButton());
      expect(await purchaseRequestParentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createPurchaseRequestParent();
    await purchaseRequestParentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await purchaseRequestParentComponentsPage.countDeleteButtons();
    await createPurchaseRequestParent();

    await purchaseRequestParentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await purchaseRequestParentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last PurchaseRequestParent', async () => {
    await purchaseRequestParentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await purchaseRequestParentComponentsPage.countDeleteButtons();
    await purchaseRequestParentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    purchaseRequestParentDeleteDialog = new PurchaseRequestParentDeleteDialog();
    expect(await purchaseRequestParentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /cidApp.purchaseRequestParent.delete.question/
    );
    await purchaseRequestParentDeleteDialog.clickOnConfirmButton();

    await purchaseRequestParentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await purchaseRequestParentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
