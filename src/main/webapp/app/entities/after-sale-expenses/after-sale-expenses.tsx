import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './after-sale-expenses.reducer';
import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAfterSaleExpensesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class AfterSaleExpenses extends React.Component<IAfterSaleExpensesProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { afterSaleExpensesList, match } = this.props;
    return (
      <div>
        <h2 id="after-sale-expenses-heading">
          After Sale Expenses
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new After Sale Expenses
          </Link>
        </h2>
        <div className="table-responsive">
          {afterSaleExpensesList && afterSaleExpensesList.length > 0 ? (
            <Table responsive aria-describedby="after-sale-expenses-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Employee Id</th>
                  <th>Customer Non Conformance Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {afterSaleExpensesList.map((afterSaleExpenses, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${afterSaleExpenses.id}`} color="link" size="sm">
                        {afterSaleExpenses.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={afterSaleExpenses.date} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{afterSaleExpenses.description}</td>
                    <td>{afterSaleExpenses.cost}</td>
                    <td>{afterSaleExpenses.employeeId}</td>
                    <td>{afterSaleExpenses.customerNonConformanceId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${afterSaleExpenses.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${afterSaleExpenses.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${afterSaleExpenses.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No After Sale Expenses found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ afterSaleExpenses }: IRootState) => ({
  afterSaleExpensesList: afterSaleExpenses.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AfterSaleExpenses);
