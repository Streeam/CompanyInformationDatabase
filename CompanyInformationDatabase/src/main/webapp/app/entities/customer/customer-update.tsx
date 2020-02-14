import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICustomerUpdateState {
  isNew: boolean;
}

export class CustomerUpdate extends React.Component<ICustomerUpdateProps, ICustomerUpdateState> {
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
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { customerEntity } = this.props;
      const entity = {
        ...customerEntity,
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
    this.props.history.push('/customer');
  };

  render() {
    const { customerEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.customer.home.createOrEditLabel">Create or edit a Customer</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="customer-id">ID</Label>
                    <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="customerCodeLabel" for="customer-customerCode">
                    Customer Code
                  </Label>
                  <AvField
                    id="customer-customerCode"
                    type="text"
                    name="customerCode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="customerNameLabel" for="customer-customerName">
                    Customer Name
                  </Label>
                  <AvField
                    id="customer-customerName"
                    type="text"
                    name="customerName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="customerStatusLabel" for="customer-customerStatus">
                    Customer Status
                  </Label>
                  <AvField
                    id="customer-customerStatus"
                    type="text"
                    name="customerStatus"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="customer-country">
                    Country
                  </Label>
                  <AvField
                    id="customer-country"
                    type="text"
                    name="country"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="customerCurencyLabel" for="customer-customerCurency">
                    Customer Curency
                  </Label>
                  <AvField id="customer-customerCurency" type="text" name="customerCurency" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="customer-address">
                    Address
                  </Label>
                  <AvField id="customer-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="websiteLabel" for="customer-website">
                    Website
                  </Label>
                  <AvField id="customer-website" type="text" name="website" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="customer-email">
                    Email
                  </Label>
                  <AvField
                    id="customer-email"
                    type="text"
                    name="email"
                    validate={{
                      minLength: { value: 5, errorMessage: 'This field is required to be at least 5 characters.' },
                      maxLength: { value: 254, errorMessage: 'This field cannot be longer than 254 characters.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerUpdate);
