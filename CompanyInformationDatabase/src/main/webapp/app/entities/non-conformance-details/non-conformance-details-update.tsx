import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduct } from 'app/shared/model/product.model';
import { getAllProductsFromDB as getProducts } from 'app/entities/product/product.reducer';
import { IRouting } from 'app/shared/model/routing.model';
import { getEntities as getRoutings } from 'app/entities/routing/routing.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { INonConformanceType } from 'app/shared/model/non-conformance-type.model';
import { getEntities as getNonConformanceTypes } from 'app/entities/non-conformance-type/non-conformance-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './non-conformance-details.reducer';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INonConformanceDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INonConformanceDetailsUpdateState {
  isNew: boolean;
  idsproduct: any[];
  idsrouting: any[];
  employeeId: string;
  nonConformanceTypeId: string;
}

export class NonConformanceDetailsUpdate extends React.Component<INonConformanceDetailsUpdateProps, INonConformanceDetailsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsproduct: [],
      idsrouting: [],
      employeeId: '0',
      nonConformanceTypeId: '0',
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

    this.props.getProducts();
    this.props.getRoutings();
    this.props.getEmployees();
    this.props.getNonConformanceTypes();
  }

  saveEntity = (event, errors, values) => {
    values.currentDate = convertDateTimeToServer(values.currentDate);

    if (errors.length === 0) {
      const { nonConformanceDetailsEntity } = this.props;
      const entity = {
        ...nonConformanceDetailsEntity,
        ...values,
        products: mapIdList(values.products),
        routings: mapIdList(values.routings)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/non-conformance-details');
  };

  render() {
    const { nonConformanceDetailsEntity, products, routings, employees, nonConformanceTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.nonConformanceDetails.home.createOrEditLabel">Create or edit a NonConformanceDetails</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nonConformanceDetailsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="non-conformance-details-id">ID</Label>
                    <AvInput id="non-conformance-details-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="deadlineLabel" for="non-conformance-details-deadline">
                    Deadline
                  </Label>
                  <AvField
                    id="non-conformance-details-deadline"
                    type="date"
                    className="form-control"
                    name="deadline"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="non-conformance-details-status">
                    Status
                  </Label>
                  <AvInput
                    id="non-conformance-details-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && nonConformanceDetailsEntity.status) || 'PENDING'}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETE">COMPLETE</option>
                    <option value="STUCK">STUCK</option>
                    <option value="NEED_HELP">NEED_HELP</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="progressLabel" for="non-conformance-details-progress">
                    Progress
                  </Label>
                  <AvField
                    id="non-conformance-details-progress"
                    type="string"
                    className="form-control"
                    name="progress"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      max: { value: 100, errorMessage: 'This field cannot be more than 100.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="priorityLabel" for="non-conformance-details-priority">
                    Priority
                  </Label>
                  <AvInput
                    id="non-conformance-details-priority"
                    type="select"
                    className="form-control"
                    name="priority"
                    value={(!isNew && nonConformanceDetailsEntity.priority) || 'LOW'}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="nonconformanceLabel" for="non-conformance-details-nonconformance">
                    Nonconformance
                  </Label>
                  <AvInput
                    id="non-conformance-details-nonconformance"
                    type="select"
                    className="form-control"
                    name="nonconformance"
                    value={(!isNew && nonConformanceDetailsEntity.nonconformance) || 'INTERNAL'}
                  >
                    <option value="INTERNAL">INTERNAL</option>
                    <option value="SUPPLIER">SUPPLIER</option>
                    <option value="AUDIT">AUDIT</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="currentDateLabel" for="non-conformance-details-currentDate">
                    Current Date
                  </Label>
                  <AvInput
                    id="non-conformance-details-currentDate"
                    type="datetime-local"
                    className="form-control"
                    name="currentDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.nonConformanceDetailsEntity.currentDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="non-conformance-details-product">Product</Label>
                  <AvInput
                    id="non-conformance-details-product"
                    type="select"
                    multiple
                    className="form-control"
                    name="products"
                    value={nonConformanceDetailsEntity.products && nonConformanceDetailsEntity.products.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {products
                      ? products.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.partNumber}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="non-conformance-details-routing">Routing</Label>
                  <AvInput
                    id="non-conformance-details-routing"
                    type="select"
                    multiple
                    className="form-control"
                    name="routings"
                    value={nonConformanceDetailsEntity.routings && nonConformanceDetailsEntity.routings.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {routings
                      ? routings.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="non-conformance-details-employee">Employee</Label>
                  <AvInput id="non-conformance-details-employee" type="select" className="form-control" name="employeeId" required>
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvFeedback>This field is required.</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Label for="non-conformance-details-nonConformanceType">Non Conformance Type</Label>
                  <AvInput
                    id="non-conformance-details-nonConformanceType"
                    type="select"
                    className="form-control"
                    name="nonConformanceTypeId"
                  >
                    <option value="" key="0" />
                    {nonConformanceTypes
                      ? nonConformanceTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/non-conformance-details" replace color="info">
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
  products: storeState.product.entities,
  routings: storeState.routing.entities,
  employees: storeState.employee.entities,
  nonConformanceTypes: storeState.nonConformanceType.entities,
  nonConformanceDetailsEntity: storeState.nonConformanceDetails.entity,
  loading: storeState.nonConformanceDetails.loading,
  updating: storeState.nonConformanceDetails.updating,
  updateSuccess: storeState.nonConformanceDetails.updateSuccess
});

const mapDispatchToProps = {
  getProducts,
  getRoutings,
  getEmployees,
  getNonConformanceTypes,
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
)(NonConformanceDetailsUpdate);
