import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NonConformanceTypeComponentsPage, { NonConformanceTypeDeleteDialog } from './non-conformance-type.page-object';
import NonConformanceTypeUpdatePage from './non-conformance-type-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('NonConformanceType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nonConformanceTypeComponentsPage: NonConformanceTypeComponentsPage;
  let nonConformanceTypeUpdatePage: NonConformanceTypeUpdatePage;
  let nonConformanceTypeDeleteDialog: NonConformanceTypeDeleteDialog;

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

  it('should load NonConformanceTypes', async () => {
    await navBarPage.getEntityPage('non-conformance-type');
    nonConformanceTypeComponentsPage = new NonConformanceTypeComponentsPage();
    expect(await nonConformanceTypeComponentsPage.getTitle().getText()).to.match(/Non Conformance Types/);
  });

  it('should load create NonConformanceType page', async () => {
    await nonConformanceTypeComponentsPage.clickOnCreateButton();
    nonConformanceTypeUpdatePage = new NonConformanceTypeUpdatePage();
    expect(await nonConformanceTypeUpdatePage.getPageTitle().getText()).to.match(/Create or edit a NonConformanceType/);
    await nonConformanceTypeUpdatePage.cancel();
  });

  it('should create and save NonConformanceTypes', async () => {
    async function createNonConformanceType() {
      await nonConformanceTypeComponentsPage.clickOnCreateButton();
      await nonConformanceTypeUpdatePage.setRejectionCodeInput('rejectionCode');
      expect(await nonConformanceTypeUpdatePage.getRejectionCodeInput()).to.match(/rejectionCode/);
      await nonConformanceTypeUpdatePage.setRejectionTitleInput('rejectionTitle');
      expect(await nonConformanceTypeUpdatePage.getRejectionTitleInput()).to.match(/rejectionTitle/);
      await waitUntilDisplayed(nonConformanceTypeUpdatePage.getSaveButton());
      await nonConformanceTypeUpdatePage.save();
      await waitUntilHidden(nonConformanceTypeUpdatePage.getSaveButton());
      expect(await nonConformanceTypeUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createNonConformanceType();
    await nonConformanceTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await nonConformanceTypeComponentsPage.countDeleteButtons();
    await createNonConformanceType();

    await nonConformanceTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await nonConformanceTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NonConformanceType', async () => {
    await nonConformanceTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await nonConformanceTypeComponentsPage.countDeleteButtons();
    await nonConformanceTypeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    nonConformanceTypeDeleteDialog = new NonConformanceTypeDeleteDialog();
    expect(await nonConformanceTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.nonConformanceType.delete.question/);
    await nonConformanceTypeDeleteDialog.clickOnConfirmButton();

    await nonConformanceTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await nonConformanceTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
