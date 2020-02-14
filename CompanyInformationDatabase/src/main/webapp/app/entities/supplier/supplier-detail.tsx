import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './supplier.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SupplierDetail extends React.Component<ISupplierDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { supplierEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Supplier [<b>{supplierEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="supplierCode">Supplier Code</span>
            </dt>
            <dd>{supplierEntity.supplierCode}</dd>
            <dt>
              <span id="supplierName">Supplier Name</span>
            </dt>
            <dd>{supplierEntity.supplierName}</dd>
            <dt>
              <span id="supplierStatus">Supplier Status</span>
            </dt>
            <dd>{supplierEntity.supplierStatus}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{supplierEntity.email}</dd>
            <dt>
              <span id="phone">Phone</span>
            </dt>
            <dd>{supplierEntity.phone}</dd>
            <dt>
              <span id="addressLine1">Address Line 1</span>
            </dt>
            <dd>{supplierEntity.addressLine1}</dd>
            <dt>
              <span id="addressLine2">Address Line 2</span>
            </dt>
            <dd>{supplierEntity.addressLine2}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{supplierEntity.city}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{supplierEntity.country}</dd>
            <dt>Company</dt>
            <dd>{supplierEntity.companyId ? supplierEntity.companyId : ''}</dd>
            <dt>Products</dt>
            <dd>
              {supplierEntity.products
                ? supplierEntity.products.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === supplierEntity.products.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/supplier" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/supplier/${supplierEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ supplier }: IRootState) => ({
  supplierEntity: supplier.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierDetail);
