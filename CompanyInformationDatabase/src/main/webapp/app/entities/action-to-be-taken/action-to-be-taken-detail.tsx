import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './action-to-be-taken.reducer';
import { IActionToBeTaken } from 'app/shared/model/action-to-be-taken.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IActionToBeTakenDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ActionToBeTakenDetail extends React.Component<IActionToBeTakenDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { actionToBeTakenEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ActionToBeTaken [<b>{actionToBeTakenEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="why1Occurrance">Why 1 Occurrance</span>
            </dt>
            <dd>{actionToBeTakenEntity.why1Occurrance}</dd>
            <dt>
              <span id="why2Occurrance">Why 2 Occurrance</span>
            </dt>
            <dd>{actionToBeTakenEntity.why2Occurrance}</dd>
            <dt>
              <span id="why3Occurrance">Why 3 Occurrance</span>
            </dt>
            <dd>{actionToBeTakenEntity.why3Occurrance}</dd>
            <dt>
              <span id="why4Occurrance">Why 4 Occurrance</span>
            </dt>
            <dd>{actionToBeTakenEntity.why4Occurrance}</dd>
            <dt>
              <span id="why5Occurrance">Why 5 Occurrance</span>
            </dt>
            <dd>{actionToBeTakenEntity.why5Occurrance}</dd>
            <dt>
              <span id="why1Detection">Why 1 Detection</span>
            </dt>
            <dd>{actionToBeTakenEntity.why1Detection}</dd>
            <dt>
              <span id="why2Detection">Why 2 Detection</span>
            </dt>
            <dd>{actionToBeTakenEntity.why2Detection}</dd>
            <dt>
              <span id="why3Detaction">Why 3 Detaction</span>
            </dt>
            <dd>{actionToBeTakenEntity.why3Detaction}</dd>
            <dt>
              <span id="why4Detection">Why 4 Detection</span>
            </dt>
            <dd>{actionToBeTakenEntity.why4Detection}</dd>
            <dt>
              <span id="why5Detection">Why 5 Detection</span>
            </dt>
            <dd>{actionToBeTakenEntity.why5Detection}</dd>
            <dt>
              <span id="rootCause">Root Cause</span>
            </dt>
            <dd>{actionToBeTakenEntity.rootCause}</dd>
            <dt>
              <span id="problem">Problem</span>
            </dt>
            <dd>{actionToBeTakenEntity.problem}</dd>
            <dt>
              <span id="nonconformanceId">Nonconformance Id</span>
            </dt>
            <dd>{actionToBeTakenEntity.nonconformanceId}</dd>
          </dl>
          <Button tag={Link} to="/action-to-be-taken" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/action-to-be-taken/${actionToBeTakenEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ actionToBeTaken }: IRootState) => ({
  actionToBeTakenEntity: actionToBeTaken.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionToBeTakenDetail);
