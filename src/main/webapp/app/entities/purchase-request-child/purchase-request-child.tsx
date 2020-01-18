import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './purchase-request-child.reducer';
import { IPurchaseRequestChild } from 'app/shared/model/purchase-request-child.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseRequestChildProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class PurchaseRequestChild extends React.Component<IPurchaseRequestChildProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { purchaseRequestChildList, match } = this.props;
    return (
      <div>
        <h2 id="purchase-request-child-heading">
          Purchase Request Children
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Purchase Request Child
          </Link>
        </h2>
        <div className="table-responsive">
          {purchaseRequestChildList && purchaseRequestChildList.length > 0 ? (
            <Table responsive aria-describedby="purchase-request-child-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Quantity</th>
                  <th>Ordered Date</th>
                  <th>Due Date</th>
                  <th>Commited</th>
                  <th>Status</th>
                  <th>Comment</th>
                  <th>Product</th>
                  <th>Purchase Request Parent</th>
                  <th>Sales Order</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {purchaseRequestChildList.map((purchaseRequestChild, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${purchaseRequestChild.id}`} color="link" size="sm">
                        {purchaseRequestChild.id}
                      </Button>
                    </td>
                    <td>{purchaseRequestChild.quantity}</td>
                    <td>
                      <TextFormat type="date" value={purchaseRequestChild.orderedDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={purchaseRequestChild.dueDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{purchaseRequestChild.commited ? 'true' : 'false'}</td>
                    <td>{purchaseRequestChild.status}</td>
                    <td>{purchaseRequestChild.comment}</td>
                    <td>
                      {purchaseRequestChild.productId ? (
                        <Link to={`product/${purchaseRequestChild.productId}`}>{purchaseRequestChild.productId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {purchaseRequestChild.purchaseRequestParentId ? (
                        <Link to={`purchase-request-parent/${purchaseRequestChild.purchaseRequestParentId}`}>
                          {purchaseRequestChild.purchaseRequestParentId}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {purchaseRequestChild.salesOrderId ? (
                        <Link to={`sales-order/${purchaseRequestChild.salesOrderId}`}>{purchaseRequestChild.salesOrderId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${purchaseRequestChild.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${purchaseRequestChild.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${purchaseRequestChild.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Purchase Request Children found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ purchaseRequestChild }: IRootState) => ({
  purchaseRequestChildList: purchaseRequestChild.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseRequestChild);
