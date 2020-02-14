import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './client-non-conformance.reducer';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClientNonConformanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClientNonConformanceUpdateState {
  isNew: boolean;
  idsculpableEmployees: any[];
  customerId: string;
}

export class ClientNonConformanceUpdate extends React.Component<IClientNonConformanceUpdateProps, IClientNonConformanceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsculpableEmployees: [],
      customerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    values.currentDate = convertDateTimeToServer(values.currentDate);
    values.rejectionDate = convertDateTimeToServer(values.rejectionDate);

    if (errors.length === 0) {
      const { clientNonConformanceEntity } = this.props;
      const entity = {
        ...clientNonConformanceEntity,
        ...values,
        culpableEmployees: mapIdList(values.culpableEmployees)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/client-non-conformance');
  };

  render() {
    const { clientNonConformanceEntity, customers, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.clientNonConformance.home.createOrEditLabel">Create or edit a ClientNonConformance</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : clientNonConformanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="client-non-conformance-id">ID</Label>
                    <AvInput id="client-non-conformance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nonConformanceTypeLabel" for="client-non-conformance-nonConformanceType">
                    Non Conformance Type
                  </Label>
                  <AvInput
                    id="client-non-conformance-nonConformanceType"
                    type="select"
                    className="form-control"
                    name="nonConformanceType"
                    value={(!isNew && clientNonConformanceEntity.nonConformanceType) || 'NON_CONFORMING_PRODUCT_SERVICE'}
                  >
                    <option value="NON_CONFORMING_PRODUCT_SERVICE">NON_CONFORMING_PRODUCT_SERVICE</option>
                    <option value="LATE_DELIVERY">LATE_DELIVERY</option>
                    <option value="CUSTOMER_COMPLAINT">CUSTOMER_COMPLAINT</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="client-non-conformance-status">
                    Status
                  </Label>
                  <AvInput
                    id="client-non-conformance-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && clientNonConformanceEntity.status) || 'PENDING'}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETE">COMPLETE</option>
                    <option value="STUCK">STUCK</option>
                    <option value="NEED_HELP">NEED_HELP</option>
                    <option value="INCOMPLETE">INCOMPLETE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="nonconformanceDetailsIdLabel" for="client-non-conformance-nonconformanceDetailsId">
                    Nonconformance Details Id
                  </Label>
                  <AvField
                    id="client-non-conformance-nonconformanceDetailsId"
                    type="string"
                    className="form-control"
                    name="nonconformanceDetailsId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="rejectionReasonDetailsLabel" for="client-non-conformance-rejectionReasonDetails">
                    Rejection Reason Details
                  </Label>
                  <AvField id="client-non-conformance-rejectionReasonDetails" type="text" name="rejectionReasonDetails" />
                </AvGroup>
                <AvGroup>
                  <Label id="actionToBeTakenDetailsLabel" for="client-non-conformance-actionToBeTakenDetails">
                    Action To Be Taken Details
                  </Label>
                  <AvField id="client-non-conformance-actionToBeTakenDetails" type="text" name="actionToBeTakenDetails" />
                </AvGroup>
                <AvGroup>
                  <Label id="shortTermDetailsLabel" for="client-non-conformance-shortTermDetails">
                    Short Term Details
                  </Label>
                  <AvField id="client-non-conformance-shortTermDetails" type="text" name="shortTermDetails" />
                </AvGroup>
                <AvGroup>
                  <Label id="longTermDetailsLabel" for="client-non-conformance-longTermDetails">
                    Long Term Details
                  </Label>
                  <AvField id="client-non-conformance-longTermDetails" type="text" name="longTermDetails" />
                </AvGroup>
                <AvGroup>
                  <Label id="currentDateLabel" for="client-non-conformance-currentDate">
                    Current Date
                  </Label>
                  <AvInput
                    id="client-non-conformance-currentDate"
                    type="datetime-local"
                    className="form-control"
                    name="currentDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.clientNonConformanceEntity.currentDate)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="rejectionDateLabel" for="client-non-conformance-rejectionDate">
                    Rejection Date
                  </Label>
                  <AvInput
                    id="client-non-conformance-rejectionDate"
                    type="datetime-local"
                    className="form-control"
                    name="rejectionDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.clientNonConformanceEntity.rejectionDate)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="underWarrantyLabel" check>
                    <AvInput id="client-non-conformance-underWarranty" type="checkbox" className="form-control" name="underWarranty" />
                    Under Warranty
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="quantityLabel" for="client-non-conformance-quantity">
                    Quantity
                  </Label>
                  <AvField
                    id="client-non-conformance-quantity"
                    type="string"
                    className="form-control"
                    name="quantity"
                    validate={{
                      min: { value: 1, errorMessage: 'This field should be at least 1.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="labourRateLabel" for="client-non-conformance-labourRate">
                    Labour Rate
                  </Label>
                  <AvField
                    id="client-non-conformance-labourRate"
                    type="string"
                    className="form-control"
                    name="labourRate"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="client-non-conformance-customer">Customer</Label>
                  <AvInput id="client-non-conformance-customer" type="select" className="form-control" name="customerId">
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="client-non-conformance-culpableEmployees">Culpable Employees</Label>
                  <AvInput
                    id="client-non-conformance-culpableEmployees"
                    type="select"
                    multiple
                    className="form-control"
                    name="culpableEmployees"
                    value={clientNonConformanceEntity.culpableEmployees && clientNonConformanceEntity.culpableEmployees.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/client-non-conformance" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  employees: storeState.employee.entities,
  clientNonConformanceEntity: storeState.clientNonConformance.entity,
  loading: storeState.clientNonConformance.loading,
  updating: storeState.clientNonConformance.updating,
  updateSuccess: storeState.clientNonConformance.updateSuccess
});

const mapDispatchToProps = {
  getCustomers,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientNonConformanceUpdate);
