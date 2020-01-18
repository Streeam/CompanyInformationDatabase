import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getProductsByPage } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProductProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IProductState = IPaginationBaseState;

export class Product extends React.Component<IProductProps, IProductState> {
  state: IProductState = {
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
    this.props.getProductsByPage(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { productList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="product-heading">
          Products
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Product
          </Link>
        </h2>
        <div className="table-responsive">
          {productList && productList.length > 0 ? (
            <Table responsive aria-describedby="product-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('partNumber')}>
                    Part Number <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('partDescription')}>
                    Part Description <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('releaseDate')}>
                    Release Date <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('productGroupCode')}>
                    Product Group Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('site')}>
                    Site <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('departament')}>
                    Departament <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('methodType')}>
                    Method Type <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('methodStatus')}>
                    Method Status <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('prime')}>
                    Prime <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('unitOfMeasure')}>
                    Unit Of Measure <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('supplierPartNumber')}>
                    Supplier Part Number <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('supplierPartDescription')}>
                    Supplier Part Description <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('curency')}>
                    Curency <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('leadTime')}>
                    Lead Time <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('minQuantity')}>
                    Min Quantity <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('latestUnitMaterialCost')}>
                    Latest Unit Material Cost <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('costInSupplierCurrency')}>
                    Cost In Supplier Currency <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('supplierPrice')}>
                    Supplier Price <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('costInBaseCurrency')}>
                    Cost In Base Currency <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('scrapPercentage')}>
                    Scrap Percentage <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('onHandStock')}>
                    On Hand Stock <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardComponentCost')}>
                    Standard Component Cost <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardSubContractCost')}>
                    Standard Sub Contract Cost <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardUnitMaterialCost')}>
                    Standard Unit Material Cost <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardSetCost')}>
                    Standard Set Cost <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardRunCost')}>
                    Standard Run Cost <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardLandedCost1')}>
                    Standard Landed Cost 1 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardLandedCost2')}>
                    Standard Landed Cost 2 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardLandedCost3')}>
                    Standard Landed Cost 3 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('comment1')}>
                    Comment 1 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('comment2')}>
                    Comment 2 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('comment3')}>
                    Comment 3 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('reviewDate1')}>
                    Review Date 1 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('reviewDate2')}>
                    Review Date 2 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('reviewDate3')}>
                    Review Date 3 <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('standardTotalCost')}>
                    Standard Total Cost <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('minBarchSize')}>
                    Min Barch Size <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('obsolete')}>
                    Obsolete <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('orderMultipler')}>
                    Order Multipler <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Sales Order <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {productList.map((product, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${product.id}`} color="link" size="sm">
                        {product.id}
                      </Button>
                    </td>
                    <td>{product.partNumber}</td>
                    <td>{product.partDescription}</td>
                    <td>
                      <TextFormat type="date" value={product.releaseDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{product.productGroupCode}</td>
                    <td>{product.site}</td>
                    <td>{product.departament}</td>
                    <td>{product.methodType}</td>
                    <td>{product.methodStatus}</td>
                    <td>{product.prime ? 'true' : 'false'}</td>
                    <td>{product.unitOfMeasure}</td>
                    <td>{product.supplierPartNumber}</td>
                    <td>{product.supplierPartDescription}</td>
                    <td>{product.curency}</td>
                    <td>{product.leadTime}</td>
                    <td>{product.minQuantity}</td>
                    <td>{product.latestUnitMaterialCost}</td>
                    <td>{product.costInSupplierCurrency}</td>
                    <td>{product.supplierPrice}</td>
                    <td>{product.costInBaseCurrency}</td>
                    <td>{product.scrapPercentage}</td>
                    <td>{product.onHandStock}</td>
                    <td>{product.standardComponentCost}</td>
                    <td>{product.standardSubContractCost}</td>
                    <td>{product.standardUnitMaterialCost}</td>
                    <td>{product.standardSetCost}</td>
                    <td>{product.standardRunCost}</td>
                    <td>{product.standardLandedCost1}</td>
                    <td>{product.standardLandedCost2}</td>
                    <td>{product.standardLandedCost3}</td>
                    <td>{product.comment1}</td>
                    <td>{product.comment2}</td>
                    <td>{product.comment3}</td>
                    <td>
                      <TextFormat type="date" value={product.reviewDate1} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={product.reviewDate2} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={product.reviewDate3} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{product.standardTotalCost}</td>
                    <td>{product.minBarchSize}</td>
                    <td>{product.obsolete ? 'true' : 'false'}</td>
                    <td>{product.orderMultipler}</td>
                    <td>{product.salesOrderId ? <Link to={`sales-order/${product.salesOrderId}`}>{product.salesOrderId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${product.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${product.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${product.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Products found</div>
          )}
        </div>
        <div className={productList && productList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ product }: IRootState) => ({
  productList: product.entities,
  totalItems: product.totalItems
});

const mapDispatchToProps = {
  getProductsByPage
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
