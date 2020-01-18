import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ComanyData from './company-data-main';
import ImportProducts from './products/import-csv-products/import-products';
import ImportBoms from './products/import-csv-products/import-boms';
import ImportRoutings from './products/import-csv-products/import-routings';
import ImportCustomers from './customers/import-customers-csv/import-customers';
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}`} component={ComanyData} />
      <ErrorBoundaryRoute exact path={`${match.url}/products/import-products`} component={ImportProducts} />
      <ErrorBoundaryRoute exact path={`${match.url}/products/import-boms`} component={ImportBoms} />
      <ErrorBoundaryRoute exact path={`${match.url}/products/import-routings`} component={ImportRoutings} />
      <ErrorBoundaryRoute exact path={`${match.url}/customers/import-customers`} component={ImportCustomers} />
    </Switch>
  </>
);
export default Routes;
