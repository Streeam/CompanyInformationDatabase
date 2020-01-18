import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './audit-non-conformance.reducer';
import { IAuditNonConformance } from 'app/shared/model/audit-non-conformance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAuditNonConformanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AuditNonConformanceDetail extends React.Component<IAuditNonConformanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { auditNonConformanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            AuditNonConformance [<b>{auditNonConformanceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="auditNonConformanceFirstType">Audit Non Conformance First Type</span>
            </dt>
            <dd>{auditNonConformanceEntity.auditNonConformanceFirstType}</dd>
            <dt>
              <span id="auditNonConformanceSecondType">Audit Non Conformance Second Type</span>
            </dt>
            <dd>{auditNonConformanceEntity.auditNonConformanceSecondType}</dd>
            <dt>Employee</dt>
            <dd>{auditNonConformanceEntity.employeeId ? auditNonConformanceEntity.employeeId : ''}</dd>
            <dt>Non Conformance Details</dt>
            <dd>{auditNonConformanceEntity.nonConformanceDetailsId ? auditNonConformanceEntity.nonConformanceDetailsId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/audit-non-conformance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/audit-non-conformance/${auditNonConformanceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ auditNonConformance }: IRootState) => ({
  auditNonConformanceEntity: auditNonConformance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditNonConformanceDetail);
