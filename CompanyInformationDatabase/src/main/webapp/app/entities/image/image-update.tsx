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
import { getEntity, updateEntity, createEntity, reset } from './image.reducer';
import { IImage } from 'app/shared/model/image.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImageUpdateState {
  isNew: boolean;
  productId: string;
  amendmentId: string;
}

export class ImageUpdate extends React.Component<IImageUpdateProps, IImageUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      productId: '0',
      amendmentId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const { imageEntity } = this.props;
      const entity = {
        ...imageEntity,
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
    this.props.history.push('/image');
  };

  render() {
    const { imageEntity, products, amendments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.image.home.createOrEditLabel">Create or edit a Image</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : imageEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="image-id">ID</Label>
                    <AvInput id="image-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="urlPathLabel" for="image-urlPath">
                    Url Path
                  </Label>
                  <AvField
                    id="image-urlPath"
                    type="text"
                    name="urlPath"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="image-name">
                    Name
                  </Label>
                  <AvField
                    id="image-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModifiedDateLabel" for="image-lastModifiedDate">
                    Last Modified Date
                  </Label>
                  <AvInput
                    id="image-lastModifiedDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModifiedDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.imageEntity.lastModifiedDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="sizeLabel" for="image-size">
                    Size
                  </Label>
                  <AvField id="image-size" type="string" className="form-control" name="size" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="image-type">
                    Type
                  </Label>
                  <AvField
                    id="image-type"
                    type="text"
                    name="type"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="taskIdLabel" for="image-taskId">
                    Task Id
                  </Label>
                  <AvField id="image-taskId" type="string" className="form-control" name="taskId" />
                </AvGroup>
                <AvGroup>
                  <Label id="nonconformanceDetailsIdLabel" for="image-nonconformanceDetailsId">
                    Nonconformance Details Id
                  </Label>
                  <AvField id="image-nonconformanceDetailsId" type="string" className="form-control" name="nonconformanceDetailsId" />
                </AvGroup>
                <AvGroup>
                  <Label id="progressTrackIdLabel" for="image-progressTrackId">
                    Progress Track Id
                  </Label>
                  <AvField id="image-progressTrackId" type="string" className="form-control" name="progressTrackId" />
                </AvGroup>
                <AvGroup>
                  <Label for="image-product">Product</Label>
                  <AvInput id="image-product" type="select" className="form-control" name="productId">
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
                  <Label for="image-amendment">Amendment</Label>
                  <AvInput id="image-amendment" type="select" className="form-control" name="amendmentId">
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
                <Button tag={Link} id="cancel-save" to="/image" replace color="info">
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
  imageEntity: storeState.image.entity,
  loading: storeState.image.loading,
  updating: storeState.image.updating,
  updateSuccess: storeState.image.updateSuccess
});

const mapDispatchToProps = {
  getProducts,
  getAmendments,
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
)(ImageUpdate);
