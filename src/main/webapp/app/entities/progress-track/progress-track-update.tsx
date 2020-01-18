import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './progress-track.reducer';
import { IProgressTrack } from 'app/shared/model/progress-track.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProgressTrackUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProgressTrackUpdateState {
  isNew: boolean;
  taskId: string;
}

export class ProgressTrackUpdate extends React.Component<IProgressTrackUpdateProps, IProgressTrackUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      taskId: '0',
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

    this.props.getTasks();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const { progressTrackEntity } = this.props;
      const entity = {
        ...progressTrackEntity,
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
    this.props.history.push('/progress-track');
  };

  render() {
    const { progressTrackEntity, tasks, loading, updating } = this.props;
    const { isNew } = this.state;

    const { progressDescription } = progressTrackEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.progressTrack.home.createOrEditLabel">Create or edit a ProgressTrack</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : progressTrackEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="progress-track-id">ID</Label>
                    <AvInput id="progress-track-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="progressDescriptionLabel" for="progress-track-progressDescription">
                    Progress Description
                  </Label>
                  <AvInput id="progress-track-progressDescription" type="textarea" name="progressDescription" />
                </AvGroup>
                <AvGroup>
                  <Label id="completeLabel" check>
                    <AvInput id="progress-track-complete" type="checkbox" className="form-control" name="complete" />
                    Complete
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="progress-track-date">
                    Date
                  </Label>
                  <AvInput
                    id="progress-track-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.progressTrackEntity.date)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="progress-track-task">Task</Label>
                  <AvInput id="progress-track-task" type="select" className="form-control" name="taskId">
                    <option value="" key="0" />
                    {tasks
                      ? tasks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/progress-track" replace color="info">
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
  tasks: storeState.task.entities,
  progressTrackEntity: storeState.progressTrack.entity,
  loading: storeState.progressTrack.loading,
  updating: storeState.progressTrack.updating,
  updateSuccess: storeState.progressTrack.updateSuccess
});

const mapDispatchToProps = {
  getTasks,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressTrackUpdate);
