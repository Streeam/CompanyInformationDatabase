import React, { useEffect, useState, Fragment } from 'react';
import { Card, ButtonGroup, Button } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import clsx from 'clsx';
// tslint:disable
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// tslint:enable
import {
  createEntity as createExtraRouting,
  updateEntity as updateExtraRouting
} from '../../../../entities/extra-routings/extra-routings.reducer';
import SelectSingleRouting from '../../../../shared/layout/custom-components/select/select-single-routing';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { IProduct } from 'app/shared/model/product.model';
import { NONCONFORMANCE_ACTIONS } from 'app/config/constants';

interface INonconformanceInternalExtraRoutingsProps extends StateProps, DispatchProps {
  handleClose;
  open: boolean;
  extraRouting: IExtraRoutings;
  nonConformanceIdType: { type: Nonconformance; id: number };
  labourRate: number;
  updateChildNonConformance?: (fieldsToSave: any) => void;
}

export const internalNonConformanceExtraRoutingDialog = (props: INonconformanceInternalExtraRoutingsProps) => {
  const { handleClose, open, extraRouting, allProducts, labourRate, nonConformanceIdType, internalInternalNonConformance } = props;
  useEffect(() => {}, []);
  const classes = useStyles(props);
  const [routing, setRouting] = useState<string>(null);
  const [noRoutingSelected, setNoRoutingSelected] = useState<boolean>(false);
  const [unitRunTime, setUnitRunTime] = useState<number>(null);
  const onHadleAddExtraRoutings = () => {
    if (!noRoutingSelected) {
      if (nonConformanceIdType) {
        const extraRoutingToSave: IExtraRoutings = extraRouting
          ? {
              ...extraRouting,
              resourceName: allocateRouting(),
              runtime: allocateRuntime()
            }
          : {
              overhead: labourRate,
              resourceName: routing,
              runtime: unitRunTime,
              internalNonConformanceId:
                nonConformanceIdType && nonConformanceIdType.type === Nonconformance.INTERNAL ? nonConformanceIdType.id : null,
              customerNonConformaceId:
                nonConformanceIdType && nonConformanceIdType.type === Nonconformance.CUSTOMER ? nonConformanceIdType.id : null,
              nonconformanceType:
                nonConformanceIdType && nonConformanceIdType.type === Nonconformance.INTERNAL
                  ? Nonconformance.INTERNAL
                  : Nonconformance.CUSTOMER,
              nonconformanceAction:
                nonConformanceIdType.type === Nonconformance.INTERNAL &&
                internalInternalNonConformance.action === NonconformanceAction.SCRAP
                  ? NonconformanceAction.SCRAP
                  : NonconformanceAction.REWORK
            };
        if (!extraRouting) {
          props.createExtraRouting(extraRoutingToSave);
        } else {
          props.updateExtraRouting(extraRoutingToSave);
        }
        setUnitRunTime(0);
        setRouting(null);
      }
      handleClose();
    } else {
      setNoRoutingSelected(true);
    }
  };

  const dropDownRoutingColumn = (products: IProduct[]) => {
    const uniqueRoutings = new Set<string>();
    products.forEach(product => product.routings.forEach(value => uniqueRoutings.add(value.resourceName)));
    return [...uniqueRoutings];
  };

  const allocateRouting = (): string => (routing ? routing : extraRouting ? extraRouting.resourceName : null);
  const allocateRuntime = (): number => (unitRunTime ? unitRunTime : extraRouting ? extraRouting.runtime : 0);

  const handleUnitRunTime = event => {
    setUnitRunTime(event.target.value);
  };
  return (
    <Dialog maxWidth="md" disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Extra Routings</DialogTitle>
      <DialogContent>
        <form className={classes.container} noValidate autoComplete="off">
          <div style={{ width: '700px', height: '400px', padding: '5px' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={8}>
                <SelectSingleRouting
                  createNewRouting={false}
                  routingName={allocateRouting()}
                  setRoutingName={setRouting}
                  routings={dropDownRoutingColumn([...allProducts])}
                  noRoutingSelected={noRoutingSelected}
                  setNoRoutingSelected={setNoRoutingSelected}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  label="Unit Run Time"
                  id="outlined-start-adornment"
                  type="number"
                  fullWidth
                  onChange={handleUnitRunTime}
                  value={allocateRuntime()}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button size="sm" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button size="sm" onClick={onHadleAddExtraRoutings} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ company, internalNonConformance, product }: IRootState) => ({
  overheadRate: company.entities[0].overheadRate,
  internalInternalNonConformance: internalNonConformance.entity,
  allProducts: product.entities
});

const mapDispatchToProps = { updateExtraRouting, createExtraRouting };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceExtraRoutingDialog);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    margin: {
      margin: theme.spacing(1)
    },
    container: {},
    menu: {}
  })
);
