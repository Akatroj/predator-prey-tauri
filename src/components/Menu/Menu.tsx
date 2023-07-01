import { InputSwitch } from 'primereact/inputswitch';

import styles from './Menu.module.scss';
import { useConfigStore } from '@/store';

import { useForm, Controller } from 'react-hook-form';

type FormProps = {
  startingPrey: number;
  seed: number;
};

type Props = {
  restart: (config: Config) => void;
};

export const Menu = (props: Props) => {
  const running = useConfigStore(state => state.running);

  const setRunning = useConfigStore(state => state.setRunning);

  const { control, handleSubmit, register } = useForm<FormProps>();

  const dupa = handleSubmit(({ startingPrey, seed }) => {
    console.log(startingPrey, seed);
  });
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <span>Dynamic settings - changes applied immediately</span>
        <label>
          <InputSwitch
            checked={running}
            onChange={() => setRunning(!running)}
            title="Simulation running"
          />
          Simulation running
        </label>
      </div>
      <form className={styles.form} onSubmit={dupa}>
        <span>Static settings - changes require restarting simulation to take effect</span>
        <label>
          <input type="number" {...register('startingPrey')} />
          Starting prey
        </label>
        <label>
          <input type="number" {...register('seed')} />
          Seed
        </label>
        <select>
          <option />
        </select>
        <button type="submit">Restart</button>
      </form>
    </div>
  );
};

export default Menu;
