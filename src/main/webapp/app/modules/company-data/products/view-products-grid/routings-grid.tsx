import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
// tslint:disable
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
// tslint:enable
import { deleteRoutingAndRefreshParent } from '../../../../entities/routing/routing.reducer';
import UpdateRoutingDialog from '../create-routings/create-routing-dialog-form';
import { IRootState } from 'app/shared/reducers';
import { IProduct } from 'app/shared/model/product.model';
import { IRouting } from 'app/shared/model/routing.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { deleteProductPermission, editProductPermission, addProductPermission } from 'app/shared/util/entity-utils';
import { Link } from 'react-router-dom';

interface IRoutingsProps extends StateProps, DispatchProps {
  selectedProduct: IProduct;
  currentRouting: IRouting;
  match: { url: string };
  setCurrentRouting: Function;
}

export const routingsGrid = (props: IRoutingsProps) => {
  const { selectedProduct, parentsRoutings, currentRouting, setCurrentRouting, currentEmployee, allProducts, match } = props;

  useEffect(() => {}, []);
  const [gridApi, setGridApi] = useState(null);
  const [routingDialogOpen, setRoutingDialogOpen] = useState<boolean>(false);
  const classes = useStyles(props);
  const columnHeaders = [
    { headerName: 'Id', field: 'id', width: 60, resizable: true, sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Part Number', field: 'partNumber', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Resource Name', field: 'resourceName', width: 250, resizable: true, sortable: true, filter: true },
    { headerName: 'Resource Type', field: 'resourceType', width: 200, resizable: true, sortable: true, filter: true },
    { headerName: 'Unit Run Time', field: 'unitRunTime', width: 150, resizable: true, sortable: true, filter: true }
  ];
  const extractRoutings = (): any[] => {
    return (
      !isArrayEmpty(parentsRoutings) &&
      parentsRoutings.map(item => ({
        id: item.id,
        partNumber: item.partNumber,
        resourceName: item.resourceName,
        resourceType: item.resourceType,
        unitRunTime: item.unitRunTime
      }))
    );
  };

  const onGridReady = params => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedRows();
      const selectedData: IRouting = selectedNodes[0];
      const routingEntity: IRouting =
        selectedData && !isArrayEmpty(parentsRoutings) && parentsRoutings.filter(routing => routing.id === selectedData.id)[0];
      setCurrentRouting(routingEntity);
    }
  };
  const handleAddRouting = () => {
    setCurrentRouting(null);
    setRoutingDialogOpen(true);
  };
  const handleEditRouting = () => {
    setRoutingDialogOpen(true);
  };
  const handleDeleteRouting = (entityId: number) => {
    props.deleteRoutingAndRefreshParent(entityId, selectedProduct.id);
    setCurrentRouting(null);
  };
  const handleDialogRoutingClose = () => {
    setRoutingDialogOpen(false);
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          <h5 style={{ textAlign: 'center', margin: '5px' }}>Routings</h5>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ textAlign: 'right' }}>
            {addProductPermission(currentEmployee) && !isArrayEmpty(allProducts) && (
              <Link to={`${match.url}/products/import-routings`}>
                <IconButton size="small" title={'Import routings from .csv file!'} aria-label="upload" className={classes.margin}>
                  <PublishOutlinedIcon />
                </IconButton>
              </Link>
            )}
            {currentRouting && (
              <Fragment>
                <IconButton
                  size="small"
                  title={'Delete Routing'}
                  // tslint:disable
                  onClick={() => handleDeleteRouting(currentRouting.id)}
                  // tslint:enable
                  aria-label="delete"
                  disabled={!deleteProductPermission(currentEmployee)}
                  className={classes.margin}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton
                  size="small"
                  title={'Edit Routing'}
                  disabled={!editProductPermission(currentEmployee)}
                  onClick={handleEditRouting}
                  aria-label="edit"
                  className={classes.margin}
                >
                  <EditIcon />
                </IconButton>
              </Fragment>
            )}
            {selectedProduct && (
              <IconButton
                size="small"
                title={'New Routing'}
                disabled={!addProductPermission(currentEmployee)}
                onClick={handleAddRouting}
                aria-label="add"
                className={classes.margin}
              >
                <AddIcon />
              </IconButton>
            )}
          </div>
        </Grid>
      </Grid>
      <div
        className="ag-theme-balham"
        style={{
          height: '20vh',
          width: 'auto',
          padding: '1px'
        }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          columnDefs={columnHeaders}
          rowData={extractRoutings()}
        />
      </div>
      <UpdateRoutingDialog
        currentRouting={currentRouting}
        routingDialogOpen={routingDialogOpen}
        handleClose={handleDialogRoutingClose}
        parentProduct={selectedProduct}
        setCurrentRouting={setCurrentRouting}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ routing, employee, product }: IRootState) => ({
  parentsRoutings: routing.parentsEntities,
  currentEmployee: employee.currentEmployeeEntity,
  allProducts: product.entities
});

const mapDispatchToProps = { deleteRoutingAndRefreshParent };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(routingsGrid);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 1),
      margin: theme.spacing(1, 1),
      width: '100%'
    },
    margin: {
      margin: theme.spacing(1)
    },
    expansionPanel: {
      margin: theme.spacing(1, 1),
      overflow: 'auto',
      maxHeight: '750px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    details: {
      alignItems: 'center'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      padding: '0 20px 0 0'
    }
  })
);
