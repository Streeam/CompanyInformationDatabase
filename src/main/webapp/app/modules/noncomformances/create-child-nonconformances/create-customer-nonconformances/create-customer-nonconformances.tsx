import React, { useState, Fragment, useEffect } from 'react';
// tslint:disable
import PublishIcon from '@material-ui/icons/Publish';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// tslint:enable
import { Button, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import NonConformanceAdditionalExpenses from '../non-conformance-additional-expenses/non-conformance-additional-expenses-main';
import { getEntities as getCompanies } from '../../../../entities/company/company.reducer';
import { getAllProductsFromDB as getAllProducts } from '../../../../entities/product/product.reducer';
import {
  createEntity as createCustomerNonconformance,
  updateEntity as updateCustomerNonconformance,
  getEntity as getCustomerNonconformance,
  getIncompleteCustomerNonConformance
} from '../../../../entities/client-non-conformance/client-non-conformance.reducer';
import NonconformanceDetails from '../child-non-conformance-details/non-conformance-additional-details';
import {
  getCurrentEmployeeEntity as getCurrentEmployee,
  getEntities as getAllEmployees
} from '../../../../entities/employee/employee.reducer';
import { getEntity as getNonConformance } from '../../../../entities/non-conformance-details/non-conformance-details.reducer';
import { Link, RouteComponentProps } from 'react-router-dom';
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { Status } from 'app/shared/model/enumerations/status.model';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import NonconformanceAssignCustomer from './non-conformance-customer-assign-customer/assign-customer';
import moment from 'moment';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { CustomerNonconformaceType } from 'app/shared/model/enumerations/customer-nonconformace-type.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import NonConformanceQuantity from '../child-non-conformance-quantity/non-conformance-quantity';
import NonConformaceRejectionDate from '../non-conformance-rejection-date/non-conformance-rejection-date';
import NonConformanceCustomerType from './non-conformance-customer-type/customer-non-conformace-type';
import NonConformanceCustomerWarranty from './under-warranty/customer-non-conformace-warranty';

export interface ICustomerNonConformanceProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string; nonconformaceId: string }> {}

