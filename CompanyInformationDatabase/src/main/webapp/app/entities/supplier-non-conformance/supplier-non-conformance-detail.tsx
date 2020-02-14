import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './supplier-non-conformance.reducer';
import { ISupplierNonConformance } from 'app/shared/model/supplier-non-conformance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplierNonConformanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SupplierNonConformanceDetail extends React.Component<ISupplierNonConformanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { supplierNonConformanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            SupplierNonConformance [<b>{supplierNonConformanceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="action">Action</span>
            </dt>
            <dd>{supplierNonConformanceEntity.action}</dd>
            <dt>
              <span id="labour">Labour</span>
            </dt>
            <dd>{supplierNonConformanceEntity.labour}</dd>
            <dt>
              <span id="concesionDetails">Concesion Details</span>
            </dt>
            <dd>{supplierNonConformanceEntity.concesionDetails}</dd>
            <dt>
              <span id="rejectionFee">Rejection Fee</span>
            </dt>
            <dd>{supplierNonConformanceEntity.rejectionFee}</dd>
            <dt>
              <span id="nonConformanceType">Non Conformance Type</span>
            </dt>
            <dd>{supplierNonConformanceEntity.nonConformanceType}</dd>
            <dt>Employee</dt>
            <dd>{supplierNonConformanceEntity.employeeId ? supplierNonConformanceEntity.employeeId : ''}</dd>
            <dt>Supplier</dt>
            <dd>{supplierNonConformanceEntity.supplierId ? supplierNonConformanceEntity.supplierId : ''}</dd>
            <dt>Non Conformance Details</dt>
            <dd>{supplierNonConformanceEntity.nonConformanceDetailsId ? supplierNonConformanceEntity.nonConformanceDetailsId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/supplier-non-conformance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/supplier-non-conformance/${supplierNonConformanceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ supplierNonConformance }: IRootState) => ({
  supplierNonConformanceEntity: supplierNonConformance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierNonConformanceDetail);
