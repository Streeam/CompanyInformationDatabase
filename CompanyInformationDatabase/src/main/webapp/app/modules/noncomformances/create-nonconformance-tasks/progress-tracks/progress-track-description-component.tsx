import React, { useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
// tslint:disable
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// tslint:enable
import { updateEntity as updateProgressTrack } from '../../../../entities/progress-track/progress-track.reducer';
import { IProgressTrack } from 'app/shared/model/progress-track.model';
import { isEmpty } from 'app/shared/util/general-utils';
import { isNull } from 'lodash';

interface IProgressTrackDescriptionProps extends DispatchProps {
  progressTrack: IProgressTrack;
  readOnlyField: boolean;
}

export const internalNonConformanceTaskForm = (props: IProgressTrackDescriptionProps) => {
  const { progressTrack, readOnlyField } = props;
  React.useEffect(() => {}, []);
  const [progressTrackDescription, setProgressTrackDescription] = useState<string>(undefined);
  const classes = useStyles(props);

  const progressTrackDescriptionUpdate = event => {
    props.updateProgressTrack({ ...progressTrack, progressDescription: event.target.value });
  };

  const progressTrackDescriptionOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgressTrackDescription(event.target.value);
  };

  const allocateProgressTrackDescription = (): string => {
    if (progressTrackDescription === undefined && !isEmpty(progressTrack)) {
      if (isNull(progressTrack.progressDescription)) {
        return '';
      } else {
        return { ...progressTrack }.progressDescription;
      }
    } else {
      return progressTrackDescription;
    }
  };

  return (
    <TextField
      fullWidth
      className={classes.textField}
      label="Description"
      margin="dense"
      InputProps={{ readOnly: readOnlyField }}
      onChange={progressTrackDescriptionOnChange}
      onBlur={readOnlyField ? () => {} : progressTrackDescriptionUpdate}
      value={allocateProgressTrackDescription()}
      variant="outlined"
    />
  );
};

const mapDispatchToProps = { updateProgressTrack };

type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(internalNonConformanceTaskForm);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: 0
    }
  })
);
