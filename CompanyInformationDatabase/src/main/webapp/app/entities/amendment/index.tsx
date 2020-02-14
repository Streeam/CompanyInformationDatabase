import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Amendment from './amendment';
import AmendmentDetail from './amendment-detail';
import AmendmentUpdate from './amendment-update';
import AmendmentDeleteDialog from './amendment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AmendmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AmendmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AmendmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Amendment} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AmendmentDeleteDialog} />
  </>
);

export default Routes;
