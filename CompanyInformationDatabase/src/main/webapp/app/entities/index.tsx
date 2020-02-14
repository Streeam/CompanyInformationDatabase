import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Company from './company';
import Customer from './customer';
import Product from './product';
import Image from './image';
import Drawing from './drawing';
import Version from './version';
import Routing from './routing';
import Supplier from './supplier';
import Employee from './employee';
import Amendment from './amendment';
import Prototype from './prototype';
import NonConformanceDetails from './non-conformance-details';
import NonConformanceType from './non-conformance-type';
import ShortTermAction from './short-term-action';
import ActionToBeTaken from './action-to-be-taken';
import LongTermAction from './long-term-action';
import InternalNonConformance from './internal-non-conformance';
import SupplierNonConformance from './supplier-non-conformance';
import AuditNonConformance from './audit-non-conformance';
import ClientNonConformance from './client-non-conformance';
import Task from './task';
import ProgressTrack from './progress-track';
import Notification from './notification';
import Roles from './roles';
import Bom from './bom';
import PurchaseRequestChild from './purchase-request-child';
import PurchaseRequestParent from './purchase-request-parent';
import SalesOrder from './sales-order';
import Site from './site';

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}/customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}/product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}/image`} component={Image} />
      <ErrorBoundaryRoute path={`${match.url}/drawing`} component={Drawing} />
      <ErrorBoundaryRoute path={`${match.url}/version`} component={Version} />
      <ErrorBoundaryRoute path={`${match.url}/routing`} component={Routing} />
      <ErrorBoundaryRoute path={`${match.url}/supplier`} component={Supplier} />
      <ErrorBoundaryRoute path={`${match.url}/employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}/amendment`} component={Amendment} />
      <ErrorBoundaryRoute path={`${match.url}/prototype`} component={Prototype} />
      <ErrorBoundaryRoute path={`${match.url}/non-conformance-details`} component={NonConformanceDetails} />
      <ErrorBoundaryRoute path={`${match.url}/non-conformance-type`} component={NonConformanceType} />
      <ErrorBoundaryRoute path={`${match.url}/action-to-be-taken`} component={ActionToBeTaken} />
      <ErrorBoundaryRoute path={`${match.url}/short-term-action`} component={ShortTermAction} />
      <ErrorBoundaryRoute path={`${match.url}/long-term-action`} component={LongTermAction} />
      <ErrorBoundaryRoute path={`${match.url}/internal-non-conformance`} component={InternalNonConformance} />
      <ErrorBoundaryRoute path={`${match.url}/supplier-non-conformance`} component={SupplierNonConformance} />
      <ErrorBoundaryRoute path={`${match.url}/audit-non-conformance`} component={AuditNonConformance} />
      <ErrorBoundaryRoute path={`${match.url}/client-non-conformance`} component={ClientNonConformance} />
      <ErrorBoundaryRoute path={`${match.url}/task`} component={Task} />
      <ErrorBoundaryRoute path={`${match.url}/progress-track`} component={ProgressTrack} />
      <ErrorBoundaryRoute path={`${match.url}/notification`} component={Notification} />
      <ErrorBoundaryRoute path={`${match.url}/roles`} component={Roles} />
      <ErrorBoundaryRoute path={`${match.url}/bom`} component={Bom} />
      <ErrorBoundaryRoute path={`${match.url}/purchase-request-child`} component={PurchaseRequestChild} />
      <ErrorBoundaryRoute path={`${match.url}/purchase-request-parent`} component={PurchaseRequestParent} />
      <ErrorBoundaryRoute path={`${match.url}/sales-order`} component={SalesOrder} />
      <ErrorBoundaryRoute path={`${match.url}/site`} component={Site} />
    </Switch>
  </div>
);

export default Routes;
