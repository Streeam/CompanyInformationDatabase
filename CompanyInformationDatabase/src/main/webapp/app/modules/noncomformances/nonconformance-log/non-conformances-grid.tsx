import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
// tslint:disable
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getAllProductBoms as getProductsBoms, getAllProductsFromDB } from '../../../entities/product/product.reducer';
import {
  getEntities as getAllNonconformances,
  getEntity as getNonconformance,
  completeNonConformance,
  deleteEntity as deleteNonConformance
} from '../../../entities/non-conformance-details/non-conformance-details.reducer';
import { getAllEntities as getAllEmployees } from '../../../entities/employee/employee.reducer';
import { getInternalNonConformances } from '../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { getCustomerNonConformances } from '../../../entities/client-non-conformance/client-non-conformance.reducer';
import { getEntities as getCompanies } from '../../../entities/company/company.reducer';
import { getNonConformanceTasks, getEntities as getAllTasks } from '../../../entities/task/task.reducer';
import { getAllAfterSalesCostsByNonConformaceId } from '../../../entities/after-sale-expenses/after-sale-expenses.reducer';
import { AntTab, AntTabs, TabPanel } from '../../../shared/layout/custom-components/Tabs/tab';
import InternalOccurrance from './internal-non-conformance-grid';
import CustomerOccurrance from './customer-non-conformance-grid';
import NonConformaceTasks from './non-conformance-delegate-tasks';
import { isArrayEmpty, isEmpty, toTitleCase } from 'app/shared/util/general-utils';
import { IEmployee } from 'app/shared/model/employee.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import {
  raiseNonConformacesPermission,
  editNonConformacesPermission,
  deleteNonConformacesPermission,
  viewNonConformacesPermission,
  viewTasksPermission
} from 'app/shared/util/entity-utils';
import { isNull } from 'util';
import { ITask } from 'app/shared/model/task.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';

