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
import { ISite } from 'app/shared/model/site.model';
import { getEntities as getSites } from 'app/entities/site/site.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntity, updateEntity, createEntity, reset } from './internal-non-conformance.reducer';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInternalNonConformanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInternalNonConformanceUpdateState {
  isNew: boolean;
  idsemployee: any[];
  idssite: any[];
  idsdepartment: any[];
}

export class InternalNonConformanceUpdate extends React.Component<IInternalNonConformanceUpdateProps, IInternalNonConformanceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsemployee: [],
      idssite: [],
      idsdepartment: [],
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
    this.props.getSites();
    this.props.getDepartments();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { internalNonConformanceEntity } = this.props;
      const entity = {
        ...internalNonConformanceEntity,
        ...values,
        employees: mapIdList(values.employees),
        sites: mapIdList(values.sites),
        departments: mapIdList(values.departments)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/internal-non-conformance');
  };

  render() {
    const { internalNonConformanceEntity, employees, sites, departments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.internalNonConformance.home.createOrEditLabel">Create or edit a InternalNonConformance</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : internalNonConformanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="internal-non-conformance-id">ID</Label>
                    <AvInput id="internal-non-conformance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="actionLabel" for="internal-non-conformance-action">
                    Action
                  </Label>
                  <AvInput
                    id="internal-non-conformance-action"
                    type="select"
                    className="form-control"
                    name="action"
                    value={(!isNew && internalNonConformanceEntity.action) || 'SCRAP'}
                  >
                    <option value="SCRAP">SCRAP</option>
                    <option value="REWORK">REWORK</option>
                    <option value="REJECT">REJECT</option>
                    <option value="CONCESSION">CONCESSION</option>
                    <option value="OTHER">OTHER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="curentDateLabel" for="internal-non-conformance-curentDate">
                    Curent Date
                  </Label>
                  <AvField id="internal-non-conformance-curentDate" type="date" className="form-control" name="curentDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="rejectionDateLabel" for="internal-non-conformance-rejectionDate">
                    Rejection Date
                  </Label>
                  <AvField id="internal-non-conformance-rejectionDate" type="date" className="form-control" name="rejectionDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="rejectionReasonDetailsLabel" for="internal-non-conformance-rejectionReasonDetails">
                    Rejection Reason Details
                  </Label>
                  <AvField id="internal-non-conformance-rejectionReasonDetails" type="text" name="rejectionReasonDetails" />
                </AvGroup>
                <AvGroup>
                  <Label id="labourRateLabel" for="internal-non-conformance-labourRate">
                    Labour Rate
                  </Label>
                  <AvField
                    id="internal-non-conformance-labourRate"
                    type="string"
                    className="form-control"
                    name="labourRate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nonconformanceDetailsIdLabel" for="internal-non-conformance-nonconformanceDetailsId">
                    Nonconformance Details Id
                  </Label>
                  <AvField
                    id="internal-non-conformance-nonconformanceDetailsId"
                    type="string"
                    className="form-control"
                    name="nonconformanceDetailsId"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="internal-non-conformance-status">
                    Status
                  </Label>
                  <AvInput
                    id="internal-non-conformance-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && internalNonConformanceEntity.status) || 'PENDING'}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETE">COMPLETE</option>
                    <option value="STUCK">STUCK</option>
                    <option value="NEED_HELP">NEED_HELP</option>
                    <option value="INCOMPLETE">INCOMPLETE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="quantityLabel" for="internal-non-conformance-quantity">
                    Quantity
                  </Label>
                  <AvField
                    id="internal-non-conformance-quantity"
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
                  <Label for="internal-non-conformance-employee">Employee</Label>
                  <AvInput
                    id="internal-non-conformance-employee"
                    type="select"
                    multiple
                    className="form-control"
                    name="employees"
                    value={internalNonConformanceEntity.employees && internalNonConformanceEntity.employees.map(e => e.id)}
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
                <AvGroup>
                  <Label for="internal-non-conformance-site">Site</Label>
                  <AvInput
                    id="internal-non-conformance-site"
                    type="select"
                    multiple
                    className="form-control"
                    name="sites"
                    value={internalNonConformanceEntity.sites && internalNonConformanceEntity.sites.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {sites
                      ? sites.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.site}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="internal-non-conformance-department">Department</Label>
                  <AvInput
                    id="internal-non-conformance-department"
                    type="select"
                    multiple
                    className="form-control"
                    name="departments"
                    value={internalNonConformanceEntity.departments && internalNonConformanceEntity.departments.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {departments
                      ? departments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/internal-non-conformance" replace color="info">
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
  sites: storeState.site.entities,
  departments: storeState.department.entities,
  internalNonConformanceEntity: storeState.internalNonConformance.entity,
  loading: storeState.internalNonConformance.loading,
  updating: storeState.internalNonConformance.updating,
  updateSuccess: storeState.internalNonConformance.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getSites,
  getDepartments,
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
)(InternalNonConformanceUpdate);
