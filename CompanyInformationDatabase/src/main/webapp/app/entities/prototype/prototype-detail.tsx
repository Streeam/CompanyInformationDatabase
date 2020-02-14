import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prototype.reducer';
import { IPrototype } from 'app/shared/model/prototype.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrototypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PrototypeDetail extends React.Component<IPrototypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { prototypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Prototype [<b>{prototypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{prototypeEntity.status}</dd>
            <dt>
              <span id="deadline">Deadline</span>
            </dt>
            <dd>
              <TextFormat value={prototypeEntity.deadline} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="priority">Priority</span>
            </dt>
            <dd>{prototypeEntity.priority}</dd>
            <dt>
              <span id="proposedDate">Proposed Date</span>
            </dt>
            <dd>
              <TextFormat value={prototypeEntity.proposedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="progress">Progress</span>
            </dt>
            <dd>{prototypeEntity.progress}</dd>
          </dl>
          <Button tag={Link} to="/entity/prototype" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/prototype/${prototypeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ prototype }: IRootState) => ({
  prototypeEntity: prototype.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrototypeDetail);
