import React, { useState, Fragment } from 'react';
import { Card, Button } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

// tslint:disable
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// tslint:enable
import Transition from '../../../../shared/layout/custom-components/transition/transition';
import {
  updateRoutingAndRefreshParent,
  createRoutingAndRefreshParent,
  getAllEntities as getAllRoutings
} from '../../../../entities/routing/routing.reducer';
import { getAllProductsFromDB, updateEntity as updateProduct } from '../../../../entities/product/product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { IRouting } from 'app/shared/model/routing.model';
import SelectSingleRouting from 'app/shared/layout/custom-components/select/select-single-routing';
import { getNextUniqueRoutingId } from 'app/shared/util/entity-utils';

interface IRoutingProps extends StateProps, DispatchProps {
  handleClose;
  routingDialogOpen: boolean;
  currentRouting: IRouting;
  parentProduct: IProduct;
  setCurrentRouting: Function;
}
export const bomUpdateForm = (props: IRoutingProps) => {
  const { handleClose, routingDialogOpen, currentRouting, allProducts, parentProduct, setCurrentRouting, allRoutings } = props;
  React.useEffect(() => {
    if (isArrayEmpty(allRoutings)) {
      props.getAllRoutings();
    }
  }, []);
  const classes = useStyles(props);

  const [routingName, setRoutingName] = useState<string>(null);
  const [newRoutingName, setNewRoutingName] = useState<string>(null);
  const [resourceType, setResourceType] = useState<string>(null);
  const [unitRunTime, setUnitRunTime] = useState<number>(null);

  const [noRoutingSelected, setNoRoutingSelected] = useState<boolean>(false);
  const [noResourceTypeSelected, setNoResourceTypeSelected] = useState<boolean>(false);
  const [noRunTimeSelected, setNoRunTimeSelected] = useState<boolean>(false);

  const allocateResourceName = (): string => {
    if (routingName) {
      return routingName;
    } else if (newRoutingName) {
      return newRoutingName;
    } else {
      if (currentRouting) {
        return currentRouting.resourceName;
      } else {
        return undefined;
      }
    }
  };
  const allocateResourceType = (): string => (resourceType ? resourceType : currentRouting ? currentRouting.resourceType : undefined);
  const allocateRuntime = (): number => (unitRunTime ? unitRunTime : currentRouting ? currentRouting.unitRunTime : undefined);
  const onHadleUpdateRouting = () => {
    if (allocateResourceName() === undefined || noRoutingSelected) {
      setNoRoutingSelected(true);
    } else if (allocateResourceType() === undefined || noResourceTypeSelected) {
      setNoResourceTypeSelected(true);
    } else if (allocateRuntime() === undefined || noRunTimeSelected) {
      setNoRunTimeSelected(true);
    } else {
      setNoRoutingSelected(false);
      setNoResourceTypeSelected(false);
      setNoRunTimeSelected(false);
      const entityRouting: IRouting = {
        ...currentRouting,
        partNumber: currentRouting ? currentRouting.partNumber : parentProduct.partNumber,
        uniqueIdentifier: getNextUniqueRoutingId([...allRoutings]).toString(),
        resourceName: allocateResourceName(),
        resourceType: allocateResourceType(),
        unitRunTime: allocateRuntime()
      };
      if (currentRouting) {
        new Promise((resolve, reject) => resolve(props.updateRoutingAndRefreshParent(entityRouting, parentProduct.id))).then(() => {
          props.getAllProductsFromDB();
        });
      } else {
        new Promise((resolve, reject) => resolve(props.createRoutingAndRefreshParent(entityRouting, parentProduct.id))).then(() => {
          props.getAllProductsFromDB();
        });
      }
      handleExit();
    }
  };

  const handleExit = () => {
    setRoutingName(null);
    setNewRoutingName(null);
    setResourceType(null);
    setUnitRunTime(0);
    setNoRoutingSelected(false);
    setNoResourceTypeSelected(false);
    setNoRunTimeSelected(false);
    // setCurrentRouting(null);
    handleClose();
  };

  const handleUnitRunTime = event => {
    event.target.value && Number(event.target.value) !== 0 ? setNoRunTimeSelected(false) : setNoRunTimeSelected(true);
    setUnitRunTime(event.target.value);
  };
  const handleResourceType = event => {
    event.target.value ? setNoResourceTypeSelected(false) : setNoResourceTypeSelected(true);
    setResourceType(event.target.value);
  };
  const dropDownRoutingColumn = () => {
    const uniqueRoutings = new Set<string>();
    allRoutings.forEach(value => uniqueRoutings.add(value.resourceName));
    return [...uniqueRoutings];
  };

  return (
    <Dialog
      maxWidth="xl"
      TransitionComponent={Transition}
      disableBackdropClick
      disableEscapeKeyDown
      open={routingDialogOpen}
      onClose={handleExit}
    >
      {currentRouting ? (
        <DialogTitle>Editing {currentRouting.partNumber}</DialogTitle>
      ) : (
        !isEmpty(parentProduct) && <DialogTitle>{`Add a new routing to ${parentProduct.partDescription}`}</DialogTitle>
      )}
      <DialogContent>
        <div className={classes.root}>
          <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem', width: '100%' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <SelectSingleRouting
                  createNewRouting
                  newRoutingName={newRoutingName}
                  setNewRoutingName={setNewRoutingName}
                  routingName={allocateResourceName()}
                  setRoutingName={setRoutingName}
                  routings={dropDownRoutingColumn()}
                  noRoutingSelected={noRoutingSelected}
                  setNoRoutingSelected={setNoRoutingSelected}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  label="Resource Type"
                  id="resourceType"
                  error={noResourceTypeSelected}
                  helperText={noResourceTypeSelected && 'Resource Type Required!'}
                  className={classes.margin}
                  fullWidth
                  onChange={handleResourceType}
                  defaultValue={currentRouting ? currentRouting.resourceType : ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  label="Unit Run Time"
                  id="outlined-start-adornment"
                  type="number"
                  error={noRunTimeSelected}
                  helperText={noRunTimeSelected && 'Run Time Required!'}
                  className={classes.margin}
                  fullWidth
                  onChange={handleUnitRunTime}
                  defaultValue={currentRouting ? currentRouting.unitRunTime : 0}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <br />
          </Card>
        </div>
      </DialogContent>
      <DialogActions>
        <Button size="sm" onClick={handleExit} color="secondary">
          Cancel
        </Button>
        <Button size="sm" onClick={onHadleUpdateRouting} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ product, routing }: IRootState) => ({
  allProducts: product.entities,
  allRoutings: routing.entities
});

const mapDispatchToProps = {
  updateRoutingAndRefreshParent,
  createRoutingAndRefreshParent,
  getAllRoutings,
  getAllProductsFromDB,
  updateProduct
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(bomUpdateForm);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '1200px',
      height: '450px'
    },
    margin: {
      margin: theme.spacing(0),
      padding: theme.spacing(0)
    },
    container: {},
    menu: {}
  })
);
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
