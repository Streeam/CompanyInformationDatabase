import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './prototype.reducer';
import { IPrototype } from 'app/shared/model/prototype.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrototypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPrototypeUpdateState {
  isNew: boolean;
}

export class PrototypeUpdate extends React.Component<IPrototypeUpdateProps, IPrototypeUpdateState> {
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
      const { prototypeEntity } = this.props;
      const entity = {
        ...prototypeEntity,
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
    this.props.history.push('/entity/prototype');
  };

  render() {
    const { prototypeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.prototype.home.createOrEditLabel">Create or edit a Prototype</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : prototypeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="prototype-id">ID</Label>
                    <AvInput id="prototype-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statusLabel" for="prototype-status">
                    Status
                  </Label>
                  <AvInput
                    id="prototype-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && prototypeEntity.status) || 'PENDING'}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETE">COMPLETE</option>
                    <option value="STUCK">STUCK</option>
                    <option value="NEED_HELP">NEED_HELP</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="deadlineLabel" for="prototype-deadline">
                    Deadline
                  </Label>
                  <AvField id="prototype-deadline" type="date" className="form-control" name="deadline" />
                </AvGroup>
                <AvGroup>
                  <Label id="priorityLabel" for="prototype-priority">
                    Priority
                  </Label>
                  <AvInput
                    id="prototype-priority"
                    type="select"
                    className="form-control"
                    name="priority"
                    value={(!isNew && prototypeEntity.priority) || 'LOW'}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="proposedDateLabel" for="prototype-proposedDate">
                    Proposed Date
                  </Label>
                  <AvField id="prototype-proposedDate" type="date" className="form-control" name="proposedDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="progressLabel" for="prototype-progress">
                    Progress
                  </Label>
                  <AvField
                    id="prototype-progress"
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
                <Button tag={Link} id="cancel-save" to="/entity/prototype" replace color="info">
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
  prototypeEntity: storeState.prototype.entity,
  loading: storeState.prototype.loading,
  updating: storeState.prototype.updating,
  updateSuccess: storeState.prototype.updateSuccess
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
)(PrototypeUpdate);
