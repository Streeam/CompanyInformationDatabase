import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CurrentCompanyStatus from './current-company-status';
import CompanyStatus from './company-status';
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/company-status-employee`} component={CompanyStatus} />
      <ErrorBoundaryRoute exact path={`${match.url}/company-status`} component={CurrentCompanyStatus} />
    </Switch>
  </>
);

export default Routes;
