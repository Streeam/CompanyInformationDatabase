import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DrawingComponentsPage, { DrawingDeleteDialog } from './drawing.page-object';
import DrawingUpdatePage from './drawing-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Drawing e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let drawingComponentsPage: DrawingComponentsPage;
  let drawingUpdatePage: DrawingUpdatePage;
  let drawingDeleteDialog: DrawingDeleteDialog;

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

  it('should load Drawings', async () => {
    await navBarPage.getEntityPage('drawing');
    drawingComponentsPage = new DrawingComponentsPage();
    expect(await drawingComponentsPage.getTitle().getText()).to.match(/Drawings/);
  });

  it('should load create Drawing page', async () => {
    await drawingComponentsPage.clickOnCreateButton();
    drawingUpdatePage = new DrawingUpdatePage();
    expect(await drawingUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Drawing/);
    await drawingUpdatePage.cancel();
  });

  it('should create and save Drawings', async () => {
    async function createDrawing() {
      await drawingComponentsPage.clickOnCreateButton();
      await drawingUpdatePage.setDrawingNumberInput('drawingNumber');
      expect(await drawingUpdatePage.getDrawingNumberInput()).to.match(/drawingNumber/);
      await drawingUpdatePage.setDrawingIssueInput('drawingIssue');
      expect(await drawingUpdatePage.getDrawingIssueInput()).to.match(/drawingIssue/);
      await drawingUpdatePage.setUrlPathInput('urlPath');
      expect(await drawingUpdatePage.getUrlPathInput()).to.match(/urlPath/);
      await drawingUpdatePage.productSelectLastOption();
      await drawingUpdatePage.amendmentSelectLastOption();
      await drawingUpdatePage.nonConformanceDetailsSelectLastOption();
      await waitUntilDisplayed(drawingUpdatePage.getSaveButton());
      await drawingUpdatePage.save();
      await waitUntilHidden(drawingUpdatePage.getSaveButton());
      expect(await drawingUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDrawing();
    await drawingComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await drawingComponentsPage.countDeleteButtons();
    await createDrawing();

    await drawingComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await drawingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Drawing', async () => {
    await drawingComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await drawingComponentsPage.countDeleteButtons();
    await drawingComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    drawingDeleteDialog = new DrawingDeleteDialog();
    expect(await drawingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.drawing.delete.question/);
    await drawingDeleteDialog.clickOnConfirmButton();

    await drawingComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await drawingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
