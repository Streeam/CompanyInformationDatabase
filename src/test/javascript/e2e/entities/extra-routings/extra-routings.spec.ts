import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExtraRoutingsComponentsPage, { ExtraRoutingsDeleteDialog } from './extra-routings.page-object';
import ExtraRoutingsUpdatePage from './extra-routings-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ExtraRoutings e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let extraRoutingsComponentsPage: ExtraRoutingsComponentsPage;
  let extraRoutingsUpdatePage: ExtraRoutingsUpdatePage;
  let extraRoutingsDeleteDialog: ExtraRoutingsDeleteDialog;

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

  it('should load ExtraRoutings', async () => {
    await navBarPage.getEntityPage('extra-routings');
    extraRoutingsComponentsPage = new ExtraRoutingsComponentsPage();
    expect(await extraRoutingsComponentsPage.getTitle().getText()).to.match(/Extra Routings/);
  });

  it('should load create ExtraRoutings page', async () => {
    await extraRoutingsComponentsPage.clickOnCreateButton();
    extraRoutingsUpdatePage = new ExtraRoutingsUpdatePage();
    expect(await extraRoutingsUpdatePage.getPageTitle().getText()).to.match(/Create or edit a ExtraRoutings/);
    await extraRoutingsUpdatePage.cancel();
  });

  it('should create and save ExtraRoutings', async () => {
    async function createExtraRoutings() {
      await extraRoutingsComponentsPage.clickOnCreateButton();
      await extraRoutingsUpdatePage.setOverheadInput('5');
      expect(await extraRoutingsUpdatePage.getOverheadInput()).to.eq('5');
      await extraRoutingsUpdatePage.setResourceNameInput('resourceName');
      expect(await extraRoutingsUpdatePage.getResourceNameInput()).to.match(/resourceName/);
      await extraRoutingsUpdatePage.setRuntimeInput('5');
      expect(await extraRoutingsUpdatePage.getRuntimeInput()).to.eq('5');
      await extraRoutingsUpdatePage.setInternalNonConformanceIdInput('5');
      expect(await extraRoutingsUpdatePage.getInternalNonConformanceIdInput()).to.eq('5');
      await extraRoutingsUpdatePage.nonconformanceTypeSelectLastOption();
      await extraRoutingsUpdatePage.nonconformanceActionSelectLastOption();
      await extraRoutingsUpdatePage.setCustomerNonConformaceIdInput('5');
      expect(await extraRoutingsUpdatePage.getCustomerNonConformaceIdInput()).to.eq('5');
      await waitUntilDisplayed(extraRoutingsUpdatePage.getSaveButton());
      await extraRoutingsUpdatePage.save();
      await waitUntilHidden(extraRoutingsUpdatePage.getSaveButton());
      expect(await extraRoutingsUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createExtraRoutings();
    await extraRoutingsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await extraRoutingsComponentsPage.countDeleteButtons();
    await createExtraRoutings();

    await extraRoutingsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await extraRoutingsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ExtraRoutings', async () => {
    await extraRoutingsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await extraRoutingsComponentsPage.countDeleteButtons();
    await extraRoutingsComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    extraRoutingsDeleteDialog = new ExtraRoutingsDeleteDialog();
    expect(await extraRoutingsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.extraRoutings.delete.question/);
    await extraRoutingsDeleteDialog.clickOnConfirmButton();

    await extraRoutingsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await extraRoutingsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
