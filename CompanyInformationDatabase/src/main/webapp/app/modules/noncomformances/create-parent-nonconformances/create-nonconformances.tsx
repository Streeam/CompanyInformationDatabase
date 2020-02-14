import React, { useState, Fragment, useEffect } from 'react';
// tslint:disable
import PublishIcon from '@material-ui/icons/Publish';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// tslint:enable
import { Button, Spinner, Card } from 'reactstrap';
import '../../../../content/css/multi-step.css';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import IdentifyNonconformance from './identify-non-conformance/identify-non-conformance';
import NonconformanceType from './non-conformace-type/non-conformance-type';
import NonconformanceDetails from './non-conformance-reason/non-conformance-reason';
import NonconformanceDeadline from './non-conformance-deadline/non-conformance-deadline';
import { getEntities as getAllSites } from '../../../entities/site/site.reducer';
import { getEntities as getAllDepartments } from '../../../entities/department/department.reducer';
import { getEntities as getExtraBoms } from '../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../entities/extra-routings/extra-routings.reducer';
import {
  getEntities as getAllNonConformances,
  getEntity as getNonconformance,
  getCurrentIncomplete as getIncompleteNonconformance,
  createEntity as createNonconformance,
  updateEntity as updateNonconformance
} from '../../../entities/non-conformance-details/non-conformance-details.reducer';
import { updateEntity as updateInternalNonconformance } from '../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { getAllProductsFromDB as getAllProducts } from '../../../entities/product/product.reducer';
import { getCurrentEmployeeEntity as getCurrentEmployee } from '../../../entities/employee/employee.reducer';
import { getEntities as getCustomers } from '../../../entities/customer/customer.reducer';
import { Link, RouteComponentProps } from 'react-router-dom';
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { Status } from 'app/shared/model/enumerations/status.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { INonConformanceType } from 'app/shared/model/non-conformance-type.model';
import RootCauseAnalisys from './non-conformance-root-cause-analisys/root-cause-analisys-main';
import { IProduct } from 'app/shared/model/product.model';
import moment from 'moment';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';

export interface INonConformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const Nonconformances = (props: INonConformanceProps) => {
  const {
    nonconformanceDetail,
    allNonConformances,
    nonconformancesLoading,
    productLoading,
    allProducts,
    allSites,
    allDepartments,
    currentEmployee,
    allInternalExtraBoms,
    allExtraRoutings,
    allCustomers,
    isCurrentUserManager,
    match
  } = props;

  const [productSeletedValidation, setProductSeletedValidation] = useState<boolean>(false);
  const [rejectionReasonError, setRejectionReasonError] = useState<boolean>(false);
  const [openSameNCSnackbar, setOpenSameNCSnackbar] = useState(false);
  const [sameNC, setSameNC] = useState<INonConformanceDetails>(null);
  const [isNew, setIsNew] = useState(!match.params || !match.params.id);

  useEffect(() => {
    if (isNew) {
      props.getIncompleteNonconformance();
    } else {
      props.getNonconformance(match.params.id);
    }
    if (isArrayEmpty(allProducts)) {
      props.getAllProducts();
    }
    if (isArrayEmpty(allCustomers)) {
      props.getCustomers();
    }
    if (currentEmployee.id === undefined) {
      props.getCurrentEmployee();
    }
    if (isArrayEmpty(allExtraRoutings)) {
      props.getExtraRoutings();
    }
    if (isArrayEmpty(allInternalExtraBoms)) {
      props.getExtraBoms();
    }
  }, []);

  const allocateRejectionReason = (): INonConformanceType | null =>
    nonconformanceDetail ? { ...nonconformanceDetail }.nonConformanceType : null;

  const allocateProducts = (): IProduct[] | null =>
    nonconformanceDetail && !isArrayEmpty(nonconformanceDetail.products) ? { ...nonconformanceDetail }.products : null;

