import type { RefObject} from 'react';
import { useState } from 'react';

import { useRenderOnCanvas } from '@/hooks/useRenderOnCanvas';
import type { SimulationMap as SimulationMapType } from '@/types';

import styles from './SimulationMap.module.scss';

type Props = {
  map: RefObject<SimulationMapType | undefined>;
};

function SimulationMap({ map }: Props) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useRenderOnCanvas(container, map, 100);

  return <div className={styles.container} ref={setContainer}></div>;
}

export default SimulationMap;
