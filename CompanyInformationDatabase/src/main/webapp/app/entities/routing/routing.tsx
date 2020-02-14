import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './routing.reducer';
import { IRouting } from 'app/shared/model/routing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoutingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Routing extends React.Component<IRoutingProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { routingList, match } = this.props;
    return (
      <div>
        <h2 id="routing-heading">
          Routings
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Routing
          </Link>
        </h2>
        <div className="table-responsive">
          {routingList && routingList.length > 0 ? (
            <Table responsive aria-describedby="routing-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Resource Name</th>
                  <th>Resource Type</th>
                  <th>Unit Run Time</th>
                  <th>Part Number</th>
                  <th>Layout Time</th>
                  <th>Unique Identifier</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {routingList.map((routing, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${routing.id}`} color="link" size="sm">
                        {routing.id}
                      </Button>
                    </td>
                    <td>{routing.resourceName}</td>
                    <td>{routing.resourceType}</td>
                    <td>{routing.unitRunTime}</td>
                    <td>{routing.partNumber}</td>
                    <td>{routing.layoutTime}</td>
                    <td>{routing.uniqueIdentifier}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${routing.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${routing.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${routing.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Routings found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ routing }: IRootState) => ({
  routingList: routing.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing);