  const handleSubmit = () => {
    if (!allocateProducts()) {
      setProductSeletedValidation(true);
    } else if (!allocateRejectionReason()) {
      setRejectionReasonError(true);
    } else {
      const alreadyExistingNC: INonConformanceDetails | undefined = isNonConformanceTheSame(nonconformanceDetail, [...allNonConformances]);
      if (alreadyExistingNC === undefined) {
        props.updateNonconformance({
          ...nonconformanceDetail,
          status: Status.PENDING
        });
        props.getAllNonConformances();
        props.history.goBack();
      } else {
        setSameNC(alreadyExistingNC);
        setOpenSameNCSnackbar(true);
      }
    }
  };

  const handleBack = () => {
    props.history.goBack();
  };

  const updateNonConformance = (fieldsToSave: any): void => {
    const nonConformanceEntity: INonConformanceDetails = isEmpty(nonconformanceDetail)
      ? { ...nonConformanceDetailsToDefault }
      : { ...nonconformanceDetail };
    const nonconformanceDefaultEntity: INonConformanceDetails = {
      ...nonConformanceEntity,
      ...fieldsToSave
    };
    if (isNew && isEmpty(nonconformanceDetail)) {
      props.createNonconformance(nonconformanceDefaultEntity);
    } else {
      props.updateNonconformance(nonconformanceDefaultEntity);
    }
  };
  const isNonConformanceTheSame = (
    nonconformance: INonConformanceDetails,
    nonConformances: INonConformanceDetails[]
  ): INonConformanceDetails | undefined => {
    return !isArrayEmpty(nonConformances) && !isEmpty(nonConformanceDetailsToDefault)
      ? nonConformances.find(
          nc =>
            !isEmpty(nc) &&
            nc.nonConformanceType &&
            nc.nonConformanceType.rejectionCode &&
            nc.nonConformanceType.rejectionCode === nonconformance.nonConformanceType.rejectionCode &&
            nc.products[0].partNumber === nonconformance.products[0].partNumber
        )
      : undefined;
  };
  const nonConformanceDetailsToDefault: INonConformanceDetails = !isEmpty(currentEmployee)
    ? {
        employee: currentEmployee,
        deadline: moment(),
        currentDate: moment(),
        nonconformance: Nonconformance.INTERNAL,
        priority: Priority.LOW,
        progress: 0,
        status: Status.INCOMPLETE
      }
    : {};
  const handleCloseSameNCSnackbar = () => {
    setOpenSameNCSnackbar(false);
    nonconformanceDetail.id && props.updateNonconformance({ ...nonConformanceDetailsToDefault, id: nonconformanceDetail.id });
    handleBack();
  };
  const notEnoughData = (): JSX.Element => {
    return (
      <div style={{ textAlign: 'left' }}>
        <Card style={{ backgroundColor: 'white' }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              In order to start adding non-conformaces the following need to be completed:
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControlLabel disabled control={<Checkbox checked={!isArrayEmpty(allSites)} />} label="At least one site." />{' '}
            </Grid>
            <Grid item xs={12} sm={10}>
              {isCurrentUserManager && (
                <Link to={`/entity/site`}>
                  <p style={{ padding: '15px 0 0 0' }}>Add Sites</p>
                </Link>
              )}
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControlLabel disabled control={<Checkbox checked={!isArrayEmpty(allDepartments)} />} label="At least one department." />{' '}
            </Grid>
            <Grid item xs={12} sm={10}>
              {isCurrentUserManager && (
                <Link to={`/entity/site`}>
                  <p style={{ padding: '15px 0 0 0' }}>Add Departments</p>
                </Link>
              )}
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControlLabel disabled control={<Checkbox checked={!isArrayEmpty(allProducts)} />} label="At least one product." />{' '}
            </Grid>
            <Grid item xs={12} sm={10}>
              {isCurrentUserManager && (
                <Link to={`/company-data`}>
                  <p style={{ padding: '15px 0 0 0' }}>Add Products</p>
                </Link>
              )}
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControlLabel disabled control={<Checkbox checked={!isArrayEmpty(allCustomers)} />} label="At least one customer." />{' '}
            </Grid>
            <Grid item xs={12} sm={10}>
              {isCurrentUserManager && (
                <Link to={`/company-data`}>
                  <p style={{ padding: '15px 0 0 0' }}>Add Customers</p>
                </Link>
              )}
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  };
  return productLoading ? (
    <div style={{ textAlign: 'center' }}>
      <Spinner />
    </div>
  ) : isArrayEmpty(allProducts) || isArrayEmpty(allSites) || isArrayEmpty(allDepartments) || isArrayEmpty(allCustomers) ? (
    notEnoughData()
  ) : (
    <Fragment>
      {isNew && <p style={{ textAlign: 'right', marginBottom: '0' }}>In progress...</p>}
      <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '80vh', padding: '5px' }}>
        <IdentifyNonconformance
          productSeletedValidation={productSeletedValidation}
          setProductSeletedValidation={setProductSeletedValidation}
          updateNonConformance={updateNonConformance}
        />
        <NonconformanceType updateNonConformance={updateNonConformance} />
        <NonconformanceDeadline updateNonConformance={updateNonConformance} />
        <NonconformanceDetails
          updateNonConformance={updateNonConformance}
          rejectionReasonError={rejectionReasonError}
          setRejectionReasonError={setRejectionReasonError}
        />
        <RootCauseAnalisys />
      </div>
      <br />
      <div style={{ margin: '0 0 5px 0' }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <div style={{ textAlign: 'left' }}>
              <Button size="sm" color="secondary" title={'Back'} disabled={nonconformancesLoading} onClick={handleBack}>
                <ArrowBackIcon />
                &nbsp;<span className="d-none d-md-inline">Back</span>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            {isNew && (
              <div style={{ textAlign: 'right' }}>
                <Button
                  size="sm"
                  color="secondary"
                  title={'Submit Non-Conformance'}
                  disabled={nonconformancesLoading}
                  onClick={handleSubmit}
                >
                  <PublishIcon />
                  &nbsp;<span className="d-none d-md-inline">Submit</span>
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={`same-non-conformace-snackbar`}
        open={openSameNCSnackbar}
        onClose={handleCloseSameNCSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={
          <span id="message-id">{`A Non-Conformance with the same details already exist (Non-Conformance Id: ${
            sameNC ? sameNC.id : 0
          }).`}</span>
        }
      />
    </Fragment>
  );
};

const mapStateToProps = ({
  nonConformanceDetails,
  product,
  internalNonConformance,
  employee,
  extraRoutings,
  extraBoms,
  site,
  department,
  authentication,
  customer
}: IRootState) => ({
  isCurrentUserManager: authentication.isCurrentUserManager,
  nonconformanceDetail: nonConformanceDetails.entity,
  nonconformancesLoading: nonConformanceDetails.loading || nonConformanceDetails.updating,
  allNonConformances: nonConformanceDetails.entities,
  incompleteInternalNonConformance: internalNonConformance.entity,
  productLoading: product.loading,
  currentEmployee: employee.currentEmployeeEntity,
  allProducts: product.entities,
  allSites: site.entities,
  allDepartments: department.entities,
  allExtraRoutings: extraRoutings.entities,
  allInternalExtraBoms: extraBoms.entities,
  allCustomers: customer.entities
});

const mapDispatchToProps = {
  getIncompleteNonconformance,
  getAllNonConformances,
  getNonconformance,
  updateNonconformance,
  createNonconformance,
  updateInternalNonconformance,
  getAllProducts,
  getCurrentEmployee,
  getAllSites,
  getAllDepartments,
  getExtraRoutings,
  getExtraBoms,
  getCustomers
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nonconformances);
