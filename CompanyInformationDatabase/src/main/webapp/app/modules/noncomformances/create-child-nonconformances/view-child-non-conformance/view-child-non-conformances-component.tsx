import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
// tslint:disable
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core/styles';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getEntity as getInternalNonconformace } from '../../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { getEntity as getNonconformace } from '../../../../entities/non-conformance-details/non-conformance-details.reducer';
import { getEntities as getExtraBoms } from '../../../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../../../entities/extra-routings/extra-routings.reducer';
import { getAllProductBoms as getProductsBoms } from '../../../../entities/product/product.reducer';
import { getAllEntities as getAllEmployees } from '../../../../entities/employee/employee.reducer';
import { getAllAfterSalesCostsByCustomerNonConformaceId } from '../../../../entities/after-sale-expenses/after-sale-expenses.reducer';
import EmployeeAvatar from '../../../../shared/util/employeeAvatar';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { IBom } from 'app/shared/model/bom.model';
import { IProduct } from 'app/shared/model/product.model';
import { IRouting } from 'app/shared/model/routing.model';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';
import moment from 'moment';
import { convertToEmployeeIconName, convertFromIdToEmployee } from 'app/shared/util/entity-utils';

interface IViewInternalComponentProps extends StateProps, DispatchProps {
  childNonconformance: IInternalNonConformance | IClientNonConformance;
  nonConconformanceEntity: INonConformanceDetails;
}

