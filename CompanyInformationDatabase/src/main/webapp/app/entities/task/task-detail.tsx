import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TaskDetail extends React.Component<ITaskDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { taskEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Task [<b>{taskEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="taskDescription">Task Description</span>
            </dt>
            <dd>{taskEntity.taskDescription}</dd>
            <dt>
              <span id="startDate">Start Date</span>
            </dt>
            <dd>
              <TextFormat value={taskEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">End Date</span>
            </dt>
            <dd>
              <TextFormat value={taskEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="progress">Progress</span>
            </dt>
            <dd>{taskEntity.progress}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{taskEntity.status}</dd>
            <dt>
              <span id="priority">Priority</span>
            </dt>
            <dd>{taskEntity.priority}</dd>
            <dt>
              <span id="nonconformanceId">Nonconformance Id</span>
            </dt>
            <dd>{taskEntity.nonconformanceId}</dd>
            <dt>
              <span id="employeeId">Employee Id</span>
            </dt>
            <dd>{taskEntity.employeeId}</dd>
            <dt>Amendment</dt>
            <dd>{taskEntity.amendmentId ? taskEntity.amendmentId : ''}</dd>
          </dl>
          <Button tag={Link} to="/task" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ task }: IRootState) => ({
  taskEntity: task.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
