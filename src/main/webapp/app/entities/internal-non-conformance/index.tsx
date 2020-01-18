import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InternalNonConformance from './internal-non-conformance';
import InternalNonConformanceDetail from './internal-non-conformance-detail';
import InternalNonConformanceUpdate from './internal-non-conformance-update';
import InternalNonConformanceDeleteDialog from './internal-non-conformance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InternalNonConformanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InternalNonConformanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InternalNonConformanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={InternalNonConformance} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={InternalNonConformanceDeleteDialog} />
  </>
);

export default Routes;
