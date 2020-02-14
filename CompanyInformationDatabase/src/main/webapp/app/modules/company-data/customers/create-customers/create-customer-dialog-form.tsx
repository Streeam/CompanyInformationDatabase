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
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
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
import { createEntity as createCustomer, updateEntity as updateCustomer } from '../../../../entities/customer/customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';

interface ICustomerUpdateFormProps extends StateProps, DispatchProps {
  handleClose;
  customerDialogOpen: boolean;
  currentCustomer: ICustomer;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

export const productUpdateForm = (props: ICustomerUpdateFormProps) => {
  const { handleClose, customerDialogOpen, currentCustomer, allCustomers, setTab } = props;
  React.useEffect(() => {}, []);
  const classes = useStyles(props);

  const [customerName, setCustomerName] = useState<string>(null);
  const [customerCode, setCustomerCode] = useState<string>(null);
  const [customerStatus, setCustomerStatus] = useState<string>(null);
  const [country, setCountry] = useState<string>(null);
  const [currency, setCurrency] = useState<string>(null);
  const [address, setAddress] = useState<string>(null);
  const [website, setWebsite] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);

  const [customerNameValidation, setCustomerNameValidation] = useState<boolean>(false);
  const [customerCodeValidation, setCustomerCodeValidation] = useState<boolean>(false);
  const [customerStatusValidation, setCustomerStatusValidation] = useState<boolean>(false);

  const assignCustomerName = (): string => (customerName ? customerName : currentCustomer ? currentCustomer.customerName : undefined);
  const assignCustomerCode = (): string => (customerCode ? customerCode : currentCustomer ? currentCustomer.customerCode : undefined);
  const assignCustomerStatus = (): string =>
    customerStatus ? customerStatus : currentCustomer ? currentCustomer.customerStatus : undefined;
  const assignAddress = (): string => (address ? address : currentCustomer ? currentCustomer.address : '');
  const assignWebsite = (): string => (website ? website : currentCustomer ? currentCustomer.website : '');
  const assignEmail = (): string => (email ? email : currentCustomer ? currentCustomer.email : '');
  const assignCurrency = (): string => (currency ? currency : currentCustomer ? currentCustomer.customerCurency : 'pound');
  const assignCountry = (): string => (country ? country : currentCustomer ? currentCustomer.country : '');

  const onHadleAddCustomer = () => {
    if (assignCustomerName() === undefined) {
      setCustomerNameValidation(true);
    } else if (assignCustomerCode() === undefined) {
      setCustomerCodeValidation(true);
    } else if (assignCustomerStatus() === undefined || customerStatus === '') {
      setCustomerStatusValidation(true);
    } else {
      setCustomerNameValidation(false);
      setCustomerCodeValidation(false);
      setCustomerStatusValidation(false);
      const entityCustomer: ICustomer = {
        ...currentCustomer,
        customerName: assignCustomerName(),
        customerCode: assignCustomerCode(),
        customerStatus: assignCustomerStatus(),
        country: assignCountry(),
        address: assignAddress(),
        website: assignWebsite(),
        email: assignEmail(),
        customerCurency: assignCurrency()
      };
      if (currentCustomer) {
        props.updateCustomer(entityCustomer);
      } else {
        props.createCustomer(entityCustomer);
      }
      handleExit();
    }
  };
  const handleExit = () => {
    setCustomerName(null);
    setCustomerCode(null);
    setCustomerStatus(null);
    setCurrency(null);
    setCountry(null);
    setAddress(null);
    setWebsite(null);
    setEmail(null);
    setTab(1);
    handleClose();
  };

  const handleCustomerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && allCustomers.find(p => p.customerName === event.target.value) === undefined
      ? setCustomerNameValidation(false)
      : setCustomerNameValidation(true);
    setCustomerName(event.target.value);
  };
  const handleCustomerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && event.target.value !== '' ? setCustomerCodeValidation(false) : setCustomerCodeValidation(true);
    setCustomerCode(event.target.value);
  };
  const hadleCustomerStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && event.target.value !== '' ? setCustomerStatusValidation(false) : setCustomerStatusValidation(true);
    setCustomerStatus(event.target.value);
  };
  const handleCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };
  const handleCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  const handleWebsite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(event.target.value);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Dialog
      maxWidth="xl"
      TransitionComponent={Transition}
      disableBackdropClick
      disableEscapeKeyDown
      open={customerDialogOpen}
      onClose={handleExit}
    >
      {currentCustomer ? <DialogTitle>{currentCustomer.customerName}</DialogTitle> : <DialogTitle>Create a new Customer</DialogTitle>}
      <DialogContent>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={currentCustomer ? currentCustomer.customerName : ''}
                required
                fullWidth
                error={customerNameValidation}
                helperText={customerNameValidation && 'Customer name is required!'}
                id="name"
                label="Customer Name"
                onChange={handleCustomerName}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                defaultValue={currentCustomer ? currentCustomer.customerCode : ''}
                required
                fullWidth
                error={customerCodeValidation}
                helperText={customerCodeValidation && 'Customer code is required!'}
                id="code"
                label="Customer Code"
                onChange={handleCustomerCode}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                defaultValue={currentCustomer ? currentCustomer.customerStatus : ''}
                fullWidth
                required
                error={customerStatusValidation}
                helperText={customerStatusValidation && 'Customer status is required!'}
                id="status"
                label="Customer Status"
                onChange={hadleCustomerStatus}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                defaultValue={currentCustomer ? currentCustomer.address : ''}
                fullWidth
                multiline
                rows="8"
                id="address"
                label="Address"
                onChange={handleAddress}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={currentCustomer ? currentCustomer.email : ''}
                fullWidth
                id="email"
                label="Email"
                onChange={handleEmail}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={currentCustomer ? currentCustomer.website : ''}
                fullWidth
                id="website"
                label="Website"
                onChange={handleWebsite}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <br />
        </div>
      </DialogContent>
      <DialogActions>
        <Button size="sm" onClick={handleExit} color="secondary">
          Cancel
        </Button>
        <Button size="sm" onClick={onHadleAddCustomer} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  allCustomers: customer.entities
});

const mapDispatchToProps = { updateCustomer, createCustomer };

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
