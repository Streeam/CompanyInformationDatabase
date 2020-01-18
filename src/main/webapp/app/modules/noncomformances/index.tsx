import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CreateNonconformance from './create-parent-nonconformances/create-nonconformances';
import CreateInternalNonconformance from './create-child-nonconformances/create-internal-nonconformances/create-internal-nonconformances';
import CreateCustomerNonconformance from './create-child-nonconformances/create-customer-nonconformances/create-customer-nonconformances';
import NonconformancesMain from './nonconformance-log/non-conformances-grid';
import NonConformance from './create-parent-nonconformances/view-non-conformances';
import InternalNonConformance from './create-child-nonconformances/create-internal-nonconformances/view-internal-non-conformace/view-internal-non-conformances';
import CustomerNonConformance from './create-child-nonconformances/create-customer-nonconformances/view-customer-non-conformace/view-customer-non-conformances';
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:nonconformaceId/internal/new`} component={CreateInternalNonconformance} />
      <ErrorBoundaryRoute exact path={`${match.url}/:nonconformaceId/internal/edit/:id`} component={CreateInternalNonconformance} />
      <ErrorBoundaryRoute exact path={`${match.url}/:nonconformaceId/internal/:id`} component={InternalNonConformance} />
      <ErrorBoundaryRoute exact path={`${match.url}/:nonconformaceId/customer/new`} component={CreateCustomerNonconformance} />
      <ErrorBoundaryRoute exact path={`${match.url}/:nonconformaceId/customer/edit/:id`} component={CreateCustomerNonconformance} />
      <ErrorBoundaryRoute exact path={`${match.url}/:nonconformaceId/customer/:id`} component={CustomerNonConformance} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreateNonconformance} />
      <ErrorBoundaryRoute exact path={`${match.url}/edit/:id`} component={CreateNonconformance} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NonConformance} />
      <ErrorBoundaryRoute exact path={`${match.url}`} component={NonconformancesMain} />
    </Switch>
  </>
);

export default Routes;
