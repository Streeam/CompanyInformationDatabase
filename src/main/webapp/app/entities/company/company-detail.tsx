import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CompanyDetail extends React.Component<ICompanyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { companyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Company [<b>{companyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{companyEntity.name}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{companyEntity.email}</dd>
            <dt>
              <span id="phone">Phone</span>
            </dt>
            <dd>{companyEntity.phone}</dd>
            <dt>
              <span id="addressLine1">Address Line 1</span>
            </dt>
            <dd>{companyEntity.addressLine1}</dd>
            <dt>
              <span id="addressLine2">Address Line 2</span>
            </dt>
            <dd>{companyEntity.addressLine2}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{companyEntity.city}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{companyEntity.country}</dd>
            <dt>
              <span id="postcode">Postcode</span>
            </dt>
            <dd>{companyEntity.postcode}</dd>
            <dt>
              <span id="companyLogo">Company Logo</span>
            </dt>
            <dd>
              {companyEntity.companyLogo ? (
                <div>
                  <a onClick={openFile(companyEntity.companyLogoContentType, companyEntity.companyLogo)}>
                    <img
                      src={`data:${companyEntity.companyLogoContentType};base64,${companyEntity.companyLogo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {companyEntity.companyLogoContentType}, {byteSize(companyEntity.companyLogo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="overheadRate">Overhead Rate</span>
            </dt>
            <dd>{companyEntity.overheadRate}</dd>
            <dt>
              <span id="linkedin">Linkedin</span>
            </dt>
            <dd>{companyEntity.linkedin}</dd>
            <dt>
              <span id="facebook">Facebook</span>
            </dt>
            <dd>{companyEntity.facebook}</dd>
            <dt>
              <span id="twitter">Twitter</span>
            </dt>
            <dd>{companyEntity.twitter}</dd>
            <dt>
              <span id="website">Website</span>
            </dt>
            <dd>{companyEntity.website}</dd>
          </dl>
          <Button tag={Link} to="/entity/company" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/company/${companyEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDetail);
