import React, { useState, useEffect, Fragment } from 'react';

import { ButtonGroup, Button, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { getCurrentEmployeeEntity as getCurrentEmployee } from '../../../../entities/employee/employee.reducer';
import { Priority } from 'app/shared/model/enumerations/priority.model';

interface INonconformanceTypeProps extends StateProps, DispatchProps {
  updateNonConformance: Function;
}

export const NonconformanceType = (props: INonconformanceTypeProps) => {
  const { incompleteNonConformanceDetail, updateNonConformance } = props;
  const [nonconformanceType, setNonconformanceType] = useState(null);
  const [priority, setPriority] = useState(null);

  useEffect(() => {}, []);

  const selectInternal = () => {
    setNonconformanceType(Nonconformance.INTERNAL);
    updateNonConformance({ nonconformance: Nonconformance.INTERNAL });
  };
  const selectSupplier = () => {
    setNonconformanceType(Nonconformance.SUPPLIER);
    updateNonConformance({ nonconformance: Nonconformance.SUPPLIER });
  };
  const selectAudit = () => {
    setNonconformanceType(Nonconformance.AUDIT);
    updateNonConformance({ nonconformance: Nonconformance.AUDIT });
  };
  const selectCustomer = () => {
    setNonconformanceType(Nonconformance.CUSTOMER);
    updateNonConformance({ nonconformance: Nonconformance.CUSTOMER });
  };

  const selectLow = () => {
    setPriority(Priority.LOW);
    updateNonConformance({ priority: Priority.LOW });
  };
  const selectMedium = () => {
    setPriority(Priority.MEDIUM);
    updateNonConformance({ priority: Priority.MEDIUM });
  };
  const selectHigh = () => {
    setPriority(Priority.HIGH);
    updateNonConformance({ priority: Priority.HIGH });
  };
  const selectUrgent = () => {
    setPriority(Priority.URGENT);
    updateNonConformance({ priority: Priority.URGENT });
  };

  const allocateNonconformance = (): Nonconformance =>
    nonconformanceType
      ? nonconformanceType
      : incompleteNonConformanceDetail.nonconformance
      ? incompleteNonConformanceDetail.nonconformance
      : null;
  const allocatePriority = (): Priority =>
    priority ? priority : incompleteNonConformanceDetail.priority ? incompleteNonConformanceDetail.priority : null;

  return (
    <Fragment>
      <Card style={{ backgroundColor: 'white', width: '100%', margin: '10px 0 10px 0', padding: '1rem' }}>
        <h5 style={{ textAlign: 'left', padding: '10px 10px 10px 0' }}>Non-conformace Type</h5>
        <ButtonGroup style={{ maxWidth: '260px' }}>
          <Button
            style={{ minWidth: '130px' }}
            size="sm"
            color="secondary"
            onClick={selectInternal}
            active={allocateNonconformance() === Nonconformance.INTERNAL}
          >
            Internal
          </Button>
          {/*<Button
            style={{ minWidth: '130px' }}
            disabled
            size="sm"
            color="secondary"
            onClick={selectSupplier}
            active={allocateNonconformance() === Nonconformance.SUPPLIER}
          >
            Supplier
          </Button>
          <Button
            style={{ minWidth: '130px' }}
            disabled
            size="sm"
            color="secondary"
            onClick={selectAudit}
            active={allocateNonconformance() === Nonconformance.AUDIT}
          >
            Audit
          </Button>*/}
          <Button
            style={{ minWidth: '130px' }}
            size="sm"
            color="secondary"
            onClick={selectCustomer}
            active={allocateNonconformance() === Nonconformance.CUSTOMER}
          >
            Customer
          </Button>
        </ButtonGroup>
      </Card>
      <Card style={{ backgroundColor: 'white', width: '100%', margin: '10px 0 10px 0', padding: '1rem' }}>
        <h5 style={{ textAlign: 'left', padding: '10px 10px 10px 0' }}>Set Priority</h5>
        <ButtonGroup style={{ maxWidth: '520px' }}>
          <Button
            style={{ minWidth: '130px' }}
            size="sm"
            color="secondary"
            onClick={selectLow}
            active={allocatePriority() === Priority.LOW}
          >
            Low
          </Button>
          <Button
            style={{ minWidth: '130px' }}
            size="sm"
            color="secondary"
            onClick={selectMedium}
            active={allocatePriority() === Priority.MEDIUM}
          >
            Medium
          </Button>
          <Button
            style={{ minWidth: '130px' }}
            size="sm"
            color="secondary"
            onClick={selectHigh}
            active={allocatePriority() === Priority.HIGH}
          >
            High
          </Button>
          <Button
            style={{ minWidth: '130px' }}
            size="sm"
            color="secondary"
            onClick={selectUrgent}
            active={allocatePriority() === Priority.URGENT}
          >
            Urgent
          </Button>
        </ButtonGroup>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = ({ nonConformanceDetails }: IRootState) => ({
  incompleteNonConformanceDetail: nonConformanceDetails.entity
});

const mapDispatchToProps = { getCurrentEmployee };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonconformanceType);
