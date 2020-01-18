import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

import SelectEmployee from '../../../shared/layout/custom-components/select/select-single-employee';
// tslint:disable
import 'react-datepicker/dist/react-datepicker.css';
import { ITask } from 'app/shared/model/task.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateRange from './non-conformance-date-range';
import moment, { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import Paper from '@material-ui/core/Paper';
import Transition from '../../../shared/layout/custom-components/transition/transition';
// tslint:enable
import { createEntity as createTask, updateEntity as updateTask } from '../../../entities/task/task.reducer';
import { getEntity as getEmployee } from '../../../entities/employee/employee.reducer';
import DropZone from '../../../shared/layout/custom-components/dropzone/dropzone';
import { isEmpty } from 'app/shared/util/general-utils';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { isNull } from 'util';

interface INonconformanceInternalTaskProps extends StateProps, DispatchProps {
  handleClose;
  taskDialogOpen: boolean;
  nonConconformanceEntity: INonConformanceDetails;
  currentTask: ITask;
  attachmentName: string;
  selectNonConformanceAfterUpdate: Function;
}

export const internalNonConformanceTaskForm = (props: INonconformanceInternalTaskProps) => {
  const {
    handleClose,
    taskDialogOpen,
    nonConconformanceEntity,
    currentTask,
    employeeEntity,
    attachmentName,
    progressTracks,
    selectNonConformanceAfterUpdate
  } = props;
  React.useEffect(() => {
    if (currentTask) {
      props.getEmployee(currentTask.employeeId);
    }
  }, []);
  const classes = useStyles(props);
  const [priorityToSave, setPriority] = useState<Priority>(null);
  const [from, setFrom] = useState<Moment>(null);
  const [to, setTo] = useState<Moment>(null);
  const [taskDescriptionValue, setTaskDescriptionValue] = useState<string>(null);
  const [dateRangeIsInvalid, setDateRangeIsInvalid] = useState(false);
  const [noEmployeeSelected, setNoEmployeeSelected] = useState(false);
  const [descriptionValidation, setDescriptionValidation] = useState(false);
  const [statusToSave, setStatus] = useState<Status>(null);
  const [employee, setEmployee] = useState<IEmployee>(null);
  const [attachement, setAttachement] = useState<File>(null);
  const assignPriority = () => (priorityToSave ? priorityToSave : currentTask ? currentTask.priority : Priority.LOW);
  const assignStatus = () => (statusToSave ? statusToSave : currentTask ? currentTask.status : Status.PENDING);
  const assignDescription = () => (taskDescriptionValue ? taskDescriptionValue : currentTask ? currentTask.taskDescription : '');
  const assignEmployee = () => (employee ? employee : employeeEntity.id ? employeeEntity : null);
  const onHadleAddTask = () => {
    if (!taskDescriptionValue && isNull(currentTask)) {
      setDescriptionValidation(true);
    } else if (!employee && !currentTask) {
      setNoEmployeeSelected(true);
    } else if ((!from || !to) && isNull(currentTask)) {
      setDateRangeIsInvalid(true);
    } else {
      setDateRangeIsInvalid(false);
      setNoEmployeeSelected(false);
      setDescriptionValidation(false);
      const entityTask: ITask = {
        ...currentTask,
        taskDescription: assignDescription(),
        startDate: from ? from : moment(currentTask.startDate.toString()),
        endDate: to ? to : moment(currentTask.endDate.toString()),
        progress: assignStatus() === Status.COMPLETE ? 100 : currentTask && currentTask.progress !== 100 ? currentTask.progress : 0,
        status: assignStatus(),
        priority: assignPriority(),
        employeeId: currentTask ? currentTask.employeeId : employee.id,
        nonconformanceId: nonConconformanceEntity.id ? nonConconformanceEntity.id : currentTask.nonconformanceId
      };
      if (currentTask) {
        props.updateTask(entityTask, attachement, nonConconformanceEntity, selectNonConformanceAfterUpdate);
      } else {
        props.createTask(entityTask, attachement, nonConconformanceEntity, selectNonConformanceAfterUpdate);
      }
      handleExit();
    }
  };

  const handleExit = () => {
    setAttachement(null);
    setTaskDescriptionValue(null);
    setStatus(null);
    setPriority(null);
    setFrom(null);
    setTo(null);
    setEmployee(null);
    handleClose();
  };

  const handleTaskDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value ? setDescriptionValidation(false) : setDescriptionValidation(true);
    setTaskDescriptionValue(event.target.value);
  };
  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case Priority.LOW:
        setPriority(Priority.LOW);
        break;
      case Priority.MEDIUM:
        setPriority(Priority.MEDIUM);
        break;
      case Priority.HIGH:
        setPriority(Priority.HIGH);
        break;
      case Priority.URGENT:
        setPriority(Priority.URGENT);
        break;
      default:
        throw new Error('You should not get here!!');
    }
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case Status.COMPLETE:
        setStatus(Status.COMPLETE);
        break;
      case Status.NEED_HELP:
        setStatus(Status.NEED_HELP);
        break;
      case Status.STUCK:
        setStatus(Status.STUCK);
        break;
      case Status.PENDING:
        setStatus(Status.PENDING);
        break;
      default:
        throw new Error('You should not get here!!');
    }
  };

  const areAllProgressTracksCompleted = (): boolean => {
    return progressTracks.find(item => !item.complete) === undefined;
  };

  return (
    <Dialog TransitionComponent={Transition} disableBackdropClick disableEscapeKeyDown open={taskDialogOpen} onClose={handleExit}>
      {currentTask ? <DialogTitle>Edit Task {currentTask.id}</DialogTitle> : <DialogTitle>Create a new Task</DialogTitle>}
      <DialogContent>
        <form className={classes.container} noValidate autoComplete="off">
          <div style={{ width: '560px' }}>
            <TextField
              defaultValue={currentTask ? currentTask.taskDescription : ''}
              required
              fullWidth
              error={descriptionValidation}
              helperText={descriptionValidation && 'You must add a task description.'}
              id="outlined-multiline-static"
              label="Task Description"
              multiline
              rows="2"
              onChange={handleTaskDescription}
              className={classes.textFieldDescription}
              margin="dense"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              id="outlined-select-priority"
              select
              label="Priority"
              className={classes.textField}
              value={assignPriority()}
              onChange={handlePriorityChange}
              margin="dense"
              variant="outlined"
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
            >
              <MenuItem value="LOW">LOW</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="HIGH">HIGH</MenuItem>
              <MenuItem value="URGENT">URGENT</MenuItem>
            </TextField>
            {!(progressTracks.length > 0 && areAllProgressTracksCompleted()) && currentTask && (
              <TextField
                required
                fullWidth
                id="outlined-select-status"
                select
                label="Staus"
                className={classes.textField}
                value={assignStatus()}
                onChange={handleStatusChange}
                margin="dense"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                <MenuItem disabled={areAllProgressTracksCompleted()} value="NEED_HELP">
                  Need Help
                </MenuItem>
                <MenuItem disabled={areAllProgressTracksCompleted()} value="STUCK">
                  Stuck
                </MenuItem>
                <MenuItem disabled={progressTracks.length > 0} value="PENDING">
                  Pending
                </MenuItem>
                <MenuItem disabled={progressTracks.length > 0} value="COMPLETE">
                  Complete
                </MenuItem>
              </TextField>
            )}
            <SelectEmployee
              employee={currentTask ? assignEmployee() : null}
              setEmployee={setEmployee}
              noEmployeeSelected={noEmployeeSelected}
              setNoEmployeeSelected={setNoEmployeeSelected}
            />
            <br />
            <Paper>
              <DateRange
                dateRangeIsInvalid={dateRangeIsInvalid}
                setDateRangeIsInvalid={setDateRangeIsInvalid}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                currentTask={currentTask}
              />
            </Paper>
            <Paper>
              <DropZone fileName={attachmentName} setAttachement={setAttachement} />
            </Paper>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button size="sm" onClick={handleExit} color="secondary">
          Cancel
        </Button>
        <Button size="sm" onClick={onHadleAddTask} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ employee, progressTrack }: IRootState) => ({
  employeeEntity: employee.entity,
  progressTracks: progressTrack.entities
});

const mapDispatchToProps = { createTask, updateTask, getEmployee };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceTaskForm);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '550px'
    },
    textFieldDescription: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '550px'
    },
    container: {},
    menu: {}
  })
);
