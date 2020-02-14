import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './after-sale-expenses.reducer';
import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAfterSaleExpensesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAfterSaleExpensesUpdateState {
  isNew: boolean;
}

export class AfterSaleExpensesUpdate extends React.Component<IAfterSaleExpensesUpdateProps, IAfterSaleExpensesUpdateState> {
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
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const { afterSaleExpensesEntity } = this.props;
      const entity = {
        ...afterSaleExpensesEntity,
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
    this.props.history.push('/after-sale-expenses');
  };

  render() {
    const { afterSaleExpensesEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cidApp.afterSaleExpenses.home.createOrEditLabel">Create or edit a AfterSaleExpenses</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : afterSaleExpensesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="after-sale-expenses-id">ID</Label>
                    <AvInput id="after-sale-expenses-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="after-sale-expenses-date">
                    Date
                  </Label>
                  <AvInput
                    id="after-sale-expenses-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.afterSaleExpensesEntity.date)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="after-sale-expenses-description">
                    Description
                  </Label>
                  <AvField id="after-sale-expenses-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="costLabel" for="after-sale-expenses-cost">
                    Cost
                  </Label>
                  <AvField
                    id="after-sale-expenses-cost"
                    type="string"
                    className="form-control"
                    name="cost"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="employeeIdLabel" for="after-sale-expenses-employeeId">
                    Employee Id
                  </Label>
                  <AvField
                    id="after-sale-expenses-employeeId"
                    type="string"
                    className="form-control"
                    name="employeeId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="customerNonConformanceIdLabel" for="after-sale-expenses-customerNonConformanceId">
                    Customer Non Conformance Id
                  </Label>
                  <AvField
                    id="after-sale-expenses-customerNonConformanceId"
                    type="string"
                    className="form-control"
                    name="customerNonConformanceId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/after-sale-expenses" replace color="info">
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
  afterSaleExpensesEntity: storeState.afterSaleExpenses.entity,
  loading: storeState.afterSaleExpenses.loading,
  updating: storeState.afterSaleExpenses.updating,
  updateSuccess: storeState.afterSaleExpenses.updateSuccess
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
)(AfterSaleExpensesUpdate);
