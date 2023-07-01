import SimulationWorker from '@/workers/simulation.worker?worker';
import { useEffect, useState } from 'react';

export function useSimulationWorker(onMessage: (message: any) => void) {
  const [ready, setReady] = useState(false);
  const [worker, setWorker] = useState<Worker>();

  useEffect(() => {
    const worker = new SimulationWorker();
    setWorker(worker);
    worker.onmessage = ev => {
      if (ev.data.type === 'ready') setReady(true);
    };
    worker.postMessage({ type: 'init' });

    return () => {
      worker.terminate();
      setReady(false);
    };
  }, []);

  useEffect(() => {
    if (!ready || !worker) return;
    worker.onmessage = onMessage;
  }, [ready, worker]);

  return [worker, ready] as const;
}
