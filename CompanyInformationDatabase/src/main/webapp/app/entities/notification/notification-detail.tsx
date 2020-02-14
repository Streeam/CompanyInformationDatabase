import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotificationDetail extends React.Component<INotificationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Notification [<b>{notificationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="comment">Comment</span>
            </dt>
            <dd>{notificationEntity.comment}</dd>
            <dt>
              <span id="read">Read</span>
            </dt>
            <dd>{notificationEntity.read ? 'true' : 'false'}</dd>
            <dt>
              <span id="format">Format</span>
            </dt>
            <dd>{notificationEntity.format}</dd>
            <dt>
              <span id="referencedEmployee">Referenced Employee</span>
            </dt>
            <dd>{notificationEntity.referencedEmployee}</dd>
            <dt>
              <span id="sentDate">Sent Date</span>
            </dt>
            <dd>
              <TextFormat value={notificationEntity.sentDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="employeeId">Employee Id</span>
            </dt>
            <dd>{notificationEntity.employeeId}</dd>
          </dl>
          <Button tag={Link} to="/notification" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/notification/${notificationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ notification }: IRootState) => ({
  notificationEntity: notification.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDetail);
