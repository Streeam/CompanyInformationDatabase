import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './extra-boms.reducer';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExtraBomsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExtraBomsUpdateState {
  isNew: boolean;
}

export class ExtraBomsUpdate extends React.Component<IExtraBomsUpdateProps, IExtraBomsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { extraBomsEntity } = this.props;
      const entity = {
        ...extraBomsEntity,
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
    this.props.history.push('/extra-boms');
  };

  render() {
    const { extraBomsEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.extraBoms.home.createOrEditLabel">Create or edit a ExtraBoms</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : extraBomsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="extra-boms-id">ID</Label>
                    <AvInput id="extra-boms-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="partNumberLabel" for="extra-boms-partNumber">
                    Part Number
                  </Label>
                  <AvField
                    id="extra-boms-partNumber"
                    type="text"
                    name="partNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="partDescriptionLabel" for="extra-boms-partDescription">
                    Part Description
                  </Label>
                  <AvField id="extra-boms-partDescription" type="text" name="partDescription" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="extra-boms-price">
                    Price
                  </Label>
                  <AvField
                    id="extra-boms-price"
                    type="string"
                    className="form-control"
                    name="price"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="quantityLabel" for="extra-boms-quantity">
                    Quantity
                  </Label>
                  <AvField
                    id="extra-boms-quantity"
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
                  <Label id="nonconformanceTypeLabel" for="extra-boms-nonconformanceType">
                    Nonconformance Type
                  </Label>
                  <AvInput
                    id="extra-boms-nonconformanceType"
                    type="select"
                    className="form-control"
                    name="nonconformanceType"
                    value={(!isNew && extraBomsEntity.nonconformanceType) || 'INTERNAL'}
                  >
                    <option value="INTERNAL">INTERNAL</option>
                    <option value="SUPPLIER">SUPPLIER</option>
                    <option value="AUDIT">AUDIT</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="nonconformanceActionLabel" for="extra-boms-nonconformanceAction">
                    Nonconformance Action
                  </Label>
                  <AvInput
                    id="extra-boms-nonconformanceAction"
                    type="select"
                    className="form-control"
                    name="nonconformanceAction"
                    value={(!isNew && extraBomsEntity.nonconformanceAction) || 'SCRAP'}
                  >
                    <option value="SCRAP">SCRAP</option>
                    <option value="REWORK">REWORK</option>
                    <option value="REJECT">REJECT</option>
                    <option value="CONCESSION">CONCESSION</option>
                    <option value="OTHER">OTHER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="internalNonconformanceIdLabel" for="extra-boms-internalNonconformanceId">
                    Internal Nonconformance Id
                  </Label>
                  <AvField
                    id="extra-boms-internalNonconformanceId"
                    type="string"
                    className="form-control"
                    name="internalNonconformanceId"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="customerNonConformaceIdLabel" for="extra-boms-customerNonConformaceId">
                    Customer Non Conformace Id
                  </Label>
                  <AvField id="extra-boms-customerNonConformaceId" type="string" className="form-control" name="customerNonConformaceId" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/extra-boms" replace color="info">
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
  extraBomsEntity: storeState.extraBoms.entity,
  loading: storeState.extraBoms.loading,
  updating: storeState.extraBoms.updating,
  updateSuccess: storeState.extraBoms.updateSuccess
});

const mapDispatchToProps = {
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
)(ExtraBomsUpdate);