export const Nonconformances = (props: ICustomerNonConformanceProps) => {
  const {
    customerNonConformance,
    nonconformancesLoading,
    currentEmployee,
    match,
    companyEntities,
    allExtraRoutings,
    allExtraBoms,
    noncoformanceDetails,
    allProducts,
    allEmployees
  } = props;
  const [isNew, setIsNew] = useState(!match.params || !match.params.id);

  useEffect(() => {
    if (isNew) {
      props.getIncompleteCustomerNonConformance(match.params.nonconformaceId);
      if (isEmpty(noncoformanceDetails)) {
        props.getNonConformance(match.params.nonconformaceId);
      }
    } else {
      props.getCustomerNonconformance(match.params.id);
      if (isEmpty(noncoformanceDetails)) {
        props.getNonConformance(match.params.id);
      }
    }
    if (isArrayEmpty(companyEntities)) {
      props.getCompanies();
    }
    if (currentEmployee.id) {
      props.getCurrentEmployee();
    }
    if (isArrayEmpty(allEmployees)) {
      props.getAllEmployees();
    }
    if (isArrayEmpty(allProducts)) {
      props.getAllProducts();
    }
  }, []);
  const [customerValidation, setCustomerValidation] = useState<boolean>(false);
  const isLoading = nonconformancesLoading;
  const handleSubmit = () => {
    if (isEmpty(customerNonConformance) || customerNonConformance.customerId === null) {
      setCustomerValidation(true);
    } else {
      updateCustomerNonConformance({ status: Status.COMPLETE });
      props.getIncompleteCustomerNonConformance(match.params.nonconformaceId);
      hadleBack();
    }
  };
  const hadleBack = () => {
    props.history.goBack();
  };
  const updateCustomerNonConformance = (fieldsToSave: any): void => {
    const customerNonConformanceEntity: IClientNonConformance = isEmpty(customerNonConformance)
      ? { ...customerNonConformanceDefault }
      : { ...customerNonConformance };
    const customerNonconformanceDefaultEntity: IClientNonConformance = {
      ...customerNonConformanceEntity,
      ...fieldsToSave
    };
    if (isNew && isEmpty(customerNonConformance)) {
      props.createCustomerNonconformance(customerNonconformanceDefaultEntity);
    } else {
      props.updateCustomerNonconformance(customerNonconformanceDefaultEntity);
    }
  };

  const customerNonConformanceDefault: IClientNonConformance = {
    currentDate: moment(),
    nonconformanceDetailsId: Number(match.params.nonconformaceId),
    nonConformanceType: CustomerNonconformaceType.NON_CONFORMING_PRODUCT_SERVICE,
    rejectionDate: moment(),
    status: Status.INCOMPLETE,
    underWarranty: false,
    labourRate: !isArrayEmpty(companyEntities) ? companyEntities[0].overheadRate : 0,
    quantity: 1
  };
  const allocateExtraBoms = (): IExtraBoms[] => {
    return !isArrayEmpty(allExtraBoms) && customerNonConformance.id
      ? allExtraBoms.filter(
          item => item.customerNonConformaceId === customerNonConformance.id && item.nonconformanceType === Nonconformance.CUSTOMER
        )
      : [];
  };
  const allocateExtraRoutings = (): IExtraRoutings[] => {
    return !isArrayEmpty(allExtraRoutings) && customerNonConformance.id
      ? allExtraRoutings.filter(
          item => item.customerNonConformaceId === customerNonConformance.id && item.nonconformanceType === Nonconformance.CUSTOMER
        )
      : [];
  };
  const NonConformanceExpenses: JSX.Element = (
    <Card style={{ width: '100%', backgroundColor: 'white', padding: '1rem', margin: '10px 5px 10px 0' }}>
      <h5>After Sale Expenses</h5>
      <NonConformanceAdditionalExpenses
        extraRoutings={allocateExtraRoutings()}
        extraBoms={allocateExtraBoms()}
        nonConformanceIdType={!isEmpty(customerNonConformance) ? { type: Nonconformance.CUSTOMER, id: customerNonConformance.id } : null}
        labourRate={!isEmpty(customerNonConformance) && customerNonConformance.labourRate ? customerNonConformance.labourRate : 0}
        updateChildNonConformance={updateCustomerNonConformance}
      />
    </Card>
  );
  return (
    <Fragment>
      {isNew ? (
        <p style={{ textAlign: 'right', marginBottom: '0' }}>In progress...</p>
      ) : (
        <p style={{ textAlign: 'right', marginBottom: '0' }}>ID: {customerNonConformance.id}</p>
      )}
      <h3 style={{ textAlign: 'center' }}>Customer Non-Conformance</h3>
      <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '75vh', padding: '5px' }}>
        <NonconformanceAssignCustomer
          updateCustomerNonConformance={updateCustomerNonConformance}
          customerValidation={customerValidation}
          setCustomerValidation={setCustomerValidation}
        />
        <NonConformanceCustomerType updateCustomerNonConformance={updateCustomerNonConformance} />
        <NonConformaceRejectionDate updateNonConformance={updateCustomerNonConformance} childNonConformance={customerNonConformance} />
        <NonConformanceCustomerWarranty updateCustomerNonConformance={updateCustomerNonConformance} />
        <NonConformanceQuantity childNonConformace={customerNonConformance} updateNonConformance={updateCustomerNonConformance} />
        {!isEmpty(customerNonConformance) && customerNonConformance.id && (
          <Fragment>
            {NonConformanceExpenses}
            <div style={{ margin: '20px' }} />
            <NonconformanceDetails childNonConformace={customerNonConformance} updateNonConformance={updateCustomerNonConformance} />
          </Fragment>
        )}
      </div>
      <br />
      <div style={{ margin: '0 0 5px 0' }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <div style={{ textAlign: 'left' }}>
              <Button size="sm" color="secondary" title={'Back'} disabled={isLoading} onClick={hadleBack}>
                <ArrowBackIcon />
                &nbsp;<span className="d-none d-md-inline">Back</span>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            {isNew && (
              <div style={{ textAlign: 'right' }}>
                <Button size="sm" color="secondary" title={'Submit Customer Non-Conformance'} disabled={isLoading} onClick={handleSubmit}>
                  <PublishIcon />
                  &nbsp;<span className="d-none d-md-inline">Submit</span>
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({
  nonConformanceDetails,
  clientNonConformance,
  employee,
  extraRoutings,
  extraBoms,
  company,
  product
}: IRootState) => ({
  noncoformanceDetails: nonConformanceDetails.entity,
  nonconformancesLoading: nonConformanceDetails.loading,
  customerNonConformance: clientNonConformance.entity,
  currentEmployee: employee.currentEmployeeEntity,
  companyEntities: company.entities,
  allExtraRoutings: extraRoutings.entities,
  allExtraBoms: extraBoms.entities,
  allEmployees: employee.entities,
  allProducts: product.entities
});

const mapDispatchToProps = {
  getCurrentEmployee,
  getCompanies,
  getCustomerNonconformance,
  createCustomerNonconformance,
  updateCustomerNonconformance,
  getIncompleteCustomerNonConformance,
  getAllEmployees,
  getNonConformance,
  getAllProducts
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nonconformances);
