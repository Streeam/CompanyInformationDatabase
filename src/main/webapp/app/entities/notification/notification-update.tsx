import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INotificationUpdateState {
  isNew: boolean;
}

export class NotificationUpdate extends React.Component<INotificationUpdateProps, INotificationUpdateState> {
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
    values.sentDate = convertDateTimeToServer(values.sentDate);

    if (errors.length === 0) {
      const { notificationEntity } = this.props;
      const entity = {
        ...notificationEntity,
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
    this.props.history.push('/notification');
  };

  render() {
    const { notificationEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.notification.home.createOrEditLabel">Create or edit a Notification</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : notificationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="notification-id">ID</Label>
                    <AvInput id="notification-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="commentLabel" for="notification-comment">
                    Comment
                  </Label>
                  <AvField id="notification-comment" type="text" name="comment" />
                </AvGroup>
                <AvGroup>
                  <Label id="readLabel" check>
                    <AvInput id="notification-read" type="checkbox" className="form-control" name="read" />
                    Read
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="formatLabel" for="notification-format">
                    Format
                  </Label>
                  <AvInput
                    id="notification-format"
                    type="select"
                    className="form-control"
                    name="format"
                    value={(!isNew && notificationEntity.format) || 'INVITATION'}
                  >
                    <option value="INVITATION">INVITATION</option>
                    <option value="NEW_EMPLOYEE">NEW_EMPLOYEE</option>
                    <option value="COMPANY_DELETED">COMPANY_DELETED</option>
                    <option value="OTHERS">OTHERS</option>
                    <option value="NEW_NON_COMFORMANCE">NEW_NON_COMFORMANCE</option>
                    <option value="NON_COMFORMANCE_COMPLETED">NON_COMFORMANCE_COMPLETED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="referencedEmployeeLabel" for="notification-referencedEmployee">
                    Referenced Employee
                  </Label>
                  <AvField id="notification-referencedEmployee" type="text" name="referencedEmployee" />
                </AvGroup>
                <AvGroup>
                  <Label id="sentDateLabel" for="notification-sentDate">
                    Sent Date
                  </Label>
                  <AvInput
                    id="notification-sentDate"
                    type="datetime-local"
                    className="form-control"
                    name="sentDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.notificationEntity.sentDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="employeeIdLabel" for="notification-employeeId">
                    Employee Id
                  </Label>
                  <AvField
                    id="notification-employeeId"
                    type="string"
                    className="form-control"
                    name="employeeId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/notification" replace color="info">
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
  notificationEntity: storeState.notification.entity,
  loading: storeState.notification.loading,
  updating: storeState.notification.updating,
  updateSuccess: storeState.notification.updateSuccess
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
)(NotificationUpdate);
