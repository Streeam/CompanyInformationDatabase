import React, { useState } from 'react';
import Helmet from 'react-helmet';
// tslint:disable
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
// tslint:enable
import { Button } from 'reactstrap';
import moment from 'moment';
import { isNull } from 'util';
interface IDateRangeProps {
  dateRangeIsInvalid: boolean;
  setDateRangeIsInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  from: moment.Moment;
  setFrom: React.Dispatch<React.SetStateAction<moment.Moment>>;
  to: moment.Moment;
  setTo: React.Dispatch<React.SetStateAction<moment.Moment>>;
}
export const DateRange = props => {
  const { from, setFrom, to, setTo, dateRangeIsInvalid, setDateRangeIsInvalid, currentTask } = props;
  const [enteredTo, setEnteredTo] = useState(null);

  const setInitialState = () => {
    setFrom(null);
    setTo(null);
    setEnteredTo(null);
  };

  const isSelectingFirstDay = (fromDate, toDate, selectedDay) => {
    const isBeforeFirstDay = fromDate && (new Date(selectedDay) > new Date(fromDate));
    const isRangeSelected = fromDate && toDate;
    return !fromDate || isBeforeFirstDay || isRangeSelected;
  };

  const assignFrom = () => (from ? from : currentTask ? new Date(currentTask.startDate) : null);
  const assignTo = () => (to ? to : currentTask ? new Date(currentTask.endDate) : null);

  const handleDayClick = day => {
    if (from && to && day >= from && day <= to) {
      handleResetClick();
      return;
    }
    setDateRangeIsInvalid(false);
    if (isSelectingFirstDay(from, to, day)) {
      setFrom(day);
    } else {
      setTo(day);
      setEnteredTo(day);
    }
  };

  const handleDayMouseEnter = day => {
    if (!isSelectingFirstDay(from, to, day)) {
      setEnteredTo(day);
    }
  };
  const dateRangeValidation = (): JSX.Element => {
    const nonSelected = <p style={{ color: 'red' }}>Please select the starting date and the ending date!</p>;
    const startSelected = <strong>Please select the starting day.</strong>;
    const endSelected = <strong>Please select the deadline.</strong>;
    if (isNull(currentTask)) {
      if (dateRangeIsInvalid) {
        return nonSelected;
      }
      if (!from && !to) {
        return startSelected;
      }
      if (from && !to) {
        return endSelected;
      }
    } else {
      if (dateRangeIsInvalid) {
        return nonSelected;
      }
    }
  };
  const handleResetClick = () => {
    setInitialState();
  };
  const modifiers = { start: from, end: enteredTo };
  const disabledDays = { before: from };
  const selectedDays = [from, { from, to: enteredTo }];
  return (
    <div>
      <DayPicker
        className="Range"
        numberOfMonths={2}
        fromMonth={from}
        selectedDays={selectedDays}
        disabledDays={disabledDays}
        modifiers={modifiers}
        onDayClick={handleDayClick}
        onDayMouseEnter={handleDayMouseEnter}
      />
      <div style={{ textAlign: 'center' }}>
        {dateRangeValidation()}
        {assignFrom() &&
          assignTo() &&
          `From ${assignFrom().toLocaleDateString()} To
                ${assignTo().toLocaleDateString()}`}{' '}
        {from && to && (
          <Button size="sm" onClick={handleResetClick} color="link">
            Reset
          </Button>
        )}
      </div>
      <Helmet>
        <style>{`
  .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Range .DayPicker-Day {
    border-radius: 0 !important;
  }
`}</style>
      </Helmet>
    </div>
  );
};

export default DateRange;
