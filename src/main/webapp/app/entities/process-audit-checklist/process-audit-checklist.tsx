import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './process-audit-checklist.reducer';
import { IProcessAuditChecklist } from 'app/shared/model/process-audit-checklist.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProcessAuditChecklistProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ProcessAuditChecklist extends React.Component<IProcessAuditChecklistProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { processAuditChecklistList, match } = this.props;
    return (
      <div>
        <h2 id="process-audit-checklist-heading">
          Process Audit Checklists
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Process Audit Checklist
          </Link>
        </h2>
        <div className="table-responsive">
          {processAuditChecklistList && processAuditChecklistList.length > 0 ? (
            <Table responsive aria-describedby="process-audit-checklist-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Audit Question</th>
                  <th>Compliant</th>
                  <th>Ofi</th>
                  <th>Minor NC</th>
                  <th>Major NC</th>
                  <th>Audit Answer</th>
                  <th>Opportunities For Improvement</th>
                  <th>Non Conformance Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {processAuditChecklistList.map((processAuditChecklist, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${processAuditChecklist.id}`} color="link" size="sm">
                        {processAuditChecklist.id}
                      </Button>
                    </td>
                    <td>{processAuditChecklist.auditQuestion}</td>
                    <td>{processAuditChecklist.compliant ? 'true' : 'false'}</td>
                    <td>{processAuditChecklist.ofi ? 'true' : 'false'}</td>
                    <td>{processAuditChecklist.minorNC ? 'true' : 'false'}</td>
                    <td>{processAuditChecklist.majorNC ? 'true' : 'false'}</td>
                    <td>{processAuditChecklist.auditAnswer}</td>
                    <td>{processAuditChecklist.opportunitiesForImprovement}</td>
                    <td>{processAuditChecklist.nonConformanceId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${processAuditChecklist.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${processAuditChecklist.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${processAuditChecklist.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Process Audit Checklists found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ processAuditChecklist }: IRootState) => ({
  processAuditChecklistList: processAuditChecklist.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessAuditChecklist);
