import React from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmployeeAvatar from 'app/shared/util/employeeAvatar';
import { isEmpty, toTitleCase } from 'app/shared/util/general-utils';

export const NavDropdown = props => (
  <UncontrolledDropdown nav inNavbar id={props.id}>
    <DropdownToggle nav caret className="d-flex align-items-center">
      {!isEmpty(props.currentEmployee) && <EmployeeAvatar maxHeight="20px" employee={props.currentEmployee} />}
      <span style={{ margin: '0 0 0 5px' }}>{toTitleCase(props.name)}</span>
    </DropdownToggle>
    <DropdownMenu right style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);
