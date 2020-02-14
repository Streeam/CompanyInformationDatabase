import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './after-sale-expenses.reducer';

export interface IAfterSaleExpensesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AfterSaleExpensesDeleteDialog extends React.Component<IAfterSaleExpensesDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.afterSaleExpensesEntity);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { afterSaleExpensesEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody id="cidApp.afterSaleExpenses.delete.question">Are you sure you want to delete this AfterSaleExpenses?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; Cancel
          </Button>
          <Button id="jhi-confirm-delete-afterSaleExpenses" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ afterSaleExpenses }: IRootState) => ({
  afterSaleExpensesEntity: afterSaleExpenses.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AfterSaleExpensesDeleteDialog);
