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
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { getEntities as getNonConformanceDetails } from 'app/entities/non-conformance-details/non-conformance-details.reducer';
import { getEntity, updateEntity, createEntity, reset } from './drawing.reducer';
import { IDrawing } from 'app/shared/model/drawing.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDrawingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDrawingUpdateState {
  isNew: boolean;
  productId: string;
  amendmentId: string;
  nonConformanceDetailsId: string;
}

export class DrawingUpdate extends React.Component<IDrawingUpdateProps, IDrawingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      productId: '0',
      amendmentId: '0',
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

    this.props.getProducts();
    this.props.getAmendments();
    this.props.getNonConformanceDetails();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { drawingEntity } = this.props;
      const entity = {
        ...drawingEntity,
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
    this.props.history.push('/entity/drawing');
  };

  render() {
    const { drawingEntity, products, amendments, nonConformanceDetails, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.drawing.home.createOrEditLabel">Create or edit a Drawing</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : drawingEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="drawing-id">ID</Label>
                    <AvInput id="drawing-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="drawingNumberLabel" for="drawing-drawingNumber">
                    Drawing Number
                  </Label>
                  <AvField
                    id="drawing-drawingNumber"
                    type="text"
                    name="drawingNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="drawingIssueLabel" for="drawing-drawingIssue">
                    Drawing Issue
                  </Label>
                  <AvField
                    id="drawing-drawingIssue"
                    type="text"
                    name="drawingIssue"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="urlPathLabel" for="drawing-urlPath">
                    Url Path
                  </Label>
                  <AvField
                    id="drawing-urlPath"
                    type="text"
                    name="urlPath"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="drawing-product">Product</Label>
                  <AvInput id="drawing-product" type="select" className="form-control" name="productId">
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
                  <Label for="drawing-amendment">Amendment</Label>
                  <AvInput id="drawing-amendment" type="select" className="form-control" name="amendmentId">
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
                  <Label for="drawing-nonConformanceDetails">Non Conformance Details</Label>
                  <AvInput id="drawing-nonConformanceDetails" type="select" className="form-control" name="nonConformanceDetailsId">
                    <option value="" key="0" />
                    {nonConformanceDetails
                      ? nonConformanceDetails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/drawing" replace color="info">
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
  nonConformanceDetails: storeState.nonConformanceDetails.entities,
  drawingEntity: storeState.drawing.entity,
  loading: storeState.drawing.loading,
  updating: storeState.drawing.updating,
  updateSuccess: storeState.drawing.updateSuccess
});

const mapDispatchToProps = {
  getProducts,
  getAmendments,
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
)(DrawingUpdate);
