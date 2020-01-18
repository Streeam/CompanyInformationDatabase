import React, { useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { AUTHORITIES, APP_LOCAL_DATE_FORMAT } from '../../config/constants';
import { hasAnyAuthority } from '../../shared/auth/private-route';
import { IRootState } from 'app/shared/reducers';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getCompanies } from '../../entities/company/company.reducer';
import EmployeeAvatar from '../../shared/util/employeeAvatar';
import { TextFormat } from 'react-jhipster';
import { toTitleCase } from 'app/shared/util/general-utils';

interface ICompanyEmployeeProps extends StateProps, DispatchProps {
  allEmployees: IEmployee[];
}

const companyEmployeeTab = (props: ICompanyEmployeeProps) => {
  const { allEmployees } = props;
  const isManager = authorities => {
    const auth = authorities.map(authority => authority.name);
    return hasAnyAuthority(auth, [AUTHORITIES.MANAGER]);
  };

  const isManagerCheck = (manager: boolean): JSX.Element => {
    return manager ? (
      <div>
        <img src={`content/images/check.png`} style={{ maxHeight: '20px' }} />
      </div>
    ) : (
      <div />
    );
  };

  const viewButton = (employee: IEmployee): JSX.Element => {
    return (
      <div className="btn-group flex-btn-group-container">
        <Button tag={Link} to={`/entity/employee/${employee.id}`} color="secondary" replace size="sm" title="View Employee Details">
          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
        </Button>
      </div>
    );
  };
  const content = allEmployees
    ? allEmployees.map((employee, i) => (
        <tr key={`entity-${i}`}>
          <td style={{ width: '25px' }}>
            <EmployeeAvatar maxHeight="30px" employee={employee} />
          </td>
          <td>
            {employee.user.firstName && employee.user.lastName
              ? `${toTitleCase(employee.user.firstName)}` + ` ${toTitleCase(employee.user.lastName)}`
              : toTitleCase(employee.user.login)}
          </td>
          <td>{employee.jobTitle ? employee.jobTitle : ''}</td>
          <td>
            <TextFormat type="date" value={employee.hiredDate} format={APP_LOCAL_DATE_FORMAT} />
          </td>
          <td>{isManagerCheck(isManager(employee.user.authorities))}</td>
          <td>{isManagerCheck(!isManager(employee.user.authorities))}</td>
          <td className="text-right">{viewButton(employee)}</td>
        </tr>
      ))
    : null;

  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Employee's Name</th>
          <th>Job Desription</th>
          <th>Registration Date</th>
          <th>Manager</th>
          <th>Employee</th>
          <th />
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </Table>
  );
};

const mapStateToProps = ({ company, employee }: IRootState) => ({
  companyEntity: company.entities[0],
  employees: employee.entities
});

const mapDispatchToProps = {
  getCompanies
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(companyEmployeeTab);
