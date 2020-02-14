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
import { IAmendment } from 'app/shared/model/amendment.model';
import { getEntities as getAmendments } from 'app/entities/amendment/amendment.reducer';
import { IPrototype } from 'app/shared/model/prototype.model';
import { getEntities as getPrototypes } from 'app/entities/prototype/prototype.reducer';
import { IRouting } from 'app/shared/model/routing.model';
import { getEntities as getRoutings } from 'app/entities/routing/routing.reducer';
import { getEntity, updateEntity, createEntity, reset } from './version.reducer';
import { IVersion } from 'app/shared/model/version.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVersionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVersionUpdateState {
  isNew: boolean;
  productId: string;
  amendmentId: string;
  prototypeId: string;
  routingId: string;
}

export class VersionUpdate extends React.Component<IVersionUpdateProps, IVersionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      productId: '0',
      amendmentId: '0',
      prototypeId: '0',
      routingId: '0',
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
    this.props.getAmendments();
    this.props.getPrototypes();
    this.props.getRoutings();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { versionEntity } = this.props;
      const entity = {
        ...versionEntity,
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
    this.props.history.push('/entity/version');
  };

  render() {
    const { versionEntity, products, amendments, prototypes, routings, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.version.home.createOrEditLabel">Create or edit a Version</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : versionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="version-id">ID</Label>
                    <AvInput id="version-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="versionNumberLabel" for="version-versionNumber">
                    Version Number
                  </Label>
                  <AvField
                    id="version-versionNumber"
                    type="text"
                    name="versionNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="versionStatusLabel" for="version-versionStatus">
                    Version Status
                  </Label>
                  <AvField
                    id="version-versionStatus"
                    type="text"
                    name="versionStatus"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="issueNumberLabel" for="version-issueNumber">
                    Issue Number
                  </Label>
                  <AvField id="version-issueNumber" type="text" name="issueNumber" />
                </AvGroup>
                <AvGroup>
                  <Label for="version-product">Product</Label>
                  <AvInput id="version-product" type="select" className="form-control" name="productId">
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
                <AvGroup>
                  <Label for="version-amendment">Amendment</Label>
                  <AvInput id="version-amendment" type="select" className="form-control" name="amendmentId">
                    <option value="" key="0" />
                    {amendments
                      ? amendments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="version-prototype">Prototype</Label>
                  <AvInput id="version-prototype" type="select" className="form-control" name="prototypeId">
                    <option value="" key="0" />
                    {prototypes
                      ? prototypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="version-routing">Routing</Label>
                  <AvInput id="version-routing" type="select" className="form-control" name="routingId">
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
                <Button tag={Link} id="cancel-save" to="/entity/version" replace color="info">
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
  amendments: storeState.amendment.entities,
  prototypes: storeState.prototype.entities,
  routings: storeState.routing.entities,
  versionEntity: storeState.version.entity,
  loading: storeState.version.loading,
  updating: storeState.version.updating,
  updateSuccess: storeState.version.updateSuccess
});

const mapDispatchToProps = {
  getProducts,
  getAmendments,
  getPrototypes,
  getRoutings,
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
)(VersionUpdate);
