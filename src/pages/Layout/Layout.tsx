import { round, sample } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

import Graph from '@/components/Graph';
import Menu from '@/components/Menu';
import SimulationMapComponent from '@/components/SimulationMap';
import type { MapEntity, SimulationMap } from '@/types';
import { init2DArray } from '@/utils';

import styles from './Layout.module.scss';

function getMap() {
  const size = 100;
  const possibleElems: MapEntity[] = ['', 'G', 'K', 'W'];

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return init2DArray(size, _ => sample(possibleElems)!);
}

type ChartData = {
  labels: number[];
  sinX: number[];
  cosX: number[];
};

let i = 0;

const Layout = () => {
  const map = useRef<SimulationMap>();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    sinX: [],
    cosX: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      map.current = getMap();
      setChartData(prev => {
        // performance > immutability
        prev.labels.push(round(i, 2));
        prev.sinX.push(Math.sin(i));
        prev.cosX.push(Math.cos(i));

        return {
          ...prev,
        };
      });
      i += 0.01;
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <SimulationMapComponent map={map} />
        <Graph labels={chartData.labels} sinX={chartData.sinX} cosX={chartData.cosX} />
      </div>
      <Menu />
    </div>
  );
};

export default Layout;
