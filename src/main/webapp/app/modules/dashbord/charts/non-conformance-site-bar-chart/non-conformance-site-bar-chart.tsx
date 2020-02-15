import React, { Fragment } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { ISite } from 'app/shared/model/site.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { Status } from 'app/shared/model/enumerations/status.model';
import nonConformaceCharts from '../../non-conformace-charts';

interface ISiteBarData {
  site: string;
  Incomplete: number;
  IncompleteColor: string;
  Complete: number;
  CompleteColor: string;
}

interface ISitePieChartProps {
  internalNonConformaces: IInternalNonConformance[];
  allNonConformaces: INonConformanceDetails[];
  sites: ISite[];
}
const responsiveSitePieChart = (props: ISitePieChartProps) => {
  const { internalNonConformaces, allNonConformaces, sites } = props;
  const nonconformanceSitePieData = (): ISiteBarData[] => {
    const siteBarDate: ISiteBarData[] = [];
    const sitesCompleted: Array<{ site: string; status: Status }> = [];
    internalNonConformaces.forEach(internalNonConformace => {
      const parentNC = allNonConformaces.filter(nonConformace => nonConformace.id === internalNonConformace.nonconformanceDetailsId)[0];
      const parentStatus = parentNC ? (parentNC.status === Status.COMPLETE ? Status.COMPLETE : Status.INCOMPLETE) : Status.INCOMPLETE;
      sitesCompleted.push({
        site: internalNonConformace.sites[0].site,
        status: parentStatus
      });
    });
    sites.forEach(site => {
      const siteCountIncomplete = sitesCompleted.filter(
        siteCompleted => siteCompleted.site === site.site && siteCompleted.status === Status.COMPLETE
      ).length;
      const siteCountComplete = sitesCompleted.filter(
        siteCompleted => siteCompleted.site === site.site && siteCompleted.status === Status.INCOMPLETE
      ).length;
      siteBarDate.push({
        site: site.site,
        Complete: siteCountComplete,
        CompleteColor: 'hsl(235, 70%, 50%)',
        Incomplete: siteCountIncomplete,
        IncompleteColor: 'hsl(235, 70%, 50%)'
      });
    });
    return siteBarDate;
  };
  return (
    <Fragment>
      <h5>
        <strong>Internal Non-Conformance Status by Location</strong>
      </h5>
      <div style={{ height: '400px' }}>
        <ResponsiveBar
          data={nonconformanceSitePieData()}
          keys={['Complete', 'Incomplete']}
          indexBy="site"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'dark2' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Sites',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Non-Conformances',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </Fragment>
  );
};
export default responsiveSitePieChart;
