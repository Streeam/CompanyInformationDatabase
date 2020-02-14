import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Prototype from './prototype';
import PrototypeDetail from './prototype-detail';
import PrototypeUpdate from './prototype-update';
import PrototypeDeleteDialog from './prototype-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrototypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrototypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrototypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Prototype} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PrototypeDeleteDialog} />
  </>
);

export default Routes;
