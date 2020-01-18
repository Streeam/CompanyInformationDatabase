import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Spinner } from 'reactstrap';
// tslint:disable
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getEntity as getNonconformace } from '../../../entities/non-conformance-details/non-conformance-details.reducer';
import { getEntities as getExtraBoms } from '../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../entities/extra-routings/extra-routings.reducer';
import { getEntities as getTasks } from '../../../entities/task/task.reducer';
import { getAllProductBoms as getProductsBoms } from '../../../entities/product/product.reducer';
import { getAllEntities as getAllEmployees } from '../../../entities/employee/employee.reducer';
import { getProcessAuditOfNC } from '../../../entities/process-audit-checklist/process-audit-checklist.reducer';
import { getInternalNonConformances } from '../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { getCustomerNonConformances } from '../../../entities/client-non-conformance/client-non-conformance.reducer';
import { convertToEmployeeIconName, priorityStyle } from '../../../shared/util/entity-utils';
import EmployeeAvatar from '../../../shared/util/employeeAvatar';
import { isArrayEmpty, isEmpty, toTitleCase } from 'app/shared/util/general-utils';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import moment from 'moment';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { ITask } from 'app/shared/model/task.model';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { IBom } from 'app/shared/model/bom.model';
import { IProduct } from 'app/shared/model/product.model';
import { IRouting } from 'app/shared/model/routing.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { RouteComponentProps, Link } from 'react-router-dom';
import FiveWhys from './non-conformance-root-cause-analisys/five-whys/five-whys';
import FishBone from './non-conformance-root-cause-analisys/fishbone/fishbone-diagram';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import ViewChildComponent from '../create-child-nonconformances/view-child-non-conformance/view-child-non-conformances-component';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';

interface INonconformanceProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const nonConformance = (props: INonconformanceProps) => {
  const {
    allExtraBoms,
    allExtraRoutings,
    allTasks,
    allProducts,
    employees,
    internalNonConformances,
    nonConconformanceEntity,
    nonconformanceLoading,
    match,
    processAuditChecklist,
    customerNonConformances
  } = props;
  useEffect(() => {
    if (isArrayEmpty(internalNonConformances)) {
      props.getInternalNonConformances(match.params.id);
    }
    if (isArrayEmpty(customerNonConformances)) {
      props.getCustomerNonConformances(match.params.id);
    }
    if (isEmpty(nonConconformanceEntity)) {
      props.getNonconformace(match.params.id);
    }
    if (isArrayEmpty(allExtraBoms)) {
      props.getExtraBoms();
    }
    if (isArrayEmpty(processAuditChecklist)) {
      props.getProcessAuditOfNC(match.params.id);
    }
    if (isArrayEmpty(allExtraRoutings)) {
      props.getExtraRoutings();
    }
    if (isArrayEmpty(allTasks)) {
      props.getTasks();
    }
    if (isArrayEmpty(employees)) {
      props.getAllEmployees();
    }
  }, []);

  const nonconformanceTasks = (internalNonConformance: IInternalNonConformance): ITask[] =>
    !isArrayEmpty(allTasks) && !isEmpty(internalNonConformance)
      ? allTasks.filter(item => item.nonconformanceId === internalNonConformance.id)
      : [];

  const classes = useStyles(props);

  const convertFromIdToEmployee = (id: number): IEmployee => {
    return employees && employees.length > 0 ? employees.filter(employee => employee.id === id)[0] : null;
  };

  const getChildNCList = (childList: any[]) => {
    return childList.map(childNonconformance => (
      <div style={{ margin: '3px 0 3px 0' }} key={childNonconformance.id}>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
            <div>
              <Typography className={classes.heading}>{moment(childNonconformance.rejectionDate).format('DD MMMM YYYY')}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <ViewChildComponent nonConconformanceEntity={{ ...nonConconformanceEntity }} childNonconformance={{ ...childNonconformance }} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    ));
  };

