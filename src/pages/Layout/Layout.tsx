import { round, sample } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

import Graph from '@/components/Graph';
import Menu from '@/components/Menu';
import SimulationMapComponent from '@/components/SimulationMap';
import type { MapEntity, SimulationMap } from '@/types';
import { init2DArray } from '@/utils';

import SimulationWorker from '../../workers/simulation.worker?worker';

import styles from './Layout.module.scss';

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

  useEffect(() => {
    const worker = new SimulationWorker();
    worker.postMessage('init');

    const interval = setInterval(() => worker.postMessage('step'), 30);

    worker.onmessage = event => {
      if (event.data.type === 'frame') {
        const [array, [grass, predators, prey], currentStep] = event.data.payload;

        map.current = array;
        setChartData(prev => {
          // performance > immutability
          prev.labels.push(currentStep);
          prev.predators.push(predators);
          prev.prey.push(prey);

          return {
            ...prev,
          };
        });
      }
    };
    return () => {
      clearInterval(interval);
      worker.terminate();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <SimulationMapComponent map={map} />
        <Graph
          labels={chartData.labels}
          predators={chartData.predators}
          prey={chartData.prey}
        />
      </div>
      <Menu />
    </div>
  );
};

export default Layout;
