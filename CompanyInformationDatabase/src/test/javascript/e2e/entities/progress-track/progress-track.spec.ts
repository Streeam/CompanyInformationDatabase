import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProgressTrackComponentsPage, { ProgressTrackDeleteDialog } from './progress-track.page-object';
import ProgressTrackUpdatePage from './progress-track-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ProgressTrack e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let progressTrackComponentsPage: ProgressTrackComponentsPage;
  let progressTrackUpdatePage: ProgressTrackUpdatePage;
  let progressTrackDeleteDialog: ProgressTrackDeleteDialog;

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

  it('should load ProgressTracks', async () => {
    await navBarPage.getEntityPage('progress-track');
    progressTrackComponentsPage = new ProgressTrackComponentsPage();
    expect(await progressTrackComponentsPage.getTitle().getText()).to.match(/Progress Tracks/);
  });

  it('should load create ProgressTrack page', async () => {
    await progressTrackComponentsPage.clickOnCreateButton();
    progressTrackUpdatePage = new ProgressTrackUpdatePage();
    expect(await progressTrackUpdatePage.getPageTitle().getText()).to.match(/Create or edit a ProgressTrack/);
    await progressTrackUpdatePage.cancel();
  });

  it('should create and save ProgressTracks', async () => {
    async function createProgressTrack() {
      await progressTrackComponentsPage.clickOnCreateButton();
      await progressTrackUpdatePage.setProgressDescriptionInput('progressDescription');
      expect(await progressTrackUpdatePage.getProgressDescriptionInput()).to.match(/progressDescription/);
      const selectedComplete = await progressTrackUpdatePage.getCompleteInput().isSelected();
      if (selectedComplete) {
        await progressTrackUpdatePage.getCompleteInput().click();
        expect(await progressTrackUpdatePage.getCompleteInput().isSelected()).to.be.false;
      } else {
        await progressTrackUpdatePage.getCompleteInput().click();
        expect(await progressTrackUpdatePage.getCompleteInput().isSelected()).to.be.true;
      }
      await progressTrackUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await progressTrackUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await progressTrackUpdatePage.taskSelectLastOption();
      await waitUntilDisplayed(progressTrackUpdatePage.getSaveButton());
      await progressTrackUpdatePage.save();
      await waitUntilHidden(progressTrackUpdatePage.getSaveButton());
      expect(await progressTrackUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProgressTrack();
    await progressTrackComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await progressTrackComponentsPage.countDeleteButtons();
    await createProgressTrack();

    await progressTrackComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await progressTrackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ProgressTrack', async () => {
    await progressTrackComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await progressTrackComponentsPage.countDeleteButtons();
    await progressTrackComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    progressTrackDeleteDialog = new ProgressTrackDeleteDialog();
    expect(await progressTrackDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.progressTrack.delete.question/);
    await progressTrackDeleteDialog.clickOnConfirmButton();

    await progressTrackComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await progressTrackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
