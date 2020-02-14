import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './version.reducer';
import { IVersion } from 'app/shared/model/version.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVersionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Version extends React.Component<IVersionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { versionList, match } = this.props;
    return (
      <div>
        <h2 id="version-heading">
          Versions
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Version
          </Link>
        </h2>
        <div className="table-responsive">
          {versionList && versionList.length > 0 ? (
            <Table responsive aria-describedby="version-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Version Number</th>
                  <th>Version Status</th>
                  <th>Issue Number</th>
                  <th>Product</th>
                  <th>Amendment</th>
                  <th>Prototype</th>
                  <th>Routing</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {versionList.map((version, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${version.id}`} color="link" size="sm">
                        {version.id}
                      </Button>
                    </td>
                    <td>{version.versionNumber}</td>
                    <td>{version.versionStatus}</td>
                    <td>{version.issueNumber}</td>
                    <td>{version.productId ? <Link to={`product/${version.productId}`}>{version.productId}</Link> : ''}</td>
                    <td>{version.amendmentId ? <Link to={`amendment/${version.amendmentId}`}>{version.amendmentId}</Link> : ''}</td>
                    <td>{version.prototypeId ? <Link to={`prototype/${version.prototypeId}`}>{version.prototypeId}</Link> : ''}</td>
                    <td>{version.routingId ? <Link to={`routing/${version.routingId}`}>{version.routingId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${version.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${version.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${version.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Versions found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ version }: IRootState) => ({
  versionList: version.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Version);
