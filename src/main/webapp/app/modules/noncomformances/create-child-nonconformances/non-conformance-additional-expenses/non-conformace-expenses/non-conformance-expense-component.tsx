import React, { useEffect, useState, Fragment } from 'react';
import { Card, Spinner } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
// tslint:disable
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// tslint:enable
import {
  updateEntity as updateAfterSaleExpense,
  deleteEntity as deleteAfterSale
} from '../../../../../entities/after-sale-expenses/after-sale-expenses.reducer';
import moment from 'moment';
import SelectEmployee from 'app/shared/layout/custom-components/select/select-single-employee';
import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
interface INonconformanceExpensesProps extends StateProps, DispatchProps {
  currentAfterSaleExpense: IAfterSaleExpenses;
}
export const nonConformanceExpenses = (props: INonconformanceExpensesProps) => {
  const { allEmployees, currentAfterSaleExpense } = props;
  useEffect(() => {}, []);
  const [employee, setEmployee] = useState<IEmployee>(null);
  const [noEmployeeSelected, setNoEmployeeSelected] = useState(false);
  const assignEmployee = () =>
    employee ? employee : !isArrayEmpty(allEmployees) ? allEmployees.find(e => e.id === currentAfterSaleExpense.employeeId) : null;
  const handleRemoveAfterSaleItem = (entity: IAfterSaleExpenses) => {
    props.deleteAfterSale(entity);
  };
  const descriptionUpdate = event => {
    event.target.value.trim() !== '' && props.updateAfterSaleExpense({ ...currentAfterSaleExpense, description: event.target.value });
  };
  const costUpdate = event => {
    event.target.value.trim() !== '' && props.updateAfterSaleExpense({ ...currentAfterSaleExpense, cost: Number(event.target.value) });
  };
  const updateEmployee = (selectedEmployee: IEmployee): void => {
    setEmployee(selectedEmployee);
    props.updateAfterSaleExpense({ ...currentAfterSaleExpense, employeeId: selectedEmployee.id });
  };
  return (
    <Fragment>
      <Card style={{ backgroundColor: 'white', margin: '0 0 10px 0' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              margin="dense"
              label="Date"
              value={moment().format('lll')}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <SelectEmployee
              employee={currentAfterSaleExpense ? assignEmployee() : null}
              setEmployee={updateEmployee}
              noEmployeeSelected={noEmployeeSelected}
              setNoEmployeeSelected={setNoEmployeeSelected}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              // tslint:disable-next-line
              onBlur={() => descriptionUpdate(event)}
              defaultValue={currentAfterSaleExpense.description ? currentAfterSaleExpense.description : ''}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              fullWidth
              margin="dense"
              type="number"
              label="Cost"
              // tslint:disable-next-line
              onBlur={() => costUpdate(event)}
              defaultValue={currentAfterSaleExpense.cost ? `${currentAfterSaleExpense.cost.toFixed(2)}` : '0.00'}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <div style={{ textAlign: 'right' }}>
              <IconButton
                size="small"
                // tslint:disable-next-line
                onClick={() => handleRemoveAfterSaleItem(currentAfterSaleExpense)}
                title={'Delete Expense Item'}
                aria-label="delete"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = ({ afterSaleExpenses, clientNonConformance, employee }: IRootState) => ({
  customerNonConformance: clientNonConformance.entity,
  allEmployees: employee.entities
});

const mapDispatchToProps = {
  updateAfterSaleExpense,
  deleteAfterSale
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nonConformanceExpenses);
