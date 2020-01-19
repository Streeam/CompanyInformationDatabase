import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeComponentsPage, { EmployeeDeleteDialog } from './employee.page-object';
import EmployeeUpdatePage from './employee-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Employee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeComponentsPage: EmployeeComponentsPage;
  let employeeUpdatePage: EmployeeUpdatePage;
  /* let employeeDeleteDialog: EmployeeDeleteDialog; */
  const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

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

  it('should load Employees', async () => {
    await navBarPage.getEntityPage('employee');
    employeeComponentsPage = new EmployeeComponentsPage();
    expect(await employeeComponentsPage.getTitle().getText()).to.match(/Employees/);
  });

  it('should load create Employee page', async () => {
    await employeeComponentsPage.clickOnCreateButton();
    employeeUpdatePage = new EmployeeUpdatePage();
    expect(await employeeUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Employee/);
    await employeeUpdatePage.cancel();
  });

  /*  it('should create and save Employees', async () => {
        async function createEmployee() {
            await employeeComponentsPage.clickOnCreateButton();
            await employeeUpdatePage.setImageInput(absolutePath);
            await employeeUpdatePage.setJobTitleInput('jobTitle');
            expect(await employeeUpdatePage.getJobTitleInput()).to.match(/jobTitle/);
            await employeeUpdatePage.setHiredDateInput('01-01-2001');
            expect(await employeeUpdatePage.getHiredDateInput()).to.eq('2001-01-01');
            await employeeUpdatePage.userSelectLastOption();
            await employeeUpdatePage.roleSelectLastOption();
            // employeeUpdatePage.internalNonConformanceSelectLastOption();
            await waitUntilDisplayed(employeeUpdatePage.getSaveButton());
            await employeeUpdatePage.save();
            await waitUntilHidden(employeeUpdatePage.getSaveButton());
            expect(await employeeUpdatePage.getSaveButton().isPresent()).to.be.false;
        }

        await createEmployee();
        await employeeComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeCreate = await employeeComponentsPage.countDeleteButtons();
        await createEmployee();

        await employeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    }); */

  /*  it('should delete last Employee', async () => {
        await employeeComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await employeeComponentsPage.countDeleteButtons();
        await employeeComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        employeeDeleteDialog = new EmployeeDeleteDialog();
        expect(await employeeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cidApp.employee.delete.question/);
        await employeeDeleteDialog.clickOnConfirmButton();

        await employeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
