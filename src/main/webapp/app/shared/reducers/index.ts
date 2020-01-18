import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import product, {
  ProductState
} from 'app/entities/product/product.reducer';
// prettier-ignore
import image, {
  ImageState
} from 'app/entities/image/image.reducer';
// prettier-ignore
import drawing, {
  DrawingState
} from 'app/entities/drawing/drawing.reducer';
// prettier-ignore
import version, {
  VersionState
} from 'app/entities/version/version.reducer';
// prettier-ignore
import routing, {
  RoutingState
} from 'app/entities/routing/routing.reducer';
// prettier-ignore
import supplier, {
  SupplierState
} from 'app/entities/supplier/supplier.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import amendment, {
  AmendmentState
} from 'app/entities/amendment/amendment.reducer';
// prettier-ignore
import prototype, {
  PrototypeState
} from 'app/entities/prototype/prototype.reducer';
// prettier-ignore
import nonConformanceType, {
  NonConformanceTypeState
} from 'app/entities/non-conformance-type/non-conformance-type.reducer';
// prettier-ignore
import progressTrack, {
  ProgressTrackState
} from 'app/entities/progress-track/progress-track.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from 'app/entities/notification/notification.reducer';
// prettier-ignore
import roles, {
  RolesState
} from 'app/entities/roles/roles.reducer';
// prettier-ignore
import bom, {
  BomState
} from 'app/entities/bom/bom.reducer';
// prettier-ignore
import purchaseRequestChild, {
  PurchaseRequestChildState
} from 'app/entities/purchase-request-child/purchase-request-child.reducer';
// prettier-ignore
import purchaseRequestParent, {
  PurchaseRequestParentState
} from 'app/entities/purchase-request-parent/purchase-request-parent.reducer';
// prettier-ignore
import salesOrder, {
  SalesOrderState
} from 'app/entities/sales-order/sales-order.reducer';
import actionToBeTaken, { ActionToBeTakenState } from 'app/entities/action-to-be-taken/action-to-be-taken.reducer';
import shortTermAction, { ShortTermActionState } from 'app/entities/short-term-action/short-term-action.reducer';
import longTermAction, { LongTermActionState } from 'app/entities/long-term-action/long-term-action.reducer';
// prettier-ignore
import supplierNonConformance, {
  SupplierNonConformanceState
} from 'app/entities/supplier-non-conformance/supplier-non-conformance.reducer';
// prettier-ignore
import auditNonConformance, {
  AuditNonConformanceState
} from 'app/entities/audit-non-conformance/audit-non-conformance.reducer';
// prettier-ignore
import clientNonConformance, {
  ClientNonConformanceState
} from 'app/entities/client-non-conformance/client-non-conformance.reducer';
// prettier-ignore
import extraRoutings, { ExtraRoutingsState } from 'app/entities/extra-routings/extra-routings.reducer';
// prettier-ignore
import extraBoms, { ExtraBomsState } from 'app/entities/extra-boms/extra-boms.reducer';
// prettier-ignore
import nonConformanceDetails, {
  NonConformanceDetailsState
} from 'app/entities/non-conformance-details/non-conformance-details.reducer';
// prettier-ignore
import internalNonConformance, {
  InternalNonConformanceState
} from 'app/entities/internal-non-conformance/internal-non-conformance.reducer';
// prettier-ignore
import site, {
  SiteState
} from 'app/entities/site/site.reducer';
// prettier-ignore
import department, {
  DepartmentState
} from 'app/entities/department/department.reducer';
// prettier-ignore
import task, {
  TaskState
} from 'app/entities/task/task.reducer';
// prettier-ignore
import afterSaleExpenses, { AfterSaleExpensesState } from 'app/entities/after-sale-expenses/after-sale-expenses.reducer';
// prettier-ignore
import fishBone, { FishBoneState } from 'app/entities/fish-bone/fish-bone.reducer';
// prettier-ignore
import processAuditChecklist, { ProcessAuditChecklistState } from 'app/entities/process-audit-checklist/process-audit-checklist.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly company: CompanyState;
  readonly customer: CustomerState;
  readonly product: ProductState;
  readonly image: ImageState;
  readonly drawing: DrawingState;
  readonly version: VersionState;
  readonly routing: RoutingState;
  readonly supplier: SupplierState;
  readonly employee: EmployeeState;
  readonly amendment: AmendmentState;
  readonly prototype: PrototypeState;
  readonly nonConformanceDetails: NonConformanceDetailsState;
  readonly nonConformanceType: NonConformanceTypeState;
  readonly internalNonConformance: InternalNonConformanceState;
  readonly supplierNonConformance: SupplierNonConformanceState;
  readonly auditNonConformance: AuditNonConformanceState;
  readonly clientNonConformance: ClientNonConformanceState;
  readonly task: TaskState;
  readonly progressTrack: ProgressTrackState;
  readonly notification: NotificationState;
  readonly roles: RolesState;
  readonly bom: BomState;
  readonly purchaseRequestChild: PurchaseRequestChildState;
  readonly purchaseRequestParent: PurchaseRequestParentState;
  readonly salesOrder: SalesOrderState;
  readonly actionToBeTaken: ActionToBeTakenState;
  readonly shortTermAction: ShortTermActionState;
  readonly longTermAction: LongTermActionState;
  readonly site: SiteState;
  readonly department: DepartmentState;
  readonly extraRoutings: ExtraRoutingsState;
  readonly extraBoms: ExtraBomsState;
  readonly afterSaleExpenses: AfterSaleExpensesState;
  readonly fishBone: FishBoneState;
  readonly processAuditChecklist: ProcessAuditChecklistState;
  // readonly loadingBar: any;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  company,
  customer,
  product,
  image,
  drawing,
  version,
  routing,
  supplier,
  employee,
  amendment,
  prototype,
  nonConformanceDetails,
  nonConformanceType,
  internalNonConformance,
  supplierNonConformance,
  auditNonConformance,
  clientNonConformance,
  task,
  progressTrack,
  notification,
  roles,
  bom,
  purchaseRequestChild,
  purchaseRequestParent,
  salesOrder,
  actionToBeTaken,
  shortTermAction,
  longTermAction,
  site,
  department,
  extraRoutings,
  // loadingBar,
  extraBoms,
  afterSaleExpenses,
  fishBone,
  processAuditChecklist
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
});

export default rootReducer;
