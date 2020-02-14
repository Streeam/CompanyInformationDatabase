import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import Select from 'react-select';
// tslint:disable
import Grid from '@material-ui/core/Grid';
// tslint:enable
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { getEntities as getAllCustomers } from '../../../../../entities/customer/customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';

interface INonconformanceCustomersProps extends StateProps, DispatchProps {
  updateCustomerNonConformance: (fieldsToSave: any) => void;
  customerValidation: boolean;
  setCustomerValidation: React.Dispatch<React.SetStateAction<boolean>>;
}

export const internalNonConformanceCulpability = (props: INonconformanceCustomersProps) => {
  const { allCustomers, updateCustomerNonConformance, customerNC, customerValidation, setCustomerValidation } = props;

  useEffect(() => {
    if (isArrayEmpty(allCustomers)) {
      props.getAllCustomers();
    }
  }, []);

  const [customerToSave, setCustomerToSave] = useState<string>(null);
  const allocateCustomer = (): string | null =>
    customerToSave ? customerToSave : customerNC ? extractCustomerNameFromId(customerNC.customerId) : null;
  const extractCustomerNameFromId = (customerId: number): string => {
    const linkedCustomer: ICustomer = !isArrayEmpty(allCustomers) && allCustomers.filter(client => customerId === client.id)[0];
    return linkedCustomer ? linkedCustomer.customerName : null;
  };
  const extractCustomerFromName = (customerName: string): number => {
    const linkedCustomer: ICustomer = !isArrayEmpty(allCustomers) && allCustomers.filter(client => customerName === client.customerName)[0];
    return linkedCustomer ? linkedCustomer.id : null;
  };
  const customerInputHandler = (event: { value: string }) => {
    if (event) {
      setCustomerToSave(event.value);
      updateCustomerNonConformance({ customerId: extractCustomerFromName(event.value) });
      setCustomerValidation(false);
    } else {
      setCustomerToSave(null);
      setCustomerValidation(true);
    }
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Card style={{ width: '100%', backgroundColor: 'white', padding: '1rem', margin: '0 10px 10px 10px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <h5>Select Customer</h5>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Select
                styles={styleEmptyField(customerValidation)}
                value={{
                  value: allocateCustomer(),
                  label: allocateCustomer()
                }}
                onChange={customerInputHandler}
                options={extractCustomerOptions([...allCustomers])}
                isSearchable
                defaultValue={allocateCustomer()}
              />
              {customerValidation && <p style={{ color: 'red' }}>Customer Required</p>}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = ({ customer, clientNonConformance }: IRootState) => ({
  allCustomers: customer.entities,
  customerNC: clientNonConformance.entity
});

const mapDispatchToProps = { getAllCustomers };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceCulpability);

const styleEmptyField = (isValueEmpty: boolean) => {
  if (isValueEmpty) {
    return {
      control: (base, state) => ({
        ...base,
        borderColor: 'red'
      })
    };
  } else {
    return {
      control: (base, state) => ({
        ...base
      })
    };
  }
};
const extractCustomerOptions = (customers: ICustomer[]): Array<{ value: string; label: string }> => {
  const customerNames: Array<{ value: string; label: string }> = [];
  !isArrayEmpty(customers) &&
    customers.forEach(item => {
      customerNames.push({
        value: item.customerName,
        label: item.customerName
      });
    });
  return customerNames;
};
