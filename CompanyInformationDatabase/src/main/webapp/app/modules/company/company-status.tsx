import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Table, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getAllEntities as getEmployees, getCurrentEmployeeEntity as getCurrentEmployee } from '../../entities/employee/employee.reducer';
import { getEntities as getCompanies } from '../../entities/company/company.reducer';
// tslint:disable-next-line:no-unused-variable
import { AUTHORITIES, APP_LOCAL_DATE_FORMAT } from '../../config/constants';
import { hasAnyAuthority } from '../../shared/auth/private-route';
import '../../app.scss';
import { isEmpty, isArrayEmpty, toTitleCase } from 'app/shared/util/general-utils';
import EmployeeAvatar from 'app/shared/util/employeeAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextFormat } from 'react-jhipster';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const companyDetail = (props: ICompanyDetailProps) => {
  const lableStyle = { color: 'black' };
  const { employees, companyEntity } = props;

  useEffect(() => {
    if (companyEntity) {
      props.getCompanies();
    }
    if (isArrayEmpty(employees)) {
      props.getEmployees();
    }
  }, []);
  const handleBack = () => {
    props.history.goBack();
  };
  const isManager = (authorities, anyAuthority) => {
    const auth = authorities.map(authority => authority.name);
    return hasAnyAuthority(auth, anyAuthority) ? (
      <div>
        <img src={`content/images/check.png`} style={{ maxHeight: '20px' }} />
      </div>
    ) : (
      <div />
    );
  };

  const tableContent = employees.map((employee, i) => (
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
      <td>{isManager(employee.user.authorities, [AUTHORITIES.MANAGER])}</td>
      <td>{isManager(employee.user.authorities, [AUTHORITIES.EMPLOYEE])}</td>
    </tr>
  ));

  return employees && companyEntity ? (
    <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
      <div>
        <div>
          <div
            style={{
              display: 'inline-block',
              textAlign: 'left',
              width: '50%'
            }}
          >
            <div style={{ display: 'inline-block' }}>
              <h1 style={lableStyle}>{companyEntity.name}</h1>
            </div>
          </div>
          <div
            style={{
              display: 'inline-block',
              textAlign: 'right',
              width: '50%'
            }}
          >
            {companyEntity && companyEntity.companyLogo ? (
              <div>
                <img
                  src={`data:${companyEntity.companyLogoContentType};base64,${companyEntity.companyLogo}`}
                  style={{
                    maxHeight: '100px',
                    borderRadius: '5%'
                  }}
                />
              </div>
            ) : (
              <div>
                <img src={`content/images/company-logo.png`} style={{ maxHeight: '50px' }} />
              </div>
            )}
          </div>
        </div>
        <br />
        <h4>Company Details</h4>
        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Postcode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{companyEntity.email}</td>
              <td>{companyEntity.phone}</td>
              <td>{companyEntity.addressLine1}</td>
              <td>{companyEntity.city}</td>
              <td>{companyEntity.country}</td>
              <td>{companyEntity.postcode}</td>
            </tr>
          </tbody>
        </Table>
        <br />
        <br />
        <h4>Company Structure</h4>
        <Table>
          <thead>
            <tr>
              <th style={{ width: '2%' }} />
              <th>Employee's Name</th>
              <th>Job Desription</th>
              <th>Registration Date</th>
              <th>Manager</th>
              <th>Employee</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </Table>
      </div>
      <br />
      <div style={{ maxWidth: '100px' }}>
        <Button size="sm" color="secondary" id="cancel-save" onClick={handleBack}>
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;
          <span className="d-none d-md-inline">Back</span>
        </Button>
      </div>
    </Card>
  ) : (
    <div style={{ textAlign: 'center' }}>
      <p>No Company has been created</p>
    </div>
  );
};

const mapStateToProps = ({ employee, company }: IRootState) => ({
  employees: employee.companysEntities,
  companyEntity: company.entities[0]
});

const mapDispatchToProps = { getEmployees, getCompanies };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(companyDetail);
