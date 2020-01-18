import React, { useState, Fragment, useEffect } from 'react';
// tslint:disable
import PublishIcon from '@material-ui/icons/Publish';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// tslint:enable
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import NonconformanceInternalSitesAndDepartments from './non-conformance-internal-sites-departments/non-conformance-internal-sites-departments';
import NonconformanceInternalCulpability from './non-conformance-internal-assign-culpability/non-conformance-internal-assign-culpability';
import NonconformanceDetails from '../child-non-conformance-details/non-conformance-additional-details';
import { getEntities as getAllSites } from '../../../../entities/site/site.reducer';
import { getEntities as getAllDepartments } from '../../../../entities/department/department.reducer';
import { getEntities as getExtraBoms } from '../../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../../entities/extra-routings/extra-routings.reducer';
import { getEntities as getCompanies } from '../../../../entities/company/company.reducer';
import {
  createEntity as createInternalNonconformance,
  updateEntity as updateInternalNonconformance,
  getEntity as getInternalNonconformance,
  getIncompleteInternalNonConformance
} from '../../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { getAllProductsFromDB as getAllProducts } from '../../../../entities/product/product.reducer';
import { getCurrentEmployeeEntity as getCurrentEmployee } from '../../../../entities/employee/employee.reducer';
import { Link, RouteComponentProps } from 'react-router-dom';
import NonconformanceInternalActions from './non-conformance-internal-actions/non-conformance-internal-actions';
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { Status } from 'app/shared/model/enumerations/status.model';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import moment from 'moment';
import { ISite } from 'app/shared/model/site.model';
import NonConformanceQuantity from '../child-non-conformance-quantity/non-conformance-quantity';
import NonConformaceRejectionDate from '../non-conformance-rejection-date/non-conformance-rejection-date';

export interface INonConformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; nonconformaceId: string }> {}

