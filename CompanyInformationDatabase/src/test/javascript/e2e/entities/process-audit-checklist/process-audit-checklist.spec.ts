import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProcessAuditChecklistComponentsPage, { ProcessAuditChecklistDeleteDialog } from './process-audit-checklist.page-object';
import ProcessAuditChecklistUpdatePage from './process-audit-checklist-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ProcessAuditChecklist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let processAuditChecklistComponentsPage: ProcessAuditChecklistComponentsPage;
  let processAuditChecklistUpdatePage: ProcessAuditChecklistUpdatePage;
  let processAuditChecklistDeleteDialog: ProcessAuditChecklistDeleteDialog;

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

  it('should load ProcessAuditChecklists', async () => {
    await navBarPage.getEntityPage('process-audit-checklist');
    processAuditChecklistComponentsPage = new ProcessAuditChecklistComponentsPage();
    expect(await processAuditChecklistComponentsPage.getTitle().getText()).to.match(/Process Audit Checklists/);
  });

  it('should load create ProcessAuditChecklist page', async () => {
    await processAuditChecklistComponentsPage.clickOnCreateButton();
    processAuditChecklistUpdatePage = new ProcessAuditChecklistUpdatePage();
    expect(await processAuditChecklistUpdatePage.getPageTitle().getText()).to.match(/Create or edit a ProcessAuditChecklist/);
    await processAuditChecklistUpdatePage.cancel();
  });

  it('should create and save ProcessAuditChecklists', async () => {
    async function createProcessAuditChecklist() {
      await processAuditChecklistComponentsPage.clickOnCreateButton();
      await processAuditChecklistUpdatePage.setAuditQuestionInput('auditQuestion');
      expect(await processAuditChecklistUpdatePage.getAuditQuestionInput()).to.match(/auditQuestion/);
      const selectedCompliant = await processAuditChecklistUpdatePage.getCompliantInput().isSelected();
      if (selectedCompliant) {
        await processAuditChecklistUpdatePage.getCompliantInput().click();
        expect(await processAuditChecklistUpdatePage.getCompliantInput().isSelected()).to.be.false;
      } else {
        await processAuditChecklistUpdatePage.getCompliantInput().click();
        expect(await processAuditChecklistUpdatePage.getCompliantInput().isSelected()).to.be.true;
      }
      const selectedOfi = await processAuditChecklistUpdatePage.getOfiInput().isSelected();
      if (selectedOfi) {
        await processAuditChecklistUpdatePage.getOfiInput().click();
        expect(await processAuditChecklistUpdatePage.getOfiInput().isSelected()).to.be.false;
      } else {
        await processAuditChecklistUpdatePage.getOfiInput().click();
        expect(await processAuditChecklistUpdatePage.getOfiInput().isSelected()).to.be.true;
      }
      const selectedMinorNC = await processAuditChecklistUpdatePage.getMinorNCInput().isSelected();
      if (selectedMinorNC) {
        await processAuditChecklistUpdatePage.getMinorNCInput().click();
        expect(await processAuditChecklistUpdatePage.getMinorNCInput().isSelected()).to.be.false;
      } else {
        await processAuditChecklistUpdatePage.getMinorNCInput().click();
        expect(await processAuditChecklistUpdatePage.getMinorNCInput().isSelected()).to.be.true;
      }
      const selectedMajorNC = await processAuditChecklistUpdatePage.getMajorNCInput().isSelected();
      if (selectedMajorNC) {
        await processAuditChecklistUpdatePage.getMajorNCInput().click();
        expect(await processAuditChecklistUpdatePage.getMajorNCInput().isSelected()).to.be.false;
      } else {
        await processAuditChecklistUpdatePage.getMajorNCInput().click();
        expect(await processAuditChecklistUpdatePage.getMajorNCInput().isSelected()).to.be.true;
      }
      await processAuditChecklistUpdatePage.setAuditAnswerInput('auditAnswer');
      expect(await processAuditChecklistUpdatePage.getAuditAnswerInput()).to.match(/auditAnswer/);
      await processAuditChecklistUpdatePage.setOpportunitiesForImprovementInput('opportunitiesForImprovement');
      expect(await processAuditChecklistUpdatePage.getOpportunitiesForImprovementInput()).to.match(/opportunitiesForImprovement/);
      await processAuditChecklistUpdatePage.setNonConformanceIdInput('5');
      expect(await processAuditChecklistUpdatePage.getNonConformanceIdInput()).to.eq('5');
      await waitUntilDisplayed(processAuditChecklistUpdatePage.getSaveButton());
      await processAuditChecklistUpdatePage.save();
      await waitUntilHidden(processAuditChecklistUpdatePage.getSaveButton());
      expect(await processAuditChecklistUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProcessAuditChecklist();
    await processAuditChecklistComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await processAuditChecklistComponentsPage.countDeleteButtons();
    await createProcessAuditChecklist();

    await processAuditChecklistComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await processAuditChecklistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ProcessAuditChecklist', async () => {
    await processAuditChecklistComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await processAuditChecklistComponentsPage.countDeleteButtons();
    await processAuditChecklistComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    processAuditChecklistDeleteDialog = new ProcessAuditChecklistDeleteDialog();
    expect(await processAuditChecklistDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /cidApp.processAuditChecklist.delete.question/
    );
    await processAuditChecklistDeleteDialog.clickOnConfirmButton();

    await processAuditChecklistComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await processAuditChecklistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
