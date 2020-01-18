import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SupplierNonConformance from './supplier-non-conformance';
import SupplierNonConformanceDetail from './supplier-non-conformance-detail';
import SupplierNonConformanceUpdate from './supplier-non-conformance-update';
import SupplierNonConformanceDeleteDialog from './supplier-non-conformance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SupplierNonConformanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SupplierNonConformanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SupplierNonConformanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={SupplierNonConformance} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SupplierNonConformanceDeleteDialog} />
  </>
);

export default Routes;
