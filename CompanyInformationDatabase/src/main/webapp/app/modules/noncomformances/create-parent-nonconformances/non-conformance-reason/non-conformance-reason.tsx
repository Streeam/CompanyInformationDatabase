import React, { useState, useEffect, Fragment } from 'react';
// tslint:disable
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
// tslint:enable
import { Card } from 'reactstrap';
import Select from 'react-select';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { INonConformanceType } from 'app/shared/model/non-conformance-type.model';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getEntities as getAllRejectionReasons } from '../../../../entities/non-conformance-type/non-conformance-type.reducer';
import { getEntities as getAllRootCauses } from '../../../../entities/action-to-be-taken/action-to-be-taken.reducer';
import { getEntities as getAllShortTerm } from '../../../../entities/short-term-action/short-term-action.reducer';
import { getEntities as getAllLongTerm } from '../../../../entities/long-term-action/long-term-action.reducer';
import { NONCONFORMANCE_ACTIONS } from 'app/config/constants';
import { IActionToBeTaken } from 'app/shared/model/action-to-be-taken.model';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import DropZoneWithPreview from '../../../../shared/layout/custom-components/dropzone/dropzoneWithPreviews';
import { addRootCausePermission, addNonConformanceReasonPermission } from 'app/shared/util/entity-utils';

interface INonConformanceReason extends StateProps, DispatchProps {
  rejectionReasonError: boolean;
  setRejectionReasonError: Function;
  updateNonConformance: Function;
}

