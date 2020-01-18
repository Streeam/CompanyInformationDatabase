import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './amendment.reducer';
import { IAmendment } from 'app/shared/model/amendment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAmendmentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Amendment extends React.Component<IAmendmentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { amendmentList, match } = this.props;
    return (
      <div>
        <h2 id="amendment-heading">
          Amendments
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Amendment
          </Link>
        </h2>
        <div className="table-responsive">
          {amendmentList && amendmentList.length > 0 ? (
            <Table responsive aria-describedby="amendment-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Priority</th>
                  <th>Proposed Date</th>
                  <th>Current Condition</th>
                  <th>Propose Amendment</th>
                  <th>Reason For Change</th>
                  <th>Rejection Reason</th>
                  <th>Progress</th>
                  <th>Employee</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {amendmentList.map((amendment, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${amendment.id}`} color="link" size="sm">
                        {amendment.id}
                      </Button>
                    </td>
                    <td>{amendment.status}</td>
                    <td>
                      <TextFormat type="date" value={amendment.deadline} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{amendment.priority}</td>
                    <td>
                      <TextFormat type="date" value={amendment.proposedDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{amendment.currentCondition}</td>
                    <td>{amendment.proposeAmendment}</td>
                    <td>{amendment.reasonForChange}</td>
                    <td>{amendment.rejectionReason}</td>
                    <td>{amendment.progress}</td>
                    <td>{amendment.employeeId ? <Link to={`employee/${amendment.employeeId}`}>{amendment.employeeId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${amendment.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${amendment.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${amendment.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Amendments found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ amendment }: IRootState) => ({
  amendmentList: amendment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Amendment);
