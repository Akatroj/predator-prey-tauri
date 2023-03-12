import Graph from '@/components/Graph';
import Menu from '@/components/Menu';
import SimulationMap from '@/components/SimulationMap';

import styles from './Layout.module.scss';

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <SimulationMap />
        <Graph />
      </div>
      <Menu />
    </div>
  );
};

export default Layout;
