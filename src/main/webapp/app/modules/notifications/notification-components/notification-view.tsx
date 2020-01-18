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
import Checkbox from '@material-ui/core/Checkbox';
import TablePagination from '@material-ui/core/TablePagination';
// tslint:enable
import { Card } from 'reactstrap';

import { updateEntity as updateNotification } from '../../../entities/notification/notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
import { PARENTS } from 'app/config/constants';
import moment from 'moment';

interface INotificationProps extends StateProps, DispatchProps {
  notificationType: string;
  setSelectedParent: Function;
}

const Notifications = (props: INotificationProps) => {
  const classes = useStyles(props);
  const { notificationType, employeesNotifications, setSelectedParent } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const toggleRead = (selectedNotification: INotification) => {
    props.updateNotification({ ...selectedNotification, read: !selectedNotification.read });
    notificationType === PARENTS.NOTIFICATIONS_READ
      ? setSelectedParent(PARENTS.NOTIFICATIONS_READ)
      : setSelectedParent(PARENTS.NOTIFICATIONS_UNREAD);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const notificationList = (): INotification[] => {
    switch (notificationType) {
      case PARENTS.NOTIFICATIONS_ALL:
        return employeesNotifications ? [...employeesNotifications] : [];
      case PARENTS.NOTIFICATIONS_READ:
        return employeesNotifications ? employeesNotifications.filter(value => value.read) : [];
      case PARENTS.NOTIFICATIONS_UNREAD:
        return employeesNotifications ? employeesNotifications.filter(val => !val.read) : [];
      default:
        return employeesNotifications ? employeesNotifications.filter(val => !val.read) : [];
    }
  };
  return employeesNotifications && employeesNotifications.length === 0 ? (
    <h5 style={{ textAlign: 'center', lineHeight: '800px' }}> You don't have any messages in your inbox.</h5>
  ) : notificationList().length === 0 ? (
    <h5 style={{ textAlign: 'center', lineHeight: '800px' }}> You've read all the messages in your inbox.</h5>
  ) : (
    <Fragment>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left" />
            <TableCell align="right" />
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {notificationList()
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(notification => (
              <TableRow key={notification.id} hover>
                <TableCell style={{ minWidth: '150px' }} align="left">
                  {notification.referencedEmployee}
                </TableCell>
                <TableCell style={{ width: '80%' }} align="left">
                  {notification.comment}
                </TableCell>
                <TableCell style={{ minWidth: '100px' }} align="right">
                  {moment(notification.sentDate).format('DD MMM')}
                </TableCell>
                <TableCell style={{ width: '50px' }} align="right">
                  {notificationType !== PARENTS.NOTIFICATIONS_ALL && (
                    <Checkbox
                      title={notificationType === PARENTS.NOTIFICATIONS_READ ? 'Mark as unread' : 'Mark as read'}
                      // tslint:disable
                      onChange={() => toggleRead(notification)}
                      // tslint:enable
                      value={notification.read}
                      checked={notification.read}
                      color="default"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {notificationList().length > 5 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={notificationList().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Fragment>
  );
};
const mapStateToProps = ({ notification }: IRootState) => ({
  employeesNotifications: notification.currentEntities
});

const mapDispatchToProps = { updateNotification };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Notifications));

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
