import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './extra-routings.reducer';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExtraRoutingsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExtraRoutingsDetail extends React.Component<IExtraRoutingsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { extraRoutingsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ExtraRoutings [<b>{extraRoutingsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="overhead">Overhead</span>
            </dt>
            <dd>{extraRoutingsEntity.overhead}</dd>
            <dt>
              <span id="resourceName">Resource Name</span>
            </dt>
            <dd>{extraRoutingsEntity.resourceName}</dd>
            <dt>
              <span id="runtime">Runtime</span>
            </dt>
            <dd>{extraRoutingsEntity.runtime}</dd>
            <dt>
              <span id="internalNonConformanceId">Internal Non Conformance Id</span>
            </dt>
            <dd>{extraRoutingsEntity.internalNonConformanceId}</dd>
            <dt>
              <span id="nonconformanceType">Nonconformance Type</span>
            </dt>
            <dd>{extraRoutingsEntity.nonconformanceType}</dd>
            <dt>
              <span id="nonconformanceAction">Nonconformance Action</span>
            </dt>
            <dd>{extraRoutingsEntity.nonconformanceAction}</dd>
            <dt>
              <span id="customerNonConformaceId">Customer Non Conformace Id</span>
            </dt>
            <dd>{extraRoutingsEntity.customerNonConformaceId}</dd>
          </dl>
          <Button tag={Link} to="/extra-routings" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/extra-routings/${extraRoutingsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ extraRoutings }: IRootState) => ({
  extraRoutingsEntity: extraRoutings.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraRoutingsDetail);
