import React, { useEffect, useState, Fragment } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
// tslint:disable
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
// tslint:enable
import AfterSaleExpenseComponent from './non-conformance-expense-component';
import { createEntity as createAfterSaleExpense } from '../../../../../entities/after-sale-expenses/after-sale-expenses.reducer';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import moment from 'moment';
import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';
interface INonconformanceExpensesProps extends StateProps, DispatchProps {
  extraExpensesTotal: () => number;
}
export const nonConformanceExpenses = (props: INonconformanceExpensesProps) => {
  const { customerNonConformance, afterSaleExpenses, currentEmployee, extraExpensesTotal } = props;
  useEffect(() => {}, []);
  const classes = useStyles(props);

  const defaultAfterSaleExpenses = (): IAfterSaleExpenses => {
    return {
      date: moment(),
      description: '',
      cost: 0,
      employeeId: currentEmployee.id,
      customerNonConformanceId: customerNonConformance.id
    };
  };
  const onHadleAddAfterSaleExpenses = () => {
    if (!isEmpty(customerNonConformance) && !isEmpty(currentEmployee)) {
      props.createAfterSaleExpense(defaultAfterSaleExpenses());
    }
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
            <div>
              <Typography className={classes.heading}>Extra Expenses</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <div style={{ textAlign: 'right' }}>
                <IconButton onClick={onHadleAddAfterSaleExpenses} size="small" title={'Add Progress Track'} aria-label="add">
                  <AddIcon />
                </IconButton>
              </div>
              <br />
              {!isArrayEmpty(afterSaleExpenses) &&
                afterSaleExpenses.map(currentAfterSaleExpense => (
                  <AfterSaleExpenseComponent
                    key={currentAfterSaleExpense.id + new Date().getTime().toString()}
                    currentAfterSaleExpense={currentAfterSaleExpense}
                  />
                ))}
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Typography className={classes.secondaryHeading}>
              Sub Total £ {extraExpensesTotal() && (extraExpensesTotal() === 0 ? '0.00' : extraExpensesTotal().toFixed(2))}
            </Typography>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
      <br />
    </Fragment>
  );
};

const mapStateToProps = ({ afterSaleExpenses, clientNonConformance, employee }: IRootState) => ({
  customerNonConformance: clientNonConformance.entity,
  afterSaleExpenses: afterSaleExpenses.allAfterSalesExpensesByCustomerNonConformace,
  currentEmployee: employee.currentEmployeeEntity
});

const mapDispatchToProps = {
  createAfterSaleExpense
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nonConformanceExpenses);

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
    column: {
      flexBasis: '100%'
    },
    details: {
      alignItems: 'center'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: 0
    }
  })
);
