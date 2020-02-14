import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ExtraBoms from './extra-boms';
import ExtraBomsDetail from './extra-boms-detail';
import ExtraBomsUpdate from './extra-boms-update';
import ExtraBomsDeleteDialog from './extra-boms-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ExtraBomsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ExtraBomsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ExtraBomsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ExtraBoms} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ExtraBomsDeleteDialog} />
  </>
);

export default Routes;
