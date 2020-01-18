import React, { useState, Fragment } from 'react';
import { Card, Button } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import Select from 'react-select';

// tslint:disable
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// tslint:enable
import Transition from '../../../../shared/layout/custom-components/transition/transition';
import { updateBomAndRefreshParent, createBomAndRefreshParent } from '../../../../entities/bom/bom.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { IBom } from 'app/shared/model/bom.model';
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { isNull } from 'util';

interface IBomProps extends StateProps, DispatchProps {
  handleClose;
  bomDialogOpen: boolean;
  currentBom: IBom;
  parentProduct: IProduct;
  setCurrentBom: Function;
}

export const bomUpdateForm = (props: IBomProps) => {
  const { handleClose, bomDialogOpen, currentBom, allProducts, parentProduct, setCurrentBom } = props;
  React.useEffect(() => {}, []);
  const classes = useStyles(props);

  const [productDescription, setProductDescription] = useState<{ partNumber: string; description: string }>(null);
  const [quantity, setQuantity] = useState<number>(null);

  const [productValidation, setProductValidation] = useState<boolean>(false);
  const [quantityValidation, setQuantityValidation] = useState<boolean>(false);
  const extractDescription = (bom: IBom): string => {
    const mappedProduct: IProduct =
      !isArrayEmpty(allProducts) && allProducts.filter(product => bom.childPartNumber === product.partNumber)[0];
    return `${mappedProduct.partNumber}: ${mappedProduct.partDescription}`;
  };
  const assignPartDescription = (): string =>
    productDescription ? productDescription.description : currentBom ? extractDescription(currentBom) : undefined;
  const assignQuantity = (): number => (quantity ? quantity : currentBom ? currentBom.quantity : undefined);

  const allocateProductDescription = (): string | null =>
    productDescription
      ? `${productDescription.partNumber}: ${productDescription.description}`
      : currentBom
      ? extractDescription(currentBom)
      : null;

  const onHadleUpdateBom = () => {
    if (assignPartDescription() === undefined || productValidation) {
      setProductValidation(true);
    } else if (assignQuantity() === undefined || quantityValidation || quantity === 0) {
      setQuantityValidation(true);
    } else {
      setProductValidation(false);
      setQuantityValidation(false);
      const entityBom: IBom = {
        ...currentBom,
        partNumber: currentBom ? currentBom.partNumber : parentProduct.partNumber,
        childPartNumber: currentBom ? currentBom.childPartNumber : productDescription.partNumber,
        quantity: quantity ? quantity : currentBom ? currentBom.quantity : 1,
        sequenceNumber: 0
      };
      if (currentBom) {
        props.updateBomAndRefreshParent(entityBom, parentProduct.id);
      } else {
        props.createBomAndRefreshParent(entityBom, parentProduct.id);
      }
      handleExit();
    }
  };
  const handleExit = () => {
    setProductDescription(null);
    setQuantity(null);
    setProductValidation(false);
    setQuantityValidation(false);
    setCurrentBom(null);
    handleClose();
  };
  const productDescriptionInputHandler = (event: { value: string }) => {
    if (event) {
      const partNo = event.value.split(': ')[0];
      const partDesc = event.value.split(': ')[1];
      setProductDescription({ partNumber: partNo, description: partDesc });
      setProductValidation(false);
    } else {
      setProductDescription(null);
      setProductValidation(true);
    }
  };
  const handleQuantityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && Number(event.target.value) !== 0 ? setQuantityValidation(false) : setQuantityValidation(true);
    setQuantity(Number(event.target.value));
  };
  return (
    <Dialog
      maxWidth="xl"
      TransitionComponent={Transition}
      disableBackdropClick
      disableEscapeKeyDown
      open={bomDialogOpen}
      onClose={handleExit}
    >
      {currentBom ? <DialogTitle>Edit BOM {currentBom.partNumber}</DialogTitle> : <DialogTitle>Create a new BOM</DialogTitle>}
      <DialogContent>
        <div className={classes.root}>
          <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem', width: '100%' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={10}>
                <p>Part Number*</p>
              </Grid>
              <Grid item xs={12} sm={2}>
                <p>Quantity*</p>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Select
                  styles={styleEmptyField(productValidation)}
                  value={{
                    value: allocateProductDescription() ? allocateProductDescription() : null,
                    label: allocateProductDescription() ? allocateProductDescription() : null
                  }}
                  onChange={productDescriptionInputHandler}
                  options={extractProductOptions([...allProducts])}
                  isSearchable
                  defaultValue={currentBom ? extractDescription(currentBom) : !isArrayEmpty(allProducts) && allProducts[0].partDescription}
                />
                {productValidation && <p style={{ color: 'red' }}>Part Number Required</p>}
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  className={classes.margin}
                  defaultValue={currentBom ? currentBom.quantity : 0}
                  fullWidth
                  id="qty"
                  type="number"
                  error={quantityValidation}
                  helperText={quantityValidation && 'Quantity Required!'}
                  onChange={handleQuantityInput}
                  margin="dense"
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
        <Button size="sm" onClick={onHadleUpdateBom} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ product }: IRootState) => ({
  allProducts: product.entities
});

const mapDispatchToProps = { updateBomAndRefreshParent, createBomAndRefreshParent };

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
      height: '410px'
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
const extractProductOptions = (products: IProduct[]): Array<{ value: string; label: string }> => {
  const productDescriptions: Array<{ value: string; label: string }> = [];
  !isArrayEmpty(products) &&
    products.forEach(product => {
      productDescriptions.push({
        value: `${product.partNumber}: ${product.partDescription}`,
        label: `${product.partNumber}: ${product.partDescription}`
      });
    });
  return productDescriptions;
};
