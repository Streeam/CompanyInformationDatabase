import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './long-term-action.reducer';
import { ILongTermAction } from 'app/shared/model/long-term-action.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILongTermActionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class LongTermAction extends React.Component<ILongTermActionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { longTermActionList, match } = this.props;
    return (
      <div>
        <h2 id="long-term-action-heading">
          Long Term Actions
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Long Term Action
          </Link>
        </h2>
        <div className="table-responsive">
          {longTermActionList && longTermActionList.length > 0 ? (
            <Table responsive aria-describedby="long-term-action-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Non Conformance Id</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {longTermActionList.map((longTermAction, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${longTermAction.id}`} color="link" size="sm">
                        {longTermAction.id}
                      </Button>
                    </td>
                    <td>{longTermAction.nonConformanceId}</td>
                    <td>{longTermAction.description}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${longTermAction.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${longTermAction.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${longTermAction.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Long Term Actions found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ longTermAction }: IRootState) => ({
  longTermActionList: longTermAction.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LongTermAction);
