import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bom from './bom';
import BomDetail from './bom-detail';
import BomUpdate from './bom-update';
import BomDeleteDialog from './bom-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BomDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bom} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BomDeleteDialog} />
  </>
);

export default Routes;
