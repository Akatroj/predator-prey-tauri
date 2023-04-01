import type { ChartData } from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import styles from './Graph.module.scss';

type Props = {
  labels: number[];
  sinX: number[];
  cosX: number[];
};

// ChartData<'line', Data, 'sinx' | 'cosx'>
type Data = number[];
type Labels = number;

const Graph = ({ labels, sinX, cosX }: Props) => {
  const data = useMemo<ChartData<'line', Data, Labels>>(
    () => ({
      labels,
      datasets: [
        {
          label: 'sin x',
          data: sinX,
        },
        {
          label: 'cos x',
          data: cosX,
        },
      ],
    }),
    [labels, sinX, cosX],
  );

  return (
    <div className={styles.container}>
      <Line
        data={data}
        options={{
          animation: false,
          elements: {
            point: {
              radius: 0,
            },
          },
          plugins: {
            decimation: {
              enabled: false,
              algorithm: 'lttb',
              samples: 50,
            },
          },
        }}
      />
    </div>
  );
};

export default Graph;
