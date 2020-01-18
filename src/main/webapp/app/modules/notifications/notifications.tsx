import React, { useState, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
// tslint:disable
import Grid from '@material-ui/core/Grid';
// tslint:enable
import { Card } from 'reactstrap';

import NotificationTreeView from './notifications-treeview';
import NotificationView from './notification-components/notification-view';
import TaskView from './notification-components/task-view';
import NonConformaceView from './notification-components/non-conformace-view';
import ToDoView from './notification-components/to-do-view';
import { PARENTS } from 'app/config/constants';

interface INotificationProps extends StateProps, DispatchProps {}

const Notifications = (props: INotificationProps) => {
  const [selectedParent, setSelectedParent] = useState<string>(PARENTS.NOTIFICATIONS_UNREAD);

  const selectedComponents = () => {
    switch (selectedParent) {
      case PARENTS.NON_CONFORMANCES_COMPLETE:
      case PARENTS.NON_CONFORMANCES_PENDING:
        return <NonConformaceView notificationType={selectedParent} />;
      case PARENTS.TASKS_PENDING:
      case PARENTS.TASKS_COMPLETE:
        return <TaskView notificationType={selectedParent} />;
      case PARENTS.TO_DO_LIST_PENDING:
      case PARENTS.TO_DO_LIST_COMPLETE:
        return <ToDoView notificationType={selectedParent} />;
      case PARENTS.NOTIFICATIONS_ALL:
      case PARENTS.NOTIFICATIONS_READ:
      case PARENTS.NOTIFICATIONS_UNREAD:
      default:
        return <NotificationView notificationType={selectedParent} setSelectedParent={setSelectedParent} />;
    }
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <NotificationTreeView setSelectedParent={setSelectedParent} />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Card style={{ backgroundColor: 'white', height: '800px', margin: '5px 0 5px 0', padding: '1rem' }}>{selectedComponents()}</Card>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = ({ notification, nonConformanceDetails, task, progressTrack }: IRootState) => ({
  employeesNotifications: notification.currentEntities,
  currentNonConformances: nonConformanceDetails.curentEntities,
  currentTasks: task.currentEntities,
  currentProgressTrack: progressTrack.curentEntities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Notifications));
