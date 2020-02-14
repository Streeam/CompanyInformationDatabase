import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './supplier-non-conformance.reducer';
import { ISupplierNonConformance } from 'app/shared/model/supplier-non-conformance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplierNonConformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class SupplierNonConformance extends React.Component<ISupplierNonConformanceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { supplierNonConformanceList, match } = this.props;
    return (
      <div>
        <h2 id="supplier-non-conformance-heading">
          Supplier Non Conformances
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Supplier Non Conformance
          </Link>
        </h2>
        <div className="table-responsive">
          {supplierNonConformanceList && supplierNonConformanceList.length > 0 ? (
            <Table responsive aria-describedby="supplier-non-conformance-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Action</th>
                  <th>Labour</th>
                  <th>Concesion Details</th>
                  <th>Rejection Fee</th>
                  <th>Non Conformance Type</th>
                  <th>Employee</th>
                  <th>Supplier</th>
                  <th>Non Conformance Details</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {supplierNonConformanceList.map((supplierNonConformance, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${supplierNonConformance.id}`} color="link" size="sm">
                        {supplierNonConformance.id}
                      </Button>
                    </td>
                    <td>{supplierNonConformance.action}</td>
                    <td>{supplierNonConformance.labour}</td>
                    <td>{supplierNonConformance.concesionDetails}</td>
                    <td>{supplierNonConformance.rejectionFee}</td>
                    <td>{supplierNonConformance.nonConformanceType}</td>
                    <td>
                      {supplierNonConformance.employeeId ? (
                        <Link to={`employee/${supplierNonConformance.employeeId}`}>{supplierNonConformance.employeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {supplierNonConformance.supplierId ? (
                        <Link to={`supplier/${supplierNonConformance.supplierId}`}>{supplierNonConformance.supplierId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {supplierNonConformance.nonConformanceDetailsId ? (
                        <Link to={`non-conformance-details/${supplierNonConformance.nonConformanceDetailsId}`}>
                          {supplierNonConformance.nonConformanceDetailsId}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${supplierNonConformance.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${supplierNonConformance.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${supplierNonConformance.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Supplier Non Conformances found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ supplierNonConformance }: IRootState) => ({
  supplierNonConformanceList: supplierNonConformance.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierNonConformance);
