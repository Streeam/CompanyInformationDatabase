import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './action-to-be-taken.reducer';
import { IActionToBeTaken } from 'app/shared/model/action-to-be-taken.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IActionToBeTakenUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IActionToBeTakenUpdateState {
  isNew: boolean;
}

export class ActionToBeTakenUpdate extends React.Component<IActionToBeTakenUpdateProps, IActionToBeTakenUpdateState> {
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
      const { actionToBeTakenEntity } = this.props;
      const entity = {
        ...actionToBeTakenEntity,
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
    this.props.history.push('/action-to-be-taken');
  };

  render() {
    const { actionToBeTakenEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.actionToBeTaken.home.createOrEditLabel">Create or edit a ActionToBeTaken</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : actionToBeTakenEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="action-to-be-taken-id">ID</Label>
                    <AvInput id="action-to-be-taken-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="why1OccurranceLabel" for="action-to-be-taken-why1Occurrance">
                    Why 1 Occurrance
                  </Label>
                  <AvField id="action-to-be-taken-why1Occurrance" type="text" name="why1Occurrance" />
                </AvGroup>
                <AvGroup>
                  <Label id="why2OccurranceLabel" for="action-to-be-taken-why2Occurrance">
                    Why 2 Occurrance
                  </Label>
                  <AvField id="action-to-be-taken-why2Occurrance" type="text" name="why2Occurrance" />
                </AvGroup>
                <AvGroup>
                  <Label id="why3OccurranceLabel" for="action-to-be-taken-why3Occurrance">
                    Why 3 Occurrance
                  </Label>
                  <AvField id="action-to-be-taken-why3Occurrance" type="text" name="why3Occurrance" />
                </AvGroup>
                <AvGroup>
                  <Label id="why4OccurranceLabel" for="action-to-be-taken-why4Occurrance">
                    Why 4 Occurrance
                  </Label>
                  <AvField id="action-to-be-taken-why4Occurrance" type="text" name="why4Occurrance" />
                </AvGroup>
                <AvGroup>
                  <Label id="why5OccurranceLabel" for="action-to-be-taken-why5Occurrance">
                    Why 5 Occurrance
                  </Label>
                  <AvField id="action-to-be-taken-why5Occurrance" type="text" name="why5Occurrance" />
                </AvGroup>
                <AvGroup>
                  <Label id="why1DetectionLabel" for="action-to-be-taken-why1Detection">
                    Why 1 Detection
                  </Label>
                  <AvField id="action-to-be-taken-why1Detection" type="text" name="why1Detection" />
                </AvGroup>
                <AvGroup>
                  <Label id="why2DetectionLabel" for="action-to-be-taken-why2Detection">
                    Why 2 Detection
                  </Label>
                  <AvField id="action-to-be-taken-why2Detection" type="text" name="why2Detection" />
                </AvGroup>
                <AvGroup>
                  <Label id="why3DetactionLabel" for="action-to-be-taken-why3Detaction">
                    Why 3 Detaction
                  </Label>
                  <AvField id="action-to-be-taken-why3Detaction" type="text" name="why3Detaction" />
                </AvGroup>
                <AvGroup>
                  <Label id="why4DetectionLabel" for="action-to-be-taken-why4Detection">
                    Why 4 Detection
                  </Label>
                  <AvField id="action-to-be-taken-why4Detection" type="text" name="why4Detection" />
                </AvGroup>
                <AvGroup>
                  <Label id="why5DetectionLabel" for="action-to-be-taken-why5Detection">
                    Why 5 Detection
                  </Label>
                  <AvField id="action-to-be-taken-why5Detection" type="text" name="why5Detection" />
                </AvGroup>
                <AvGroup>
                  <Label id="rootCauseLabel" for="action-to-be-taken-rootCause">
                    Root Cause
                  </Label>
                  <AvField id="action-to-be-taken-rootCause" type="text" name="rootCause" />
                </AvGroup>
                <AvGroup>
                  <Label id="problemLabel" for="action-to-be-taken-problem">
                    Problem
                  </Label>
                  <AvField id="action-to-be-taken-problem" type="text" name="problem" />
                </AvGroup>
                <AvGroup>
                  <Label id="nonconformanceIdLabel" for="action-to-be-taken-nonconformanceId">
                    Nonconformance Id
                  </Label>
                  <AvField
                    id="action-to-be-taken-nonconformanceId"
                    type="string"
                    className="form-control"
                    name="nonconformanceId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/action-to-be-taken" replace color="info">
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
  actionToBeTakenEntity: storeState.actionToBeTaken.entity,
  loading: storeState.actionToBeTaken.loading,
  updating: storeState.actionToBeTaken.updating,
  updateSuccess: storeState.actionToBeTaken.updateSuccess
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
)(ActionToBeTakenUpdate);
