import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './image.reducer';
import { IImage } from 'app/shared/model/image.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ImageDetail extends React.Component<IImageDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { imageEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Image [<b>{imageEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="urlPath">Url Path</span>
            </dt>
            <dd>{imageEntity.urlPath}</dd>
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{imageEntity.name}</dd>
            <dt>
              <span id="lastModifiedDate">Last Modified Date</span>
            </dt>
            <dd>
              <TextFormat value={imageEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="size">Size</span>
            </dt>
            <dd>{imageEntity.size}</dd>
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{imageEntity.type}</dd>
            <dt>
              <span id="taskId">Task Id</span>
            </dt>
            <dd>{imageEntity.taskId}</dd>
            <dt>
              <span id="nonconformanceDetailsId">Nonconformance Details Id</span>
            </dt>
            <dd>{imageEntity.nonconformanceDetailsId}</dd>
            <dt>
              <span id="progressTrackId">Progress Track Id</span>
            </dt>
            <dd>{imageEntity.progressTrackId}</dd>
            <dt>Product</dt>
            <dd>{imageEntity.productId ? imageEntity.productId : ''}</dd>
            <dt>Amendment</dt>
            <dd>{imageEntity.amendmentId ? imageEntity.amendmentId : ''}</dd>
          </dl>
          <Button tag={Link} to="/image" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/image/${imageEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ image }: IRootState) => ({
  imageEntity: image.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageDetail);
