import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
// tslint:disable
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { IActionToBeTaken } from 'app/shared/model/action-to-be-taken.model';
import { updateEntity as updateRooCause } from '../../../../../entities/action-to-be-taken/action-to-be-taken.reducer';
// tslint:enable

interface IFiveWhysProps extends StateProps, DispatchProps {
  isDisabled?: boolean;
}

export const fiveWhys = (props: IFiveWhysProps) => {
  const { rootCause, isDisabled } = props;
  useEffect(() => {}, []);
  const assignRootCause: IActionToBeTaken | null = rootCause;
  const [problem, setProblem] = useState<string>(null);

  const assignProblem = (): string => (problem ? problem : assignRootCause ? assignRootCause.problem : undefined);

  const problemUpdate = event => {
    props.updateRooCause({ ...rootCause, problem: event.target.value });
  };
  const why1OcUpdate = event => {
    props.updateRooCause({ ...rootCause, why1Occurrance: event.target.value });
  };
  const why2OcUpdate = event => {
    props.updateRooCause({ ...rootCause, why2Occurrance: event.target.value });
  };
  const why3OcUpdate = event => {
    props.updateRooCause({ ...rootCause, why3Occurrance: event.target.value });
  };
  const why4OcUpdate = event => {
    props.updateRooCause({ ...rootCause, why4Occurrance: event.target.value });
  };
  const why5OcUpdate = event => {
    props.updateRooCause({ ...rootCause, why5Occurrance: event.target.value });
  };
  const why1DetUpdate = event => {
    props.updateRooCause({ ...rootCause, why1Detection: event.target.value });
  };
  const why2DetUpdate = event => {
    props.updateRooCause({ ...rootCause, why2Detection: event.target.value });
  };
  const why3DetUpdate = event => {
    props.updateRooCause({ ...rootCause, why3Detaction: event.target.value });
  };
  const why4DetUpdate = event => {
    props.updateRooCause({ ...rootCause, why4Detection: event.target.value });
  };
  const why5DetUpdate = event => {
    props.updateRooCause({ ...rootCause, why5Detection: event.target.value });
  };
  const rootCauseUpdate = event => {
    if (event.target.value === undefined || event.target.value.trim() === '') {
      props.updateRooCause({ ...rootCause, rootCause: null });
    } else {
      props.updateRooCause({ ...rootCause, rootCause: event.target.value });
    }
  };
  return (
    <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <TextField
            defaultValue={assignRootCause && assignRootCause.problem ? assignRootCause.problem : ''}
            fullWidth
            required
            id="problem"
            label="Problem"
            onBlur={problemUpdate}
            margin="dense"
            disabled={isDisabled}
            variant="outlined"
          />
        </Grid>
        {assignProblem() && (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <h5 style={{ textAlign: 'center' }}>Five Why's on Occurrence</h5>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why1Occurrance ? assignRootCause.why1Occurrance : ''}
                  fullWidth
                  id="1Oc"
                  label="Why "
                  onBlur={why1OcUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why2Occurrance ? assignRootCause.why2Occurrance : ''}
                  fullWidth
                  id="2Oc"
                  label="Why "
                  onBlur={why2OcUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why3Occurrance ? assignRootCause.why3Occurrance : ''}
                  fullWidth
                  id="3Oc"
                  label="Why "
                  onBlur={why3OcUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why4Occurrance ? assignRootCause.why4Occurrance : ''}
                  fullWidth
                  id="4Oc"
                  label="Why "
                  onBlur={why4OcUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why5Occurrance ? assignRootCause.why5Occurrance : ''}
                  fullWidth
                  id="5Oc"
                  label="Why "
                  onBlur={why5OcUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h5 style={{ textAlign: 'center' }}>Five Why's on Non-Detection</h5>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why1Detection ? assignRootCause.why1Detection : ''}
                  fullWidth
                  id="1Det"
                  label="Why "
                  onBlur={why1DetUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why2Detection ? assignRootCause.why2Detection : ''}
                  fullWidth
                  id="2Det"
                  label="Why "
                  onBlur={why2DetUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why3Detaction ? assignRootCause.why3Detaction : ''}
                  fullWidth
                  id="3Det"
                  label="Why "
                  onBlur={why3DetUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why4Detection ? assignRootCause.why4Detection : ''}
                  fullWidth
                  id="4Det"
                  label="Why "
                  onBlur={why4DetUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={assignRootCause && assignRootCause.why5Detection ? assignRootCause.why5Detection : ''}
                  fullWidth
                  id="5Det"
                  label="Why "
                  onBlur={why5DetUpdate}
                  margin="dense"
                  disabled={isDisabled}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Fragment>
        )}
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <TextField
            defaultValue={rootCause.rootCause ? rootCause.rootCause : ''}
            fullWidth
            required
            id="rootCause"
            label="Root Cause"
            onBlur={rootCauseUpdate}
            margin="dense"
            disabled={isDisabled}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Card>
  );
};

const mapStateToProps = ({ actionToBeTaken }: IRootState) => ({
  rootCause: actionToBeTaken.entity
});

const mapDispatchToProps = { updateRooCause };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(fiveWhys);
