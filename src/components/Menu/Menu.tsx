import { InputSwitch } from 'primereact/inputswitch';

import styles from './Menu.module.scss';
import { useConfigStore } from '@/store';

import { useForm, Controller } from 'react-hook-form';

import { Form } from 'react-bootstrap';
import { Config } from '@/types';

type FormProps = {
  startingPrey: number;
  startingPredators: number;
  startingGrass: number;
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
      <Form className={styles.form} onSubmit={dupa}>
        <span>Static settings - changes require restarting simulation to take effect</span>
        <Form.Group>
          <Form.Label>Seed</Form.Label>
          <Controller
            control={control}
            name="seed"
            render={({ field }) => <Form.Control type="number" {...field} />}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Starting prey</Form.Label>
          <Controller
            control={control}
            name="startingPrey"
            render={({ field }) => <Form.Control type="number" {...field} />}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Starting predators</Form.Label>
          <Controller
            control={control}
            name="startingPredators"
            render={({ field }) => <Form.Control type="number" {...field} />}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Starting grass</Form.Label>
          <Controller
            control={control}
            name="startingGrass"
            render={({ field }) => <Form.Control type="number" {...field} />}
          />
        </Form.Group>
        <button type="submit">Restart</button>
      </Form>
    </div>
  );
};

export default Menu;
