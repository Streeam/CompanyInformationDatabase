import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LongTermAction from './long-term-action';
import LongTermActionDetail from './long-term-action-detail';
import LongTermActionUpdate from './long-term-action-update';
import LongTermActionDeleteDialog from './long-term-action-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LongTermActionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LongTermActionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LongTermActionDetail} />
      <ErrorBoundaryRoute path={match.url} component={LongTermAction} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LongTermActionDeleteDialog} />
  </>
);

export default Routes;
