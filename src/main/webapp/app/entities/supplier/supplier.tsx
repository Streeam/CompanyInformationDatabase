import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './supplier.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplierProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Supplier extends React.Component<ISupplierProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { supplierList, match } = this.props;
    return (
      <div>
        <h2 id="supplier-heading">
          Suppliers
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Supplier
          </Link>
        </h2>
        <div className="table-responsive">
          {supplierList && supplierList.length > 0 ? (
            <Table responsive aria-describedby="supplier-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Supplier Code</th>
                  <th>Supplier Name</th>
                  <th>Supplier Status</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address Line 1</th>
                  <th>Address Line 2</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Company</th>
                  <th>Products</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {supplierList.map((supplier, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${supplier.id}`} color="link" size="sm">
                        {supplier.id}
                      </Button>
                    </td>
                    <td>{supplier.supplierCode}</td>
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.supplierStatus}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.addressLine1}</td>
                    <td>{supplier.addressLine2}</td>
                    <td>{supplier.city}</td>
                    <td>{supplier.country}</td>
                    <td>{supplier.companyId ? <Link to={`company/${supplier.companyId}`}>{supplier.companyId}</Link> : ''}</td>
                    <td>
                      {supplier.products
                        ? supplier.products.map((val, j) => (
                            <span key={j}>
                              <Link to={`product/${val.id}`}>{val.id}</Link>
                              {j === supplier.products.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${supplier.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${supplier.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${supplier.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Suppliers found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ supplier }: IRootState) => ({
  supplierList: supplier.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supplier);
