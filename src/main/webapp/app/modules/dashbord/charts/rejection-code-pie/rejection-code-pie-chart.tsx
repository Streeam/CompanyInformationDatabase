import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { isNull } from 'util';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';

interface IRejectionCodePieProps {
  nonConformances: INonConformanceDetails[];
}
const responsiveRejectionPie = (props: IRejectionCodePieProps) => {
  const { nonConformances } = props;

  const nonconformanceReasons = (): Array<{ id: string; lable: string; value: number; color: string }> => {
    const rejectionCodeList: string[] = [
      ...new Set(nonConformances.filter(item => !isNull(item.nonConformanceType)).map(value => value.nonConformanceType.rejectionCode))
    ];
    const rejectionCode: Array<{ code: string; count: number }> = rejectionCodeList.map(item => {
      return {
        code: item,
        count: nonConformances.filter(value => !isNull(value.nonConformanceType) && value.nonConformanceType.rejectionCode === item).length
      };
    });
    const rejectionCodeData: Array<{ id: string; lable: string; value: number; color: string }> = rejectionCode.map(item => {
      return { id: item.code, lable: item.code, value: item.count, color: 'hsl(85, 40%, 50%)' };
    });
    return rejectionCodeData;
  };

  return (
    <ResponsivePie
      data={nonconformanceReasons()}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  );
};
export default responsiveRejectionPie;
