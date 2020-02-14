import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ActionToBeTaken from './action-to-be-taken';
import ActionToBeTakenDetail from './action-to-be-taken-detail';
import ActionToBeTakenUpdate from './action-to-be-taken-update';
import ActionToBeTakenDeleteDialog from './action-to-be-taken-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ActionToBeTakenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ActionToBeTakenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ActionToBeTakenDetail} />
      <ErrorBoundaryRoute path={match.url} component={ActionToBeTaken} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ActionToBeTakenDeleteDialog} />
  </>
);

export default Routes;
