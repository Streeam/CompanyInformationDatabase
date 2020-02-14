import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AmendmentComponentsPage, { AmendmentDeleteDialog } from './amendment.page-object';
import AmendmentUpdatePage from './amendment-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Amendment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let amendmentComponentsPage: AmendmentComponentsPage;
  let amendmentUpdatePage: AmendmentUpdatePage;
  let amendmentDeleteDialog: AmendmentDeleteDialog;

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

  it('should load Amendments', async () => {
    await navBarPage.getEntityPage('amendment');
    amendmentComponentsPage = new AmendmentComponentsPage();
    expect(await amendmentComponentsPage.getTitle().getText()).to.match(/Amendments/);
  });

  it('should load create Amendment page', async () => {
    await amendmentComponentsPage.clickOnCreateButton();
    amendmentUpdatePage = new AmendmentUpdatePage();
    expect(await amendmentUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Amendment/);
    await amendmentUpdatePage.cancel();
  });

  it('should create and save Amendments', async () => {
    async function createAmendment() {
      await amendmentComponentsPage.clickOnCreateButton();
      await amendmentUpdatePage.statusSelectLastOption();
      await amendmentUpdatePage.setDeadlineInput('01-01-2001');
      expect(await amendmentUpdatePage.getDeadlineInput()).to.eq('2001-01-01');
      await amendmentUpdatePage.prioritySelectLastOption();
      await amendmentUpdatePage.setProposedDateInput('01-01-2001');
      expect(await amendmentUpdatePage.getProposedDateInput()).to.eq('2001-01-01');
      await amendmentUpdatePage.setCurrentConditionInput('currentCondition');
      expect(await amendmentUpdatePage.getCurrentConditionInput()).to.match(/currentCondition/);
      await amendmentUpdatePage.setProposeAmendmentInput('proposeAmendment');
      expect(await amendmentUpdatePage.getProposeAmendmentInput()).to.match(/proposeAmendment/);
      await amendmentUpdatePage.setReasonForChangeInput('reasonForChange');
      expect(await amendmentUpdatePage.getReasonForChangeInput()).to.match(/reasonForChange/);
      await amendmentUpdatePage.setRejectionReasonInput('rejectionReason');
      expect(await amendmentUpdatePage.getRejectionReasonInput()).to.match(/rejectionReason/);
      await amendmentUpdatePage.setProgressInput('5');
      expect(await amendmentUpdatePage.getProgressInput()).to.eq('5');
      await amendmentUpdatePage.employeeSelectLastOption();
      await waitUntilDisplayed(amendmentUpdatePage.getSaveButton());
      await amendmentUpdatePage.save();
      await waitUntilHidden(amendmentUpdatePage.getSaveButton());
      expect(await amendmentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAmendment();
    await amendmentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await amendmentComponentsPage.countDeleteButtons();
    await createAmendment();

    await amendmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await amendmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Amendment', async () => {
    await amendmentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await amendmentComponentsPage.countDeleteButtons();
    await amendmentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    amendmentDeleteDialog = new AmendmentDeleteDialog();
    expect(await amendmentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.amendment.delete.question/);
    await amendmentDeleteDialog.clickOnConfirmButton();

    await amendmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await amendmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
