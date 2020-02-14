import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExtraBomsComponentsPage, { ExtraBomsDeleteDialog } from './extra-boms.page-object';
import ExtraBomsUpdatePage from './extra-boms-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ExtraBoms e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let extraBomsComponentsPage: ExtraBomsComponentsPage;
  let extraBomsUpdatePage: ExtraBomsUpdatePage;
  let extraBomsDeleteDialog: ExtraBomsDeleteDialog;

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

  it('should load ExtraBoms', async () => {
    await navBarPage.getEntityPage('extra-boms');
    extraBomsComponentsPage = new ExtraBomsComponentsPage();
    expect(await extraBomsComponentsPage.getTitle().getText()).to.match(/Extra Boms/);
  });

  it('should load create ExtraBoms page', async () => {
    await extraBomsComponentsPage.clickOnCreateButton();
    extraBomsUpdatePage = new ExtraBomsUpdatePage();
    expect(await extraBomsUpdatePage.getPageTitle().getText()).to.match(/Create or edit a ExtraBoms/);
    await extraBomsUpdatePage.cancel();
  });

  it('should create and save ExtraBoms', async () => {
    async function createExtraBoms() {
      await extraBomsComponentsPage.clickOnCreateButton();
      await extraBomsUpdatePage.setPartNumberInput('partNumber');
      expect(await extraBomsUpdatePage.getPartNumberInput()).to.match(/partNumber/);
      await extraBomsUpdatePage.setPartDescriptionInput('partDescription');
      expect(await extraBomsUpdatePage.getPartDescriptionInput()).to.match(/partDescription/);
      await extraBomsUpdatePage.setPriceInput('5');
      expect(await extraBomsUpdatePage.getPriceInput()).to.eq('5');
      await extraBomsUpdatePage.setQuantityInput('5');
      expect(await extraBomsUpdatePage.getQuantityInput()).to.eq('5');
      await extraBomsUpdatePage.nonconformanceTypeSelectLastOption();
      await extraBomsUpdatePage.nonconformanceActionSelectLastOption();
      await extraBomsUpdatePage.setInternalNonconformanceIdInput('5');
      expect(await extraBomsUpdatePage.getInternalNonconformanceIdInput()).to.eq('5');
      await extraBomsUpdatePage.setCustomerNonConformaceIdInput('5');
      expect(await extraBomsUpdatePage.getCustomerNonConformaceIdInput()).to.eq('5');
      await waitUntilDisplayed(extraBomsUpdatePage.getSaveButton());
      await extraBomsUpdatePage.save();
      await waitUntilHidden(extraBomsUpdatePage.getSaveButton());
      expect(await extraBomsUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createExtraBoms();
    await extraBomsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await extraBomsComponentsPage.countDeleteButtons();
    await createExtraBoms();

    await extraBomsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await extraBomsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ExtraBoms', async () => {
    await extraBomsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await extraBomsComponentsPage.countDeleteButtons();
    await extraBomsComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    extraBomsDeleteDialog = new ExtraBomsDeleteDialog();
    expect(await extraBomsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.extraBoms.delete.question/);
    await extraBomsDeleteDialog.clickOnConfirmButton();

    await extraBomsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await extraBomsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
