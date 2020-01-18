import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  const { incompleteNonConformance, currentNotifications, sites, currentEmployee } = props;
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);
  const paddingTop = '60px';
  return (
    <Router basename={baseHref}>
      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer position={toast.POSITION.BOTTOM_CENTER} className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <Header
            isAuthenticated={props.isAuthenticated}
            isAdmin={props.isAdmin}
            isOnlyUser={props.isUser}
            isManager={props.isCurrentUserManager}
            ribbonEnv={props.ribbonEnv}
            isInProduction={props.isInProduction}
            isSwaggerEnabled={props.isSwaggerEnabled}
            account={props.account}
            notifications={[...currentNotifications]}
            incompleteNonConformanceStep={incompleteNonConformance}
            currentCompany={props.company}
            sites={[...sites]}
            currentEmployee={currentEmployee}
          />
        </ErrorBoundary>
        <div className="container-fluid view-container" id="app-view-container">
          <Card className="jh-card">
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </Card>
          <Footer currentCompany={props.company} />
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = ({
  authentication,
  applicationProfile,
  employee,
  company,
  product,
  nonConformanceDetails,
  notification,
  site
}: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isUser: authentication.isUnemployed,
  isCurrentUserManager: authentication.isCurrentUserManager,
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
  account: authentication.account,
  company: company.entities[0],
  currentEmployee: employee.currentEmployeeEntity,
  loading: employee.loading || company.loading || product.loading,
  incompleteNonConformance: nonConformanceDetails.entity,
  currentNotifications: notification.currentEntities,
  sites: site.entities
});

const mapDispatchToProps = { getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));
