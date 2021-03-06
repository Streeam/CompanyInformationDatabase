import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps } from 'react-router-dom';

import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import HomeUnauthenticated from '../../modules/home/home-unauthenticated';
import { IRootState } from '../reducers';

export interface IPrivateRouteProps extends RouteProps, StateProps {}

export const UserPrivateRoute = ({
  component: Component,
  isAuthenticated,
  sessionHasBeenFetched,
  isAuthorized,
  isUserManager,
  companies,
  allProducts,
  ...rest
}: IPrivateRouteProps) => {
  const checkAuthorities = props => (
    <ErrorBoundary>
      <Component
        isUserOnly={isAuthorized}
        isCurrentUserManager={isUserManager}
        companies={companies}
        allProducts={allProducts}
        {...props}
      />
    </ErrorBoundary>
  );

  const renderRedirect = props => {
    if (!sessionHasBeenFetched || !isAuthenticated) {
      return <HomeUnauthenticated />;
    } else {
      return checkAuthorities(props);
    }
  };

  if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);

  return <Route {...rest} render={renderRedirect} />;
};

export const hasOnlyUserRole = (authorities: string[]) => {
  if (authorities && authorities.length === 1) {
    return authorities.includes(AUTHORITIES.USER);
  }
  return false;
};

export const isManager = (authorities: string[]) => {
  if (authorities) {
    return authorities.includes(AUTHORITIES.MANAGER);
  }
  return false;
};

const mapStateToProps = ({
  authentication: { isAuthenticated, sessionHasBeenFetched, isCurrentUserManager, isUnemployed },
  company,
  product
}: IRootState) => ({
  isAuthenticated,
  isAuthorized: isUnemployed,
  sessionHasBeenFetched,
  isUserManager: isCurrentUserManager,
  companies: company.entities,
  allProducts: product.entities
});

type StateProps = ReturnType<typeof mapStateToProps>;

/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
export const UserRoute = connect<StateProps, undefined>(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(UserPrivateRoute);

export default UserRoute;