export const Nonconformances = (props: INonConformanceProps) => {
  const {
    nonconformancesLoading,
    productLoading,
    internalNonConformance,
    allProducts,
    allSites,
    allDepartments,
    currentEmployee,
    allInternalExtraBoms,
    allExtraRoutings,
    match,
    companyEntities
  } = props;

  const [siteSeletedValidation, setSiteSeletedValidation] = useState<boolean>(false);
  const [departmentSeletedValidation, setDepartmentSelectedValidation] = useState<boolean>(false);
  const [extraRoutings, setExtraRoutings] = useState<IExtraRoutings[]>([]);
  const [extraBoms, setExtraBoms] = useState<IExtraBoms[]>([]);
  const [isNew, setIsNew] = useState(!match.params || !match.params.id);

  useEffect(() => {
    if (isNew) {
      props.getIncompleteInternalNonConformance(match.params.nonconformaceId);
    } else {
      props.getInternalNonconformance(match.params.id);
    }
    if (isArrayEmpty(companyEntities)) {
      props.getCompanies();
    }
    if (isArrayEmpty(allProducts)) {
      props.getAllProducts();
    }
    if (currentEmployee.id === undefined) {
      props.getCurrentEmployee();
    }
    if (isArrayEmpty(allSites)) {
      props.getAllSites();
    }
    if (isArrayEmpty(allDepartments)) {
      props.getAllDepartments();
    }
    if (isArrayEmpty(allExtraRoutings)) {
      props.getExtraRoutings();
    }
    if (isArrayEmpty(allInternalExtraBoms)) {
      props.getExtraBoms();
    }
  }, []);
  const isLoading = nonconformancesLoading || productLoading;
  const allocateSite = (): ISite[] | null =>
    internalNonConformance && !isArrayEmpty(internalNonConformance.sites) ? { ...internalNonConformance }.sites : null;
  const allocateDepartments = (): IDepartment[] | null =>
    internalNonConformance && !isArrayEmpty(internalNonConformance.departments) ? { ...internalNonConformance }.departments : null;

  const handleSubmit = () => {
    if (!allocateSite() || isArrayEmpty(allocateSite())) {
      setSiteSeletedValidation(true);
    } else if (!allocateDepartments() || isArrayEmpty(allocateDepartments())) {
      setDepartmentSelectedValidation(true);
    } else {
      const internalNonConformanceToSave: IInternalNonConformance = {
        ...internalNonConformance,
        status: Status.COMPLETE
      };
      props.updateInternalNonconformance(internalNonConformanceToSave);
      props.getIncompleteInternalNonConformance(match.params.nonconformaceId);
      hadleBack();
    }
  };
  const hadleBack = () => {
    props.history.goBack();
  };
  const updateInternalNonConformance = (fieldsToSave: any): void => {
    const internalNonConformanceEntity: IInternalNonConformance = isEmpty(internalNonConformance)
      ? { ...internalNonConformanceDefault }
      : { ...internalNonConformance };
    const internalNonconformanceDefaultEntity: IInternalNonConformance = {
      ...internalNonConformanceEntity,
      ...fieldsToSave
    };
    if (isNew && isEmpty(internalNonConformance)) {
      props.createInternalNonconformance(internalNonconformanceDefaultEntity);
    } else {
      props.updateInternalNonconformance(internalNonconformanceDefaultEntity);
    }
  };

  const internalNonConformanceDefault: IInternalNonConformance = {
    curentDate: moment(),
    labourRate: !isArrayEmpty(companyEntities) ? companyEntities[0].overheadRate : 0,
    nonconformanceDetailsId: Number(match.params.nonconformaceId),
    rejectionDate: moment(),
    status: Status.INCOMPLETE,
    action: NonconformanceAction.SCRAP,
    quantity: 1
  };

  return (
    <Fragment>
      {isNew ? (
        <p style={{ textAlign: 'right', marginBottom: '0' }}>In progress...</p>
      ) : (
        <p style={{ textAlign: 'right', marginBottom: '0' }}>ID: {internalNonConformance.id}</p>
      )}
      <h3 style={{ textAlign: 'center' }}>Internal Non-Conformance</h3>
      <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '80vh', padding: '5px' }}>
        <NonConformanceQuantity childNonConformace={internalNonConformance} updateNonConformance={updateInternalNonConformance} />
        <NonconformanceInternalSitesAndDepartments
          updateInternalNonConformance={updateInternalNonConformance}
          departmentSeletedValidation={departmentSeletedValidation}
          setDepartmentSelectedValidation={setDepartmentSelectedValidation}
          siteSeletedValidation={siteSeletedValidation}
          setSiteSeletedValidation={setSiteSeletedValidation}
        />
        <NonconformanceInternalActions
          extraRoutings={extraRoutings}
          setExtraRoutings={setExtraRoutings}
          extraBoms={extraBoms}
          setExtraBoms={setExtraBoms}
          updateInternalNonConformance={updateInternalNonConformance}
          nonconformaceId={match.params.nonconformaceId}
        />
        <NonConformaceRejectionDate updateNonConformance={updateInternalNonConformance} childNonConformance={internalNonConformance} />
        <NonconformanceInternalCulpability updateInternalNonConformance={updateInternalNonConformance} />
        <NonconformanceDetails childNonConformace={internalNonConformance} updateNonConformance={updateInternalNonConformance} />
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
                <Button size="sm" color="secondary" title={'Submit Internal Non-Conformance'} disabled={isLoading} onClick={handleSubmit}>
                  <PublishIcon />
                  &nbsp;<span className="d-none d-md-inline">Submit</span>
                </Button>
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            &nbsp;
          </Grid>
        </Grid>
      </div>
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
  company
}: IRootState) => ({
  noncoformanceDetails: nonConformanceDetails.entity,
  nonconformancesLoading: nonConformanceDetails.loading,
  internalNonConformance: internalNonConformance.entity,
  productLoading: product.loading,
  currentEmployee: employee.currentEmployeeEntity,
  allProducts: product.entities,
  allSites: site.entities,
  allDepartments: department.entities,
  allExtraRoutings: extraRoutings.entities,
  allInternalExtraBoms: extraBoms.entities,
  companyEntities: company.entities
});

const mapDispatchToProps = {
  updateInternalNonconformance,
  createInternalNonconformance,
  getAllProducts,
  getCurrentEmployee,
  getAllSites,
  getAllDepartments,
  getExtraRoutings,
  getExtraBoms,
  getCompanies,
  getInternalNonconformance,
  getIncompleteInternalNonConformance
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nonconformances);
