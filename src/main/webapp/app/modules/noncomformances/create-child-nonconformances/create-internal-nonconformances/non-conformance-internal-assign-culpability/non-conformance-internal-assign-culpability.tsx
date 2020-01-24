import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
// tslint:disable
import { createStyles, makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
import 'react-day-picker/lib/style.css';
// tslint:enable
import SelectMultipleEmployees from '../../../../../shared/layout/custom-components/select/select-multiple-employees';
import { getAllEntities as getEmployees } from '../../../../../entities/employee/employee.reducer';
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { IEmployee } from 'app/shared/model/employee.model';

interface INonconformanceInternalCulpabilityProps extends StateProps, DispatchProps {
  updateInternalNonConformance: Function;
}

export const internalNonConformanceCulpability = (props: INonconformanceInternalCulpabilityProps) => {
  const { incompleteInternalNonConformance } = props;

  useEffect(() => {
    props.getEmployees();
  }, []);

  const [culpableEmployees, setCulpableEmployees] = useState<IEmployee[]>(null);
  const classes = useStyles(props);

  const saveEmployees = (employeesToSave: IEmployee[]) => {
    props.updateInternalNonConformance({ employees: employeesToSave });
  };

  const assignCulpableEmployees = (): IEmployee[] => {
    if (!culpableEmployees && !isEmpty(incompleteInternalNonConformance) && incompleteInternalNonConformance.employees.length > 0) {
      return incompleteInternalNonConformance.employees;
    } else {
      return culpableEmployees;
    }
  };

  return (
    <Fragment>
      <Card style={{ backgroundColor: 'white' }} className={classes.cardStyle}>
        <div className={classes.root}>
          <h5>Assign Culpables</h5>
          <SelectMultipleEmployees
            saveEmployees={saveEmployees}
            selectedEmployees={assignCulpableEmployees()}
            setSelectedEmployees={setCulpableEmployees}
          />
        </div>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = ({ internalNonConformance, employee }: IRootState) => ({
  incompleteInternalNonConformance: internalNonConformance.entity,
  allEmployees: employee.companysEntities
});

const mapDispatchToProps = {
  getEmployees
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceCulpability);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 'auto',
      minWidth: 290
    },
    cardStyle: {
      width: '100%',
      margin: '10px 0 20px 0',
      padding: '1rem'
    }
  })
);
