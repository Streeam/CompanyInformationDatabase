import React, { useEffect, useState, Fragment } from 'react';
import { Card, Spinner } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import moment, { Moment } from 'moment';
// tslint:disable
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// tslint:enable
import Transition from '../../../../shared/layout/custom-components/transition/transition';
import { ITask } from 'app/shared/model/task.model';
import { getEntity as getEmployee } from '../../../../entities/employee/employee.reducer';
import {
  getTasksProgressTracks,
  deleteEntity as deleteProgressTrack,
  createEntity as createProgressTrack,
  updateEntity as updateProgressTrack
} from '../../../../entities/progress-track/progress-track.reducer';
import { downloadFile, deleteEntity as deleteImage } from '../../../../entities/image/image.reducer';
import { updateEntity as updateTask, getEntities as getTasks } from '../../../../entities/task/task.reducer';
import { refreshNCAndReselectCurrentNC } from '../../../../entities/non-conformance-details/non-conformance-details.reducer';
import {
  convertToEmployeeIconName,
  downloadebleAttachment,
  addProgressTrackPermission,
  editProgressTrackPermission,
  deleteProgressTrackPermission
} from '../../../../shared/util/entity-utils';
import ProgressBar from 'app/shared/layout/custom-components/progress-bar/progress-bar';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { IProgressTrack } from 'app/shared/model/progress-track.model';
import UploadButton from '../../../../shared/layout/custom-components/dropzone/upload-button';
import DownloadButton from '../../../../shared/layout/custom-components/dropzone/download-button';
import ProgressTackDesciption from './progress-track-description-component';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { IEmployee } from 'app/shared/model/employee.model';

