import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
interface IRejectionCodePieProps {
  nonConformances: INonConformanceDetails[];
}
const responsiveProgressPie = (props: IRejectionCodePieProps) => {
  const { nonConformances } = props;

  const nonconformanceProgressDate = (): Array<{ id: string; lable: string; value: number; color: string }> => {
    const progressComplete: number =
      nonConformances &&
      nonConformances.length > 0 &&
      nonConformances.map(item => item.progress).reduce((a, b) => a + b, 0) / nonConformances.length;

    const progressIncomplete: number = 100 - progressComplete;
    const progressData: Array<{ id: string; lable: string; value: number; color: string }> = [
      {
        id: 'Complete',
        lable: 'Complete',
        value: progressComplete,
        color: '#1f78b4'
      },
      {
        id: 'Incomplete',
        lable: 'Incomplete',
        value: progressIncomplete,
        color: '#d73027'
      }
    ];
    return progressData;
  };

  return (
    <ResponsivePie
      data={nonconformanceProgressDate()}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: 'dark2' }}
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
      // tslint:disable
      tooltipFormat={v => `${v.toFixed(2)}%`}
      sliceLabel={v => `${v.value.toFixed(2)}%`}
      // tslint:enable
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

export default responsiveProgressPie;
