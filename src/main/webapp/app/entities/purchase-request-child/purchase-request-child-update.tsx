import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduct } from 'app/shared/model/product.model';
import { getAllProductsFromDB as getProducts } from 'app/entities/product/product.reducer';
import { IPurchaseRequestParent } from 'app/shared/model/purchase-request-parent.model';
import { getEntities as getPurchaseRequestParents } from 'app/entities/purchase-request-parent/purchase-request-parent.reducer';
import { ISalesOrder } from 'app/shared/model/sales-order.model';
import { getEntities as getSalesOrders } from 'app/entities/sales-order/sales-order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './purchase-request-child.reducer';
import { IPurchaseRequestChild } from 'app/shared/model/purchase-request-child.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPurchaseRequestChildUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPurchaseRequestChildUpdateState {
  isNew: boolean;
  productId: string;
  purchaseRequestParentId: string;
  salesOrderId: string;
}

export class PurchaseRequestChildUpdate extends React.Component<IPurchaseRequestChildUpdateProps, IPurchaseRequestChildUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      productId: '0',
      purchaseRequestParentId: '0',
      salesOrderId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getProducts();
    this.props.getPurchaseRequestParents();
    this.props.getSalesOrders();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { purchaseRequestChildEntity } = this.props;
      const entity = {
        ...purchaseRequestChildEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/purchase-request-child');
  };

  render() {
    const { purchaseRequestChildEntity, products, purchaseRequestParents, salesOrders, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.purchaseRequestChild.home.createOrEditLabel">Create or edit a PurchaseRequestChild</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : purchaseRequestChildEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="purchase-request-child-id">ID</Label>
                    <AvInput id="purchase-request-child-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="quantityLabel" for="purchase-request-child-quantity">
                    Quantity
                  </Label>
                  <AvField
                    id="purchase-request-child-quantity"
                    type="string"
                    className="form-control"
                    name="quantity"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="orderedDateLabel" for="purchase-request-child-orderedDate">
                    Ordered Date
                  </Label>
                  <AvField
                    id="purchase-request-child-orderedDate"
                    type="date"
                    className="form-control"
                    name="orderedDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dueDateLabel" for="purchase-request-child-dueDate">
                    Due Date
                  </Label>
                  <AvField
                    id="purchase-request-child-dueDate"
                    type="date"
                    className="form-control"
                    name="dueDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="commitedLabel" check>
                    <AvInput id="purchase-request-child-commited" type="checkbox" className="form-control" name="commited" />
                    Commited
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="purchase-request-child-status">
                    Status
                  </Label>
                  <AvInput
                    id="purchase-request-child-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && purchaseRequestChildEntity.status) || 'DESPATCHED'}
                  >
                    <option value="DESPATCHED">DESPATCHED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCELED">CANCELED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="commentLabel" for="purchase-request-child-comment">
                    Comment
                  </Label>
                  <AvField
                    id="purchase-request-child-comment"
                    type="text"
                    name="comment"
                    validate={{
                      maxLength: { value: 200, errorMessage: 'This field cannot be longer than 200 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="purchase-request-child-product">Product</Label>
                  <AvInput id="purchase-request-child-product" type="select" className="form-control" name="productId">
                    <option value="" key="0" />
                    {products
                      ? products.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="purchase-request-child-purchaseRequestParent">Purchase Request Parent</Label>
                  <AvInput
                    id="purchase-request-child-purchaseRequestParent"
                    type="select"
                    className="form-control"
                    name="purchaseRequestParentId"
                  >
                    <option value="" key="0" />
                    {purchaseRequestParents
                      ? purchaseRequestParents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="purchase-request-child-salesOrder">Sales Order</Label>
                  <AvInput id="purchase-request-child-salesOrder" type="select" className="form-control" name="salesOrderId">
                    <option value="" key="0" />
                    {salesOrders
                      ? salesOrders.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/purchase-request-child" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  products: storeState.product.entities,
  purchaseRequestParents: storeState.purchaseRequestParent.entities,
  salesOrders: storeState.salesOrder.entities,
  purchaseRequestChildEntity: storeState.purchaseRequestChild.entity,
  loading: storeState.purchaseRequestChild.loading,
  updating: storeState.purchaseRequestChild.updating,
  updateSuccess: storeState.purchaseRequestChild.updateSuccess
});

const mapDispatchToProps = {
  getProducts,
  getPurchaseRequestParents,
  getSalesOrders,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseRequestChildUpdate);
