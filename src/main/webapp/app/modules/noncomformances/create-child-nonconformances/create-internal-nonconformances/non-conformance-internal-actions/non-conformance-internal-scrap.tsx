import React, { useEffect, useState, Fragment } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import PopoverInfo from '../../../../../shared/layout/custom-components/popover-info/popover-info';
import { IRouting } from 'app/shared/model/routing.model';
import { IBom } from 'app/shared/model/bom.model';
import { Card, Spinner, Button } from 'reactstrap';
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
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
// tslint:enable
import { IProduct } from 'app/shared/model/product.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import {
  updateEntity as updateExtraRouting,
  deleteEntity as deleteExtraRouting
} from '../../../../../entities/extra-routings/extra-routings.reducer';
import { isEmpty } from 'app/shared/util/general-utils';
import ExtraRoutingDialog from '../../non-conformance-additional-expenses/non-conformance-extra-routing-dialog';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';

interface INonconformanceInternalScrapProps extends StateProps, DispatchProps {}

export const internalNonConformanceScrap = (props: INonconformanceInternalScrapProps) => {
  const {
    overheadRate,
    nonConformanceProducts,
    productsBoms,
    loadingProducts,
    allInternalExtraRoutings,
    incompleteInternalNonConformance
  } = props;
  useEffect(() => {}, []);

  const [open, setOpen] = useState(false);
  const [currentExtraRouting, setCurrentExtraRouting] = useState(null);

  const classes = useStyles(props);

  const totalExtraCost = (extraCost: IExtraRoutings[]): number => {
    let total = 0.0;
    if (extraCost && !isEmpty(incompleteInternalNonConformance)) {
      extraCost
        .filter(
          item =>
            item.nonconformanceAction === NonconformanceAction.SCRAP &&
            item.internalNonConformanceId === incompleteInternalNonConformance.id
        )
        .forEach(element => {
          const overheadInMinutes = element.overhead / 60;
          const routingPrice = overheadInMinutes * element.runtime;
          total = total + routingPrice;
        });
    }
    return total;
  };

  const getPriceAsNumber = (bom: IBom): number => {
    const linkedProduct: IProduct = productsBoms ? productsBoms.filter(product => product.partNumber === bom.childPartNumber)[0] : null;
    return linkedProduct ? Number(linkedProduct.standardUnitMaterialCost.toFixed(2)) : 0.0;
  };
  const getPriceAsString = (bom: IBom): string => {
    return `£ ${getPriceAsNumber(bom).toFixed(2)}`;
  };
  const sumBomRow = (bom: IBom): string => {
    const productPrice = getPriceAsNumber(bom);
    return `£ ${(productPrice * bom.quantity).toFixed(2)}`;
  };
  const totalBom = (product: IProduct): number => {
    let total = 0;
    product.boms.forEach(bom => (total = total + getPriceAsNumber(bom) * bom.quantity));
    return Number(total.toFixed(2));
  };
  const getBomDescription = (bom: IBom): string => {
    const boms: IProduct[] = productsBoms.filter(product => product.partNumber === bom.childPartNumber);
    return productsBoms && productsBoms.length > 0 && boms[0] ? boms[0].partDescription : null;
  };

  const overheadRateInMinutes = overheadRate / 60;

  const sumRoutingRow = (routingValue: IRouting): string => {
    const routingPrice = (overheadRateInMinutes * routingValue.unitRunTime).toFixed(2);
    return `£ ${routingPrice}`;
  };
  const totalRouting = (product: IProduct): number => {
    let total = 0;
    product.routings.forEach(routingValue => (total = total + overheadRateInMinutes * routingValue.unitRunTime));
    return Number(total.toFixed(2));
  };

  const extraRoutingSum = (overhead: number, unitRunTime: number): string => {
    const overheadInMinutes = overhead / 60;
    const routingPrice = (overheadInMinutes * unitRunTime).toFixed(2);
    return `£ ${routingPrice}`;
  };
  const handleAddExtraRoutings = () => {
    setCurrentExtraRouting(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteExtraRoutings = (extraRoutingIndex: number) => {
    props.deleteExtraRouting(extraRoutingIndex);
  };
  const handleEditExtraRoutings = (extraRoutingIndex: number) => {
    const currentExtraRoutingToSave = allInternalExtraRoutings.filter(item => item.id === extraRoutingIndex)[0];
    setCurrentExtraRouting(currentExtraRoutingToSave);
    setOpen(true);
  };

  const allocateOverhead = (extraRouting: IExtraRoutings): number => (extraRouting.overhead ? extraRouting.overhead : overheadRate);
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
                      <strong>{product.partDescription}</strong>
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
              <div className={classes.root}>
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                    <div>
                      <Typography className={classes.heading}>BOMs</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Description</TableCell>
                          <TableCell align="right">Price&nbsp;(£)</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Sum&nbsp;(£)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product.boms &&
                          product.boms.length > 0 &&
                          product.boms.map(bom => (
                            <TableRow key={bom.id}>
                              <TableCell component="th" scope="row">
                                {bom.childPartNumber}
                              </TableCell>
                              <TableCell align="right">{getBomDescription(bom)}</TableCell>
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
                    <Typography className={classes.secondaryHeading}>Total {`£ ${totalBom(product).toFixed(2)}`}</Typography>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              </div>
              <br />
              <div className={classes.root}>
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                    <div>
                      <Typography className={classes.heading}>Routings</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Resource Name</TableCell>
                          <TableCell align="right">Unit Run Time&nbsp;(minutes)</TableCell>
                          <TableCell align="right">Overhead&nbsp;(£/hour)</TableCell>
                          <TableCell align="right">Sum&nbsp;(£)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product.routings.map(routing => (
                          <TableRow key={routing.id}>
                            <TableCell component="th" scope="row">
                              {routing.resourceName}
                            </TableCell>
                            <TableCell align="right">{routing.unitRunTime}</TableCell>
                            <TableCell align="right">{`£ ${overheadRate}`}</TableCell>
                            <TableCell align="right">{sumRoutingRow(routing)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <Typography className={classes.secondaryHeading}>Total {`£ ${totalRouting(product).toFixed(2)}`}</Typography>
                  </ExpansionPanelActions>
                </ExpansionPanel>
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
                              {allInternalExtraRoutings &&
                                !isEmpty(incompleteInternalNonConformance) &&
                                allInternalExtraRoutings
                                  .filter(
                                    item =>
                                      item.internalNonConformanceId === incompleteInternalNonConformance.id &&
                                      item.nonconformanceAction === NonconformanceAction.SCRAP
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
                    <Typography className={classes.secondaryHeading}>
                      Sub Total {`£ ${totalExtraCost([...allInternalExtraRoutings]).toFixed(2)}`}
                    </Typography>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              </div>
              <br />
              <div style={{ textAlign: 'right', padding: '5px 0 0 0' }}>
                {incompleteInternalNonConformance &&
                  incompleteInternalNonConformance.quantity &&
                  (incompleteInternalNonConformance.quantity === 1 ? (
                    <Typography>
                      <strong>{`Total £ ${(
                        totalRouting(product) +
                        totalBom(product) +
                        totalExtraCost([...allInternalExtraRoutings])
                      ).toFixed(2)}`}</strong>
                    </Typography>
                  ) : (
                    <Fragment>
                      <Typography>{`${incompleteInternalNonConformance.quantity} x £ ${(
                        totalRouting(product) +
                        totalBom(product) +
                        totalExtraCost([...allInternalExtraRoutings])
                      ).toFixed(2)}`}</Typography>
                      <Typography>
                        <strong>{`Total £ ${(
                          incompleteInternalNonConformance.quantity *
                          (totalRouting(product) + totalBom(product) + totalExtraCost([...allInternalExtraRoutings]))
                        ).toFixed(2)}`}</strong>
                      </Typography>
                    </Fragment>
                  ))}
              </div>
              <ExtraRoutingDialog
                open={open}
                handleClose={handleClose}
                extraRouting={currentExtraRouting}
                nonConformanceIdType={
                  !isEmpty(incompleteInternalNonConformance)
                    ? { type: Nonconformance.INTERNAL, id: incompleteInternalNonConformance.id }
                    : null
                }
                labourRate={!isEmpty(incompleteInternalNonConformance) ? incompleteInternalNonConformance.labourRate : 0}
              />
            </Card>
          ))
        : null}
    </Fragment>
  );
};
const mapStateToProps = ({ nonConformanceDetails, company, product, extraRoutings, internalNonConformance }: IRootState) => ({
  nonConformanceProducts: nonConformanceDetails.entity.products,
  nonConformanceRoutings: nonConformanceDetails.entity.routings,
  incompleteNonConformance: nonConformanceDetails.entity,
  overheadRate: company.entities[0].overheadRate,
  productsBoms: product.bomEntities,
  loadingProducts: product.loading,
  allInternalExtraRoutings: extraRoutings.entities,
  incompleteInternalNonConformance: internalNonConformance.entity
});

const mapDispatchToProps = { updateExtraRouting, deleteExtraRouting };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceScrap);

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
    margin: {
      margin: theme.spacing(1)
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
