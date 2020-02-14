import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './audit-non-conformance.reducer';
import { IAuditNonConformance } from 'app/shared/model/audit-non-conformance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAuditNonConformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class AuditNonConformance extends React.Component<IAuditNonConformanceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { auditNonConformanceList, match } = this.props;
    return (
      <div>
        <h2 id="audit-non-conformance-heading">
          Audit Non Conformances
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Audit Non Conformance
          </Link>
        </h2>
        <div className="table-responsive">
          {auditNonConformanceList && auditNonConformanceList.length > 0 ? (
            <Table responsive aria-describedby="audit-non-conformance-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Audit Non Conformance First Type</th>
                  <th>Audit Non Conformance Second Type</th>
                  <th>Employee</th>
                  <th>Non Conformance Details</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {auditNonConformanceList.map((auditNonConformance, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${auditNonConformance.id}`} color="link" size="sm">
                        {auditNonConformance.id}
                      </Button>
                    </td>
                    <td>{auditNonConformance.auditNonConformanceFirstType}</td>
                    <td>{auditNonConformance.auditNonConformanceSecondType}</td>
                    <td>
                      {auditNonConformance.employeeId ? (
                        <Link to={`employee/${auditNonConformance.employeeId}`}>{auditNonConformance.employeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {auditNonConformance.nonConformanceDetailsId ? (
                        <Link to={`non-conformance-details/${auditNonConformance.nonConformanceDetailsId}`}>
                          {auditNonConformance.nonConformanceDetailsId}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${auditNonConformance.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${auditNonConformance.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${auditNonConformance.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Audit Non Conformances found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auditNonConformance }: IRootState) => ({
  auditNonConformanceList: auditNonConformance.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditNonConformance);
