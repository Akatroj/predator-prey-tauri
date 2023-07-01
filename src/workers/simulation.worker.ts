import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.mjs';

import 'https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.asm.js';
import type { PyProxy } from 'pyodide/ffi';

async function loadPython() {
  const src = fetch('/python.zip').then(data => data.arrayBuffer());
  const pyodide = await loadPyodide();
  await pyodide.loadPackage(['numpy']);
  pyodide.unpackArchive(await src, 'zip');
  const main = pyodide.pyimport('main');
  self.postMessage({ type: 'ready' });
  return main;
}

const pythonPromise = loadPython();

self.onmessage = async event => {
  const python = await pythonPromise;
  switch (event.data.type) {
    case 'init':
      python.init_simulation();
      break;
    case 'step':
      const frame: PyProxy = python.next_step();
      postMessage({
        type: 'frame',
        payload: frame.toJs(),
      });
      break;
    case 'restart':
      python.init_simulation(event.data.payload);
  }
};
