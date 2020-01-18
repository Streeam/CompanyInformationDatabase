import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './prototype.reducer';
import { IPrototype } from 'app/shared/model/prototype.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrototypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Prototype extends React.Component<IPrototypeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { prototypeList, match } = this.props;
    return (
      <div>
        <h2 id="prototype-heading">
          Prototypes
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Prototype
          </Link>
        </h2>
        <div className="table-responsive">
          {prototypeList && prototypeList.length > 0 ? (
            <Table responsive aria-describedby="prototype-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Priority</th>
                  <th>Proposed Date</th>
                  <th>Progress</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {prototypeList.map((prototype, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${prototype.id}`} color="link" size="sm">
                        {prototype.id}
                      </Button>
                    </td>
                    <td>{prototype.status}</td>
                    <td>
                      <TextFormat type="date" value={prototype.deadline} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{prototype.priority}</td>
                    <td>
                      <TextFormat type="date" value={prototype.proposedDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{prototype.progress}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${prototype.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${prototype.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${prototype.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Prototypes found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ prototype }: IRootState) => ({
  prototypeList: prototype.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prototype);
