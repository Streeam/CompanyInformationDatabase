import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './sales-order.reducer';
import { ISalesOrder } from 'app/shared/model/sales-order.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISalesOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISalesOrderUpdateState {
  isNew: boolean;
  customerId: string;
}

export class SalesOrderUpdate extends React.Component<ISalesOrderUpdateProps, ISalesOrderUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '0',
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

    this.props.getCustomers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { salesOrderEntity } = this.props;
      const entity = {
        ...salesOrderEntity,
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
    this.props.history.push('/entity/sales-order');
  };

  render() {
    const { salesOrderEntity, customers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.salesOrder.home.createOrEditLabel">Create or edit a SalesOrder</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : salesOrderEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="sales-order-id">ID</Label>
                    <AvInput id="sales-order-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="salesOrderNumberLabel" for="sales-order-salesOrderNumber">
                    Sales Order Number
                  </Label>
                  <AvField
                    id="sales-order-salesOrderNumber"
                    type="text"
                    name="salesOrderNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateRaisedLabel" for="sales-order-dateRaised">
                    Date Raised
                  </Label>
                  <AvField
                    id="sales-order-dateRaised"
                    type="date"
                    className="form-control"
                    name="dateRaised"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="soSalesStatusLabel" for="sales-order-soSalesStatus">
                    So Sales Status
                  </Label>
                  <AvField id="sales-order-soSalesStatus" type="text" name="soSalesStatus" />
                </AvGroup>
                <AvGroup>
                  <Label id="secondSalesReferenceLabel" for="sales-order-secondSalesReference">
                    Second Sales Reference
                  </Label>
                  <AvField id="sales-order-secondSalesReference" type="text" name="secondSalesReference" />
                </AvGroup>
                <AvGroup>
                  <Label id="currencyCodeLabel" for="sales-order-currencyCode">
                    Currency Code
                  </Label>
                  <AvField id="sales-order-currencyCode" type="text" name="currencyCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="exchangeRateLabel" for="sales-order-exchangeRate">
                    Exchange Rate
                  </Label>
                  <AvField id="sales-order-exchangeRate" type="text" name="exchangeRate" />
                </AvGroup>
                <AvGroup>
                  <Label id="discountPercentLabel" for="sales-order-discountPercent">
                    Discount Percent
                  </Label>
                  <AvField
                    id="sales-order-discountPercent"
                    type="string"
                    className="form-control"
                    name="discountPercent"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      max: { value: 100, errorMessage: 'This field cannot be more than 100.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contactNameLabel" for="sales-order-contactName">
                    Contact Name
                  </Label>
                  <AvField id="sales-order-contactName" type="text" name="contactName" />
                </AvGroup>
                <AvGroup>
                  <Label id="ourContactLabel" for="sales-order-ourContact">
                    Our Contact
                  </Label>
                  <AvField id="sales-order-ourContact" type="text" name="ourContact" />
                </AvGroup>
                <AvGroup>
                  <Label id="invoiceAddressLabel" for="sales-order-invoiceAddress">
                    Invoice Address
                  </Label>
                  <AvField id="sales-order-invoiceAddress" type="text" name="invoiceAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="invoiceCountryCodeLabel" for="sales-order-invoiceCountryCode">
                    Invoice Country Code
                  </Label>
                  <AvField id="sales-order-invoiceCountryCode" type="text" name="invoiceCountryCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesOrderTitleLabel" for="sales-order-salesOrderTitle">
                    Sales Order Title
                  </Label>
                  <AvField id="sales-order-salesOrderTitle" type="text" name="salesOrderTitle" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesAnalysis1Label" for="sales-order-salesAnalysis1">
                    Sales Analysis 1
                  </Label>
                  <AvField id="sales-order-salesAnalysis1" type="text" name="salesAnalysis1" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesAnalysis2Label" for="sales-order-salesAnalysis2">
                    Sales Analysis 2
                  </Label>
                  <AvField id="sales-order-salesAnalysis2" type="text" name="salesAnalysis2" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesAnalysis3Label" for="sales-order-salesAnalysis3">
                    Sales Analysis 3
                  </Label>
                  <AvField id="sales-order-salesAnalysis3" type="text" name="salesAnalysis3" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesAnalysis4Label" for="sales-order-salesAnalysis4">
                    Sales Analysis 4
                  </Label>
                  <AvField id="sales-order-salesAnalysis4" type="text" name="salesAnalysis4" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesAnalysis5Label" for="sales-order-salesAnalysis5">
                    Sales Analysis 5
                  </Label>
                  <AvField id="sales-order-salesAnalysis5" type="text" name="salesAnalysis5" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesAnalysis6Label" for="sales-order-salesAnalysis6">
                    Sales Analysis 6
                  </Label>
                  <AvField id="sales-order-salesAnalysis6" type="text" name="salesAnalysis6" />
                </AvGroup>
                <AvGroup>
                  <Label id="memo1Label" for="sales-order-memo1">
                    Memo 1
                  </Label>
                  <AvField id="sales-order-memo1" type="text" name="memo1" />
                </AvGroup>
                <AvGroup>
                  <Label id="memo2Label" for="sales-order-memo2">
                    Memo 2
                  </Label>
                  <AvField id="sales-order-memo2" type="text" name="memo2" />
                </AvGroup>
                <AvGroup>
                  <Label id="memo3Label" for="sales-order-memo3">
                    Memo 3
                  </Label>
                  <AvField id="sales-order-memo3" type="text" name="memo3" />
                </AvGroup>
                <AvGroup>
                  <Label id="memo4Label" for="sales-order-memo4">
                    Memo 4
                  </Label>
                  <AvField id="sales-order-memo4" type="text" name="memo4" />
                </AvGroup>
                <AvGroup>
                  <Label id="memo5Label" for="sales-order-memo5">
                    Memo 5
                  </Label>
                  <AvField id="sales-order-memo5" type="text" name="memo5" />
                </AvGroup>
                <AvGroup>
                  <Label id="memo6Label" for="sales-order-memo6">
                    Memo 6
                  </Label>
                  <AvField id="sales-order-memo6" type="text" name="memo6" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis01Label" for="sales-order-stockAnalysis01">
                    Stock Analysis 01
                  </Label>
                  <AvField id="sales-order-stockAnalysis01" type="text" name="stockAnalysis01" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis02Label" for="sales-order-stockAnalysis02">
                    Stock Analysis 02
                  </Label>
                  <AvField id="sales-order-stockAnalysis02" type="text" name="stockAnalysis02" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis03Label" for="sales-order-stockAnalysis03">
                    Stock Analysis 03
                  </Label>
                  <AvField id="sales-order-stockAnalysis03" type="text" name="stockAnalysis03" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis04Label" for="sales-order-stockAnalysis04">
                    Stock Analysis 04
                  </Label>
                  <AvField id="sales-order-stockAnalysis04" type="text" name="stockAnalysis04" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis05Label" for="sales-order-stockAnalysis05">
                    Stock Analysis 05
                  </Label>
                  <AvField id="sales-order-stockAnalysis05" type="text" name="stockAnalysis05" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis06Label" for="sales-order-stockAnalysis06">
                    Stock Analysis 06
                  </Label>
                  <AvField id="sales-order-stockAnalysis06" type="text" name="stockAnalysis06" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis07Label" for="sales-order-stockAnalysis07">
                    Stock Analysis 07
                  </Label>
                  <AvField id="sales-order-stockAnalysis07" type="text" name="stockAnalysis07" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis08Label" for="sales-order-stockAnalysis08">
                    Stock Analysis 08
                  </Label>
                  <AvField id="sales-order-stockAnalysis08" type="text" name="stockAnalysis08" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis09Label" for="sales-order-stockAnalysis09">
                    Stock Analysis 09
                  </Label>
                  <AvField id="sales-order-stockAnalysis09" type="text" name="stockAnalysis09" />
                </AvGroup>
                <AvGroup>
                  <Label id="stockAnalysis10Label" for="sales-order-stockAnalysis10">
                    Stock Analysis 10
                  </Label>
                  <AvField id="sales-order-stockAnalysis10" type="text" name="stockAnalysis10" />
                </AvGroup>
                <AvGroup>
                  <Label id="deliveryCodeLabel" for="sales-order-deliveryCode">
                    Delivery Code
                  </Label>
                  <AvField id="sales-order-deliveryCode" type="text" name="deliveryCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="transactionCodeLabel" for="sales-order-transactionCode">
                    Transaction Code
                  </Label>
                  <AvField id="sales-order-transactionCode" type="text" name="transactionCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="codeLabel" for="sales-order-code">
                    Code
                  </Label>
                  <AvField id="sales-order-code" type="text" name="code" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesOrderStatusCodeLabel" for="sales-order-salesOrderStatusCode">
                    Sales Order Status Code
                  </Label>
                  <AvField id="sales-order-salesOrderStatusCode" type="text" name="salesOrderStatusCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="despatchStatusIDLabel" for="sales-order-despatchStatusID">
                    Despatch Status ID
                  </Label>
                  <AvField id="sales-order-despatchStatusID" type="text" name="despatchStatusID" />
                </AvGroup>
                <AvGroup>
                  <Label id="divisionLabel" for="sales-order-division">
                    Division
                  </Label>
                  <AvField id="sales-order-division" type="text" name="division" />
                </AvGroup>
                <AvGroup>
                  <Label id="lineNumberLabel" for="sales-order-lineNumber">
                    Line Number
                  </Label>
                  <AvField id="sales-order-lineNumber" type="text" name="lineNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="despatchStatusCodeLabel" for="sales-order-despatchStatusCode">
                    Despatch Status Code
                  </Label>
                  <AvField id="sales-order-despatchStatusCode" type="text" name="despatchStatusCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="quantityOrderedLabel" for="sales-order-quantityOrdered">
                    Quantity Ordered
                  </Label>
                  <AvField
                    id="sales-order-quantityOrdered"
                    type="string"
                    className="form-control"
                    name="quantityOrdered"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="quantityOutstandingLabel" for="sales-order-quantityOutstanding">
                    Quantity Outstanding
                  </Label>
                  <AvField
                    id="sales-order-quantityOutstanding"
                    type="string"
                    className="form-control"
                    name="quantityOutstanding"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="quantityDespatchedLabel" for="sales-order-quantityDespatched">
                    Quantity Despatched
                  </Label>
                  <AvField
                    id="sales-order-quantityDespatched"
                    type="string"
                    className="form-control"
                    name="quantityDespatched"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="despatchDateLabel" for="sales-order-despatchDate">
                    Despatch Date
                  </Label>
                  <AvField
                    id="sales-order-despatchDate"
                    type="date"
                    className="form-control"
                    name="despatchDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="custRequiredDateLabel" for="sales-order-custRequiredDate">
                    Cust Required Date
                  </Label>
                  <AvField
                    id="sales-order-custRequiredDate"
                    type="date"
                    className="form-control"
                    name="custRequiredDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unitPriceLabel" for="sales-order-unitPrice">
                    Unit Price
                  </Label>
                  <AvField
                    id="sales-order-unitPrice"
                    type="string"
                    className="form-control"
                    name="unitPrice"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unitPriceinBaseLabel" for="sales-order-unitPriceinBase">
                    Unit Pricein Base
                  </Label>
                  <AvField
                    id="sales-order-unitPriceinBase"
                    type="string"
                    className="form-control"
                    name="unitPriceinBase"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lineDiscountPercentLabel" for="sales-order-lineDiscountPercent">
                    Line Discount Percent
                  </Label>
                  <AvField
                    id="sales-order-lineDiscountPercent"
                    type="string"
                    className="form-control"
                    name="lineDiscountPercent"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="marginPercentLabel" for="sales-order-marginPercent">
                    Margin Percent
                  </Label>
                  <AvField
                    id="sales-order-marginPercent"
                    type="string"
                    className="form-control"
                    name="marginPercent"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lineTotalLabel" for="sales-order-lineTotal">
                    Line Total
                  </Label>
                  <AvField
                    id="sales-order-lineTotal"
                    type="string"
                    className="form-control"
                    name="lineTotal"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lineTotalinBaseLabel" for="sales-order-lineTotalinBase">
                    Line Totalin Base
                  </Label>
                  <AvField
                    id="sales-order-lineTotalinBase"
                    type="string"
                    className="form-control"
                    name="lineTotalinBase"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="taxCodeLabel" for="sales-order-taxCode">
                    Tax Code
                  </Label>
                  <AvField
                    id="sales-order-taxCode"
                    type="text"
                    name="taxCode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nominalCodeLabel" for="sales-order-nominalCode">
                    Nominal Code
                  </Label>
                  <AvField
                    id="sales-order-nominalCode"
                    type="text"
                    name="nominalCode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="onHoldLabel" check>
                    <AvInput id="sales-order-onHold" type="checkbox" className="form-control" name="onHold" />
                    On Hold
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="rCodeLabel" for="sales-order-rCode">
                    R Code
                  </Label>
                  <AvField
                    id="sales-order-rCode"
                    type="text"
                    name="rCode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardMarginLabel" for="sales-order-standardMargin">
                    Standard Margin
                  </Label>
                  <AvField
                    id="sales-order-standardMargin"
                    type="string"
                    className="form-control"
                    name="standardMargin"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="deliveryAddressLabel" for="sales-order-deliveryAddress">
                    Delivery Address
                  </Label>
                  <AvField
                    id="sales-order-deliveryAddress"
                    type="text"
                    name="deliveryAddress"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="deliveryAddressDescriptionLabel" for="sales-order-deliveryAddressDescription">
                    Delivery Address Description
                  </Label>
                  <AvField id="sales-order-deliveryAddressDescription" type="text" name="deliveryAddressDescription" />
                </AvGroup>
                <AvGroup>
                  <Label id="deliveryCountryCodeLabel" for="sales-order-deliveryCountryCode">
                    Delivery Country Code
                  </Label>
                  <AvField id="sales-order-deliveryCountryCode" type="text" name="deliveryCountryCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="salesOrderStatusLabel" for="sales-order-salesOrderStatus">
                    Sales Order Status
                  </Label>
                  <AvField id="sales-order-salesOrderStatus" type="text" name="salesOrderStatus" />
                </AvGroup>
                <AvGroup>
                  <Label for="sales-order-customer">Customer</Label>
                  <AvInput id="sales-order-customer" type="select" className="form-control" name="customerId">
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/sales-order" replace color="info">
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
  customers: storeState.customer.entities,
  salesOrderEntity: storeState.salesOrder.entity,
  loading: storeState.salesOrder.loading,
  updating: storeState.salesOrder.updating,
  updateSuccess: storeState.salesOrder.updateSuccess
});

const mapDispatchToProps = {
  getCustomers,
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
)(SalesOrderUpdate);
