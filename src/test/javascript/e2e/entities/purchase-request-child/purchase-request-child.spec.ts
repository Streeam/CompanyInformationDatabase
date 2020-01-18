import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PurchaseRequestChildComponentsPage, { PurchaseRequestChildDeleteDialog } from './purchase-request-child.page-object';
import PurchaseRequestChildUpdatePage from './purchase-request-child-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('PurchaseRequestChild e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let purchaseRequestChildComponentsPage: PurchaseRequestChildComponentsPage;
  let purchaseRequestChildUpdatePage: PurchaseRequestChildUpdatePage;
  /* let purchaseRequestChildDeleteDialog: PurchaseRequestChildDeleteDialog; */

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

  it('should load PurchaseRequestChildren', async () => {
    await navBarPage.getEntityPage('purchase-request-child');
    purchaseRequestChildComponentsPage = new PurchaseRequestChildComponentsPage();
    expect(await purchaseRequestChildComponentsPage.getTitle().getText()).to.match(/Purchase Request Children/);
  });

  it('should load create PurchaseRequestChild page', async () => {
    await purchaseRequestChildComponentsPage.clickOnCreateButton();
    purchaseRequestChildUpdatePage = new PurchaseRequestChildUpdatePage();
    expect(await purchaseRequestChildUpdatePage.getPageTitle().getText()).to.match(/Create or edit a PurchaseRequestChild/);
    await purchaseRequestChildUpdatePage.cancel();
  });

  /*  it('should create and save PurchaseRequestChildren', async () => {
        async function createPurchaseRequestChild() {
            await purchaseRequestChildComponentsPage.clickOnCreateButton();
            await purchaseRequestChildUpdatePage.setQuantityInput('5');
            expect(await purchaseRequestChildUpdatePage.getQuantityInput()).to.eq('5');
            await purchaseRequestChildUpdatePage.setOrderedDateInput('01-01-2001');
            expect(await purchaseRequestChildUpdatePage.getOrderedDateInput()).to.eq('2001-01-01');
            await purchaseRequestChildUpdatePage.setDueDateInput('01-01-2001');
            expect(await purchaseRequestChildUpdatePage.getDueDateInput()).to.eq('2001-01-01');
            const selectedCommited = await purchaseRequestChildUpdatePage.getCommitedInput().isSelected();
            if (selectedCommited) {
                await purchaseRequestChildUpdatePage.getCommitedInput().click();
                expect(await purchaseRequestChildUpdatePage.getCommitedInput().isSelected()).to.be.false;
            } else {
                await purchaseRequestChildUpdatePage.getCommitedInput().click();
                expect(await purchaseRequestChildUpdatePage.getCommitedInput().isSelected()).to.be.true;
            }
            await purchaseRequestChildUpdatePage.statusSelectLastOption();
            await purchaseRequestChildUpdatePage.setCommentInput('comment');
            expect(await purchaseRequestChildUpdatePage.getCommentInput()).to.match(/comment/);
            await purchaseRequestChildUpdatePage.productSelectLastOption();
            await purchaseRequestChildUpdatePage.purchaseRequestParentSelectLastOption();
            await purchaseRequestChildUpdatePage.salesOrderSelectLastOption();
            await waitUntilDisplayed(purchaseRequestChildUpdatePage.getSaveButton());
            await purchaseRequestChildUpdatePage.save();
            await waitUntilHidden(purchaseRequestChildUpdatePage.getSaveButton());
            expect(await purchaseRequestChildUpdatePage.getSaveButton().isPresent()).to.be.false;
        }

        await createPurchaseRequestChild();
        await purchaseRequestChildComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeCreate = await purchaseRequestChildComponentsPage.countDeleteButtons();
        await createPurchaseRequestChild();

        await purchaseRequestChildComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await purchaseRequestChildComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    }); */

  /*  it('should delete last PurchaseRequestChild', async () => {
        await purchaseRequestChildComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await purchaseRequestChildComponentsPage.countDeleteButtons();
        await purchaseRequestChildComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        purchaseRequestChildDeleteDialog = new PurchaseRequestChildDeleteDialog();
        expect(await purchaseRequestChildDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.purchaseRequestChild.delete.question/);
        await purchaseRequestChildDeleteDialog.clickOnConfirmButton();

        await purchaseRequestChildComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await purchaseRequestChildComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
