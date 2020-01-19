import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ShortTermActionComponentsPage, { ShortTermActionDeleteDialog } from './short-term-action.page-object';
import ShortTermActionUpdatePage from './short-term-action-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ShortTermAction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let shortTermActionComponentsPage: ShortTermActionComponentsPage;
  let shortTermActionUpdatePage: ShortTermActionUpdatePage;
  let shortTermActionDeleteDialog: ShortTermActionDeleteDialog;

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

  it('should load ShortTermActions', async () => {
    await navBarPage.getEntityPage('short-term-action');
    shortTermActionComponentsPage = new ShortTermActionComponentsPage();
    expect(await shortTermActionComponentsPage.getTitle().getText()).to.match(/Short Term Actions/);
  });

  it('should load create ShortTermAction page', async () => {
    await shortTermActionComponentsPage.clickOnCreateButton();
    shortTermActionUpdatePage = new ShortTermActionUpdatePage();
    expect(await shortTermActionUpdatePage.getPageTitle().getText()).to.match(/Create or edit a ShortTermAction/);
    await shortTermActionUpdatePage.cancel();
  });

  it('should create and save ShortTermActions', async () => {
    async function createShortTermAction() {
      await shortTermActionComponentsPage.clickOnCreateButton();
      await shortTermActionUpdatePage.setDescriptionInput('description');
      expect(await shortTermActionUpdatePage.getDescriptionInput()).to.match(/description/);
      await shortTermActionUpdatePage.setNonConformanceIdInput('5');
      expect(await shortTermActionUpdatePage.getNonConformanceIdInput()).to.eq('5');
      await waitUntilDisplayed(shortTermActionUpdatePage.getSaveButton());
      await shortTermActionUpdatePage.save();
      await waitUntilHidden(shortTermActionUpdatePage.getSaveButton());
      expect(await shortTermActionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createShortTermAction();
    await shortTermActionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await shortTermActionComponentsPage.countDeleteButtons();
    await createShortTermAction();

    await shortTermActionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await shortTermActionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ShortTermAction', async () => {
    await shortTermActionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await shortTermActionComponentsPage.countDeleteButtons();
    await shortTermActionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    shortTermActionDeleteDialog = new ShortTermActionDeleteDialog();
    expect(await shortTermActionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.shortTermAction.delete.question/);
    await shortTermActionDeleteDialog.clickOnConfirmButton();

    await shortTermActionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await shortTermActionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
