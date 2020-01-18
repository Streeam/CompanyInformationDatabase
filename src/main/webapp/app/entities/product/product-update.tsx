import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBom } from 'app/shared/model/bom.model';
import { getEntities as getBoms } from 'app/entities/bom/bom.reducer';
import { IRouting } from 'app/shared/model/routing.model';
import { getEntities as getRoutings } from 'app/entities/routing/routing.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { getEntities as getSuppliers } from 'app/entities/supplier/supplier.reducer';
import { ISalesOrder } from 'app/shared/model/sales-order.model';
import { getEntities as getSalesOrders } from 'app/entities/sales-order/sales-order.reducer';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { getEntities as getNonConformanceDetails } from 'app/entities/non-conformance-details/non-conformance-details.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProductUpdateState {
  isNew: boolean;
  idsbom: any[];
  idsroutings: any[];
  supplierId: string;
  salesOrderId: string;
  nonConformanceDetailsId: string;
}

export class ProductUpdate extends React.Component<IProductUpdateProps, IProductUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsbom: [],
      idsroutings: [],
      supplierId: '0',
      salesOrderId: '0',
      nonConformanceDetailsId: '0',
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

    this.props.getBoms();
    this.props.getRoutings();
    this.props.getSuppliers();
    this.props.getSalesOrders();
    this.props.getNonConformanceDetails();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { productEntity } = this.props;
      const entity = {
        ...productEntity,
        ...values,
        boms: mapIdList(values.boms),
        routings: mapIdList(values.routings)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity, () => {});
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/product');
  };

  render() {
    const { productEntity, boms, routings, suppliers, salesOrders, nonConformanceDetails, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.product.home.createOrEditLabel">Create or edit a Product</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : productEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="product-id">ID</Label>
                    <AvInput id="product-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="partNumberLabel" for="product-partNumber">
                    Part Number
                  </Label>
                  <AvField
                    id="product-partNumber"
                    type="text"
                    name="partNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="partDescriptionLabel" for="product-partDescription">
                    Part Description
                  </Label>
                  <AvField
                    id="product-partDescription"
                    type="text"
                    name="partDescription"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="releaseDateLabel" for="product-releaseDate">
                    Release Date
                  </Label>
                  <AvField
                    id="product-releaseDate"
                    type="date"
                    className="form-control"
                    name="releaseDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="productGroupCodeLabel" for="product-productGroupCode">
                    Product Group Code
                  </Label>
                  <AvField
                    id="product-productGroupCode"
                    type="text"
                    name="productGroupCode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="siteLabel" for="product-site">
                    Site
                  </Label>
                  <AvField id="product-site" type="text" name="site" />
                </AvGroup>
                <AvGroup>
                  <Label id="departamentLabel" for="product-departament">
                    Departament
                  </Label>
                  <AvField id="product-departament" type="text" name="departament" />
                </AvGroup>
                <AvGroup>
                  <Label id="methodTypeLabel" for="product-methodType">
                    Method Type
                  </Label>
                  <AvField
                    id="product-methodType"
                    type="text"
                    name="methodType"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="methodStatusLabel" for="product-methodStatus">
                    Method Status
                  </Label>
                  <AvField
                    id="product-methodStatus"
                    type="text"
                    name="methodStatus"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="primeLabel" check>
                    <AvInput id="product-prime" type="checkbox" className="form-control" name="prime" />
                    Prime
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="unitOfMeasureLabel" for="product-unitOfMeasure">
                    Unit Of Measure
                  </Label>
                  <AvField id="product-unitOfMeasure" type="text" name="unitOfMeasure" />
                </AvGroup>
                <AvGroup>
                  <Label id="supplierPartNumberLabel" for="product-supplierPartNumber">
                    Supplier Part Number
                  </Label>
                  <AvField id="product-supplierPartNumber" type="text" name="supplierPartNumber" validate={{}} />
                </AvGroup>
                <AvGroup>
                  <Label id="supplierPartDescriptionLabel" for="product-supplierPartDescription">
                    Supplier Part Description
                  </Label>
                  <AvField id="product-supplierPartDescription" type="text" name="supplierPartDescription" />
                </AvGroup>
                <AvGroup>
                  <Label id="curencyLabel" for="product-curency">
                    Curency
                  </Label>
                  <AvField id="product-curency" type="text" name="curency" />
                </AvGroup>
                <AvGroup>
                  <Label id="leadTimeLabel" for="product-leadTime">
                    Lead Time
                  </Label>
                  <AvField
                    id="product-leadTime"
                    type="string"
                    className="form-control"
                    name="leadTime"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="minQuantityLabel" for="product-minQuantity">
                    Min Quantity
                  </Label>
                  <AvField
                    id="product-minQuantity"
                    type="string"
                    className="form-control"
                    name="minQuantity"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="latestUnitMaterialCostLabel" for="product-latestUnitMaterialCost">
                    Latest Unit Material Cost
                  </Label>
                  <AvField
                    id="product-latestUnitMaterialCost"
                    type="text"
                    name="latestUnitMaterialCost"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="costInSupplierCurrencyLabel" for="product-costInSupplierCurrency">
                    Cost In Supplier Currency
                  </Label>
                  <AvField
                    id="product-costInSupplierCurrency"
                    type="text"
                    name="costInSupplierCurrency"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="supplierPriceLabel" for="product-supplierPrice">
                    Supplier Price
                  </Label>
                  <AvField
                    id="product-supplierPrice"
                    type="text"
                    name="supplierPrice"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="costInBaseCurrencyLabel" for="product-costInBaseCurrency">
                    Cost In Base Currency
                  </Label>
                  <AvField
                    id="product-costInBaseCurrency"
                    type="text"
                    name="costInBaseCurrency"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="scrapPercentageLabel" for="product-scrapPercentage">
                    Scrap Percentage
                  </Label>
                  <AvField
                    id="product-scrapPercentage"
                    type="string"
                    className="form-control"
                    name="scrapPercentage"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="onHandStockLabel" for="product-onHandStock">
                    On Hand Stock
                  </Label>
                  <AvField
                    id="product-onHandStock"
                    type="string"
                    className="form-control"
                    name="onHandStock"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardComponentCostLabel" for="product-standardComponentCost">
                    Standard Component Cost
                  </Label>
                  <AvField
                    id="product-standardComponentCost"
                    type="text"
                    name="standardComponentCost"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardSubContractCostLabel" for="product-standardSubContractCost">
                    Standard Sub Contract Cost
                  </Label>
                  <AvField
                    id="product-standardSubContractCost"
                    type="text"
                    name="standardSubContractCost"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardUnitMaterialCostLabel" for="product-standardUnitMaterialCost">
                    Standard Unit Material Cost
                  </Label>
                  <AvField
                    id="product-standardUnitMaterialCost"
                    type="text"
                    name="standardUnitMaterialCost"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardSetCostLabel" for="product-standardSetCost">
                    Standard Set Cost
                  </Label>
                  <AvField
                    id="product-standardSetCost"
                    type="text"
                    name="standardSetCost"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardRunCostLabel" for="product-standardRunCost">
                    Standard Run Cost
                  </Label>
                  <AvField
                    id="product-standardRunCost"
                    type="text"
                    name="standardRunCost"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardLandedCost1Label" for="product-standardLandedCost1">
                    Standard Landed Cost 1
                  </Label>
                  <AvField
                    id="product-standardLandedCost1"
                    type="text"
                    name="standardLandedCost1"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardLandedCost2Label" for="product-standardLandedCost2">
                    Standard Landed Cost 2
                  </Label>
                  <AvField
                    id="product-standardLandedCost2"
                    type="text"
                    name="standardLandedCost2"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="standardLandedCost3Label" for="product-standardLandedCost3">
                    Standard Landed Cost 3
                  </Label>
                  <AvField
                    id="product-standardLandedCost3"
                    type="text"
                    name="standardLandedCost3"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="comment1Label" for="product-comment1">
                    Comment 1
                  </Label>
                  <AvField id="product-comment1" type="text" name="comment1" />
                </AvGroup>
                <AvGroup>
                  <Label id="comment2Label" for="product-comment2">
                    Comment 2
                  </Label>
                  <AvField id="product-comment2" type="text" name="comment2" />
                </AvGroup>
                <AvGroup>
                  <Label id="comment3Label" for="product-comment3">
                    Comment 3
                  </Label>
                  <AvField id="product-comment3" type="text" name="comment3" />
                </AvGroup>
                <AvGroup>
                  <Label id="reviewDate1Label" for="product-reviewDate1">
                    Review Date 1
                  </Label>
                  <AvField id="product-reviewDate1" type="date" className="form-control" name="reviewDate1" />
                </AvGroup>
                <AvGroup>
                  <Label id="reviewDate2Label" for="product-reviewDate2">
                    Review Date 2
                  </Label>
                  <AvField id="product-reviewDate2" type="date" className="form-control" name="reviewDate2" />
                </AvGroup>
                <AvGroup>
                  <Label id="reviewDate3Label" for="product-reviewDate3">
                    Review Date 3
                  </Label>
                  <AvField id="product-reviewDate3" type="date" className="form-control" name="reviewDate3" />
                </AvGroup>
                <AvGroup>
                  <Label id="standardTotalCostLabel" for="product-standardTotalCost">
                    Standard Total Cost
                  </Label>
                  <AvField
                    id="product-standardTotalCost"
                    type="text"
                    name="standardTotalCost"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="minBarchSizeLabel" for="product-minBarchSize">
                    Min Barch Size
                  </Label>
                  <AvField
                    id="product-minBarchSize"
                    type="string"
                    className="form-control"
                    name="minBarchSize"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="obsoleteLabel" check>
                    <AvInput id="product-obsolete" type="checkbox" className="form-control" name="obsolete" />
                    Obsolete
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="orderMultiplerLabel" for="product-orderMultipler">
                    Order Multipler
                  </Label>
                  <AvField
                    id="product-orderMultipler"
                    type="string"
                    className="form-control"
                    name="orderMultipler"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="product-bom">Bom</Label>
                  <AvInput
                    id="product-bom"
                    type="select"
                    multiple
                    className="form-control"
                    name="boms"
                    value={productEntity.boms && productEntity.boms.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {boms
                      ? boms.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="product-routings">Routings</Label>
                  <AvInput
                    id="product-routings"
                    type="select"
                    multiple
                    className="form-control"
                    name="routings"
                    value={productEntity.routings && productEntity.routings.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {routings
                      ? routings.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="product-salesOrder">Sales Order</Label>
                  <AvInput id="product-salesOrder" type="select" className="form-control" name="salesOrderId">
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
                <Button tag={Link} id="cancel-save" to="/product" replace color="info">
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
  boms: storeState.bom.entities,
  routings: storeState.routing.entities,
  suppliers: storeState.supplier.entities,
  salesOrders: storeState.salesOrder.entities,
  nonConformanceDetails: storeState.nonConformanceDetails.entities,
  productEntity: storeState.product.entity,
  loading: storeState.product.loading,
  updating: storeState.product.updating,
  updateSuccess: storeState.product.updateSuccess
});

const mapDispatchToProps = {
  getBoms,
  getRoutings,
  getSuppliers,
  getSalesOrders,
  getNonConformanceDetails,
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
)(ProductUpdate);
