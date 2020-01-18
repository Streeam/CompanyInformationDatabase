import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { getAllProductsFromDB as getProducts } from 'app/entities/product/product.reducer';
import { getEntity, updateEntity, createEntity, reset } from './supplier.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISupplierUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISupplierUpdateState {
  isNew: boolean;
  idsproducts: any[];
  companyId: string;
}

export class SupplierUpdate extends React.Component<ISupplierUpdateProps, ISupplierUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsproducts: [],
      companyId: '0',
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

    this.props.getCompanies();
    this.props.getProducts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { supplierEntity } = this.props;
      const entity = {
        ...supplierEntity,
        ...values,
        products: mapIdList(values.products)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/supplier');
  };

  render() {
    const { supplierEntity, companies, products, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.supplier.home.createOrEditLabel">Create or edit a Supplier</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : supplierEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="supplier-id">ID</Label>
                    <AvInput id="supplier-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="supplierCodeLabel" for="supplier-supplierCode">
                    Supplier Code
                  </Label>
                  <AvField
                    id="supplier-supplierCode"
                    type="text"
                    name="supplierCode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="supplierNameLabel" for="supplier-supplierName">
                    Supplier Name
                  </Label>
                  <AvField
                    id="supplier-supplierName"
                    type="text"
                    name="supplierName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="supplierStatusLabel" for="supplier-supplierStatus">
                    Supplier Status
                  </Label>
                  <AvField
                    id="supplier-supplierStatus"
                    type="text"
                    name="supplierStatus"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="supplier-email">
                    Email
                  </Label>
                  <AvField
                    id="supplier-email"
                    type="text"
                    name="email"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      pattern: {
                        value: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
                        errorMessage: "This field should follow pattern for '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+.."
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="supplier-phone">
                    Phone
                  </Label>
                  <AvField
                    id="supplier-phone"
                    type="text"
                    name="phone"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLine1Label" for="supplier-addressLine1">
                    Address Line 1
                  </Label>
                  <AvField
                    id="supplier-addressLine1"
                    type="text"
                    name="addressLine1"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLine2Label" for="supplier-addressLine2">
                    Address Line 2
                  </Label>
                  <AvField id="supplier-addressLine2" type="text" name="addressLine2" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="supplier-city">
                    City
                  </Label>
                  <AvField
                    id="supplier-city"
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="supplier-country">
                    Country
                  </Label>
                  <AvField
                    id="supplier-country"
                    type="text"
                    name="country"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="supplier-company">Company</Label>
                  <AvInput id="supplier-company" type="select" className="form-control" name="companyId">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="supplier-products">Products</Label>
                  <AvInput
                    id="supplier-products"
                    type="select"
                    multiple
                    className="form-control"
                    name="products"
                    value={supplierEntity.products && supplierEntity.products.map(e => e.id)}
                  >
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
                <Button tag={Link} id="cancel-save" to="/entity/supplier" replace color="info">
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
  companies: storeState.company.entities,
  products: storeState.product.entities,
  supplierEntity: storeState.supplier.entity,
  loading: storeState.supplier.loading,
  updating: storeState.supplier.updating,
  updateSuccess: storeState.supplier.updateSuccess
});

const mapDispatchToProps = {
  getCompanies,
  getProducts,
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
)(SupplierUpdate);
