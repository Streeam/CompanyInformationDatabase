import React, { useEffect, CSSProperties, HTMLAttributes, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Select from 'react-select';
// tslint:disable
import { createStyles, emphasize, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { ValueType } from 'react-select/src/types';
import { Omit } from '@material-ui/types';
import { ITask } from 'app/shared/model/task.model';
// tslint:enable
import { getAllEntities as getEmployees } from '../../../../entities/employee/employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 'auto',
      minWidth: 290
    },
    input: {
      display: 'flex',
      padding: 0,
      height: 'auto'
    },
    valueContainer: {
      height: '45px',
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden'
    },
    chip: {
      margin: theme.spacing(0.5, 0.25)
    },
    chipFocused: {
      backgroundColor: emphasize(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08)
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2)
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      bottom: 6,
      fontSize: 16
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing(1)
    }
  })
);

function NoOptionsMessage(props: NoticeProps<IOptionType>) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

type InputComponentProps = Pick<BaseTextFieldProps, 'inputRef'> & HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
  return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<IOptionType>) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      variant="outlined"
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props: OptionProps<IOptionType>) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

type MuiPlaceholderProps = Omit<PlaceholderProps<IOptionType>, 'innerProps'> & Partial<Pick<PlaceholderProps<IOptionType>, 'innerProps'>>;
function Placeholder(props: MuiPlaceholderProps) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer(props: ValueContainerProps<IOptionType>) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props: MultiValueProps<IOptionType>) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      variant="outlined"
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props: MenuProps<IOptionType>) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer
};

interface ISelectMultipleEmployees extends StateProps, DispatchProps {
  selectedEmployees: IEmployee[];
  setSelectedEmployees: Function;
  saveEmployees: Function;
}
interface IOptionType {
  label: JSX.Element;
  value: number;
}

export const selectMultipleEmployees = (props: ISelectMultipleEmployees) => {
  const { employees, selectedEmployees, setSelectedEmployees, saveEmployees } = props;

  useEffect(() => {
    if (isArrayEmpty(employees)) {
      props.getEmployees();
    }
  }, []);
  const classes = useStyles(props);
  const theme = useTheme();
  const [multiple, setMultiple] = React.useState<ValueType<IOptionType>>(null);

  const convertEmployeeWithIcon = (employeeToConvert: IEmployee) => {
    return employeeToConvert
      ? {
          value: employeeToConvert.id,
          label: (
            <Fragment>
              {employeeToConvert.image && employeeToConvert.imageContentType ? (
                <img
                  style={{ maxHeight: '25px', padding: '0 5px 0 0' }}
                  src={`data:${employeeToConvert.imageContentType};base64,${employeeToConvert.image}`}
                />
              ) : (
                <img style={{ maxHeight: '25px', padding: '0 5px 0 0' }} src="content/images/default_profile_icon.png" />
              )}
              {employeeToConvert.user.firstName && employeeToConvert.user.lastName
                ? employeeToConvert.user.firstName + ' ' + employeeToConvert.user.lastName
                : employeeToConvert.user.login}
            </Fragment>
          )
        }
      : multiple;
  };
  const suggestions: IOptionType[] =
    employees && employees.length > 0 ? employees.map(employeeValue => convertEmployeeWithIcon(employeeValue)) : [];

  const existingMultiple: IOptionType[] =
    selectedEmployees && selectedEmployees.length > 0
      ? selectedEmployees.map(employeeValue => convertEmployeeWithIcon(employeeValue))
      : multiple;

  const handleChangeMultiple = (value: ValueType<IOptionType>) => {
    const selectedEmployeesToSave: IEmployee[] = [];
    if (value) {
      employees.forEach(selectedEmployee =>
        value.forEach(element => {
          if (selectedEmployee.id === element.value) {
            selectedEmployeesToSave.push(selectedEmployee);
          }
        })
      );
    }
    setSelectedEmployees(selectedEmployeesToSave);
    saveEmployees(selectedEmployeesToSave);
    setMultiple(value);
  };

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  };

  return (
    <NoSsr>
      <div className={classes.divider} />
      <Select
        classes={classes}
        styles={selectStyles}
        inputId="react-select-multiple"
        TextFieldProps={{
          label: 'Employees',
          InputLabelProps: {
            htmlFor: 'react-select-multiple',
            shrink: true
          }
        }}
        placeholder="Select multiple employees"
        options={suggestions}
        components={components}
        value={existingMultiple}
        onChange={handleChangeMultiple}
        isMulti
      />
    </NoSsr>
  );
};

const mapStateToProps = ({ employee }: IRootState) => ({
  employees: employee.companysEntities
});

const mapDispatchToProps = { getEmployees };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(selectMultipleEmployees);
