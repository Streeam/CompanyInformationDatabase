import './header.scss';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';

import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, Notifications } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, NonConformances, Purchase } from '../menus';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { ICompany } from 'app/shared/model/company.model';
import { INotification } from 'app/shared/model/notification.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { ISite } from 'app/shared/model/site.model';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOnlyUser: boolean;
  isManager: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  account: any;
  notifications: INotification[];
  incompleteNonConformanceStep: INonConformanceDetails;
  currentCompany: ICompany;
  sites: ISite[];
  currentEmployee: IEmployee;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    isAuthenticated,
    isAdmin,
    isManager,
    isInProduction,
    account,
    isSwaggerEnabled,
    notifications,
    currentCompany,
    sites,
    currentEmployee
  } = props;
  const renderDevRibbon = () =>
    isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Navbar light expand="sm" fixed="top" className="bg-light">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand currentCompany={currentCompany} />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            <Home />
            {isAuthenticated && isAdmin && <EntitiesMenu {...props} />}
            {isAuthenticated && currentCompany && <Purchase />}
            {isAuthenticated && currentCompany && <NonConformances />}
            {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />}
            <AccountMenu
              currentEmployee={currentEmployee}
              isAuthenticated={isAuthenticated}
              isManager={isManager}
              isAdmin={isAdmin}
              account={account}
              company={currentCompany}
            />
            {isAuthenticated && <Notifications currentNotifications={notifications} />}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
