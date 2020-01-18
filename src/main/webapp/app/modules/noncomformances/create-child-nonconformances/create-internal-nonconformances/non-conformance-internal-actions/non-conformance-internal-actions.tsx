import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { getEntity as getNonconformance } from '../../../../../entities/non-conformance-details/non-conformance-details.reducer';
import { getEntities as getExtraBoms } from '../../../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../../../entities/extra-routings/extra-routings.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import NonconformanceInternalScrap from './non-conformance-internal-scrap';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
// tslint:disable
import Card from '@material-ui/core/Card';
// tslint:enable
import { IBom } from 'app/shared/model/bom.model';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import NonConformanceAdditionalExpenses from '../../non-conformance-additional-expenses/non-conformance-additional-expenses-main';

interface INonconformanceInternalActionsProps extends StateProps, DispatchProps {
  extraRoutings: IExtraRoutings[];
  setExtraRoutings: Function;
  extraBoms: IBom[];
  setExtraBoms: Function;
  updateInternalNonConformance: (fieldsToSave: any) => void;
  nonconformaceId: string;
}

export const internalNonConformanceActions = (props: INonconformanceInternalActionsProps) => {
  const {
    extraRoutings,
    setExtraRoutings,
    extraBoms,
    setExtraBoms,
    internalNonConformance,
    updateInternalNonConformance,
    internalLoading,
    nonconformaceId,
    allExtraRoutings,
    allExtraBoms
  } = props;
  useEffect(() => {
    if (nonconformaceId) {
      props.getNonconformance(nonconformaceId);
    }
    if (isArrayEmpty(allExtraBoms)) {
      props.getExtraBoms();
    }
    if (isArrayEmpty(allExtraRoutings)) {
      props.getExtraRoutings();
    }
  }, []);
  const [action, setAction] = useState<NonconformanceAction>(null);

  const hadleSelect = (actionString: NonconformanceAction) => (): void => {
    setAction(actionString);
    updateInternalNonConformance({ action: actionString });
  };

  const allocateAction = (): NonconformanceAction => {
    if (!action && !isEmpty(internalNonConformance) && internalNonConformance.action) {
      return internalNonConformance.action;
    } else {
      return action;
    }
  };
  const allocateExtraBoms = (): IExtraBoms[] => {
    return !isArrayEmpty(allExtraBoms) ? allExtraBoms.filter(item => item.internalNonconformanceId === internalNonConformance.id) : [];
  };
  const allocateExtraRoutings = (): IExtraRoutings[] => {
    return !isArrayEmpty(allExtraRoutings)
      ? allExtraRoutings.filter(item => item.internalNonConformanceId === internalNonConformance.id)
      : [];
  };
  return (
    <Card style={{ width: '100%', margin: '10px 0 10px 0', padding: '1.5rem' }}>
      <h5>Select Action</h5>
      <ButtonGroup>
        <Button
          id="1"
          size="sm"
          color="secondary"
          onClick={hadleSelect(NonconformanceAction.SCRAP)}
          active={allocateAction() === NonconformanceAction.SCRAP}
          disabled={internalLoading}
        >
          Scrap
        </Button>
        <Button
          size="sm"
          color="secondary"
          onClick={hadleSelect(NonconformanceAction.REWORK)}
          disabled={internalLoading}
          active={allocateAction() === NonconformanceAction.REWORK}
        >
          Rework
        </Button>
      </ButtonGroup>
      <br />
      {allocateAction() === NonconformanceAction.SCRAP && <NonconformanceInternalScrap />}
      {allocateAction() === NonconformanceAction.REWORK && (
        <NonConformanceAdditionalExpenses
          extraRoutings={allocateExtraRoutings().filter(routing => routing.nonconformanceAction === NonconformanceAction.REWORK)}
          extraBoms={allocateExtraBoms()}
          nonConformanceIdType={!isEmpty(internalNonConformance) ? { type: Nonconformance.INTERNAL, id: internalNonConformance.id } : null}
          labourRate={!isEmpty(internalNonConformance) ? internalNonConformance.labourRate : 0}
        />
      )}
    </Card>
  );
};

const mapStateToProps = ({
  site,
  department,
  internalNonConformance,
  company,
  nonConformanceDetails,
  extraRoutings,
  extraBoms
}: IRootState) => ({
  allSites: site.entities,
  allDepartments: department.entities,
  internalNonConformance: internalNonConformance.entity,
  internalLoading: internalNonConformance.loading || internalNonConformance.updating,
  companies: company.entities,
  incompleteNonconformance: nonConformanceDetails.entity,
  nonConformanceDetailsLoading: nonConformanceDetails.loading,
  allExtraRoutings: extraRoutings.entities,
  allExtraBoms: extraBoms.entities
});

const mapDispatchToProps = { getNonconformance, getExtraRoutings, getExtraBoms };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceActions);
