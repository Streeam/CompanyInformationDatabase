import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LongTermActionComponentsPage, { LongTermActionDeleteDialog } from './long-term-action.page-object';
import LongTermActionUpdatePage from './long-term-action-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('LongTermAction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let longTermActionComponentsPage: LongTermActionComponentsPage;
  let longTermActionUpdatePage: LongTermActionUpdatePage;
  let longTermActionDeleteDialog: LongTermActionDeleteDialog;

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

  it('should load LongTermActions', async () => {
    await navBarPage.getEntityPage('long-term-action');
    longTermActionComponentsPage = new LongTermActionComponentsPage();
    expect(await longTermActionComponentsPage.getTitle().getText()).to.match(/Long Term Actions/);
  });

  it('should load create LongTermAction page', async () => {
    await longTermActionComponentsPage.clickOnCreateButton();
    longTermActionUpdatePage = new LongTermActionUpdatePage();
    expect(await longTermActionUpdatePage.getPageTitle().getText()).to.match(/Create or edit a LongTermAction/);
    await longTermActionUpdatePage.cancel();
  });

  it('should create and save LongTermActions', async () => {
    async function createLongTermAction() {
      await longTermActionComponentsPage.clickOnCreateButton();
      await longTermActionUpdatePage.setNonConformanceIdInput('5');
      expect(await longTermActionUpdatePage.getNonConformanceIdInput()).to.eq('5');
      await longTermActionUpdatePage.setDescriptionInput('description');
      expect(await longTermActionUpdatePage.getDescriptionInput()).to.match(/description/);
      await waitUntilDisplayed(longTermActionUpdatePage.getSaveButton());
      await longTermActionUpdatePage.save();
      await waitUntilHidden(longTermActionUpdatePage.getSaveButton());
      expect(await longTermActionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createLongTermAction();
    await longTermActionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await longTermActionComponentsPage.countDeleteButtons();
    await createLongTermAction();

    await longTermActionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await longTermActionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last LongTermAction', async () => {
    await longTermActionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await longTermActionComponentsPage.countDeleteButtons();
    await longTermActionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    longTermActionDeleteDialog = new LongTermActionDeleteDialog();
    expect(await longTermActionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.longTermAction.delete.question/);
    await longTermActionDeleteDialog.clickOnConfirmButton();

    await longTermActionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await longTermActionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
