import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { AntTab, AntTabs, TabPanel } from 'app/shared/layout/custom-components/Tabs/tab';
import FishboneChart from 'fishbone-chart';
// tslint:disable
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { IActionToBeTaken } from 'app/shared/model/action-to-be-taken.model';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { updateEntity as updateRooCause } from '../../../../../entities/action-to-be-taken/action-to-be-taken.reducer';
import {
  createEntity as createFishBoneItem,
  updateEntity as updateFishBoneItem,
  getRootCauseFishboneItems
} from '../../../../../entities/fish-bone/fish-bone.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { FishBoneTypes } from 'app/shared/model/enumerations/fish-bone-types.model';
import { IFishBone } from 'app/shared/model/fish-bone.model';
import FishboneSubCauseComponent from './fishbone-sub-cause-component';
// tslint:enable

interface IRootCauseProps extends StateProps, DispatchProps {
  isDisabled?: boolean;
}

export const rootCauseAnalisys = (props: IRootCauseProps) => {
  const { rootCause, rootCauseFishBones, isDisabled } = props;
  useEffect(() => {
    if (!isEmpty(rootCause) && isArrayEmpty(rootCauseFishBones)) {
      props.getRootCauseFishboneItems(rootCause.id);
    }
  }, []);
  const [problem, setProblem] = useState<string>(null);
  const [rootCauseToSave, setRootCauseToSave] = useState<string>(null);

  const equipment: string[] = !isArrayEmpty(rootCauseFishBones)
    ? rootCauseFishBones.filter(item => item.fishboneTypes === FishBoneTypes.EQUIPMENT).map(value => value.subCategory)
    : [];
  const people: string[] = !isArrayEmpty(rootCauseFishBones)
    ? rootCauseFishBones.filter(item => item.fishboneTypes === FishBoneTypes.PEOPLE).map(value => value.subCategory)
    : [];
  const process: string[] = !isArrayEmpty(rootCauseFishBones)
    ? rootCauseFishBones.filter(item => item.fishboneTypes === FishBoneTypes.PROCESS).map(value => value.subCategory)
    : [];
  const materials: string[] = !isArrayEmpty(rootCauseFishBones)
    ? rootCauseFishBones.filter(item => item.fishboneTypes === FishBoneTypes.MATERIALS).map(value => value.subCategory)
    : [];
  const environment: string[] = !isArrayEmpty(rootCauseFishBones)
    ? rootCauseFishBones.filter(item => item.fishboneTypes === FishBoneTypes.ENVIRONMENT).map(value => value.subCategory)
    : [];
  const management: string[] = !isArrayEmpty(rootCauseFishBones)
    ? rootCauseFishBones.filter(item => item.fishboneTypes === FishBoneTypes.MANAGEMENT).map(value => value.subCategory)
    : [];
  const maintenance: string[] = !isArrayEmpty(rootCauseFishBones)
    ? rootCauseFishBones.filter(item => item.fishboneTypes === FishBoneTypes.MAINTENANCE).map(value => value.subCategory)
    : [];
  const inspection: string[] = !isArrayEmpty(rootCauseFishBones)
    ? rootCauseFishBones.filter(item => item.fishboneTypes === FishBoneTypes.INSPECTION).map(value => value.subCategory)
    : [];
  const assignProblem: string = problem ? problem : rootCause ? (rootCause.problem ? rootCause.problem : 'State Problem') : undefined;
  const fishBoneData = () => {
    return !isEmpty(rootCause)
      ? {
          [assignProblem]: {
            Equipment: equipment,
            People: people,
            Process: process,
            Materials: materials,
            Environment: environment,
            Management: management,
            Maintenance: maintenance,
            Inspection: inspection
          }
        }
      : {};
  };
  const handleProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblem(event.target.value);
  };
  const problemUpdate = event => {
    props.updateRooCause({ ...rootCause, problem: event.target.value });
  };
  const handleRootCause = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRootCauseToSave(event.target.value);
  };
  const rootCauseUpdate = event => {
    if (event.target.value === undefined || event.target.value.trim() === '') {
      props.updateRooCause({ ...rootCause, rootCause: null });
    } else {
      props.updateRooCause({ ...rootCause, rootCause: event.target.value });
    }
  };
  const handleAddMaterial = () => {
    const newSubCause: IFishBone = { fishboneTypes: FishBoneTypes.MATERIALS, rootCauseId: rootCause.id };
    props.createFishBoneItem(newSubCause);
  };
  const handleAddEquipment = () => {
    const newSubCause: IFishBone = { fishboneTypes: FishBoneTypes.EQUIPMENT, rootCauseId: rootCause.id };
    props.createFishBoneItem(newSubCause);
  };
  const handleAddPeople = () => {
    const newSubCause: IFishBone = { fishboneTypes: FishBoneTypes.PEOPLE, rootCauseId: rootCause.id };
    props.createFishBoneItem(newSubCause);
  };
  const handleAddProcess = () => {
    const newSubCause: IFishBone = { fishboneTypes: FishBoneTypes.PROCESS, rootCauseId: rootCause.id };
    props.createFishBoneItem(newSubCause);
  };
  const handleAddEnvironment = () => {
    const newSubCause: IFishBone = { fishboneTypes: FishBoneTypes.ENVIRONMENT, rootCauseId: rootCause.id };
    props.createFishBoneItem(newSubCause);
  };
  const handleAddManagement = () => {
    const newSubCause: IFishBone = { fishboneTypes: FishBoneTypes.MANAGEMENT, rootCauseId: rootCause.id };
    props.createFishBoneItem(newSubCause);
  };
  const handleAddMaintenance = () => {
    const newSubCause: IFishBone = { fishboneTypes: FishBoneTypes.MAINTENANCE, rootCauseId: rootCause.id };
    props.createFishBoneItem(newSubCause);
  };
  const handleAddInspection = () => {
    const newSubCause: IFishBone = { fishboneTypes: FishBoneTypes.INSPECTION, rootCauseId: rootCause.id };
    props.createFishBoneItem(newSubCause);
  };

  return (
    !isEmpty(rootCause) && (
      <Card style={{ backgroundColor: 'white', margin: '0 5px 5px 5px', padding: '1rem' }}>
        <div style={{ margin: '10px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                defaultValue={rootCause.problem ? rootCause.problem : ''}
                fullWidth
                required
                disabled={isDisabled}
                id="problem"
                label="Problem"
                onChange={handleProblem}
                onBlur={problemUpdate}
                margin="dense"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <br />
          <FishboneChart data={fishBoneData()} />
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Card style={{ width: '100%', backgroundColor: 'white', margin: '5px', padding: '0.6rem' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    Equipment/Machine
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton size="small" disabled={isDisabled} onClick={handleAddEquipment} title={'Add Sub-Cause'} aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Grid>
                  <FishboneSubCauseComponent isDisabled={isDisabled} fishBoneType={FishBoneTypes.EQUIPMENT} />
                </Grid>
              </Card>
              <Card style={{ width: '100%', backgroundColor: 'white', margin: '5px', padding: '0.6rem' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    People
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton size="small" disabled={isDisabled} onClick={handleAddPeople} title={'Add Sub-Cause'} aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Grid>
                  <FishboneSubCauseComponent isDisabled={isDisabled} fishBoneType={FishBoneTypes.PEOPLE} />
                </Grid>
              </Card>
              <Card style={{ width: '100%', backgroundColor: 'white', margin: '5px', padding: '0.6rem' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    Method/Process
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton size="small" disabled={isDisabled} onClick={handleAddProcess} title={'Add Sub-Cause'} aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Grid>
                  <FishboneSubCauseComponent isDisabled={isDisabled} fishBoneType={FishBoneTypes.PROCESS} />
                </Grid>
              </Card>
              <Card style={{ width: '100%', backgroundColor: 'white', margin: '5px', padding: '0.6rem' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    Materials
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton size="small" disabled={isDisabled} onClick={handleAddMaterial} title={'Add Sub-Cause'} aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Grid>
                  <FishboneSubCauseComponent isDisabled={isDisabled} fishBoneType={FishBoneTypes.MATERIALS} />
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card style={{ width: '100%', backgroundColor: 'white', margin: '5px', padding: '0.6rem' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    Environment
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton
                        size="small"
                        disabled={isDisabled}
                        onClick={handleAddEnvironment}
                        title={'Add Sub-Cause'}
                        aria-label="add"
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Grid>
                  <FishboneSubCauseComponent isDisabled={isDisabled} fishBoneType={FishBoneTypes.ENVIRONMENT} />
                </Grid>
              </Card>
              <Card style={{ width: '100%', backgroundColor: 'white', margin: '5px', padding: '0.6rem' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    Management
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton size="small" disabled={isDisabled} onClick={handleAddManagement} title={'Add Sub-Cause'} aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Grid>
                  <FishboneSubCauseComponent isDisabled={isDisabled} fishBoneType={FishBoneTypes.MANAGEMENT} />
                </Grid>
              </Card>
              <Card style={{ width: '100%', backgroundColor: 'white', margin: '5px', padding: '0.6rem' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    Maintenance
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton
                        size="small"
                        disabled={isDisabled}
                        onClick={handleAddMaintenance}
                        title={'Add Sub-Cause'}
                        aria-label="add"
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Grid>
                  <FishboneSubCauseComponent isDisabled={isDisabled} fishBoneType={FishBoneTypes.MAINTENANCE} />
                </Grid>
              </Card>
              <Card style={{ width: '100%', backgroundColor: 'white', margin: '5px', padding: '0.6rem' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    Inspection
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton size="small" disabled={isDisabled} onClick={handleAddInspection} title={'Add Sub-Cause'} aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Grid>
                  <FishboneSubCauseComponent isDisabled={isDisabled} fishBoneType={FishBoneTypes.INSPECTION} />
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </div>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              defaultValue={rootCause.rootCause ? rootCause.rootCause : ''}
              fullWidth
              required
              disabled={isDisabled}
              id="rootCause"
              label="Root Cause"
              onChange={handleRootCause}
              onBlur={rootCauseUpdate}
              margin="dense"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Card>
    )
  );
};

const mapStateToProps = ({ actionToBeTaken, fishBone }: IRootState) => ({
  rootCause: actionToBeTaken.entity,
  rootCauseFishBones: fishBone.entities
});

const mapDispatchToProps = { updateRooCause, getRootCauseFishboneItems, updateFishBoneItem, createFishBoneItem };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(rootCauseAnalisys);
