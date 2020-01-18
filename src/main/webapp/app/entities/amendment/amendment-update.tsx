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
import { getEntity, updateEntity, createEntity, reset } from './amendment.reducer';
import { IAmendment } from 'app/shared/model/amendment.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAmendmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAmendmentUpdateState {
  isNew: boolean;
  employeeId: string;
}

export class AmendmentUpdate extends React.Component<IAmendmentUpdateProps, IAmendmentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { amendmentEntity } = this.props;
      const entity = {
        ...amendmentEntity,
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
    this.props.history.push('/entity/amendment');
  };

  render() {
    const { amendmentEntity, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.amendment.home.createOrEditLabel">Create or edit a Amendment</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : amendmentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="amendment-id">ID</Label>
                    <AvInput id="amendment-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statusLabel" for="amendment-status">
                    Status
                  </Label>
                  <AvInput
                    id="amendment-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && amendmentEntity.status) || 'CHANGE_REQUEST_SUBMITED'}
                  >
                    <option value="CHANGE_REQUEST_SUBMITED">CHANGE_REQUEST_SUBMITED</option>
                    <option value="ANALYSE_CHANGE_REQUEST">ANALYSE_CHANGE_REQUEST</option>
                    <option value="PLAN_CHANGE">PLAN_CHANGE</option>
                    <option value="IMPLEMENT_CHANGE">IMPLEMENT_CHANGE</option>
                    <option value="REVIEW_CLOSE_CHANGE">REVIEW_CLOSE_CHANGE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="deadlineLabel" for="amendment-deadline">
                    Deadline
                  </Label>
                  <AvField id="amendment-deadline" type="date" className="form-control" name="deadline" />
                </AvGroup>
                <AvGroup>
                  <Label id="priorityLabel" for="amendment-priority">
                    Priority
                  </Label>
                  <AvInput
                    id="amendment-priority"
                    type="select"
                    className="form-control"
                    name="priority"
                    value={(!isNew && amendmentEntity.priority) || 'LOW'}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="proposedDateLabel" for="amendment-proposedDate">
                    Proposed Date
                  </Label>
                  <AvField id="amendment-proposedDate" type="date" className="form-control" name="proposedDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="currentConditionLabel" for="amendment-currentCondition">
                    Current Condition
                  </Label>
                  <AvField id="amendment-currentCondition" type="text" name="currentCondition" />
                </AvGroup>
                <AvGroup>
                  <Label id="proposeAmendmentLabel" for="amendment-proposeAmendment">
                    Propose Amendment
                  </Label>
                  <AvField
                    id="amendment-proposeAmendment"
                    type="text"
                    name="proposeAmendment"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="reasonForChangeLabel" for="amendment-reasonForChange">
                    Reason For Change
                  </Label>
                  <AvField
                    id="amendment-reasonForChange"
                    type="text"
                    name="reasonForChange"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="rejectionReasonLabel" for="amendment-rejectionReason">
                    Rejection Reason
                  </Label>
                  <AvField id="amendment-rejectionReason" type="text" name="rejectionReason" />
                </AvGroup>
                <AvGroup>
                  <Label id="progressLabel" for="amendment-progress">
                    Progress
                  </Label>
                  <AvField
                    id="amendment-progress"
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
                  <Label for="amendment-employee">Employee</Label>
                  <AvInput id="amendment-employee" type="select" className="form-control" name="employeeId">
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
                <Button tag={Link} id="cancel-save" to="/entity/amendment" replace color="info">
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
  amendmentEntity: storeState.amendment.entity,
  loading: storeState.amendment.loading,
  updating: storeState.amendment.updating,
  updateSuccess: storeState.amendment.updateSuccess
});

const mapDispatchToProps = {
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
)(AmendmentUpdate);
