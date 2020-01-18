import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './non-conformance-details.reducer';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INonConformanceDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class NonConformanceDetails extends React.Component<INonConformanceDetailsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { nonConformanceDetailsList, match } = this.props;
    return (
      <div>
        <h2 id="non-conformance-details-heading">
          Non Conformance Details
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Non Conformance Details
          </Link>
        </h2>
        <div className="table-responsive">
          {nonConformanceDetailsList && nonConformanceDetailsList.length > 0 ? (
            <Table responsive aria-describedby="non-conformance-details-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Priority</th>
                  <th>Nonconformance</th>
                  <th>Current Date</th>
                  <th>Product</th>
                  <th>Routing</th>
                  <th>Non Conformance Type</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {nonConformanceDetailsList.map((nonConformanceDetails, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${nonConformanceDetails.id}`} color="link" size="sm">
                        {nonConformanceDetails.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={nonConformanceDetails.deadline} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{nonConformanceDetails.status}</td>
                    <td>{nonConformanceDetails.progress}</td>
                    <td>{nonConformanceDetails.priority}</td>
                    <td>{nonConformanceDetails.nonconformance}</td>
                    <td>
                      <TextFormat type="date" value={nonConformanceDetails.currentDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {nonConformanceDetails.products
                        ? nonConformanceDetails.products.map((val, j) => (
                            <span key={j}>
                              <Link to={`product/${val.id}`}>{val.partNumber}</Link>
                              {j === nonConformanceDetails.products.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {nonConformanceDetails.routings
                        ? nonConformanceDetails.routings.map((val, j) => (
                            <span key={j}>
                              <Link to={`routing/${val.id}`}>{val.id}</Link>
                              {j === nonConformanceDetails.routings.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${nonConformanceDetails.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${nonConformanceDetails.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${nonConformanceDetails.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Non Conformance Details found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ nonConformanceDetails }: IRootState) => ({
  nonConformanceDetailsList: nonConformanceDetails.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonConformanceDetails);
