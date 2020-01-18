import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './client-non-conformance.reducer';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientNonConformanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClientNonConformanceDetail extends React.Component<IClientNonConformanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clientNonConformanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ClientNonConformance [<b>{clientNonConformanceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nonConformanceType">Non Conformance Type</span>
            </dt>
            <dd>{clientNonConformanceEntity.nonConformanceType}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{clientNonConformanceEntity.status}</dd>
            <dt>
              <span id="nonconformanceDetailsId">Nonconformance Details Id</span>
            </dt>
            <dd>{clientNonConformanceEntity.nonconformanceDetailsId}</dd>
            <dt>
              <span id="rejectionReasonDetails">Rejection Reason Details</span>
            </dt>
            <dd>{clientNonConformanceEntity.rejectionReasonDetails}</dd>
            <dt>
              <span id="actionToBeTakenDetails">Action To Be Taken Details</span>
            </dt>
            <dd>{clientNonConformanceEntity.actionToBeTakenDetails}</dd>
            <dt>
              <span id="shortTermDetails">Short Term Details</span>
            </dt>
            <dd>{clientNonConformanceEntity.shortTermDetails}</dd>
            <dt>
              <span id="longTermDetails">Long Term Details</span>
            </dt>
            <dd>{clientNonConformanceEntity.longTermDetails}</dd>
            <dt>
              <span id="currentDate">Current Date</span>
            </dt>
            <dd>
              <TextFormat value={clientNonConformanceEntity.currentDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="rejectionDate">Rejection Date</span>
            </dt>
            <dd>
              <TextFormat value={clientNonConformanceEntity.rejectionDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="underWarranty">Under Warranty</span>
            </dt>
            <dd>{clientNonConformanceEntity.underWarranty ? 'true' : 'false'}</dd>
            <dt>
              <span id="quantity">Quantity</span>
            </dt>
            <dd>{clientNonConformanceEntity.quantity}</dd>
            <dt>
              <span id="labourRate">Labour Rate</span>
            </dt>
            <dd>{clientNonConformanceEntity.labourRate}</dd>
            <dt>Customer</dt>
            <dd>{clientNonConformanceEntity.customerId ? clientNonConformanceEntity.customerId : ''}</dd>
            <dt>Culpable Employees</dt>
            <dd>
              {clientNonConformanceEntity.culpableEmployees
                ? clientNonConformanceEntity.culpableEmployees.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === clientNonConformanceEntity.culpableEmployees.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/client-non-conformance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/client-non-conformance/${clientNonConformanceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ clientNonConformance }: IRootState) => ({
  clientNonConformanceEntity: clientNonConformance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientNonConformanceDetail);
