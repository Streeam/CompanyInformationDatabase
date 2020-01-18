import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { ButtonGroup, Button, Card } from 'reactstrap';
// tslint:disable
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
// tslint:enable

interface INonconformanceCustomersWarrantyProps extends StateProps, DispatchProps {
  updateCustomerNonConformance: (fieldsToSave: any) => void;
}

export const customerNonConformanceWarranty = (props: INonconformanceCustomersWarrantyProps) => {
  const { updateCustomerNonConformance, customerNC } = props;

  useEffect(() => {}, []);
  const [warranty, setWarranty] = useState<boolean>(false);
  const allocateNonconformanceWarranty = (): boolean => (warranty ? warranty : customerNC.underWarranty ? customerNC.underWarranty : false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarranty(event.target.checked);
    updateCustomerNonConformance({ underWarranty: event.target.checked });
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Card style={{ width: '100%', backgroundColor: 'white', padding: '1rem', margin: '0 10px 10px 10px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <h5>Warranty</h5>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Checkbox
                value={allocateNonconformanceWarranty()}
                onChange={handleChange}
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
              />
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
)(customerNonConformanceWarranty);
