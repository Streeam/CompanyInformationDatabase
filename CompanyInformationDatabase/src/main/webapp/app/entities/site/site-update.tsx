import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { getEntities as getInternalNonConformances } from 'app/entities/internal-non-conformance/internal-non-conformance.reducer';
import { getEntity, updateEntity, createEntity, reset } from './site.reducer';
import { ISite } from 'app/shared/model/site.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISiteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISiteUpdateState {
  isNew: boolean;
  internalNonConformanceId: string;
}

export class SiteUpdate extends React.Component<ISiteUpdateProps, ISiteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      internalNonConformanceId: '0',
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

    this.props.getInternalNonConformances();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { siteEntity } = this.props;
      const entity = {
        ...siteEntity,
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
    this.props.history.push('/site');
  };

  render() {
    const { siteEntity, internalNonConformances, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.site.home.createOrEditLabel">Create or edit a Site</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : siteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="site-id">ID</Label>
                    <AvInput id="site-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="siteLabel" for="site-site">
                    Site
                  </Label>
                  <AvField id="site-site" type="text" name="site" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/site" replace color="info">
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
  internalNonConformances: storeState.internalNonConformance.entities,
  siteEntity: storeState.site.entity,
  loading: storeState.site.loading,
  updating: storeState.site.updating,
  updateSuccess: storeState.site.updateSuccess
});

const mapDispatchToProps = {
  getInternalNonConformances,
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
)(SiteUpdate);
