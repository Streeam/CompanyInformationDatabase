import React, { Fragment } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';

import { NavDropdown } from './menu-components';

export const AccountMenu = ({ isAuthenticated = false, isManager = false, isAdmin = false, account, company, currentEmployee }) => {
  const accountMenuItemsAuthenticated = (
    <>
      <MenuItem icon="wrench" to="/account/settings">
        Profile
      </MenuItem>
      {company && (
        <MenuItem icon="store" to="/company/company-status-employee">
          My Company
        </MenuItem>
      )}
      <MenuItem icon="lock" to="/account/password">
        Password
      </MenuItem>
      <MenuItem icon="sign-out-alt" to="/logout">
        Sign out
      </MenuItem>
    </>
  );

  const accountMenuItemsManager = (
    <>
      <MenuItem icon="wrench" to="/account/settings">
        Profile
      </MenuItem>
      {company && (
        <Fragment>
          <MenuItem icon="store" to="/company/company-status">
            My Company
          </MenuItem>
        </Fragment>
      )}
      <MenuItem icon="lock" to="/account/password">
        Password
      </MenuItem>
      <MenuItem icon="sign-out-alt" to="/logout">
        Sign out
      </MenuItem>
    </>
  );
  const basicAccountMenuItems = (
    <>
      <MenuItem id="login-item" icon="sign-in-alt" to="/login">
        Sign in
      </MenuItem>
      <MenuItem icon="sign-in-alt" to="/register">
        Register
      </MenuItem>
    </>
  );
  return (
    <NavDropdown
      currentEmployee={currentEmployee}
      name={account.firstName ? account.firstName : account.login ? account.login : 'Account'}
      id="account-menu"
    >
      {isAuthenticated ? (isManager || isAdmin ? accountMenuItemsManager : accountMenuItemsAuthenticated) : basicAccountMenuItems}
    </NavDropdown>
  );
};

export default AccountMenu;
