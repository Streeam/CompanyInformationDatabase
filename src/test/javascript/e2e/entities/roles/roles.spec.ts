import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RolesComponentsPage, { RolesDeleteDialog } from './roles.page-object';
import RolesUpdatePage from './roles-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Roles e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rolesComponentsPage: RolesComponentsPage;
  let rolesUpdatePage: RolesUpdatePage;
  let rolesDeleteDialog: RolesDeleteDialog;

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

  it('should load Roles', async () => {
    await navBarPage.getEntityPage('roles');
    rolesComponentsPage = new RolesComponentsPage();
    expect(await rolesComponentsPage.getTitle().getText()).to.match(/Roles/);
  });

  it('should load create Roles page', async () => {
    await rolesComponentsPage.clickOnCreateButton();
    rolesUpdatePage = new RolesUpdatePage();
    expect(await rolesUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Roles/);
    await rolesUpdatePage.cancel();
  });

  it('should create and save Roles', async () => {
    async function createRoles() {
      await rolesComponentsPage.clickOnCreateButton();
      const selectedRaiseNonconformace = await rolesUpdatePage.getRaiseNonconformaceInput().isSelected();
      if (selectedRaiseNonconformace) {
        await rolesUpdatePage.getRaiseNonconformaceInput().click();
        expect(await rolesUpdatePage.getRaiseNonconformaceInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getRaiseNonconformaceInput().click();
        expect(await rolesUpdatePage.getRaiseNonconformaceInput().isSelected()).to.be.true;
      }
      const selectedViewNonconformance = await rolesUpdatePage.getViewNonconformanceInput().isSelected();
      if (selectedViewNonconformance) {
        await rolesUpdatePage.getViewNonconformanceInput().click();
        expect(await rolesUpdatePage.getViewNonconformanceInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getViewNonconformanceInput().click();
        expect(await rolesUpdatePage.getViewNonconformanceInput().isSelected()).to.be.true;
      }
      const selectedEditNonconformance = await rolesUpdatePage.getEditNonconformanceInput().isSelected();
      if (selectedEditNonconformance) {
        await rolesUpdatePage.getEditNonconformanceInput().click();
        expect(await rolesUpdatePage.getEditNonconformanceInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditNonconformanceInput().click();
        expect(await rolesUpdatePage.getEditNonconformanceInput().isSelected()).to.be.true;
      }
      const selectedViewNonconformanceTasks = await rolesUpdatePage.getViewNonconformanceTasksInput().isSelected();
      if (selectedViewNonconformanceTasks) {
        await rolesUpdatePage.getViewNonconformanceTasksInput().click();
        expect(await rolesUpdatePage.getViewNonconformanceTasksInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getViewNonconformanceTasksInput().click();
        expect(await rolesUpdatePage.getViewNonconformanceTasksInput().isSelected()).to.be.true;
      }
      const selectedEditNonconformanceTasks = await rolesUpdatePage.getEditNonconformanceTasksInput().isSelected();
      if (selectedEditNonconformanceTasks) {
        await rolesUpdatePage.getEditNonconformanceTasksInput().click();
        expect(await rolesUpdatePage.getEditNonconformanceTasksInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditNonconformanceTasksInput().click();
        expect(await rolesUpdatePage.getEditNonconformanceTasksInput().isSelected()).to.be.true;
      }
      const selectedDeleteNonconformanceTasks = await rolesUpdatePage.getDeleteNonconformanceTasksInput().isSelected();
      if (selectedDeleteNonconformanceTasks) {
        await rolesUpdatePage.getDeleteNonconformanceTasksInput().click();
        expect(await rolesUpdatePage.getDeleteNonconformanceTasksInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getDeleteNonconformanceTasksInput().click();
        expect(await rolesUpdatePage.getDeleteNonconformanceTasksInput().isSelected()).to.be.true;
      }
      const selectedDeleteNonconformance = await rolesUpdatePage.getDeleteNonconformanceInput().isSelected();
      if (selectedDeleteNonconformance) {
        await rolesUpdatePage.getDeleteNonconformanceInput().click();
        expect(await rolesUpdatePage.getDeleteNonconformanceInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getDeleteNonconformanceInput().click();
        expect(await rolesUpdatePage.getDeleteNonconformanceInput().isSelected()).to.be.true;
      }
      const selectedRaiseChangeRequest = await rolesUpdatePage.getRaiseChangeRequestInput().isSelected();
      if (selectedRaiseChangeRequest) {
        await rolesUpdatePage.getRaiseChangeRequestInput().click();
        expect(await rolesUpdatePage.getRaiseChangeRequestInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getRaiseChangeRequestInput().click();
        expect(await rolesUpdatePage.getRaiseChangeRequestInput().isSelected()).to.be.true;
      }
      const selectedViewCostAnalyses = await rolesUpdatePage.getViewCostAnalysesInput().isSelected();
      if (selectedViewCostAnalyses) {
        await rolesUpdatePage.getViewCostAnalysesInput().click();
        expect(await rolesUpdatePage.getViewCostAnalysesInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getViewCostAnalysesInput().click();
        expect(await rolesUpdatePage.getViewCostAnalysesInput().isSelected()).to.be.true;
      }
      const selectedEditCostAnalyses = await rolesUpdatePage.getEditCostAnalysesInput().isSelected();
      if (selectedEditCostAnalyses) {
        await rolesUpdatePage.getEditCostAnalysesInput().click();
        expect(await rolesUpdatePage.getEditCostAnalysesInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditCostAnalysesInput().click();
        expect(await rolesUpdatePage.getEditCostAnalysesInput().isSelected()).to.be.true;
      }
      const selectedViewRequestSubmited = await rolesUpdatePage.getViewRequestSubmitedInput().isSelected();
      if (selectedViewRequestSubmited) {
        await rolesUpdatePage.getViewRequestSubmitedInput().click();
        expect(await rolesUpdatePage.getViewRequestSubmitedInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getViewRequestSubmitedInput().click();
        expect(await rolesUpdatePage.getViewRequestSubmitedInput().isSelected()).to.be.true;
      }
      const selectedEditRequestSubmited = await rolesUpdatePage.getEditRequestSubmitedInput().isSelected();
      if (selectedEditRequestSubmited) {
        await rolesUpdatePage.getEditRequestSubmitedInput().click();
        expect(await rolesUpdatePage.getEditRequestSubmitedInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditRequestSubmitedInput().click();
        expect(await rolesUpdatePage.getEditRequestSubmitedInput().isSelected()).to.be.true;
      }
      const selectedApproveRequestSubmited = await rolesUpdatePage.getApproveRequestSubmitedInput().isSelected();
      if (selectedApproveRequestSubmited) {
        await rolesUpdatePage.getApproveRequestSubmitedInput().click();
        expect(await rolesUpdatePage.getApproveRequestSubmitedInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getApproveRequestSubmitedInput().click();
        expect(await rolesUpdatePage.getApproveRequestSubmitedInput().isSelected()).to.be.true;
      }
      const selectedViewPendingSubmited = await rolesUpdatePage.getViewPendingSubmitedInput().isSelected();
      if (selectedViewPendingSubmited) {
        await rolesUpdatePage.getViewPendingSubmitedInput().click();
        expect(await rolesUpdatePage.getViewPendingSubmitedInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getViewPendingSubmitedInput().click();
        expect(await rolesUpdatePage.getViewPendingSubmitedInput().isSelected()).to.be.true;
      }
      const selectedEditPendingSubmited = await rolesUpdatePage.getEditPendingSubmitedInput().isSelected();
      if (selectedEditPendingSubmited) {
        await rolesUpdatePage.getEditPendingSubmitedInput().click();
        expect(await rolesUpdatePage.getEditPendingSubmitedInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditPendingSubmitedInput().click();
        expect(await rolesUpdatePage.getEditPendingSubmitedInput().isSelected()).to.be.true;
      }
      const selectedApprovePendingSubmited = await rolesUpdatePage.getApprovePendingSubmitedInput().isSelected();
      if (selectedApprovePendingSubmited) {
        await rolesUpdatePage.getApprovePendingSubmitedInput().click();
        expect(await rolesUpdatePage.getApprovePendingSubmitedInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getApprovePendingSubmitedInput().click();
        expect(await rolesUpdatePage.getApprovePendingSubmitedInput().isSelected()).to.be.true;
      }
      const selectedViewRejected = await rolesUpdatePage.getViewRejectedInput().isSelected();
      if (selectedViewRejected) {
        await rolesUpdatePage.getViewRejectedInput().click();
        expect(await rolesUpdatePage.getViewRejectedInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getViewRejectedInput().click();
        expect(await rolesUpdatePage.getViewRejectedInput().isSelected()).to.be.true;
      }
      const selectedEditRejected = await rolesUpdatePage.getEditRejectedInput().isSelected();
      if (selectedEditRejected) {
        await rolesUpdatePage.getEditRejectedInput().click();
        expect(await rolesUpdatePage.getEditRejectedInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditRejectedInput().click();
        expect(await rolesUpdatePage.getEditRejectedInput().isSelected()).to.be.true;
      }
      const selectedEditPurchaseRequest = await rolesUpdatePage.getEditPurchaseRequestInput().isSelected();
      if (selectedEditPurchaseRequest) {
        await rolesUpdatePage.getEditPurchaseRequestInput().click();
        expect(await rolesUpdatePage.getEditPurchaseRequestInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditPurchaseRequestInput().click();
        expect(await rolesUpdatePage.getEditPurchaseRequestInput().isSelected()).to.be.true;
      }
      const selectedDeletePurchaseRequest = await rolesUpdatePage.getDeletePurchaseRequestInput().isSelected();
      if (selectedDeletePurchaseRequest) {
        await rolesUpdatePage.getDeletePurchaseRequestInput().click();
        expect(await rolesUpdatePage.getDeletePurchaseRequestInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getDeletePurchaseRequestInput().click();
        expect(await rolesUpdatePage.getDeletePurchaseRequestInput().isSelected()).to.be.true;
      }
      const selectedEditProductStock = await rolesUpdatePage.getEditProductStockInput().isSelected();
      if (selectedEditProductStock) {
        await rolesUpdatePage.getEditProductStockInput().click();
        expect(await rolesUpdatePage.getEditProductStockInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditProductStockInput().click();
        expect(await rolesUpdatePage.getEditProductStockInput().isSelected()).to.be.true;
      }
      const selectedAddProduct = await rolesUpdatePage.getAddProductInput().isSelected();
      if (selectedAddProduct) {
        await rolesUpdatePage.getAddProductInput().click();
        expect(await rolesUpdatePage.getAddProductInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getAddProductInput().click();
        expect(await rolesUpdatePage.getAddProductInput().isSelected()).to.be.true;
      }
      const selectedDeleteProduct = await rolesUpdatePage.getDeleteProductInput().isSelected();
      if (selectedDeleteProduct) {
        await rolesUpdatePage.getDeleteProductInput().click();
        expect(await rolesUpdatePage.getDeleteProductInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getDeleteProductInput().click();
        expect(await rolesUpdatePage.getDeleteProductInput().isSelected()).to.be.true;
      }
      const selectedEditProduct = await rolesUpdatePage.getEditProductInput().isSelected();
      if (selectedEditProduct) {
        await rolesUpdatePage.getEditProductInput().click();
        expect(await rolesUpdatePage.getEditProductInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditProductInput().click();
        expect(await rolesUpdatePage.getEditProductInput().isSelected()).to.be.true;
      }
      const selectedAddCustomer = await rolesUpdatePage.getAddCustomerInput().isSelected();
      if (selectedAddCustomer) {
        await rolesUpdatePage.getAddCustomerInput().click();
        expect(await rolesUpdatePage.getAddCustomerInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getAddCustomerInput().click();
        expect(await rolesUpdatePage.getAddCustomerInput().isSelected()).to.be.true;
      }
      const selectedDeleteCustomer = await rolesUpdatePage.getDeleteCustomerInput().isSelected();
      if (selectedDeleteCustomer) {
        await rolesUpdatePage.getDeleteCustomerInput().click();
        expect(await rolesUpdatePage.getDeleteCustomerInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getDeleteCustomerInput().click();
        expect(await rolesUpdatePage.getDeleteCustomerInput().isSelected()).to.be.true;
      }
      const selectedEditCustomer = await rolesUpdatePage.getEditCustomerInput().isSelected();
      if (selectedEditCustomer) {
        await rolesUpdatePage.getEditCustomerInput().click();
        expect(await rolesUpdatePage.getEditCustomerInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditCustomerInput().click();
        expect(await rolesUpdatePage.getEditCustomerInput().isSelected()).to.be.true;
      }
      const selectedAddSupplier = await rolesUpdatePage.getAddSupplierInput().isSelected();
      if (selectedAddSupplier) {
        await rolesUpdatePage.getAddSupplierInput().click();
        expect(await rolesUpdatePage.getAddSupplierInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getAddSupplierInput().click();
        expect(await rolesUpdatePage.getAddSupplierInput().isSelected()).to.be.true;
      }
      const selectedDeleteSupplier = await rolesUpdatePage.getDeleteSupplierInput().isSelected();
      if (selectedDeleteSupplier) {
        await rolesUpdatePage.getDeleteSupplierInput().click();
        expect(await rolesUpdatePage.getDeleteSupplierInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getDeleteSupplierInput().click();
        expect(await rolesUpdatePage.getDeleteSupplierInput().isSelected()).to.be.true;
      }
      const selectedEditSupplier = await rolesUpdatePage.getEditSupplierInput().isSelected();
      if (selectedEditSupplier) {
        await rolesUpdatePage.getEditSupplierInput().click();
        expect(await rolesUpdatePage.getEditSupplierInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditSupplierInput().click();
        expect(await rolesUpdatePage.getEditSupplierInput().isSelected()).to.be.true;
      }
      const selectedRaiseTask = await rolesUpdatePage.getRaiseTaskInput().isSelected();
      if (selectedRaiseTask) {
        await rolesUpdatePage.getRaiseTaskInput().click();
        expect(await rolesUpdatePage.getRaiseTaskInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getRaiseTaskInput().click();
        expect(await rolesUpdatePage.getRaiseTaskInput().isSelected()).to.be.true;
      }
      const selectedAddProgressTrack = await rolesUpdatePage.getAddProgressTrackInput().isSelected();
      if (selectedAddProgressTrack) {
        await rolesUpdatePage.getAddProgressTrackInput().click();
        expect(await rolesUpdatePage.getAddProgressTrackInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getAddProgressTrackInput().click();
        expect(await rolesUpdatePage.getAddProgressTrackInput().isSelected()).to.be.true;
      }
      const selectedDeleteProgressTrack = await rolesUpdatePage.getDeleteProgressTrackInput().isSelected();
      if (selectedDeleteProgressTrack) {
        await rolesUpdatePage.getDeleteProgressTrackInput().click();
        expect(await rolesUpdatePage.getDeleteProgressTrackInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getDeleteProgressTrackInput().click();
        expect(await rolesUpdatePage.getDeleteProgressTrackInput().isSelected()).to.be.true;
      }
      const selectedEditProgressTrack = await rolesUpdatePage.getEditProgressTrackInput().isSelected();
      if (selectedEditProgressTrack) {
        await rolesUpdatePage.getEditProgressTrackInput().click();
        expect(await rolesUpdatePage.getEditProgressTrackInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getEditProgressTrackInput().click();
        expect(await rolesUpdatePage.getEditProgressTrackInput().isSelected()).to.be.true;
      }
      const selectedViewProgressTrack = await rolesUpdatePage.getViewProgressTrackInput().isSelected();
      if (selectedViewProgressTrack) {
        await rolesUpdatePage.getViewProgressTrackInput().click();
        expect(await rolesUpdatePage.getViewProgressTrackInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getViewProgressTrackInput().click();
        expect(await rolesUpdatePage.getViewProgressTrackInput().isSelected()).to.be.true;
      }
      const selectedAddNonConformanceReason = await rolesUpdatePage.getAddNonConformanceReasonInput().isSelected();
      if (selectedAddNonConformanceReason) {
        await rolesUpdatePage.getAddNonConformanceReasonInput().click();
        expect(await rolesUpdatePage.getAddNonConformanceReasonInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getAddNonConformanceReasonInput().click();
        expect(await rolesUpdatePage.getAddNonConformanceReasonInput().isSelected()).to.be.true;
      }
      const selectedAddRootCauses = await rolesUpdatePage.getAddRootCausesInput().isSelected();
      if (selectedAddRootCauses) {
        await rolesUpdatePage.getAddRootCausesInput().click();
        expect(await rolesUpdatePage.getAddRootCausesInput().isSelected()).to.be.false;
      } else {
        await rolesUpdatePage.getAddRootCausesInput().click();
        expect(await rolesUpdatePage.getAddRootCausesInput().isSelected()).to.be.true;
      }
      await waitUntilDisplayed(rolesUpdatePage.getSaveButton());
      await rolesUpdatePage.save();
      await waitUntilHidden(rolesUpdatePage.getSaveButton());
      expect(await rolesUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createRoles();
    await rolesComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await rolesComponentsPage.countDeleteButtons();
    await createRoles();

    await rolesComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await rolesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Roles', async () => {
    await rolesComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await rolesComponentsPage.countDeleteButtons();
    await rolesComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    rolesDeleteDialog = new RolesDeleteDialog();
    expect(await rolesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.roles.delete.question/);
    await rolesDeleteDialog.clickOnConfirmButton();

    await rolesComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await rolesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
