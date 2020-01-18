import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NonConformanceDetails from './non-conformance-details';
import NonConformanceDetailsDetail from './non-conformance-details-detail';
import NonConformanceDetailsUpdate from './non-conformance-details-update';
import NonConformanceDetailsDeleteDialog from './non-conformance-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NonConformanceDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NonConformanceDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NonConformanceDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={NonConformanceDetails} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NonConformanceDetailsDeleteDialog} />
  </>
);

export default Routes;
