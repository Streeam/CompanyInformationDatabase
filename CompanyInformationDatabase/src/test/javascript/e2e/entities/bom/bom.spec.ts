import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BomComponentsPage, { BomDeleteDialog } from './bom.page-object';
import BomUpdatePage from './bom-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Bom e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bomComponentsPage: BomComponentsPage;
  let bomUpdatePage: BomUpdatePage;
  let bomDeleteDialog: BomDeleteDialog;

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

  it('should load Boms', async () => {
    await navBarPage.getEntityPage('bom');
    bomComponentsPage = new BomComponentsPage();
    expect(await bomComponentsPage.getTitle().getText()).to.match(/Boms/);
  });

  it('should load create Bom page', async () => {
    await bomComponentsPage.clickOnCreateButton();
    bomUpdatePage = new BomUpdatePage();
    expect(await bomUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Bom/);
    await bomUpdatePage.cancel();
  });

  it('should create and save Boms', async () => {
    async function createBom() {
      await bomComponentsPage.clickOnCreateButton();
      await bomUpdatePage.setQuantityInput('5');
      expect(await bomUpdatePage.getQuantityInput()).to.eq('5');
      await bomUpdatePage.setSequenceNumberInput('5');
      expect(await bomUpdatePage.getSequenceNumberInput()).to.eq('5');
      await bomUpdatePage.setPartNumberInput('partNumber');
      expect(await bomUpdatePage.getPartNumberInput()).to.match(/partNumber/);
      await bomUpdatePage.setChildPartNumberInput('childPartNumber');
      expect(await bomUpdatePage.getChildPartNumberInput()).to.match(/childPartNumber/);
      await bomUpdatePage.setUniqueIdentifierInput('uniqueIdentifier');
      expect(await bomUpdatePage.getUniqueIdentifierInput()).to.match(/uniqueIdentifier/);
      await waitUntilDisplayed(bomUpdatePage.getSaveButton());
      await bomUpdatePage.save();
      await waitUntilHidden(bomUpdatePage.getSaveButton());
      expect(await bomUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createBom();
    await bomComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await bomComponentsPage.countDeleteButtons();
    await createBom();

    await bomComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await bomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Bom', async () => {
    await bomComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await bomComponentsPage.countDeleteButtons();
    await bomComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    bomDeleteDialog = new BomDeleteDialog();
    expect(await bomDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.bom.delete.question/);
    await bomDeleteDialog.clickOnConfirmButton();

    await bomComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await bomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
