import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PurchaseRequest from './purchase-requests/purchase-main';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}`} component={PurchaseRequest} />
    </Switch>
  </>
);

export default Routes;
