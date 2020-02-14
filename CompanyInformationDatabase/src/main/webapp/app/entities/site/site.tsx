import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {
  getEntities as getSites,
  createEntity as createSites,
  updateEntity as updateSites,
  deleteEntity as deleteSites
} from './site.reducer';
import {
  getEntities as getDepartments,
  createEntity as createDepartment,
  updateEntity as updateDepartment,
  deleteEntity as deleteDepartment
} from '../department/department.reducer';
import MaterialTable from 'material-table';
import { IDepartment } from 'app/shared/model/department.model';
// tslint:disable
import Grid from '@material-ui/core/Grid';
// tslint:enable
export interface ISiteProps extends StateProps, DispatchProps {}

export const Site = (props: ISiteProps) => {
  useEffect(() => {
    props.getSites();
    props.getDepartments();
  }, []);

  const { siteList, departmentList } = props;
  const modifiedDepartmentList = (): IDepartment[] => {
    const list = [];
    const element = {};
    if (departmentList && departmentList.length > 0) {
      departmentList.forEach(item => {
        element['id'] = item.id;
        element['department'] = item.department;
        element['site'] = item.site.id;
        list.push({ ...element });
      });
    }
    return list;
  };

  const allocateSites = (): {} => {
    const sites = {};
    if (siteList && siteList.length > 0) {
      siteList.forEach(site => (sites[site.id] = site.site));
    }
    return sites;
  };
  const siteColumns = [{ title: 'Site', field: 'site' }];
  const departmentColumns = [{ title: 'Department', field: 'department' }, { title: 'Site', field: 'site', lookup: allocateSites() }];
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <MaterialTable
              title="Sites"
              columns={siteColumns}
              data={[...siteList]}
              editable={{
                onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                    props.createSites(newData);
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    props.updateSites(newData);
                    resolve();
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    props.deleteSites(oldData.id);
                    resolve();
                  })
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <MaterialTable
              title="Department"
              columns={departmentColumns}
              data={modifiedDepartmentList()}
              editable={{
                onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                    const departmentToSave = {
                      department: newData.department,
                      site: siteList.filter(site => site.id === Number(newData.site))[0]
                    };
                    props.createDepartment(departmentToSave);
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    const departmentToSave = {
                      id: newData.id,
                      department: newData.department,
                      site: siteList.filter(site => site.id === Number(newData.site))[0]
                    };
                    props.updateDepartment(departmentToSave);
                    resolve();
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    props.deleteDepartment(oldData.id);
                    resolve();
                  })
              }}
            />
          </Card>
        </Grid>
      </Grid>
      <br />
    </Fragment>
  );
};

const mapStateToProps = ({ site, department }: IRootState) => ({
  siteList: site.entities,
  departmentList: department.entities
});

const mapDispatchToProps = {
  getSites,
  updateSites,
  createSites,
  deleteSites,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Site);
