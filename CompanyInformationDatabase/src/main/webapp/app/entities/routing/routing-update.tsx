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
import { getEntity, updateEntity, createEntity, reset } from './routing.reducer';
import { IRouting } from 'app/shared/model/routing.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRoutingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRoutingUpdateState {
  isNew: boolean;
  productsId: string;
  nonConformancesDetailsId: string;
}

export class RoutingUpdate extends React.Component<IRoutingUpdateProps, IRoutingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      productsId: '0',
      nonConformancesDetailsId: '0',
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
      const { routingEntity } = this.props;
      const entity = {
        ...routingEntity,
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
    this.props.history.push('/routing');
  };

  render() {
    const { routingEntity, products, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.routing.home.createOrEditLabel">Create or edit a Routing</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : routingEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="routing-id">ID</Label>
                    <AvInput id="routing-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="resourceNameLabel" for="routing-resourceName">
                    Resource Name
                  </Label>
                  <AvField
                    id="routing-resourceName"
                    type="text"
                    name="resourceName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="resourceTypeLabel" for="routing-resourceType">
                    Resource Type
                  </Label>
                  <AvField
                    id="routing-resourceType"
                    type="text"
                    name="resourceType"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unitRunTimeLabel" for="routing-unitRunTime">
                    Unit Run Time
                  </Label>
                  <AvField
                    id="routing-unitRunTime"
                    type="string"
                    className="form-control"
                    name="unitRunTime"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="partNumberLabel" for="routing-partNumber">
                    Part Number
                  </Label>
                  <AvField id="routing-partNumber" type="text" name="partNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="layoutTimeLabel" for="routing-layoutTime">
                    Layout Time
                  </Label>
                  <AvField
                    id="routing-layoutTime"
                    type="string"
                    className="form-control"
                    name="layoutTime"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="uniqueIdentifierLabel" for="routing-uniqueIdentifier">
                    Unique Identifier
                  </Label>
                  <AvField id="routing-uniqueIdentifier" type="text" name="uniqueIdentifier" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/routing" replace color="info">
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
  routingEntity: storeState.routing.entity,
  loading: storeState.routing.loading,
  updating: storeState.routing.updating,
  updateSuccess: storeState.routing.updateSuccess
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
)(RoutingUpdate);
