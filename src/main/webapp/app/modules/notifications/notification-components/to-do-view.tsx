import React, { useState, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
// tslint:disable
import Checkbox from '@material-ui/core/Checkbox';
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
import { IProgressTrack } from 'app/shared/model/progress-track.model';

interface IToDoProps extends StateProps, DispatchProps {
  notificationType: string;
}

const ToDoView = (props: IToDoProps) => {
  const classes = useStyles(props);
  const { notificationType, currentToDos } = props;

  const toDoList = (): IProgressTrack[] => {
    switch (notificationType) {
      case PARENTS.TO_DO_LIST_COMPLETE:
        return currentToDos ? currentToDos.filter(val => val.complete) : [];
      case PARENTS.TO_DO_LIST_PENDING:
        return currentToDos ? currentToDos.filter(value => !value.complete) : [];
      default:
        throw new Error('No such notification type!!');
    }
  };
  return currentToDos.length === 0 ? (
    <h5 style={{ textAlign: 'center', lineHeight: '800px' }}> You've read all the messages in your inbox.</h5>
  ) : (
    <Fragment>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Task ID</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {toDoList().map(toDo => (
            <TableRow key={toDo.id} hover>
              <TableCell style={{ minWidth: '100px' }} align="left">
                {toDo.taskId}
              </TableCell>
              <TableCell style={{ width: '70%' }} align="left">
                {toDo.progressDescription}
              </TableCell>
              <TableCell style={{ minWidth: '100px' }} align="right">
                {moment(toDo.date).format('DD MMM')}
              </TableCell>
              <TableCell align="right">
                <Checkbox disabled checked={toDo.complete} inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};
const mapStateToProps = ({ progressTrack }: IRootState) => ({
  currentToDos: progressTrack.curentEntities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoView);

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
