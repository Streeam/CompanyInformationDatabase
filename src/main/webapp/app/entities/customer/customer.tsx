import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Customer extends React.Component<ICustomerProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { customerList, match } = this.props;
    return (
      <div>
        <h2 id="customer-heading">
          Customers
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Customer
          </Link>
        </h2>
        <div className="table-responsive">
          {customerList && customerList.length > 0 ? (
            <Table responsive aria-describedby="customer-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer Code</th>
                  <th>Customer Name</th>
                  <th>Customer Status</th>
                  <th>Country</th>
                  <th>Customer Curency</th>
                  <th>Address</th>
                  <th>Website</th>
                  <th>Email</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                        {customer.id}
                      </Button>
                    </td>
                    <td>{customer.customerCode}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerStatus}</td>
                    <td>{customer.country}</td>
                    <td>{customer.customerCurency}</td>
                    <td>{customer.address}</td>
                    <td>{customer.website}</td>
                    <td>{customer.email}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${customer.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${customer.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${customer.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Customers found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customerList: customer.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);
