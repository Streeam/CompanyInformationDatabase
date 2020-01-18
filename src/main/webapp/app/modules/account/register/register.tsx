import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Row, Col, Button, Card } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { handleRegister, reset } from './register.reducer';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IRegisterProps extends DispatchProps, RouteComponentProps<{}> {}

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
    handleClose();
  };

  const handleClose = () => {
    props.history.push('/');
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <Card style={{ backgroundColor: 'white' }}>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">Registration</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              label="Username"
              placeholder={'Your username'}
              validate={{
                required: { value: true, errorMessage: 'Your username is required.' },
                pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: 'Your username can only contain letters and digits.' },
                minLength: { value: 4, errorMessage: 'Your username is required to be at least 4 character.' },
                maxLength: { value: 50, errorMessage: 'Your username cannot be longer than 50 characters.' }
              }}
            />
            <AvField
              name="email"
              label="Email"
              placeholder={'Your email'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'Your email is required.' },
                minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' }
              }}
            />
            <AvField
              name="firstPassword"
              label="New password"
              placeholder={'New password'}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: 'Your password is required.' },
                minLength: { value: 8, errorMessage: 'Your password is required to be at least 8 characters.' },
                pattern: {
                  value: '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%!^+=]).*$',
                  errorMessage: 'Your password must contain at least one special character, one uppercase letter and one lowercase letter.'
                },
                maxLength: { value: 50, errorMessage: 'Your password cannot be longer than 50 characters.' }
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label="New password confirmation"
              placeholder="Confirm the new password"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Your confirmation password is required.' },
                minLength: { value: 8, errorMessage: 'Your confirmation password is required to be at least 8 characters.' },
                maxLength: { value: 50, errorMessage: 'Your confirmation password cannot be longer than 50 characters.' },
                match: { value: 'firstPassword', errorMessage: 'The password and its confirmation do not match!' }
              }}
            />
            <Button color="secondary" size="sm" onClick={handleClose}>
              <FontAwesomeIcon icon="arrow-left" />
              <span className="d-none d-md-inline">&nbsp;Back</span>
            </Button>
            &nbsp;
            <Button id="register-submit" size="sm" color="secondary" type="submit">
              <FontAwesomeIcon icon="save" />
              &nbsp; Register
            </Button>
          </AvForm>
          <p>&nbsp;</p>
        </Col>
      </Row>
    </Card>
  );
};

const mapDispatchToProps = { handleRegister, reset };
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(RegisterPage);
