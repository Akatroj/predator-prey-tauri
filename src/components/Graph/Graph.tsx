import type { Chart, ChartData } from 'chart.js';
import {
  forwardRef,
  useMemo,
  useCallback,
  useState,
  useImperativeHandle,
  useRef,
} from 'react';
import { Line } from 'react-chartjs-2';
import type { GraphData } from '@/pages/Layout/Layout';

import styles from './Graph.module.scss';
import saveAs from 'file-saver';

type Props = GraphData;

type Data = number[];
type Labels = number;

export type GraphRefType = {
  save: () => void;
};

const Graph = forwardRef<GraphRefType, Props>(({ labels, population, energy }, ref) => {
  const ChartJSRef = useRef<Chart<'line', Data, Labels>>();

  useImperativeHandle(ref, () => ({
    save: () => {
      const image = ChartJSRef.current?.toBase64Image();
      if (!image) return;
      saveAs(image, 'graph.png');
    },
  }));

  const [mode, setMode] = useState<'population' | 'energy'>('population');

  const populationData = useMemo<ChartData<'line', Data, Labels>>(
    () => ({
      labels,
      datasets: [
        {
          label: 'predators',
          data: population.predators,
        },
        {
          label: 'prey',
          data: population.prey,
        },
      ],
    }),
    [labels, population.predators, population.prey],
  );

  const energyData = useMemo<ChartData<'line', Data, Labels>>(
    () => ({
      labels,
      datasets: [
        {
          label: 'predators',
          data: energy.predators,
        },
        {
          label: 'prey',
          data: energy.prey,
        },
      ],
    }),
    [labels, energy.predators, energy.prey],
  );

  const changeMode = useCallback(() => {
    setMode(prev => (prev === 'population' ? 'energy' : 'population'));
  }, []);

  return (
    <div className={styles.container} onClick={changeMode}>
      <Line
        ref={ChartJSRef}
        data={mode === 'population' ? populationData : energyData}
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
            title: {
              display: true,
              text: `Total ${mode === 'population' ? 'Population' : 'Energy'}`,
              color: 'black',
            },
          },
        }}
      />
    </div>
  );
});

export default Graph;
