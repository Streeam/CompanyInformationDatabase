import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './progress-track.reducer';
import { IProgressTrack } from 'app/shared/model/progress-track.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProgressTrackDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProgressTrackDetail extends React.Component<IProgressTrackDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { progressTrackEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ProgressTrack [<b>{progressTrackEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="progressDescription">Progress Description</span>
            </dt>
            <dd>{progressTrackEntity.progressDescription}</dd>
            <dt>
              <span id="complete">Complete</span>
            </dt>
            <dd>{progressTrackEntity.complete ? 'true' : 'false'}</dd>
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={progressTrackEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Task</dt>
            <dd>{progressTrackEntity.taskId ? progressTrackEntity.taskId : ''}</dd>
          </dl>
          <Button tag={Link} to="/progress-track" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/progress-track/${progressTrackEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ progressTrack }: IRootState) => ({
  progressTrackEntity: progressTrack.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressTrackDetail);
