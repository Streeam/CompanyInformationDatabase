import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AuditNonConformance from './audit-non-conformance';
import AuditNonConformanceDetail from './audit-non-conformance-detail';
import AuditNonConformanceUpdate from './audit-non-conformance-update';
import AuditNonConformanceDeleteDialog from './audit-non-conformance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AuditNonConformanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AuditNonConformanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AuditNonConformanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={AuditNonConformance} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AuditNonConformanceDeleteDialog} />
  </>
);

export default Routes;
