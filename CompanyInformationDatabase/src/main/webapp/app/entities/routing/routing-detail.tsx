import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './routing.reducer';
import { IRouting } from 'app/shared/model/routing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoutingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RoutingDetail extends React.Component<IRoutingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { routingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Routing [<b>{routingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="resourceName">Resource Name</span>
            </dt>
            <dd>{routingEntity.resourceName}</dd>
            <dt>
              <span id="resourceType">Resource Type</span>
            </dt>
            <dd>{routingEntity.resourceType}</dd>
            <dt>
              <span id="unitRunTime">Unit Run Time</span>
            </dt>
            <dd>{routingEntity.unitRunTime}</dd>
            <dt>
              <span id="partNumber">Part Number</span>
            </dt>
            <dd>{routingEntity.partNumber}</dd>
            <dt>
              <span id="layoutTime">Layout Time</span>
            </dt>
            <dd>{routingEntity.layoutTime}</dd>
            <dt>
              <span id="uniqueIdentifier">Unique Identifier</span>
            </dt>
            <dd>{routingEntity.uniqueIdentifier}</dd>
          </dl>
          <Button tag={Link} to="/routing" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/routing/${routingEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ routing }: IRootState) => ({
  routingEntity: routing.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutingDetail);
