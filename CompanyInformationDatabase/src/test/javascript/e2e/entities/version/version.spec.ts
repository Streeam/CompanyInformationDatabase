import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VersionComponentsPage, { VersionDeleteDialog } from './version.page-object';
import VersionUpdatePage from './version-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Version e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let versionComponentsPage: VersionComponentsPage;
  let versionUpdatePage: VersionUpdatePage;
  let versionDeleteDialog: VersionDeleteDialog;

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

  it('should load Versions', async () => {
    await navBarPage.getEntityPage('version');
    versionComponentsPage = new VersionComponentsPage();
    expect(await versionComponentsPage.getTitle().getText()).to.match(/Versions/);
  });

  it('should load create Version page', async () => {
    await versionComponentsPage.clickOnCreateButton();
    versionUpdatePage = new VersionUpdatePage();
    expect(await versionUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Version/);
    await versionUpdatePage.cancel();
  });

  it('should create and save Versions', async () => {
    async function createVersion() {
      await versionComponentsPage.clickOnCreateButton();
      await versionUpdatePage.setVersionNumberInput('versionNumber');
      expect(await versionUpdatePage.getVersionNumberInput()).to.match(/versionNumber/);
      await versionUpdatePage.setVersionStatusInput('versionStatus');
      expect(await versionUpdatePage.getVersionStatusInput()).to.match(/versionStatus/);
      await versionUpdatePage.setIssueNumberInput('issueNumber');
      expect(await versionUpdatePage.getIssueNumberInput()).to.match(/issueNumber/);
      await versionUpdatePage.productSelectLastOption();
      await versionUpdatePage.amendmentSelectLastOption();
      await versionUpdatePage.prototypeSelectLastOption();
      await versionUpdatePage.routingSelectLastOption();
      await waitUntilDisplayed(versionUpdatePage.getSaveButton());
      await versionUpdatePage.save();
      await waitUntilHidden(versionUpdatePage.getSaveButton());
      expect(await versionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createVersion();
    await versionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await versionComponentsPage.countDeleteButtons();
    await createVersion();

    await versionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await versionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Version', async () => {
    await versionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await versionComponentsPage.countDeleteButtons();
    await versionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    versionDeleteDialog = new VersionDeleteDialog();
    expect(await versionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.version.delete.question/);
    await versionDeleteDialog.clickOnConfirmButton();

    await versionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await versionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
