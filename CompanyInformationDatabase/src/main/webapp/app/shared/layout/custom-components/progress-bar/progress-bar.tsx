import React, { CSSProperties } from 'react';
// tslint:disable
import Grid from '@material-ui/core/Grid';
// tslint:enable
import './progress-bar.css';

interface IProgressBar {
  percentage: number;
  progressBarStyle?: CSSProperties;
}
const progressBar = (props: IProgressBar) => {
  const { percentage, progressBarStyle } = props;
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={7}>
        <div className="progress-bar" style={progressBarStyle}>
          <Filler percentage={percentage} />
        </div>
      </Grid>
      <Grid style={{ padding: '0 0 0 3px' }} item xs={12} sm={5}>
        {percentage}%
      </Grid>
    </Grid>
  );
};
export default progressBar;

const Filler = ({ percentage }) => <div className="filler" style={{ width: `${percentage}%` }} />;
