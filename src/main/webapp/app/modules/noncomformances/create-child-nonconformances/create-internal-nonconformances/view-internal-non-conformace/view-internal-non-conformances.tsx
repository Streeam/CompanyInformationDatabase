import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Spinner } from 'reactstrap';
// tslint:disable
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getEntity as getInternalNonconformace } from '../../../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { getEntity as getNonconformace } from '../../../../../entities/non-conformance-details/non-conformance-details.reducer';
import { getEntities as getExtraBoms } from '../../../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../../../entities/extra-routings/extra-routings.reducer';
import { getAllProductBoms as getProductsBoms } from '../../../../../entities/product/product.reducer';
import { getAllEntities as getAllEmployees } from '../../../../../entities/employee/employee.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { RouteComponentProps, Link } from 'react-router-dom';
import ViewInternalComponent from '../../view-child-non-conformance/view-child-non-conformances-component';

interface INonconformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; nonconformaceId: string }> {}

export const nonConformance = (props: INonconformanceProps) => {
  const { allExtraBoms, allExtraRoutings, employees, internalNonconformance, nonConconformanceEntity, match } = props;

  useEffect(() => {
    props.getInternalNonconformace(match.params.id);
    props.getNonconformace(match.params.nonconformaceId);
    if (isArrayEmpty(employees)) {
      props.getAllEmployees();
    }
    if (isArrayEmpty(allExtraBoms)) {
      props.getExtraBoms();
    }
    if (isArrayEmpty(allExtraRoutings)) {
      props.getExtraRoutings();
    }
  }, []);

  return isEmpty(internalNonconformance) || isEmpty(nonConconformanceEntity) ? (
    <div style={{ textAlign: 'center' }}>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <div style={{ overflowY: 'auto', overflowX: 'auto', height: '85vh', padding: '5px' }}>
        <Card style={{ backgroundColor: 'white' }}>
          <h5 style={{ margin: '10px 0 10px 0' }}>
            <strong>Internal Non-Conformance: {internalNonconformance.id}</strong>
          </h5>
          <ViewInternalComponent
            nonConconformanceEntity={{ ...nonConconformanceEntity }}
            childNonconformance={{ ...internalNonconformance }}
          />
        </Card>
      </div>
      <Button size="sm" tag={Link} id="back" to="/nonconformances" replace color="secondary">
        <ChevronLeftIcon />
        &nbsp;<span className="d-none d-md-inline">Back</span>
      </Button>
      <br />
    </Fragment>
  );
};

const mapStateToProps = ({
  internalNonConformance,
  nonConformanceDetails,
  extraBoms,
  extraRoutings,
  task,
  product,
  employee
}: IRootState) => ({
  internalNonconformance: internalNonConformance.entity,
  nonConconformanceEntity: nonConformanceDetails.entity,
  internalLoading: internalNonConformance.loading,
  allExtraBoms: extraBoms.entities,
  allExtraRoutings: extraRoutings.entities,
  allProducts: product.entities,
  employees: employee.companysEntities
});

const mapDispatchToProps = {
  getExtraRoutings,
  getExtraBoms,
  getProductsBoms,
  getInternalNonconformace,
  getAllEmployees,
  getNonconformace
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nonConformance);
