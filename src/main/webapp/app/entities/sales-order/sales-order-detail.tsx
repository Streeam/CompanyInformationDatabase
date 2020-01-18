import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sales-order.reducer';
import { ISalesOrder } from 'app/shared/model/sales-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalesOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SalesOrderDetail extends React.Component<ISalesOrderDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { salesOrderEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            SalesOrder [<b>{salesOrderEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="salesOrderNumber">Sales Order Number</span>
            </dt>
            <dd>{salesOrderEntity.salesOrderNumber}</dd>
            <dt>
              <span id="dateRaised">Date Raised</span>
            </dt>
            <dd>
              <TextFormat value={salesOrderEntity.dateRaised} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="soSalesStatus">So Sales Status</span>
            </dt>
            <dd>{salesOrderEntity.soSalesStatus}</dd>
            <dt>
              <span id="secondSalesReference">Second Sales Reference</span>
            </dt>
            <dd>{salesOrderEntity.secondSalesReference}</dd>
            <dt>
              <span id="currencyCode">Currency Code</span>
            </dt>
            <dd>{salesOrderEntity.currencyCode}</dd>
            <dt>
              <span id="exchangeRate">Exchange Rate</span>
            </dt>
            <dd>{salesOrderEntity.exchangeRate}</dd>
            <dt>
              <span id="discountPercent">Discount Percent</span>
            </dt>
            <dd>{salesOrderEntity.discountPercent}</dd>
            <dt>
              <span id="contactName">Contact Name</span>
            </dt>
            <dd>{salesOrderEntity.contactName}</dd>
            <dt>
              <span id="ourContact">Our Contact</span>
            </dt>
            <dd>{salesOrderEntity.ourContact}</dd>
            <dt>
              <span id="invoiceAddress">Invoice Address</span>
            </dt>
            <dd>{salesOrderEntity.invoiceAddress}</dd>
            <dt>
              <span id="invoiceCountryCode">Invoice Country Code</span>
            </dt>
            <dd>{salesOrderEntity.invoiceCountryCode}</dd>
            <dt>
              <span id="salesOrderTitle">Sales Order Title</span>
            </dt>
            <dd>{salesOrderEntity.salesOrderTitle}</dd>
            <dt>
              <span id="salesAnalysis1">Sales Analysis 1</span>
            </dt>
            <dd>{salesOrderEntity.salesAnalysis1}</dd>
            <dt>
              <span id="salesAnalysis2">Sales Analysis 2</span>
            </dt>
            <dd>{salesOrderEntity.salesAnalysis2}</dd>
            <dt>
              <span id="salesAnalysis3">Sales Analysis 3</span>
            </dt>
            <dd>{salesOrderEntity.salesAnalysis3}</dd>
            <dt>
              <span id="salesAnalysis4">Sales Analysis 4</span>
            </dt>
            <dd>{salesOrderEntity.salesAnalysis4}</dd>
            <dt>
              <span id="salesAnalysis5">Sales Analysis 5</span>
            </dt>
            <dd>{salesOrderEntity.salesAnalysis5}</dd>
            <dt>
              <span id="salesAnalysis6">Sales Analysis 6</span>
            </dt>
            <dd>{salesOrderEntity.salesAnalysis6}</dd>
            <dt>
              <span id="memo1">Memo 1</span>
            </dt>
            <dd>{salesOrderEntity.memo1}</dd>
            <dt>
              <span id="memo2">Memo 2</span>
            </dt>
            <dd>{salesOrderEntity.memo2}</dd>
            <dt>
              <span id="memo3">Memo 3</span>
            </dt>
            <dd>{salesOrderEntity.memo3}</dd>
            <dt>
              <span id="memo4">Memo 4</span>
            </dt>
            <dd>{salesOrderEntity.memo4}</dd>
            <dt>
              <span id="memo5">Memo 5</span>
            </dt>
            <dd>{salesOrderEntity.memo5}</dd>
            <dt>
              <span id="memo6">Memo 6</span>
            </dt>
            <dd>{salesOrderEntity.memo6}</dd>
            <dt>
              <span id="stockAnalysis01">Stock Analysis 01</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis01}</dd>
            <dt>
              <span id="stockAnalysis02">Stock Analysis 02</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis02}</dd>
            <dt>
              <span id="stockAnalysis03">Stock Analysis 03</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis03}</dd>
            <dt>
              <span id="stockAnalysis04">Stock Analysis 04</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis04}</dd>
            <dt>
              <span id="stockAnalysis05">Stock Analysis 05</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis05}</dd>
            <dt>
              <span id="stockAnalysis06">Stock Analysis 06</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis06}</dd>
            <dt>
              <span id="stockAnalysis07">Stock Analysis 07</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis07}</dd>
            <dt>
              <span id="stockAnalysis08">Stock Analysis 08</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis08}</dd>
            <dt>
              <span id="stockAnalysis09">Stock Analysis 09</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis09}</dd>
            <dt>
              <span id="stockAnalysis10">Stock Analysis 10</span>
            </dt>
            <dd>{salesOrderEntity.stockAnalysis10}</dd>
            <dt>
              <span id="deliveryCode">Delivery Code</span>
            </dt>
            <dd>{salesOrderEntity.deliveryCode}</dd>
            <dt>
              <span id="transactionCode">Transaction Code</span>
            </dt>
            <dd>{salesOrderEntity.transactionCode}</dd>
            <dt>
              <span id="code">Code</span>
            </dt>
            <dd>{salesOrderEntity.code}</dd>
            <dt>
              <span id="salesOrderStatusCode">Sales Order Status Code</span>
            </dt>
            <dd>{salesOrderEntity.salesOrderStatusCode}</dd>
            <dt>
              <span id="despatchStatusID">Despatch Status ID</span>
            </dt>
            <dd>{salesOrderEntity.despatchStatusID}</dd>
            <dt>
              <span id="division">Division</span>
            </dt>
            <dd>{salesOrderEntity.division}</dd>
            <dt>
              <span id="lineNumber">Line Number</span>
            </dt>
            <dd>{salesOrderEntity.lineNumber}</dd>
            <dt>
              <span id="despatchStatusCode">Despatch Status Code</span>
            </dt>
            <dd>{salesOrderEntity.despatchStatusCode}</dd>
            <dt>
              <span id="quantityOrdered">Quantity Ordered</span>
            </dt>
            <dd>{salesOrderEntity.quantityOrdered}</dd>
            <dt>
              <span id="quantityOutstanding">Quantity Outstanding</span>
            </dt>
            <dd>{salesOrderEntity.quantityOutstanding}</dd>
            <dt>
              <span id="quantityDespatched">Quantity Despatched</span>
            </dt>
            <dd>{salesOrderEntity.quantityDespatched}</dd>
            <dt>
              <span id="despatchDate">Despatch Date</span>
            </dt>
            <dd>
              <TextFormat value={salesOrderEntity.despatchDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="custRequiredDate">Cust Required Date</span>
            </dt>
            <dd>
              <TextFormat value={salesOrderEntity.custRequiredDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="unitPrice">Unit Price</span>
            </dt>
            <dd>{salesOrderEntity.unitPrice}</dd>
            <dt>
              <span id="unitPriceinBase">Unit Pricein Base</span>
            </dt>
            <dd>{salesOrderEntity.unitPriceinBase}</dd>
            <dt>
              <span id="lineDiscountPercent">Line Discount Percent</span>
            </dt>
            <dd>{salesOrderEntity.lineDiscountPercent}</dd>
            <dt>
              <span id="marginPercent">Margin Percent</span>
            </dt>
            <dd>{salesOrderEntity.marginPercent}</dd>
            <dt>
              <span id="lineTotal">Line Total</span>
            </dt>
            <dd>{salesOrderEntity.lineTotal}</dd>
            <dt>
              <span id="lineTotalinBase">Line Totalin Base</span>
            </dt>
            <dd>{salesOrderEntity.lineTotalinBase}</dd>
            <dt>
              <span id="taxCode">Tax Code</span>
            </dt>
            <dd>{salesOrderEntity.taxCode}</dd>
            <dt>
              <span id="nominalCode">Nominal Code</span>
            </dt>
            <dd>{salesOrderEntity.nominalCode}</dd>
            <dt>
              <span id="onHold">On Hold</span>
            </dt>
            <dd>{salesOrderEntity.onHold ? 'true' : 'false'}</dd>
            <dt>
              <span id="rCode">R Code</span>
            </dt>
            <dd>{salesOrderEntity.rCode}</dd>
            <dt>
              <span id="standardMargin">Standard Margin</span>
            </dt>
            <dd>{salesOrderEntity.standardMargin}</dd>
            <dt>
              <span id="deliveryAddress">Delivery Address</span>
            </dt>
            <dd>{salesOrderEntity.deliveryAddress}</dd>
            <dt>
              <span id="deliveryAddressDescription">Delivery Address Description</span>
            </dt>
            <dd>{salesOrderEntity.deliveryAddressDescription}</dd>
            <dt>
              <span id="deliveryCountryCode">Delivery Country Code</span>
            </dt>
            <dd>{salesOrderEntity.deliveryCountryCode}</dd>
            <dt>
              <span id="salesOrderStatus">Sales Order Status</span>
            </dt>
            <dd>{salesOrderEntity.salesOrderStatus}</dd>
            <dt>Customer</dt>
            <dd>{salesOrderEntity.customerId ? salesOrderEntity.customerId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/sales-order" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/sales-order/${salesOrderEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ salesOrder }: IRootState) => ({
  salesOrderEntity: salesOrder.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesOrderDetail);
