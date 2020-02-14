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

interface INonConformanceReason {
  updateNonConformance: (fieldsToSave: any) => void;
  childNonConformace: IInternalNonConformance | IClientNonConformance;
}

export const nonConformanceReason = (props: INonConformanceReason) => {
  const { childNonConformace, updateNonConformance } = props;

  const [rejectionDetails, setRejectionReasonDetails] = useState<string>(undefined);

  const rejectionReasonDetailsInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRejectionReasonDetails(event.target.value);
  };

  const hadleRejectionReasonUpdate = () => {
    updateNonConformance({ rejectionReasonDetails: rejectionDetails });
  };

  const allocateRejectionReasonDetails = (): string => {
    if (rejectionDetails === undefined && !isEmpty(childNonConformace)) {
      if (isNull(childNonConformace.rejectionReasonDetails)) {
        return '';
      } else {
        return { ...childNonConformace }.rejectionReasonDetails;
      }
    } else {
      return rejectionDetails;
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Card style={{ width: '100%', backgroundColor: 'white', padding: '1rem', margin: '0 10px 10px 10px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <h5>Non-conformance Details</h5>
            </Grid>
            <Grid item xs={12} sm={12}>
              <p>Additional Details</p>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                onChange={rejectionReasonDetailsInputHandler}
                value={allocateRejectionReasonDetails()}
                onBlur={hadleRejectionReasonUpdate}
                multiline
                rows="3"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default nonConformanceReason;
