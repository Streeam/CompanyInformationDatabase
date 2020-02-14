import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RoutingComponentsPage, { RoutingDeleteDialog } from './routing.page-object';
import RoutingUpdatePage from './routing-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Routing e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let routingComponentsPage: RoutingComponentsPage;
  let routingUpdatePage: RoutingUpdatePage;
  let routingDeleteDialog: RoutingDeleteDialog;

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

  it('should load Routings', async () => {
    await navBarPage.getEntityPage('routing');
    routingComponentsPage = new RoutingComponentsPage();
    expect(await routingComponentsPage.getTitle().getText()).to.match(/Routings/);
  });

  it('should load create Routing page', async () => {
    await routingComponentsPage.clickOnCreateButton();
    routingUpdatePage = new RoutingUpdatePage();
    expect(await routingUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Routing/);
    await routingUpdatePage.cancel();
  });

  it('should create and save Routings', async () => {
    async function createRouting() {
      await routingComponentsPage.clickOnCreateButton();
      await routingUpdatePage.setResourceNameInput('resourceName');
      expect(await routingUpdatePage.getResourceNameInput()).to.match(/resourceName/);
      await routingUpdatePage.setResourceTypeInput('resourceType');
      expect(await routingUpdatePage.getResourceTypeInput()).to.match(/resourceType/);
      await routingUpdatePage.setUnitRunTimeInput('5');
      expect(await routingUpdatePage.getUnitRunTimeInput()).to.eq('5');
      await routingUpdatePage.setPartNumberInput('partNumber');
      expect(await routingUpdatePage.getPartNumberInput()).to.match(/partNumber/);
      await routingUpdatePage.setLayoutTimeInput('5');
      expect(await routingUpdatePage.getLayoutTimeInput()).to.eq('5');
      await routingUpdatePage.setUniqueIdentifierInput('uniqueIdentifier');
      expect(await routingUpdatePage.getUniqueIdentifierInput()).to.match(/uniqueIdentifier/);
      await waitUntilDisplayed(routingUpdatePage.getSaveButton());
      await routingUpdatePage.save();
      await waitUntilHidden(routingUpdatePage.getSaveButton());
      expect(await routingUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createRouting();
    await routingComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await routingComponentsPage.countDeleteButtons();
    await createRouting();

    await routingComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await routingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Routing', async () => {
    await routingComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await routingComponentsPage.countDeleteButtons();
    await routingComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    routingDeleteDialog = new RoutingDeleteDialog();
    expect(await routingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.routing.delete.question/);
    await routingDeleteDialog.clickOnConfirmButton();

    await routingComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await routingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
