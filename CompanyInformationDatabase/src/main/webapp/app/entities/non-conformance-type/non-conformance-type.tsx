import React, { useEffect, Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, createEntity, deleteEntity } from './non-conformance-type.reducer';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface INonConformanceTypeProps extends StateProps, DispatchProps, RouteComponentProps {}

export const NonConformanceType = (props: INonConformanceTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);
  const handleClose = () => {
    props.history.goBack();
  };
  const { rejectionReasons } = props;
  const columns = [
    { title: 'Code', field: 'rejectionCode' },
    { title: 'Rejection Description', field: 'rejectionTitle', initialEditValue: '' }
  ];
  return (
    <Fragment>
      <MaterialTable
        columns={columns}
        data={[...rejectionReasons]}
        title="Non-conformance/Defect Classification"
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              props.createEntity(newData);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              props.updateEntity(newData);
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              props.deleteEntity(oldData.id);
              resolve();
            })
        }}
      />
      <br />
      <Button size="sm" id="cancel-save" onClick={handleClose} color="secondary">
        <FontAwesomeIcon icon="arrow-left" />
        &nbsp;
        <span className="d-none d-md-inline">Back</span>
      </Button>
    </Fragment>
  );
};

const mapStateToProps = ({ nonConformanceType }: IRootState) => ({
  rejectionReasons: nonConformanceType.entities
});

const mapDispatchToProps = {
  getEntities,
  createEntity,
  updateEntity,
  deleteEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonConformanceType);
