import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './long-term-action.reducer';
import { ILongTermAction } from 'app/shared/model/long-term-action.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILongTermActionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LongTermActionDetail extends React.Component<ILongTermActionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { longTermActionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            LongTermAction [<b>{longTermActionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nonConformanceId">Non Conformance Id</span>
            </dt>
            <dd>{longTermActionEntity.nonConformanceId}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{longTermActionEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/long-term-action" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/long-term-action/${longTermActionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ longTermAction }: IRootState) => ({
  longTermActionEntity: longTermAction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LongTermActionDetail);
