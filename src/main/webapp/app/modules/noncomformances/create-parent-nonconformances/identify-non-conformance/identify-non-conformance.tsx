import React, { useState, useEffect, Fragment } from 'react';

import { AgGridReact } from 'ag-grid-react';
// tslint:disable
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// tslint:enable
import { Card } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { IProduct } from 'app/shared/model/product.model';
import { IRouting } from 'app/shared/model/routing.model';
import { getCurrentEmployeeEntity as getCurrentEmployee } from '../../../../entities/employee/employee.reducer';

interface INonconformanceProductProps extends StateProps, DispatchProps {
  productSeletedValidation: boolean;
  setProductSeletedValidation: Function;
  updateNonConformance: Function;
}

export const NonconformanceProduct = (props: INonconformanceProductProps) => {
  const {
    allProducts,
    loadingProducts,
    nonconformanceUpdating,
    productSeletedValidation,
    setProductSeletedValidation,
    incompleteNonConformanceDetail,
    updateNonConformance
  } = props;
  const isLoading = nonconformanceUpdating || loadingProducts;
  const [gridApi, setGridApi] = useState(null);
  const [productsToSave, setProducts] = useState<IProduct[]>(null);
  const [routingsToSave, setRoutings] = useState<IRouting[]>(null);
  const [quickFilterText, setQuickFilterText] = useState(null);

  useEffect(() => {}, []);
  const columnHeaders = [
    { headerName: 'Part Number', field: 'partNumber', width: 150, resizable: true, sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Part Description', field: 'partDescription', width: 800, resizable: true, sortable: true, filter: true }
  ];

  const onGridReady = params => {
    setGridApi(params.api);
    const gridColumnApi = params.columnApi;
    const allColumnIds = [];
    gridColumnApi.getAllColumns().forEach(column => {
      allColumnIds.push(column.colId);
    });
    gridColumnApi.autoSizeColumns(allColumnIds);
  };
  const onQuickFilterText = event => {
    setQuickFilterText(event.target.value);
  };
  const onSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedRows();
    const selectedData = selectedNodes[0];
    if (selectedData) {
      const selectedProduct: IProduct = allProducts.filter(item => item.partNumber === selectedData.partNumber)[0];
      const tempProductsToSave = [];
      const tempRoutingsToSave = [];
      if (tempProductsToSave.filter(values => values.partNumber === selectedProduct[0].partNumber).length === 0) {
        tempProductsToSave.push(selectedProduct);
        const selectedRoutingsNames: any[] = [];
        selectedProduct.routings.forEach(routing => {
          if (tempRoutingsToSave.filter(routingToSave => routingToSave.id === routing.id).length === 0) {
            if (
              tempRoutingsToSave.filter(
                routingToSave => routingToSave.partNumber === routing.partNumber && routingToSave.resourceName === routing.resourceName
              ).length === 0
            ) {
              tempRoutingsToSave.push(routing);
            }
          }
          selectedRoutingsNames.push(routing.resourceName);
        });
      }
      setRoutings(tempRoutingsToSave);
      setProducts(tempProductsToSave);
      updateNonConformance({
        products: tempProductsToSave ? tempProductsToSave : [],
        routings: tempRoutingsToSave ? tempRoutingsToSave : []
      });
      setProductSeletedValidation(false);
    }
  };

  const extractProducts = (): any[] => {
    return allProducts.map(item => ({ partNumber: item.partNumber, partDescription: item.partDescription }));
  };

  return (
    <Fragment>
      <Card style={{ backgroundColor: 'white', width: '100%', margin: '10px 0 10px 0', padding: '1rem' }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <h5 style={{ textAlign: 'left', padding: '10px 10px 10px 0' }}>Choose a Product or a Service</h5>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ textAlign: 'right' }}>
              <TextField
                id="outlined-search"
                onChange={onQuickFilterText}
                label="search..."
                margin="dense"
                type="search"
                variant="outlined"
              />
            </div>
          </Grid>
        </Grid>
        <div
          className="ag-theme-balham"
          style={{
            height: '350px',
            width: 'auto'
          }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            rowSelection="single"
            columnDefs={columnHeaders}
            onSelectionChanged={onSelectionChanged}
            quickFilterText={quickFilterText}
            rowData={extractProducts()}
          />
        </div>
        <h3 style={{ textAlign: 'center', margin: '10px 0 0 0' }}>
          {productsToSave && !isArrayEmpty(productsToSave)
            ? productsToSave[0].partNumber
            : !isEmpty(incompleteNonConformanceDetail) &&
              !isArrayEmpty(incompleteNonConformanceDetail.products) &&
              incompleteNonConformanceDetail.products[0].partNumber}
        </h3>
        {productSeletedValidation && <p style={{ color: 'red', textAlign: 'center' }}>Select a Product!!</p>}
      </Card>
    </Fragment>
  );
};

const mapStateToProps = ({ product, nonConformanceDetails, employee }: IRootState) => ({
  allProducts: product.entities,
  loadingProducts: product.loading,
  incompleteNonConformanceDetail: nonConformanceDetails.entity,
  nonconformanceUpdating: nonConformanceDetails.loading || nonConformanceDetails.updating,
  currentEmployee: employee.currentEmployeeEntity
});

const mapDispatchToProps = { getCurrentEmployee };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonconformanceProduct);
