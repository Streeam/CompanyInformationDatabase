import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
// tslint:disable
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getEntities as getAllNonconformances } from '../../../entities/non-conformance-details/non-conformance-details.reducer';
import { getEntities as getExtraBoms } from '../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../entities/extra-routings/extra-routings.reducer';
import { getEntities as getTasks } from '../../../entities/task/task.reducer';
import { getAllEntities as getAllEmployees } from '../../../entities/employee/employee.reducer';
import {
  getCustomerNonConformances,
  deleteEntity as deleteNonConformance
} from '../../../entities/client-non-conformance/client-non-conformance.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import moment from 'moment';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { Link } from 'react-router-dom';
import { Status } from 'app/shared/model/enumerations/status.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import {
  raiseNonConformacesPermission,
  editNonConformacesPermission,
  deleteNonConformacesPermission,
  viewNonConformacesPermission,
  parseCustomerNCType
} from 'app/shared/util/entity-utils';
import { IEmployee } from 'app/shared/model/employee.model';
import { isNull } from 'util';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { GridApi } from 'ag-grid-community';

interface ICustomerGridProps extends StateProps, DispatchProps {
  nonConconformanceEntity: INonConformanceDetails;
  match: any;
  customerNonconformaceId: number;
  setCustomerNonconformaceId: React.Dispatch<React.SetStateAction<number>>;
}