export const viewInternalNonConformanceComponent = (props: IViewInternalComponentProps) => {
  const { allExtraBoms, allExtraRoutings, allProducts, nonConconformanceEntity, childNonconformance, afterSaleExpenses, employees } = props;
  useEffect(() => {
    if (isArrayEmpty(afterSaleExpenses) && childNonconformance.id) {
      props.getAllAfterSalesCostsByCustomerNonConformaceId(childNonconformance.id);
    }
    if (isArrayEmpty(employees)) {
      props.getAllEmployees();
    }
  }, []);
  const assignAsInternalComponent: IInternalNonConformance = childNonconformance as IInternalNonConformance;
  const assignAsCustomerComponent: IClientNonConformance = childNonconformance as IClientNonConformance;
  const isNCInternal = !isEmpty(nonConconformanceEntity) && nonConconformanceEntity.nonconformance === Nonconformance.INTERNAL;
  const extraBoms = (childNonConformance: IInternalNonConformance | IClientNonConformance): IExtraBoms[] =>
    !isArrayEmpty(allExtraBoms) && !isEmpty(childNonConformance)
      ? allExtraBoms.filter(bom =>
          'action' in childNonConformance
            ? bom.internalNonconformanceId === childNonConformance.id
            : bom.customerNonConformaceId === childNonConformance.id
        )
      : [];
  const extraRoutings = (childNonConformance: IInternalNonConformance | IClientNonConformance): IExtraRoutings[] =>
    !isArrayEmpty(allExtraRoutings) && !isEmpty(childNonConformance)
      ? allExtraRoutings.filter(routing =>
          'action' in childNonConformance
            ? routing.internalNonConformanceId === childNonConformance.id
            : routing.customerNonConformaceId === childNonConformance.id
        )
      : [];
  const overheadRateInMinutes = (childNonConformance: IInternalNonConformance | IClientNonConformance): number =>
    !isEmpty(childNonConformance) ? childNonConformance.labourRate / 60 : 0;

  const classes = useStyles(props);

  const extraRoutingSum = (overhead: number, unitRunTime: number): string => {
    const overheadInMinutes = overhead / 60;
    const routingPrice = (overheadInMinutes * unitRunTime).toFixed(2);
    return routingPrice;
  };
  const extraBomSum = (extraBom: IExtraBoms): string => {
    const materialSum = Number(extraBom.price) * Number(extraBom.quantity);
    return materialSum.toFixed(2);
  };
  const getPriceAsNumber = (bom: IBom): number => {
    const linkedProduct: IProduct = allProducts ? allProducts.filter(product => product.partNumber === bom.childPartNumber)[0] : null;
    return linkedProduct ? Number(linkedProduct.standardUnitMaterialCost.toFixed(2)) : 0.0;
  };
  const getPriceAsString = (bom: IBom): string => {
    return `£ ${getPriceAsNumber(bom).toFixed(2)}`;
  };
  const sumBomRow = (bom: IBom): string => {
    const productPrice = getPriceAsNumber(bom);
    return `£ ${(productPrice * bom.quantity).toFixed(2)}`;
  };
  const sumRoutingRow = (routingValue: IRouting, internalNonConformance: IInternalNonConformance): string => {
    const routingPrice = (overheadRateInMinutes(internalNonConformance) * routingValue.unitRunTime).toFixed(2);
    return `£ ${routingPrice}`;
  };
  const totalCostBoms = (product: IProduct): number => {
    let total = 0;
    product && product.boms.forEach(bom => (total = total + getPriceAsNumber(bom) * bom.quantity));
    return Number(total.toFixed(2));
  };
  const totalCostRoutings = (product: IProduct, internalNonConformance: IInternalNonConformance): number => {
    let total = 0;
    product &&
      product.routings.forEach(routingValue => (total = total + overheadRateInMinutes(internalNonConformance) * routingValue.unitRunTime));
    return Number(total.toFixed(2));
  };

  const totalExtraRoutingsCost = (
    action: NonconformanceAction,
    childNonConformance: IInternalNonConformance | IClientNonConformance
  ): number => {
    let totalExtraRoutings = 0;
    extraRoutings(childNonConformance)
      .filter(item => (action === null ? true : item.nonconformanceAction === action))
      .forEach(item => {
        totalExtraRoutings = totalExtraRoutings + Number(extraRoutingSum(item.overhead, item.runtime));
      });
    return totalExtraRoutings;
  };

  const totalExtraBomsCost = (childNonConformance: IInternalNonConformance | IClientNonConformance): number => {
    let totalExtraMaterials = 0;
    extraBoms(childNonConformance)
      .filter(item => item.nonconformanceAction === NonconformanceAction.REWORK)
      .forEach(item => {
        totalExtraMaterials = totalExtraMaterials + Number(extraBomSum(item));
      });
    return totalExtraMaterials;
  };
  const totalAfterSaleCost = (afterSaleExpensesList: IAfterSaleExpenses[]): number => {
    return !isArrayEmpty(afterSaleExpensesList) ? afterSaleExpensesList.map(item => item.cost).reduce((a, b) => b && a + b, 0) : 0;
  };
  const totalCostScrap = (product: IProduct, childNonConformance: IInternalNonConformance | IClientNonConformance): string => {
    return (
      (totalExtraRoutingsCost(NonconformanceAction.SCRAP, childNonConformance) +
        totalCostRoutings(product, childNonConformance) +
        totalCostBoms(product)) *
      childNonConformance.quantity
    ).toFixed(2);
  };
  const totalCostRework = (action: NonconformanceAction, childNonConformance: IInternalNonConformance | IClientNonConformance): string => {
    const totalExtraRoutings = totalExtraRoutingsCost(action, childNonConformance);
    const totalExtraBoms = totalExtraBomsCost(childNonConformance);
    const afterSaleExpensesTotal = 'action' in childNonConformance ? 0 : totalAfterSaleCost([...afterSaleExpenses]);
    return ((totalExtraRoutings + totalExtraBoms + afterSaleExpensesTotal) * childNonConformance.quantity).toFixed(2);
  };

  const allocateBomDescription = (bom: IBom): string => {
    const linkedProduct: IProduct =
      allProducts && allProducts.length > 0 ? allProducts.filter(product => product.partNumber === bom.childPartNumber)[0] : null;
    return linkedProduct ? linkedProduct.partDescription : '';
  };

  const extraRoutingsTable = (childNonConformance: IInternalNonConformance | IClientNonConformance) => (
    <div className={classes.expansionPanel}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>Extra Routings:</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Resource Name</TableCell>
                <TableCell align="right">Unit Run Time (minutes)</TableCell>
                <TableCell align="right">Overhead Rate (£/hour)</TableCell>
                <TableCell align="right">Sum (£)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {extraRoutings(childNonConformance) &&
                extraRoutings(childNonConformance)
                  .filter(item =>
                    'action' in childNonConformance
                      ? item.nonconformanceAction === (childNonConformance as IInternalNonConformance).action
                      : true
                  )
                  .map((extraRouting, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {extraRouting.resourceName}
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {extraRouting.runtime}
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {extraRouting.overhead}
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {`£ ${extraRoutingSum(extraRouting.overhead, extraRouting.runtime)}`}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Typography className={classes.secondaryHeading}>{`Sub Total £ ${totalExtraRoutingsCost(
            'action' in childNonConformance ? (childNonConformance as IInternalNonConformance).action : null,
            childNonConformance
          ).toFixed(2)}`}</Typography>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
  const bomsTable = (nonconformance: INonConformanceDetails): JSX.Element => (
    <div className={classes.expansionPanel}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>BOMS:</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right">Price&nbsp;(£)</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Sum&nbsp;(£)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nonconformance.products[0].boms.map(bom => (
                <TableRow key={bom.id}>
                  <TableCell component="th" scope="row">
                    {bom.childPartNumber}
                  </TableCell>
                  <TableCell align="left">{allocateBomDescription(bom)}</TableCell>
                  <TableCell align="right">{getPriceAsString(bom)}</TableCell>
                  <TableCell align="right">{bom.quantity}</TableCell>
                  <TableCell align="right">{sumBomRow(bom)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Typography className={classes.secondaryHeading}>{`Sub Total £ ${totalCostBoms(nonconformance.products[0])}`}</Typography>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
  const routingsTable = (nonconformance: INonConformanceDetails, internalNonConformance: IInternalNonConformance): JSX.Element => (
    <div className={classes.expansionPanel}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>Routings:</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Resource Name</TableCell>
                <TableCell align="right">Unit Run Time&nbsp;(minutes)</TableCell>
                <TableCell align="right">Overhead&nbsp;(£/hour)</TableCell>
                <TableCell align="right">Sum&nbsp;(£)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nonconformance.products[0].routings.map(routing => (
                <TableRow key={routing.id}>
                  <TableCell component="th" scope="row">
                    {routing.resourceName}
                  </TableCell>
                  <TableCell align="right">{routing.unitRunTime}</TableCell>
                  <TableCell align="right">{`£ ${internalNonConformance.labourRate}`}</TableCell>
                  <TableCell align="right">{sumRoutingRow(routing, internalNonConformance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Typography className={classes.secondaryHeading}>{`Sub Total £ ${totalCostRoutings(
            nonconformance.products[0],
            internalNonConformance
          )}`}</Typography>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
  const extraBomsTable = (childNonConformance: IInternalNonConformance | IClientNonConformance) => (
    <div className={classes.expansionPanel}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>Extra Materials:</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Part Number</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right">Price (£)</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Sum (£)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {extraBoms &&
                !isEmpty(childNonConformance) &&
                extraBoms(childNonConformance)
                  .filter(item =>
                    'action' in childNonConformance
                      ? item.nonconformanceAction === (childNonConformance as IInternalNonConformance).action
                      : true
                  )
                  .map((extraBom, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" component="th" scope="row">
                        {extraBom.partNumber}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {extraBom.partDescription}
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {extraBom.price}
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {extraBom.quantity}
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {`£ ${extraBomSum(extraBom)}`}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Typography className={classes.secondaryHeading}>{`Sub Total £ ${totalExtraBomsCost(childNonConformance)}`}</Typography>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
  const afterSaleExpensesTable = () => (
    <div className={classes.expansionPanel}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography className={classes.heading}>After Sale Expenses:</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Employee</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right">Cost (£)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isArrayEmpty(afterSaleExpenses) &&
                afterSaleExpenses.map((afterSale, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ width: '150px' }} align="left" component="th" scope="row">
                      {moment(afterSale.date).format('ll')}
                    </TableCell>
                    <TableCell style={{ width: '150px' }} align="left" component="th" scope="row">
                      {convertToEmployeeIconName(convertFromIdToEmployee(afterSale.employeeId, [...employees]))}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {afterSale.description}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {`£ ${afterSale.cost}`}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Typography className={classes.secondaryHeading}>{`Sub Total £ ${totalAfterSaleCost([...afterSaleExpenses]).toFixed(
            2
          )}`}</Typography>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
  return (
    !isEmpty(childNonconformance) &&
    !isEmpty(nonConconformanceEntity) && (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={1}>
            &nbsp;
          </Grid>
          <Grid item xs={12} sm={11}>
            <p>
              <strong>Rejection Details: </strong>
              {childNonconformance.rejectionReasonDetails}
            </p>
          </Grid>
          <Grid item xs={12} sm={12}>
            <h5>Quantity:</h5>
          </Grid>
          <Grid item xs={12} sm={1}>
            &nbsp;
          </Grid>
          <Grid item xs={12} sm={11}>
            <p>{childNonconformance.quantity}</p>
          </Grid>
          {isNCInternal && (
            <Fragment>
              <Grid item xs={12} sm={12}>
                <h5>SITE:</h5>
              </Grid>
              <Grid item xs={12} sm={1}>
                &nbsp;
              </Grid>
              <Grid item xs={12} sm={11}>
                <p>{!isArrayEmpty(assignAsInternalComponent.sites) && assignAsInternalComponent.sites[0].site}</p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <h5>DEPARTMENTS:</h5>
              </Grid>
              <Grid item xs={12} sm={1}>
                &nbsp;
              </Grid>
              <Grid item xs={12} sm={11}>
                {!isArrayEmpty(assignAsInternalComponent.departments) &&
                  assignAsInternalComponent.departments.map(departmentValue => (
                    <p key={departmentValue.id}>{departmentValue.department}</p>
                  ))}
              </Grid>
            </Fragment>
          )}
          {isNCInternal && (
            <Fragment>
              <Grid item xs={12} sm={12}>
                <h5>ACCOUNTABLES</h5>
              </Grid>
              <Grid item xs={12} sm={1}>
                &nbsp;
              </Grid>
              {!isEmpty(childNonconformance) &&
                assignAsInternalComponent.employees.map(culpableEmployee => (
                  <Grid key={culpableEmployee.id} item xs={12} sm={11}>
                    <div style={{ display: 'inline-block' }}>
                      <EmployeeAvatar maxHeight="30px" employee={culpableEmployee} />
                    </div>
                    <div style={{ display: 'inline-block' }}>
                      &nbsp;
                      {culpableEmployee.user.firstName} {culpableEmployee.user.lastName}
                    </div>
                  </Grid>
                ))}
              <Grid item xs={12} sm={12}>
                <h5>ACTION:</h5>
              </Grid>
              <Grid item xs={12} sm={1}>
                &nbsp;
              </Grid>
              <Grid item xs={12} sm={11}>
                <p>{assignAsInternalComponent.action}:</p>
              </Grid>
              {assignAsInternalComponent.action === NonconformanceAction.REWORK && (
                <Card style={{ width: '100%' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={1}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={11}>
                      {extraRoutingsTable(assignAsInternalComponent)}
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={11}>
                      {extraBomsTable(assignAsInternalComponent)}
                    </Grid>
                  </Grid>
                </Card>
              )}
              {assignAsInternalComponent.action === NonconformanceAction.SCRAP && (
                <Card style={{ width: '100%' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={1}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={11}>
                      {bomsTable(nonConconformanceEntity)}
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={11}>
                      {routingsTable(nonConconformanceEntity, assignAsInternalComponent)}
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={11}>
                      {extraRoutingsTable(assignAsInternalComponent)}
                    </Grid>
                  </Grid>
                </Card>
              )}
            </Fragment>
          )}
        </Grid>
        {isNCInternal ? (
          <div style={{ margin: '5px 0 0 0', textAlign: 'right' }}>
            <strong>{`Total Cost £ ${
              assignAsInternalComponent.action === NonconformanceAction.REWORK
                ? totalCostRework(NonconformanceAction.REWORK, assignAsInternalComponent)
                : totalCostScrap(nonConconformanceEntity.products[0], assignAsInternalComponent)
            }`}</strong>
          </div>
        ) : (
          <Fragment>
            <Card style={{ width: '100%' }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  {extraRoutingsTable(assignAsCustomerComponent)}
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  {extraBomsTable(assignAsCustomerComponent)}
                </Grid>
                <Grid item xs={12} sm={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={11}>
                  {afterSaleExpensesTable()}
                </Grid>
              </Grid>
            </Card>
            <div style={{ margin: '5px 0 0 0', textAlign: 'right' }}>
              <strong>{`Total Cost £ ${totalCostRework(null, assignAsCustomerComponent)}`}</strong>
            </div>
          </Fragment>
        )}
      </Fragment>
    )
  );
};

const mapStateToProps = ({ internalNonConformance, extraBoms, extraRoutings, afterSaleExpenses, product, employee }: IRootState) => ({
  internalLoading: internalNonConformance.loading,
  allExtraBoms: extraBoms.entities,
  allExtraRoutings: extraRoutings.entities,
  allProducts: product.entities,
  employees: employee.companysEntities,
  afterSaleExpenses: afterSaleExpenses.allAfterSalesExpensesByCustomerNonConformace
});

const mapDispatchToProps = {
  getExtraRoutings,
  getExtraBoms,
  getProductsBoms,
  getInternalNonconformace,
  getAllEmployees,
  getNonconformace,
  getAllAfterSalesCostsByCustomerNonConformaceId
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(viewInternalNonConformanceComponent);

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
      alignItems: 'center'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      padding: '0 20px 0 0'
    }
  })
);
