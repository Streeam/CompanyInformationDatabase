import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { ButtonGroup, Button, Card } from 'reactstrap';
// tslint:disable
import Grid from '@material-ui/core/Grid';
import { CustomerNonconformaceType } from 'app/shared/model/enumerations/customer-nonconformace-type.model';
// tslint:enable

interface INonconformanceCustomersTypeProps extends StateProps, DispatchProps {
  updateCustomerNonConformance: (fieldsToSave: any) => void;
}

export const customerNonConformanceType = (props: INonconformanceCustomersTypeProps) => {
  const { updateCustomerNonConformance, customerNC } = props;

  useEffect(() => {}, []);
  const [nonconformanceType, setNonconformanceType] = useState<CustomerNonconformaceType>(null);
  const allocateNonconformance = (): CustomerNonconformaceType =>
    nonconformanceType ? nonconformanceType : customerNC.nonConformanceType ? customerNC.nonConformanceType : null;
  const selectCustomerComplaint = () => {
    setNonconformanceType(CustomerNonconformaceType.CUSTOMER_COMPLAINT);
    updateCustomerNonConformance({ nonConformanceType: CustomerNonconformaceType.CUSTOMER_COMPLAINT });
  };
  const selectLateDelivery = () => {
    setNonconformanceType(CustomerNonconformaceType.LATE_DELIVERY);
    updateCustomerNonConformance({ nonConformanceType: CustomerNonconformaceType.LATE_DELIVERY });
  };
  const selectNCProductService = () => {
    setNonconformanceType(CustomerNonconformaceType.NON_CONFORMING_PRODUCT_SERVICE);
    updateCustomerNonConformance({ nonConformanceType: CustomerNonconformaceType.NON_CONFORMING_PRODUCT_SERVICE });
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Card style={{ width: '100%', backgroundColor: 'white', padding: '1rem', margin: '10px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <h5>Customer Non-Nonconformance Type</h5>
            </Grid>
            <Grid item xs={12} sm={12}>
              <ButtonGroup style={{ maxWidth: '900px' }}>
                <Button
                  style={{ minWidth: '300px' }}
                  size="sm"
                  color="secondary"
                  onClick={selectCustomerComplaint}
                  active={allocateNonconformance() === CustomerNonconformaceType.CUSTOMER_COMPLAINT}
                >
                  Customer Complaint
                </Button>
                <Button
                  style={{ minWidth: '300px' }}
                  size="sm"
                  color="secondary"
                  onClick={selectLateDelivery}
                  active={allocateNonconformance() === CustomerNonconformaceType.LATE_DELIVERY}
                >
                  Late Delivery
                </Button>
                <Button
                  style={{ minWidth: '300px' }}
                  size="sm"
                  color="secondary"
                  onClick={selectNCProductService}
                  active={allocateNonconformance() === CustomerNonconformaceType.NON_CONFORMING_PRODUCT_SERVICE}
                >
                  Non-Conforming Product/Service
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = ({ clientNonConformance }: IRootState) => ({
  customerNC: clientNonConformance.entity
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(customerNonConformanceType);
