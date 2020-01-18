import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './version.reducer';
import { IVersion } from 'app/shared/model/version.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVersionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VersionDetail extends React.Component<IVersionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { versionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Version [<b>{versionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="versionNumber">Version Number</span>
            </dt>
            <dd>{versionEntity.versionNumber}</dd>
            <dt>
              <span id="versionStatus">Version Status</span>
            </dt>
            <dd>{versionEntity.versionStatus}</dd>
            <dt>
              <span id="issueNumber">Issue Number</span>
            </dt>
            <dd>{versionEntity.issueNumber}</dd>
            <dt>Product</dt>
            <dd>{versionEntity.productId ? versionEntity.productId : ''}</dd>
            <dt>Amendment</dt>
            <dd>{versionEntity.amendmentId ? versionEntity.amendmentId : ''}</dd>
            <dt>Prototype</dt>
            <dd>{versionEntity.prototypeId ? versionEntity.prototypeId : ''}</dd>
            <dt>Routing</dt>
            <dd>{versionEntity.routingId ? versionEntity.routingId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/version" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/version/${versionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ version }: IRootState) => ({
  versionEntity: version.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionDetail);
