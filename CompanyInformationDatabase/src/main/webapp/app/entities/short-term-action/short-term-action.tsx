import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './short-term-action.reducer';
import { IShortTermAction } from 'app/shared/model/short-term-action.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShortTermActionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ShortTermAction extends React.Component<IShortTermActionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { shortTermActionList, match } = this.props;
    return (
      <div>
        <h2 id="short-term-action-heading">
          Short Term Actions
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Short Term Action
          </Link>
        </h2>
        <div className="table-responsive">
          {shortTermActionList && shortTermActionList.length > 0 ? (
            <Table responsive aria-describedby="short-term-action-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Non Conformance Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {shortTermActionList.map((shortTermAction, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${shortTermAction.id}`} color="link" size="sm">
                        {shortTermAction.id}
                      </Button>
                    </td>
                    <td>{shortTermAction.description}</td>
                    <td>{shortTermAction.nonConformanceId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${shortTermAction.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${shortTermAction.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${shortTermAction.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Short Term Actions found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ shortTermAction }: IRootState) => ({
  shortTermActionList: shortTermAction.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortTermAction);
