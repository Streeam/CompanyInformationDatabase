import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Spinner } from 'reactstrap';
// tslint:disable
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getEntity as getCustomerNonconformace } from '../../../../../entities/client-non-conformance/client-non-conformance.reducer';
import { getEntity as getNonconformace } from '../../../../../entities/non-conformance-details/non-conformance-details.reducer';
import { getEntities as getExtraBoms } from '../../../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../../../entities/extra-routings/extra-routings.reducer';
import { getAllProductBoms as getProductsBoms } from '../../../../../entities/product/product.reducer';
import { getAllEntities as getAllEmployees } from '../../../../../entities/employee/employee.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { RouteComponentProps, Link } from 'react-router-dom';
import ViewChildComponent from '../../view-child-non-conformance/view-child-non-conformances-component';

interface ICustomerNonconformanceViewProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string; nonconformaceId: string }> {}

export const customerNonConformanceView = (props: ICustomerNonconformanceViewProps) => {
  const { allExtraBoms, allExtraRoutings, employees, customerNonconformance, nonConconformanceEntity, match } = props;

  useEffect(() => {
    props.getCustomerNonconformace(match.params.id);
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

  return isEmpty(customerNonconformance) || isEmpty(nonConconformanceEntity) ? (
    <div style={{ textAlign: 'center' }}>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <div style={{ overflowY: 'auto', overflowX: 'auto', height: '85vh', padding: '5px' }}>
        <Card style={{ backgroundColor: 'white' }}>
          <h5 style={{ margin: '10px 0 10px 0' }}>
            <strong>Customer Non-Conformance: {customerNonconformance.id}</strong>
          </h5>
          <ViewChildComponent
            nonConconformanceEntity={{ ...nonConconformanceEntity }}
            childNonconformance={{ ...customerNonconformance }}
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

const mapStateToProps = ({ clientNonConformance, nonConformanceDetails, extraBoms, extraRoutings, product, employee }: IRootState) => ({
  customerNonconformance: clientNonConformance.entity,
  nonConconformanceEntity: nonConformanceDetails.entity,
  customerLoading: clientNonConformance.loading,
  allExtraBoms: extraBoms.entities,
  allExtraRoutings: extraRoutings.entities,
  allProducts: product.entities,
  employees: employee.companysEntities
});

const mapDispatchToProps = {
  getExtraRoutings,
  getExtraBoms,
  getProductsBoms,
  getCustomerNonconformace,
  getAllEmployees,
  getNonconformace
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(customerNonConformanceView);
