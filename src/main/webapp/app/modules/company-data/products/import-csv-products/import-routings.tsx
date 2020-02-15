import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import CSVReader from 'react-csv-reader';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
// tslint:disable
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';
// tslint:enable
import { updateEntities as updateProducts, getAllProductsFromDB } from '../../../../entities/product/product.reducer';
import {
  createEntities as createRoutings,
  getAllEntities as getAllRoutings,
  updateEntity as updateRouting,
  reset as resetRouting
} from '../../../../entities/routing/routing.reducer';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingModal from '../../../../shared/layout/custom-components/loading-modal/loading-modal';
import {
  removeDuplicates,
  isEmpty,
  executeFunctionInChuncks,
  isArrayEmpty,
  removeDuplicatesBasedOn2Entities,
  removeDuplicatesBasedOnMultipleEntities
} from '../../../../shared/util/general-utils';
import './import.css';
import { AgGridReact } from 'ag-grid-react';
import { IProduct } from 'app/shared/model/product.model';
import { IRouting } from 'app/shared/model/routing.model';
import { IBom } from 'app/shared/model/bom.model';
import { Link, RouteComponentProps } from 'react-router-dom';

interface IRoutingsProps extends StateProps, DispatchProps, RouteComponentProps {}

const importRoutings = (props: IRoutingsProps) => {
  const { productUpdating, allProductsFromDB, allRoutings, routingUpdating } = props;

  useEffect(() => {
    props.getAllRoutings();
    if (isArrayEmpty(allProductsFromDB)) {
      props.getAllProductsFromDB();
    }
    // return () => props.resetRouting();
  }, []);
  const [loading, setLoading] = useState<boolean>(false);
  const routing: IRouting = {
    id: null,
    uniqueIdentifier: '',
    partNumber: '',
    resourceName: '',
    resourceType: '',
    layoutTime: 0,
    unitRunTime: 0,
    versions: [],
    products: []
  };

  const routingsFromCSV: IRouting[] = [];

  const importRouting = (data: any[]) => {
    setLoading(previous => !previous);
    data.forEach((element, index) => {
      if (index !== 0 && index < data.length - 1) {
        const newRouting = { ...routing };
        newRouting.uniqueIdentifier = element[0];
        newRouting.partNumber = element[1];
        newRouting.resourceName = element[2];
        newRouting.resourceType = element[3];
        newRouting.layoutTime = Number(element[4]);
        newRouting.unitRunTime = Number(element[5]);
        routingsFromCSV.push(newRouting);
      }
    });

    const routingsToInsert = [...allRoutings, ...routingsFromCSV];
    // const uniqueRoutingsToInsert = removeDuplicates(routingsToInsert, 'uniqueIdentifier');
    // const uniqueRoutingsToInsert = removeDuplicatesBasedOnMultipleEntities(routingsToInsert, ['uniqueIdentifier', 'partNumber', 'resourceName', 'unitRunTime']);
    const nonNullRoutingsToInsert = routingsToInsert.filter(val => val.id === null);
    const routingsToUpdate: IRouting[] = [];

    /*allRoutings.forEach(item1 => {
      routingsFromCSV.forEach(item2 => {
        if (item1.uniqueIdentifier === item2.uniqueIdentifier) {
          if (
            item1.partNumber === item2.partNumber &&
            !(
              item1.resourceName === item2.resourceName &&
              item1.resourceType === item2.resourceType &&
              item1.layoutTime === item2.layoutTime &&
              item1.unitRunTime === item2.unitRunTime
            )
          ) {
            routingsToUpdate.push({ ...item2, id: item1.id });
          }
        }
      });
    });
    if (!isArrayEmpty(routingsToUpdate)) {
      setLoading(true);
      routingsToUpdate.forEach(item => {
        props.updateRouting(item);
      });
    }*/
    if (!isArrayEmpty(nonNullRoutingsToInsert)) {
      setLoading(true);
      executeFunctionInChuncks(nonNullRoutingsToInsert, props.createRoutings, 500);
    }
    setLoading(false);
  };

  const updateProductRoutings = (): void => {
    if (!isArrayEmpty(allProductsFromDB) && !isArrayEmpty(allRoutings)) {
      const productsToUpdate: IProduct[] = [];
      allProductsFromDB.forEach(product => {
        const routings: IRouting[] = [];
        allRoutings.forEach(routingEmtity => {
          if (routingEmtity.partNumber === product.partNumber) {
            routings.push(routingEmtity);
          }
        });
        !isArrayEmpty(routings) && productsToUpdate.push({ ...product, routings: [...routings] });
      });
      executeFunctionInChuncks(productsToUpdate, props.updateProducts, 200).then(() => {
        props.getAllProductsFromDB();
      });
    }
  };

  const columnHeaders = [
    { headerName: 'Id', field: 'uniqueId', sort: 'desc', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Parent Part Number', field: 'parentPartNumber', width: 200, resizable: true, sortable: true, filter: true },
    { headerName: 'Resource Name', field: 'resourceName', width: 200, resizable: true, sortable: true, filter: true },
    { headerName: 'Resource Type', field: 'resourceType', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Setup Time', field: 'setupTime', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Unit Run Time', field: 'unitRunTime', width: 150, resizable: true, sortable: true, filter: true }
  ];

  const extractRoutings = (): any[] => {
    return allRoutings.map(bomItem => ({
      uniqueId: Number(bomItem.uniqueIdentifier),
      parentPartNumber: bomItem.partNumber,
      resourceName: bomItem.resourceName,
      resourceType: bomItem.resourceType,
      setupTime: bomItem.layoutTime,
      unitRunTime: bomItem.unitRunTime
    }));
  };
  return productUpdating || routingUpdating || loading ? (
    <LoadingModal />
  ) : (
    <Fragment>
      <div className="container">
        <CSVReader cssClass="react-csv-input" label="Import Routing" onFileLoaded={importRouting} />
      </div>
      <Fragment>
        <h5>Uploade a CSV file with the following columns:</h5>
        <div>
          <ol>
            <li>
              <strong>Unique Identifier</strong> : Number {`(`}Required and Unique{`)`}
            </li>
            <li>
              <strong>Part Number</strong> : Text {`(`}Required and Unique{`)`}
            </li>
            <li>
              <strong>Resource Name</strong> : Text {`(`}Required{`)`}
            </li>
            <li>
              <strong>Resource Type</strong> : Text {`(`}Required{`)`}
            </li>
            <li>
              <strong>Setup Time</strong> : Number {`(`}Required{`)`}
            </li>
            <li>
              <strong>Unit Run Time</strong> : Number {`(`}Required{`)`}
            </li>
          </ol>
        </div>
        <div style={{ textAlign: 'right' }}>
      <IconButton
                  size="small"
                  title={'Update the products'}
                  onClick={updateProductRoutings}
                  aria-label="edit"
                >
                  <SyncIcon />
                </IconButton>
                  </div>
        <div
          className="ag-theme-balham"
          style={{
            height: '45vh',

            width: 'auto',

            padding: '1px'
          }}
        >
          <AgGridReact columnDefs={columnHeaders} rowData={extractRoutings()} />
        </div>
      </Fragment>
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

const mapDispatchToProps = { createRoutings, resetRouting, updateRouting, getAllRoutings, getAllProductsFromDB, updateProducts };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(importRoutings));
