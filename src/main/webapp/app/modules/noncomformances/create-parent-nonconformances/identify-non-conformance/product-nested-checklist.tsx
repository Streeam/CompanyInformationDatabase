import React, { Fragment } from 'react';
// tslint:disable
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
// tslint:enable
import { removeDuplicates } from 'app/shared/util/general-utils';
import { IRouting } from 'app/shared/model/routing.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { updateEntity as updateNonconformance } from '../../../../entities/non-conformance-details/non-conformance-details.reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

export const NestedList = props => {
  const classes = useStyles(props);
  const {
    productRouting,
    setProductRouting,
    products,
    setProducts,
    routings,
    setRoutings,
    incompleteNonConformance,
    nonconformanceUpdateing,
    productSeletedValidation,
    setProductSeletedValidation
  } = props;

  const handleToggle = (value: number) => () => {
    !products ? setProducts([]) : setProducts(products);
    const partNumber = productRouting[value][0];
    const routingName = productRouting[value][1];
    const isChild = productRouting[value][2];
    const isSelected = productRouting[value][3];
    const newProductRouting = [...productRouting];
    newProductRouting[value] = [partNumber, routingName, isChild, !isSelected];
    newProductRouting.filter(value1 => value1[1] === routingName).forEach(value2 => (value2[3] = !isSelected));
    setProductRouting(newProductRouting);
    const allUniqueRoutings: IRouting[] = [];
    products.forEach(product => {
      removeDuplicates(product.routings, 'resourceName').forEach(routing => {
        allUniqueRoutings.push(routing);
      });
    });
    if (isSelected) {
      const selectedRoutings: IRouting[] = routings.filter(routing => routing.resourceName !== routingName);
      setRoutings(selectedRoutings);
      const nonconformanceDefaultEntity: INonConformanceDetails = {
        ...incompleteNonConformance,
        routings: selectedRoutings ? selectedRoutings : []
      };
      props.updateNonconformance(nonconformanceDefaultEntity);
    } else {
      const unselectedRoutings: IRouting[] = routings.concat(allUniqueRoutings.filter(routing => routing.resourceName === routingName));
      setRoutings(unselectedRoutings);
      const nonconformanceDefaultEntity: INonConformanceDetails = {
        ...incompleteNonConformance,
        routings: unselectedRoutings ? unselectedRoutings : []
      };
      props.updateNonconformance(nonconformanceDefaultEntity);
    }
  };
  return (
    <Card>
      <List
        dense
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Products and Routing
          </ListSubheader>
        }
        className={classes.root}
      >
        {productRouting && productRouting.length > 0
          ? productRouting.map((product, index) => (
              <div key={index}>
                {product[2] && (
                  <ListItem>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={product[0]} />
                  </ListItem>
                )}
                {product[1] && (
                  <ListItem button className={classes.nested} onClick={handleToggle(index)}>
                    <ListItemIcon>
                      <Checkbox
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                        edge="start"
                        checked={product[3] === true}
                        tabIndex={-1}
                        disabled={nonconformanceUpdateing}
                      />
                    </ListItemIcon>
                    <ListItemText primary={product[1]} />
                  </ListItem>
                )}
              </div>
            ))
          : null}
      </List>
      {productSeletedValidation && <p style={{ color: 'red', padding: '5px' }}>You need to select a product!</p>}
    </Card>
  );
};

const mapStateToProps = ({ nonConformanceDetails }: IRootState) => ({
  incompleteNonConformance: nonConformanceDetails.entity,
  nonconformanceUpdateing: nonConformanceDetails.loading || nonConformanceDetails.updating
});

const mapDispatchToProps = { updateNonconformance };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NestedList);
