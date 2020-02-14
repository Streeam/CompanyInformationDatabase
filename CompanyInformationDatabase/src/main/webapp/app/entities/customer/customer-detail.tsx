import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CustomerDetail extends React.Component<ICustomerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Customer [<b>{customerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="customerCode">Customer Code</span>
            </dt>
            <dd>{customerEntity.customerCode}</dd>
            <dt>
              <span id="customerName">Customer Name</span>
            </dt>
            <dd>{customerEntity.customerName}</dd>
            <dt>
              <span id="customerStatus">Customer Status</span>
            </dt>
            <dd>{customerEntity.customerStatus}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{customerEntity.country}</dd>
            <dt>
              <span id="customerCurency">Customer Curency</span>
            </dt>
            <dd>{customerEntity.customerCurency}</dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{customerEntity.address}</dd>
            <dt>
              <span id="website">Website</span>
            </dt>
            <dd>{customerEntity.website}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{customerEntity.email}</dd>
          </dl>
          <Button tag={Link} to="/customer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetail);
