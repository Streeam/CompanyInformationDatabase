import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './fish-bone.reducer';
import { IFishBone } from 'app/shared/model/fish-bone.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFishBoneProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FishBone extends React.Component<IFishBoneProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { fishBoneList, match } = this.props;
    return (
      <div>
        <h2 id="fish-bone-heading">
          Fish Bones
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Fish Bone
          </Link>
        </h2>
        <div className="table-responsive">
          {fishBoneList && fishBoneList.length > 0 ? (
            <Table responsive aria-describedby="fish-bone-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fishbone Types</th>
                  <th>Sub Category</th>
                  <th>Root Cause Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {fishBoneList.map((fishBone, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${fishBone.id}`} color="link" size="sm">
                        {fishBone.id}
                      </Button>
                    </td>
                    <td>{fishBone.fishboneTypes}</td>
                    <td>{fishBone.subCategory}</td>
                    <td>{fishBone.rootCauseId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${fishBone.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${fishBone.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${fishBone.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Fish Bones found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ fishBone }: IRootState) => ({
  fishBoneList: fishBone.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FishBone);
