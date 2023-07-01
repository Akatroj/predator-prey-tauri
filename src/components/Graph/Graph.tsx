import type { ChartData } from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import styles from './Graph.module.scss';

type Props = {
  labels: number[];
  predators: number[];
  prey: number[];
};

// ChartData<'line', Data, 'sinx' | 'cosx'>
type Data = number[];
type Labels = number;

const Graph = ({ labels, predators, prey }: Props) => {
  const data = useMemo<ChartData<'line', Data, Labels>>(
    () => ({
      labels,
      datasets: [
        {
          label: 'predators',
          data: predators,
        },
        {
          label: 'prey',
          data: prey,
        },
      ],
    }),
    [labels, predators, prey],
  );

  return (
    <div className={styles.container} id={'xd'}>
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
