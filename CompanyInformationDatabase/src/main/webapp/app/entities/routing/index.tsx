import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Routing from './routing';
import RoutingDetail from './routing-detail';
import RoutingUpdate from './routing-update';
import RoutingDeleteDialog from './routing-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RoutingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RoutingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RoutingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Routing} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RoutingDeleteDialog} />
  </>
);

export default Routes;
