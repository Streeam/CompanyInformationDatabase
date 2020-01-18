import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './extra-routings.reducer';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExtraRoutingsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExtraRoutingsUpdateState {
  isNew: boolean;
}

export class ExtraRoutingsUpdate extends React.Component<IExtraRoutingsUpdateProps, IExtraRoutingsUpdateState> {
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
      const { extraRoutingsEntity } = this.props;
      const entity = {
        ...extraRoutingsEntity,
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
    this.props.history.push('/extra-routings');
  };

  render() {
    const { extraRoutingsEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.extraRoutings.home.createOrEditLabel">Create or edit a ExtraRoutings</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : extraRoutingsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="extra-routings-id">ID</Label>
                    <AvInput id="extra-routings-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="overheadLabel" for="extra-routings-overhead">
                    Overhead
                  </Label>
                  <AvField
                    id="extra-routings-overhead"
                    type="string"
                    className="form-control"
                    name="overhead"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="resourceNameLabel" for="extra-routings-resourceName">
                    Resource Name
                  </Label>
                  <AvField
                    id="extra-routings-resourceName"
                    type="text"
                    name="resourceName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="runtimeLabel" for="extra-routings-runtime">
                    Runtime
                  </Label>
                  <AvField
                    id="extra-routings-runtime"
                    type="string"
                    className="form-control"
                    name="runtime"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="internalNonConformanceIdLabel" for="extra-routings-internalNonConformanceId">
                    Internal Non Conformance Id
                  </Label>
                  <AvField
                    id="extra-routings-internalNonConformanceId"
                    type="string"
                    className="form-control"
                    name="internalNonConformanceId"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nonconformanceTypeLabel" for="extra-routings-nonconformanceType">
                    Nonconformance Type
                  </Label>
                  <AvInput
                    id="extra-routings-nonconformanceType"
                    type="select"
                    className="form-control"
                    name="nonconformanceType"
                    value={(!isNew && extraRoutingsEntity.nonconformanceType) || 'INTERNAL'}
                  >
                    <option value="INTERNAL">INTERNAL</option>
                    <option value="SUPPLIER">SUPPLIER</option>
                    <option value="AUDIT">AUDIT</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="nonconformanceActionLabel" for="extra-routings-nonconformanceAction">
                    Nonconformance Action
                  </Label>
                  <AvInput
                    id="extra-routings-nonconformanceAction"
                    type="select"
                    className="form-control"
                    name="nonconformanceAction"
                    value={(!isNew && extraRoutingsEntity.nonconformanceAction) || 'SCRAP'}
                  >
                    <option value="SCRAP">SCRAP</option>
                    <option value="REWORK">REWORK</option>
                    <option value="REJECT">REJECT</option>
                    <option value="CONCESSION">CONCESSION</option>
                    <option value="OTHER">OTHER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="customerNonConformaceIdLabel" for="extra-routings-customerNonConformaceId">
                    Customer Non Conformace Id
                  </Label>
                  <AvField
                    id="extra-routings-customerNonConformaceId"
                    type="string"
                    className="form-control"
                    name="customerNonConformaceId"
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/extra-routings" replace color="info">
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
  extraRoutingsEntity: storeState.extraRoutings.entity,
  loading: storeState.extraRoutings.loading,
  updating: storeState.extraRoutings.updating,
  updateSuccess: storeState.extraRoutings.updateSuccess
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
)(ExtraRoutingsUpdate);
