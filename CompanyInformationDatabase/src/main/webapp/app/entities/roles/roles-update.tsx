import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './roles.reducer';
import { IRoles } from 'app/shared/model/roles.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRolesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRolesUpdateState {
  isNew: boolean;
}

export class RolesUpdate extends React.Component<IRolesUpdateProps, IRolesUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { rolesEntity } = this.props;
      const entity = {
        ...rolesEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/roles');
  };

  render() {
    const { rolesEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.roles.home.createOrEditLabel">Create or edit a Roles</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : rolesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="roles-id">ID</Label>
                    <AvInput id="roles-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="raiseNonconformaceLabel" check>
                    <AvInput id="roles-raiseNonconformace" type="checkbox" className="form-control" name="raiseNonconformace" />
                    Raise Nonconformace
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="viewNonconformanceLabel" check>
                    <AvInput id="roles-viewNonconformance" type="checkbox" className="form-control" name="viewNonconformance" />
                    View Nonconformance
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editNonconformanceLabel" check>
                    <AvInput id="roles-editNonconformance" type="checkbox" className="form-control" name="editNonconformance" />
                    Edit Nonconformance
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="viewNonconformanceTasksLabel" check>
                    <AvInput id="roles-viewNonconformanceTasks" type="checkbox" className="form-control" name="viewNonconformanceTasks" />
                    View Nonconformance Tasks
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editNonconformanceTasksLabel" check>
                    <AvInput id="roles-editNonconformanceTasks" type="checkbox" className="form-control" name="editNonconformanceTasks" />
                    Edit Nonconformance Tasks
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="deleteNonconformanceTasksLabel" check>
                    <AvInput
                      id="roles-deleteNonconformanceTasks"
                      type="checkbox"
                      className="form-control"
                      name="deleteNonconformanceTasks"
                    />
                    Delete Nonconformance Tasks
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="deleteNonconformanceLabel" check>
                    <AvInput id="roles-deleteNonconformance" type="checkbox" className="form-control" name="deleteNonconformance" />
                    Delete Nonconformance
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="raiseChangeRequestLabel" check>
                    <AvInput id="roles-raiseChangeRequest" type="checkbox" className="form-control" name="raiseChangeRequest" />
                    Raise Change Request
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="viewCostAnalysesLabel" check>
                    <AvInput id="roles-viewCostAnalyses" type="checkbox" className="form-control" name="viewCostAnalyses" />
                    View Cost Analyses
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editCostAnalysesLabel" check>
                    <AvInput id="roles-editCostAnalyses" type="checkbox" className="form-control" name="editCostAnalyses" />
                    Edit Cost Analyses
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="viewRequestSubmitedLabel" check>
                    <AvInput id="roles-viewRequestSubmited" type="checkbox" className="form-control" name="viewRequestSubmited" />
                    View Request Submited
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editRequestSubmitedLabel" check>
                    <AvInput id="roles-editRequestSubmited" type="checkbox" className="form-control" name="editRequestSubmited" />
                    Edit Request Submited
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="approveRequestSubmitedLabel" check>
                    <AvInput id="roles-approveRequestSubmited" type="checkbox" className="form-control" name="approveRequestSubmited" />
                    Approve Request Submited
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="viewPendingSubmitedLabel" check>
                    <AvInput id="roles-viewPendingSubmited" type="checkbox" className="form-control" name="viewPendingSubmited" />
                    View Pending Submited
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editPendingSubmitedLabel" check>
                    <AvInput id="roles-editPendingSubmited" type="checkbox" className="form-control" name="editPendingSubmited" />
                    Edit Pending Submited
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="approvePendingSubmitedLabel" check>
                    <AvInput id="roles-approvePendingSubmited" type="checkbox" className="form-control" name="approvePendingSubmited" />
                    Approve Pending Submited
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="viewRejectedLabel" check>
                    <AvInput id="roles-viewRejected" type="checkbox" className="form-control" name="viewRejected" />
                    View Rejected
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editRejectedLabel" check>
                    <AvInput id="roles-editRejected" type="checkbox" className="form-control" name="editRejected" />
                    Edit Rejected
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editPurchaseRequestLabel" check>
                    <AvInput id="roles-editPurchaseRequest" type="checkbox" className="form-control" name="editPurchaseRequest" />
                    Edit Purchase Request
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="deletePurchaseRequestLabel" check>
                    <AvInput id="roles-deletePurchaseRequest" type="checkbox" className="form-control" name="deletePurchaseRequest" />
                    Delete Purchase Request
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editProductStockLabel" check>
                    <AvInput id="roles-editProductStock" type="checkbox" className="form-control" name="editProductStock" />
                    Edit Product Stock
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="addProductLabel" check>
                    <AvInput id="roles-addProduct" type="checkbox" className="form-control" name="addProduct" />
                    Add Product
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="deleteProductLabel" check>
                    <AvInput id="roles-deleteProduct" type="checkbox" className="form-control" name="deleteProduct" />
                    Delete Product
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editProductLabel" check>
                    <AvInput id="roles-editProduct" type="checkbox" className="form-control" name="editProduct" />
                    Edit Product
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="addCustomerLabel" check>
                    <AvInput id="roles-addCustomer" type="checkbox" className="form-control" name="addCustomer" />
                    Add Customer
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="deleteCustomerLabel" check>
                    <AvInput id="roles-deleteCustomer" type="checkbox" className="form-control" name="deleteCustomer" />
                    Delete Customer
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editCustomerLabel" check>
                    <AvInput id="roles-editCustomer" type="checkbox" className="form-control" name="editCustomer" />
                    Edit Customer
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="addSupplierLabel" check>
                    <AvInput id="roles-addSupplier" type="checkbox" className="form-control" name="addSupplier" />
                    Add Supplier
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="deleteSupplierLabel" check>
                    <AvInput id="roles-deleteSupplier" type="checkbox" className="form-control" name="deleteSupplier" />
                    Delete Supplier
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editSupplierLabel" check>
                    <AvInput id="roles-editSupplier" type="checkbox" className="form-control" name="editSupplier" />
                    Edit Supplier
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="raiseTaskLabel" check>
                    <AvInput id="roles-raiseTask" type="checkbox" className="form-control" name="raiseTask" />
                    Raise Task
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="addProgressTrackLabel" check>
                    <AvInput id="roles-addProgressTrack" type="checkbox" className="form-control" name="addProgressTrack" />
                    Add Progress Track
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="deleteProgressTrackLabel" check>
                    <AvInput id="roles-deleteProgressTrack" type="checkbox" className="form-control" name="deleteProgressTrack" />
                    Delete Progress Track
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editProgressTrackLabel" check>
                    <AvInput id="roles-editProgressTrack" type="checkbox" className="form-control" name="editProgressTrack" />
                    Edit Progress Track
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="viewProgressTrackLabel" check>
                    <AvInput id="roles-viewProgressTrack" type="checkbox" className="form-control" name="viewProgressTrack" />
                    View Progress Track
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="addNonConformanceReasonLabel" check>
                    <AvInput id="roles-addNonConformanceReason" type="checkbox" className="form-control" name="addNonConformanceReason" />
                    Add Non Conformance Reason
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="addRootCausesLabel" check>
                    <AvInput id="roles-addRootCauses" type="checkbox" className="form-control" name="addRootCauses" />
                    Add Root Causes
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/roles" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  rolesEntity: storeState.roles.entity,
  loading: storeState.roles.loading,
  updating: storeState.roles.updating,
  updateSuccess: storeState.roles.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesUpdate);
