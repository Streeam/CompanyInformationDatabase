import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NonConformanceType from './non-conformance-type';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={match.url} component={NonConformanceType} />
  </>
);

export default Routes;
