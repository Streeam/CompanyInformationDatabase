import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './internal-non-conformance.reducer';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInternalNonConformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class InternalNonConformance extends React.Component<IInternalNonConformanceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { internalNonConformanceList, match } = this.props;
    return (
      <div>
        <h2 id="internal-non-conformance-heading">
          Internal Non Conformances
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Internal Non Conformance
          </Link>
        </h2>
        <div className="table-responsive">
          {internalNonConformanceList && internalNonConformanceList.length > 0 ? (
            <Table responsive aria-describedby="internal-non-conformance-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Action</th>
                  <th>Curent Date</th>
                  <th>Rejection Date</th>
                  <th>Rejection Reason Details</th>
                  <th>Labour Rate</th>
                  <th>Nonconformance Details Id</th>
                  <th>Status</th>
                  <th>Quantity</th>
                  <th>Employee</th>
                  <th>Site</th>
                  <th>Department</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {internalNonConformanceList.map((internalNonConformance, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${internalNonConformance.id}`} color="link" size="sm">
                        {internalNonConformance.id}
                      </Button>
                    </td>
                    <td>{internalNonConformance.action}</td>
                    <td>
                      <TextFormat type="date" value={internalNonConformance.curentDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={internalNonConformance.rejectionDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{internalNonConformance.rejectionReasonDetails}</td>
                    <td>{internalNonConformance.labourRate}</td>
                    <td>{internalNonConformance.nonconformanceDetailsId}</td>
                    <td>{internalNonConformance.status}</td>
                    <td>{internalNonConformance.quantity}</td>
                    <td>
                      {internalNonConformance.employees
                        ? internalNonConformance.employees.map((val, j) => (
                            <span key={j}>
                              <Link to={`employee/${val.id}`}>{val.id}</Link>
                              {j === internalNonConformance.employees.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {internalNonConformance.sites
                        ? internalNonConformance.sites.map((val, j) => (
                            <span key={j}>
                              <Link to={`site/${val.id}`}>{val.site}</Link>
                              {j === internalNonConformance.sites.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {internalNonConformance.departments
                        ? internalNonConformance.departments.map((val, j) => (
                            <span key={j}>
                              <Link to={`department/${val.id}`}>{val.id}</Link>
                              {j === internalNonConformance.departments.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${internalNonConformance.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${internalNonConformance.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${internalNonConformance.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Internal Non Conformances found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ internalNonConformance }: IRootState) => ({
  internalNonConformanceList: internalNonConformance.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNonConformance);
