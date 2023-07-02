import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Decimation,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
} from 'chart.js';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './styles.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  Colors,
  Decimation,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Legend,
  Title,
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
