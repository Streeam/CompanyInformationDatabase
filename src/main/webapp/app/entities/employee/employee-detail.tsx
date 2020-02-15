import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Card } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingModal from '../../shared/layout/custom-components/loading-modal/loading-modal';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { IEmployee } from 'app/shared/model/employee.model';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDetail = (props: IEmployeeDetailProps) => {
  const { employee, isLoading } = props;

  useEffect(() => {
    if (employee.user === undefined) {
      props.getEntity(props.match.params.id);
    }
  }, []);

  return employee.user !== undefined ? (
    <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
      <Row className="justify-content-center">
        <Col>
          {employee.image ? (
            <div style={{ padding: '10px' }}>
              <a>
                <img
                  src={`data:${employee.imageContentType};base64,${employee.image}`}
                  style={{
                    maxHeight: '100px',
                    borderRadius: '50%'
                  }}
                />
              </a>
            </div>
          ) : (
            <div>
              <img
                src={`content/images/default_profile_icon.png`}
                style={{
                  maxHeight: '100px',
                  borderRadius: '50%'
                }}
              />
            </div>
          )}
        </Col>
        <Col md="4">
          <dl className="jh-entity-details">
            <dt>
              <span id="login">Login</span>
            </dt>
            <dd>{employee.user.login}</dd>
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{employee.user.firstName ? employee.user.firstName + ' ' + employee.user.lastName : ''}</dd>
          </dl>
          &nbsp;&nbsp;
        </Col>
        <Col md="4">
          <dl className="jh-entity-details">
            <dt>
              <span id="jobTitle">Job Title</span>
            </dt>
            <dd>{employee.jobTitle}</dd>

            <dt>
              <span id="hiredDate">Hired Date</span>
            </dt>
            <dd>
              <TextFormat value={employee.hiredDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>

            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{employee.user.email}</dd>
          </dl>
          &nbsp;&nbsp;
        </Col>
      </Row>
      <Row>
        <Col>
          <Button size="sm" outline tag={Link} id="cancel-save" to="/company/company-status" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />
            &nbsp;
            <span className="d-none d-md-inline">Back</span>
          </Button>
        </Col>
      </Row>
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

const mapStateToProps = ({ employee }: IRootState) => ({
  employee: employee.entity,
  isLoading: employee.loading
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetail);
