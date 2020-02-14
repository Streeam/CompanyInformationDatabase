import React, { useEffect, Fragment } from 'react';
import { Button, Col, Card, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { IRootState } from 'app/shared/reducers';
import { getAccount } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import { getCurrentEmployeeEntity, updateEntity } from '../../../entities/employee/employee.reducer';
import { getEntities as getCompanies } from '../../../entities/company/company.reducer';
import '../../../app.scss';
import { RouteComponentProps, Link } from 'react-router-dom';
import ProfileIcon from '../../../shared/layout/custom-components/avatar/avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingModal from '../../../shared/layout/custom-components/loading-modal/loading-modal';
import { isEmpty } from 'app/shared/util/general-utils';

export interface IUserSettingsProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const SettingsPage = (props: IUserSettingsProps) => {
  const { currentEmployee, updatingUser, updatingEmployee, currentCompany } = props;

  const isLoading = updatingUser || updatingEmployee;

  useEffect(() => {
    props.getAccount();
    if (isEmpty(currentCompany)) {
      props.getCompanies();
    }
    props.getCurrentEmployeeEntity();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event, values) => {
    const account = {
      ...props.account,
      ...values
    };
    const employee = {
      ...currentEmployee,
      ...values
    };
    props.saveAccountSettings(account);
    props.updateEntity(employee);
    event.persist();
  };
  const handleBack = () => {
    props.history.goBack();
  };
  return isLoading ? (
    <LoadingModal />
  ) : (
    <Card style={{ backgroundColor: 'white' }}>
      <ProfileIcon
        imageContentType={currentEmployee.imageContentType}
        image={currentEmployee.image}
        maxHeight="100px"
        maxWidth="100px"
        round
        url={`${props.match.url}/profile-icon`}
        defaultSrc="content/images/default_profile_icon.png"
      />
      <Row className="justify-content-center">
        <Col md="7">
          <h2 id="settings-title">Update Profile</h2>
          <AvForm id="settings-form" onValidSubmit={handleValidSubmit}>
            {/* First name */}
            <AvField
              className="form-control"
              name="firstName"
              label="First Name"
              id="firstName"
              placeholder="Your first name"
              validate={{
                required: { value: true, errorMessage: 'Your first name is required.' },
                minLength: { value: 1, errorMessage: 'Your first name is required to be at least 1 character' },
                maxLength: { value: 50, errorMessage: 'Your first name cannot be longer than 50 characters' }
              }}
              value={props.account.firstName ? props.account.firstName : ''}
            />
            {/* Last name */}
            <AvField
              className="form-control"
              name="lastName"
              label="Last Name"
              id="lastName"
              placeholder="Your last name"
              validate={{
                required: { value: true, errorMessage: 'Your last name is required.' },
                minLength: { value: 1, errorMessage: 'Your last name is required to be at least 1 character' },
                maxLength: { value: 50, errorMessage: 'Your last name cannot be longer than 50 characters' }
              }}
              value={props.account.lastName ? props.account.lastName : ''}
            />
            {/* Job tilte */}
            <AvField
              className="form-control"
              name="jobTitle"
              label="Job Title"
              id="jobTitle"
              placeholder="Your job title"
              validate={{
                required: { value: true, errorMessage: 'Your last name is required.' },
                minLength: { value: 2, errorMessage: 'Your job title is required to be at least 2 character' },
                maxLength: { value: 50, errorMessage: 'Your job title cannot be longer than 50 characters' }
              }}
              value={currentEmployee.jobTitle ? currentEmployee.jobTitle : ''}
            />
            <Button size="sm" color="secondary" id="cancel-save" onClick={handleBack}>
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">Back</span>
            </Button>
            &nbsp;
            <Button size="sm" color="secondary" id="save-entity" type="submit" disabled={updatingUser}>
              <FontAwesomeIcon icon="save" />
              &nbsp; Save
            </Button>
          </AvForm>
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = ({ authentication, employee, company }: IRootState) => ({
  account: authentication.account,
  currentEmployee: employee.currentEmployeeEntity,
  updatingUser: authentication.loading,
  updatingEmployee: employee.updating,
  currentCompany: company.entities[0]
});

const mapDispatchToProps = {
  getAccount,
  saveAccountSettings,
  reset,
  getCurrentEmployeeEntity,
  updateEntity,
  getCompanies
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
