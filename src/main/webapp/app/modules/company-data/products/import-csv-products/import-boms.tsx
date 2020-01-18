import React, { useState, useEffect, Fragment } from 'react';
import CSVReader from 'react-csv-reader';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import {
  createEntities as createProducts,
  updateEntities as updateProducts,
  getAllProductsFromDB
} from '../../../../entities/product/product.reducer';
import { getEntities as getCompanies } from '../../../../entities/company/company.reducer';
import {
  createEntities as createBoms,
  updateEntity as updateBom,
  getAllEntities as getAllBoms,
  reset as resetBom
} from '../../../../entities/bom/bom.reducer';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingModal from '../../../../shared/layout/custom-components/loading-modal/loading-modal';
import { removeDuplicates, isEmpty, executeFunctionInChuncks, isArrayEmpty } from '../../../../shared/util/general-utils';
import { AgGridReact } from 'ag-grid-react';
import './import.css';
import { IProduct } from 'app/shared/model/product.model';
import { IBom } from 'app/shared/model/bom.model';
import { Link } from 'react-router-dom';

interface IBomsProps extends StateProps, DispatchProps {}

const importSubcomponents = (props: IBomsProps) => {
  const { productUpdating, allProductsFromDB, allBoms, bomUpdating } = props;

  useEffect(() => {
    props.getAllBoms();
    if (isArrayEmpty(allProductsFromDB)) {
      props.getAllProductsFromDB();
    }
    return () => props.resetBom();
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const bom: IBom = {
    id: null,
    uniqueIdentifier: '',
    quantity: 0,
    sequenceNumber: 0,
    partNumber: '',
    childPartNumber: '',
    products: []
  };

  const bomsFromCSV: IBom[] = [];

  const importBoms = (data: any[]) => {
    setLoading(true);

    data.forEach((element, index) => {
      if (index !== 0 && index < data.length - 1) {
        const newBom = { ...bom };
        newBom.uniqueIdentifier = element[0];
        newBom.partNumber = element[1];
        newBom.childPartNumber = element[2];
        newBom.sequenceNumber = Number(element[3]);
        newBom.quantity = Number(element[4]);
        bomsFromCSV.push(newBom);
      }
    });

    const bomsToInsert = [...allBoms, ...bomsFromCSV];
    const uniqueBomsToInsert = removeDuplicates(bomsToInsert, 'uniqueIdentifier');
    const nonNullBomsToInsert = uniqueBomsToInsert.filter(val => val.id === null);
    const bomsToUpdate: IBom[] = [];

    allBoms.forEach(item1 => {
      bomsFromCSV.forEach(item2 => {
        if (item1.uniqueIdentifier === item2.uniqueIdentifier) {
          if (
            item1.partNumber === item2.partNumber &&
            item1.childPartNumber === item2.childPartNumber &&
            !(item1.sequenceNumber === item2.sequenceNumber && item1.quantity === item2.quantity)
          ) {
            bomsToUpdate.push({ ...item2, id: item1.id });
          }
        }
      });
    });

    if (!isArrayEmpty(bomsToUpdate)) {
      setLoading(true);
      bomsToUpdate.forEach(item => {
        new Promise((resolve, reject) => resolve(props.updateBom(item))).then(() => {
          props.getAllBoms();
          setLoading(false);
        });
      });
    }
    /*     console.log('Uploaded Boms - ' + bomsFromCSV.length);
    console.log('Database Boms - ' + allBoms.length);
    console.log('Boms to insert - ' + bomsToInsert.length);
    console.log('Unique Boms to insert - ' + uniqueBomsToInsert.length);
    console.log('Unique Non Null Boms to insert - ' + nonNullBomsToInsert.length);
    console.log('Boms to update - ' + bomsToUpdate.length); */
    if (!isArrayEmpty(nonNullBomsToInsert)) {
      setLoading(true);
      executeFunctionInChuncks(nonNullBomsToInsert, props.createBoms, 200).then(() => {
        new Promise((resolve, reject) => resolve(props.getAllBoms())).then(() => {
          updateProductBoms([...allBoms]);
          setLoading(false);
        });
      });
    }
    setLoading(false);
  };
  const updateProductBoms = (boms: IBom[]): void => {
    const productsToUpdate: IProduct[] = [];
    allProductsFromDB.forEach(product => {
      boms.forEach(bomEmtity => {
        if (bomEmtity.partNumber === product.partNumber) {
          productsToUpdate.push({ ...product, boms: [...product.boms, bomEmtity] });
        }
      });
    });
    executeFunctionInChuncks(productsToUpdate, props.updateProducts, 200).then(() => {
      props.getAllProductsFromDB();
    });
  };
  const columnHeaders = [
    { headerName: 'Id', field: 'uniqueId', sort: 'desc', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Parent Part Number', field: 'parentPartNumber', width: 200, resizable: true, sortable: true, filter: true },
    { headerName: 'Child Part Number', field: 'childPartNumber', width: 200, resizable: true, sortable: true, filter: true },
    { headerName: 'Sequance Number', field: 'sequanceNumber', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Quantity', field: 'quantity', width: 150, resizable: true, sortable: true, filter: true }
  ];

  const extractBoms = (): any[] => {
    return allBoms.map(bomItem => ({
      uniqueId: Number(bomItem.uniqueIdentifier),
      parentPartNumber: bomItem.partNumber,
      childPartNumber: bomItem.childPartNumber,
      sequanceNumber: bomItem.sequenceNumber,
      quantity: bomItem.quantity
    }));
  };

  return productUpdating || bomUpdating || loading ? (
    <LoadingModal />
  ) : (
    <Fragment>
      <div className="container">
        <CSVReader cssClass="react-csv-input" label="Import Subcomponents" onFileLoaded={importBoms} />
      </div>
      <Fragment>
        <h5>Upload a CSV file with the following columns:</h5>
        <div>
          <ol>
            <li>
              <strong>Unique Identifier</strong> : Number {`(`}Required and Unique{`)`}
            </li>
            <li>
              <strong>Parent Part Number</strong> : Text {`(`}Required{`)`}
            </li>
            <li>
              <strong>Child Part Number</strong> : Text {`(`}Required{`)`}
            </li>
            <li>
              <strong>Sequence Number</strong> : Number {`(`}Required{`)`}
            </li>
            <li>
              <strong>Quantity</strong> : Number {`(`}Required{`)`}
            </li>
          </ol>
        </div>
      </Fragment>
      <div
        className="ag-theme-balham"
        style={{
          height: '45vh',

          width: 'auto',

          padding: '1px'
        }}
      >
        <AgGridReact columnDefs={columnHeaders} rowData={extractBoms()} />
      </div>
      <br />
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

const mapDispatchToProps = {
  createProducts,
  getCompanies,
  createBoms,
  getAllBoms,
  updateBom,
  getAllProductsFromDB,
  updateProducts,
  resetBom
};

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,

  mapDispatchToProps
)(React.memo(importSubcomponents));
