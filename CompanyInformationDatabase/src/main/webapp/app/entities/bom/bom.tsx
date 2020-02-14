import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bom.reducer';
import { IBom } from 'app/shared/model/bom.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBomProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Bom extends React.Component<IBomProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { bomList, match } = this.props;
    return (
      <div>
        <h2 id="bom-heading">
          Boms
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Bom
          </Link>
        </h2>
        <div className="table-responsive">
          {bomList && bomList.length > 0 ? (
            <Table responsive aria-describedby="bom-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Quantity</th>
                  <th>Sequence Number</th>
                  <th>Part Number</th>
                  <th>Child Part Number</th>
                  <th>Unique Identifier</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bomList.map((bom, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${bom.id}`} color="link" size="sm">
                        {bom.id}
                      </Button>
                    </td>
                    <td>{bom.quantity}</td>
                    <td>{bom.sequenceNumber}</td>
                    <td>{bom.partNumber}</td>
                    <td>{bom.childPartNumber}</td>
                    <td>{bom.uniqueIdentifier}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${bom.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${bom.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${bom.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Boms found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bom }: IRootState) => ({
  bomList: bom.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bom);
