import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClientNonConformance from './client-non-conformance';
import ClientNonConformanceDetail from './client-non-conformance-detail';
import ClientNonConformanceUpdate from './client-non-conformance-update';
import ClientNonConformanceDeleteDialog from './client-non-conformance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClientNonConformanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClientNonConformanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClientNonConformanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={ClientNonConformance} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ClientNonConformanceDeleteDialog} />
  </>
);

export default Routes;
