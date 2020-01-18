import React, { Fragment } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavDropdown } from './menu-components';
import { isEmpty } from 'app/shared/util/general-utils';

export const NonConformances = props => (
  <NavDropdown icon="th-list" name={'Quality'} id="entity-menu">
    <Fragment>
      <MenuItem icon="asterisk" to="/nonconformances">
        NonConformances
      </MenuItem>
    </Fragment>
  </NavDropdown>
);

export default NonConformances;
