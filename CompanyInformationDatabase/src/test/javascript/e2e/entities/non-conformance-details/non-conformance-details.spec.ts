import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NonConformanceDetailsComponentsPage, { NonConformanceDetailsDeleteDialog } from './non-conformance-details.page-object';
import NonConformanceDetailsUpdatePage from './non-conformance-details-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('NonConformanceDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nonConformanceDetailsComponentsPage: NonConformanceDetailsComponentsPage;
  let nonConformanceDetailsUpdatePage: NonConformanceDetailsUpdatePage;
  /* let nonConformanceDetailsDeleteDialog: NonConformanceDetailsDeleteDialog; */

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

  it('should load NonConformanceDetails', async () => {
    await navBarPage.getEntityPage('non-conformance-details');
    nonConformanceDetailsComponentsPage = new NonConformanceDetailsComponentsPage();
    expect(await nonConformanceDetailsComponentsPage.getTitle().getText()).to.match(/Non Conformance Details/);
  });

  it('should load create NonConformanceDetails page', async () => {
    await nonConformanceDetailsComponentsPage.clickOnCreateButton();
    nonConformanceDetailsUpdatePage = new NonConformanceDetailsUpdatePage();
    expect(await nonConformanceDetailsUpdatePage.getPageTitle().getText()).to.match(/Create or edit a NonConformanceDetails/);
    await nonConformanceDetailsUpdatePage.cancel();
  });

  /*  it('should create and save NonConformanceDetails', async () => {
        async function createNonConformanceDetails() {
            await nonConformanceDetailsComponentsPage.clickOnCreateButton();
            await nonConformanceDetailsUpdatePage.setDeadlineInput('01-01-2001');
            expect(await nonConformanceDetailsUpdatePage.getDeadlineInput()).to.eq('2001-01-01');
            await nonConformanceDetailsUpdatePage.statusSelectLastOption();
            await nonConformanceDetailsUpdatePage.setProgressInput('5');
            expect(await nonConformanceDetailsUpdatePage.getProgressInput()).to.eq('5');
            await nonConformanceDetailsUpdatePage.prioritySelectLastOption();
            await nonConformanceDetailsUpdatePage.nonconformanceSelectLastOption();
            await nonConformanceDetailsUpdatePage.setCurrentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
            expect(await nonConformanceDetailsUpdatePage.getCurrentDateInput()).to.contain('2001-01-01T02:30');
            // nonConformanceDetailsUpdatePage.productSelectLastOption();
            // nonConformanceDetailsUpdatePage.routingSelectLastOption();
            await nonConformanceDetailsUpdatePage.employeeSelectLastOption();
            await nonConformanceDetailsUpdatePage.nonConformanceTypeSelectLastOption();
            await waitUntilDisplayed(nonConformanceDetailsUpdatePage.getSaveButton());
            await nonConformanceDetailsUpdatePage.save();
            await waitUntilHidden(nonConformanceDetailsUpdatePage.getSaveButton());
            expect(await nonConformanceDetailsUpdatePage.getSaveButton().isPresent()).to.be.false;
        }

        await createNonConformanceDetails();
        await nonConformanceDetailsComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeCreate = await nonConformanceDetailsComponentsPage.countDeleteButtons();
        await createNonConformanceDetails();

        await nonConformanceDetailsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await nonConformanceDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    }); */

  /*  it('should delete last NonConformanceDetails', async () => {
        await nonConformanceDetailsComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await nonConformanceDetailsComponentsPage.countDeleteButtons();
        await nonConformanceDetailsComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        nonConformanceDetailsDeleteDialog = new NonConformanceDetailsDeleteDialog();
        expect(await nonConformanceDetailsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.nonConformanceDetails.delete.question/);
        await nonConformanceDetailsDeleteDialog.clickOnConfirmButton();

        await nonConformanceDetailsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await nonConformanceDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
