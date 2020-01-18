import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Card } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './company.reducer';
import { getEntities as getAllDepartments } from '../department/department.reducer';
import { getEntities as getAllSites } from '../site/site.reducer';
// tslint:disable
import IconButton from '@material-ui/core/IconButton';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import SaveIcon from '@material-ui/icons/Save';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// tslint:enable
export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICompanyUpdateState {
  isNew: boolean;
}

export class CompanyUpdate extends React.Component<ICompanyUpdateProps, ICompanyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
      this.props.getAllDepartments();
      this.props.getAllSites();
    }
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { companyEntity } = this.props;
      const entity = {
        ...companyEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/company');
  };

  render() {
    const { companyEntity, loading, updating, allDepartments, allSites } = this.props;
    const { isNew } = this.state;
    const companyEntityWithoutId = { ...companyEntity };
    delete companyEntityWithoutId.id;
    const { companyLogo, companyLogoContentType } = companyEntity;
    return (
      <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.company.home.createOrEditLabel">{isNew ? `Create a Company` : `Edit Company`}</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : companyEntityWithoutId} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="nameLabel" for="company-name">
                    Name
                  </Label>
                  <AvField
                    id="company-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
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
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
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
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
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
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
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
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="postcodeLabel" for="company-postcode">
                    Postcode
                  </Label>
                  <AvField id="company-postcode" type="text" name="postcode" />
                </AvGroup>
                <br />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={11}>
                    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                      <TreeItem nodeId="1" label="Company Sites">
                        {allSites && allSites.length > 0
                          ? allSites.map(site => (
                              <TreeItem key={site.id} nodeId={`${site.site}` + `${site.id}`} label={site.site}>
                                {allDepartments && allDepartments.length > 0
                                  ? allDepartments
                                      .filter(department1 => department1.site.id === site.id)
                                      .map(department2 => (
                                        <TreeItem
                                          key={department2.id}
                                          nodeId={`${department2.department}` + `${department2.id}`}
                                          label={department2.department}
                                        />
                                      ))
                                  : null}
                              </TreeItem>
                            ))
                          : null}
                      </TreeItem>
                    </TreeView>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Link to={`/entity/site`}>
                      <IconButton title={'Add more sites and departments'} aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </Link>
                  </Grid>
                </Grid>
                <br />
                <AvGroup>
                  <AvGroup>
                    <Label id="companyLogoLabel" for="companyLogo">
                      Company Logo
                    </Label>
                    {companyLogo ? (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={11}>
                          <a onClick={openFile(companyLogoContentType, companyLogo)}>
                            <img src={`data:${companyLogoContentType};base64,${companyLogo}`} style={{ maxHeight: '100px' }} />
                          </a>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <Button size="sm" color="secondary" onClick={this.clearBlob('companyLogo')} title="Remove Logo">
                            <CloseIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    ) : null}
                    <br />
                    <input id="file_companyLogo" type="file" onChange={this.onBlobChange(true, 'companyLogo')} accept="image/*" />
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
                      number: { value: true, errorMessage: 'This field should be a number.' }
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
                <Button size="sm" tag={Link} id="cancel-save" to="/company/company-status" replace color="secondary">
                  <ChevronLeftIcon />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button size="sm" color="secondary" id="save-entity" type="submit" disabled={updating}>
                  <SaveIcon />
                  &nbsp;<span className="d-none d-md-inline">Save</span>
                </Button>
                &nbsp;
              </AvForm>
            )}
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = ({ company, department, site }: IRootState) => ({
  companyEntity: company.entity,
  loading: company.loading,
  updating: company.updating,
  updateSuccess: company.updateSuccess,
  allDepartments: department.entities,
  allSites: site.entities
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
  getAllDepartments,
  getAllSites
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyUpdate);
