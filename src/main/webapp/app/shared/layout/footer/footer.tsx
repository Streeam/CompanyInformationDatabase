import './footer.scss';

import React from 'react';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable
import Grid from '@material-ui/core/Grid';
// tslint:enable
interface ICompanyProps {
  currentCompany: ICompany;
}

const Footer = (props: ICompanyProps) => {
  const { currentCompany } = props;
  return (
    <div className="footer page-content">
      <Grid container spacing={2}>
        {currentCompany && (
          <Grid item xs={12} sm={6}>
            <p style={{ fontSize: '0.8em' }}>
              <strong>{currentCompany.name}</strong>
              {'  '}|{' '}
              <a href={currentCompany.website} target="_blank">
                Website
              </a>
              {'  '}|{' '}
              <a href={`mailto:${currentCompany.email}`} target="_blank">
                Email Address
              </a>
              {'  '}|{' '}
              <a href={currentCompany.facebook} target="_blank">
                Facebook
              </a>
              {'  '}|{' '}
              <a href={currentCompany.twitter} target="_blank">
                Twitter
              </a>
              {'  '}|{' '}
              <a href={currentCompany.linkedin} target="_blank">
                LinkedIn
              </a>
            </p>
          </Grid>
        )}
        <Grid item xs={12} sm={currentCompany ? 6 : 12}>
          <p style={{ fontSize: '0.8em' }}>
            <strong>Company Information Database</strong>
            {'  '}|{' '}
            <a href="https://github.com/Streeam/CompanyInformationDatabase" target="_blank">
              GitHub
            </a>
            {'  '}| An application developed by{' '}
            <a href="linkedin.com/in/bogdan-mihoci-729561188" target="_blank">
              Bogdan Mihoci
            </a>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
