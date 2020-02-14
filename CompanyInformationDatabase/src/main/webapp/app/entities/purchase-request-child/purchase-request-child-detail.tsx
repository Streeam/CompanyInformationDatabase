import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './purchase-request-child.reducer';
import { IPurchaseRequestChild } from 'app/shared/model/purchase-request-child.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseRequestChildDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PurchaseRequestChildDetail extends React.Component<IPurchaseRequestChildDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { purchaseRequestChildEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PurchaseRequestChild [<b>{purchaseRequestChildEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="quantity">Quantity</span>
            </dt>
            <dd>{purchaseRequestChildEntity.quantity}</dd>
            <dt>
              <span id="orderedDate">Ordered Date</span>
            </dt>
            <dd>
              <TextFormat value={purchaseRequestChildEntity.orderedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dueDate">Due Date</span>
            </dt>
            <dd>
              <TextFormat value={purchaseRequestChildEntity.dueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="commited">Commited</span>
            </dt>
            <dd>{purchaseRequestChildEntity.commited ? 'true' : 'false'}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{purchaseRequestChildEntity.status}</dd>
            <dt>
              <span id="comment">Comment</span>
            </dt>
            <dd>{purchaseRequestChildEntity.comment}</dd>
            <dt>Product</dt>
            <dd>{purchaseRequestChildEntity.productId ? purchaseRequestChildEntity.productId : ''}</dd>
            <dt>Purchase Request Parent</dt>
            <dd>{purchaseRequestChildEntity.purchaseRequestParentId ? purchaseRequestChildEntity.purchaseRequestParentId : ''}</dd>
            <dt>Sales Order</dt>
            <dd>{purchaseRequestChildEntity.salesOrderId ? purchaseRequestChildEntity.salesOrderId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/purchase-request-child" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/purchase-request-child/${purchaseRequestChildEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ purchaseRequestChild }: IRootState) => ({
  purchaseRequestChildEntity: purchaseRequestChild.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseRequestChildDetail);
