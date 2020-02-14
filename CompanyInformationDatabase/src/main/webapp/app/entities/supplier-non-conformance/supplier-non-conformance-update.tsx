import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { getEntities as getSuppliers } from 'app/entities/supplier/supplier.reducer';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { getEntities as getNonConformanceDetails } from 'app/entities/non-conformance-details/non-conformance-details.reducer';
import { getEntity, updateEntity, createEntity, reset } from './supplier-non-conformance.reducer';
import { ISupplierNonConformance } from 'app/shared/model/supplier-non-conformance.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISupplierNonConformanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISupplierNonConformanceUpdateState {
  isNew: boolean;
  employeeId: string;
  supplierId: string;
  nonConformanceDetailsId: string;
}

export class SupplierNonConformanceUpdate extends React.Component<ISupplierNonConformanceUpdateProps, ISupplierNonConformanceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
      supplierId: '0',
      nonConformanceDetailsId: '0',
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

    this.props.getEmployees();
    this.props.getSuppliers();
    this.props.getNonConformanceDetails();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { supplierNonConformanceEntity } = this.props;
      const entity = {
        ...supplierNonConformanceEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/supplier-non-conformance');
  };

  render() {
    const { supplierNonConformanceEntity, employees, suppliers, nonConformanceDetails, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.supplierNonConformance.home.createOrEditLabel">Create or edit a SupplierNonConformance</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : supplierNonConformanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="supplier-non-conformance-id">ID</Label>
                    <AvInput id="supplier-non-conformance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="actionLabel" for="supplier-non-conformance-action">
                    Action
                  </Label>
                  <AvInput
                    id="supplier-non-conformance-action"
                    type="select"
                    className="form-control"
                    name="action"
                    value={(!isNew && supplierNonConformanceEntity.action) || 'SCRAP'}
                  >
                    <option value="SCRAP">SCRAP</option>
                    <option value="REWORK">REWORK</option>
                    <option value="REJECT">REJECT</option>
                    <option value="CONCESSION">CONCESSION</option>
                    <option value="OTHER">OTHER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="labourLabel" for="supplier-non-conformance-labour">
                    Labour
                  </Label>
                  <AvField
                    id="supplier-non-conformance-labour"
                    type="string"
                    className="form-control"
                    name="labour"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="concesionDetailsLabel" for="supplier-non-conformance-concesionDetails">
                    Concesion Details
                  </Label>
                  <AvField id="supplier-non-conformance-concesionDetails" type="text" name="concesionDetails" />
                </AvGroup>
                <AvGroup>
                  <Label id="rejectionFeeLabel" for="supplier-non-conformance-rejectionFee">
                    Rejection Fee
                  </Label>
                  <AvField
                    id="supplier-non-conformance-rejectionFee"
                    type="string"
                    className="form-control"
                    name="rejectionFee"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nonConformanceTypeLabel" for="supplier-non-conformance-nonConformanceType">
                    Non Conformance Type
                  </Label>
                  <AvInput
                    id="supplier-non-conformance-nonConformanceType"
                    type="select"
                    className="form-control"
                    name="nonConformanceType"
                    value={(!isNew && supplierNonConformanceEntity.nonConformanceType) || 'NON_CONFORMING_PRODUCT_SERVICE'}
                  >
                    <option value="NON_CONFORMING_PRODUCT_SERVICE">NON_CONFORMING_PRODUCT_SERVICE</option>
                    <option value="LATE_DELIVERY">LATE_DELIVERY</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="supplier-non-conformance-employee">Employee</Label>
                  <AvInput id="supplier-non-conformance-employee" type="select" className="form-control" name="employeeId">
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
                <AvGroup>
                  <Label for="supplier-non-conformance-supplier">Supplier</Label>
                  <AvInput id="supplier-non-conformance-supplier" type="select" className="form-control" name="supplierId">
                    <option value="" key="0" />
                    {suppliers
                      ? suppliers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="supplier-non-conformance-nonConformanceDetails">Non Conformance Details</Label>
                  <AvInput
                    id="supplier-non-conformance-nonConformanceDetails"
                    type="select"
                    className="form-control"
                    name="nonConformanceDetailsId"
                  >
                    <option value="" key="0" />
                    {nonConformanceDetails
                      ? nonConformanceDetails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/supplier-non-conformance" replace color="info">
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
  employees: storeState.employee.entities,
  suppliers: storeState.supplier.entities,
  nonConformanceDetails: storeState.nonConformanceDetails.entities,
  supplierNonConformanceEntity: storeState.supplierNonConformance.entity,
  loading: storeState.supplierNonConformance.loading,
  updating: storeState.supplierNonConformance.updating,
  updateSuccess: storeState.supplierNonConformance.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getSuppliers,
  getNonConformanceDetails,
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
)(SupplierNonConformanceUpdate);
