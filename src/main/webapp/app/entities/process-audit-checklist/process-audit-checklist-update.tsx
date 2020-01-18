import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './process-audit-checklist.reducer';
import { IProcessAuditChecklist } from 'app/shared/model/process-audit-checklist.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProcessAuditChecklistUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProcessAuditChecklistUpdateState {
  isNew: boolean;
}

export class ProcessAuditChecklistUpdate extends React.Component<IProcessAuditChecklistUpdateProps, IProcessAuditChecklistUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { processAuditChecklistEntity } = this.props;
      const entity = {
        ...processAuditChecklistEntity,
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
    this.props.history.push('/process-audit-checklist');
  };

  render() {
    const { processAuditChecklistEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.processAuditChecklist.home.createOrEditLabel">Create or edit a ProcessAuditChecklist</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : processAuditChecklistEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="process-audit-checklist-id">ID</Label>
                    <AvInput id="process-audit-checklist-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="auditQuestionLabel" for="process-audit-checklist-auditQuestion">
                    Audit Question
                  </Label>
                  <AvField id="process-audit-checklist-auditQuestion" type="text" name="auditQuestion" />
                </AvGroup>
                <AvGroup>
                  <Label id="compliantLabel" check>
                    <AvInput id="process-audit-checklist-compliant" type="checkbox" className="form-control" name="compliant" />
                    Compliant
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="ofiLabel" check>
                    <AvInput id="process-audit-checklist-ofi" type="checkbox" className="form-control" name="ofi" />
                    Ofi
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="minorNCLabel" check>
                    <AvInput id="process-audit-checklist-minorNC" type="checkbox" className="form-control" name="minorNC" />
                    Minor NC
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="majorNCLabel" check>
                    <AvInput id="process-audit-checklist-majorNC" type="checkbox" className="form-control" name="majorNC" />
                    Major NC
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="auditAnswerLabel" for="process-audit-checklist-auditAnswer">
                    Audit Answer
                  </Label>
                  <AvField id="process-audit-checklist-auditAnswer" type="text" name="auditAnswer" />
                </AvGroup>
                <AvGroup>
                  <Label id="opportunitiesForImprovementLabel" for="process-audit-checklist-opportunitiesForImprovement">
                    Opportunities For Improvement
                  </Label>
                  <AvField id="process-audit-checklist-opportunitiesForImprovement" type="text" name="opportunitiesForImprovement" />
                </AvGroup>
                <AvGroup>
                  <Label id="nonConformanceIdLabel" for="process-audit-checklist-nonConformanceId">
                    Non Conformance Id
                  </Label>
                  <AvField
                    id="process-audit-checklist-nonConformanceId"
                    type="string"
                    className="form-control"
                    name="nonConformanceId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/process-audit-checklist" replace color="info">
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
  processAuditChecklistEntity: storeState.processAuditChecklist.entity,
  loading: storeState.processAuditChecklist.loading,
  updating: storeState.processAuditChecklist.updating,
  updateSuccess: storeState.processAuditChecklist.updateSuccess
});

const mapDispatchToProps = {
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
)(ProcessAuditChecklistUpdate);
