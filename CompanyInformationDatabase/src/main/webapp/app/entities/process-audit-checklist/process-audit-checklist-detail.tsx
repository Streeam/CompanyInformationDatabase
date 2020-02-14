import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './process-audit-checklist.reducer';
import { IProcessAuditChecklist } from 'app/shared/model/process-audit-checklist.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProcessAuditChecklistDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProcessAuditChecklistDetail extends React.Component<IProcessAuditChecklistDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { processAuditChecklistEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ProcessAuditChecklist [<b>{processAuditChecklistEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="auditQuestion">Audit Question</span>
            </dt>
            <dd>{processAuditChecklistEntity.auditQuestion}</dd>
            <dt>
              <span id="compliant">Compliant</span>
            </dt>
            <dd>{processAuditChecklistEntity.compliant ? 'true' : 'false'}</dd>
            <dt>
              <span id="ofi">Ofi</span>
            </dt>
            <dd>{processAuditChecklistEntity.ofi ? 'true' : 'false'}</dd>
            <dt>
              <span id="minorNC">Minor NC</span>
            </dt>
            <dd>{processAuditChecklistEntity.minorNC ? 'true' : 'false'}</dd>
            <dt>
              <span id="majorNC">Major NC</span>
            </dt>
            <dd>{processAuditChecklistEntity.majorNC ? 'true' : 'false'}</dd>
            <dt>
              <span id="auditAnswer">Audit Answer</span>
            </dt>
            <dd>{processAuditChecklistEntity.auditAnswer}</dd>
            <dt>
              <span id="opportunitiesForImprovement">Opportunities For Improvement</span>
            </dt>
            <dd>{processAuditChecklistEntity.opportunitiesForImprovement}</dd>
            <dt>
              <span id="nonConformanceId">Non Conformance Id</span>
            </dt>
            <dd>{processAuditChecklistEntity.nonConformanceId}</dd>
          </dl>
          <Button tag={Link} to="/process-audit-checklist" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/process-audit-checklist/${processAuditChecklistEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ processAuditChecklist }: IRootState) => ({
  processAuditChecklistEntity: processAuditChecklist.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessAuditChecklistDetail);
