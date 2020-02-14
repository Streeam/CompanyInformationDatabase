import React, { useState, Fragment } from 'react';
import { openFile } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand, Tooltip } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// tslint:disable
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
// tslint:enable
import { unreadNotificationsNumber } from '../../../shared/util/entity-utils';
import { IEmployee } from 'app/shared/model/employee.model';
import { INotification } from 'app/shared/model/notification.model';
import { isEmpty } from 'app/shared/util/general-utils';

export const BrandIcon = props => {
  const { currentCompany } = props;
  return (
    <div className="brand-icon">
      {!isEmpty(currentCompany) && currentCompany.companyLogo ? (
        <div>
          <img
            src={`data:${currentCompany.companyLogoContentType};base64,${currentCompany.companyLogo}`}
            style={{
              maxHeight: '50px',
              maxWidth: '100px',
              borderRadius: '5%',
              objectFit: 'scale-down'
            }}
          />
        </div>
      ) : (
        <div>
          <img src={`content/images/company-logo.png`} style={{ maxHeight: '70px', maxWidth: '160px' }} />
        </div>
      )}
    </div>
  );
};

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon currentCompany={props.currentCompany} />
    <span className="brand-title">Company Information Database</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <span>Home</span>
    </NavLink>
  </NavItem>
);

interface INotificationsProps {
  currentNotifications: INotification[];
}

export const Notifications = (props: INotificationsProps) => {
  const classes = useStyles(props);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { currentNotifications } = props;

  const notificationSize = unreadNotificationsNumber(currentNotifications && currentNotifications);

  const toggle = () => {
    setTooltipOpen(!tooltipOpen);
  };
  return (
    <Fragment>
      <div id="notification">
        <NavItem>
          <NavLink tag={Link} to="/notifications" className="d-flex align-items-center">
            <Badge color="secondary" variant="dot" invisible={notificationSize === 0} className={classes.margin}>
              <NotificationsIcon fontSize={'small'} />
            </Badge>
          </NavLink>
        </NavItem>
      </div>
      <Tooltip placement="bottom" isOpen={tooltipOpen} target="notification" toggle={toggle}>
        <span>{notificationSize === 0 ? 'You dont have unread notifications' : 'You have unread notifications'}</span>
      </Tooltip>
    </Fragment>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(0),
      padding: theme.spacing(0)
    }
  })
);
