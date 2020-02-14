import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProductDetail extends React.Component<IProductDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { productEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Product [<b>{productEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="partNumber">Part Number</span>
            </dt>
            <dd>{productEntity.partNumber}</dd>
            <dt>
              <span id="partDescription">Part Description</span>
            </dt>
            <dd>{productEntity.partDescription}</dd>
            <dt>
              <span id="releaseDate">Release Date</span>
            </dt>
            <dd>
              <TextFormat value={productEntity.releaseDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="productGroupCode">Product Group Code</span>
            </dt>
            <dd>{productEntity.productGroupCode}</dd>
            <dt>
              <span id="site">Site</span>
            </dt>
            <dd>{productEntity.site}</dd>
            <dt>
              <span id="departament">Departament</span>
            </dt>
            <dd>{productEntity.departament}</dd>
            <dt>
              <span id="methodType">Method Type</span>
            </dt>
            <dd>{productEntity.methodType}</dd>
            <dt>
              <span id="methodStatus">Method Status</span>
            </dt>
            <dd>{productEntity.methodStatus}</dd>
            <dt>
              <span id="prime">Prime</span>
            </dt>
            <dd>{productEntity.prime ? 'true' : 'false'}</dd>
            <dt>
              <span id="unitOfMeasure">Unit Of Measure</span>
            </dt>
            <dd>{productEntity.unitOfMeasure}</dd>
            <dt>
              <span id="supplierPartNumber">Supplier Part Number</span>
            </dt>
            <dd>{productEntity.supplierPartNumber}</dd>
            <dt>
              <span id="supplierPartDescription">Supplier Part Description</span>
            </dt>
            <dd>{productEntity.supplierPartDescription}</dd>
            <dt>
              <span id="curency">Curency</span>
            </dt>
            <dd>{productEntity.curency}</dd>
            <dt>
              <span id="leadTime">Lead Time</span>
            </dt>
            <dd>{productEntity.leadTime}</dd>
            <dt>
              <span id="minQuantity">Min Quantity</span>
            </dt>
            <dd>{productEntity.minQuantity}</dd>
            <dt>
              <span id="latestUnitMaterialCost">Latest Unit Material Cost</span>
            </dt>
            <dd>{productEntity.latestUnitMaterialCost}</dd>
            <dt>
              <span id="costInSupplierCurrency">Cost In Supplier Currency</span>
            </dt>
            <dd>{productEntity.costInSupplierCurrency}</dd>
            <dt>
              <span id="supplierPrice">Supplier Price</span>
            </dt>
            <dd>{productEntity.supplierPrice}</dd>
            <dt>
              <span id="costInBaseCurrency">Cost In Base Currency</span>
            </dt>
            <dd>{productEntity.costInBaseCurrency}</dd>
            <dt>
              <span id="scrapPercentage">Scrap Percentage</span>
            </dt>
            <dd>{productEntity.scrapPercentage}</dd>
            <dt>
              <span id="onHandStock">On Hand Stock</span>
            </dt>
            <dd>{productEntity.onHandStock}</dd>
            <dt>
              <span id="standardComponentCost">Standard Component Cost</span>
            </dt>
            <dd>{productEntity.standardComponentCost}</dd>
            <dt>
              <span id="standardSubContractCost">Standard Sub Contract Cost</span>
            </dt>
            <dd>{productEntity.standardSubContractCost}</dd>
            <dt>
              <span id="standardUnitMaterialCost">Standard Unit Material Cost</span>
            </dt>
            <dd>{productEntity.standardUnitMaterialCost}</dd>
            <dt>
              <span id="standardSetCost">Standard Set Cost</span>
            </dt>
            <dd>{productEntity.standardSetCost}</dd>
            <dt>
              <span id="standardRunCost">Standard Run Cost</span>
            </dt>
            <dd>{productEntity.standardRunCost}</dd>
            <dt>
              <span id="standardLandedCost1">Standard Landed Cost 1</span>
            </dt>
            <dd>{productEntity.standardLandedCost1}</dd>
            <dt>
              <span id="standardLandedCost2">Standard Landed Cost 2</span>
            </dt>
            <dd>{productEntity.standardLandedCost2}</dd>
            <dt>
              <span id="standardLandedCost3">Standard Landed Cost 3</span>
            </dt>
            <dd>{productEntity.standardLandedCost3}</dd>
            <dt>
              <span id="comment1">Comment 1</span>
            </dt>
            <dd>{productEntity.comment1}</dd>
            <dt>
              <span id="comment2">Comment 2</span>
            </dt>
            <dd>{productEntity.comment2}</dd>
            <dt>
              <span id="comment3">Comment 3</span>
            </dt>
            <dd>{productEntity.comment3}</dd>
            <dt>
              <span id="reviewDate1">Review Date 1</span>
            </dt>
            <dd>
              <TextFormat value={productEntity.reviewDate1} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="reviewDate2">Review Date 2</span>
            </dt>
            <dd>
              <TextFormat value={productEntity.reviewDate2} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="reviewDate3">Review Date 3</span>
            </dt>
            <dd>
              <TextFormat value={productEntity.reviewDate3} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="standardTotalCost">Standard Total Cost</span>
            </dt>
            <dd>{productEntity.standardTotalCost}</dd>
            <dt>
              <span id="minBarchSize">Min Barch Size</span>
            </dt>
            <dd>{productEntity.minBarchSize}</dd>
            <dt>
              <span id="obsolete">Obsolete</span>
            </dt>
            <dd>{productEntity.obsolete ? 'true' : 'false'}</dd>
            <dt>
              <span id="orderMultipler">Order Multipler</span>
            </dt>
            <dd>{productEntity.orderMultipler}</dd>
            <dt>Bom</dt>
            <dd>
              {productEntity.boms
                ? productEntity.boms.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === productEntity.boms.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Routings</dt>
            <dd>
              {productEntity.routings
                ? productEntity.routings.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === productEntity.routings.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Sales Order</dt>
            <dd>{productEntity.salesOrderId ? productEntity.salesOrderId : ''}</dd>
          </dl>
          <Button tag={Link} to="/product" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ product }: IRootState) => ({
  productEntity: product.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
