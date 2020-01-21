import React, { useEffect, useState, Fragment } from 'react';
import { Spinner } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import TaskForm from '../create-nonconformance-tasks/non-conformance-task-dialog-form';
import ProgressTrackDialog from '../create-nonconformance-tasks/progress-tracks/non-conformance-progress-track-dialog';
// tslint:disable
import AddIcon from '@material-ui/icons/Add';
import { ITask } from 'app/shared/model/task.model';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles, Theme, lighten, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
// tslint:enable
import moment from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { deleteEntity as deleteTask, getEntities as getTasks, getEntity as getTask } from '../../../entities/task/task.reducer';
import { getEntity as getEmployee, getAllEntities as getAllEmployees } from '../../../entities/employee/employee.reducer';
import { getTasksProgressTracks } from '../../../entities/progress-track/progress-track.reducer';
import { downloadFile, getEntities as getAllImages, deleteEntity as deleteAttachment } from '../../../entities/image/image.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { IImage } from 'app/shared/model/image.model';
import {
  convertToEmployeeIconName,
  convertFromIdToEmployee,
  priorityStyle,
  statusStyle,
  downloadebleAttachment,
  viewTasksPermission,
  editTasksPermission,
  deleteTasksPermission,
  raiseTaskPermission,
  viewProgressTrackPermission
} from '../../../shared/util/entity-utils';
import ProgressBar from 'app/shared/layout/custom-components/progress-bar/progress-bar';
import DownloadButton from '../../../shared/layout/custom-components/dropzone/download-button';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { isNull } from 'util';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { Status } from 'app/shared/model/enumerations/status.model';

