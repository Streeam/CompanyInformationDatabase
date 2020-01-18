import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AfterSaleExpenses from './after-sale-expenses';
import AfterSaleExpensesDetail from './after-sale-expenses-detail';
import AfterSaleExpensesUpdate from './after-sale-expenses-update';
import AfterSaleExpensesDeleteDialog from './after-sale-expenses-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AfterSaleExpensesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AfterSaleExpensesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AfterSaleExpensesDetail} />
      <ErrorBoundaryRoute path={match.url} component={AfterSaleExpenses} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AfterSaleExpensesDeleteDialog} />
  </>
);

export default Routes;
