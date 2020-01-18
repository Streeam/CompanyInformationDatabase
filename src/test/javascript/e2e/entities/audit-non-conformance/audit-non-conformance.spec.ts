import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AuditNonConformanceComponentsPage, { AuditNonConformanceDeleteDialog } from './audit-non-conformance.page-object';
import AuditNonConformanceUpdatePage from './audit-non-conformance-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('AuditNonConformance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let auditNonConformanceComponentsPage: AuditNonConformanceComponentsPage;
  let auditNonConformanceUpdatePage: AuditNonConformanceUpdatePage;
  let auditNonConformanceDeleteDialog: AuditNonConformanceDeleteDialog;

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

  it('should load AuditNonConformances', async () => {
    await navBarPage.getEntityPage('audit-non-conformance');
    auditNonConformanceComponentsPage = new AuditNonConformanceComponentsPage();
    expect(await auditNonConformanceComponentsPage.getTitle().getText()).to.match(/Audit Non Conformances/);
  });

  it('should load create AuditNonConformance page', async () => {
    await auditNonConformanceComponentsPage.clickOnCreateButton();
    auditNonConformanceUpdatePage = new AuditNonConformanceUpdatePage();
    expect(await auditNonConformanceUpdatePage.getPageTitle().getText()).to.match(/Create or edit a AuditNonConformance/);
    await auditNonConformanceUpdatePage.cancel();
  });

  it('should create and save AuditNonConformances', async () => {
    async function createAuditNonConformance() {
      await auditNonConformanceComponentsPage.clickOnCreateButton();
      await auditNonConformanceUpdatePage.auditNonConformanceFirstTypeSelectLastOption();
      await auditNonConformanceUpdatePage.auditNonConformanceSecondTypeSelectLastOption();
      await auditNonConformanceUpdatePage.employeeSelectLastOption();
      await auditNonConformanceUpdatePage.nonConformanceDetailsSelectLastOption();
      await waitUntilDisplayed(auditNonConformanceUpdatePage.getSaveButton());
      await auditNonConformanceUpdatePage.save();
      await waitUntilHidden(auditNonConformanceUpdatePage.getSaveButton());
      expect(await auditNonConformanceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAuditNonConformance();
    await auditNonConformanceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await auditNonConformanceComponentsPage.countDeleteButtons();
    await createAuditNonConformance();

    await auditNonConformanceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await auditNonConformanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last AuditNonConformance', async () => {
    await auditNonConformanceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await auditNonConformanceComponentsPage.countDeleteButtons();
    await auditNonConformanceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    auditNonConformanceDeleteDialog = new AuditNonConformanceDeleteDialog();
    expect(await auditNonConformanceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /cidApp.auditNonConformance.delete.question/
    );
    await auditNonConformanceDeleteDialog.clickOnConfirmButton();

    await auditNonConformanceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await auditNonConformanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
