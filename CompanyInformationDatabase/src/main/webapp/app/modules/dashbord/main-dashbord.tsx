import React from 'react';
import { Card } from 'reactstrap';
import { AntTab, AntTabs, TabPanel } from '../../shared/layout/custom-components/Tabs/tab';
import { connect } from 'react-redux';

import NonConformanceDashboard from './non-conformace-charts';
import { IRootState } from 'app/shared/reducers';
import { toTitleCase } from 'app/shared/util/general-utils';

interface IDashBoardProps extends StateProps, DispatchProps {}

const DashBoard = (props: IDashBoardProps) => {
  const { currentUser } = props;
  const [tab, setTab] = React.useState(0);
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
      <div>
        <h5>
            Welcome back, {currentUser && currentUser.firstName ? toTitleCase(currentUser.firstName) : toTitleCase(currentUser.login)}
        </h5>
      </div>
      <h4><strong>Dashboard</strong></h4>
        <NonConformanceDashboard />
    </Card>
  );
};

const mapStateToProps = ({ authentication, nonConformanceDetails }: IRootState) => ({
  currentUser: authentication.account,
  nonConformances: nonConformanceDetails.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
