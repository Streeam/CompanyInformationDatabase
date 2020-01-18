import React, { useEffect, useState, Fragment } from 'react';
import { Card, Spinner } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import PopoverInfo from '../../../../shared/layout/custom-components/popover-info/popover-info';
import { FilterBomsModal } from './non-conformance-extra-boms-dialog';
// tslint:disable
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
// tslint:enable
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import ExtraRoutingDialog from './non-conformance-extra-routing-dialog';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { deleteEntity as deleteExtraRouting } from '../../../../entities/extra-routings/extra-routings.reducer';
import {
  deleteEntity as deleteExtraBom,
  createEntity as createExtraBoms,
  updateEntity as updateExtraBoms,
  getEntities as getExtraBoms
} from '../../../../entities/extra-boms/extra-boms.reducer';
import { getAllAfterSalesCostsByCustomerNonConformaceId } from '../../../../entities/after-sale-expenses/after-sale-expenses.reducer';
import { getEntity as getCustomerEntity } from '../../../../entities/client-non-conformance/client-non-conformance.reducer';
import { getEntity as getInternalEntity } from '../../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import NonConformanceExpenses from './non-conformace-expenses/non-conformance-expenses';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
interface INonconformanceAdditionalExpensesProps extends StateProps, DispatchProps {
  extraRoutings: IExtraRoutings[];
  extraBoms: IExtraBoms[];
  nonConformanceIdType: { type: Nonconformance; id: number };
  labourRate: number;
  updateChildNonConformance?: (fieldsToSave: any) => void;
}
export const nonConformanceAddittional = (props: INonconformanceAdditionalExpensesProps) => {
  const {
    nonConformanceProducts,
    extraBoms,
    extraRoutings,
    loadingProducts,
    allProducts,
    companies,
    nonConformanceIdType,
    labourRate,
    updateChildNonConformance,
    customerNonConformances,
    customerNonConformance,
    afterSaleExpenses,
    internalNonConformance
  } = props;
  useEffect(() => {
    if (isArrayEmpty(afterSaleExpenses) && nonConformanceIdType) {
      props.getAllAfterSalesCostsByCustomerNonConformaceId(nonConformanceIdType.id);
    }
    if (isEmpty(customerNonConformance) && nonConformanceIdType && nonConformanceIdType.type === Nonconformance.CUSTOMER) {
      props.getCustomerEntity(nonConformanceIdType.id);
    }
    if (isEmpty(internalNonConformance) && nonConformanceIdType && nonConformanceIdType.type === Nonconformance.INTERNAL) {
      props.getInternalEntity(nonConformanceIdType.id);
    }
  }, []);
  const classes = useStyles(props);
  const childNonConformance = (): IInternalNonConformance | IClientNonConformance | null => {
    if ((!isEmpty(customerNonConformance) || !isEmpty(internalNonConformance)) && nonConformanceIdType) {
      if (nonConformanceIdType.type === Nonconformance.INTERNAL) {
        return internalNonConformance;
      } else {
        return customerNonConformance;
      }
    }
    return null;
  };
  const [bomModalOpen, setBomModalOpen] = useState(false);
  const [routingModalOpen, setRoutingModalOpen] = useState(false);
  const [currentExtraRouting, setCurrentExtraRouting] = useState(null);
  const totalExtraBomsCost = (): number => {
    let total = 0.0;
    extraBoms.forEach(bom => {
      const sum = bom.quantity * bom.price;
      total += sum;
    });
    return total;
  };
  const totalRoutingExtraCost = (): number => {
    let total = 0.0;
    extraRoutings.forEach(element => {
      const overheadInMinutes = element.overhead / 60;
      const routingPrice = overheadInMinutes * element.runtime;
      total += routingPrice;
    });
    return total;
  };

  const allocateExtraExpenses = (): number => {
    if (!isArrayEmpty(afterSaleExpenses) && nonConformanceIdType.type && nonConformanceIdType.type === Nonconformance.CUSTOMER) {
      return afterSaleExpenses.reduce((a, b) => a + (b['cost'] || 0), 0);
    } else {
      return 0;
    }
  };
  const extraRoutingSum = (overhead: number, unitRunTime: number): string => {
    const overheadInMinutes = overhead / 60;
    const routingPrice = (overheadInMinutes * unitRunTime).toFixed(2);
    return `£ ${routingPrice}`;
  };
  const extraMaterialSum = (extraBom: IExtraBoms): string => {
    const materialSum = Number(extraBom.price) * Number(extraBom.quantity);
    return materialSum.toFixed(2);
  };

  const handleAddExtraRoutings = () => {
    setCurrentExtraRouting(null);
    setRoutingModalOpen(true);
  };

  const handleBomModalOpen = () => {
    setBomModalOpen(true);
  };

  const handleBomModalClose = () => {
    setBomModalOpen(false);
  };
  const handleRoutingModalClose = () => {
    setRoutingModalOpen(false);
  };
  const handleDeleteExtraRoutings = (extraRoutingIndex: number) => {
    props.deleteExtraRouting(extraRoutingIndex);
  };
  const handleDeleteExtraMaterial = (extraBomIndex: number) => {
    props.deleteExtraBom(extraBomIndex);
  };
  const handleEditExtraRoutings = (extraRoutingIndex: number) => {
    const currentExtraRoutingToSave = extraRoutings.filter(item => item.id === extraRoutingIndex)[0];
    setCurrentExtraRouting(currentExtraRoutingToSave);
    setRoutingModalOpen(true);
  };
  const allocateOverhead = (extraRouting: IExtraRoutings): number =>
    extraRouting.overhead ? extraRouting.overhead : !isArrayEmpty(companies) ? companies[0].overheadRate : 0;
  return (
    <Fragment>
      {nonConformanceProducts && nonConformanceProducts.length > 0
        ? nonConformanceProducts.map(product => (
            <Card key={product.partNumber}>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    textAlign: 'left',
                    width: '50%'
                  }}
                >
                  <div style={{ display: 'inline-block' }}>
                    <h5>
                      <strong>{product.partNumber}</strong>
                    </h5>
                  </div>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    textAlign: 'right',
                    width: '50%'
                  }}
                >
                  <PopoverInfo popupBody={product.partDescription} popupTitle={product.partNumber} />
                </div>
              </div>
              <br />
              <div className={classes.root}>
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                    <div>
                      <Typography className={classes.heading}>Extra Routings</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column}>
                      {loadingProducts ? (
                        <div style={{ textAlign: 'center' }}>
                          <Spinner />
                        </div>
                      ) : (
                        <div style={{ textAlign: 'right' }}>
                          <IconButton
                            size="medium"
                            aria-label="add"
                            className={classes.margin}
                            title={'Add Extra Routing'}
                            onClick={handleAddExtraRoutings}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <br />
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Resource Name</TableCell>
                                <TableCell align="right">Unit Run Time (minutes)</TableCell>
                                <TableCell align="right">Overhead Rate (£/hour)</TableCell>
                                <TableCell align="right">Sum (£)</TableCell>
                                <TableCell align="right" />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {extraRoutings.map((extraRouting, index) => (
                                <TableRow key={index}>
                                  <TableCell component="th" scope="row">
                                    {extraRouting.resourceName}
                                  </TableCell>
                                  <TableCell align="right" component="th" scope="row">
                                    {extraRouting.runtime}
                                  </TableCell>
                                  <TableCell align="right" component="th" scope="row">
                                    {allocateOverhead(extraRouting)}
                                  </TableCell>
                                  <TableCell align="right" component="th" scope="row">
                                    {extraRoutingSum(allocateOverhead(extraRouting), extraRouting.runtime)}
                                  </TableCell>
                                  <TableCell align="right">
                                    <IconButton
                                      size="small"
                                      // tslint:disable
                                      onClick={() => handleEditExtraRoutings(extraRouting.id)}
                                      // tslint:enable
                                      title={'Edit Routing'}
                                      aria-label="add"
                                      className={classes.margin}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      // tslint:disable
                                      onClick={() => handleDeleteExtraRoutings(extraRouting.id)}
                                      // tslint:enable
                                      title={'Remove Routing'}
                                      aria-label="remove"
                                      className={classes.margin}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <Typography className={classes.secondaryHeading}>Sub Total {totalRoutingExtraCost().toFixed(2)}</Typography>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              </div>
              <br />
              <div className={classes.root}>
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                    <div>
                      <Typography className={classes.heading}>Extra Materials</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column}>
                      {loadingProducts ? (
                        <div style={{ textAlign: 'center' }}>
                          <Spinner />
                        </div>
                      ) : (
                        <div style={{ textAlign: 'right' }}>
                          <IconButton
                            size="medium"
                            aria-label="add"
                            className={classes.margin}
                            title={'Add Extra Materials'}
                            onClick={handleBomModalOpen}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <br />
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Part Number</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="right">Price (£)</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Sum (£)</TableCell>
                                <TableCell align="right" />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {extraBoms.map((extraBom, index) => (
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
                                    {extraMaterialSum(extraBom)}
                                  </TableCell>
                                  <TableCell align="right">
                                    <IconButton
                                      size="small"
                                      // tslint:disable
                                      onClick={() => handleDeleteExtraMaterial(extraBom.id)}
                                      // tslint:enable
                                      title={'Remove Routing'}
                                      aria-label="remove"
                                      className={classes.margin}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <Typography className={classes.secondaryHeading}>Sub Total £ {totalExtraBomsCost().toFixed(2)}</Typography>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              </div>
              <br />
              {nonConformanceIdType.type && nonConformanceIdType.type === Nonconformance.CUSTOMER && (
                <NonConformanceExpenses extraExpensesTotal={allocateExtraExpenses} />
              )}
              <br />
              <div style={{ textAlign: 'right', padding: '5px 0 0 0' }}>
                {childNonConformance() &&
                  childNonConformance().quantity &&
                  (childNonConformance().quantity === 1 ? (
                    <Typography>
                      <strong>{`Total £ ${(totalExtraBomsCost() + totalRoutingExtraCost() + allocateExtraExpenses()).toFixed(2)}`}</strong>
                    </Typography>
                  ) : (
                    <Fragment>
                      <Typography>{`${childNonConformance().quantity} x £ ${(
                        totalExtraBomsCost() +
                        totalRoutingExtraCost() +
                        allocateExtraExpenses()
                      ).toFixed(2)}`}</Typography>
                      <Typography>
                        <strong>{`Total £ ${(
                          childNonConformance().quantity *
                          (totalExtraBomsCost() + totalRoutingExtraCost() + allocateExtraExpenses())
                        ).toFixed(2)}`}</strong>
                      </Typography>
                    </Fragment>
                  ))}
              </div>
              <FilterBomsModal
                open={bomModalOpen}
                setOpen={setBomModalOpen}
                handleClose={handleBomModalClose}
                nonConformanceIdType={nonConformanceIdType}
                createExtraBoms={props.createExtraBoms}
                allProducts={[...allProducts]}
              />
              <ExtraRoutingDialog
                open={routingModalOpen}
                handleClose={handleRoutingModalClose}
                extraRouting={currentExtraRouting}
                nonConformanceIdType={nonConformanceIdType}
                labourRate={labourRate}
                updateChildNonConformance={updateChildNonConformance}
              />
            </Card>
          ))
        : null}
    </Fragment>
  );
};

const mapStateToProps = ({
  nonConformanceDetails,
  company,
  product,
  extraRoutings,
  extraBoms,
  clientNonConformance,
  internalNonConformance,
  afterSaleExpenses
}: IRootState) => ({
  nonConformanceProducts: nonConformanceDetails.entity.products,
  nonConformanceRoutings: nonConformanceDetails.entity.routings,
  companies: company.entities,
  allProducts: product.entities,
  allInternalExtraRoutings: extraRoutings.entities,
  allInternalExtraBoms: extraBoms.entities,
  customerNonConformances: clientNonConformance.entitiesOfNoconformanceDetails,
  customerNonConformance: clientNonConformance.entity,
  loadingProducts: product.loading,
  afterSaleExpenses: afterSaleExpenses.allAfterSalesExpensesByCustomerNonConformace,
  internalNonConformance: internalNonConformance.entity
});

const mapDispatchToProps = {
  deleteExtraRouting,
  deleteExtraBom,
  createExtraBoms,
  updateExtraBoms,
  getExtraBoms,
  getAllAfterSalesCostsByCustomerNonConformaceId,
  getCustomerEntity,
  getInternalEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nonConformanceAddittional);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    table: {
      minWidth: 650
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20
    },
    column: {
      flexBasis: '100%'
    },
    details: {
      alignItems: 'center'
    },
    margin: {
      margin: theme.spacing(1)
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2)
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  })
);
