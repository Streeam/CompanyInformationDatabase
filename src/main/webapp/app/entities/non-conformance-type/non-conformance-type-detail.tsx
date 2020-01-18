import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './non-conformance-type.reducer';
import { INonConformanceType } from 'app/shared/model/non-conformance-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INonConformanceTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NonConformanceTypeDetail extends React.Component<INonConformanceTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nonConformanceTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            NonConformanceType [<b>{nonConformanceTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="rejectionCode">Rejection Code</span>
            </dt>
            <dd>{nonConformanceTypeEntity.rejectionCode}</dd>
            <dt>
              <span id="rejectionTitle">Rejection Title</span>
            </dt>
            <dd>{nonConformanceTypeEntity.rejectionTitle}</dd>
          </dl>
          <Button tag={Link} to="/entity/non-conformance-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/non-conformance-type/${nonConformanceTypeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ nonConformanceType }: IRootState) => ({
  nonConformanceTypeEntity: nonConformanceType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonConformanceTypeDetail);
