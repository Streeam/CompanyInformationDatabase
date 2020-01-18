import React, { Fragment, useState } from 'react';
import LineChart from './expenses-line-chart';
import { IExtraRoutings } from 'app/shared/model/extra-routings.model';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import nonConformaceCharts from '../../non-conformace-charts';
import { IProduct } from 'app/shared/model/product.model';
import { IRouting } from 'app/shared/model/routing.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { IBom } from 'app/shared/model/bom.model';
import { months } from 'app/shared/util/date-utils';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';

interface IExpenseData {
  id: string;
  color: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}

interface IExpensesLineChartProps {
  allNonConformaces: INonConformanceDetails[];
  allInternalNonConformaces: IInternalNonConformance[];
  allExtraRoutings: IExtraRoutings[];
  allExtraBoms: IExtraBoms[];
  allProducts: IProduct[];
  allCustomerNonconformances: IClientNonConformance[];
  allAfterSaleExpenses: IAfterSaleExpenses[];
}

const ExpensesLineChart = (props: IExpensesLineChartProps) => {
  const {
    allNonConformaces,
    allInternalNonConformaces,
    allExtraBoms,
    allExtraRoutings,
    allProducts,
    allCustomerNonconformances,
    allAfterSaleExpenses
  } = props;

  const overheadRateInMinutes = (internalNonConformance: IInternalNonConformance): number =>
    !isEmpty(internalNonConformance) ? internalNonConformance.labourRate / 60 : 0;
  let internalTotalCost = 0;
  let customerTotalCost = 0;
  const totalCostRoutings = (product: IProduct, internalNonConformance: IInternalNonConformance): number => {
    let total = 0;
    internalNonConformance &&
      internalNonConformance.action === NonconformanceAction.SCRAP &&
      product &&
      product.routings.forEach(routingValue => (total += overheadRateInMinutes(internalNonConformance) * routingValue.unitRunTime));
    return Number(total.toFixed(2));
  };
  const getPrice = (bom: IBom): number => {
    const linkedProduct: IProduct = allProducts ? allProducts.filter(product => product.partNumber === bom.childPartNumber)[0] : null;
    return linkedProduct ? Number(linkedProduct.standardUnitMaterialCost.toFixed(2)) : 0.0;
  };

  const extraRoutings = (childNonConformance: IInternalNonConformance | IClientNonConformance): IExtraRoutings[] => {
    if (!isArrayEmpty(allExtraRoutings)) {
      if ('action' in childNonConformance) {
        return allExtraRoutings.filter(routing => routing.internalNonConformanceId === childNonConformance.id);
      } else {
        return allExtraRoutings.filter(routing => routing.customerNonConformaceId === childNonConformance.id);
      }
    } else {
      return [];
    }
  };
  const extraExpensesTotalCost = (customerNC: IClientNonConformance): number =>
    !isArrayEmpty(allAfterSaleExpenses)
      ? allAfterSaleExpenses.filter(item => item.customerNonConformanceId === customerNC.id).reduce((a, b) => a + (b['cost'] || 0), 0)
      : 0;

  const extraBoms = (childNonConformance: IInternalNonConformance | IClientNonConformance): IExtraBoms[] => {
    if (!isArrayEmpty(allExtraBoms)) {
      if ('action' in childNonConformance) {
        return allExtraBoms.filter(
          bom => bom.internalNonconformanceId === childNonConformance.id && bom.nonconformanceAction === NonconformanceAction.REWORK
        );
      } else {
        return allExtraBoms.filter(bom => bom.customerNonConformaceId === childNonConformance.id);
      }
    } else {
      return [];
    }
  };
  const extraRoutingSum = (overhead: number, unitRunTime: number): string => {
    const overheadInMinutes = overhead / 60;
    const routingPrice = (overheadInMinutes * unitRunTime).toFixed(2);
    return routingPrice;
  };
  const totalExtraRoutingsCost = (childNonConformance: IInternalNonConformance | IClientNonConformance): number => {
    let totalExtraRoutings = 0;
    extraRoutings(childNonConformance).forEach(item => {
      totalExtraRoutings += Number(extraRoutingSum(item.overhead, item.runtime));
    });
    return totalExtraRoutings;
  };
  const totalExtraBomsCost = (childNonConformance: IInternalNonConformance | IClientNonConformance): number => {
    let totalExtraMaterials = 0;
    extraBoms(childNonConformance).forEach(item => {
      totalExtraMaterials += Number(item.price) * Number(item.quantity);
    });
    return totalExtraMaterials;
  };
  const totalCostBoms = (product: IProduct, internalNonConformance: IInternalNonConformance): number => {
    let total = 0;
    internalNonConformance &&
      internalNonConformance.action === NonconformanceAction.SCRAP &&
      product &&
      product.boms.forEach(bom => (total += getPrice(bom) * bom.quantity));
    return Number(total.toFixed(2));
  };

  const routingsByMonthForInternalNonconformaces = (): IExpenseData[] => {
    const totalInternalMonthList: Array<{ x: string; y: number }> = [];
    const totalCustomerMonthList: Array<{ x: string; y: number }> = [];
    allNonConformaces.forEach(nonConformace => {
      !isArrayEmpty(allInternalNonConformaces) &&
        allInternalNonConformaces
          .filter(internalNonConformance => nonConformace.id === internalNonConformance.nonconformanceDetailsId)
          .forEach(item => {
            const extraRoutingsCost: number = totalExtraRoutingsCost(item);
            const extraBomsCost: number = totalExtraBomsCost(item);
            const rejectionDate: Date = new Date(item.rejectionDate.toString());
            const rejectionMonth: string = months[rejectionDate.getMonth()] + ' ' + rejectionDate.getFullYear();
            const product: IProduct = !isArrayEmpty(nonConformace.products) && nonConformace.products[0];
            const routingsCost = totalCostRoutings(product, item);
            const bomCost: number = totalCostBoms(product, item);

            const totalByMonth: { x: string; y: number } = {
              x: rejectionMonth,
              y: Number(((extraRoutingsCost + routingsCost + bomCost + extraBomsCost) * item.quantity).toFixed(2))
            };
            if (totalInternalMonthList.filter(value => value.x === rejectionMonth).length === 0) {
              totalInternalMonthList.push(totalByMonth);
            } else {
              const previousCost = totalInternalMonthList.filter(value1 => value1.x === rejectionMonth)[0].y;
              totalInternalMonthList.filter(value2 => value2.x === rejectionMonth)[0].y = Number(
                (previousCost + (extraRoutingsCost + routingsCost + bomCost + extraBomsCost) * item.quantity).toFixed(2)
              );
            }
          });
      !isArrayEmpty(allCustomerNonconformances) &&
        allCustomerNonconformances
          .filter(customerNonConformance => nonConformace.id === customerNonConformance.nonconformanceDetailsId)
          .forEach(item => {
            const extraRoutingsCost: number = totalExtraRoutingsCost(item);
            const extraBomsCost: number = totalExtraBomsCost(item);
            const extraExpensesCost: number = extraExpensesTotalCost(item);
            const rejectionDate: Date = new Date(item.rejectionDate.toString());
            const rejectionMonth: string = months[rejectionDate.getMonth()] + ' ' + rejectionDate.getFullYear();
            const totalByMonth: { x: string; y: number } = {
              x: rejectionMonth,
              y: Number(((extraRoutingsCost + extraBomsCost + extraExpensesCost) * item.quantity).toFixed(2))
            };
            if (totalCustomerMonthList.filter(value => value.x === rejectionMonth).length === 0) {
              totalCustomerMonthList.push(totalByMonth);
            } else {
              const previousCost = totalCustomerMonthList.filter(value1 => value1.x === rejectionMonth)[0].y;
              totalCustomerMonthList.filter(value2 => value2.x === rejectionMonth)[0].y = Number(
                (previousCost + (extraRoutingsCost + extraExpensesCost + extraBomsCost) * item.quantity).toFixed(2)
              );
            }
          });
    });
    totalInternalMonthList.forEach(item => (internalTotalCost += item.y));
    totalInternalMonthList.sort((a, b) => (new Date(a.x) > new Date(b.x) ? 1 : new Date(a.x) < new Date(b.x) ? -1 : 0));

    totalCustomerMonthList.forEach(item => (customerTotalCost += item.y));
    totalCustomerMonthList.sort((a, b) => (new Date(a.x) > new Date(b.x) ? 1 : new Date(a.x) < new Date(b.x) ? -1 : 0));

    const totalInternalDataCost: IExpenseData = { id: 'Internal', color: 'hsl(38, 70%, 50%)', data: totalInternalMonthList };
    const totalCustomerDataCost: IExpenseData = { id: 'Customer', color: 'hsl(38, 70%, 50%)', data: totalCustomerMonthList };
    return [totalCustomerDataCost, totalInternalDataCost];
  };

  const expensesDataList = routingsByMonthForInternalNonconformaces();
  return (
    <Fragment>
      <h5
        title={`Internal Non-Conformances Cost: £ ${internalTotalCost.toFixed(
          2
        )}\nCustomer Non-Conformances cost: £ ${customerTotalCost.toFixed(2)}`}
      >
        <strong>Monthly Non-Conformances Cost £ {(internalTotalCost + customerTotalCost).toFixed(2)}</strong>
      </h5>
      <div style={{ height: '400px' }}>
        <LineChart data={expensesDataList} />
      </div>
    </Fragment>
  );
};
export default ExpensesLineChart;
