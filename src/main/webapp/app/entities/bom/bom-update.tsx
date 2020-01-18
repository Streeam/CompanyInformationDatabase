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
import { getEntity, updateEntity, createEntity, reset } from './bom.reducer';
import { IBom } from 'app/shared/model/bom.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBomUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBomUpdateState {
  isNew: boolean;
  productId: string;
}

export class BomUpdate extends React.Component<IBomUpdateProps, IBomUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      productId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { bomEntity } = this.props;
      const entity = {
        ...bomEntity,
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
    this.props.history.push('/bom');
  };

  render() {
    const { bomEntity, products, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.bom.home.createOrEditLabel">Create or edit a Bom</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : bomEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="bom-id">ID</Label>
                    <AvInput id="bom-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="quantityLabel" for="bom-quantity">
                    Quantity
                  </Label>
                  <AvField
                    id="bom-quantity"
                    type="string"
                    className="form-control"
                    name="quantity"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="sequenceNumberLabel" for="bom-sequenceNumber">
                    Sequence Number
                  </Label>
                  <AvField
                    id="bom-sequenceNumber"
                    type="string"
                    className="form-control"
                    name="sequenceNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="partNumberLabel" for="bom-partNumber">
                    Part Number
                  </Label>
                  <AvField id="bom-partNumber" type="text" name="partNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="childPartNumberLabel" for="bom-childPartNumber">
                    Child Part Number
                  </Label>
                  <AvField id="bom-childPartNumber" type="text" name="childPartNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="uniqueIdentifierLabel" for="bom-uniqueIdentifier">
                    Unique Identifier
                  </Label>
                  <AvField id="bom-uniqueIdentifier" type="text" name="uniqueIdentifier" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/bom" replace color="info">
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
  bomEntity: storeState.bom.entity,
  loading: storeState.bom.loading,
  updating: storeState.bom.updating,
  updateSuccess: storeState.bom.updateSuccess
});

const mapDispatchToProps = {
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
)(BomUpdate);
