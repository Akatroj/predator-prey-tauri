import { useCallback, useEffect, useRef, useState } from 'react';

import Graph from '@/components/Graph';
import Menu from '@/components/Menu';
import SimulationMapComponent from '@/components/SimulationMap';
import type { Config, SimulationMap } from '@/types';

import styles from './Layout.module.scss';
import { useConfigStore } from '@/store';
import { useSimulationWorker } from '@/hooks/useServiceWorker';

import { useInterval } from 'usehooks-ts';
import { INTERVAL_DURATION_MS } from '@/utils';
import type { GraphRefType } from '@/components/Graph/Graph';

export type SimulationData = {
  predators: number[];
  prey: number[];
};

export type GraphData = {
  labels: number[];
  population: SimulationData;
  energy: SimulationData;
};

// let i = 0;

const Layout = () => {
  const i = useRef<number>(0);

  const map = useRef<SimulationMap>();
  const graph = useRef<GraphRefType>(null);
  const [chartData, setChartData] = useState<GraphData>({
    labels: [],
    population: {
      predators: [],
      prey: [],
    },
    energy: {
      predators: [],
      prey: [],
    },
  });

  const running = useConfigStore(state => state.running);

  const onMessage = useCallback((event: any) => {
    if (event.data.type === 'frame') {
      const [array, [grass, predators, prey], currentStep, , [predatorEnergy, preyEnergy]] =
        event.data.payload;

      map.current = array;
      setChartData(prev => {
        // performance > immutability
        prev.labels.push(currentStep);
        prev.population.predators.push(predators);
        prev.population.prey.push(prey);
        prev.energy.predators.push(predatorEnergy);
        prev.energy.prey.push(preyEnergy);

        return {
          ...prev,
        };
      });
    }
  }, []);

  const [worker, ready] = useSimulationWorker(onMessage);

  useInterval(() => {
    if (!ready || !running) return;
    if (i.current === 500) return;

    worker?.postMessage({ type: 'step' });

    i.current++;
  }, INTERVAL_DURATION_MS);

  const restart = useCallback(
    (config: Config) => {
      worker?.postMessage({ type: 'restart', payload: config });
    },
    [worker],
  );

  const saveGraph = useCallback(() => {
    graph.current?.save();
  }, []);

  const showMap = useConfigStore(state => state.showMap);

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        {!showMap ? (
          <div style={{ height: document.body.clientHeight, aspectRatio: 1 }}></div>
        ) : ready ? (
          <SimulationMapComponent map={map} />
        ) : (
          <span>Loading...</span>
        )}
        <Graph
          ref={graph}
          labels={chartData.labels}
          population={chartData.population}
          energy={chartData.energy}
        />
      </div>
      <Menu restart={restart} save={saveGraph} />
    </div>
  );
};

export default Layout;
