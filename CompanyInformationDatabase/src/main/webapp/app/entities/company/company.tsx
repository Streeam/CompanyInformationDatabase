import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Company extends React.Component<ICompanyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { companyList, match } = this.props;
    return (
      <div>
        <h2 id="company-heading">
          Companies
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Company
          </Link>
        </h2>
        <div className="table-responsive">
          {companyList && companyList.length > 0 ? (
            <Table responsive aria-describedby="company-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address Line 1</th>
                  <th>Address Line 2</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Postcode</th>
                  <th>Company Logo</th>
                  <th>Overhead Rate</th>
                  <th>Linkedin</th>
                  <th>Facebook</th>
                  <th>Twitter</th>
                  <th>Website</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {companyList.map((company, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${company.id}`} color="link" size="sm">
                        {company.id}
                      </Button>
                    </td>
                    <td>{company.name}</td>
                    <td>{company.email}</td>
                    <td>{company.phone}</td>
                    <td>{company.addressLine1}</td>
                    <td>{company.addressLine2}</td>
                    <td>{company.city}</td>
                    <td>{company.country}</td>
                    <td>{company.postcode}</td>
                    <td>
                      {company.companyLogo ? (
                        <div>
                          <a onClick={openFile(company.companyLogoContentType, company.companyLogo)}>
                            <img
                              src={`data:${company.companyLogoContentType};base64,${company.companyLogo}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {company.companyLogoContentType}, {byteSize(company.companyLogo)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{company.overheadRate}</td>
                    <td>{company.linkedin}</td>
                    <td>{company.facebook}</td>
                    <td>{company.twitter}</td>
                    <td>{company.website}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${company.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${company.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${company.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Companies found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ company }: IRootState) => ({
  companyList: company.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
