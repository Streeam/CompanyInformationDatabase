import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './image.reducer';
import { IImage } from 'app/shared/model/image.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Image extends React.Component<IImageProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { imageList, match } = this.props;
    return (
      <div>
        <h2 id="image-heading">
          Images
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Image
          </Link>
        </h2>
        <div className="table-responsive">
          {imageList && imageList.length > 0 ? (
            <Table responsive aria-describedby="image-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Url Path</th>
                  <th>Name</th>
                  <th>Last Modified Date</th>
                  <th>Size</th>
                  <th>Type</th>
                  <th>Task Id</th>
                  <th>Nonconformance Details Id</th>
                  <th>Progress Track Id</th>
                  <th>Product</th>
                  <th>Amendment</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {imageList.map((image, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${image.id}`} color="link" size="sm">
                        {image.id}
                      </Button>
                    </td>
                    <td>{image.urlPath}</td>
                    <td>{image.name}</td>
                    <td>
                      <TextFormat type="date" value={image.lastModifiedDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{image.size}</td>
                    <td>{image.type}</td>
                    <td>{image.taskId}</td>
                    <td>{image.nonconformanceDetailsId}</td>
                    <td>{image.progressTrackId}</td>
                    <td>{image.productId ? <Link to={`product/${image.productId}`}>{image.productId}</Link> : ''}</td>
                    <td>{image.amendmentId ? <Link to={`amendment/${image.amendmentId}`}>{image.amendmentId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${image.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${image.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${image.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Images found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ image }: IRootState) => ({
  imageList: image.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