export const nonConformanceReason = (props: INonConformanceReason) => {
  const {
    allRejectionReasons,
    incompleteNonConformance,
    rejectionReasonError,
    setRejectionReasonError,
    updateNonConformance,
    currentEmployee
  } = props;
  const [rejectionReason, setRejectionReason] = useState<INonConformanceType>(null);

  useEffect(() => {
    if (isArrayEmpty(allRejectionReasons)) {
      props.getAllRejectionReasons();
    }
  }, []);

  const rejectionReasonInputHandler = (value: { value: string }) => {
    if (value) {
      const mappedValue: INonConformanceType =
        allRejectionReasons && allRejectionReasons.length > 0
          ? allRejectionReasons.filter(rejectionReasonValue => rejectionReasonValue.rejectionCode === value.value)[0]
          : null;
      setRejectionReason(mappedValue);
      setRejectionReasonError(false);
      hadleRejectionReasonUpdate(mappedValue);
    } else {
      setRejectionReason(null);
      setRejectionReasonError(true);
    }
  };

  const saveActionLink = (redirect, title) => {
    return (
      <Grid style={{ textAlign: 'right' }} item xs={12} sm={1}>
        <Link to={redirect}>
          <IconButton aria-label="add" title={title}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Link>
      </Grid>
    );
  };
  const addActionsPrivilege = true;
  const saveActionButton = action => {
    switch (action) {
      case NONCONFORMANCE_ACTIONS.ROOT_CAUSE:
        return addRootCausePermission(currentEmployee) ? saveActionLink(`/entity/action-to-be-taken`, 'Add Root Cause') : null;
      case NONCONFORMANCE_ACTIONS.REJECTION_REASON:
        return addNonConformanceReasonPermission(currentEmployee)
          ? saveActionLink(`/entity/non-conformance-type`, 'Add Nonconformance Detail')
          : null;
      case NONCONFORMANCE_ACTIONS.SHORT_TERM:
        return addActionsPrivilege ? saveActionLink(`/entity/short-term-action`, 'Add Short Term Corective Action') : null;
      case NONCONFORMANCE_ACTIONS.LONG_TERM:
        return addActionsPrivilege ? saveActionLink(`/entity/long-term-action`, 'Add Long Term Corective Action') : null;
      default:
        return null;
    }
  };

  const hadleRejectionReasonUpdate = (rejectionReasonToSave: INonConformanceType) => {
    updateNonConformance({ nonConformanceType: rejectionReasonToSave });
  };

  const allocateRejectionReason = (): INonConformanceType | null =>
    rejectionReason ? rejectionReason : incompleteNonConformance ? { ...incompleteNonConformance }.nonConformanceType : null;

  const extractRejectionReasons = (rejectionReasons: INonConformanceType[], type: NonConformanceDetailsType) => {
    const options = [];
    if (rejectionReasons && rejectionReasons.length > 0) {
      rejectionReasons.forEach(rejectionReasonValue => {
        if (type === NonConformanceDetailsType.TITLE) {
          options.push({ value: rejectionReasonValue.rejectionCode, label: rejectionReasonValue.rejectionTitle });
        } else {
          options.push({ value: rejectionReasonValue.rejectionCode, label: rejectionReasonValue.rejectionCode });
        }
      });
    }
    return options;
  };

  const styleEmptyField = (isValueEmpty: boolean) => {
    if (isValueEmpty) {
      return {
        control: (base, state) => ({
          ...base,
          borderColor: 'red'
        })
      };
    } else {
      return {
        control: (base, state) => ({
          ...base
        })
      };
    }
  };
  return (
    <Fragment>
      <div>
        <Grid container spacing={0}>
          <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem', width: '100%' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <h5>Non-conformance/Defect Classification</h5>
              </Grid>
              <Grid item xs={12} sm={1}>
                <p>Code*</p>
              </Grid>
              <Grid item xs={12} sm={11}>
                <p>Non-conformance/Defect Description*</p>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Select
                  styles={styleEmptyField(rejectionReasonError)}
                  value={{
                    value: allocateRejectionReason() ? allocateRejectionReason().rejectionCode : null,
                    label: allocateRejectionReason() ? allocateRejectionReason().rejectionCode : null
                  }}
                  onChange={rejectionReasonInputHandler}
                  options={extractRejectionReasons([...allRejectionReasons], NonConformanceDetailsType.CODE)}
                  defaultValue={allRejectionReasons && allRejectionReasons.length > 0 ? [...allRejectionReasons][0].rejectionCode : ''}
                />
              </Grid>
              <Grid item xs={12} sm={addActionsPrivilege ? 10 : 11}>
                <Select
                  styles={styleEmptyField(rejectionReasonError)}
                  value={{
                    value: allocateRejectionReason() ? allocateRejectionReason().rejectionCode : null,
                    label: allocateRejectionReason() ? allocateRejectionReason().rejectionTitle : null
                  }}
                  onChange={rejectionReasonInputHandler}
                  options={extractRejectionReasons([...allRejectionReasons], NonConformanceDetailsType.TITLE)}
                  isSearchable
                  defaultValue={allRejectionReasons && allRejectionReasons.length > 0 ? [...allRejectionReasons][0].rejectionTitle : ''}
                />
              </Grid>
              {saveActionButton(NONCONFORMANCE_ACTIONS.REJECTION_REASON)}
              {rejectionReasonError && (
                <Grid item xs={12} sm={12}>
                  <p style={{ color: 'red', padding: '5px' }}>Non-conformance/Defect Classification Required!</p>
                </Grid>
              )}
            </Grid>
          </Card>
        </Grid>
      </div>
    </Fragment>
  );
};
const mapStateToProps = ({
  nonConformanceType,
  actionToBeTaken,
  shortTermAction,
  longTermAction,
  nonConformanceDetails,
  internalNonConformance,
  company,
  employee
}: IRootState) => ({
  allShortTermActions: shortTermAction.entities,
  allLongTermActions: longTermAction.entities,
  allRootCauses: actionToBeTaken.entities,
  allRejectionReasons: nonConformanceType.entities,
  incompleteNonConformance: nonConformanceDetails.entity,
  companies: company.entities,
  incompleteInternalNonConformance: internalNonConformance.entity,
  loadingRejections: nonConformanceType.loading,
  currentEmployee: employee.currentEmployeeEntity
});

const mapDispatchToProps = {
  getAllRejectionReasons,
  getAllShortTerm,
  getAllLongTerm
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nonConformanceReason);

const enum NonConformanceDetailsType {
  TITLE = 'TITLE',
  CODE = 'CODE'
}
