import React, { useState, Fragment, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
// tslint:disable
import Card from '@material-ui/core/Card';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
// tslint:enable

import { ICompany } from 'app/shared/model/company.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, updateEntity, createEntity, setBlob, reset } from '../../../entities/company/company.reducer';

export interface INewCompanyProps extends StateProps, DispatchProps {
  saveCompany: Function;
}
export const NewCompany = (props: INewCompanyProps) => {
  const { companyEntity, loading, updating, saveCompany } = props;
  const companyEntityWithoutId = { ...companyEntity };
  delete companyEntityWithoutId.id;
  const { companyLogo, companyLogoContentType } = companyEntity;
  useEffect(() => {}, []);
  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };
  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };
  return (
    <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
      <Row className="justify-content-center">
        <Col md="8">
          <h4 style={{ textAlign: 'center' }} id="cidApp.company.home.createOrEditLabel">
            Create a Company
          </h4>
          <Divider style={{ margin: '0 0 10px 0' }} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={companyEntityWithoutId} onSubmit={saveCompany}>
              <div style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '500px' }}>
                <AvGroup>
                  <Label id="nameLabel" for="company-name">
                    Name
                  </Label>
                  <AvField
                    id="company-name"
                    type="text"
                    name="name"
                    validate={{ required: { value: true, errorMessage: 'This field is required.' } }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="company-email">
                    Email
                  </Label>
                  <AvField
                    id="company-email"
                    type="text"
                    name="email"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      minLength: { value: 5, errorMessage: 'This field is required to be at least 5 characters.' },
                      maxLength: { value: 254, errorMessage: 'This field cannot be longer than 254 characters.' },
                      pattern: {
                        value: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
                        errorMessage: "This field should follow pattern for '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+.."
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="company-phone">
                    Phone
                  </Label>
                  <AvField
                    id="company-phone"
                    type="text"
                    name="phone"
                    validate={{ required: { value: true, errorMessage: 'This field is required.' } }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLine1Label" for="company-addressLine1">
                    Address Line 1
                  </Label>
                  <AvField
                    id="company-addressLine1"
                    type="text"
                    name="addressLine1"
                    validate={{ required: { value: true, errorMessage: 'This field is required.' } }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLine2Label" for="company-addressLine2">
                    Address Line 2
                  </Label>
                  <AvField id="company-addressLine2" type="text" name="addressLine2" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="company-city">
                    City
                  </Label>
                  <AvField
                    id="company-city"
                    type="text"
                    name="city"
                    validate={{ required: { value: true, errorMessage: 'This field is required.' } }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="company-country">
                    Country
                  </Label>
                  <AvField
                    id="company-country"
                    type="text"
                    name="country"
                    validate={{ required: { value: true, errorMessage: 'This field is required.' } }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="postcodeLabel" for="company-postcode">
                    Postcode
                  </Label>
                  <AvField id="company-postcode" type="text" name="postcode" />
                </AvGroup>
                <br />
                <AvGroup>
                  <AvGroup>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <Label id="companyLogoLabel" for="companyLogo">
                          Company Logo
                        </Label>
                      </Grid>
                    </Grid>
                    {companyLogo ? (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={11}>
                          <a onClick={openFile(companyLogoContentType, companyLogo)}>
                            <img src={`data:${companyLogoContentType};base64,${companyLogo}`} style={{ maxHeight: '100px' }} />
                          </a>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <Button size="sm" color="secondary" onClick={clearBlob('companyLogo')} title="Remove Logo">
                            <CloseIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    ) : null}
                    <input id="file_companyLogo" type="file" onChange={onBlobChange(true, 'companyLogo')} accept="image/*" />
                    <AvInput type="hidden" name="companyLogo" value={companyLogo} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="overheadRateLabel" for="company-overheadRate">
                    Overhead Rate
                  </Label>
                  <AvField
                    id="company-overheadRate"
                    type="string"
                    className="form-control"
                    name="overheadRate"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' },
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="linkedinLabel" for="company-linkedin">
                    Linkedin
                  </Label>
                  <AvField id="company-linkedin" type="text" name="linkedin" />
                </AvGroup>
                <AvGroup>
                  <Label id="facebookLabel" for="company-facebook">
                    Facebook
                  </Label>
                  <AvField id="company-facebook" type="text" name="facebook" />
                </AvGroup>
                <AvGroup>
                  <Label id="twitterLabel" for="company-twitter">
                    Twitter
                  </Label>
                  <AvField id="company-twitter" type="text" name="twitter" />
                </AvGroup>
                <AvGroup>
                  <Label id="websiteLabel" for="company-website">
                    Website
                  </Label>
                  <AvField id="company-website" type="text" name="website" />
                </AvGroup>
              </div>
              <Divider style={{ margin: '0 0 10px 0' }} /> <br />
              <Button size="sm" color="secondary" id="save-entity" type="submit" disabled={updating}>
                <SaveIcon /> &nbsp;<span className="d-none d-md-inline">Save</span>
              </Button>
              <br />
            </AvForm>
          )}
        </Col>
      </Row>
    </Card>
  );
};
const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity,
  loading: company.loading,
  updating: company.updating,
  updateSuccess: company.updateSuccess
});
const mapDispatchToProps = { getEntity, updateEntity, setBlob, createEntity, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCompany);
