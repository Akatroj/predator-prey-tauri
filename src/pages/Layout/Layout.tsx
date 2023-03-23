import { sample } from 'lodash-es';
import { useEffect, useRef } from 'react';

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

const Layout = () => {
  const map = useRef<SimulationMap>();

  useEffect(() => {
    const interval = setInterval(() => {
      // startTransition(() => {
      map.current = getMap();
      // setMap(getMap());
      // });
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <SimulationMapComponent map={map} />
        <Graph />
      </div>
      <Menu />
    </div>
  );
};

export default Layout;
