import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './action-to-be-taken.reducer';
import { IActionToBeTaken } from 'app/shared/model/action-to-be-taken.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IActionToBeTakenProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ActionToBeTaken extends React.Component<IActionToBeTakenProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { actionToBeTakenList, match } = this.props;
    return (
      <div>
        <h2 id="action-to-be-taken-heading">
          Action To Be Takens
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Action To Be Taken
          </Link>
        </h2>
        <div className="table-responsive">
          {actionToBeTakenList && actionToBeTakenList.length > 0 ? (
            <Table responsive aria-describedby="action-to-be-taken-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Why 1 Occurrance</th>
                  <th>Why 2 Occurrance</th>
                  <th>Why 3 Occurrance</th>
                  <th>Why 4 Occurrance</th>
                  <th>Why 5 Occurrance</th>
                  <th>Why 1 Detection</th>
                  <th>Why 2 Detection</th>
                  <th>Why 3 Detaction</th>
                  <th>Why 4 Detection</th>
                  <th>Why 5 Detection</th>
                  <th>Root Cause</th>
                  <th>Problem</th>
                  <th>Nonconformance Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {actionToBeTakenList.map((actionToBeTaken, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${actionToBeTaken.id}`} color="link" size="sm">
                        {actionToBeTaken.id}
                      </Button>
                    </td>
                    <td>{actionToBeTaken.why1Occurrance}</td>
                    <td>{actionToBeTaken.why2Occurrance}</td>
                    <td>{actionToBeTaken.why3Occurrance}</td>
                    <td>{actionToBeTaken.why4Occurrance}</td>
                    <td>{actionToBeTaken.why5Occurrance}</td>
                    <td>{actionToBeTaken.why1Detection}</td>
                    <td>{actionToBeTaken.why2Detection}</td>
                    <td>{actionToBeTaken.why3Detaction}</td>
                    <td>{actionToBeTaken.why4Detection}</td>
                    <td>{actionToBeTaken.why5Detection}</td>
                    <td>{actionToBeTaken.rootCause}</td>
                    <td>{actionToBeTaken.problem}</td>
                    <td>{actionToBeTaken.nonconformanceId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${actionToBeTaken.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${actionToBeTaken.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${actionToBeTaken.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Action To Be Takens found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ actionToBeTaken }: IRootState) => ({
  actionToBeTakenList: actionToBeTaken.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionToBeTaken);
