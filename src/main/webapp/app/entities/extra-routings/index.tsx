import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ExtraRoutings from './extra-routings';
import ExtraRoutingsDetail from './extra-routings-detail';
import ExtraRoutingsUpdate from './extra-routings-update';
import ExtraRoutingsDeleteDialog from './extra-routings-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ExtraRoutingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ExtraRoutingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ExtraRoutingsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ExtraRoutings} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ExtraRoutingsDeleteDialog} />
  </>
);

export default Routes;
