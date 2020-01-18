import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './purchase-request-parent.reducer';
import { IPurchaseRequestParent } from 'app/shared/model/purchase-request-parent.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseRequestParentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PurchaseRequestParentDetail extends React.Component<IPurchaseRequestParentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { purchaseRequestParentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PurchaseRequestParent [<b>{purchaseRequestParentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="pdfURLPath">Pdf URL Path</span>
            </dt>
            <dd>{purchaseRequestParentEntity.pdfURLPath}</dd>
            <dt>Employee</dt>
            <dd>{purchaseRequestParentEntity.employeeId ? purchaseRequestParentEntity.employeeId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/purchase-request-parent" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/purchase-request-parent/${purchaseRequestParentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ purchaseRequestParent }: IRootState) => ({
  purchaseRequestParentEntity: purchaseRequestParent.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseRequestParentDetail);