interface INonconformanceProgressProps extends StateProps, DispatchProps {
  handleClose: any;
  open: boolean;
  selectNonConformanceAfterUpdate: (nonConconformance: INonConformanceDetails) => void;
  nonConconformanceEntity: INonConformanceDetails;
  currentEmployee: IEmployee;
  currentTaskOwnerPermission: (task: ITask, employee: IEmployee) => boolean;
}
export const internalNonConformanceTaskForm = (props: INonconformanceProgressProps) => {
  const {
    handleClose,
    open,
    currentTask,
    employeeEntity,
    progressTracks,
    uploading,
    images,
    selectNonConformanceAfterUpdate,
    nonConconformanceEntity,
    currentEmployee,
    currentTaskOwnerPermission
  } = props;
  const tasksProgressTracks: IProgressTrack[] =
    currentTask && progressTracks && progressTracks.length > 0 ? progressTracks.filter(item => item.taskId === currentTask.id) : [];
  React.useEffect(() => {}, []);

  const classes = useStyles(props);
  const progressTrackEntity = (): IProgressTrack => {
    return {
      date: moment(),
      progressDescription: '',
      complete: false,
      taskId: currentTask.id
    };
  };
  const onHadleAddProgressTrack = () => {
    if (!isEmpty(currentTask)) {
      props.createProgressTrack(progressTrackEntity());
    }
  };
  const updateWithAttachment = (entityTask: IProgressTrack, file: File): void => {
    if (file) {
      props.updateProgressTrack(entityTask, file);
    }
  };

  const handleStatusChange = (entity: IProgressTrack) => {
    props.updateProgressTrack({ ...entity, complete: !entity.complete });
  };
  const handleExit = () => {
    nonConconformanceEntity && props.refreshNCAndReselectCurrentNC(nonConconformanceEntity, selectNonConformanceAfterUpdate);
    handleClose();
  };
  const handleRemoveProgressTrack = (entity: IProgressTrack) => {
    props.deleteProgressTrack(entity);
  };
  return (
    <Dialog TransitionComponent={Transition} maxWidth="xl" disableEscapeKeyDown open={open} onClose={handleExit}>
      <DialogTitle className={classes.title}>To Do List</DialogTitle>
      <DialogContent className={classes.root}>
        <form noValidate autoComplete="off">
          <div style={{ minWidth: '1300px', height: 'auto', backgroundColor: '#e6e6e6' }}>
            <br />
            <Card>
              <Table aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Employee</TableCell>
                    <TableCell align="left">Task</TableCell>
                    <TableCell align="center">Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{currentTask && employeeEntity.id && convertToEmployeeIconName(employeeEntity)}</TableCell>
                    <TableCell align="left">{currentTask && currentTask.taskDescription}</TableCell>
                    <TableCell>
                      {currentTask && (
                        <ProgressBar progressBarStyle={{ margin: '0.2px 0.5px 0.5px 0.2px' }} percentage={currentTask.progress} />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <br />
            <div style={{ textAlign: 'right' }}>
              {(currentTaskOwnerPermission(currentTask, currentEmployee) || addProgressTrackPermission(currentEmployee)) && (
                <IconButton onClick={onHadleAddProgressTrack} size="small" title={'Add Progress Track'} aria-label="add">
                  <AddIcon />
                </IconButton>
              )}
            </div>
            <br />
            {!isArrayEmpty(tasksProgressTracks) &&
              currentTask &&
              tasksProgressTracks
                .filter(item => item.taskId === currentTask.id)
                .map((progressTrack, index) => (
                  <div key={progressTrack.id} style={{ margin: '5px' }}>
                    <Card>
                      <div style={{ textAlign: 'right' }}>
                        <IconButton
                          size="small"
                          // tslint:disable
                          onClick={() => handleRemoveProgressTrack(progressTrack)}
                          // tslint:enable
                          title={'Delete Progress Track'}
                          aria-label="delete"
                          disabled={
                            !(deleteProgressTrackPermission(currentEmployee) || currentTaskOwnerPermission(currentTask, currentEmployee))
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            fullWidth
                            label="Date"
                            value={moment(progressTrack.date).format('lll')}
                            className={classes.textField}
                            margin="dense"
                            InputProps={{
                              readOnly: true
                            }}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <ProgressTackDesciption
                            readOnlyField={
                              !(editProgressTrackPermission(currentEmployee) || currentTaskOwnerPermission(currentTask, currentEmployee))
                            }
                            progressTrack={progressTrack}
                          />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          {downloadebleAttachment(progressTrack, [...images]) ? (
                            <DownloadButton
                              deleteFile={props.deleteImage}
                              entity={progressTrack}
                              images={[...images]}
                              downloadFile={downloadFile}
                            />
                          ) : (
                            currentTaskOwnerPermission(currentTask, currentEmployee) && (
                              <UploadButton progressTrack={progressTrack} updateWithAttachment={updateWithAttachment} />
                            )
                          )}
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            // tslint:disable
                            onChange={() => handleStatusChange(progressTrack)}
                            // tslint:enable
                            checked={progressTrack.complete}
                            color="default"
                            disabled={
                              !(editProgressTrackPermission(currentEmployee) || currentTaskOwnerPermission(currentTask, currentEmployee))
                            }
                            value={progressTrack.complete}
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </div>
                ))}
            <br />
            {uploading ? (
              <div style={{ textAlign: 'center' }}>
                <Spinner />
              </div>
            ) : (
              <br />
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = ({ employee, progressTrack, task, image }: IRootState) => ({
  employeeEntity: employee.entity,
  progressTracks: progressTrack.entities,
  currentTask: task.entity,
  images: image.entities,
  uploading: progressTrack.updating || progressTrack.loading
});

const mapDispatchToProps = {
  getEmployee,
  getTasksProgressTracks,
  updateProgressTrack,
  createProgressTrack,
  deleteProgressTrack,
  updateTask,
  getTasks,
  downloadFile,
  deleteImage,
  refreshNCAndReselectCurrentNC
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceTaskForm);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#e6e6e6'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: 0
    },
    title: {
      backgroundColor: '#e6e6e6',
      textAlign: 'center'
    },
    menu: {}
  })
);
