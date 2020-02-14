import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/company">
      Company
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/customer">
      Customer
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/product">
      Product
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/image">
      Image
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/drawing">
      Drawing
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/version">
      Version
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/routing">
      Routing
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/supplier">
      Supplier
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/employee">
      Employee
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/amendment">
      Amendment
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/prototype">
      Prototype
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/non-conformance-details">
      Non Conformance Details
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/non-conformance-type">
      Non Conformance Type
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/internal-non-conformance">
      Internal Non Conformance
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/supplier-non-conformance">
      Supplier Non Conformance
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/audit-non-conformance">
      Audit Non Conformance
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/client-non-conformance">
      Client Non Conformance
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/task">
      Task
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/progress-track">
      Progress Track
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/notification">
      Notification
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/roles">
      Roles
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/bom">
      Bom
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/purchase-request-child">
      Purchase Request Child
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/purchase-request-parent">
      Purchase Request Parent
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/sales-order">
      Sales Order
    </MenuItem>
    <MenuItem icon="asterisk" to="/client-non-conformance">
      Client Non Conformance
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
