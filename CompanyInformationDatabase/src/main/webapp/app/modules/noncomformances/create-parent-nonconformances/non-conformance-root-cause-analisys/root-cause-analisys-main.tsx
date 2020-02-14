import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { AntTab, AntTabs, TabPanel } from 'app/shared/layout/custom-components/Tabs/tab';
import { getRootCauseFishboneItems } from '../../../../entities/fish-bone/fish-bone.reducer';
import FiveWhys from './five-whys/five-whys';
import FishBone from './fishbone/fishbone-diagram';
import ProcessAuditCheckList from './process-audit-checklist/process-checklist';
import { isEmpty } from 'app/shared/util/general-utils';

interface IRootCauseProps extends StateProps, DispatchProps {}

export const rootCauseAnalisys = (props: IRootCauseProps) => {
  const { incompleteNonConformance, rootCause } = props;
  useEffect(() => {}, []);
  const [tab, setTab] = React.useState(0);
  const [mainTab, setMainTab] = React.useState(0);
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
    if (!isEmpty(incompleteNonConformance) && newValue === 1) {
    }
  };
  const handleChangeMainTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    props.getRootCauseFishboneItems(incompleteNonConformance.id);
    setMainTab(newValue);
  };
  return (
    <Fragment>
      {incompleteNonConformance.id && !isEmpty(rootCause) && (
        <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
          <AntTabs value={mainTab} indicatorColor="secondary" textColor="secondary" onChange={handleChangeMainTab} aria-label="tabs">
            <AntTab label="Process Audit Checklist" />
            <AntTab label="Root Cause Analysis" />
          </AntTabs>
          <TabPanel value={mainTab} index={0}>
            <ProcessAuditCheckList />
          </TabPanel>
          <TabPanel value={mainTab} index={1}>
            <AntTabs value={tab} indicatorColor="secondary" textColor="secondary" onChange={handleChangeTab} aria-label="tabs">
              <AntTab label="The Five Why's" />
              <AntTab label="Fishbone Diagram" />
              <AntTab label="Corrective Actions" />
            </AntTabs>
            <TabPanel value={tab} index={0}>
              <FiveWhys />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <FishBone />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              In development...
            </TabPanel>
          </TabPanel>
        </Card>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ nonConformanceDetails, actionToBeTaken }: IRootState) => ({
  incompleteNonConformance: nonConformanceDetails.entity,
  rootCause: actionToBeTaken.entity
});

const mapDispatchToProps = { getRootCauseFishboneItems };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(rootCauseAnalisys);
