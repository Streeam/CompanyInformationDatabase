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
        <h4>
          <strong>
            Welcome back, {currentUser && currentUser.firstName ? toTitleCase(currentUser.firstName) : toTitleCase(currentUser.login)}
          </strong>
        </h4>
      </div>
      <AntTabs value={tab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab} aria-label="tabs">
        <AntTab label="Non-Conformaces" />
        <AntTab label="Tasks" />
        <AntTab label="Operators" />
      </AntTabs>
      <TabPanel value={tab} index={0}>
        <NonConformanceDashboard />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        In development...
      </TabPanel>
      <TabPanel value={tab} index={2}>
        In development...
      </TabPanel>
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
