import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './extra-routings.reducer';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExtraRoutingsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ExtraRoutings extends React.Component<IExtraRoutingsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { extraRoutingsList, match } = this.props;
    return (
      <div>
        <h2 id="extra-routings-heading">
          Extra Routings
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Extra Routings
          </Link>
        </h2>
        <div className="table-responsive">
          {extraRoutingsList && extraRoutingsList.length > 0 ? (
            <Table responsive aria-describedby="extra-routings-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Overhead</th>
                  <th>Resource Name</th>
                  <th>Runtime</th>
                  <th>Internal Non Conformance Id</th>
                  <th>Nonconformance Type</th>
                  <th>Nonconformance Action</th>
                  <th>Customer Non Conformace Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {extraRoutingsList.map((extraRoutings, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${extraRoutings.id}`} color="link" size="sm">
                        {extraRoutings.id}
                      </Button>
                    </td>
                    <td>{extraRoutings.overhead}</td>
                    <td>{extraRoutings.resourceName}</td>
                    <td>{extraRoutings.runtime}</td>
                    <td>{extraRoutings.internalNonConformanceId}</td>
                    <td>{extraRoutings.nonconformanceType}</td>
                    <td>{extraRoutings.nonconformanceAction}</td>
                    <td>{extraRoutings.customerNonConformaceId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${extraRoutings.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${extraRoutings.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${extraRoutings.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Extra Routings found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ extraRoutings }: IRootState) => ({
  extraRoutingsList: extraRoutings.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraRoutings);
