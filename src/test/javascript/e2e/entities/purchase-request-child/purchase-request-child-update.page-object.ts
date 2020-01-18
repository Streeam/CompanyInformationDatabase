import { element, by, ElementFinder } from 'protractor';

export default class PurchaseRequestChildUpdatePage {
  pageTitle: ElementFinder = element(by.id('cidApp.purchaseRequestChild.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantityInput: ElementFinder = element(by.css('input#purchase-request-child-quantity'));
  orderedDateInput: ElementFinder = element(by.css('input#purchase-request-child-orderedDate'));
  dueDateInput: ElementFinder = element(by.css('input#purchase-request-child-dueDate'));
  commitedInput: ElementFinder = element(by.css('input#purchase-request-child-commited'));
  statusSelect: ElementFinder = element(by.css('select#purchase-request-child-status'));
  commentInput: ElementFinder = element(by.css('input#purchase-request-child-comment'));
  productSelect: ElementFinder = element(by.css('select#purchase-request-child-product'));
  purchaseRequestParentSelect: ElementFinder = element(by.css('select#purchase-request-child-purchaseRequestParent'));
  salesOrderSelect: ElementFinder = element(by.css('select#purchase-request-child-salesOrder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setOrderedDateInput(orderedDate) {
    await this.orderedDateInput.sendKeys(orderedDate);
  }

  async getOrderedDateInput() {
    return this.orderedDateInput.getAttribute('value');
  }

  async setDueDateInput(dueDate) {
    await this.dueDateInput.sendKeys(dueDate);
  }

  async getDueDateInput() {
    return this.dueDateInput.getAttribute('value');
  }

  getCommitedInput() {
    return this.commitedInput;
  }
  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return this.commentInput.getAttribute('value');
  }

  async productSelectLastOption() {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option) {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect() {
    return this.productSelect;
  }

  async getProductSelectedOption() {
    return this.productSelect.element(by.css('option:checked')).getText();
  }

  async purchaseRequestParentSelectLastOption() {
    await this.purchaseRequestParentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async purchaseRequestParentSelectOption(option) {
    await this.purchaseRequestParentSelect.sendKeys(option);
  }

  getPurchaseRequestParentSelect() {
    return this.purchaseRequestParentSelect;
  }

  async getPurchaseRequestParentSelectedOption() {
    return this.purchaseRequestParentSelect.element(by.css('option:checked')).getText();
  }

  async salesOrderSelectLastOption() {
    await this.salesOrderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async salesOrderSelectOption(option) {
    await this.salesOrderSelect.sendKeys(option);
  }

  getSalesOrderSelect() {
    return this.salesOrderSelect;
  }

  async getSalesOrderSelectedOption() {
    return this.salesOrderSelect.element(by.css('option:checked')).getText();
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
