import React from 'react';
import { connect } from 'react-redux';

import {
  updateEntity as updateNotification,
  getCurrentEntities as getCurrentNotifications
} from '../../entities/notification/notification.reducer';
import { getCurrentEntities as getCurrentNonConformances } from '../../entities/non-conformance-details/non-conformance-details.reducer';
import { getCurrentTasks } from '../../entities/task/task.reducer';
import { getCurentProgressTracks } from '../../entities/progress-track/progress-track.reducer';
// tslint:disable
import { Card } from 'reactstrap';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import MarkunreadOutlinedIcon from '@material-ui/icons/MarkunreadOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { IRootState } from 'app/shared/reducers';
import { INotification } from 'app/shared/model/notification.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { ITask } from 'app/shared/model/task.model';
import { IProgressTrack } from 'app/shared/model/progress-track.model';
import { PARENTS } from 'app/config/constants';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}
// tslint:enable
type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      '&:focus > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)'
      }
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular
      }
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2)
      }
    },
    expanded: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit'
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0)
    },
    labelIcon: {
      marginRight: theme.spacing(1)
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1
    }
  })
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles(props);
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;
  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label
      }}
      {...other}
    />
  );
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 300
    }
  })
);
interface INotificationProps extends StateProps, DispatchProps {
  setSelectedParent: Function;
}

const NotificationTreeView = (props: INotificationProps) => {
  const { employeesNotifications, currentNonConformances, currentTasks, currentProgressTrack, setSelectedParent } = props;
  const classes = useStyles(props);

  const read: INotification[] = employeesNotifications ? employeesNotifications.filter(value => value.read) : [];
  const unread: INotification[] = employeesNotifications ? employeesNotifications.filter(val => !val.read) : [];
  const all: INotification[] = employeesNotifications ? [...employeesNotifications] : [];
  const nonConformacePending: INonConformanceDetails[] = currentNonConformances
    ? currentNonConformances.filter(nonConformance => nonConformance.status !== Status.COMPLETE)
    : [];
  const nonConformaceCompleted: INonConformanceDetails[] = currentNonConformances
    ? currentNonConformances.filter(nonConformance => nonConformance.status === Status.COMPLETE)
    : [];
  const tasksPending: ITask[] = currentTasks ? currentTasks.filter(task => task.status !== Status.COMPLETE) : [];
  const tasksCompleted: ITask[] = currentTasks ? currentTasks.filter(task => task.status === Status.COMPLETE) : [];
  const toDoPending: IProgressTrack[] = currentProgressTrack ? currentProgressTrack.filter(toDo => !toDo.complete) : [];
  const toDoCompleted: IProgressTrack[] = currentTasks ? currentProgressTrack.filter(toDo => toDo.complete) : [];

  const handleParentSelection = (parent: string): void => {
    setSelectedParent(parent);
  };

  const handleRefresh = () => {
    props.getCurrentNotifications();
    props.getCurrentNonConformances();
    props.getCurrentTasks();
    props.getCurentProgressTracks();
  };

  return (
    <Card style={{ backgroundColor: 'white', height: '800px', margin: '5px 0 5px 0', padding: '1rem' }}>
      <div style={{ textAlign: 'right' }}>
        <IconButton onClick={handleRefresh} size="small" title={'Refresh'} aria-label="refresh">
          <RefreshIcon />
        </IconButton>
      </div>
      <TreeView
        className={classes.root}
        defaultExpanded={['1', '2', '3', '4']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        <StyledTreeItem nodeId="1" labelText="Notifications" labelIcon={NotificationsNoneOutlinedIcon}>
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.NOTIFICATIONS_UNREAD)}
            // tslint:enable
            nodeId="1.1"
            labelText="Unread"
            labelIcon={MarkunreadOutlinedIcon}
            labelInfo={`${unread.length}`}
            color="#e3742f"
            bgColor="#fcefe3"
          />
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.NOTIFICATIONS_READ)}
            // tslint:enable
            nodeId="1.2"
            labelText="Read"
            labelIcon={DraftsOutlinedIcon}
            labelInfo={`${read.length}`}
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.NOTIFICATIONS_ALL)}
            // tslint:enable
            nodeId="1.3"
            labelText="All"
            labelIcon={NotificationsNoneOutlinedIcon}
            labelInfo={`${all.length}`}
            color="#a250f5"
            bgColor="#f3e8fd"
          />
        </StyledTreeItem>
        <StyledTreeItem nodeId="2" labelText="Non-Conformances" labelIcon={ThumbDownOutlinedIcon}>
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.NON_CONFORMANCES_PENDING)}
            // tslint:enable
            nodeId="2.1"
            labelText="Pending"
            labelIcon={RadioButtonUncheckedOutlinedIcon}
            labelInfo={`${nonConformacePending.length}`}
            color="#e3742f"
            bgColor="#fcefe3"
          />
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.NON_CONFORMANCES_COMPLETE)}
            // tslint:enable
            nodeId="2.2"
            labelText="Complete"
            labelIcon={CheckCircleOutlinedIcon}
            labelInfo={`${nonConformaceCompleted.length}`}
            color="#3c8039"
            bgColor="#e6f4ea"
          />
        </StyledTreeItem>
        <StyledTreeItem nodeId="3" labelText="Tasks" labelIcon={PlaylistAddCheckOutlinedIcon}>
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.TASKS_PENDING)}
            // tslint:enable
            nodeId="3.1"
            labelText="Pending"
            labelIcon={RadioButtonUncheckedOutlinedIcon}
            labelInfo={`${tasksPending.length}`}
            color="#e3742f"
            bgColor="#fcefe3"
          />
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.TASKS_COMPLETE)}
            // tslint:enable
            nodeId="3.2"
            labelText="Complete"
            labelIcon={CheckCircleOutlinedIcon}
            labelInfo={`${tasksCompleted.length}`}
            color="#3c8039"
            bgColor="#e6f4ea"
          />
        </StyledTreeItem>
        <StyledTreeItem nodeId="4" labelText="To-Do List" labelIcon={AssignmentOutlinedIcon}>
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.TO_DO_LIST_PENDING)}
            // tslint:enable
            nodeId="4.1"
            labelText="Pending"
            labelIcon={RadioButtonUncheckedOutlinedIcon}
            labelInfo={`${toDoPending.length}`}
            color="#e3742f"
            bgColor="#fcefe3"
          />
          <StyledTreeItem
            // tslint:disable
            onClick={() => handleParentSelection(PARENTS.TO_DO_LIST_COMPLETE)}
            // tslint:enable
            nodeId="4.2"
            labelText="Complete"
            labelIcon={CheckCircleOutlinedIcon}
            labelInfo={`${toDoCompleted.length}`}
            color="#3c8039"
            bgColor="#e6f4ea"
          />
        </StyledTreeItem>
      </TreeView>
    </Card>
  );
};
const mapStateToProps = ({ notification, nonConformanceDetails, task, progressTrack }: IRootState) => ({
  employeesNotifications: notification.currentEntities,
  currentNonConformances: nonConformanceDetails.curentEntities,
  currentTasks: task.currentEntities,
  currentProgressTrack: progressTrack.curentEntities
});

const mapDispatchToProps = {
  updateNotification,
  getCurrentNotifications,
  getCurrentNonConformances,
  getCurrentTasks,
  getCurentProgressTracks
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationTreeView);
