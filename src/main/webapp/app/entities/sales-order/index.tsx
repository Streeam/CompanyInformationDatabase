import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SalesOrder from './sales-order';
import SalesOrderDetail from './sales-order-detail';
import SalesOrderUpdate from './sales-order-update';
import SalesOrderDeleteDialog from './sales-order-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SalesOrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SalesOrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SalesOrderDetail} />
      <ErrorBoundaryRoute path={match.url} component={SalesOrder} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SalesOrderDeleteDialog} />
  </>
);

export default Routes;
