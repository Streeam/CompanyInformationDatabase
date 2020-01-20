import React, { useEffect, CSSProperties, HTMLAttributes, useState } from 'react';
import { connect } from 'react-redux';
// tslint:disable
import CreatableSelect from 'react-select/creatable';
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
import { IRouting } from 'app/shared/model/routing.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { IRootState } from 'app/shared/reducers';

interface ISelectRoutingsProps extends StateProps, DispatchProps {
  routings: string[];
  routing: string;
  setRouting: Function;
  setNoRoutingSelected: Function;
  noRoutingSelected: boolean;
}
interface IOptionType {
  value: number;
  label: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 'auto',
      padding: '0 0 3px 0',
      margin: '5p10pxx'
    },
    input: {
      display: 'flex',
      padding: 3,
      height: 'auto'
    },
    valueContainer: {
      height: '50px',
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
      padding: 4
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2)
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: 'absolute',
      padding: 4,
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

export const selectSingleRouting = (props: ISelectRoutingsProps) => {
  const { routings, routing, setRouting, setNoRoutingSelected, noRoutingSelected, allRoutingsEntities } = props;
  useEffect(() => {}, []);
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
        error={noRoutingSelected}
        variant="outlined"
        helperText={noRoutingSelected && 'You must select a routing.'}
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
    setNoRoutingSelected(false);
    setRouting(routings.filter(routingElement => routingElement === value.value)[0]);
  };
  const getNextUniqueRoutingId = (allRoutings: IRouting[]): number => {
    const listOfRoutingsIds: number[] = !isArrayEmpty(allRoutings) ? allRoutings.map(item => Number(item.uniqueIdentifier)) : [];
    const id = !isArrayEmpty(allRoutings) ? Math.max(...listOfRoutingsIds) + 1 : 1;
    return id;
  };
  const mapRoutings = (routingString: string) => {
    return routingString
      ? {
          value: routingString,
          label: routingString
        }
      : single;
  };
  const suggestions: IOptionType[] = routings && routings.length > 0 ? routings.map(routingValue => mapRoutings(routingValue)) : [];

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  };
  let createSingle: string;
  const handleInputChange = (inputValue: any, actionMeta: any) => {
    if (inputValue !== '') {
      createSingle = inputValue;
    }
    if (createSingle && actionMeta.action === 'set-value') {
      setSingle({ value: createSingle, label: createSingle });
      setNoRoutingSelected(false);
      // setRouting({})
    }
  };
  // console.log(getNextUniqueRoutingId([...allRoutingsEntities]));
  return (
    <div className={classes.root}>
      <NoSsr>
        <CreatableSelect
          isClearable
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: 'Routing',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true
            }
          }}
          options={suggestions}
          components={components}
          value={mapRoutings(routing)}
          onChange={handleChangeSingle}
          onInputChange={handleInputChange}
        />
      </NoSsr>
    </div>
  );
};

const mapStateToProps = ({ routing }: IRootState) => ({
  allRoutingsEntities: routing.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(selectSingleRouting);
