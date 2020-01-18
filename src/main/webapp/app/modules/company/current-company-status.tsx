import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Col, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import '../../app.scss';
import CompanyStructure from './company-employee';
import { getEntities as getCompanies } from '../../entities/company/company.reducer';
import { getAllEntities as getEmployees } from '../../entities/employee/employee.reducer';
import PopoverInfo from '../../shared/layout/custom-components/popover-info/popover-info';
import { isArrayEmpty, isEmpty } from '../../shared/util/general-utils';

interface ICompanyDetailsProsp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const companyDetail = (props: ICompanyDetailsProsp) => {
  const {
    companyEntity,
    isCurrentUserManager,
    companiesAreLoading,
    currentEmployeeIsLoading,
    acceptOrDeclineRequestUpdating,
    userAccountIsLoading,
    companyIsUpdating,
    allEmployees
  } = props;

  useEffect(() => {
    if (isArrayEmpty(allEmployees)) {
      props.getEmployees();
    }
  }, []);

  const lableStyle = { color: 'black' };
  const handleBack = () => {
    props.history.goBack();
  };
  const isLoading =
    companiesAreLoading || currentEmployeeIsLoading || acceptOrDeclineRequestUpdating || userAccountIsLoading || companyIsUpdating;
  return (
    !isEmpty(companyEntity) && (
      <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
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
            {companyEntity.companyLogo ? (
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
        <div style={{ textAlign: 'right' }}>
          {isCurrentUserManager ? (
            <div>
              <div style={{ display: 'inline-block' }}>
                <Button size="sm" tag={Link} to={`/entity/company/${companyEntity.id}/edit`} replace color="secondary" title="Edit Company">
                  <FontAwesomeIcon icon="pencil-alt" /> &nbsp;
                  <span className="d-none d-md-inline">Edit Company</span>
                </Button>
              </div>
              &nbsp;&nbsp;
              <div style={{ display: 'inline-block' }}>
                <Button
                  size="sm"
                  tag={Link}
                  to={`/entity/company/roles/${companyEntity.id}`}
                  replace
                  color="secondary"
                  title="Assign Roles"
                >
                  <FontAwesomeIcon icon="sitemap" /> &nbsp;
                  <span className="d-none d-md-inline">Assign Roles</span>
                </Button>
              </div>
              &nbsp;&nbsp;
              <div style={{ display: 'inline-block' }}>
                <Button size="sm" tag={Link} to={`/company-data`} replace color="secondary" title="Company Data">
                  <FontAwesomeIcon icon="store" /> &nbsp;
                  <span className="d-none d-md-inline">Company Data</span>
                </Button>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
        <br />
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
        <br />
        <h4>Company Structure</h4>
        <CompanyStructure allEmployees={[...allEmployees]} />
        <br />
        <br />
        <div style={{ minWidth: '70px' }}>
          <Button size="sm" color="secondary" id="cancel-save" onClick={handleBack}>
            <FontAwesomeIcon icon="arrow-left" />
            &nbsp;
            <span className="d-none d-md-inline">Back</span>
          </Button>
        </div>
      </Card>
    )
  );
};

const mapStateToProps = ({ company, employee, authentication, notification }: IRootState) => ({
  companyEntity: company.entities[0],
  curentEmployee: employee.currentEmployeeEntity,
  allEmployees: employee.companysEntities,
  isCurrentUserManager: authentication.isCurrentUserManager,
  companiesAreLoading: company.loading,
  notificationsAreLoading: notification.loading,
  currentEmployeeIsLoading: employee.loading,
  acceptOrDeclineRequestUpdating: employee.updating,
  userAccountIsLoading: authentication.loading,
  companyIsUpdating: company.updating
});

const mapDispatchToProps = { getCompanies, getEmployees };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(companyDetail);
