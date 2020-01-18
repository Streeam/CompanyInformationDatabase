import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './roles.reducer';
import { IRoles } from 'app/shared/model/roles.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRolesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RolesDetail extends React.Component<IRolesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { rolesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Roles [<b>{rolesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="raiseNonconformace">Raise Nonconformace</span>
            </dt>
            <dd>{rolesEntity.raiseNonconformace ? 'true' : 'false'}</dd>
            <dt>
              <span id="viewNonconformance">View Nonconformance</span>
            </dt>
            <dd>{rolesEntity.viewNonconformance ? 'true' : 'false'}</dd>
            <dt>
              <span id="editNonconformance">Edit Nonconformance</span>
            </dt>
            <dd>{rolesEntity.editNonconformance ? 'true' : 'false'}</dd>
            <dt>
              <span id="viewNonconformanceTasks">View Nonconformance Tasks</span>
            </dt>
            <dd>{rolesEntity.viewNonconformanceTasks ? 'true' : 'false'}</dd>
            <dt>
              <span id="editNonconformanceTasks">Edit Nonconformance Tasks</span>
            </dt>
            <dd>{rolesEntity.editNonconformanceTasks ? 'true' : 'false'}</dd>
            <dt>
              <span id="deleteNonconformanceTasks">Delete Nonconformance Tasks</span>
            </dt>
            <dd>{rolesEntity.deleteNonconformanceTasks ? 'true' : 'false'}</dd>
            <dt>
              <span id="deleteNonconformance">Delete Nonconformance</span>
            </dt>
            <dd>{rolesEntity.deleteNonconformance ? 'true' : 'false'}</dd>
            <dt>
              <span id="raiseChangeRequest">Raise Change Request</span>
            </dt>
            <dd>{rolesEntity.raiseChangeRequest ? 'true' : 'false'}</dd>
            <dt>
              <span id="viewCostAnalyses">View Cost Analyses</span>
            </dt>
            <dd>{rolesEntity.viewCostAnalyses ? 'true' : 'false'}</dd>
            <dt>
              <span id="editCostAnalyses">Edit Cost Analyses</span>
            </dt>
            <dd>{rolesEntity.editCostAnalyses ? 'true' : 'false'}</dd>
            <dt>
              <span id="viewRequestSubmited">View Request Submited</span>
            </dt>
            <dd>{rolesEntity.viewRequestSubmited ? 'true' : 'false'}</dd>
            <dt>
              <span id="editRequestSubmited">Edit Request Submited</span>
            </dt>
            <dd>{rolesEntity.editRequestSubmited ? 'true' : 'false'}</dd>
            <dt>
              <span id="approveRequestSubmited">Approve Request Submited</span>
            </dt>
            <dd>{rolesEntity.approveRequestSubmited ? 'true' : 'false'}</dd>
            <dt>
              <span id="viewPendingSubmited">View Pending Submited</span>
            </dt>
            <dd>{rolesEntity.viewPendingSubmited ? 'true' : 'false'}</dd>
            <dt>
              <span id="editPendingSubmited">Edit Pending Submited</span>
            </dt>
            <dd>{rolesEntity.editPendingSubmited ? 'true' : 'false'}</dd>
            <dt>
              <span id="approvePendingSubmited">Approve Pending Submited</span>
            </dt>
            <dd>{rolesEntity.approvePendingSubmited ? 'true' : 'false'}</dd>
            <dt>
              <span id="viewRejected">View Rejected</span>
            </dt>
            <dd>{rolesEntity.viewRejected ? 'true' : 'false'}</dd>
            <dt>
              <span id="editRejected">Edit Rejected</span>
            </dt>
            <dd>{rolesEntity.editRejected ? 'true' : 'false'}</dd>
            <dt>
              <span id="editPurchaseRequest">Edit Purchase Request</span>
            </dt>
            <dd>{rolesEntity.editPurchaseRequest ? 'true' : 'false'}</dd>
            <dt>
              <span id="deletePurchaseRequest">Delete Purchase Request</span>
            </dt>
            <dd>{rolesEntity.deletePurchaseRequest ? 'true' : 'false'}</dd>
            <dt>
              <span id="editProductStock">Edit Product Stock</span>
            </dt>
            <dd>{rolesEntity.editProductStock ? 'true' : 'false'}</dd>
            <dt>
              <span id="addProduct">Add Product</span>
            </dt>
            <dd>{rolesEntity.addProduct ? 'true' : 'false'}</dd>
            <dt>
              <span id="deleteProduct">Delete Product</span>
            </dt>
            <dd>{rolesEntity.deleteProduct ? 'true' : 'false'}</dd>
            <dt>
              <span id="editProduct">Edit Product</span>
            </dt>
            <dd>{rolesEntity.editProduct ? 'true' : 'false'}</dd>
            <dt>
              <span id="addCustomer">Add Customer</span>
            </dt>
            <dd>{rolesEntity.addCustomer ? 'true' : 'false'}</dd>
            <dt>
              <span id="deleteCustomer">Delete Customer</span>
            </dt>
            <dd>{rolesEntity.deleteCustomer ? 'true' : 'false'}</dd>
            <dt>
              <span id="editCustomer">Edit Customer</span>
            </dt>
            <dd>{rolesEntity.editCustomer ? 'true' : 'false'}</dd>
            <dt>
              <span id="addSupplier">Add Supplier</span>
            </dt>
            <dd>{rolesEntity.addSupplier ? 'true' : 'false'}</dd>
            <dt>
              <span id="deleteSupplier">Delete Supplier</span>
            </dt>
            <dd>{rolesEntity.deleteSupplier ? 'true' : 'false'}</dd>
            <dt>
              <span id="editSupplier">Edit Supplier</span>
            </dt>
            <dd>{rolesEntity.editSupplier ? 'true' : 'false'}</dd>
            <dt>
              <span id="raiseTask">Raise Task</span>
            </dt>
            <dd>{rolesEntity.raiseTask ? 'true' : 'false'}</dd>
            <dt>
              <span id="addProgressTrack">Add Progress Track</span>
            </dt>
            <dd>{rolesEntity.addProgressTrack ? 'true' : 'false'}</dd>
            <dt>
              <span id="deleteProgressTrack">Delete Progress Track</span>
            </dt>
            <dd>{rolesEntity.deleteProgressTrack ? 'true' : 'false'}</dd>
            <dt>
              <span id="editProgressTrack">Edit Progress Track</span>
            </dt>
            <dd>{rolesEntity.editProgressTrack ? 'true' : 'false'}</dd>
            <dt>
              <span id="viewProgressTrack">View Progress Track</span>
            </dt>
            <dd>{rolesEntity.viewProgressTrack ? 'true' : 'false'}</dd>
            <dt>
              <span id="addNonConformanceReason">Add Non Conformance Reason</span>
            </dt>
            <dd>{rolesEntity.addNonConformanceReason ? 'true' : 'false'}</dd>
            <dt>
              <span id="addRootCauses">Add Root Causes</span>
            </dt>
            <dd>{rolesEntity.addRootCauses ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/roles" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/roles/${rolesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ roles }: IRootState) => ({
  rolesEntity: roles.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesDetail);
