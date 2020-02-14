import React, { Fragment } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavDropdown } from './menu-components';
import { isEmpty } from 'app/shared/util/general-utils';

export const Purchase = props => (
  <NavDropdown icon="th-list" name={'Purchase'} id="entity-menu">
    <Fragment>
      <MenuItem icon="asterisk" to="/purchase">
        Purchase Request
      </MenuItem>
    </Fragment>
  </NavDropdown>
);

export default Purchase;
