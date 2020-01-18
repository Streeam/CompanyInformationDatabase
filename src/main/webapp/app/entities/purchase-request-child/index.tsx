import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PurchaseRequestChild from './purchase-request-child';
import PurchaseRequestChildDetail from './purchase-request-child-detail';
import PurchaseRequestChildUpdate from './purchase-request-child-update';
import PurchaseRequestChildDeleteDialog from './purchase-request-child-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PurchaseRequestChildUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PurchaseRequestChildUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PurchaseRequestChildDetail} />
      <ErrorBoundaryRoute path={match.url} component={PurchaseRequestChild} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PurchaseRequestChildDeleteDialog} />
  </>
);

export default Routes;
