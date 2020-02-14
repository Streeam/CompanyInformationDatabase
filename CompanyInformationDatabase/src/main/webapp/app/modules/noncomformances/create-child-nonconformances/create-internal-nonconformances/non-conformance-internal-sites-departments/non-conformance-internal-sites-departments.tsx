import React, { useEffect, useState, Fragment } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { isEmpty } from 'app/shared/util/general-utils';
import { IDepartment } from 'app/shared/model/department.model';
import { ISite } from 'app/shared/model/site.model';

// tslint:disable
import Card from '@material-ui/core/Card';
// tslint:enable

interface INonconformanceInternalProps extends StateProps, DispatchProps {
  departmentSeletedValidation: boolean;
  setDepartmentSelectedValidation: Function;
  updateInternalNonConformance: Function;
  siteSeletedValidation: boolean;
  setSiteSeletedValidation: Function;
}

export const internalNonConformanceForm = (props: INonconformanceInternalProps) => {
  const {
    allSites,
    allDepartments,
    updateInternalNonConformance,
    incompleteInternalNonConformance,
    companies,
    siteSeletedValidation,
    setSiteSeletedValidation,
    departmentSeletedValidation,
    setDepartmentSelectedValidation,
    internalLoading
  } = props;
  useEffect(() => {
    // tslint:disable
    console.log('Step Three - Sites & Departments');
    // tslint:enable
  }, []);
  const [sitesSeleted, setSitesSelected] = useState(null);
  const [departmentsSeleted, setDepartmentsSeleted] = useState(null);
  const [sites, setSites] = useState<ISite[]>(null);
  const [departments, setDepartments] = useState<IDepartment[]>(null);
  const handleSelectSite = (site: ISite) => (): void => {
    if ((!sites || sites.length === 0) && (allSites && allSites.length > 0) && !sitesSeleted) {
      const firstTimeSelectedList = [];
      allSites.forEach(item => {
        const siteInitialSelected = site.id === item.id;
        firstTimeSelectedList.push({ id: item.id, site: item.site, selected: siteInitialSelected });
      });
      setSitesSelected(firstTimeSelectedList);
    }
    if (sitesSeleted && sitesSeleted.length !== 0) {
      const currentSiteIndex = sitesSeleted.findIndex(value => value.id === site.id);
      const selectedList = [];
      sitesSeleted.forEach(item => selectedList.push({ id: item.id, site: item.site, selected: false }));
      selectedList[currentSiteIndex] = { id: site.id, site: site.site, selected: true };
      setSitesSelected(selectedList);
    }
    setSites(previousSite => {
      if (previousSite && previousSite[0] && previousSite[0].id !== site.id) {
        setDepartments([]);
        resetAllDepartmentsSelection(site);
      }
      return [site];
    });
    updateInternalNonConformance({ sites: [site], departments: [] });
    setSiteSeletedValidation(false);
  };

  const resetAllDepartmentsSelection = (site: ISite) => {
    const siteSelectedList = [];
    allSites.forEach(item => {
      const siteInitialSelected = site.id === item.id;
      siteSelectedList.push({ id: item.id, site: item.site, selected: siteInitialSelected });
    });
    const departmentsSeletedCopy = departmentsSeleted ? [...departmentsSeleted] : siteSelectedList;
    departmentsSeletedCopy.forEach(item => {
      item.selected = false;
    });
    setDepartmentsSeleted(departmentsSeletedCopy);
  };

  const updateDepartments = (departmentsToUpdate: IDepartment[]): void => {
    updateInternalNonConformance({ departments: departmentsToUpdate });
  };

  const handleSelectDepartment = (department: IDepartment) => (): void => {
    if ((!departments || departments.length === 0) && (allDepartments && allDepartments.length > 0) && !departmentsSeleted) {
      const firstTimeSelectedList = [];

      allDepartments.forEach(item => {
        const departmentInitialSelected = department.id === item.id;
        firstTimeSelectedList.push({ id: item.id, department: item.department, selected: departmentInitialSelected });
      });
      setDepartmentsSeleted(firstTimeSelectedList);
      setDepartmentSelectedValidation(false);
      setDepartments([department]);
      updateDepartments([department]);
    }
    if (departmentsSeleted && departmentsSeleted.length !== 0) {
      const selectedDepartment = departmentsSeleted.filter(departmentValue => departmentValue.id === department.id)[0];
      const currentDepartmentIndex = departmentsSeleted.findIndex(value => value.id === department.id);

      const selectedList = [...departmentsSeleted];
      selectedList[currentDepartmentIndex] = {
        id: department.id,
        department: department.department,
        selected: selectedDepartment ? !selectedDepartment.selected : false
      };
      setDepartmentsSeleted(selectedList);
      const departmentsToSave: IDepartment[] = [];
      allDepartments.forEach(item => {
        selectedList.forEach(element => {
          if (item.id === element.id && element.selected) {
            departmentsToSave.push(item);
          }
        });
      });
      setDepartments(departmentsToSave);
      updateDepartments(departmentsToSave);
    }
  };

  const allocateSites = (): ISite[] => {
    if (!isEmpty(incompleteInternalNonConformance)) {
      return { ...incompleteInternalNonConformance }.sites;
    } else if (sites) {
      return sites;
    } else {
      return [];
    }
  };
  const allocateDepartments = (): IDepartment[] => {
    if (!isEmpty(incompleteInternalNonConformance) && incompleteInternalNonConformance.departments.length > 0) {
      return { ...incompleteInternalNonConformance }.departments;
    } else if (departments) {
      return departments;
    } else {
      return [];
    }
  };

  const showSiteDepartments = () => {
    const selectedSite = sitesSeleted ? sitesSeleted.filter(site => site.selected)[0] : allocateSites()[0];
    let siteDepartments = [];
    if (selectedSite) {
      siteDepartments = allDepartments.filter(departmentValue => departmentValue.site.id === selectedSite.id);
    }
    return (
      <Fragment>
        <br />
        <h5>Departments*</h5>
        <br />
        <ButtonGroup>
          {siteDepartments && siteDepartments.length > 0 ? (
            siteDepartments.map((department, index) => (
              <Button
                key={department.id}
                id={department.id}
                size="sm"
                color="secondary"
                onClick={handleSelectDepartment(department)}
                active={
                  departmentsSeleted && departmentsSeleted.length > 0 && departmentsSeleted.filter(item => item.id === department.id)[0]
                    ? departmentsSeleted.filter(item => item.id === department.id)[0].selected
                    : allocateDepartments().length > 0
                    ? allocateDepartments().filter(item => item.id === department.id).length > 0
                    : false
                }
                disabled={internalLoading}
              >
                {department.department}
              </Button>
            ))
          ) : (
            <p>No Departments</p>
          )}
        </ButtonGroup>
      </Fragment>
    );
  };
  const showSites = (
    <ButtonGroup>
      {allSites && allSites.length > 0 ? (
        allSites.map((site, index) => (
          <Button
            key={index}
            id={site.id}
            size="sm"
            color="secondary"
            onClick={handleSelectSite(site)}
            active={
              sitesSeleted && sitesSeleted.length > 0
                ? sitesSeleted[index].selected
                : allocateSites().filter(item => item.id === site.id).length > 0
            }
            disabled={internalLoading}
          >
            {site.site}
          </Button>
        ))
      ) : (
        <p>No Sites</p>
      )}
    </ButtonGroup>
  );

  return (
    <Fragment>
      <Card style={{ width: '100%', margin: '10px 0 10px 0', padding: '1rem' }}>
        <h5>Site*</h5>
        <br />
        {showSites}
        {siteSeletedValidation && <p style={{ color: 'red', padding: '5px' }}>You need to select a site!!</p>}
        <br />
        {showSiteDepartments()}
        {departmentSeletedValidation && <p style={{ color: 'red', padding: '5px' }}>You need to select at least one department!</p>}
      </Card>
    </Fragment>
  );
};

const mapStateToProps = ({
  site,
  department,
  nonConformanceDetails,
  internalNonConformance,
  company,
  extraRoutings,
  extraBoms
}: IRootState) => ({
  allSites: site.entities,
  allDepartments: department.entities,
  incompleteNonconformance: nonConformanceDetails.entity,
  nonConformanceDetailsLoading: nonConformanceDetails.loading,
  incompleteInternalNonConformance: internalNonConformance.entity,
  internalLoading: internalNonConformance.loading || internalNonConformance.updating,
  companies: company.entities,
  allExtraRoutings: extraRoutings.entities,
  allInternalExtraBoms: extraBoms.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceForm);
