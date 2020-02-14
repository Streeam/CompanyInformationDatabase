import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PurchaseRequestParent from './purchase-request-parent';
import PurchaseRequestParentDetail from './purchase-request-parent-detail';
import PurchaseRequestParentUpdate from './purchase-request-parent-update';
import PurchaseRequestParentDeleteDialog from './purchase-request-parent-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PurchaseRequestParentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PurchaseRequestParentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PurchaseRequestParentDetail} />
      <ErrorBoundaryRoute path={match.url} component={PurchaseRequestParent} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PurchaseRequestParentDeleteDialog} />
  </>
);

export default Routes;