interface INonconformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const nonConformance = (props: INonconformanceProps) => {
  const { nonConconformances, rootCause, match, companies, allProducts, nonconformanceTasks, currentEmployee } = props;
  const [gridApi, setGridApi] = useState(null);
  const [nonConconformanceEntity, setNonConconformanceEntity] = useState<INonConformanceDetails>(null);
  const [quickFilterText, setQuickFilterText] = useState(null);
  const [tab, setTab] = useState(0);
  const [internalNonconformaceId, setInternalNonconformaceId] = useState<number>(null);
  const [customerNonconformaceId, setCustomerNonconformaceId] = useState<number>(null);
  const [openTasksSnackbar, setOpenTasksSnackbar] = useState(false);
  const [openRootCauseSnackbar, setOpenRootCauseSnackbar] = useState(false);
  const classes = useStyles(props);
  useEffect(() => {
    if (isArrayEmpty(nonConconformances)) {
      props.getAllNonconformances();
    }
    if (isArrayEmpty(allProducts)) {
      props.getAllProductsFromDB();
    }
  }, []);
  const columnHeaders = [
    { headerName: 'Id', field: 'id', width: 80, resizable: true, sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Part Number', width: 120, field: 'partNumber', resizable: true, sortable: true, filter: true },
    { headerName: 'Part Description', field: 'partDescription', width: 550, resizable: true, sortable: true, filter: true },
    { headerName: 'Employee', field: 'employee', width: 150, resizable: true, sortable: true, filter: true },
    { headerName: 'Type', field: 'nonconformance', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Rejection Code', field: 'rejectionCode', width: 130, resizable: true, sortable: true, filter: true },
    { headerName: 'Status', field: 'status', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Progress', field: 'progress', width: 100, resizable: true, sortable: true, filter: true },
    { headerName: 'Priority', field: 'priority', width: 100, resizable: true, sortable: true, filter: true },
    {
      headerName: 'Submitted',
      field: 'currentDate',
      resizable: true,
      sortable: true,
      width: 150,
      filter: 'agDateColumnFilter',
      sort: 'desc',
      // hide: true,
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split(' ');
          const hoursParts = dateParts[3].split(':');
          const year = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const day = Number(dateParts[0]);
          const hours = Number(hoursParts[0]);
          const minutes = Number(hoursParts[1]);
          const cellDate = new Date(year, month, day, hours, minutes, 0);
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
      headerName: 'Deadline',
      field: 'deadline',
      resizable: true,
      sortable: true,
      width: 100,
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
    }
  ];
  const extractNonconformances = (): any[] => {
    return nonConconformances
      .filter(item => item.status !== Status.INCOMPLETE)
      .map(item => ({
        id: item.id,
        partNumber: item.products[0] ? item.products[0].partNumber : '',
        partDescription: item.products[0] ? item.products[0].partDescription : '',
        employee:
          item.employee.user.firstName && item.employee.user.lastName
            ? item.employee.user.firstName + ' ' + item.employee.user.lastName
            : item.employee.user.login,
        nonconformance: toTitleCase(item.nonconformance),
        rejectionCode: item.nonConformanceType ? item.nonConformanceType.rejectionCode : '',
        status: toTitleCase(item.status),
        progress: item.progress + ' %',
        priority: toTitleCase(item.priority),
        currentDate: moment(item.currentDate).format('DD MM YYYY HH:mm'),
        deadline: moment(item.deadline).format('DD MM YYYY')
      }));
  };

  const selectNonConformanceAfterUpdate = (nonConconformance: INonConformanceDetails) => {
    gridApi.forEachNode(
      (node: { data: { id: number }; setSelected: (arg0: boolean) => any }) =>
        node.data.id === nonConconformance.id && node.setSelected(true)
    );
  };
  const nonConformaceOwnerPermission = (nonconformance: INonConformanceDetails, employee: IEmployee): boolean =>
    !isNull(employee) && !isEmpty(nonconformance) && !isNull(nonconformance.employee) ? nonconformance.employee.id === employee.id : false;
  const currentTasksOwnerPermission = (tasks: ITask[], employee: IEmployee): boolean =>
    !isNull(employee) && !isArrayEmpty(tasks) && tasks.filter(task => task.employeeId === employee.id).length > 0;
  const handleDeleteNonConformance = (entity: INonConformanceDetails) => {
    props.deleteNonConformance(entity.id);
  };
  const handleCloseTasksSnackbar = () => {
    setOpenTasksSnackbar(false);
  };
  const handleCloseRootCauseSnackbar = () => {
    setOpenRootCauseSnackbar(false);
  };
  const handleStatusChange = (entity: INonConformanceDetails, isNonConformanceReadyToComplete: () => boolean) => {
    if (isNonConformanceReadyToComplete()) {
      if (isArrayEmpty(nonconformanceTasks)) {
        if (entity.status === Status.COMPLETE) {
          props.completeNonConformance({ ...entity, status: Status.PENDING, progress: 0 }, selectNonConformanceAfterUpdate);
          setNonConconformanceEntity({ ...entity, status: Status.PENDING, progress: 0 });
        } else {
          props.completeNonConformance({ ...entity, status: Status.COMPLETE, progress: 100 }, selectNonConformanceAfterUpdate);
          setNonConconformanceEntity({ ...entity, status: Status.COMPLETE, progress: 100 });
        }
      } else {
        if (entity.progress !== 100) {
          setOpenTasksSnackbar(true);
        } else {
          if (entity.status === Status.COMPLETE) {
            props.completeNonConformance({ ...entity, status: Status.PENDING }, selectNonConformanceAfterUpdate);
            setNonConconformanceEntity({ ...entity, status: Status.PENDING });
          } else {
            props.completeNonConformance({ ...entity, status: Status.COMPLETE }, selectNonConformanceAfterUpdate);
            setNonConconformanceEntity({ ...entity, status: Status.COMPLETE });
          }
        }
      }
    } else {
      setOpenRootCauseSnackbar(true);
    }
  };

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
    if (newValue === 1) {
      if (nonConconformanceEntity) {
        props.getNonConformanceTasks(nonConconformanceEntity.id);
      } else {
        props.getAllTasks();
      }
    }
  };
  const onGridReady = params => {
    setGridApi(params.api);
    /*const gridColumnApi = params.columnApi;
    // params.api.forEachNode(node => node.rowIndex === 0 ? node.setSelected(true) : node.setSelected(false));
    if (params.api != null) {
      params.api.forEachNode((node, index) => {
        if (index === 0) {
          node.setSelected(true);
        }
      });
    }*/
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedRows();
      const selectedData = selectedNodes[0];
      const nonConconformanceEntityCopy = selectedData && nonConconformances.filter(value => value.id === selectedData.id)[0];
      setNonConconformanceEntity(nonConconformanceEntityCopy);
      nonConconformanceEntityCopy && props.getNonconformance(nonConconformanceEntityCopy.id);
      setInternalNonconformaceId(null);
      setCustomerNonconformaceId(null);
      if (tab === 0) {
        if (nonConconformanceEntityCopy) {
          if (nonConconformanceEntityCopy.products && nonConconformanceEntityCopy.products.length > 0) {
            props.getProductsBoms(nonConconformanceEntityCopy.products[0].id);
          }
          if (nonConconformanceEntityCopy.nonconformance === Nonconformance.INTERNAL) {
            props.getInternalNonConformances(nonConconformanceEntityCopy.id);
          }
          if (nonConconformanceEntityCopy.nonconformance === Nonconformance.CUSTOMER) {
            props.getCustomerNonConformances(nonConconformanceEntityCopy.id);
            props.getAllAfterSalesCostsByNonConformaceId(nonConconformanceEntityCopy.id);
          }
        }
        if (isArrayEmpty(companies)) {
          props.getCompanies();
        }
      }
      if (tab === 1) {
        if (nonConconformanceEntityCopy) {
          props.getNonConformanceTasks(nonConconformanceEntityCopy.id);
        } else {
          props.getAllTasks();
        }
      }
    }
  };

  const onQuickFilterText = event => {
    setQuickFilterText(event.target.value);
  };

  const checkNonConformanceReadyToComplete = (): boolean =>
    !isEmpty(nonConconformanceEntity) &&
    !isEmpty(rootCause) &&
    rootCause.nonconformanceId === nonConconformanceEntity.id &&
    rootCause.rootCause !== null;

  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4}>
          {nonConconformances && (
            <TextField
              id="outlined-search"
              onChange={onQuickFilterText}
              label="search..."
              margin="dense"
              type="search"
              variant="outlined"
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <h5 style={{ textAlign: 'center' }}>Non-Conformance Logs</h5>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ textAlign: 'right' }}>
            {nonConconformanceEntity && (
              <Fragment>
                {(nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
                  editNonConformacesPermission(currentEmployee)) && (
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    // tslint:disable
                    onChange={() => handleStatusChange(nonConconformanceEntity, checkNonConformanceReadyToComplete)}
                    // tslint:enable
                    title="Complete Non-Conformance"
                    checked={nonConconformanceEntity.status === Status.COMPLETE}
                    color="default"
                    value={nonConconformanceEntity.status === Status.COMPLETE}
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                  />
                )}
                {(nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
                  viewNonConformacesPermission(currentEmployee)) && (
                  <Link to={`${match.url}/${nonConconformanceEntity.id}`}>
                    <IconButton size="small" title={'View Non-Conformance'} aria-label="view" className={classes.margin}>
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                )}
                {(nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
                  deleteNonConformacesPermission(currentEmployee)) && (
                  <IconButton
                    size="small"
                    title={'Delete Non-Conformance'}
                    // tslint:disable
                    onClick={() => handleDeleteNonConformance(nonConconformanceEntity)}
                    // tslint:enable
                    aria-label="delete"
                    className={classes.margin}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
                {(nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
                  editNonConformacesPermission(currentEmployee)) && (
                  <Link to={`${match.url}/edit/${nonConconformanceEntity.id}`}>
                    <IconButton size="small" title={'Edit Non-Conformance'} aria-label="edit" className={classes.margin}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                )}
              </Fragment>
            )}
            {raiseNonConformacesPermission(currentEmployee) && (
              <Fragment>
                <Link to={`${match.url}/new`}>
                  <IconButton size="small" title={'Add Non-Conformance'} aria-label="add" className={classes.margin}>
                    <AddIcon />
                  </IconButton>
                </Link>
              </Fragment>
            )}
          </div>
        </Grid>
      </Grid>
      <div
        className="ag-theme-balham"
        style={{
          height: '35vh',
          width: 'auto',
          padding: '1px'
        }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          /*rowSelection="multiple"*/
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          columnDefs={columnHeaders}
          quickFilterText={quickFilterText}
          rowData={extractNonconformances()}
        />
      </div>
      <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
        <AntTabs value={tab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab} aria-label="tabs">
          <AntTab label="Occurances" />
          <AntTab label="Tasks" />
          <AntTab label="Data Analysis" />
        </AntTabs>
        <TabPanel value={tab} index={0}>
          {!isEmpty(nonConconformanceEntity) && nonConconformanceEntity.nonconformance === Nonconformance.INTERNAL && (
            <InternalOccurrance
              internalNonconformaceId={internalNonconformaceId}
              setInternalNonconformaceId={setInternalNonconformaceId}
              nonConconformanceEntity={nonConconformanceEntity}
              match={props.match}
            />
          )}
          {!isEmpty(nonConconformanceEntity) && nonConconformanceEntity.nonconformance === Nonconformance.CUSTOMER && (
            <CustomerOccurrance
              customerNonconformaceId={customerNonconformaceId}
              setCustomerNonconformaceId={setCustomerNonconformaceId}
              nonConconformanceEntity={nonConconformanceEntity}
              match={props.match}
            />
          )}
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {(viewTasksPermission(currentEmployee) ||
            nonConformaceOwnerPermission(nonConconformanceEntity, currentEmployee) ||
            currentTasksOwnerPermission([...nonconformanceTasks], currentEmployee)) && (
            <NonConformaceTasks
              selectNonConformanceAfterUpdate={selectNonConformanceAfterUpdate}
              nonConconformanceEntity={nonConconformanceEntity}
              nonConformaceOwnerPermission={nonConformaceOwnerPermission}
            />
          )}
        </TabPanel>
        <TabPanel value={tab} index={2}>
          In development...
        </TabPanel>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`Tasks-unfinished-snackbar`}
        open={openTasksSnackbar}
        onClose={handleCloseTasksSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">All tasks have to be complete before completing the non-conformance!</span>}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`RootCause-unfinished-snackbar`}
        open={openRootCauseSnackbar}
        onClose={handleCloseRootCauseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">You need to assign a root cause before completing the non-conformance!</span>}
      />
    </Fragment>
  );
};

const mapStateToProps = ({
  internalNonConformance,
  nonConformanceDetails,
  product,
  employee,
  company,
  task,
  actionToBeTaken
}: IRootState) => ({
  nonConconformances: nonConformanceDetails.entities,
  allProducts: product.entities,
  employees: employee.companysEntities,
  currentEmployee: employee.currentEmployeeEntity,
  companies: company.entities,
  nonconformanceTasks: task.entities,
  rootCause: actionToBeTaken.entity
});

const mapDispatchToProps = {
  getAllNonconformances,
  getInternalNonConformances,
  getCustomerNonConformances,
  getAllEmployees,
  getProductsBoms,
  getCompanies,
  getAllProductsFromDB,
  getNonConformanceTasks,
  getAllTasks,
  completeNonConformance,
  deleteNonConformance,
  getNonconformance,
  getAllAfterSalesCostsByNonConformaceId
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nonConformance);

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
