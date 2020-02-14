import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './amendment.reducer';
import { IAmendment } from 'app/shared/model/amendment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAmendmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AmendmentDetail extends React.Component<IAmendmentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { amendmentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Amendment [<b>{amendmentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{amendmentEntity.status}</dd>
            <dt>
              <span id="deadline">Deadline</span>
            </dt>
            <dd>
              <TextFormat value={amendmentEntity.deadline} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="priority">Priority</span>
            </dt>
            <dd>{amendmentEntity.priority}</dd>
            <dt>
              <span id="proposedDate">Proposed Date</span>
            </dt>
            <dd>
              <TextFormat value={amendmentEntity.proposedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="currentCondition">Current Condition</span>
            </dt>
            <dd>{amendmentEntity.currentCondition}</dd>
            <dt>
              <span id="proposeAmendment">Propose Amendment</span>
            </dt>
            <dd>{amendmentEntity.proposeAmendment}</dd>
            <dt>
              <span id="reasonForChange">Reason For Change</span>
            </dt>
            <dd>{amendmentEntity.reasonForChange}</dd>
            <dt>
              <span id="rejectionReason">Rejection Reason</span>
            </dt>
            <dd>{amendmentEntity.rejectionReason}</dd>
            <dt>
              <span id="progress">Progress</span>
            </dt>
            <dd>{amendmentEntity.progress}</dd>
            <dt>Employee</dt>
            <dd>{amendmentEntity.employeeId ? amendmentEntity.employeeId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/amendment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/amendment/${amendmentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ amendment }: IRootState) => ({
  amendmentEntity: amendment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendmentDetail);
