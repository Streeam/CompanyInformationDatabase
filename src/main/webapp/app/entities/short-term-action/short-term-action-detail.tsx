import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './short-term-action.reducer';
import { IShortTermAction } from 'app/shared/model/short-term-action.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShortTermActionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ShortTermActionDetail extends React.Component<IShortTermActionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { shortTermActionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ShortTermAction [<b>{shortTermActionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{shortTermActionEntity.description}</dd>
            <dt>
              <span id="nonConformanceId">Non Conformance Id</span>
            </dt>
            <dd>{shortTermActionEntity.nonConformanceId}</dd>
          </dl>
          <Button tag={Link} to="/short-term-action" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/short-term-action/${shortTermActionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ shortTermAction }: IRootState) => ({
  shortTermActionEntity: shortTermAction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortTermActionDetail);
