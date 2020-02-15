import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
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
import { deleteBomAndRefreshParent } from '../../../../entities/bom/bom.reducer';
import UpdateBomDialog from '../create-boms/create-bom-dialog-form';
import { IRootState } from 'app/shared/reducers';
import { IProduct } from 'app/shared/model/product.model';
import { IBom } from 'app/shared/model/bom.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { deleteProductPermission, editProductPermission, addProductPermission } from 'app/shared/util/entity-utils';

interface IBomsProps extends StateProps, DispatchProps {
  selectedProduct: IProduct;
  selectProductAfterUpdate: Function;
  currentBom: IBom;
  setCurrentBom: Function;
  match: { url: string };
}
interface IBOMsToSave {
  id: number;
  childPartNumber: string;
  childPartDescription: string;
  quantity: number;
}

export const bomsGrid = (props: IBomsProps) => {
  const { selectedProduct, allProducts, parentsBoms, selectProductAfterUpdate, currentBom, setCurrentBom, currentEmployee, match, allBoms } = props;
  useEffect(() => {}, []);
  const columnHeaders = [
    { headerName: 'Id', field: 'id', width: 80, resizable: true, sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Child Part Number', field: 'childPartNumber', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Description', field: 'childPartDescription', width: 500, resizable: true, sortable: true, filter: true },
    { headerName: 'Quantity', field: 'quantity', width: 100, resizable: true, sortable: true, filter: true }
  ];
  const [gridApi, setGridApi] = useState(null);
  const [bomDialogOpen, setBomDialogOpen] = useState<boolean>(false);
  const classes = useStyles(props);

  const extractBoms = (): IBOMsToSave[] => {
    const bomToSave: IBOMsToSave[] =
      !isArrayEmpty(parentsBoms) &&
      parentsBoms.map(item => {
        const product: IProduct | undefined = allProducts.filter(productEntity => item.childPartNumber === productEntity.partNumber)[0];
        const description: string = product ? product.partDescription : '';
        return {
          id: item.id,
          childPartNumber: item.childPartNumber,
          childPartDescription: description,
          quantity: item.quantity
        };
      });
    return bomToSave;
  };

  const onGridReady = params => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedRows();
      const selectedData: IBom = selectedNodes[0];
      const bomEntity: IBom = selectedData && !isArrayEmpty(parentsBoms) && parentsBoms.filter(bom => bom.id === selectedData.id)[0];
      setCurrentBom(bomEntity);
    }
  };

  const handleAddBom = () => {
    setCurrentBom(null);
    setBomDialogOpen(true);
  };

  const handleEditBom = () => {
    setBomDialogOpen(true);
  };

  const handleDeleteBom = (entityId: number) => {
    props.deleteBomAndRefreshParent(entityId, selectedProduct, selectProductAfterUpdate);
    setCurrentBom(null);
  };

  const handleDialogBomClose = () => {
    setBomDialogOpen(false);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          <h5 style={{ textAlign: 'center', margin: '5px' }}>Subcomponents</h5>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ textAlign: 'right' }}>
            {addProductPermission(currentEmployee) && !isArrayEmpty(allProducts) && isArrayEmpty(allBoms) && (
              <Link to={`${match.url}/products/import-boms`}>
                <IconButton size="small" title={'Import subcomponents from .csv file!'} aria-label="upload" className={classes.margin}>
                  <PublishOutlinedIcon />
                </IconButton>
              </Link>
            )}
            {currentBom && (
              <Fragment>
                <IconButton
                  size="small"
                  title={'Delete Bom'}
                  // tslint:disable-next-line
                  onClick={() => handleDeleteBom(currentBom.id)}
                  aria-label="delete"
                  className={classes.margin}
                  disabled={!deleteProductPermission(currentEmployee)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton
                  size="small"
                  title={'Edit Bom'}
                  onClick={handleEditBom}
                  aria-label="edit"
                  disabled={!editProductPermission(currentEmployee)}
                  className={classes.margin}
                >
                  <EditIcon />
                </IconButton>
              </Fragment>
            )}
            {
              selectedProduct &&
              <IconButton
              size="small"
              title={'New Bom'}
              disabled={!addProductPermission(currentEmployee)}
              onClick={handleAddBom}
              aria-label="add"
              className={classes.margin}
              >
              <AddIcon />
            </IconButton>
            }
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
          rowData={extractBoms()}
        />
      </div>
      <UpdateBomDialog
        currentBom={currentBom}
        bomDialogOpen={bomDialogOpen}
        handleClose={handleDialogBomClose}
        parentProduct={selectedProduct}
        setCurrentBom={setCurrentBom}
      />
    </Fragment>
  );
};
const mapStateToProps = ({ product, bom, employee }: IRootState) => ({
  allProducts: product.entities,
  parentsBoms: bom.entities,
  allBoms: bom.entities,
  currentEmployee: employee.currentEmployeeEntity
});

const mapDispatchToProps = { deleteBomAndRefreshParent };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(bomsGrid);
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
