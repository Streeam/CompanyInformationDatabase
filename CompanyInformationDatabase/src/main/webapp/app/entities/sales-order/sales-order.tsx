import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales-order.reducer';
import { ISalesOrder } from 'app/shared/model/sales-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ISalesOrderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ISalesOrderState = IPaginationBaseState;

export class SalesOrder extends React.Component<ISalesOrderProps, ISalesOrderState> {
  state: ISalesOrderState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { salesOrderList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="sales-order-heading">
          Sales Orders
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Sales Order
          </Link>
        </h2>
        <div className="table-responsive">
          {salesOrderList && salesOrderList.length > 0 ? (
            <Table responsive aria-describedby="sales-order-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesOrderNumber')}>
                    Sales Order Number <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('dateRaised')}>
                    Date Raised <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('soSalesStatus')}>
                    So Sales Status <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('secondSalesReference')}>
                    Second Sales Reference <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('currencyCode')}>
                    Currency Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('exchangeRate')}>
                    Exchange Rate <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('discountPercent')}>
                    Discount Percent <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('contactName')}>
                    Contact Name <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ourContact')}>
                    Our Contact <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('invoiceAddress')}>
                    Invoice Address <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('invoiceCountryCode')}>
                    Invoice Country Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesOrderTitle')}>
                    Sales Order Title <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesAnalysis1')}>
                    Sales Analysis 1 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesAnalysis2')}>
                    Sales Analysis 2 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesAnalysis3')}>
                    Sales Analysis 3 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesAnalysis4')}>
                    Sales Analysis 4 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesAnalysis5')}>
                    Sales Analysis 5 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesAnalysis6')}>
                    Sales Analysis 6 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('memo1')}>
                    Memo 1 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('memo2')}>
                    Memo 2 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('memo3')}>
                    Memo 3 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('memo4')}>
                    Memo 4 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('memo5')}>
                    Memo 5 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('memo6')}>
                    Memo 6 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis01')}>
                    Stock Analysis 01 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis02')}>
                    Stock Analysis 02 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis03')}>
                    Stock Analysis 03 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis04')}>
                    Stock Analysis 04 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis05')}>
                    Stock Analysis 05 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis06')}>
                    Stock Analysis 06 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis07')}>
                    Stock Analysis 07 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis08')}>
                    Stock Analysis 08 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis09')}>
                    Stock Analysis 09 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('stockAnalysis10')}>
                    Stock Analysis 10 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('deliveryCode')}>
                    Delivery Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('transactionCode')}>
                    Transaction Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('code')}>
                    Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesOrderStatusCode')}>
                    Sales Order Status Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('despatchStatusID')}>
                    Despatch Status ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('division')}>
                    Division <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('lineNumber')}>
                    Line Number <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('despatchStatusCode')}>
                    Despatch Status Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('quantityOrdered')}>
                    Quantity Ordered <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('quantityOutstanding')}>
                    Quantity Outstanding <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('quantityDespatched')}>
                    Quantity Despatched <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('despatchDate')}>
                    Despatch Date <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('custRequiredDate')}>
                    Cust Required Date <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('unitPrice')}>
                    Unit Price <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('unitPriceinBase')}>
                    Unit Pricein Base <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('lineDiscountPercent')}>
                    Line Discount Percent <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('marginPercent')}>
                    Margin Percent <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('lineTotal')}>
                    Line Total <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('lineTotalinBase')}>
                    Line Totalin Base <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('taxCode')}>
                    Tax Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('nominalCode')}>
                    Nominal Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('onHold')}>
                    On Hold <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('rCode')}>
                    R Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardMargin')}>
                    Standard Margin <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('deliveryAddress')}>
                    Delivery Address <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('deliveryAddressDescription')}>
                    Delivery Address Description <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('deliveryCountryCode')}>
                    Delivery Country Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salesOrderStatus')}>
                    Sales Order Status <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Customer <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {salesOrderList.map((salesOrder, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${salesOrder.id}`} color="link" size="sm">
                        {salesOrder.id}
                      </Button>
                    </td>
                    <td>{salesOrder.salesOrderNumber}</td>
                    <td>
                      <TextFormat type="date" value={salesOrder.dateRaised} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{salesOrder.soSalesStatus}</td>
                    <td>{salesOrder.secondSalesReference}</td>
                    <td>{salesOrder.currencyCode}</td>
                    <td>{salesOrder.exchangeRate}</td>
                    <td>{salesOrder.discountPercent}</td>
                    <td>{salesOrder.contactName}</td>
                    <td>{salesOrder.ourContact}</td>
                    <td>{salesOrder.invoiceAddress}</td>
                    <td>{salesOrder.invoiceCountryCode}</td>
                    <td>{salesOrder.salesOrderTitle}</td>
                    <td>{salesOrder.salesAnalysis1}</td>
                    <td>{salesOrder.salesAnalysis2}</td>
                    <td>{salesOrder.salesAnalysis3}</td>
                    <td>{salesOrder.salesAnalysis4}</td>
                    <td>{salesOrder.salesAnalysis5}</td>
                    <td>{salesOrder.salesAnalysis6}</td>
                    <td>{salesOrder.memo1}</td>
                    <td>{salesOrder.memo2}</td>
                    <td>{salesOrder.memo3}</td>
                    <td>{salesOrder.memo4}</td>
                    <td>{salesOrder.memo5}</td>
                    <td>{salesOrder.memo6}</td>
                    <td>{salesOrder.stockAnalysis01}</td>
                    <td>{salesOrder.stockAnalysis02}</td>
                    <td>{salesOrder.stockAnalysis03}</td>
                    <td>{salesOrder.stockAnalysis04}</td>
                    <td>{salesOrder.stockAnalysis05}</td>
                    <td>{salesOrder.stockAnalysis06}</td>
                    <td>{salesOrder.stockAnalysis07}</td>
                    <td>{salesOrder.stockAnalysis08}</td>
                    <td>{salesOrder.stockAnalysis09}</td>
                    <td>{salesOrder.stockAnalysis10}</td>
                    <td>{salesOrder.deliveryCode}</td>
                    <td>{salesOrder.transactionCode}</td>
                    <td>{salesOrder.code}</td>
                    <td>{salesOrder.salesOrderStatusCode}</td>
                    <td>{salesOrder.despatchStatusID}</td>
                    <td>{salesOrder.division}</td>
                    <td>{salesOrder.lineNumber}</td>
                    <td>{salesOrder.despatchStatusCode}</td>
                    <td>{salesOrder.quantityOrdered}</td>
                    <td>{salesOrder.quantityOutstanding}</td>
                    <td>{salesOrder.quantityDespatched}</td>
                    <td>
                      <TextFormat type="date" value={salesOrder.despatchDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={salesOrder.custRequiredDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{salesOrder.unitPrice}</td>
                    <td>{salesOrder.unitPriceinBase}</td>
                    <td>{salesOrder.lineDiscountPercent}</td>
                    <td>{salesOrder.marginPercent}</td>
                    <td>{salesOrder.lineTotal}</td>
                    <td>{salesOrder.lineTotalinBase}</td>
                    <td>{salesOrder.taxCode}</td>
                    <td>{salesOrder.nominalCode}</td>
                    <td>{salesOrder.onHold ? 'true' : 'false'}</td>
                    <td>{salesOrder.rCode}</td>
                    <td>{salesOrder.standardMargin}</td>
                    <td>{salesOrder.deliveryAddress}</td>
                    <td>{salesOrder.deliveryAddressDescription}</td>
                    <td>{salesOrder.deliveryCountryCode}</td>
                    <td>{salesOrder.salesOrderStatus}</td>
                    <td>{salesOrder.customerId ? <Link to={`customer/${salesOrder.customerId}`}>{salesOrder.customerId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${salesOrder.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${salesOrder.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${salesOrder.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Sales Orders found</div>
          )}
        </div>
        <div className={salesOrderList && salesOrderList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ salesOrder }: IRootState) => ({
  salesOrderList: salesOrder.entities,
  totalItems: salesOrder.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesOrder);
