import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './non-conformance-details.reducer';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INonConformanceDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NonConformanceDetailsDetail extends React.Component<INonConformanceDetailsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nonConformanceDetailsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            NonConformanceDetails [<b>{nonConformanceDetailsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="deadline">Deadline</span>
            </dt>
            <dd>
              <TextFormat value={nonConformanceDetailsEntity.deadline} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{nonConformanceDetailsEntity.status}</dd>
            <dt>
              <span id="progress">Progress</span>
            </dt>
            <dd>{nonConformanceDetailsEntity.progress}</dd>
            <dt>
              <span id="priority">Priority</span>
            </dt>
            <dd>{nonConformanceDetailsEntity.priority}</dd>
            <dt>
              <span id="nonconformance">Nonconformance</span>
            </dt>
            <dd>{nonConformanceDetailsEntity.nonconformance}</dd>
            <dt>
              <span id="currentDate">Current Date</span>
            </dt>
            <dd>
              <TextFormat value={nonConformanceDetailsEntity.currentDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Product</dt>
            <dd>
              {nonConformanceDetailsEntity.products
                ? nonConformanceDetailsEntity.products.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.partNumber}</a>
                      {i === nonConformanceDetailsEntity.products.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Routing</dt>
            <dd>
              {nonConformanceDetailsEntity.routings
                ? nonConformanceDetailsEntity.routings.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === nonConformanceDetailsEntity.routings.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/non-conformance-details" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/non-conformance-details/${nonConformanceDetailsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ nonConformanceDetails }: IRootState) => ({
  nonConformanceDetailsEntity: nonConformanceDetails.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonConformanceDetailsDetail);
