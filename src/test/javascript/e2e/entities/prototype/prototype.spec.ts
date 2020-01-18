import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrototypeComponentsPage, { PrototypeDeleteDialog } from './prototype.page-object';
import PrototypeUpdatePage from './prototype-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Prototype e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prototypeComponentsPage: PrototypeComponentsPage;
  let prototypeUpdatePage: PrototypeUpdatePage;
  let prototypeDeleteDialog: PrototypeDeleteDialog;

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

  it('should load Prototypes', async () => {
    await navBarPage.getEntityPage('prototype');
    prototypeComponentsPage = new PrototypeComponentsPage();
    expect(await prototypeComponentsPage.getTitle().getText()).to.match(/Prototypes/);
  });

  it('should load create Prototype page', async () => {
    await prototypeComponentsPage.clickOnCreateButton();
    prototypeUpdatePage = new PrototypeUpdatePage();
    expect(await prototypeUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Prototype/);
    await prototypeUpdatePage.cancel();
  });

  it('should create and save Prototypes', async () => {
    async function createPrototype() {
      await prototypeComponentsPage.clickOnCreateButton();
      await prototypeUpdatePage.statusSelectLastOption();
      await prototypeUpdatePage.setDeadlineInput('01-01-2001');
      expect(await prototypeUpdatePage.getDeadlineInput()).to.eq('2001-01-01');
      await prototypeUpdatePage.prioritySelectLastOption();
      await prototypeUpdatePage.setProposedDateInput('01-01-2001');
      expect(await prototypeUpdatePage.getProposedDateInput()).to.eq('2001-01-01');
      await prototypeUpdatePage.setProgressInput('5');
      expect(await prototypeUpdatePage.getProgressInput()).to.eq('5');
      await waitUntilDisplayed(prototypeUpdatePage.getSaveButton());
      await prototypeUpdatePage.save();
      await waitUntilHidden(prototypeUpdatePage.getSaveButton());
      expect(await prototypeUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createPrototype();
    await prototypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await prototypeComponentsPage.countDeleteButtons();
    await createPrototype();

    await prototypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await prototypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Prototype', async () => {
    await prototypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await prototypeComponentsPage.countDeleteButtons();
    await prototypeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    prototypeDeleteDialog = new PrototypeDeleteDialog();
    expect(await prototypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.prototype.delete.question/);
    await prototypeDeleteDialog.clickOnConfirmButton();

    await prototypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await prototypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
