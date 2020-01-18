import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bom.reducer';
import { IBom } from 'app/shared/model/bom.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBomDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BomDetail extends React.Component<IBomDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bomEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Bom [<b>{bomEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="quantity">Quantity</span>
            </dt>
            <dd>{bomEntity.quantity}</dd>
            <dt>
              <span id="sequenceNumber">Sequence Number</span>
            </dt>
            <dd>{bomEntity.sequenceNumber}</dd>
            <dt>
              <span id="partNumber">Part Number</span>
            </dt>
            <dd>{bomEntity.partNumber}</dd>
            <dt>
              <span id="childPartNumber">Child Part Number</span>
            </dt>
            <dd>{bomEntity.childPartNumber}</dd>
            <dt>
              <span id="uniqueIdentifier">Unique Identifier</span>
            </dt>
            <dd>{bomEntity.uniqueIdentifier}</dd>
          </dl>
          <Button tag={Link} to="/bom" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/bom/${bomEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ bom }: IRootState) => ({
  bomEntity: bom.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BomDetail);
