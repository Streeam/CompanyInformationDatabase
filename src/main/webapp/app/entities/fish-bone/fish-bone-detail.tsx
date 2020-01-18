import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fish-bone.reducer';
import { IFishBone } from 'app/shared/model/fish-bone.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFishBoneDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FishBoneDetail extends React.Component<IFishBoneDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fishBoneEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            FishBone [<b>{fishBoneEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="fishboneTypes">Fishbone Types</span>
            </dt>
            <dd>{fishBoneEntity.fishboneTypes}</dd>
            <dt>
              <span id="subCategory">Sub Category</span>
            </dt>
            <dd>{fishBoneEntity.subCategory}</dd>
            <dt>
              <span id="rootCauseId">Root Cause Id</span>
            </dt>
            <dd>{fishBoneEntity.rootCauseId}</dd>
          </dl>
          <Button tag={Link} to="/fish-bone" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/fish-bone/${fishBoneEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ fishBone }: IRootState) => ({
  fishBoneEntity: fishBone.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FishBoneDetail);
