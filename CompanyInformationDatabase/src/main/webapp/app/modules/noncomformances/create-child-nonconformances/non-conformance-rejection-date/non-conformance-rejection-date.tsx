import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
// tslint:disable
import { createStyles, makeStyles } from '@material-ui/core/styles';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
// import Card from '@material-ui/core/Card';
import 'react-day-picker/lib/style.css';
// tslint:enable
import { isEmpty, isArrayEmpty } from 'app/shared/util/general-utils';
import { APP_LOCAL_DATE_FORMAT_2 } from 'app/config/constants';
import moment, { Moment } from 'moment';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';

interface INonconformanceRejectionDateProps {
  updateNonConformance: Function;
  childNonConformance: IInternalNonConformance | IClientNonConformance;
}

export const nonConformanceRejectionDate = (props: INonconformanceRejectionDateProps) => {
  const { updateNonConformance, childNonConformance } = props;

  useEffect(() => {}, []);

  const [rejectionDateTosave, setRejectionDateTosave] = useState<Moment>(null);
  const classes = useStyles(props);

  const saveRejectionDate = (date: Date) => {
    updateNonConformance({ rejectionDate: moment(new Date(date)) });
  };

  const assignRejectionDate = (): string => {
    if (rejectionDateTosave) {
      return `${dateFnsFormat(new Date(rejectionDateTosave.toString()), APP_LOCAL_DATE_FORMAT_2)}`;
    }
    if (!isEmpty(childNonConformance) && childNonConformance.rejectionDate) {
      return `${dateFnsFormat(new Date(childNonConformance.rejectionDate.toString()), APP_LOCAL_DATE_FORMAT_2)}`;
    } else {
      return `${dateFnsFormat(new Date(), APP_LOCAL_DATE_FORMAT_2)}`;
    }
  };

  const handleRejectionDateChange = date => {
    setRejectionDateTosave(date);
    saveRejectionDate(date);
  };
  return (
    <Fragment>
      <Card style={{ backgroundColor: 'white' }} className={classes.cardStyle}>
        <div className={classes.root}>
          <h5>Rejection Date</h5>
          <DayPickerInput
            formatDate={formatDate}
            format={APP_LOCAL_DATE_FORMAT_2}
            parseDate={parseDate}
            placeholder={assignRejectionDate()}
            onDayChange={handleRejectionDateChange}
            dayPickerProps={{
              showWeekNumbers: true,
              todayButton: 'Today',
              disabledDays: { after: new Date() }
            }}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default nonConformanceRejectionDate;

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
      width: '100%',
      margin: '10px 0 20px 0',
      padding: '1rem'
    }
  })
);
