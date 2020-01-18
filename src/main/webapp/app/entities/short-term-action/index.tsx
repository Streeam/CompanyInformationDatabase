import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ShortTermAction from './short-term-action';
import ShortTermActionDetail from './short-term-action-detail';
import ShortTermActionUpdate from './short-term-action-update';
import ShortTermActionDeleteDialog from './short-term-action-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ShortTermActionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ShortTermActionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ShortTermActionDetail} />
      <ErrorBoundaryRoute path={match.url} component={ShortTermAction} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ShortTermActionDeleteDialog} />
  </>
);

export default Routes;
