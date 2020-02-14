import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './client-non-conformance.reducer';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientNonConformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ClientNonConformance extends React.Component<IClientNonConformanceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { clientNonConformanceList, match } = this.props;
    return (
      <div>
        <h2 id="client-non-conformance-heading">
          Client Non Conformances
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Client Non Conformance
          </Link>
        </h2>
        <div className="table-responsive">
          {clientNonConformanceList && clientNonConformanceList.length > 0 ? (
            <Table responsive aria-describedby="client-non-conformance-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Non Conformance Type</th>
                  <th>Status</th>
                  <th>Nonconformance Details Id</th>
                  <th>Rejection Reason Details</th>
                  <th>Action To Be Taken Details</th>
                  <th>Short Term Details</th>
                  <th>Long Term Details</th>
                  <th>Current Date</th>
                  <th>Rejection Date</th>
                  <th>Under Warranty</th>
                  <th>Quantity</th>
                  <th>Labour Rate</th>
                  <th>Customer</th>
                  <th>Culpable Employees</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clientNonConformanceList.map((clientNonConformance, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${clientNonConformance.id}`} color="link" size="sm">
                        {clientNonConformance.id}
                      </Button>
                    </td>
                    <td>{clientNonConformance.nonConformanceType}</td>
                    <td>{clientNonConformance.status}</td>
                    <td>{clientNonConformance.nonconformanceDetailsId}</td>
                    <td>{clientNonConformance.rejectionReasonDetails}</td>
                    <td>{clientNonConformance.actionToBeTakenDetails}</td>
                    <td>{clientNonConformance.shortTermDetails}</td>
                    <td>{clientNonConformance.longTermDetails}</td>
                    <td>
                      <TextFormat type="date" value={clientNonConformance.currentDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={clientNonConformance.rejectionDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{clientNonConformance.underWarranty ? 'true' : 'false'}</td>
                    <td>{clientNonConformance.quantity}</td>
                    <td>{clientNonConformance.labourRate}</td>
                    <td>
                      {clientNonConformance.customerId ? (
                        <Link to={`customer/${clientNonConformance.customerId}`}>{clientNonConformance.customerId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {clientNonConformance.culpableEmployees
                        ? clientNonConformance.culpableEmployees.map((val, j) => (
                            <span key={j}>
                              <Link to={`employee/${val.id}`}>{val.id}</Link>
                              {j === clientNonConformance.culpableEmployees.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${clientNonConformance.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${clientNonConformance.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${clientNonConformance.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Client Non Conformances found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ clientNonConformance }: IRootState) => ({
  clientNonConformanceList: clientNonConformance.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientNonConformance);
