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
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getEntities as getAllNonconformances } from '../../../entities/non-conformance-details/non-conformance-details.reducer';
import { getEntities as getExtraBoms } from '../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../entities/extra-routings/extra-routings.reducer';
import { getEntities as getTasks } from '../../../entities/task/task.reducer';
import { getAllEntities as getAllEmployees } from '../../../entities/employee/employee.reducer';
import {
  getInternalNonConformances,
  deleteEntity as deleteNonConformance
} from '../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import moment from 'moment';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { Link } from 'react-router-dom';
import { Status } from 'app/shared/model/enumerations/status.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import {
  raiseNonConformacesPermission,
  editNonConformacesPermission,
  deleteNonConformacesPermission,
  viewNonConformacesPermission
} from 'app/shared/util/entity-utils';
import { IEmployee } from 'app/shared/model/employee.model';
import { isNull } from 'util';
import { GridApi } from 'ag-grid-community';

interface INonconformanceProps extends StateProps, DispatchProps {
  nonConconformanceEntity: INonConformanceDetails;
  match: any;
  internalNonconformaceId: number;
  setInternalNonconformaceId: React.Dispatch<React.SetStateAction<number>>;
}

export const internalNonConformanceGrid = (props: INonconformanceProps) => {
  const {
    allExtraBoms,
    allExtraRoutings,
    internalNonConformances,
    nonConconformanceEntity,
    match,
    allProductBoms,
    currentEmployee,
    internalNonconformaceId,
    setInternalNonconformaceId
  } = props;
  useEffect(() => {
    props.getExtraBoms();
    props.getExtraRoutings();
  }, []);

  const [gridApi, setGridApi] = useState(null);
  const classes = useStyles(props);
  const [filteredData, setFilteredData] = useState(null);
  const [quickFilterText, setQuickFilterText] = useState(null);
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
    { headerName: 'Action', field: 'action', resizable: true, sortable: true, filter: true },
    { headerName: 'Site', field: 'site', resizable: true, sortable: true, filter: true },
    { headerName: 'Department', field: 'department', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Quantity', field: 'quantity', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Materials', field: 'materialsCost', resizable: true, sortable: true, filter: true },
    { headerName: 'Labour', field: 'routingCost', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Extra Materials', field: 'extraMaterialsCost', resizable: true, sortable: true, filter: true },
    { headerName: 'Extra Labour', field: 'extraRoutingCost', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Sum', field: 'sum', width: 100, resizable: true, sortable: true, filter: true }
  ]);

  const extractNonconformances = (): any[] => {
    return !isArrayEmpty(internalNonConformances)
      ? internalNonConformances
          .filter(item => item.status !== Status.INCOMPLETE)
          .map(item => ({
            id: item.id,
            curentDate: moment(item.curentDate).format('DD MMM YYYY'),
            rejectionDate: moment(item.rejectionDate).format('DD MMM YYYY'),
            action: item.action,
            site: item.sites.map(site => site.site).join(', '),
            department: item.departments.map(department => department.department).join(', '),
            quantity: item.quantity,
            materialsCost: `£ ${totalCostBoms(item).toFixed(2)}`,
            routingCost: `£ ${totalCostRoutings(item).toFixed(2)}`,
            extraMaterialsCost: `£ ${extraBomsTotal(item).toFixed(2)}`,
            extraRoutingCost: `£ ${extraRoutingsTotal(item).toFixed(2)}`,
            sum: `£ ${(
              (totalCostBoms(item) + totalCostRoutings(item) + extraBomsTotal(item) + extraRoutingsTotal(item)) *
              item.quantity
            ).toFixed(2)}`
          }))
      : [];
  };
  const currentEmployeeCheck = (nonconformance: INonConformanceDetails, employee: IEmployee): boolean =>
    !isNull(nonconformance.employee) && !isNull(employee) ? nonconformance.employee.id === employee.id : false;
  const extraBomsTotal = (internalNonConformance: IInternalNonConformance): number => {
    let bomTotal = 0;
    if (!isArrayEmpty(allExtraBoms) && !isEmpty(internalNonConformance)) {
      allExtraBoms
        .filter(bom => bom.internalNonconformanceId === internalNonConformance.id)
        .forEach(item => {
          bomTotal = bomTotal + Number(item.price) * Number(item.quantity);
        });
    }
    return bomTotal;
  };
  const totalInternalOccurrancesCost = (internalList: IInternalNonConformance[]): number => {
    let total = 0;
    !isEmpty(nonConconformanceEntity) &&
      internalNonConformances
        .filter(item => item.status !== Status.INCOMPLETE)
        .filter(value => value.nonconformanceDetailsId === nonConconformanceEntity.id)
        .filter(item1 => internalList.find(item2 => item1.id === item2.id) !== undefined)
        .forEach(internal => {
          total +=
            internal.quantity *
            (totalCostBoms(internal) + totalCostRoutings(internal) + extraBomsTotal(internal) + extraRoutingsTotal(internal));
        });
    return total;
  };
  const extraRoutingSum = (overhead: number, unitRunTime: number): string => {
    const overheadInMinutes = overhead / 60;
    const routingPrice = (overheadInMinutes * unitRunTime).toFixed(2);
    return routingPrice;
  };
  const extraRoutingsTotal = (internalNonConformance: IInternalNonConformance): number => {
    let totalExtraMaterials = 0;
    if (!isArrayEmpty(allExtraBoms) && !isEmpty(internalNonConformance)) {
      allExtraRoutings
        .filter(routing => routing.internalNonConformanceId === internalNonConformance.id)
        .forEach(item => {
          totalExtraMaterials = totalExtraMaterials + Number(extraRoutingSum(item.overhead, item.runtime));
        });
    }
    return totalExtraMaterials;
  };
  const totalCostBoms = (internalNonConformance: IInternalNonConformance): number => {
    let total = 0;
    if (
      !isEmpty(nonConconformanceEntity) &&
      !isArrayEmpty(allProductBoms) &&
      internalNonConformance.action === NonconformanceAction.SCRAP
    ) {
      nonConconformanceEntity.products[0].boms.forEach(bom =>
        allProductBoms.forEach(productBom => {
          if (productBom.partNumber === bom.childPartNumber) {
            total = total + Number(productBom.standardUnitMaterialCost.toFixed(2)) * bom.quantity;
          }
        })
      );
    }
    return Number(total.toFixed(2));
  };
  const totalCostRoutings = (internalNonConformance: IInternalNonConformance): number => {
    let total = 0;
    if (
      !isEmpty(nonConconformanceEntity) &&
      !isArrayEmpty(allProductBoms) &&
      internalNonConformance.action === NonconformanceAction.SCRAP
    ) {
      nonConconformanceEntity.products[0].routings.forEach(
        routingValue => (total = total + (internalNonConformance.labourRate / 60) * routingValue.unitRunTime)
      );
    }
    return Number(total.toFixed(2));
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
    const selectedData: IInternalNonConformance = selectedNodes[0];
    setInternalNonconformaceId(selectedData ? selectedData.id : null);
  };
  const handleDeleteNonConformance = (id: number) => {
    props.deleteNonConformance(id);
  };
  const allocateInternalNonconformanceList: IInternalNonConformance[] = filteredData ? filteredData : internalNonConformances;
  const extractFilteredData = (dataApi: GridApi): void => {
    const filteredDataToSave: IInternalNonConformance[] = [];
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
            {internalNonconformaceId && (
              <Fragment>
                {(currentEmployeeCheck(nonConconformanceEntity, currentEmployee) || viewNonConformacesPermission(currentEmployee)) && (
                  <Link to={`${match.url}/${nonConconformanceEntity.id}/internal/${internalNonconformaceId}`}>
                    <IconButton size="small" title={'View'} aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                )}
                {deleteNonConformacesPermission(currentEmployee) && (
                  <IconButton
                    // tslint:disable
                    onClick={() => handleDeleteNonConformance(internalNonconformaceId)}
                    // tslint:enable
                    size="small"
                    title={'Delete'}
                    aria-label="delete"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
                {(currentEmployeeCheck(nonConconformanceEntity, currentEmployee) || editNonConformacesPermission(currentEmployee)) && (
                  <Link to={`${match.url}/${nonConconformanceEntity.id}/internal/edit/${internalNonconformaceId}`}>
                    <IconButton size="small" title={'Edit'} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </Link>
                )}
              </Fragment>
            )}
            {(currentEmployeeCheck(nonConconformanceEntity, currentEmployee) || editNonConformacesPermission(currentEmployee)) && (
              <Link to={`${match.url}/${nonConconformanceEntity.id}/internal/new`}>
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
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          columnDefs={columnHeaders}
          // tslint:disable-next-line
          onFilterChanged={data => extractFilteredData(data.api)}
          quickFilterText={quickFilterText}
          rowData={extractNonconformances()}
        />
      </div>
      {!isArrayEmpty(allocateInternalNonconformanceList) && (
        <div style={{ textAlign: 'right' }}>
          <p>{`Total Cost £ ${totalInternalOccurrancesCost(allocateInternalNonconformanceList).toFixed(2)}`}</p>
        </div>
      )}
    </Fragment>
  ) : (
    <h5 style={{ textAlign: 'center' }}>Select a Non-Conformance</h5>
  );
};

const mapStateToProps = ({
  internalNonConformance,
  nonConformanceDetails,
  extraBoms,
  extraRoutings,
  task,
  product,
  employee
}: IRootState) => ({
  internalNonConformances: internalNonConformance.entitiesOfNoconformanceDetails,
  nonConconformances: nonConformanceDetails.entities,
  allExtraBoms: extraBoms.entities,
  allExtraRoutings: extraRoutings.entities,
  allTasks: task.entities,
  allProductBoms: product.bomEntities,
  employees: employee.companysEntities,
  currentEmployee: employee.currentEmployeeEntity
});

const mapDispatchToProps = {
  getExtraRoutings,
  getExtraBoms,
  getAllNonconformances,
  getTasks,
  getInternalNonConformances,
  getAllEmployees,
  deleteNonConformance
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceGrid);

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
