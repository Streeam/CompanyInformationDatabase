import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClientNonConformanceComponentsPage, { ClientNonConformanceDeleteDialog } from './client-non-conformance.page-object';
import ClientNonConformanceUpdatePage from './client-non-conformance-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ClientNonConformance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clientNonConformanceComponentsPage: ClientNonConformanceComponentsPage;
  let clientNonConformanceUpdatePage: ClientNonConformanceUpdatePage;
  let clientNonConformanceDeleteDialog: ClientNonConformanceDeleteDialog;

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

  it('should load ClientNonConformances', async () => {
    await navBarPage.getEntityPage('client-non-conformance');
    clientNonConformanceComponentsPage = new ClientNonConformanceComponentsPage();
    expect(await clientNonConformanceComponentsPage.getTitle().getText()).to.match(/Client Non Conformances/);
  });

  it('should load create ClientNonConformance page', async () => {
    await clientNonConformanceComponentsPage.clickOnCreateButton();
    clientNonConformanceUpdatePage = new ClientNonConformanceUpdatePage();
    expect(await clientNonConformanceUpdatePage.getPageTitle().getText()).to.match(/Create or edit a ClientNonConformance/);
    await clientNonConformanceUpdatePage.cancel();
  });

  it('should create and save ClientNonConformances', async () => {
    async function createClientNonConformance() {
      await clientNonConformanceComponentsPage.clickOnCreateButton();
      await clientNonConformanceUpdatePage.nonConformanceTypeSelectLastOption();
      await clientNonConformanceUpdatePage.statusSelectLastOption();
      await clientNonConformanceUpdatePage.setNonconformanceDetailsIdInput('5');
      expect(await clientNonConformanceUpdatePage.getNonconformanceDetailsIdInput()).to.eq('5');
      await clientNonConformanceUpdatePage.setRejectionReasonDetailsInput('rejectionReasonDetails');
      expect(await clientNonConformanceUpdatePage.getRejectionReasonDetailsInput()).to.match(/rejectionReasonDetails/);
      await clientNonConformanceUpdatePage.setActionToBeTakenDetailsInput('actionToBeTakenDetails');
      expect(await clientNonConformanceUpdatePage.getActionToBeTakenDetailsInput()).to.match(/actionToBeTakenDetails/);
      await clientNonConformanceUpdatePage.setShortTermDetailsInput('shortTermDetails');
      expect(await clientNonConformanceUpdatePage.getShortTermDetailsInput()).to.match(/shortTermDetails/);
      await clientNonConformanceUpdatePage.setLongTermDetailsInput('longTermDetails');
      expect(await clientNonConformanceUpdatePage.getLongTermDetailsInput()).to.match(/longTermDetails/);
      await clientNonConformanceUpdatePage.setCurrentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await clientNonConformanceUpdatePage.getCurrentDateInput()).to.contain('2001-01-01T02:30');
      await clientNonConformanceUpdatePage.setRejectionDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await clientNonConformanceUpdatePage.getRejectionDateInput()).to.contain('2001-01-01T02:30');
      const selectedUnderWarranty = await clientNonConformanceUpdatePage.getUnderWarrantyInput().isSelected();
      if (selectedUnderWarranty) {
        await clientNonConformanceUpdatePage.getUnderWarrantyInput().click();
        expect(await clientNonConformanceUpdatePage.getUnderWarrantyInput().isSelected()).to.be.false;
      } else {
        await clientNonConformanceUpdatePage.getUnderWarrantyInput().click();
        expect(await clientNonConformanceUpdatePage.getUnderWarrantyInput().isSelected()).to.be.true;
      }
      await clientNonConformanceUpdatePage.setQuantityInput('5');
      expect(await clientNonConformanceUpdatePage.getQuantityInput()).to.eq('5');
      await clientNonConformanceUpdatePage.setLabourRateInput('5');
      expect(await clientNonConformanceUpdatePage.getLabourRateInput()).to.eq('5');
      await clientNonConformanceUpdatePage.customerSelectLastOption();
      // clientNonConformanceUpdatePage.culpableEmployeesSelectLastOption();
      await waitUntilDisplayed(clientNonConformanceUpdatePage.getSaveButton());
      await clientNonConformanceUpdatePage.save();
      await waitUntilHidden(clientNonConformanceUpdatePage.getSaveButton());
      expect(await clientNonConformanceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createClientNonConformance();
    await clientNonConformanceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await clientNonConformanceComponentsPage.countDeleteButtons();
    await createClientNonConformance();

    await clientNonConformanceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await clientNonConformanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ClientNonConformance', async () => {
    await clientNonConformanceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await clientNonConformanceComponentsPage.countDeleteButtons();
    await clientNonConformanceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    clientNonConformanceDeleteDialog = new ClientNonConformanceDeleteDialog();
    expect(await clientNonConformanceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /cidApp.clientNonConformance.delete.question/
    );
    await clientNonConformanceDeleteDialog.clickOnConfirmButton();

    await clientNonConformanceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await clientNonConformanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
