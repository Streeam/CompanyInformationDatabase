import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SiteComponentsPage, { SiteDeleteDialog } from './site.page-object';
import SiteUpdatePage from './site-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Site e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let siteComponentsPage: SiteComponentsPage;
  let siteUpdatePage: SiteUpdatePage;
  let siteDeleteDialog: SiteDeleteDialog;

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

  it('should load Sites', async () => {
    await navBarPage.getEntityPage('site');
    siteComponentsPage = new SiteComponentsPage();
    expect(await siteComponentsPage.getTitle().getText()).to.match(/Sites/);
  });

  it('should load create Site page', async () => {
    await siteComponentsPage.clickOnCreateButton();
    siteUpdatePage = new SiteUpdatePage();
    expect(await siteUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Site/);
    await siteUpdatePage.cancel();
  });

  it('should create and save Sites', async () => {
    async function createSite() {
      await siteComponentsPage.clickOnCreateButton();
      await siteUpdatePage.setSiteInput('site');
      expect(await siteUpdatePage.getSiteInput()).to.match(/site/);
      await waitUntilDisplayed(siteUpdatePage.getSaveButton());
      await siteUpdatePage.save();
      await waitUntilHidden(siteUpdatePage.getSaveButton());
      expect(await siteUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSite();
    await siteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await siteComponentsPage.countDeleteButtons();
    await createSite();

    await siteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await siteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Site', async () => {
    await siteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await siteComponentsPage.countDeleteButtons();
    await siteComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    siteDeleteDialog = new SiteDeleteDialog();
    expect(await siteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.site.delete.question/);
    await siteDeleteDialog.clickOnConfirmButton();

    await siteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await siteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
