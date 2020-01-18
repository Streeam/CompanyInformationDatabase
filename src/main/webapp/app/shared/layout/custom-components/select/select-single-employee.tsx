import React, { useEffect, CSSProperties, HTMLAttributes, Fragment, useState } from 'react';
import { Card, ButtonGroup, Button } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Select from 'react-select';
// tslint:disable
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';
import { Omit } from '@material-ui/types';
// tslint:enable
import { getAllEntities as getEmployees } from '../../../../entities/employee/employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';

interface INonconformanceInternalCulpabilityProps extends StateProps, DispatchProps {
  employee: IEmployee;
  setEmployee: Function;
  setNoEmployeeSelected: Function;
  noEmployeeSelected: boolean;
}
interface IOptionType {
  value: number;
  label: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 'auto',
      padding: '0 0 0 5px'
    },
    input: {
      display: 'flex',
      padding: 1,
      height: '40px'
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
      padding: 3
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2)
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: 'absolute',
      padding: 6,
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
      height: theme.spacing(2)
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

function SingleValue(props: SingleValueProps<IOptionType>) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function Menu(props: MenuProps<IOptionType>) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

export const internalNonConformanceCulpability = (props: INonconformanceInternalCulpabilityProps) => {
  const { employee, setEmployee, employees, setNoEmployeeSelected, noEmployeeSelected, employeeLoading } = props;
  useEffect(() => {
    if (!employeeLoading && isArrayEmpty(employees)) {
      props.getEmployees();
    }
  }, []);
  // tslint:disable
  const Control = (props: ControlProps<IOptionType>) => {
    const {
      children,
      innerProps,
      innerRef,
      selectProps: { classes, TextFieldProps }
    } = props;
    // tslint:enable
    return (
      <TextField
        required
        fullWidth
        error={noEmployeeSelected}
        variant="outlined"
        helperText={noEmployeeSelected && 'You must select an employee.'}
        margin="dense"
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
  };
  const components = {
    Control,
    Menu,
    SingleValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    ValueContainer
  };

  const classes = useStyles(props);
  const theme = useTheme();
  const [single, setSingle] = useState<ValueType<IOptionType>>(null);

  const handleChangeSingle = (value: ValueType<IOptionType>) => {
    setSingle(value);
    setNoEmployeeSelected(false);
    setEmployee(employees.filter(employeeElement => employeeElement.id === value.value)[0]);
  };

  const convertEmployeeWithIcon = (employeeToConvert: IEmployee) => {
    return employeeToConvert && employeeToConvert.id
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
      : single;
  };
  const suggestions: IOptionType[] =
    employees && employees.length > 0 ? employees.map(employeeValue => convertEmployeeWithIcon(employeeValue)) : [];

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
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId={employee && employee.id + new Date().getTime().toString()}
          TextFieldProps={{
            label: 'Employee',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true
            }
          }}
          options={suggestions}
          components={components}
          value={convertEmployeeWithIcon(employee)}
          onChange={handleChangeSingle}
        />
      </NoSsr>
    </div>
  );
};

const mapStateToProps = ({ employee }: IRootState) => ({
  employees: employee.companysEntities,
  employeeLoading: employee.loading
});

const mapDispatchToProps = { getEmployees };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internalNonConformanceCulpability);
