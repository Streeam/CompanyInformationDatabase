import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProgressTrack from './progress-track';
import ProgressTrackDetail from './progress-track-detail';
import ProgressTrackUpdate from './progress-track-update';
import ProgressTrackDeleteDialog from './progress-track-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProgressTrackUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProgressTrackUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProgressTrackDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProgressTrack} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProgressTrackDeleteDialog} />
  </>
);

export default Routes;
