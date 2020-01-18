import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './fish-bone.reducer';
import { IFishBone } from 'app/shared/model/fish-bone.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFishBoneUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFishBoneUpdateState {
  isNew: boolean;
}

export class FishBoneUpdate extends React.Component<IFishBoneUpdateProps, IFishBoneUpdateState> {
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
      const { fishBoneEntity } = this.props;
      const entity = {
        ...fishBoneEntity,
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
    this.props.history.push('/fish-bone');
  };

  render() {
    const { fishBoneEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.fishBone.home.createOrEditLabel">Create or edit a FishBone</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fishBoneEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="fish-bone-id">ID</Label>
                    <AvInput id="fish-bone-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="fishboneTypesLabel" for="fish-bone-fishboneTypes">
                    Fishbone Types
                  </Label>
                  <AvInput
                    id="fish-bone-fishboneTypes"
                    type="select"
                    className="form-control"
                    name="fishboneTypes"
                    value={(!isNew && fishBoneEntity.fishboneTypes) || 'EQUIPMENT'}
                  >
                    <option value="EQUIPMENT">EQUIPMENT</option>
                    <option value="PEOPLE">PEOPLE</option>
                    <option value="PROCESS">PROCESS</option>
                    <option value="MATERIALS">MATERIALS</option>
                    <option value="ENVIRONMENT">ENVIRONMENT</option>
                    <option value="MANAGEMENT">MANAGEMENT</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="INSPECTION">INSPECTION</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="subCategoryLabel" for="fish-bone-subCategory">
                    Sub Category
                  </Label>
                  <AvField id="fish-bone-subCategory" type="text" name="subCategory" />
                </AvGroup>
                <AvGroup>
                  <Label id="rootCauseIdLabel" for="fish-bone-rootCauseId">
                    Root Cause Id
                  </Label>
                  <AvField
                    id="fish-bone-rootCauseId"
                    type="string"
                    className="form-control"
                    name="rootCauseId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/fish-bone" replace color="info">
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
  fishBoneEntity: storeState.fishBone.entity,
  loading: storeState.fishBone.loading,
  updating: storeState.fishBone.updating,
  updateSuccess: storeState.fishBone.updateSuccess
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
)(FishBoneUpdate);
