import React, { useState, useEffect, Fragment } from 'react';
// tslint:disable
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// tslint:enable
import { Card } from 'reactstrap';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { isNull } from 'lodash';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';

interface INonConformanceQtyProps {
  updateNonConformance: (fieldsToSave: any) => void;
  childNonConformace: IInternalNonConformance | IClientNonConformance;
}

export const nonConformanceQuantity = (props: INonConformanceQtyProps) => {
  const { childNonConformace, updateNonConformance } = props;

  const quantityUpdate = event => {
    if (event.target.value) {
      updateNonConformance({ quantity: Number(event.target.value) });
    } else {
      updateNonConformance({ quantity: 1 });
    }
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Card style={{ width: '100%', backgroundColor: 'white', padding: '1rem', margin: '10px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <h5>Quantity</h5>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                type="number"
                id="quantityToSave"
                defaultValue={childNonConformace.quantity ? childNonConformace.quantity : '1'}
                // tslint:disable
                onBlur={() => quantityUpdate(event)}
                // tslint:enable
                variant="outlined"
                margin="dense"
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default nonConformanceQuantity;
