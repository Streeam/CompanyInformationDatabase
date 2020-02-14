import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SalesOrderComponentsPage, { SalesOrderDeleteDialog } from './sales-order.page-object';
import SalesOrderUpdatePage from './sales-order-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('SalesOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let salesOrderComponentsPage: SalesOrderComponentsPage;
  let salesOrderUpdatePage: SalesOrderUpdatePage;
  let salesOrderDeleteDialog: SalesOrderDeleteDialog;

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

  it('should load SalesOrders', async () => {
    await navBarPage.getEntityPage('sales-order');
    salesOrderComponentsPage = new SalesOrderComponentsPage();
    expect(await salesOrderComponentsPage.getTitle().getText()).to.match(/Sales Orders/);
  });

  it('should load create SalesOrder page', async () => {
    await salesOrderComponentsPage.clickOnCreateButton();
    salesOrderUpdatePage = new SalesOrderUpdatePage();
    expect(await salesOrderUpdatePage.getPageTitle().getText()).to.match(/Create or edit a SalesOrder/);
    await salesOrderUpdatePage.cancel();
  });

  it('should create and save SalesOrders', async () => {
    async function createSalesOrder() {
      await salesOrderComponentsPage.clickOnCreateButton();
      await salesOrderUpdatePage.setSalesOrderNumberInput('salesOrderNumber');
      expect(await salesOrderUpdatePage.getSalesOrderNumberInput()).to.match(/salesOrderNumber/);
      await salesOrderUpdatePage.setDateRaisedInput('01-01-2001');
      expect(await salesOrderUpdatePage.getDateRaisedInput()).to.eq('2001-01-01');
      await salesOrderUpdatePage.setSoSalesStatusInput('soSalesStatus');
      expect(await salesOrderUpdatePage.getSoSalesStatusInput()).to.match(/soSalesStatus/);
      await salesOrderUpdatePage.setSecondSalesReferenceInput('secondSalesReference');
      expect(await salesOrderUpdatePage.getSecondSalesReferenceInput()).to.match(/secondSalesReference/);
      await salesOrderUpdatePage.setCurrencyCodeInput('currencyCode');
      expect(await salesOrderUpdatePage.getCurrencyCodeInput()).to.match(/currencyCode/);
      await salesOrderUpdatePage.setExchangeRateInput('exchangeRate');
      expect(await salesOrderUpdatePage.getExchangeRateInput()).to.match(/exchangeRate/);
      await salesOrderUpdatePage.setDiscountPercentInput('5');
      expect(await salesOrderUpdatePage.getDiscountPercentInput()).to.eq('5');
      await salesOrderUpdatePage.setContactNameInput('contactName');
      expect(await salesOrderUpdatePage.getContactNameInput()).to.match(/contactName/);
      await salesOrderUpdatePage.setOurContactInput('ourContact');
      expect(await salesOrderUpdatePage.getOurContactInput()).to.match(/ourContact/);
      await salesOrderUpdatePage.setInvoiceAddressInput('invoiceAddress');
      expect(await salesOrderUpdatePage.getInvoiceAddressInput()).to.match(/invoiceAddress/);
      await salesOrderUpdatePage.setInvoiceCountryCodeInput('invoiceCountryCode');
      expect(await salesOrderUpdatePage.getInvoiceCountryCodeInput()).to.match(/invoiceCountryCode/);
      await salesOrderUpdatePage.setSalesOrderTitleInput('salesOrderTitle');
      expect(await salesOrderUpdatePage.getSalesOrderTitleInput()).to.match(/salesOrderTitle/);
      await salesOrderUpdatePage.setSalesAnalysis1Input('salesAnalysis1');
      expect(await salesOrderUpdatePage.getSalesAnalysis1Input()).to.match(/salesAnalysis1/);
      await salesOrderUpdatePage.setSalesAnalysis2Input('salesAnalysis2');
      expect(await salesOrderUpdatePage.getSalesAnalysis2Input()).to.match(/salesAnalysis2/);
      await salesOrderUpdatePage.setSalesAnalysis3Input('salesAnalysis3');
      expect(await salesOrderUpdatePage.getSalesAnalysis3Input()).to.match(/salesAnalysis3/);
      await salesOrderUpdatePage.setSalesAnalysis4Input('salesAnalysis4');
      expect(await salesOrderUpdatePage.getSalesAnalysis4Input()).to.match(/salesAnalysis4/);
      await salesOrderUpdatePage.setSalesAnalysis5Input('salesAnalysis5');
      expect(await salesOrderUpdatePage.getSalesAnalysis5Input()).to.match(/salesAnalysis5/);
      await salesOrderUpdatePage.setSalesAnalysis6Input('salesAnalysis6');
      expect(await salesOrderUpdatePage.getSalesAnalysis6Input()).to.match(/salesAnalysis6/);
      await salesOrderUpdatePage.setMemo1Input('memo1');
      expect(await salesOrderUpdatePage.getMemo1Input()).to.match(/memo1/);
      await salesOrderUpdatePage.setMemo2Input('memo2');
      expect(await salesOrderUpdatePage.getMemo2Input()).to.match(/memo2/);
      await salesOrderUpdatePage.setMemo3Input('memo3');
      expect(await salesOrderUpdatePage.getMemo3Input()).to.match(/memo3/);
      await salesOrderUpdatePage.setMemo4Input('memo4');
      expect(await salesOrderUpdatePage.getMemo4Input()).to.match(/memo4/);
      await salesOrderUpdatePage.setMemo5Input('memo5');
      expect(await salesOrderUpdatePage.getMemo5Input()).to.match(/memo5/);
      await salesOrderUpdatePage.setMemo6Input('memo6');
      expect(await salesOrderUpdatePage.getMemo6Input()).to.match(/memo6/);
      await salesOrderUpdatePage.setStockAnalysis01Input('stockAnalysis01');
      expect(await salesOrderUpdatePage.getStockAnalysis01Input()).to.match(/stockAnalysis01/);
      await salesOrderUpdatePage.setStockAnalysis02Input('stockAnalysis02');
      expect(await salesOrderUpdatePage.getStockAnalysis02Input()).to.match(/stockAnalysis02/);
      await salesOrderUpdatePage.setStockAnalysis03Input('stockAnalysis03');
      expect(await salesOrderUpdatePage.getStockAnalysis03Input()).to.match(/stockAnalysis03/);
      await salesOrderUpdatePage.setStockAnalysis04Input('stockAnalysis04');
      expect(await salesOrderUpdatePage.getStockAnalysis04Input()).to.match(/stockAnalysis04/);
      await salesOrderUpdatePage.setStockAnalysis05Input('stockAnalysis05');
      expect(await salesOrderUpdatePage.getStockAnalysis05Input()).to.match(/stockAnalysis05/);
      await salesOrderUpdatePage.setStockAnalysis06Input('stockAnalysis06');
      expect(await salesOrderUpdatePage.getStockAnalysis06Input()).to.match(/stockAnalysis06/);
      await salesOrderUpdatePage.setStockAnalysis07Input('stockAnalysis07');
      expect(await salesOrderUpdatePage.getStockAnalysis07Input()).to.match(/stockAnalysis07/);
      await salesOrderUpdatePage.setStockAnalysis08Input('stockAnalysis08');
      expect(await salesOrderUpdatePage.getStockAnalysis08Input()).to.match(/stockAnalysis08/);
      await salesOrderUpdatePage.setStockAnalysis09Input('stockAnalysis09');
      expect(await salesOrderUpdatePage.getStockAnalysis09Input()).to.match(/stockAnalysis09/);
      await salesOrderUpdatePage.setStockAnalysis10Input('stockAnalysis10');
      expect(await salesOrderUpdatePage.getStockAnalysis10Input()).to.match(/stockAnalysis10/);
      await salesOrderUpdatePage.setDeliveryCodeInput('deliveryCode');
      expect(await salesOrderUpdatePage.getDeliveryCodeInput()).to.match(/deliveryCode/);
      await salesOrderUpdatePage.setTransactionCodeInput('transactionCode');
      expect(await salesOrderUpdatePage.getTransactionCodeInput()).to.match(/transactionCode/);
      await salesOrderUpdatePage.setCodeInput('code');
      expect(await salesOrderUpdatePage.getCodeInput()).to.match(/code/);
      await salesOrderUpdatePage.setSalesOrderStatusCodeInput('salesOrderStatusCode');
      expect(await salesOrderUpdatePage.getSalesOrderStatusCodeInput()).to.match(/salesOrderStatusCode/);
      await salesOrderUpdatePage.setDespatchStatusIDInput('despatchStatusID');
      expect(await salesOrderUpdatePage.getDespatchStatusIDInput()).to.match(/despatchStatusID/);
      await salesOrderUpdatePage.setDivisionInput('division');
      expect(await salesOrderUpdatePage.getDivisionInput()).to.match(/division/);
      await salesOrderUpdatePage.setLineNumberInput('lineNumber');
      expect(await salesOrderUpdatePage.getLineNumberInput()).to.match(/lineNumber/);
      await salesOrderUpdatePage.setDespatchStatusCodeInput('despatchStatusCode');
      expect(await salesOrderUpdatePage.getDespatchStatusCodeInput()).to.match(/despatchStatusCode/);
      await salesOrderUpdatePage.setQuantityOrderedInput('5');
      expect(await salesOrderUpdatePage.getQuantityOrderedInput()).to.eq('5');
      await salesOrderUpdatePage.setQuantityOutstandingInput('5');
      expect(await salesOrderUpdatePage.getQuantityOutstandingInput()).to.eq('5');
      await salesOrderUpdatePage.setQuantityDespatchedInput('5');
      expect(await salesOrderUpdatePage.getQuantityDespatchedInput()).to.eq('5');
      await salesOrderUpdatePage.setDespatchDateInput('01-01-2001');
      expect(await salesOrderUpdatePage.getDespatchDateInput()).to.eq('2001-01-01');
      await salesOrderUpdatePage.setCustRequiredDateInput('01-01-2001');
      expect(await salesOrderUpdatePage.getCustRequiredDateInput()).to.eq('2001-01-01');
      await salesOrderUpdatePage.setUnitPriceInput('5');
      expect(await salesOrderUpdatePage.getUnitPriceInput()).to.eq('5');
      await salesOrderUpdatePage.setUnitPriceinBaseInput('5');
      expect(await salesOrderUpdatePage.getUnitPriceinBaseInput()).to.eq('5');
      await salesOrderUpdatePage.setLineDiscountPercentInput('5');
      expect(await salesOrderUpdatePage.getLineDiscountPercentInput()).to.eq('5');
      await salesOrderUpdatePage.setMarginPercentInput('5');
      expect(await salesOrderUpdatePage.getMarginPercentInput()).to.eq('5');
      await salesOrderUpdatePage.setLineTotalInput('5');
      expect(await salesOrderUpdatePage.getLineTotalInput()).to.eq('5');
      await salesOrderUpdatePage.setLineTotalinBaseInput('5');
      expect(await salesOrderUpdatePage.getLineTotalinBaseInput()).to.eq('5');
      await salesOrderUpdatePage.setTaxCodeInput('taxCode');
      expect(await salesOrderUpdatePage.getTaxCodeInput()).to.match(/taxCode/);
      await salesOrderUpdatePage.setNominalCodeInput('nominalCode');
      expect(await salesOrderUpdatePage.getNominalCodeInput()).to.match(/nominalCode/);
      const selectedOnHold = await salesOrderUpdatePage.getOnHoldInput().isSelected();
      if (selectedOnHold) {
        await salesOrderUpdatePage.getOnHoldInput().click();
        expect(await salesOrderUpdatePage.getOnHoldInput().isSelected()).to.be.false;
      } else {
        await salesOrderUpdatePage.getOnHoldInput().click();
        expect(await salesOrderUpdatePage.getOnHoldInput().isSelected()).to.be.true;
      }
      await salesOrderUpdatePage.setRCodeInput('rCode');
      expect(await salesOrderUpdatePage.getRCodeInput()).to.match(/rCode/);
      await salesOrderUpdatePage.setStandardMarginInput('5');
      expect(await salesOrderUpdatePage.getStandardMarginInput()).to.eq('5');
      await salesOrderUpdatePage.setDeliveryAddressInput('deliveryAddress');
      expect(await salesOrderUpdatePage.getDeliveryAddressInput()).to.match(/deliveryAddress/);
      await salesOrderUpdatePage.setDeliveryAddressDescriptionInput('deliveryAddressDescription');
      expect(await salesOrderUpdatePage.getDeliveryAddressDescriptionInput()).to.match(/deliveryAddressDescription/);
      await salesOrderUpdatePage.setDeliveryCountryCodeInput('deliveryCountryCode');
      expect(await salesOrderUpdatePage.getDeliveryCountryCodeInput()).to.match(/deliveryCountryCode/);
      await salesOrderUpdatePage.setSalesOrderStatusInput('salesOrderStatus');
      expect(await salesOrderUpdatePage.getSalesOrderStatusInput()).to.match(/salesOrderStatus/);
      await salesOrderUpdatePage.customerSelectLastOption();
      await waitUntilDisplayed(salesOrderUpdatePage.getSaveButton());
      await salesOrderUpdatePage.save();
      await waitUntilHidden(salesOrderUpdatePage.getSaveButton());
      expect(await salesOrderUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSalesOrder();
    await salesOrderComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await salesOrderComponentsPage.countDeleteButtons();
    await createSalesOrder();

    await salesOrderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await salesOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SalesOrder', async () => {
    await salesOrderComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await salesOrderComponentsPage.countDeleteButtons();
    await salesOrderComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    salesOrderDeleteDialog = new SalesOrderDeleteDialog();
    expect(await salesOrderDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.salesOrder.delete.question/);
    await salesOrderDeleteDialog.clickOnConfirmButton();

    await salesOrderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await salesOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
