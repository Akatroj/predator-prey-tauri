import { useCallback, useEffect, useRef, useState } from 'react';

import Graph from '@/components/Graph';
import Menu from '@/components/Menu';
import SimulationMapComponent from '@/components/SimulationMap';
import type { Config, SimulationMap } from '@/types';

import styles from './Layout.module.scss';
import { useConfigStore } from '@/store';
import { useSimulationWorker } from '@/hooks/useServiceWorker';

import { useInterval } from 'usehooks-ts';
import { round } from 'lodash-es';

type ChartData = {
  labels: number[];
  predators: number[];
  prey: number[];
};

let i = 0;

const Layout = () => {
  const map = useRef<SimulationMap>();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    predators: [],
    prey: [],
  });

  const running = useConfigStore(state => state.running);

  const onMessage = useCallback((event: any) => {
    if (event.data.type === 'frame') {
      const [array, [grass, predators, prey], currentStep] = event.data.payload;

      map.current = array;
      setChartData(prev => {
        // performance > immutability
        prev.labels.push(currentStep);
        // prev.predators.push(predators);
        // prev.prey.push(prey);

        prev.predators.push(100 * Math.abs(Math.sin(i)));
        prev.prey.push(100 * Math.abs(Math.cos(i)));

        i += 0.001;

        return {
          ...prev,
        };
      });
    }
  }, []);

  const [worker, ready] = useSimulationWorker(onMessage);

  useInterval(() => {
    if (!ready || !running) return;
    worker?.postMessage({ type: 'step' });
  }, 30);

  const restart = useCallback(
    (config: Config) => {
      worker?.postMessage({ type: 'restart', payload: config });
    },
    [worker],
  );

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        {ready ? <SimulationMapComponent map={map} /> : <span>Loading...</span>}
        <Graph
          labels={chartData.labels}
          predators={chartData.predators}
          prey={chartData.prey}
        />
      </div>
      <Menu restart={restart} />
    </div>
  );
};

export default Layout;
