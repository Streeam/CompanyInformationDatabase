import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// tslint:disable
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AddIcon from '@material-ui/icons/Add';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import {
  getAllProductsFromDB,
  deleteEntity as deleteProduct,
  getEntity as getSelectedProduct
} from '../../../../entities/product/product.reducer';
import { getParentsBoms } from '../../../../entities/bom/bom.reducer';
import { getParentsRoutings } from '../../../../entities/routing/routing.reducer';
import BomGrid from './boms-grid';
import RoutingGrid from './routings-grid';
import UpdateProductDialog from '../create-products/create-product-dialog-form';
import LoadingModal from 'app/shared/layout/custom-components/loading-modal/loading-modal';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { IProduct } from 'app/shared/model/product.model';
import moment from 'moment';
import { IBom } from 'app/shared/model/bom.model';
import { IRouting } from 'app/shared/model/routing.model';
import { addProductPermission, deleteProductPermission, editProductPermission } from 'app/shared/util/entity-utils';

interface IProductsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const productsGrid = (props: IProductsProps) => {
  const { productUpdating, allProducts, currentEmployee, match } = props;
  useEffect(() => {
    if (isArrayEmpty(allProducts)) {
      props.getAllProductsFromDB();
    }
  }, []);

  const columnHeaders = [
    { headerName: 'Id', field: 'id', sort: 'desc', width: 100, resizable: true, sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Part Number', field: 'partNumber', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Part Description', field: 'partDescription', width: 250, resizable: true, sortable: true, filter: true },
    { headerName: 'Release Date', field: 'releaseDate', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Method Type', field: 'methodType', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'UOM', field: 'unitOfMeasure', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Latest Unit Material Cost', field: 'latestUnitMaterialCost', resizable: true, sortable: true, filter: true },
    { headerName: 'Standard Unit Material Cost', field: 'standardUnitMaterialCost', resizable: true, sortable: true, filter: true },
    { headerName: 'Obsolete', field: 'obsolete', resizable: true, sortable: true, filter: true }
  ];

  const extractProducts = (): any[] => {
    return allProducts.map(item => ({
      id: item.id,
      partNumber: item.partNumber,
      partDescription: item.partDescription,
      releaseDate: moment(item.releaseDate).format('DD MM YYYY'),
      methodType: item.methodType,
      unitOfMeasure: item.unitOfMeasure,
      latestUnitMaterialCost: item.latestUnitMaterialCost,
      standardUnitMaterialCost: item.standardUnitMaterialCost,
      obsolete: item.obsolete
    }));
  };

  const [gridApi, setGridApi] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(null);
  const [currentProduct, setCurrentProduct] = useState<IProduct>(null);
  const [currentBom, setCurrentBom] = useState<IBom>(null);
  const [currentRouting, setCurrentRouting] = useState<IRouting>(null);
  const [routingDialogOpen, setRoutingDialogOpen] = useState<boolean>(false);
  const [productDialogOpen, setProductDialogOpen] = useState<boolean>(false);
  const classes = useStyles(props);
  const onGridReady = params => {
    setGridApi(params.api);
    const gridColumnApi = params.columnApi;
    const allColumnIds = [];
    gridColumnApi.getAllColumns().forEach(column => {
      allColumnIds.push(column.colId);
    });
    gridColumnApi.autoSizeColumns(allColumnIds);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedRows();
      const selectedData: IProduct = selectedNodes[0];
      const productEntity: IProduct = selectedData && allProducts.filter(product => product.id === selectedData.id)[0];
      setSelectedProduct(productEntity);
      if (productEntity) {
        props.getParentsBoms(productEntity.id);
        props.getParentsRoutings(productEntity.id);
      }
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setProductDialogOpen(true);
  };

  const handleEditProduct = () => {
    setCurrentProduct(selectedProduct);
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = (entityId: number) => {
    props.deleteProduct(entityId);
    setCurrentBom(null);
    setCurrentRouting(null);
  };
  const selectProductAfterUpdate = (product: IProduct) => {
    gridApi.forEachNode(
      (node: { data: { id: number }; setSelected: (arg0: boolean) => any }) => node.data.id === product.id && node.setSelected(true)
    );
  };
  const handleDialogProductClose = () => {
    setProductDialogOpen(false);
  };
  return productUpdating ? (
    <LoadingModal />
  ) : (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          <h5 style={{ textAlign: 'center' }}>
            <strong>Products</strong>
          </h5>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ textAlign: 'right' }}>
            {selectedProduct && (
              <Fragment>
                <IconButton
                  size="small"
                  title={'Delete Product'}
                  disabled={!deleteProductPermission(currentEmployee)}
                  // tslint:disable-next-line
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                  aria-label="delete"
                  className={classes.margin}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton
                  size="small"
                  title={'Edit Product'}
                  onClick={handleEditProduct}
                  disabled={!editProductPermission(currentEmployee)}
                  aria-label="edit"
                  className={classes.margin}
                >
                  <EditIcon />
                </IconButton>
              </Fragment>
            )}
            <Fragment>
              {addProductPermission(currentEmployee) && (
                <Link to={`${match.url}/products/import-products`}>
                  <IconButton size="small" title={'Import products from .csv file!'} aria-label="upload" className={classes.margin}>
                    <PublishOutlinedIcon />
                  </IconButton>
                </Link>
              )}
              <IconButton
                size="small"
                title={'New Product'}
                onClick={handleAddProduct}
                disabled={!addProductPermission(currentEmployee)}
                aria-label="add"
                className={classes.margin}
              >
                <AddIcon />
              </IconButton>
            </Fragment>
          </div>
        </Grid>
      </Grid>
      <div
        className="ag-theme-balham"
        style={{
          height: '40vh',
          width: 'auto',
          padding: '1px'
        }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          columnDefs={columnHeaders}
          rowData={extractProducts()}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <BomGrid
            match={match}
            selectedProduct={selectedProduct}
            currentBom={currentBom}
            setCurrentBom={setCurrentBom}
            selectProductAfterUpdate={selectProductAfterUpdate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RoutingGrid
            match={match}
            selectedProduct={selectedProduct}
            currentRouting={currentRouting}
            setCurrentRouting={setCurrentRouting}
          />
        </Grid>
      </Grid>
      <UpdateProductDialog
        currentProduct={currentProduct}
        productDialogOpen={productDialogOpen}
        handleClose={handleDialogProductClose}
        selectProductAfterUpdate={selectProductAfterUpdate}
      />
      <br />
      <Button size="sm" tag={Link} id="cancel-save" to={'/company/company-status'} replace color="secondary">
        <FontAwesomeIcon icon="arrow-left" />
        &nbsp;
        <span className="d-none d-md-inline">Back</span>
      </Button>
    </Fragment>
  );
};

const mapStateToProps = ({ product, employee }: IRootState) => ({
  allProducts: product.entities,
  productUpdating: product.updating || product.loading,
  currentEmployee: employee.currentEmployeeEntity
});

const mapDispatchToProps = { getAllProductsFromDB, deleteProduct, getSelectedProduct, getParentsBoms, getParentsRoutings };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productsGrid);

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
