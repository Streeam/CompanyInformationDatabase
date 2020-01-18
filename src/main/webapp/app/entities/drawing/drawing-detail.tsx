import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './drawing.reducer';
import { IDrawing } from 'app/shared/model/drawing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDrawingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DrawingDetail extends React.Component<IDrawingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { drawingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Drawing [<b>{drawingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="drawingNumber">Drawing Number</span>
            </dt>
            <dd>{drawingEntity.drawingNumber}</dd>
            <dt>
              <span id="drawingIssue">Drawing Issue</span>
            </dt>
            <dd>{drawingEntity.drawingIssue}</dd>
            <dt>
              <span id="urlPath">Url Path</span>
            </dt>
            <dd>{drawingEntity.urlPath}</dd>
            <dt>Product</dt>
            <dd>{drawingEntity.productId ? drawingEntity.productId : ''}</dd>
            <dt>Amendment</dt>
            <dd>{drawingEntity.amendmentId ? drawingEntity.amendmentId : ''}</dd>
            <dt>Non Conformance Details</dt>
            <dd>{drawingEntity.nonConformanceDetailsId ? drawingEntity.nonConformanceDetailsId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/drawing" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/drawing/${drawingEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ drawing }: IRootState) => ({
  drawingEntity: drawing.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawingDetail);
