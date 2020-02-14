import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import CreateCompany from '../company/create-company/create-company-main';
import CompanyStatusEmployees from '../company/company-status';
import Dashboard from '../dashbord/main-dashbord';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { ICompany } from 'app/shared/model/company.model';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getSites } from '../../entities/site/site.reducer';

interface IHomePage extends StateProps, DispatchProps {
  isCurrentUserManager: boolean;
  companies: ICompany[];
}
export const homePage = (props: IHomePage) => {
  const { isCurrentUserManager, companies, sites } = props;
  useEffect(() => {
    if (isArrayEmpty(sites)) {
      props.getSites();
    }
  }, []);
  return !isArrayEmpty(companies) ? (
    <div>
      <Dashboard />
    </div>
  ) : isCurrentUserManager ? (
    <CreateCompany />
  ) : (
    <p>The manager hasn't created the company yet.</p>
  );
};

const mapStateToProps = ({ site }: IRootState) => ({
  sites: site.entities
});

const mapDispatchToProps = { getSites };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(homePage);
