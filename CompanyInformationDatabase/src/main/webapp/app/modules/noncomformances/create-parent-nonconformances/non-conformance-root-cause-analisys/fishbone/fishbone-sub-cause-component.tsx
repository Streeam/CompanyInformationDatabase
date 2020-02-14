import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
// tslint:disable
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// tslint:enable
import { updateEntity as updateRooCause } from '../../../../../entities/action-to-be-taken/action-to-be-taken.reducer';
import {
  deleteEntity as deleteFishBoneItem,
  updateEntity as updateFishBoneItem,
  getRootCauseFishboneItems
} from '../../../../../entities/fish-bone/fish-bone.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { FishBoneTypes } from 'app/shared/model/enumerations/fish-bone-types.model';

interface IFishboneSuCauseComponentProps extends StateProps, DispatchProps {
  fishBoneType: FishBoneTypes;
  isDisabled?: boolean;
}

export const fishboneSubCauseComponent = (props: IFishboneSuCauseComponentProps) => {
  const { rootCause, rootCauseFishBones, fishBoneType, isDisabled } = props;
  const [subCause, setSubCause] = useState<string>(undefined);

  const handleRemoveFishBoneSubCause = (id: number) => {
    props.deleteFishBoneItem(id);
  };
  const subCauseUpdate = (event, rootCauseFishBone) => {
    if (event.target.value === undefined || event.target.value.trim() === '') {
      props.deleteFishBoneItem(rootCauseFishBone.id);
    } else {
      props.updateFishBoneItem({ ...rootCauseFishBone, subCategory: event.target.value });
    }
    setSubCause(undefined);
  };

  const subCauseOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubCause(event.target.value);
  };

  return (
    <Grid container spacing={1}>
      {!isArrayEmpty(rootCauseFishBones) &&
        rootCauseFishBones.length > 0 &&
        rootCauseFishBones
          .filter(item => item.fishboneTypes === fishBoneType)
          .map(rootCauseFishBone => (
            <Fragment key={rootCauseFishBone.id}>
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={11}>
                <TextField
                  fullWidth
                  label="Sub-Cause"
                  margin="dense"
                  onChange={subCauseOnChange}
                  disabled={isDisabled}
                  // tslint:disable
                  onBlur={() => subCauseUpdate(event, rootCauseFishBone)}
                  // tslint:enable
                  defaultValue={rootCauseFishBone.subCategory ? rootCauseFishBone.subCategory : subCause ? subCause : ''}
                  variant="outlined"
                />
              </Grid>
            </Fragment>
          ))}
    </Grid>
  );
};

const mapStateToProps = ({ actionToBeTaken, fishBone }: IRootState) => ({
  rootCause: actionToBeTaken.entity,
  rootCauseFishBones: fishBone.entities
});

const mapDispatchToProps = { updateRooCause, getRootCauseFishboneItems, updateFishBoneItem, deleteFishBoneItem };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(fishboneSubCauseComponent);
