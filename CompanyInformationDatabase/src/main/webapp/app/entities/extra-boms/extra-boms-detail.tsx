import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './extra-boms.reducer';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExtraBomsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExtraBomsDetail extends React.Component<IExtraBomsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { extraBomsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ExtraBoms [<b>{extraBomsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="partNumber">Part Number</span>
            </dt>
            <dd>{extraBomsEntity.partNumber}</dd>
            <dt>
              <span id="partDescription">Part Description</span>
            </dt>
            <dd>{extraBomsEntity.partDescription}</dd>
            <dt>
              <span id="price">Price</span>
            </dt>
            <dd>{extraBomsEntity.price}</dd>
            <dt>
              <span id="quantity">Quantity</span>
            </dt>
            <dd>{extraBomsEntity.quantity}</dd>
            <dt>
              <span id="nonconformanceType">Nonconformance Type</span>
            </dt>
            <dd>{extraBomsEntity.nonconformanceType}</dd>
            <dt>
              <span id="nonconformanceAction">Nonconformance Action</span>
            </dt>
            <dd>{extraBomsEntity.nonconformanceAction}</dd>
            <dt>
              <span id="internalNonconformanceId">Internal Nonconformance Id</span>
            </dt>
            <dd>{extraBomsEntity.internalNonconformanceId}</dd>
            <dt>
              <span id="customerNonConformaceId">Customer Non Conformace Id</span>
            </dt>
            <dd>{extraBomsEntity.customerNonConformaceId}</dd>
          </dl>
          <Button tag={Link} to="/extra-boms" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/extra-boms/${extraBomsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ extraBoms }: IRootState) => ({
  extraBomsEntity: extraBoms.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraBomsDetail);
