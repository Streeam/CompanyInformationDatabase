import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ImageComponentsPage, { ImageDeleteDialog } from './image.page-object';
import ImageUpdatePage from './image-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Image e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imageComponentsPage: ImageComponentsPage;
  let imageUpdatePage: ImageUpdatePage;
  let imageDeleteDialog: ImageDeleteDialog;

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

  it('should load Images', async () => {
    await navBarPage.getEntityPage('image');
    imageComponentsPage = new ImageComponentsPage();
    expect(await imageComponentsPage.getTitle().getText()).to.match(/Images/);
  });

  it('should load create Image page', async () => {
    await imageComponentsPage.clickOnCreateButton();
    imageUpdatePage = new ImageUpdatePage();
    expect(await imageUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Image/);
    await imageUpdatePage.cancel();
  });

  it('should create and save Images', async () => {
    async function createImage() {
      await imageComponentsPage.clickOnCreateButton();
      await imageUpdatePage.setUrlPathInput('urlPath');
      expect(await imageUpdatePage.getUrlPathInput()).to.match(/urlPath/);
      await imageUpdatePage.setNameInput('name');
      expect(await imageUpdatePage.getNameInput()).to.match(/name/);
      await imageUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await imageUpdatePage.getLastModifiedDateInput()).to.contain('2001-01-01T02:30');
      await imageUpdatePage.setSizeInput('5');
      expect(await imageUpdatePage.getSizeInput()).to.eq('5');
      await imageUpdatePage.setTypeInput('type');
      expect(await imageUpdatePage.getTypeInput()).to.match(/type/);
      await imageUpdatePage.setTaskIdInput('5');
      expect(await imageUpdatePage.getTaskIdInput()).to.eq('5');
      await imageUpdatePage.setNonconformanceDetailsIdInput('5');
      expect(await imageUpdatePage.getNonconformanceDetailsIdInput()).to.eq('5');
      await imageUpdatePage.setProgressTrackIdInput('5');
      expect(await imageUpdatePage.getProgressTrackIdInput()).to.eq('5');
      await imageUpdatePage.productSelectLastOption();
      await imageUpdatePage.amendmentSelectLastOption();
      await waitUntilDisplayed(imageUpdatePage.getSaveButton());
      await imageUpdatePage.save();
      await waitUntilHidden(imageUpdatePage.getSaveButton());
      expect(await imageUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createImage();
    await imageComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await imageComponentsPage.countDeleteButtons();
    await createImage();

    await imageComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await imageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Image', async () => {
    await imageComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await imageComponentsPage.countDeleteButtons();
    await imageComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    imageDeleteDialog = new ImageDeleteDialog();
    expect(await imageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.image.delete.question/);
    await imageDeleteDialog.clickOnConfirmButton();

    await imageComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await imageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
