import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import InternalNonConformanceComponentsPage, { InternalNonConformanceDeleteDialog } from './internal-non-conformance.page-object';
import InternalNonConformanceUpdatePage from './internal-non-conformance-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('InternalNonConformance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let internalNonConformanceComponentsPage: InternalNonConformanceComponentsPage;
  let internalNonConformanceUpdatePage: InternalNonConformanceUpdatePage;
  /* let internalNonConformanceDeleteDialog: InternalNonConformanceDeleteDialog; */

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

  it('should load InternalNonConformances', async () => {
    await navBarPage.getEntityPage('internal-non-conformance');
    internalNonConformanceComponentsPage = new InternalNonConformanceComponentsPage();
    expect(await internalNonConformanceComponentsPage.getTitle().getText()).to.match(/Internal Non Conformances/);
  });

  it('should load create InternalNonConformance page', async () => {
    await internalNonConformanceComponentsPage.clickOnCreateButton();
    internalNonConformanceUpdatePage = new InternalNonConformanceUpdatePage();
    expect(await internalNonConformanceUpdatePage.getPageTitle().getText()).to.match(/Create or edit a InternalNonConformance/);
    await internalNonConformanceUpdatePage.cancel();
  });

  /*  it('should create and save InternalNonConformances', async () => {
        async function createInternalNonConformance() {
            await internalNonConformanceComponentsPage.clickOnCreateButton();
            await internalNonConformanceUpdatePage.actionSelectLastOption();
            await internalNonConformanceUpdatePage.setCurentDateInput('01-01-2001');
            expect(await internalNonConformanceUpdatePage.getCurentDateInput()).to.eq('2001-01-01');
            await internalNonConformanceUpdatePage.setRejectionDateInput('01-01-2001');
            expect(await internalNonConformanceUpdatePage.getRejectionDateInput()).to.eq('2001-01-01');
            await internalNonConformanceUpdatePage.setRejectionReasonDetailsInput('rejectionReasonDetails');
            expect(await internalNonConformanceUpdatePage.getRejectionReasonDetailsInput()).to.match(/rejectionReasonDetails/);
            await internalNonConformanceUpdatePage.setLabourRateInput('5');
            expect(await internalNonConformanceUpdatePage.getLabourRateInput()).to.eq('5');
            await internalNonConformanceUpdatePage.setNonconformanceDetailsIdInput('5');
            expect(await internalNonConformanceUpdatePage.getNonconformanceDetailsIdInput()).to.eq('5');
            await internalNonConformanceUpdatePage.statusSelectLastOption();
            await internalNonConformanceUpdatePage.setQuantityInput('5');
            expect(await internalNonConformanceUpdatePage.getQuantityInput()).to.eq('5');
            // internalNonConformanceUpdatePage.employeeSelectLastOption();
            // internalNonConformanceUpdatePage.siteSelectLastOption();
            // internalNonConformanceUpdatePage.departmentSelectLastOption();
            await waitUntilDisplayed(internalNonConformanceUpdatePage.getSaveButton());
            await internalNonConformanceUpdatePage.save();
            await waitUntilHidden(internalNonConformanceUpdatePage.getSaveButton());
            expect(await internalNonConformanceUpdatePage.getSaveButton().isPresent()).to.be.false;
        }

        await createInternalNonConformance();
        await internalNonConformanceComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeCreate = await internalNonConformanceComponentsPage.countDeleteButtons();
        await createInternalNonConformance();

        await internalNonConformanceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await internalNonConformanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    }); */

  /*  it('should delete last InternalNonConformance', async () => {
        await internalNonConformanceComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await internalNonConformanceComponentsPage.countDeleteButtons();
        await internalNonConformanceComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        internalNonConformanceDeleteDialog = new InternalNonConformanceDeleteDialog();
        expect(await internalNonConformanceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.internalNonConformance.delete.question/);
        await internalNonConformanceDeleteDialog.clickOnConfirmButton();

        await internalNonConformanceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await internalNonConformanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
