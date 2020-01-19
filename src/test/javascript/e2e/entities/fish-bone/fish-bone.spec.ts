import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FishBoneComponentsPage, { FishBoneDeleteDialog } from './fish-bone.page-object';
import FishBoneUpdatePage from './fish-bone-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('FishBone e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fishBoneComponentsPage: FishBoneComponentsPage;
  let fishBoneUpdatePage: FishBoneUpdatePage;
  let fishBoneDeleteDialog: FishBoneDeleteDialog;

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

  it('should load FishBones', async () => {
    await navBarPage.getEntityPage('fish-bone');
    fishBoneComponentsPage = new FishBoneComponentsPage();
    expect(await fishBoneComponentsPage.getTitle().getText()).to.match(/Fish Bones/);
  });

  it('should load create FishBone page', async () => {
    await fishBoneComponentsPage.clickOnCreateButton();
    fishBoneUpdatePage = new FishBoneUpdatePage();
    expect(await fishBoneUpdatePage.getPageTitle().getText()).to.match(/Create or edit a FishBone/);
    await fishBoneUpdatePage.cancel();
  });

  it('should create and save FishBones', async () => {
    async function createFishBone() {
      await fishBoneComponentsPage.clickOnCreateButton();
      await fishBoneUpdatePage.fishboneTypesSelectLastOption();
      await fishBoneUpdatePage.setSubCategoryInput('subCategory');
      expect(await fishBoneUpdatePage.getSubCategoryInput()).to.match(/subCategory/);
      await fishBoneUpdatePage.setRootCauseIdInput('5');
      expect(await fishBoneUpdatePage.getRootCauseIdInput()).to.eq('5');
      await waitUntilDisplayed(fishBoneUpdatePage.getSaveButton());
      await fishBoneUpdatePage.save();
      await waitUntilHidden(fishBoneUpdatePage.getSaveButton());
      expect(await fishBoneUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createFishBone();
    await fishBoneComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await fishBoneComponentsPage.countDeleteButtons();
    await createFishBone();

    await fishBoneComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await fishBoneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last FishBone', async () => {
    await fishBoneComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await fishBoneComponentsPage.countDeleteButtons();
    await fishBoneComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    fishBoneDeleteDialog = new FishBoneDeleteDialog();
    expect(await fishBoneDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.fishBone.delete.question/);
    await fishBoneDeleteDialog.clickOnConfirmButton();

    await fishBoneComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await fishBoneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
