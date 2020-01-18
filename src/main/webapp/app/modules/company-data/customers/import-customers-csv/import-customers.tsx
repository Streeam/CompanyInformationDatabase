import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import CSVReader from 'react-csv-reader';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { getEntities as getCustomers, createEntities as createCustomers } from '../../../../entities/customer/customer.reducer';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingModal from '../../../../shared/layout/custom-components/loading-modal/loading-modal';
import { removeDuplicates, isEmpty, executeFunctionInChuncks, isArrayEmpty } from '../../../../shared/util/general-utils';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICustomer } from 'app/shared/model/customer.model';

interface ICustomersImportProps extends StateProps, DispatchProps, RouteComponentProps {}

const customerss = (props: ICustomersImportProps) => {
  const { customers, customerUpdating } = props;

  useEffect(() => {
    if (isArrayEmpty(customers)) {
      props.getCustomers();
    }
  }, []);

  const customersData: ICustomer = {
    id: null,
    customerName: '',
    customerCode: '',
    customerStatus: '',
    address: '',
    country: ''
  };

  const arrayOfCustomers: ICustomer[] = [];

  const importCustomers = (data: any[]) => {
    data.forEach((element, index) => {
      if (index !== 0 && index < data.length - 1) {
        const newCustomer = { ...customersData };
        newCustomer.customerCode = element[0];
        newCustomer.customerName = element[1];
        newCustomer.customerStatus = element[2];
        newCustomer.address = element[3];
        newCustomer.country = element[4];
        arrayOfCustomers.push(newCustomer);
      }
    });
    const customersToInsert = [...customers, ...arrayOfCustomers];
    const uniqueCustomersToInsert = removeDuplicates(customersToInsert, 'customerCode');
    const nonNullCustomerToInsert = uniqueCustomersToInsert.filter(val => val.id === null);
    // console.log('Uploaded Customers - ' + arrayOfCustomers.length);
    // console.log('Database Customers - ' + customers.length);
    // console.log('Customers to insert - ' + customersToInsert.length);
    // console.log('Unique Customers to insert - ' + uniqueCustomersToInsert.length);
    // console.log('Unique Non Null Customers to insert - ' + nonNullCustomerToInsert.length);
    // nonNullCustomerToInsert.forEach(i => console.log(i));
    executeFunctionInChuncks(nonNullCustomerToInsert, props.createCustomers, 200).then(() => {
      props.getCustomers();
      //  props.history.push('/company-data');
    });
  };

  return customerUpdating ? (
    <LoadingModal />
  ) : (
    <Fragment>
      {isArrayEmpty(customers) && (
        <div className="container">
          <CSVReader cssClass="react-csv-input" label="Import Customers" onFileLoaded={importCustomers} />
        </div>
      )}
      {!isArrayEmpty(customers) && (
        <p style={{ textAlign: 'center', color: 'green', fontSize: '2rem' }}>{customers.length} customers have been imported succesfuly!</p>
      )}
      <br />
      <Button size="sm" tag={Link} id="cancel-save" to={'/company-data'} replace color="secondary">
        <FontAwesomeIcon icon="arrow-left" />
        &nbsp;
        <span className="d-none d-md-inline">Back</span>
      </Button>
    </Fragment>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customers: customer.entities,
  customerUpdating: (customer.updating || customer.loading) && !customer.updateSuccess
});

const mapDispatchToProps = { getCustomers, createCustomers };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(customerss));
