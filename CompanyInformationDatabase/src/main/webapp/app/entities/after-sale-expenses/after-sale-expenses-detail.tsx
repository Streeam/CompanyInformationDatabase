import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './after-sale-expenses.reducer';
import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAfterSaleExpensesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AfterSaleExpensesDetail extends React.Component<IAfterSaleExpensesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { afterSaleExpensesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            AfterSaleExpenses [<b>{afterSaleExpensesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={afterSaleExpensesEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{afterSaleExpensesEntity.description}</dd>
            <dt>
              <span id="cost">Cost</span>
            </dt>
            <dd>{afterSaleExpensesEntity.cost}</dd>
            <dt>
              <span id="employeeId">Employee Id</span>
            </dt>
            <dd>{afterSaleExpensesEntity.employeeId}</dd>
            <dt>
              <span id="customerNonConformanceId">Customer Non Conformance Id</span>
            </dt>
            <dd>{afterSaleExpensesEntity.customerNonConformanceId}</dd>
          </dl>
          <Button tag={Link} to="/after-sale-expenses" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/after-sale-expenses/${afterSaleExpensesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ afterSaleExpenses }: IRootState) => ({
  afterSaleExpensesEntity: afterSaleExpenses.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AfterSaleExpensesDetail);
