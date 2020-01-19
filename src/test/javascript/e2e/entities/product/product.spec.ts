import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProductComponentsPage, { ProductDeleteDialog } from './product.page-object';
import ProductUpdatePage from './product-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Product e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productComponentsPage: ProductComponentsPage;
  let productUpdatePage: ProductUpdatePage;
  let productDeleteDialog: ProductDeleteDialog;

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

  it('should load Products', async () => {
    await navBarPage.getEntityPage('product');
    productComponentsPage = new ProductComponentsPage();
    expect(await productComponentsPage.getTitle().getText()).to.match(/Products/);
  });

  it('should load create Product page', async () => {
    await productComponentsPage.clickOnCreateButton();
    productUpdatePage = new ProductUpdatePage();
    expect(await productUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Product/);
    await productUpdatePage.cancel();
  });

  it('should create and save Products', async () => {
    async function createProduct() {
      await productComponentsPage.clickOnCreateButton();
      await productUpdatePage.setPartNumberInput('partNumber');
      expect(await productUpdatePage.getPartNumberInput()).to.match(/partNumber/);
      await productUpdatePage.setPartDescriptionInput('partDescription');
      expect(await productUpdatePage.getPartDescriptionInput()).to.match(/partDescription/);
      await productUpdatePage.setReleaseDateInput('01-01-2001');
      expect(await productUpdatePage.getReleaseDateInput()).to.eq('2001-01-01');
      await productUpdatePage.setProductGroupCodeInput('productGroupCode');
      expect(await productUpdatePage.getProductGroupCodeInput()).to.match(/productGroupCode/);
      await productUpdatePage.setSiteInput('site');
      expect(await productUpdatePage.getSiteInput()).to.match(/site/);
      await productUpdatePage.setDepartamentInput('departament');
      expect(await productUpdatePage.getDepartamentInput()).to.match(/departament/);
      await productUpdatePage.setMethodTypeInput('methodType');
      expect(await productUpdatePage.getMethodTypeInput()).to.match(/methodType/);
      await productUpdatePage.setMethodStatusInput('methodStatus');
      expect(await productUpdatePage.getMethodStatusInput()).to.match(/methodStatus/);
      const selectedPrime = await productUpdatePage.getPrimeInput().isSelected();
      if (selectedPrime) {
        await productUpdatePage.getPrimeInput().click();
        expect(await productUpdatePage.getPrimeInput().isSelected()).to.be.false;
      } else {
        await productUpdatePage.getPrimeInput().click();
        expect(await productUpdatePage.getPrimeInput().isSelected()).to.be.true;
      }
      await productUpdatePage.setUnitOfMeasureInput('unitOfMeasure');
      expect(await productUpdatePage.getUnitOfMeasureInput()).to.match(/unitOfMeasure/);
      await productUpdatePage.setSupplierPartNumberInput('supplierPartNumber');
      expect(await productUpdatePage.getSupplierPartNumberInput()).to.match(/supplierPartNumber/);
      await productUpdatePage.setSupplierPartDescriptionInput('supplierPartDescription');
      expect(await productUpdatePage.getSupplierPartDescriptionInput()).to.match(/supplierPartDescription/);
      await productUpdatePage.setCurencyInput('curency');
      expect(await productUpdatePage.getCurencyInput()).to.match(/curency/);
      await productUpdatePage.setLeadTimeInput('5');
      expect(await productUpdatePage.getLeadTimeInput()).to.eq('5');
      await productUpdatePage.setMinQuantityInput('5');
      expect(await productUpdatePage.getMinQuantityInput()).to.eq('5');
      await productUpdatePage.setLatestUnitMaterialCostInput('5');
      expect(await productUpdatePage.getLatestUnitMaterialCostInput()).to.eq('5');
      await productUpdatePage.setCostInSupplierCurrencyInput('5');
      expect(await productUpdatePage.getCostInSupplierCurrencyInput()).to.eq('5');
      await productUpdatePage.setSupplierPriceInput('5');
      expect(await productUpdatePage.getSupplierPriceInput()).to.eq('5');
      await productUpdatePage.setCostInBaseCurrencyInput('5');
      expect(await productUpdatePage.getCostInBaseCurrencyInput()).to.eq('5');
      await productUpdatePage.setScrapPercentageInput('5');
      expect(await productUpdatePage.getScrapPercentageInput()).to.eq('5');
      await productUpdatePage.setOnHandStockInput('5');
      expect(await productUpdatePage.getOnHandStockInput()).to.eq('5');
      await productUpdatePage.setStandardComponentCostInput('5');
      expect(await productUpdatePage.getStandardComponentCostInput()).to.eq('5');
      await productUpdatePage.setStandardSubContractCostInput('5');
      expect(await productUpdatePage.getStandardSubContractCostInput()).to.eq('5');
      await productUpdatePage.setStandardUnitMaterialCostInput('5');
      expect(await productUpdatePage.getStandardUnitMaterialCostInput()).to.eq('5');
      await productUpdatePage.setStandardSetCostInput('5');
      expect(await productUpdatePage.getStandardSetCostInput()).to.eq('5');
      await productUpdatePage.setStandardRunCostInput('5');
      expect(await productUpdatePage.getStandardRunCostInput()).to.eq('5');
      await productUpdatePage.setStandardLandedCost1Input('5');
      expect(await productUpdatePage.getStandardLandedCost1Input()).to.eq('5');
      await productUpdatePage.setStandardLandedCost2Input('5');
      expect(await productUpdatePage.getStandardLandedCost2Input()).to.eq('5');
      await productUpdatePage.setStandardLandedCost3Input('5');
      expect(await productUpdatePage.getStandardLandedCost3Input()).to.eq('5');
      await productUpdatePage.setComment1Input('comment1');
      expect(await productUpdatePage.getComment1Input()).to.match(/comment1/);
      await productUpdatePage.setComment2Input('comment2');
      expect(await productUpdatePage.getComment2Input()).to.match(/comment2/);
      await productUpdatePage.setComment3Input('comment3');
      expect(await productUpdatePage.getComment3Input()).to.match(/comment3/);
      await productUpdatePage.setReviewDate1Input('01-01-2001');
      expect(await productUpdatePage.getReviewDate1Input()).to.eq('2001-01-01');
      await productUpdatePage.setReviewDate2Input('01-01-2001');
      expect(await productUpdatePage.getReviewDate2Input()).to.eq('2001-01-01');
      await productUpdatePage.setReviewDate3Input('01-01-2001');
      expect(await productUpdatePage.getReviewDate3Input()).to.eq('2001-01-01');
      await productUpdatePage.setStandardTotalCostInput('5');
      expect(await productUpdatePage.getStandardTotalCostInput()).to.eq('5');
      await productUpdatePage.setMinBarchSizeInput('5');
      expect(await productUpdatePage.getMinBarchSizeInput()).to.eq('5');
      const selectedObsolete = await productUpdatePage.getObsoleteInput().isSelected();
      if (selectedObsolete) {
        await productUpdatePage.getObsoleteInput().click();
        expect(await productUpdatePage.getObsoleteInput().isSelected()).to.be.false;
      } else {
        await productUpdatePage.getObsoleteInput().click();
        expect(await productUpdatePage.getObsoleteInput().isSelected()).to.be.true;
      }
      await productUpdatePage.setOrderMultiplerInput('5');
      expect(await productUpdatePage.getOrderMultiplerInput()).to.eq('5');
      // productUpdatePage.bomSelectLastOption();
      // productUpdatePage.routingsSelectLastOption();
      await productUpdatePage.salesOrderSelectLastOption();
      await waitUntilDisplayed(productUpdatePage.getSaveButton());
      await productUpdatePage.save();
      await waitUntilHidden(productUpdatePage.getSaveButton());
      expect(await productUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProduct();
    await productComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await productComponentsPage.countDeleteButtons();
    await createProduct();

    await productComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Product', async () => {
    await productComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await productComponentsPage.countDeleteButtons();
    await productComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    productDeleteDialog = new ProductDeleteDialog();
    expect(await productDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.product.delete.question/);
    await productDeleteDialog.clickOnConfirmButton();

    await productComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
