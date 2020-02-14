import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './internal-non-conformance.reducer';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInternalNonConformanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InternalNonConformanceDetail extends React.Component<IInternalNonConformanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { internalNonConformanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            InternalNonConformance [<b>{internalNonConformanceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="action">Action</span>
            </dt>
            <dd>{internalNonConformanceEntity.action}</dd>
            <dt>
              <span id="curentDate">Curent Date</span>
            </dt>
            <dd>
              <TextFormat value={internalNonConformanceEntity.curentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="rejectionDate">Rejection Date</span>
            </dt>
            <dd>
              <TextFormat value={internalNonConformanceEntity.rejectionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="rejectionReasonDetails">Rejection Reason Details</span>
            </dt>
            <dd>{internalNonConformanceEntity.rejectionReasonDetails}</dd>
            <dt>
              <span id="labourRate">Labour Rate</span>
            </dt>
            <dd>{internalNonConformanceEntity.labourRate}</dd>
            <dt>
              <span id="nonconformanceDetailsId">Nonconformance Details Id</span>
            </dt>
            <dd>{internalNonConformanceEntity.nonconformanceDetailsId}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{internalNonConformanceEntity.status}</dd>
            <dt>
              <span id="quantity">Quantity</span>
            </dt>
            <dd>{internalNonConformanceEntity.quantity}</dd>
            <dt>Employee</dt>
            <dd>
              {internalNonConformanceEntity.employees
                ? internalNonConformanceEntity.employees.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === internalNonConformanceEntity.employees.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Site</dt>
            <dd>
              {internalNonConformanceEntity.sites
                ? internalNonConformanceEntity.sites.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.site}</a>
                      {i === internalNonConformanceEntity.sites.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Department</dt>
            <dd>
              {internalNonConformanceEntity.departments
                ? internalNonConformanceEntity.departments.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === internalNonConformanceEntity.departments.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/internal-non-conformance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/internal-non-conformance/${internalNonConformanceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ internalNonConformance }: IRootState) => ({
  internalNonConformanceEntity: internalNonConformance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNonConformanceDetail);
