import React, { useState, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
// tslint:disable
import { makeStyles, Theme, lighten, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// tslint:enable

import { PARENTS } from 'app/config/constants';
import { Status } from 'app/shared/model/enumerations/status.model';
import { isArrayEmpty, toTitleCase } from 'app/shared/util/general-utils';
import moment from 'moment';
import { ITask } from 'app/shared/model/task.model';

interface ITaskProps extends StateProps, DispatchProps {
  notificationType: string;
}

const Tasks = (props: ITaskProps) => {
  const classes = useStyles(props);
  const { notificationType, currentTasks } = props;

  const taskList = (): ITask[] => {
    switch (notificationType) {
      case PARENTS.TASKS_COMPLETE:
        return currentTasks ? currentTasks.filter(val => val.status === Status.COMPLETE) : [];
      case PARENTS.TASKS_PENDING:
        return currentTasks ? currentTasks.filter(value => value.status !== Status.COMPLETE) : [];
      default:
        throw new Error('No such notification type!!');
    }
  };
  return currentTasks.length === 0 ? (
    <h5 style={{ textAlign: 'center', lineHeight: '800px' }}> You've read all the messages in your inbox.</h5>
  ) : (
    <Fragment>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Non-Conformace ID</TableCell>
            <TableCell align="left">Task</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Priority</TableCell>
            <TableCell align="right">Progress</TableCell>
            <TableCell align="center">Submitted</TableCell>
            <TableCell align="right">Deadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskList().map(task => (
            <TableRow key={task.id} hover>
              <TableCell style={{ minWidth: '180px' }} align="left">
                {task.nonconformanceId}
              </TableCell>
              <TableCell style={{ width: '70%' }} align="left">
                {task.taskDescription}
              </TableCell>
              <TableCell align="left">{toTitleCase(task.status)}</TableCell>
              <TableCell align="left">{toTitleCase(task.priority)}</TableCell>
              <TableCell align="right">{task.progress} %</TableCell>
              <TableCell align="right">{moment(task.startDate).format('DD MMM')}</TableCell>
              <TableCell align="right">{moment(task.endDate).format('DD MMM')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};
const mapStateToProps = ({ task }: IRootState) => ({
  currentTasks: task.currentEntities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650
    },
    column: {
      flexBasis: '100%'
    }
  })
);
