import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AfterSaleExpensesComponentsPage, { AfterSaleExpensesDeleteDialog } from './after-sale-expenses.page-object';
import AfterSaleExpensesUpdatePage from './after-sale-expenses-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('AfterSaleExpenses e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let afterSaleExpensesComponentsPage: AfterSaleExpensesComponentsPage;
  let afterSaleExpensesUpdatePage: AfterSaleExpensesUpdatePage;
  let afterSaleExpensesDeleteDialog: AfterSaleExpensesDeleteDialog;

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

  it('should load AfterSaleExpenses', async () => {
    await navBarPage.getEntityPage('after-sale-expenses');
    afterSaleExpensesComponentsPage = new AfterSaleExpensesComponentsPage();
    expect(await afterSaleExpensesComponentsPage.getTitle().getText()).to.match(/After Sale Expenses/);
  });

  it('should load create AfterSaleExpenses page', async () => {
    await afterSaleExpensesComponentsPage.clickOnCreateButton();
    afterSaleExpensesUpdatePage = new AfterSaleExpensesUpdatePage();
    expect(await afterSaleExpensesUpdatePage.getPageTitle().getText()).to.match(/Create or edit a AfterSaleExpenses/);
    await afterSaleExpensesUpdatePage.cancel();
  });

  it('should create and save AfterSaleExpenses', async () => {
    async function createAfterSaleExpenses() {
      await afterSaleExpensesComponentsPage.clickOnCreateButton();
      await afterSaleExpensesUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await afterSaleExpensesUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await afterSaleExpensesUpdatePage.setDescriptionInput('description');
      expect(await afterSaleExpensesUpdatePage.getDescriptionInput()).to.match(/description/);
      await afterSaleExpensesUpdatePage.setCostInput('5');
      expect(await afterSaleExpensesUpdatePage.getCostInput()).to.eq('5');
      await afterSaleExpensesUpdatePage.setEmployeeIdInput('5');
      expect(await afterSaleExpensesUpdatePage.getEmployeeIdInput()).to.eq('5');
      await afterSaleExpensesUpdatePage.setCustomerNonConformanceIdInput('5');
      expect(await afterSaleExpensesUpdatePage.getCustomerNonConformanceIdInput()).to.eq('5');
      await waitUntilDisplayed(afterSaleExpensesUpdatePage.getSaveButton());
      await afterSaleExpensesUpdatePage.save();
      await waitUntilHidden(afterSaleExpensesUpdatePage.getSaveButton());
      expect(await afterSaleExpensesUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAfterSaleExpenses();
    await afterSaleExpensesComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await afterSaleExpensesComponentsPage.countDeleteButtons();
    await createAfterSaleExpenses();

    await afterSaleExpensesComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await afterSaleExpensesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last AfterSaleExpenses', async () => {
    await afterSaleExpensesComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await afterSaleExpensesComponentsPage.countDeleteButtons();
    await afterSaleExpensesComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    afterSaleExpensesDeleteDialog = new AfterSaleExpensesDeleteDialog();
    expect(await afterSaleExpensesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.afterSaleExpenses.delete.question/);
    await afterSaleExpensesDeleteDialog.clickOnConfirmButton();

    await afterSaleExpensesComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await afterSaleExpensesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
