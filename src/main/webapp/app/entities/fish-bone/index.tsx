import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FishBone from './fish-bone';
import FishBoneDetail from './fish-bone-detail';
import FishBoneUpdate from './fish-bone-update';
import FishBoneDeleteDialog from './fish-bone-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FishBoneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FishBoneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FishBoneDetail} />
      <ErrorBoundaryRoute path={match.url} component={FishBone} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FishBoneDeleteDialog} />
  </>
);

export default Routes;
