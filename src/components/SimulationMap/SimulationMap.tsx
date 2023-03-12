import { useState, useTransition } from 'react';
import { listen } from '@tauri-apps/api/event';

import styles from './SimulationMap.module.scss';
import { useAsyncEffect } from 'use-async-effect';

type Props = {};

const SimulationMap = (props: Props) => {
  const [date, setDate] = useState('');
  const [isPending, startTransition] = useTransition();

  useAsyncEffect(async () => {
    const unsubscribe = await listen<string>('python', event => {
      startTransition(() => {
        setDate(event.payload);
      });
    });

    return unsubscribe;
  }, []);

  return (
    <div className={styles.container}>
      Map
      <div>Date from python: {date}</div>
    </div>
  );
};

export default SimulationMap;
