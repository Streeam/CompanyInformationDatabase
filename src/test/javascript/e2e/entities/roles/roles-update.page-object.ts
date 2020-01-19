import { element, by, ElementFinder } from 'protractor';

export default class RolesUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.roles.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  raiseNonconformaceInput: ElementFinder = element(by.css('input#roles-raiseNonconformace'));
  viewNonconformanceInput: ElementFinder = element(by.css('input#roles-viewNonconformance'));
  editNonconformanceInput: ElementFinder = element(by.css('input#roles-editNonconformance'));
  viewNonconformanceTasksInput: ElementFinder = element(by.css('input#roles-viewNonconformanceTasks'));
  editNonconformanceTasksInput: ElementFinder = element(by.css('input#roles-editNonconformanceTasks'));
  deleteNonconformanceTasksInput: ElementFinder = element(by.css('input#roles-deleteNonconformanceTasks'));
  deleteNonconformanceInput: ElementFinder = element(by.css('input#roles-deleteNonconformance'));
  raiseChangeRequestInput: ElementFinder = element(by.css('input#roles-raiseChangeRequest'));
  viewCostAnalysesInput: ElementFinder = element(by.css('input#roles-viewCostAnalyses'));
  editCostAnalysesInput: ElementFinder = element(by.css('input#roles-editCostAnalyses'));
  viewRequestSubmitedInput: ElementFinder = element(by.css('input#roles-viewRequestSubmited'));
  editRequestSubmitedInput: ElementFinder = element(by.css('input#roles-editRequestSubmited'));
  approveRequestSubmitedInput: ElementFinder = element(by.css('input#roles-approveRequestSubmited'));
  viewPendingSubmitedInput: ElementFinder = element(by.css('input#roles-viewPendingSubmited'));
  editPendingSubmitedInput: ElementFinder = element(by.css('input#roles-editPendingSubmited'));
  approvePendingSubmitedInput: ElementFinder = element(by.css('input#roles-approvePendingSubmited'));
  viewRejectedInput: ElementFinder = element(by.css('input#roles-viewRejected'));
  editRejectedInput: ElementFinder = element(by.css('input#roles-editRejected'));
  editPurchaseRequestInput: ElementFinder = element(by.css('input#roles-editPurchaseRequest'));
  deletePurchaseRequestInput: ElementFinder = element(by.css('input#roles-deletePurchaseRequest'));
  editProductStockInput: ElementFinder = element(by.css('input#roles-editProductStock'));
  addProductInput: ElementFinder = element(by.css('input#roles-addProduct'));
  deleteProductInput: ElementFinder = element(by.css('input#roles-deleteProduct'));
  editProductInput: ElementFinder = element(by.css('input#roles-editProduct'));
  addCustomerInput: ElementFinder = element(by.css('input#roles-addCustomer'));
  deleteCustomerInput: ElementFinder = element(by.css('input#roles-deleteCustomer'));
  editCustomerInput: ElementFinder = element(by.css('input#roles-editCustomer'));
  addSupplierInput: ElementFinder = element(by.css('input#roles-addSupplier'));
  deleteSupplierInput: ElementFinder = element(by.css('input#roles-deleteSupplier'));
  editSupplierInput: ElementFinder = element(by.css('input#roles-editSupplier'));
  raiseTaskInput: ElementFinder = element(by.css('input#roles-raiseTask'));
  addProgressTrackInput: ElementFinder = element(by.css('input#roles-addProgressTrack'));
  deleteProgressTrackInput: ElementFinder = element(by.css('input#roles-deleteProgressTrack'));
  editProgressTrackInput: ElementFinder = element(by.css('input#roles-editProgressTrack'));
  viewProgressTrackInput: ElementFinder = element(by.css('input#roles-viewProgressTrack'));
  addNonConformanceReasonInput: ElementFinder = element(by.css('input#roles-addNonConformanceReason'));
  addRootCausesInput: ElementFinder = element(by.css('input#roles-addRootCauses'));

  getPageTitle() {
    return this.pageTitle;
  }

  getRaiseNonconformaceInput() {
    return this.raiseNonconformaceInput;
  }
  getViewNonconformanceInput() {
    return this.viewNonconformanceInput;
  }
  getEditNonconformanceInput() {
    return this.editNonconformanceInput;
  }
  getViewNonconformanceTasksInput() {
    return this.viewNonconformanceTasksInput;
  }
  getEditNonconformanceTasksInput() {
    return this.editNonconformanceTasksInput;
  }
  getDeleteNonconformanceTasksInput() {
    return this.deleteNonconformanceTasksInput;
  }
  getDeleteNonconformanceInput() {
    return this.deleteNonconformanceInput;
  }
  getRaiseChangeRequestInput() {
    return this.raiseChangeRequestInput;
  }
  getViewCostAnalysesInput() {
    return this.viewCostAnalysesInput;
  }
  getEditCostAnalysesInput() {
    return this.editCostAnalysesInput;
  }
  getViewRequestSubmitedInput() {
    return this.viewRequestSubmitedInput;
  }
  getEditRequestSubmitedInput() {
    return this.editRequestSubmitedInput;
  }
  getApproveRequestSubmitedInput() {
    return this.approveRequestSubmitedInput;
  }
  getViewPendingSubmitedInput() {
    return this.viewPendingSubmitedInput;
  }
  getEditPendingSubmitedInput() {
    return this.editPendingSubmitedInput;
  }
  getApprovePendingSubmitedInput() {
    return this.approvePendingSubmitedInput;
  }
  getViewRejectedInput() {
    return this.viewRejectedInput;
  }
  getEditRejectedInput() {
    return this.editRejectedInput;
  }
  getEditPurchaseRequestInput() {
    return this.editPurchaseRequestInput;
  }
  getDeletePurchaseRequestInput() {
    return this.deletePurchaseRequestInput;
  }
  getEditProductStockInput() {
    return this.editProductStockInput;
  }
  getAddProductInput() {
    return this.addProductInput;
  }
  getDeleteProductInput() {
    return this.deleteProductInput;
  }
  getEditProductInput() {
    return this.editProductInput;
  }
  getAddCustomerInput() {
    return this.addCustomerInput;
  }
  getDeleteCustomerInput() {
    return this.deleteCustomerInput;
  }
  getEditCustomerInput() {
    return this.editCustomerInput;
  }
  getAddSupplierInput() {
    return this.addSupplierInput;
  }
  getDeleteSupplierInput() {
    return this.deleteSupplierInput;
  }
  getEditSupplierInput() {
    return this.editSupplierInput;
  }
  getRaiseTaskInput() {
    return this.raiseTaskInput;
  }
  getAddProgressTrackInput() {
    return this.addProgressTrackInput;
  }
  getDeleteProgressTrackInput() {
    return this.deleteProgressTrackInput;
  }
  getEditProgressTrackInput() {
    return this.editProgressTrackInput;
  }
  getViewProgressTrackInput() {
    return this.viewProgressTrackInput;
  }
  getAddNonConformanceReasonInput() {
    return this.addNonConformanceReasonInput;
  }
  getAddRootCausesInput() {
    return this.addRootCausesInput;
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