  const nonconformanceTableTasks = (nonConformanceDetails: IInternalNonConformance): JSX.Element => (
    <div>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>TASKS</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell align="center">Employee</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">Deadline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nonconformanceTasks(nonConformanceDetails).map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell component="th" scope="row">
                    {task.taskDescription}
                  </TableCell>
                  <TableCell align="center">{convertToEmployeeIconName(convertFromIdToEmployee(task.employeeId))}</TableCell>
                  <TableCell align="center">{priorityStyle(task.priority)}</TableCell>
                  <TableCell align="center">{moment(task.startDate).format('ll')}</TableCell>
                  <TableCell align="center">{moment(task.endDate).format('ll')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );

  const nonconformanceProcessAuditChecklist = (): JSX.Element => (
    <div>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>Checklist</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {!isArrayEmpty(processAuditChecklist) && (
            <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
              <Grid container spacing={1}>
                {processAuditChecklist.map(processQuestion => (
                  <Fragment key={processQuestion.id}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        defaultValue={processQuestion && processQuestion.auditAnswer ? processQuestion.auditAnswer : ''}
                        fullWidth
                        label={processQuestion && processQuestion.auditQuestion ? processQuestion.auditQuestion : ''}
                        margin="dense"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </Card>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
  const nonconformanceFiveWhys = (): JSX.Element => (
    <div>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>5 Why's</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <FiveWhys isDisabled />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
  const nonconformanceFishBoneDiagram = (): JSX.Element => (
    <div>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>Fishbone Diagram</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <FishBone isDisabled />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
  return nonconformanceLoading || isEmpty(nonConconformanceEntity) ? (
    <div style={{ textAlign: 'center' }}>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '80vh', padding: '5px', margin: '10px 0 10px 0' }}>
        <Card>
          <h5>
            <strong>Details</strong>
          </h5>
          <Grid container spacing={0}>
            <Paper className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12}>
                  <h5>{nonConconformanceEntity.nonconformance} NON-CONFORMANCE</h5>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  <p>
                    <strong>Non-Conformance Number: </strong>
                    {nonConconformanceEntity.id}
                  </p>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  <p>
                    <strong>Part Number: </strong>
                    {nonConconformanceEntity.products[0].partNumber}
                  </p>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  <p>
                    <strong>Part Description: </strong>
                    {nonConconformanceEntity.products[0].partDescription}
                  </p>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  <p>
                    <strong>Status: </strong>
                    {toTitleCase(nonConconformanceEntity.status)}
                  </p>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  <p>
                    <strong>Submitted: </strong>
                    {moment(nonConconformanceEntity.currentDate).format('DD MMMM YYYY')}
                  </p>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  <p>
                    <strong>Deadline: </strong>
                    {moment(nonConconformanceEntity.deadline).format('DD MMMM YYYY')}
                  </p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <h5>NON-CONFORMANCE DETAILS</h5>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                  <p>
                    <strong>Code: </strong>
                    {nonConconformanceEntity.nonConformanceType && nonConconformanceEntity.nonConformanceType.rejectionCode}
                  </p>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <p>
                    <strong>Description: </strong>
                    {nonConconformanceEntity.nonConformanceType && nonConconformanceEntity.nonConformanceType.rejectionTitle}
                  </p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <h5>ROOT-CAUSE</h5>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <h5>RESPONSIBILITY</h5>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  <div style={{ display: 'inline-block' }}>
                    <EmployeeAvatar maxHeight="30px" employee={nonConconformanceEntity.employee} />
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    &nbsp;
                    {nonConconformanceEntity.employee.user.firstName} {nonConconformanceEntity.employee.user.lastName}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <h5>PRIORITY</h5>
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  <p>{toTitleCase(nonConconformanceEntity.priority)}</p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <h5 style={{ margin: '10px 0 10px 0' }}>
            <strong>Tasks</strong>
          </h5>
          {nonconformanceTableTasks(nonConconformanceEntity)}
          <h5 style={{ margin: '10px 0 10px 0' }}>
            <strong>Process Audit</strong>
          </h5>
          {nonconformanceProcessAuditChecklist()}
          <h5 style={{ margin: '10px 0 10px 0' }}>
            <strong>Root Cause Analysis</strong>
          </h5>
          {nonconformanceFiveWhys()}
          <div style={{ margin: '5px' }} />
          {nonconformanceFishBoneDiagram()}
          <h5 style={{ margin: '10px 0 10px 0' }}>
            <strong>Occurrences</strong>
          </h5>
          {nonConconformanceEntity.nonconformance === Nonconformance.INTERNAL
            ? getChildNCList([...internalNonConformances])
            : getChildNCList([...customerNonConformances])}
        </Card>
      </div>
      <Button size="sm" tag={Link} id="back" to="/nonconformances" replace color="secondary">
        <ChevronLeftIcon />
        &nbsp;<span className="d-none d-md-inline">Back</span>
      </Button>
      <br />
    </Fragment>
  );
};

const mapStateToProps = ({
  internalNonConformance,
  nonConformanceDetails,
  clientNonConformance,
  extraBoms,
  extraRoutings,
  task,
  product,
  employee,
  processAuditChecklist
}: IRootState) => ({
  internalNonConformances: internalNonConformance.entitiesOfNoconformanceDetails,
  customerNonConformances: clientNonConformance.entitiesOfNoconformanceDetails,
  nonConconformanceEntity: nonConformanceDetails.entity,
  nonconformanceLoading: nonConformanceDetails.loading || internalNonConformance.loading,
  allExtraBoms: extraBoms.entities,
  allExtraRoutings: extraRoutings.entities,
  allTasks: task.entities,
  allProducts: product.entities,
  employees: employee.companysEntities,
  processAuditChecklist: processAuditChecklist.processAuditChecklistOfNC
});

const mapDispatchToProps = {
  getExtraRoutings,
  getExtraBoms,
  getNonconformace,
  getTasks,
  getProductsBoms,
  getInternalNonConformances,
  getAllEmployees,
  getProcessAuditOfNC,
  getCustomerNonConformances
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
    expansionPanel: {
      margin: theme.spacing(1, 1),
      overflow: 'auto',
      maxHeight: '800px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    details: {
      alignItems: 'center',
      display: 'inherit'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      padding: '0 20px 0 0'
    }
  })
);
