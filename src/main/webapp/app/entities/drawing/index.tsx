import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Drawing from './drawing';
import DrawingDetail from './drawing-detail';
import DrawingUpdate from './drawing-update';
import DrawingDeleteDialog from './drawing-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DrawingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DrawingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DrawingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Drawing} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DrawingDeleteDialog} />
  </>
);

export default Routes;