interface INonconformanceDelegateTasksProps extends StateProps, DispatchProps {
  nonConconformanceEntity: INonConformanceDetails;
  selectNonConformanceAfterUpdate: (nonConconformance: INonConformanceDetails) => void;
  nonConformaceOwnerPermission: (nonconformance: INonConformanceDetails, employee: IEmployee) => boolean;
}
export const nonConformanceDelegateTasks = (props: INonconformanceDelegateTasksProps) => {
  const {
    allTasks,
    nonConconformanceEntity,
    employees,
    images,
    currentEmployee,
    selectNonConformanceAfterUpdate,
    nonConformaceOwnerPermission,
    internalNonConformances,
    clientNonConformances,
    loading
  } = props;
  useEffect(() => {
    if (isArrayEmpty(images)) {
      props.getAllImages();
    }
    if (isArrayEmpty(allTasks)) {
      props.getTasks();
    }
    if (isArrayEmpty(employees)) {
      props.getAllEmployees();
    }
  }, []);

  const classes = useStyles(props);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [progressTrackDialogOpen, setProgressTrackDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask>(null);
  const [attachmentName, setAttachmentName] = useState<string>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openNoOccurrancesSnackbar, setOpenNoOccurrancesSnackbar] = useState(false);
  const [openNoPermissionSnackbar, setOpenNoPermissionSnackbar] = useState(false);

  const childNonConformances: IInternalNonConformance[] | IClientNonConformance[] =
    !isEmpty(nonConconformanceEntity) &&
    (nonConconformanceEntity.nonconformance === Nonconformance.INTERNAL ? [...internalNonConformances] : [...clientNonConformances]);
  const handleAddTask = () => {
    if (nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) || raiseTaskPermission(currentEmployee)) {
      if (!isArrayEmpty(childNonConformances)) {
        setCurrentTask(null);
        setAttachmentName(null);
        setTaskDialogOpen(true);
      } else {
        setOpenNoOccurrancesSnackbar(true);
      }
    } else {
      setOpenNoPermissionSnackbar(true);
    }
  };
  const handleDialogTaskClose = () => {
    setTaskDialogOpen(false);
  };
  const handleDialogProgressTrackClose = () => {
    setProgressTrackDialogOpen(false);
  };
  const currentTaskOwnerPermission = (task: ITask, employee: IEmployee): boolean =>
    !isNull(employee) ? task.employeeId === employee.id : false;
  const dynamicTasks: ITask[] = !isEmpty(nonConconformanceEntity)
    ? allTasks.filter(
        item =>
          item.nonconformanceId === nonConconformanceEntity.id &&
          (nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
            viewTasksPermission(currentEmployee) ||
            currentTaskOwnerPermission(item, currentEmployee))
      )
    : allTasks.filter(value => viewTasksPermission(currentEmployee) || currentTaskOwnerPermission(value, currentEmployee));
  const handleDeleteTask = (task: ITask, attachment: IImage): void => {
    props.deleteTask(task, nonConconformanceEntity, selectNonConformanceAfterUpdate);
    !isEmpty(attachment) && props.deleteAttachment(attachment.id);
  };
  const handleEditTask = (task: ITask, attachment: IImage): void => {
    setCurrentTask(task);
    setTaskDialogOpen(true);
    if (attachment) {
      setAttachmentName(attachment.name);
    } else {
      setAttachmentName(null);
    }
    if (task) {
      props.getEmployee(task.employeeId);
    }
    props.getTasksProgressTracks(task.id);
  };
  const download = (image: IImage) => {
    props.downloadFile(image.name, image.id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProgressTrack = (task: ITask) => (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
    if (nonConconformanceEntity) {
      props.getEmployee(task.employeeId);
      props.getTasksProgressTracks(task.id);
      props.getTask(task.id);
      setCurrentTask(task);
      setProgressTrackDialogOpen(true);
    }
  };

  return (
    <Card>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          {nonConconformanceEntity ? (
            <h5 style={{ textAlign: 'center', padding: '5px 0 0 0' }}>Tasks For Non-Conformace {nonConconformanceEntity.id}</h5>
          ) : (
            <h5 style={{ textAlign: 'center', padding: '5px 0 0 0' }}>All Tasks</h5>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {nonConconformanceEntity && (
            <div style={{ textAlign: 'right' }}>
              <IconButton size="small" title={'Add Task'} onClick={handleAddTask} aria-label="edit" className={classes.margin}>
                <AddIcon />
              </IconButton>
            </div>
          )}
        </Grid>
      </Grid>
      <div style={{ textAlign: 'right' }}>
        <br />
        {dynamicTasks && dynamicTasks.length > 0 ? (
          <Fragment>
            <Table className={classes.table} aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell align="left">NC</TableCell>
                  <TableCell align="left">Employee</TableCell>
                  <TableCell align="center">Priority</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Start Date</TableCell>
                  <TableCell align="center">Due Date</TableCell>
                  <TableCell align="center">Progress</TableCell>
                  {nonConconformanceEntity && <TableCell align="center">Attachment</TableCell>}
                  {nonConconformanceEntity && <TableCell align="right" />}
                </TableRow>
              </TableHead>
              <TableBody>
                {dynamicTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
                  <TableRow key={index} hover>
                    <TableCell component="th" scope="row">
                      {task.taskDescription}
                    </TableCell>
                    <TableCell align="left">{task.nonconformanceId}</TableCell>
                    <TableCell align="left">
                      {convertToEmployeeIconName(convertFromIdToEmployee(task.employeeId, [...employees]))}
                    </TableCell>
                    <TableCell align="center">{priorityStyle(task.priority)}</TableCell>
                    <TableCell align="center">{statusStyle(task.status)}</TableCell>
                    <TableCell align="center">{moment(task.startDate).format('ll')}</TableCell>
                    <TableCell align="center">{moment(task.endDate).format('ll')}</TableCell>
                    <TableCell
                      style={{ minWidth: '150px' }}
                      onClick={
                        (!isEmpty(nonConconformanceEntity) && nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee)) ||
                        viewProgressTrackPermission(currentEmployee) ||
                        currentTaskOwnerPermission(task, currentEmployee)
                          ? handleProgressTrack(task)
                          : () => {}
                      }
                      align="center"
                    >
                      <ProgressBar percentage={task.progress} />
                    </TableCell>
                    <TableCell align="center">
                      {downloadebleAttachment(task, [...images]) && nonConconformanceEntity
                        ? (nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
                            editTasksPermission(currentEmployee) ||
                            currentTaskOwnerPermission(task, currentEmployee)) && (
                            <DownloadButton
                              deleteFile={props.deleteAttachment}
                              entity={task}
                              images={[...images]}
                              downloadFile={downloadFile}
                            />
                          )
                        : null}
                    </TableCell>
                    <TableCell align="right">
                      {nonConconformanceEntity &&
                        (nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
                          editTasksPermission(currentEmployee)) && (
                          <Fragment>
                            <IconButton
                              size="small"
                              // tslint:disable-next-line
                              onClick={() => handleEditTask(task, downloadebleAttachment(task, [...images]))}
                              title={'Edit Task'}
                              aria-label="add"
                              className={classes.margin}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            {(nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
                              deleteTasksPermission(currentEmployee)) && (
                              <IconButton
                                size="small"
                                // tslint:disable-next-line
                                onClick={() => handleDeleteTask(task, downloadebleAttachment(task, [...images]))}
                                title={'Remove Task'}
                                aria-label="remove"
                                className={classes.margin}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Fragment>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {dynamicTasks.length > 5 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dynamicTasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
            {loading && (
              <div style={{ textAlign: 'center' }}>
                <Spinner />
              </div>
            )}
          </Fragment>
        ) : (
          <h5 style={{ textAlign: 'center' }}>No tasks to show</h5>
        )}
      </div>
      <TaskForm
        currentTask={currentTask}
        taskDialogOpen={taskDialogOpen}
        handleClose={handleDialogTaskClose}
        nonConconformanceEntity={nonConconformanceEntity && nonConconformanceEntity}
        attachmentName={attachmentName}
        selectNonConformanceAfterUpdate={selectNonConformanceAfterUpdate}
      />
      <ProgressTrackDialog
        open={progressTrackDialogOpen}
        handleClose={handleDialogProgressTrackClose}
        selectNonConformanceAfterUpdate={selectNonConformanceAfterUpdate}
        nonConconformanceEntity={nonConconformanceEntity && nonConconformanceEntity}
        currentEmployee={currentEmployee}
        currentTaskOwnerPermission={currentTaskOwnerPermission}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`No-Occurrances-snackbar`}
        open={openNoOccurrancesSnackbar}
        // tslint:disable-next-line
        onClose={() => setOpenNoOccurrancesSnackbar(false)}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">At least one Occurrance is required in order to start assigning Tasks!</span>}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`No-Permission-snackbar`}
        open={openNoPermissionSnackbar}
        // tslint:disable-next-line
        onClose={() => setOpenNoPermissionSnackbar(false)}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">At least one Occurrance is required in order to start assigning Tasks!</span>}
      />
    </Card>
  );
};

const mapStateToProps = ({ employee, image, task, progressTrack, internalNonConformance, clientNonConformance }: IRootState) => ({
  employees: employee.companysEntities,
  currentEmployee: employee.currentEmployeeEntity,
  images: image.entities,
  allTasks: task.entities,
  internalNonConformances: internalNonConformance.entitiesOfNoconformanceDetails,
  clientNonConformances: clientNonConformance.entitiesOfNoconformanceDetails,
  progressTracks: progressTrack.entities,
  loading: task.loading || task.updating || image.loading || image.updating
});

const mapDispatchToProps = {
  deleteTask,
  downloadFile,
  getAllImages,
  getTasks,
  getTask,
  deleteAttachment,
  getEmployee,
  getAllEmployees,
  getTasksProgressTracks
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nonConformanceDelegateTasks);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    table: {
      minWidth: 650
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20
    },
    column: {
      flexBasis: '100%'
    },
    details: {
      alignItems: 'center'
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2)
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    margin: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  })
);
