import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// tslint:disable
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AddIcon from '@material-ui/icons/Add';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import {
  getEntities as getCustomers,
  deleteEntity as deleteCustomer,
  getEntity as getSelectedCustomer
} from '../../../../entities/customer/customer.reducer';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import moment from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { deleteCustomerPermission, editCustomerPermission, addCustomerPermission } from 'app/shared/util/entity-utils';
import UpdateCustomerDialog from '../create-customers/create-customer-dialog-form';

interface ICustomersProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

export const customersGrid = (props: ICustomersProps) => {
  const { allCustomers, currentEmployee, match, setTab } = props;

  useEffect(() => {
    if (isArrayEmpty(allCustomers)) {
      props.getCustomers();
    }
  }, []);
  const columnHeaders = [
    { headerName: 'Id', field: 'id', sort: 'desc', width: 100, resizable: true, sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Name', field: 'customerName', width: 300, resizable: true, sortable: true, filter: true },
    { headerName: 'Code', field: 'customerCode', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Status', field: 'customerStatus', width: 250, resizable: true, sortable: true, filter: true },
    { headerName: 'Address', field: 'address', width: 500, resizable: true, sortable: true, filter: true }
  ];
  const extractCustomers = (): any[] => {
    return allCustomers.map(item => ({
      id: item.id,
      customerName: item.customerName,
      customerCode: item.customerCode,
      customerStatus: item.customerStatus,
      address: item.address
    }));
  };
  const [gridApi, setGridApi] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>(null);
  const [customerDialogOpen, setCustomerDialogOpen] = useState<boolean>(false);
  const classes = useStyles(props);

  const onGridReady = params => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedRows();
      const selectedData: ICustomer = selectedNodes[0];
      const productEntity: ICustomer = selectedData && allCustomers.filter(customer => customer.id === selectedData.id)[0];
      setSelectedCustomer(productEntity);
    }
  };
  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setCustomerDialogOpen(true);
  };
  const handleEditCustomer = () => {
    setSelectedCustomer(selectedCustomer);
    setCustomerDialogOpen(true);
  };
  const handleDeleteCustomer = (entityId: number) => {
    props.deleteCustomer(entityId);
  };
  const selectCustomerAfterUpdate = (product: ICustomer) => {
    gridApi.forEachNode(
      (node: { data: { id: number }; setSelected: (arg0: boolean) => any }) => node.data.id === product.id && node.setSelected(true)
    );
  };
  const handleDialogCustomerClose = () => {
    setCustomerDialogOpen(false);
  };
  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          <h5 style={{ textAlign: 'center' }}>
            <strong>Customers</strong>
          </h5>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ textAlign: 'right' }}>
            {selectedCustomer && (
              <Fragment>
                <IconButton
                  size="small"
                  title={'Delete Customer'}
                  disabled={!deleteCustomerPermission(currentEmployee)}
                  // tslint:disable
                  onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                  // tslint:enable
                  aria-label="delete"
                  className={classes.margin}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton
                  size="small"
                  title={'Edit Customer'}
                  onClick={handleEditCustomer}
                  disabled={!editCustomerPermission(currentEmployee)}
                  aria-label="edit"
                  className={classes.margin}
                >
                  <EditIcon />
                </IconButton>
              </Fragment>
            )}
            <Fragment>
              {isArrayEmpty(allCustomers) && addCustomerPermission(currentEmployee) && (
                <Link to={`${match.url}/customers/import-customers`}>
                  <IconButton size="small" title={'Import from .csv file!'} aria-label="upload" className={classes.margin}>
                    <PublishOutlinedIcon />
                  </IconButton>
                </Link>
              )}
              <IconButton
                size="small"
                title={'New Customer'}
                onClick={handleAddCustomer}
                disabled={!addCustomerPermission(currentEmployee)}
                aria-label="add"
                className={classes.margin}
              >
                <AddIcon />
              </IconButton>
            </Fragment>
          </div>
        </Grid>
      </Grid>
      <div
        className="ag-theme-balham"
        style={{
          height: '400px',
          width: 'auto',
          padding: '1px'
        }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          columnDefs={columnHeaders}
          rowData={extractCustomers()}
        />
      </div>
      <UpdateCustomerDialog
        currentCustomer={selectedCustomer}
        customerDialogOpen={customerDialogOpen}
        handleClose={handleDialogCustomerClose}
        setTab={setTab}
      />
      <Button size="sm" tag={Link} id="cancel-save" to={'/company/company-status'} replace color="secondary">
        <FontAwesomeIcon icon="arrow-left" />
        &nbsp;
        <span className="d-none d-md-inline">Back</span>
      </Button>
    </Fragment>
  );
};

const mapStateToProps = ({ customer, employee }: IRootState) => ({
  allCustomers: customer.entities,
  currentEmployee: employee.currentEmployeeEntity
});

const mapDispatchToProps = { getCustomers, deleteCustomer, getSelectedCustomer };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(customersGrid);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 1),
      margin: theme.spacing(1, 1),
      width: '100%'
    },
    margin: {
      margin: theme.spacing(1)
    },
    expansionPanel: {
      margin: theme.spacing(1, 1),
      overflow: 'auto',
      maxHeight: '750px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    details: {
      alignItems: 'center'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      padding: '0 20px 0 0'
    }
  })
);
