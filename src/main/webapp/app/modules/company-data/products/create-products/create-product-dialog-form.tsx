import React, { useState, Fragment } from 'react';
import { Button } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

// tslint:disable
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// tslint:enable
import Transition from '../../../../shared/layout/custom-components/transition/transition';
import moment, { Moment } from 'moment';
import { createEntity as createProduct, updateEntity as updateProduct } from '../../../../entities/product/product.reducer';
import { IProduct } from 'app/shared/model/product.model';

interface IProductProps extends StateProps, DispatchProps {
  handleClose;
  productDialogOpen: boolean;
  currentProduct: IProduct;
  selectProductAfterUpdate: Function;
}

export const productUpdateForm = (props: IProductProps) => {
  const { handleClose, productDialogOpen, currentProduct, selectProductAfterUpdate, allProducts } = props;
  React.useEffect(() => {}, []);
  const classes = useStyles(props);

  const [partNumberToSave, setPartNumberToSave] = useState<string>(null);
  const [partDescriptionToSave, setPartDescription] = useState<string>(null);
  const [methodTypeToSave, setMethodType] = useState<string>(null);
  const [unitOfMeasureToSave, setUnitOfMeasure] = useState<string>(null);
  const [latestUnitCost, setLatestUnitCost] = useState<number>(null);
  const [standardMaterialCost, setStandardMaterialCost] = useState<number>(null);
  const [obsoleteToSave, setObsolete] = useState<string>(null);

  const [partNumberValidation, setPartNumberValidation] = useState<boolean>(false);
  const [partDescriptionValidation, setPartDescriptionValidation] = useState<boolean>(false);
  const [partUOMValidation, setUOMValidation] = useState<boolean>(false);

  const assignPartNumber = (): string => (partNumberToSave ? partNumberToSave : currentProduct ? currentProduct.partNumber : undefined);
  const assignPartDescription = (): string =>
    partDescriptionToSave ? partDescriptionToSave : currentProduct ? currentProduct.partDescription : undefined;
  const assignMethodTypeToSave = (): string =>
    methodTypeToSave ? methodTypeToSave : currentProduct ? currentProduct.methodType : undefined;
  const assignUnitOfMeasureToSave = (): string =>
    unitOfMeasureToSave ? unitOfMeasureToSave : currentProduct ? currentProduct.unitOfMeasure : undefined;
  const assignLatestUnitCost = (): number =>
    latestUnitCost ? latestUnitCost : currentProduct ? currentProduct.latestUnitMaterialCost : 0.0;
  const assignStandardMaterialCost = (): number =>
    standardMaterialCost ? standardMaterialCost : currentProduct ? currentProduct.standardUnitMaterialCost : 0.0;
  const assignObsoleteToSave = (): string =>
    obsoleteToSave !== null ? obsoleteToSave : currentProduct ? (currentProduct.obsolete ? 'True' : 'False') : undefined;

  const onHadleAddProduct = () => {
    if (assignPartNumber() === undefined) {
      setPartNumberValidation(true);
    } else if (assignPartDescription() === undefined) {
      setPartDescriptionValidation(true);
    } else if (assignUnitOfMeasureToSave() === undefined || unitOfMeasureToSave === '') {
      setUOMValidation(true);
    } else {
      setPartNumberValidation(false);
      setPartDescriptionValidation(false);
      setUOMValidation(false);
      const entityProduct: IProduct = {
        ...currentProduct,
        partNumber: assignPartNumber(),
        partDescription: assignPartDescription(),
        releaseDate: currentProduct ? currentProduct.releaseDate : moment(),
        prime: true,
        productGroupCode: '',
        methodStatus: '',
        methodType: assignMethodTypeToSave(),
        unitOfMeasure: assignUnitOfMeasureToSave(),
        latestUnitMaterialCost: assignLatestUnitCost(),
        standardUnitMaterialCost: assignStandardMaterialCost(),
        obsolete: assignObsoleteToSave() === 'True'
      };
      if (currentProduct) {
        props.updateProduct(entityProduct, selectProductAfterUpdate);
      } else {
        props.createProduct(entityProduct);
      }
      handleExit();
    }
  };
  const handleExit = () => {
    setPartNumberToSave(null);
    setPartDescription(null);
    setMethodType(null);
    setUnitOfMeasure(null);
    setLatestUnitCost(null);
    setStandardMaterialCost(null);
    setObsolete(null);
    setPartNumberValidation(false);
    setPartDescriptionValidation(false);
    setUOMValidation(false);
    handleClose();
  };

  const handlePartNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && allProducts.find(p => p.partNumber === event.target.value) === undefined
      ? setPartNumberValidation(false)
      : setPartNumberValidation(true);
    setPartNumberToSave(event.target.value);
  };
  const handlePartDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && event.target.value !== '' ? setPartDescriptionValidation(false) : setPartDescriptionValidation(true);
    setPartDescription(event.target.value);
  };
  const handleMethodType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethodType(event.target.value);
  };
  const handleUnitOfMeasure = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && event.target.value !== '' ? setUOMValidation(false) : setUOMValidation(true);
    setUnitOfMeasure(event.target.value);
  };
  const handleLatestUnitCost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatestUnitCost(Number(event.target.value));
  };
  const handleStandardUnitCost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStandardMaterialCost(Number(event.target.value));
  };
  const handleObsolete = (event: React.ChangeEvent<HTMLInputElement>) => {
    setObsolete(event.target.value);
  };

  return (
    <Dialog
      maxWidth="xl"
      TransitionComponent={Transition}
      disableBackdropClick
      disableEscapeKeyDown
      open={productDialogOpen}
      onClose={handleExit}
    >
      {currentProduct ? (
        <DialogTitle>Edit Product {currentProduct.partNumber}</DialogTitle>
      ) : (
        <DialogTitle>Create a new Product</DialogTitle>
      )}
      <DialogContent>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                defaultValue={currentProduct ? currentProduct.partNumber : ''}
                required
                fullWidth
                error={partNumberValidation}
                helperText={partNumberValidation && 'You must add a unique part number!'}
                id="partNumber"
                label="Part Number"
                onChange={handlePartNumber}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                defaultValue={currentProduct ? currentProduct.partDescription : ''}
                required
                fullWidth
                error={partDescriptionValidation}
                helperText={partDescriptionValidation && 'You must provide a description!'}
                id="partDescription"
                label="Description"
                onChange={handlePartDescription}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                defaultValue={currentProduct ? currentProduct.methodType : ''}
                fullWidth
                id="methodType"
                label="Method Type"
                onChange={handleMethodType}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                defaultValue={currentProduct ? currentProduct.unitOfMeasure : ''}
                fullWidth
                id="UOM"
                error={partUOMValidation}
                helperText={partUOMValidation && 'You must provide a unit of measure!'}
                label="Unit of Measure"
                onChange={handleUnitOfMeasure}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth variant="outlined" className={classes.margin}>
                <InputLabel htmlFor="latestUnitMaterialCost">Latest Unit Cost</InputLabel>
                <OutlinedInput
                  id="latestUnitMaterialCost"
                  type="number"
                  defaultValue={currentProduct ? currentProduct.latestUnitMaterialCost : 0.0}
                  onChange={handleLatestUnitCost}
                  startAdornment={<InputAdornment position="start">£</InputAdornment>}
                  labelWidth={120}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth variant="outlined" className={classes.margin}>
                <InputLabel htmlFor="standardUnitMaterialCost">Standard Unit Cost</InputLabel>
                <OutlinedInput
                  id="standardUnitMaterialCost"
                  type="number"
                  defaultValue={currentProduct ? currentProduct.standardUnitMaterialCost : 0.0}
                  onChange={handleStandardUnitCost}
                  startAdornment={<InputAdornment position="start">£</InputAdornment>}
                  labelWidth={140}
                />
              </FormControl>
            </Grid>
            {currentProduct && (
              <Grid item xs={12} sm={2}>
                <TextField
                  required
                  fullWidth
                  id="obsoleteTextfield"
                  select
                  label="Obsolete"
                  className={classes.textField}
                  value={assignObsoleteToSave()}
                  onChange={handleObsolete}
                  margin="normal"
                  variant="outlined"
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  <MenuItem value="True">True</MenuItem>
                  <MenuItem value="False">False</MenuItem>
                </TextField>
              </Grid>
            )}
          </Grid>
          <br />
        </div>
      </DialogContent>
      <DialogActions>
        <Button size="sm" onClick={handleExit} color="secondary">
          Cancel
        </Button>
        <Button size="sm" onClick={onHadleAddProduct} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ product }: IRootState) => ({
  allProducts: product.entities
});

const mapDispatchToProps = { updateProduct, createProduct };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productUpdateForm);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '1200px'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      maxWidth: '250px'
    },
    textFieldDescription: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '545px'
    },
    margin: {
      margin: theme.spacing(2, 0, 0, 0)
    },
    container: {},
    menu: {}
  })
);
