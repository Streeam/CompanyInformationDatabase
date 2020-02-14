import React, { useEffect, useState, Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Products from './products/view-products-grid/products-grid';
import { Card, Button } from 'reactstrap';
import { AntTab, AntTabs, TabPanel } from 'app/shared/layout/custom-components/Tabs/tab';
import Customers from './customers/view-customer-grid/customer-grid';

interface IProductsProps extends RouteComponentProps<{ url: string }> {}

export const companyData = (props: IProductsProps) => {
  const { match } = props;

  useEffect(() => {}, []);
  const [tab, setTab] = React.useState(0);
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  return (
    <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
      <AntTabs value={tab} indicatorColor="secondary" textColor="secondary" onChange={handleChangeTab} aria-label="tabs">
        <AntTab label="Products" />
        <AntTab label="Customers" />
        <AntTab label="Suppliers" />
      </AntTabs>
      <TabPanel value={tab} index={0}>
        <Products {...props} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Customers setTab={setTab} {...props} />
      </TabPanel>
      <TabPanel value={tab} index={2} />
    </Card>
  );
};

export default companyData;
