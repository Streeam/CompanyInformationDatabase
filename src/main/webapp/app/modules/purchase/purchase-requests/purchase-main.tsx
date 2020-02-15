import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
// tslint:disable
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getAllProductBoms as getProductsBoms, getAllProductsFromDB } from '../../../entities/product/product.reducer';
import { updateEntity as updatePurchaseParent } from '../../../entities/purchase-request-parent/purchase-request-parent.reducer';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { IProduct } from 'app/shared/model/product.model';
import PurchaseCheckout from './purchase-checkout';
import { IPurchaseRequestParent } from 'app/shared/model/purchase-request-parent.model';
import { IPurchaseRequestChild } from 'app/shared/model/purchase-request-child.model';
import { PurchaseRequestStatus } from 'app/shared/model/enumerations/purchase-request-status.model';

interface IPurchaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const purchaseMain = (props: IPurchaseProps) => {
  const { allProducts } = props;
  const [gridApi, setGridApi] = useState(null);
  const [quickFilterText, setQuickFilterText] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(null);
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [duplicatedProduct, setDuplicatedProduct] = useState(false);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (isArrayEmpty(allProducts)) {
      props.getAllProductsFromDB();
    }
  }, []);
  const handleCloseDuplicatedProductSnackbar = () => {
    setDuplicatedProduct(false);
  };
  const columnHeaders = [
    { headerName: 'Id', field: 'id', sort: 'desc', width: 100, resizable: true, sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Part Number', field: 'partNumber', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Part Description', field: 'partDescription', width: 400, resizable: true, sortable: true, filter: true },
    { headerName: 'Release Date', field: 'releaseDate', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Method Type', field: 'methodType', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'UOM', field: 'unitOfMeasure', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Latest Unit Material Cost', field: 'latestUnitMaterialCost', resizable: true, sortable: true, filter: true }
  ];

  const extractProducts = (): any[] => {
    return allProducts
    .filter(value => value.methodType === 'Purchased')
    .map(item => ({
      id: item.id,
      partNumber: item.partNumber,
      partDescription: item.partDescription,
      releaseDate: moment(item.releaseDate).format('DD MM YYYY'),
      methodType: item.methodType,
      unitOfMeasure: item.unitOfMeasure,
      latestUnitMaterialCost: item.latestUnitMaterialCost
    }));
  };

  const handleAddProduct = () => {
    const today = new Date();
    const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toLocaleDateString('en-GB');
    if (selectedProduct) {
      if (checkoutProducts.find(item => item.partNumber === selectedProduct.partNumber) === undefined) {
        setCheckoutProducts([...checkoutProducts, {
          partNumber: selectedProduct.partNumber,
          partDescription: selectedProduct.partDescription,
          reference: '',
          requireDate: nextweek,
          quantity: 0
        }]);
      } else {
        setDuplicatedProduct(true);
      }
    } else {
      setCheckoutProducts([...checkoutProducts, {
        partNumber: 'Type in an item...',
        reference: 'Type in a reference (eg. Sales Order)',
        requireDate: nextweek,
        quantity: 0
      }]);
    }
  };

  const handleDeleteProduct = (entityId: number) => {
    // props.deleteProduct(entityId);
  };
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  const onGridReady = params => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedRows();
      const selectedData: IProduct = selectedNodes[0];
      const productEntity: IProduct = selectedData && allProducts.filter(product => product.id === selectedData.id)[0];
      setSelectedProduct(productEntity);
    }
};

  const onQuickFilterText = event => {
    setQuickFilterText(event.target.value);
  };

  return (
    <Fragment>
      <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
       <Grid container spacing={0}>
       <Grid item xs={12} sm={12}>
          <h5 style={{ textAlign: 'center' }}>Non-Conformance Logs</h5>
        </Grid>
        <Grid item xs={12} sm={12}>
          {allProducts && (
            <TextField
            fullWidth
              id="outlined-search"
              onChange={onQuickFilterText}
              label="search..."
              margin="dense"
              type="search"
              variant="outlined"
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
            <div
        className="ag-theme-balham"
        style={{
          height: '35vh',
          width: 'auto',
          padding: '1px'
        }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          /*rowSelection="multiple"*/
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          columnDefs={columnHeaders}
          quickFilterText={quickFilterText}
          rowData={extractProducts()}
        />
      </div>
      </Grid>
        </Grid>
        <br/>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={8} />
        <Grid item xs={12} sm={4}>
          <div style={{ textAlign: 'right' }}>
              <Fragment>
                <IconButton
                  size="small"
                  title={'Delete Product'}
                  // tslint:disable-next-line
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                  aria-label="delete"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              <IconButton
                size="small"
                title={'Add Product'}
                onClick={handleAddProduct}
                aria-label="add"
              >
                <ArrowDownwardIcon />
              </IconButton>
              </Fragment>
          </div>
        </Grid>
      </Grid>
      <Fragment>
        <PurchaseCheckout checkoutProducts={checkoutProducts} setCheckoutProducts={setCheckoutProducts}/>
      </Fragment>
        </Card>
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`RootCause-unfinished-snackbar`}
        open={duplicatedProduct}
        onClose={handleCloseDuplicatedProductSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">Item is already in your list!</span>}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ product }: IRootState) => ({
  allProducts: product.entities
});

const mapDispatchToProps = {
  getAllProductsFromDB,
  updatePurchaseParent
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(purchaseMain);
