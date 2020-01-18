import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './drawing.reducer';
import { IDrawing } from 'app/shared/model/drawing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDrawingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Drawing extends React.Component<IDrawingProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { drawingList, match } = this.props;
    return (
      <div>
        <h2 id="drawing-heading">
          Drawings
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Drawing
          </Link>
        </h2>
        <div className="table-responsive">
          {drawingList && drawingList.length > 0 ? (
            <Table responsive aria-describedby="drawing-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Drawing Number</th>
                  <th>Drawing Issue</th>
                  <th>Url Path</th>
                  <th>Product</th>
                  <th>Amendment</th>
                  <th>Non Conformance Details</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {drawingList.map((drawing, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${drawing.id}`} color="link" size="sm">
                        {drawing.id}
                      </Button>
                    </td>
                    <td>{drawing.drawingNumber}</td>
                    <td>{drawing.drawingIssue}</td>
                    <td>{drawing.urlPath}</td>
                    <td>{drawing.productId ? <Link to={`product/${drawing.productId}`}>{drawing.productId}</Link> : ''}</td>
                    <td>{drawing.amendmentId ? <Link to={`amendment/${drawing.amendmentId}`}>{drawing.amendmentId}</Link> : ''}</td>
                    <td>
                      {drawing.nonConformanceDetailsId ? (
                        <Link to={`non-conformance-details/${drawing.nonConformanceDetailsId}`}>{drawing.nonConformanceDetailsId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${drawing.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${drawing.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${drawing.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Drawings found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ drawing }: IRootState) => ({
  drawingList: drawing.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawing);
