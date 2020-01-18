import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './roles.reducer';
import { IRoles } from 'app/shared/model/roles.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRolesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Roles extends React.Component<IRolesProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { rolesList, match } = this.props;
    return (
      <div>
        <h2 id="roles-heading">
          Roles
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Roles
          </Link>
        </h2>
        <div className="table-responsive">
          {rolesList && rolesList.length > 0 ? (
            <Table responsive aria-describedby="roles-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Raise Nonconformace</th>
                  <th>View Nonconformance</th>
                  <th>Edit Nonconformance</th>
                  <th>View Nonconformance Tasks</th>
                  <th>Edit Nonconformance Tasks</th>
                  <th>Delete Nonconformance Tasks</th>
                  <th>Delete Nonconformance</th>
                  <th>Raise Change Request</th>
                  <th>View Cost Analyses</th>
                  <th>Edit Cost Analyses</th>
                  <th>View Request Submited</th>
                  <th>Edit Request Submited</th>
                  <th>Approve Request Submited</th>
                  <th>View Pending Submited</th>
                  <th>Edit Pending Submited</th>
                  <th>Approve Pending Submited</th>
                  <th>View Rejected</th>
                  <th>Edit Rejected</th>
                  <th>Edit Purchase Request</th>
                  <th>Delete Purchase Request</th>
                  <th>Edit Product Stock</th>
                  <th>Add Product</th>
                  <th>Delete Product</th>
                  <th>Edit Product</th>
                  <th>Add Customer</th>
                  <th>Delete Customer</th>
                  <th>Edit Customer</th>
                  <th>Add Supplier</th>
                  <th>Delete Supplier</th>
                  <th>Edit Supplier</th>
                  <th>Raise Task</th>
                  <th>Add Progress Track</th>
                  <th>Delete Progress Track</th>
                  <th>Edit Progress Track</th>
                  <th>View Progress Track</th>
                  <th>Add Non Conformance Reason</th>
                  <th>Add Root Causes</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rolesList.map((roles, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${roles.id}`} color="link" size="sm">
                        {roles.id}
                      </Button>
                    </td>
                    <td>{roles.raiseNonconformace ? 'true' : 'false'}</td>
                    <td>{roles.viewNonconformance ? 'true' : 'false'}</td>
                    <td>{roles.editNonconformance ? 'true' : 'false'}</td>
                    <td>{roles.viewNonconformanceTasks ? 'true' : 'false'}</td>
                    <td>{roles.editNonconformanceTasks ? 'true' : 'false'}</td>
                    <td>{roles.deleteNonconformanceTasks ? 'true' : 'false'}</td>
                    <td>{roles.deleteNonconformance ? 'true' : 'false'}</td>
                    <td>{roles.raiseChangeRequest ? 'true' : 'false'}</td>
                    <td>{roles.viewCostAnalyses ? 'true' : 'false'}</td>
                    <td>{roles.editCostAnalyses ? 'true' : 'false'}</td>
                    <td>{roles.viewRequestSubmited ? 'true' : 'false'}</td>
                    <td>{roles.editRequestSubmited ? 'true' : 'false'}</td>
                    <td>{roles.approveRequestSubmited ? 'true' : 'false'}</td>
                    <td>{roles.viewPendingSubmited ? 'true' : 'false'}</td>
                    <td>{roles.editPendingSubmited ? 'true' : 'false'}</td>
                    <td>{roles.approvePendingSubmited ? 'true' : 'false'}</td>
                    <td>{roles.viewRejected ? 'true' : 'false'}</td>
                    <td>{roles.editRejected ? 'true' : 'false'}</td>
                    <td>{roles.editPurchaseRequest ? 'true' : 'false'}</td>
                    <td>{roles.deletePurchaseRequest ? 'true' : 'false'}</td>
                    <td>{roles.editProductStock ? 'true' : 'false'}</td>
                    <td>{roles.addProduct ? 'true' : 'false'}</td>
                    <td>{roles.deleteProduct ? 'true' : 'false'}</td>
                    <td>{roles.editProduct ? 'true' : 'false'}</td>
                    <td>{roles.addCustomer ? 'true' : 'false'}</td>
                    <td>{roles.deleteCustomer ? 'true' : 'false'}</td>
                    <td>{roles.editCustomer ? 'true' : 'false'}</td>
                    <td>{roles.addSupplier ? 'true' : 'false'}</td>
                    <td>{roles.deleteSupplier ? 'true' : 'false'}</td>
                    <td>{roles.editSupplier ? 'true' : 'false'}</td>
                    <td>{roles.raiseTask ? 'true' : 'false'}</td>
                    <td>{roles.addProgressTrack ? 'true' : 'false'}</td>
                    <td>{roles.deleteProgressTrack ? 'true' : 'false'}</td>
                    <td>{roles.editProgressTrack ? 'true' : 'false'}</td>
                    <td>{roles.viewProgressTrack ? 'true' : 'false'}</td>
                    <td>{roles.addNonConformanceReason ? 'true' : 'false'}</td>
                    <td>{roles.addRootCauses ? 'true' : 'false'}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${roles.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${roles.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${roles.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Roles found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ roles }: IRootState) => ({
  rolesList: roles.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roles);
