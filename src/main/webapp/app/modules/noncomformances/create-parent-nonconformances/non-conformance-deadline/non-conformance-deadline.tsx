import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
// tslint:disable
import { createStyles, makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
// tslint:enable
import { DateUtils } from 'react-day-picker';
import {
  updateEntity as updateNonconformance,
  getCurrentIncomplete as getIncompleteNonconformance
} from '../../../../entities/non-conformance-details/non-conformance-details.reducer';
import {
  updateEntity as updateInternalNonconformance,
  createEntity as createInternalNonconformance
} from '../../../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { APP_LOCAL_DATE_FORMAT_2 } from 'app/config/constants';
import moment, { Moment } from 'moment';
import { isValid } from 'date-fns';

interface INonconformanceInternalCulpabilityProps extends StateProps, DispatchProps {
  updateNonConformance: Function;
}

export const internalNonConformanceCulpability = (props: INonconformanceInternalCulpabilityProps) => {
  const { incompleteNonConformance, updateNonConformance } = props;

  useEffect(() => {
    if (isArrayEmpty(incompleteNonConformance)) {
      props.getIncompleteNonconformance();
    }
  }, []);

  const [deadlineToSave, setDeadlineToSave] = useState<Moment>(null);
  const classes = useStyles(props);

  const saveDeadline = (date: Date) => {
    updateNonConformance({ deadline: moment(new Date(date)) });
  };

  const assignDeadline = (): string => {
    if (deadlineToSave) {
      return `${dateFnsFormat(new Date(deadlineToSave.toString()), APP_LOCAL_DATE_FORMAT_2)}`;
    }
    if (!isEmpty(incompleteNonConformance) && incompleteNonConformance.deadline) {
      return `${dateFnsFormat(new Date(incompleteNonConformance.deadline.toString()), APP_LOCAL_DATE_FORMAT_2)}`;
    } else {
      return `${dateFnsFormat(new Date(), APP_LOCAL_DATE_FORMAT_2)}`;
    }
  };

  const handleDeadlineChange = date => {
    if (isValid(new Date(date))) {
      setDeadlineToSave(date);
      saveDeadline(date);
    }
  };

  return (
    <Fragment>
      <Card style={{ backgroundColor: 'white' }} className={classes.cardStyle}>
        <div className={classes.root}>
          <h5>Deadline</h5>
          <br />
          <DayPickerInput
            formatDate={formatDate}
            format={APP_LOCAL_DATE_FORMAT_2}
            parseDate={parseDate}
            placeholder={assignDeadline()}
            onDayChange={handleDeadlineChange}
            onBlur={handleDeadlineChange}
            dayPickerProps={{
              showWeekNumbers: true,
              todayButton: 'Today',
              disabledDays: { before: new Date() }
            }}
          />
        </div>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = ({ nonConformanceDetails, internalNonConformance, task, employee }: IRootState) => ({
  incompleteNonConformance: nonConformanceDetails.entity
});

const mapDispatchToProps = {
  getIncompleteNonconformance,
  updateNonconformance
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceCulpability);

const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};
const formatDate = (date, format, locale) => dateFnsFormat(date, format, { locale });

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 'auto',
      minWidth: 290
    },
    cardStyle: {
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      width: '100%',
      margin: '10px 0 10px 0',
      padding: '1rem'
    }
  })
);
