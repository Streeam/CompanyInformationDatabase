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
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { getEntities as getNonConformanceDetails } from 'app/entities/non-conformance-details/non-conformance-details.reducer';
import { getEntity, updateEntity, createEntity, reset } from './audit-non-conformance.reducer';
import { IAuditNonConformance } from 'app/shared/model/audit-non-conformance.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAuditNonConformanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAuditNonConformanceUpdateState {
  isNew: boolean;
  employeeId: string;
  nonConformanceDetailsId: string;
}

export class AuditNonConformanceUpdate extends React.Component<IAuditNonConformanceUpdateProps, IAuditNonConformanceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
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
    this.props.getNonConformanceDetails();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { auditNonConformanceEntity } = this.props;
      const entity = {
        ...auditNonConformanceEntity,
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
    this.props.history.push('/entity/audit-non-conformance');
  };

  render() {
    const { auditNonConformanceEntity, employees, nonConformanceDetails, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.auditNonConformance.home.createOrEditLabel">Create or edit a AuditNonConformance</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : auditNonConformanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="audit-non-conformance-id">ID</Label>
                    <AvInput id="audit-non-conformance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="auditNonConformanceFirstTypeLabel" for="audit-non-conformance-auditNonConformanceFirstType">
                    Audit Non Conformance First Type
                  </Label>
                  <AvInput
                    id="audit-non-conformance-auditNonConformanceFirstType"
                    type="select"
                    className="form-control"
                    name="auditNonConformanceFirstType"
                    value={(!isNew && auditNonConformanceEntity.auditNonConformanceFirstType) || 'INTERNAL'}
                  >
                    <option value="INTERNAL">INTERNAL</option>
                    <option value="EXTERNAL">EXTERNAL</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="auditNonConformanceSecondTypeLabel" for="audit-non-conformance-auditNonConformanceSecondType">
                    Audit Non Conformance Second Type
                  </Label>
                  <AvInput
                    id="audit-non-conformance-auditNonConformanceSecondType"
                    type="select"
                    className="form-control"
                    name="auditNonConformanceSecondType"
                    value={(!isNew && auditNonConformanceEntity.auditNonConformanceSecondType) || 'MINOR_NON_CONFORMACE'}
                  >
                    <option value="MINOR_NON_CONFORMACE">MINOR_NON_CONFORMACE</option>
                    <option value="OPORTUNITY_FORIMPROVEMENT">OPORTUNITY_FORIMPROVEMENT</option>
                    <option value="MAJOR_NON_CONFORMACE">MAJOR_NON_CONFORMACE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="audit-non-conformance-employee">Employee</Label>
                  <AvInput id="audit-non-conformance-employee" type="select" className="form-control" name="employeeId">
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
                  <Label for="audit-non-conformance-nonConformanceDetails">Non Conformance Details</Label>
                  <AvInput
                    id="audit-non-conformance-nonConformanceDetails"
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
                <Button tag={Link} id="cancel-save" to="/entity/audit-non-conformance" replace color="info">
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
  nonConformanceDetails: storeState.nonConformanceDetails.entities,
  auditNonConformanceEntity: storeState.auditNonConformance.entity,
  loading: storeState.auditNonConformance.loading,
  updating: storeState.auditNonConformance.updating,
  updateSuccess: storeState.auditNonConformance.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
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
)(AuditNonConformanceUpdate);