export const customerNonConformaceGrid = (props: ICustomerGridProps) => {
  const {
    allExtraBoms,
    allExtraRoutings,
    nonConconformanceEntity,
    match,
    currentEmployee,
    customerNonConformances,
    afterSaleExpenses,
    customerNonconformaceId,
    setCustomerNonconformaceId
  } = props;
  useEffect(() => {
    props.getExtraBoms();
    props.getExtraRoutings();
  }, []);
  const [gridApi, setGridApi] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [quickFilterText, setQuickFilterText] = useState(null);
  const classes = useStyles(props);
  const [columnHeaders, setcolumnHeaders] = useState([
    { headerName: 'Id', field: 'id', resizable: true, sortable: true, filter: true, checkboxSelection: true },
    {
      headerName: 'Submitted',
      field: 'curentDate',
      resizable: true,
      sortable: true,
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split(' ');
          const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    {
      headerName: 'Rejected',
      field: 'rejectionDate',
      resizable: true,
      sortable: true,
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split(' ');
          const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    { headerName: 'Action', field: 'action', width: 200, resizable: true, sortable: true, filter: true },
    { headerName: 'Warranty', field: 'warranty', resizable: true, sortable: true, filter: true },
    { headerName: 'Quantity', field: 'quantity', width: 100, resizable: true, sortable: true, filter: true },

    {
      headerName: 'After Sale Expenses',
      children: [
        { headerName: 'Material', field: 'materialsCost', resizable: true, sortable: true, filter: true },
        { headerName: 'Labour', field: 'routingCost', width: 100, resizable: true, sortable: true, filter: true },
        { headerName: 'Extra', field: 'additionalCost', width: 100, resizable: true, sortable: true, filter: true }
      ]
    },
    { headerName: 'Sum', field: 'sum', width: 100, resizable: true, sortable: true, filter: true }
  ]);

  const extractCustomerNonconformances = (): any[] => {
    return !isArrayEmpty(customerNonConformances)
      ? customerNonConformances
          .filter(item => item.status !== Status.INCOMPLETE)
          .map(item => ({
            id: item.id,
            curentDate: moment(item.currentDate).format('DD MMM YYYY'),
            rejectionDate: moment(item.rejectionDate).format('DD MMM YYYY'),
            action: parseCustomerNCType(item.nonConformanceType),
            warranty: item.underWarranty ? 'Yes' : 'No',
            quantity: item.quantity,
            materialsCost: `£ ${extraBomsTotal(item).toFixed(2)}`,
            routingCost: `£ ${extraRoutingsTotal(item).toFixed(2)}`,
            additionalCost: `£ ${afterSaleExpensesTotal(item)}`,
            sum: `£ ${((extraBomsTotal(item) + extraRoutingsTotal(item) + afterSaleExpensesTotal(item)) * item.quantity).toFixed(2)}`
          }))
      : [];
  };
  const totalCustomerOccurrancesCost = (customerList: IClientNonConformance[]): number => {
    let total = 0;
    customerNonConformances
      .filter(value => value.nonconformanceDetailsId === nonConconformanceEntity.id)
      .filter(item1 => customerList.find(item2 => item1.id === item2.id) !== undefined)
      .forEach(customerNC => {
        total += (extraBomsTotal(customerNC) + extraRoutingsTotal(customerNC) + afterSaleExpensesTotal(customerNC)) * customerNC.quantity;
      });
    return total;
  };
  const currentEmployeeCheck = (nonconformance: INonConformanceDetails, employee: IEmployee): boolean =>
    !isNull(nonconformance.employee) && !isNull(employee) ? nonconformance.employee.id === employee.id : false;

  const extraBomsTotal = (customerNonConformance: IClientNonConformance): number => {
    let bomTotal = 0;
    if (!isArrayEmpty(allExtraBoms) && !isEmpty(customerNonConformance)) {
      allExtraBoms
        .filter(bom => bom.customerNonConformaceId === customerNonConformance.id)
        .forEach(item => {
          bomTotal += Number(item.price) * Number(item.quantity);
        });
    }
    return bomTotal;
  };
  const extraRoutingSum = (overhead: number, unitRunTime: number): string => {
    const overheadInMinutes = overhead / 60;
    const routingPrice = (overheadInMinutes * unitRunTime).toFixed(2);
    return routingPrice;
  };
  const extraRoutingsTotal = (customerNonConformance: IClientNonConformance): number => {
    let totalExtraMaterials = 0;
    if (!isArrayEmpty(allExtraBoms) && !isEmpty(customerNonConformance)) {
      allExtraRoutings
        .filter(routing => routing.customerNonConformaceId === customerNonConformance.id)
        .forEach(item => {
          totalExtraMaterials += Number(extraRoutingSum(item.overhead, item.runtime));
        });
    }
    return totalExtraMaterials;
  };
  const afterSaleExpensesTotal = (customerNonConformance: IClientNonConformance): number => {
    let totalAfterSaleExpenses = 0;
    if (!isArrayEmpty(afterSaleExpenses) && !isEmpty(customerNonConformance)) {
      afterSaleExpenses
        .filter(afterSale => afterSale.customerNonConformanceId === customerNonConformance.id)
        .forEach(value => {
          totalAfterSaleExpenses += Number(value.cost);
        });
    }
    return totalAfterSaleExpenses;
  };
  const handleDeleteNonConformance = (customerNCId: number) => {
    !isEmpty(nonConconformanceEntity) && props.deleteNonConformance(customerNCId, nonConconformanceEntity.id);
  };
  const onGridReady = params => {
    setGridApi(params.api);
    const gridColumnApi = params.columnApi;
    const allColumnIds = [];
    gridColumnApi.getAllColumns().forEach(column => {
      allColumnIds.push(column.colId);
    });
    gridColumnApi.autoSizeColumns(allColumnIds);
  };
  const onSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedRows();
    const selectedData: IClientNonConformance = selectedNodes[0];
    setCustomerNonconformaceId(selectedData ? selectedData.id : null);
  };
  const allocateCustomerList: IClientNonConformance[] = filteredData ? filteredData : customerNonConformances;
  const extractFilteredData = (dataApi: GridApi): void => {
    const filteredDataToSave: IClientNonConformance[] = [];
    dataApi.forEachNodeAfterFilter(item => filteredDataToSave.push(item.data));
    setFilteredData(filteredDataToSave);
  };
  const onQuickFilterText = event => {
    setQuickFilterText(event.target.value);
  };
  return nonConconformanceEntity ? (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4}>
          <TextField id="outlined-search" onChange={onQuickFilterText} label="search..." margin="dense" type="search" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <h5 style={{ textAlign: 'center' }}>Occurances</h5>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ textAlign: 'right' }}>
            {customerNonconformaceId && (
              <Fragment>
                {(currentEmployeeCheck(nonConconformanceEntity, currentEmployee) || viewNonConformacesPermission(currentEmployee)) && (
                  <Link to={`${match.url}/${nonConconformanceEntity.id}/customer/${customerNonconformaceId}`}>
                    <IconButton size="small" title={'View'} aria-label="view" className={classes.margin}>
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                )}
                {deleteNonConformacesPermission(currentEmployee) && (
                  <IconButton
                    // tslint:disable
                    onClick={() => handleDeleteNonConformance(customerNonconformaceId)}
                    // tslint:enable
                    size="small"
                    title={'Delete'}
                    aria-label="delete"
                    className={classes.margin}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
                {(currentEmployeeCheck(nonConconformanceEntity, currentEmployee) || editNonConformacesPermission(currentEmployee)) && (
                  <Link to={`${match.url}/${nonConconformanceEntity.id}/customer/edit/${customerNonconformaceId}`}>
                    <IconButton size="small" title={'Edit'} aria-label="edit" className={classes.margin}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                )}
              </Fragment>
            )}
            {(currentEmployeeCheck(nonConconformanceEntity, currentEmployee) || editNonConformacesPermission(currentEmployee)) && (
              <Link to={`${match.url}/${nonConconformanceEntity.id}/customer/new`}>
                <IconButton size="small" title={`Add`} aria-label="add">
                  <AddIcon />
                </IconButton>
              </Link>
            )}
          </div>
        </Grid>
      </Grid>
      <div
        className="ag-theme-balham"
        style={{
          height: '25vh',
          width: 'auto',
          padding: '5px',
          margin: '3px'
        }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          /*rowSelection="multiple"*/
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          columnDefs={columnHeaders}
          // tslint:disable-next-line
          onFilterChanged={data => extractFilteredData(data.api)}
          quickFilterText={quickFilterText}
          rowData={extractCustomerNonconformances()}
        />
      </div>
      {!isArrayEmpty(allocateCustomerList) && (
        <div style={{ textAlign: 'right' }}>
          <p>{`Total Cost £ ${totalCustomerOccurrancesCost(allocateCustomerList).toFixed(2)}`}</p>
        </div>
      )}
    </Fragment>
  ) : (
    <h5 style={{ textAlign: 'center' }}>Select a Non-Conformance</h5>
  );
};

const mapStateToProps = ({
  clientNonConformance,
  nonConformanceDetails,
  extraBoms,
  extraRoutings,
  task,
  product,
  employee,
  afterSaleExpenses
}: IRootState) => ({
  customerNonConformances: clientNonConformance.entitiesOfNoconformanceDetails,
  nonConconformances: nonConformanceDetails.entities,
  allExtraBoms: extraBoms.entities,
  allExtraRoutings: extraRoutings.entities,
  allTasks: task.entities,
  allProductBoms: product.bomEntities,
  employees: employee.companysEntities,
  currentEmployee: employee.currentEmployeeEntity,
  afterSaleExpenses: afterSaleExpenses.allAfterSalesExpensesByNonConformace
});

const mapDispatchToProps = {
  getExtraRoutings,
  getExtraBoms,
  getAllNonconformances,
  deleteNonConformance,
  getTasks,
  getAllEmployees
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(customerNonConformaceGrid);

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
      maxHeight: '800px'
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
