import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ActionToBeTakenComponentsPage, { ActionToBeTakenDeleteDialog } from './action-to-be-taken.page-object';
import ActionToBeTakenUpdatePage from './action-to-be-taken-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ActionToBeTaken e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let actionToBeTakenComponentsPage: ActionToBeTakenComponentsPage;
  let actionToBeTakenUpdatePage: ActionToBeTakenUpdatePage;
  let actionToBeTakenDeleteDialog: ActionToBeTakenDeleteDialog;

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

  it('should load ActionToBeTakens', async () => {
    await navBarPage.getEntityPage('action-to-be-taken');
    actionToBeTakenComponentsPage = new ActionToBeTakenComponentsPage();
    expect(await actionToBeTakenComponentsPage.getTitle().getText()).to.match(/Action To Be Takens/);
  });

  it('should load create ActionToBeTaken page', async () => {
    await actionToBeTakenComponentsPage.clickOnCreateButton();
    actionToBeTakenUpdatePage = new ActionToBeTakenUpdatePage();
    expect(await actionToBeTakenUpdatePage.getPageTitle().getText()).to.match(/Create or edit a ActionToBeTaken/);
    await actionToBeTakenUpdatePage.cancel();
  });

  it('should create and save ActionToBeTakens', async () => {
    async function createActionToBeTaken() {
      await actionToBeTakenComponentsPage.clickOnCreateButton();
      await actionToBeTakenUpdatePage.setWhy1OccurranceInput('why1Occurrance');
      expect(await actionToBeTakenUpdatePage.getWhy1OccurranceInput()).to.match(/why1Occurrance/);
      await actionToBeTakenUpdatePage.setWhy2OccurranceInput('why2Occurrance');
      expect(await actionToBeTakenUpdatePage.getWhy2OccurranceInput()).to.match(/why2Occurrance/);
      await actionToBeTakenUpdatePage.setWhy3OccurranceInput('why3Occurrance');
      expect(await actionToBeTakenUpdatePage.getWhy3OccurranceInput()).to.match(/why3Occurrance/);
      await actionToBeTakenUpdatePage.setWhy4OccurranceInput('why4Occurrance');
      expect(await actionToBeTakenUpdatePage.getWhy4OccurranceInput()).to.match(/why4Occurrance/);
      await actionToBeTakenUpdatePage.setWhy5OccurranceInput('why5Occurrance');
      expect(await actionToBeTakenUpdatePage.getWhy5OccurranceInput()).to.match(/why5Occurrance/);
      await actionToBeTakenUpdatePage.setWhy1DetectionInput('why1Detection');
      expect(await actionToBeTakenUpdatePage.getWhy1DetectionInput()).to.match(/why1Detection/);
      await actionToBeTakenUpdatePage.setWhy2DetectionInput('why2Detection');
      expect(await actionToBeTakenUpdatePage.getWhy2DetectionInput()).to.match(/why2Detection/);
      await actionToBeTakenUpdatePage.setWhy3DetactionInput('why3Detaction');
      expect(await actionToBeTakenUpdatePage.getWhy3DetactionInput()).to.match(/why3Detaction/);
      await actionToBeTakenUpdatePage.setWhy4DetectionInput('why4Detection');
      expect(await actionToBeTakenUpdatePage.getWhy4DetectionInput()).to.match(/why4Detection/);
      await actionToBeTakenUpdatePage.setWhy5DetectionInput('why5Detection');
      expect(await actionToBeTakenUpdatePage.getWhy5DetectionInput()).to.match(/why5Detection/);
      await actionToBeTakenUpdatePage.setRootCauseInput('rootCause');
      expect(await actionToBeTakenUpdatePage.getRootCauseInput()).to.match(/rootCause/);
      await actionToBeTakenUpdatePage.setProblemInput('problem');
      expect(await actionToBeTakenUpdatePage.getProblemInput()).to.match(/problem/);
      await actionToBeTakenUpdatePage.setNonconformanceIdInput('5');
      expect(await actionToBeTakenUpdatePage.getNonconformanceIdInput()).to.eq('5');
      await waitUntilDisplayed(actionToBeTakenUpdatePage.getSaveButton());
      await actionToBeTakenUpdatePage.save();
      await waitUntilHidden(actionToBeTakenUpdatePage.getSaveButton());
      expect(await actionToBeTakenUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createActionToBeTaken();
    await actionToBeTakenComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await actionToBeTakenComponentsPage.countDeleteButtons();
    await createActionToBeTaken();

    await actionToBeTakenComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await actionToBeTakenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ActionToBeTaken', async () => {
    await actionToBeTakenComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await actionToBeTakenComponentsPage.countDeleteButtons();
    await actionToBeTakenComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    actionToBeTakenDeleteDialog = new ActionToBeTakenDeleteDialog();
    expect(await actionToBeTakenDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.actionToBeTaken.delete.question/);
    await actionToBeTakenDeleteDialog.clickOnConfirmButton();

    await actionToBeTakenComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await actionToBeTakenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
