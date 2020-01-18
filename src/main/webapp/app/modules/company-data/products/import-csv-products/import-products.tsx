import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import CSVReader from 'react-csv-reader';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import {
  createEntities as createProducts,
  updateEntity as updateProduct,
  getAllProductsFromDB
} from '../../../../entities/product/product.reducer';
import { getEntities as getCompanies } from '../../../../entities/company/company.reducer';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingModal from '../../../../shared/layout/custom-components/loading-modal/loading-modal';
import { removeDuplicates, isEmpty, executeFunctionInChuncks, isArrayEmpty } from '../../../../shared/util/general-utils';
import './import.css';
import { IProduct } from 'app/shared/model/product.model';
import { AgGridReact } from 'ag-grid-react';
import { Link, RouteComponentProps } from 'react-router-dom';

interface IProductProps extends StateProps, DispatchProps, RouteComponentProps {}

const products = (props: IProductProps) => {
  const { company, productUpdating, allProductsFromDB } = props;
  useEffect(() => {
    if (isEmpty(company) || allProductsFromDB.length === 0) {
      props.getCompanies();
    }
    if (isArrayEmpty(allProductsFromDB)) {
      props.getAllProductsFromDB();
    }
  }, []);
  const [loading, setLoading] = useState<boolean>(false);
  const product: IProduct = {
    id: null,
    partNumber: '',
    partDescription: '',
    releaseDate: moment(),
    productGroupCode: '',
    site: '',
    departament: '',
    methodType: '',
    methodStatus: '',
    prime: false,
    unitOfMeasure: '',
    supplierPartNumber: '',
    supplierPartDescription: '',
    curency: '',
    leadTime: 0,
    minQuantity: 0,
    latestUnitMaterialCost: 0,
    costInSupplierCurrency: 0,
    supplierPrice: 0,
    costInBaseCurrency: 0,
    scrapPercentage: 0,
    onHandStock: 0,
    standardComponentCost: 0,
    standardSubContractCost: 0,
    standardUnitMaterialCost: 0,
    standardSetCost: 0,
    standardRunCost: 0,
    standardLandedCost1: 0,
    standardLandedCost2: 0,
    standardLandedCost3: 0,
    comment1: '',
    comment2: '',
    comment3: '',
    reviewDate1: moment(),
    reviewDate2: moment(),
    reviewDate3: moment(),
    standardTotalCost: 0,
    minBarchSize: 0,
    obsolete: false,
    orderMultipler: 0,
    images: [],
    drawings: [],
    versions: [],
    boms: [],
    routings: [],
    suppliers: [],
    salesOrderId: null
  };

  const productsFromCSV: IProduct[] = [];
  const importProducts = (data: any[]) => {
    setLoading(true);
    data.forEach((element, index) => {
      if (index !== 0 && index < data.length - 1) {
        const newProduct = { ...product };
        newProduct.partNumber = element[0];
        newProduct.partDescription = element[1];
        newProduct.methodType = element[2];
        newProduct.unitOfMeasure = element[3];
        newProduct.site = element[4];
        newProduct.productGroupCode = element[5];
        newProduct.onHandStock = Number(element[6]);
        newProduct.standardUnitMaterialCost = Number(Number(element[8]).toFixed(2));
        newProduct.latestUnitMaterialCost = Number(Number(element[9]).toFixed(2));
        newProduct.minBarchSize = Number(element[10]);
        newProduct.orderMultipler = Math.floor(Number(element[11]));
        newProduct.obsolete = element[12] === '1';
        newProduct.supplierPartNumber = null;
        newProduct.supplierPartDescription = null;
        newProduct.routings = [];
        newProduct.boms = [];
        productsFromCSV.push(newProduct);
      }
    });
    const productsToInsert = [...allProductsFromDB, ...productsFromCSV];
    const uniqueProductsToInsert = removeDuplicates(productsToInsert, 'partNumber');
    const nonNullProductToInsert = uniqueProductsToInsert.filter(val => val.id === null);

    const productsToUpdate: IProduct[] = [];
    allProductsFromDB.forEach(item1 => {
      productsFromCSV.forEach(item2 => {
        if (item1.partNumber === item2.partNumber) {
          if (
            !(
              item1.partDescription === item2.partDescription &&
              item1.methodType === item2.methodType &&
              item1.site === item2.site &&
              item1.productGroupCode === item2.productGroupCode &&
              item1.onHandStock === item2.onHandStock &&
              item1.standardUnitMaterialCost === Number(item2.standardUnitMaterialCost.toFixed(2)) &&
              item1.latestUnitMaterialCost === Number(item2.latestUnitMaterialCost.toFixed(2)) &&
              item1.minBarchSize === item2.minBarchSize &&
              item1.orderMultipler === item2.orderMultipler &&
              item1.obsolete === item2.obsolete
            )
          ) {
            /*console.log(item1.partNumber + ' = ' + item2.partNumber);
            console.log(item1.partDescription + ' = ' + item2.partDescription);
            console.log(item1.methodType + ' = ' + item2.methodType);
            console.log(item1.site + ' = ' + item2.site);
            console.log(item1.productGroupCode + ' = ' + item2.productGroupCode);
            console.log(item1.onHandStock + ' = ' + item2.onHandStock);
            console.log(item1.standardUnitMaterialCost + ' = ' + item2.standardUnitMaterialCost);
            console.log(item1.latestUnitMaterialCost + ' = ' + item2.latestUnitMaterialCost);
            console.log(item1.minBarchSize + ' = ' + item2.minBarchSize);
            console.log(item1.orderMultipler + ' = ' + item2.orderMultipler);
            console.log(item1.obsolete + ' = ' + item2.obsolete); */
            productsToUpdate.push({ ...item2, id: item1.id });
          }
        }
      });
    });
    if (!isArrayEmpty(productsToUpdate)) {
      productsToUpdate.forEach(item => {
        new Promise((resolve, reject) => resolve(props.updateProduct(item))).then(() => {
          props.getAllProductsFromDB();
        });
      });
    }
    /*     console.log('Uploaded Products - ' + productsFromCSV.length);
    console.log('Database Products - ' + allProductsFromDB.length);
    console.log('Products to insert - ' + productsToInsert.length);
    console.log('Unique Products to insert - ' + uniqueProductsToInsert.length);
    console.log('Unique Non Null Products to insert - ' + nonNullProductToInsert.length);
    console.log('Products to update - ' + productsToUpdate.length); */
    if (!isArrayEmpty(nonNullProductToInsert)) {
      executeFunctionInChuncks(nonNullProductToInsert, props.createProducts, 200).then(() => {
        new Promise((resolve, reject) => resolve(props.getAllProductsFromDB())).then(() => {
          setLoading(false);
        });
      });
    }
    setLoading(false);
  };
  const columnHeaders = [
    { headerName: 'Id', field: 'id', sort: 'desc', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Part Number', field: 'partNumber', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Part Description', field: 'partDescription', width: 250, resizable: true, sortable: true, filter: true },
    { headerName: 'Method Type', field: 'methodType', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'UOM', field: 'unitOfMeasure', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Location', field: 'site', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Product Grup Code', field: 'productGrupCode', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'In Stock', field: 'stock', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Latest Unit Material Cost', field: 'latestUnitMaterialCost', resizable: true, sortable: true, filter: true },
    { headerName: 'Standard Unit Material Cost', field: 'standardUnitMaterialCost', resizable: true, sortable: true, filter: true },
    { headerName: 'Min Batch Size', field: 'minBatchSize', resizable: true, sortable: true, filter: true },
    { headerName: 'Order Multiply', field: 'orderMultiply', resizable: true, sortable: true, filter: true },
    { headerName: 'Obsolete', field: 'obsolete', resizable: true, sortable: true, filter: true }
  ];
  const extractProducts = (): any[] => {
    return allProductsFromDB.map(item => ({
      id: item.id,
      partNumber: item.partNumber,
      partDescription: item.partDescription,
      methodType: item.methodType,
      unitOfMeasure: item.unitOfMeasure,
      site: item.site,
      productGrupCode: item.productGroupCode,
      stock: item.onHandStock,
      latestUnitMaterialCost: item.latestUnitMaterialCost,
      standardUnitMaterialCost: item.standardUnitMaterialCost,
      minBatchSize: item.minBarchSize,
      orderMultiply: item.orderMultipler,
      obsolete: item.obsolete
    }));
  };

  return productUpdating || loading ? (
    <LoadingModal />
  ) : (
    <Fragment>
      <div className="container">
        <CSVReader cssClass="react-csv-input" label="Import Products" onFileLoaded={importProducts} />
      </div>
      <Fragment>
        <h5>Upload products from a CSV file with the following columns:</h5>
        <div>
          <ol>
            <li>
              <strong>Part Number</strong> : Text/Number {`(`}Required and Unique{`)`}
            </li>
            <li>
              <strong>Description</strong> : Text {`(`}Required{`)`}
            </li>
            <li>
              <strong>Method Type</strong> : Text {`(`}Required{`)`}
            </li>
            <li>
              <strong>Unit of Measure</strong> : Text
            </li>
            <li>
              <strong>Location</strong> : Text
            </li>
            <li>
              <strong>Product Group Code</strong> : Text {`(`}Required{`)`}
            </li>
            <li>
              <strong>Stock</strong> : Decimal Number Greater Then Zero
            </li>
            <li>
              <strong>Standard Cost</strong> : Decimal Number Greater Then Zero
            </li>
            <li>
              <strong>Latest Cost</strong> : Decimal Number Greater Then Zero
            </li>
            <li>
              <strong>Minimum Batch Size</strong> : Decimal Number Greater Then One
            </li>
            <li>
              <strong>Order Multiply</strong> : Decimal Number Greater Then Zero
            </li>
            <li>
              <strong>Obsolete</strong> : Text {`(`}True or False{`)`}
            </li>
          </ol>
        </div>
      </Fragment>
      <div
        className="ag-theme-balham"
        style={{
          height: '35vh',
          width: 'auto',
          padding: '1px'
        }}
      >
        <AgGridReact columnDefs={columnHeaders} rowData={extractProducts()} />
      </div>
      <Button size="sm" tag={Link} id="cancel-save" to={'/company-data'} replace color="secondary">
        <FontAwesomeIcon icon="arrow-left" />
        &nbsp;
        <span className="d-none d-md-inline">Back</span>
      </Button>
    </Fragment>
  );
};
const mapStateToProps = ({ company, product, routing, bom }: IRootState) => ({
  company: company.entities[0],
  productUpdating: (product.updating || product.loading) && !product.updateSuccess,
  allProductsFromDB: product.entities,
  allRoutings: routing.entities,
  allBoms: bom.entities,
  routingUpdating: (routing.updating || routing.loading) && !routing.updateSuccess,
  bomUpdating: (bom.updating || bom.loading) && !bom.updateSuccess
});

const mapDispatchToProps = { createProducts, getCompanies, getAllProductsFromDB, updateProduct };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(products));
