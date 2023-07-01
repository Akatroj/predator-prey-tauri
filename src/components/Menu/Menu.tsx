import { InputSwitch } from 'primereact/inputswitch';
import { Knob } from 'primereact/knob';

import styles from './Menu.module.scss';
import { useConfigStore } from '@/store';

import { useForm, Controller } from 'react-hook-form';

import { Button, Form } from 'react-bootstrap';
import { Config } from '@/types';

type MaslovNeeds = 'eat' | 'reproduce' | 'move';

type FormProps = {
  startingPrey: number;
  startingPredators: number;
  startingGrass: number;
  energyToReproduce: number;
  energyToMove: number;
  energyFromGrass: number;
  priority: MaslovNeeds;
  seed: number;
};

type Props = {
  restart: (config: Config) => void;
  save: () => void;
};

export const Menu = ({ restart, save }: Props) => {
  const running = useConfigStore(state => state.running);
  const setShowGraph = useConfigStore(state => state.setShowGraph);
  const showGraph = useConfigStore(state => state.showGraph);
  const setShowMap = useConfigStore(state => state.setShowMap);
  const showMap = useConfigStore(state => state.showMap);

  const setRunning = useConfigStore(state => state.setRunning);

  const { control, handleSubmit, register } = useForm<FormProps>({
    defaultValues: {
      seed: 312,
      startingPrey: 100,
      startingPredators: 100,
      startingGrass: 100,
      energyToReproduce: 100,
      energyToMove: 100,
      energyFromGrass: 100,
      priority: 'eat',
    },
  });

  const dupa = handleSubmit(({ startingPrey, seed }) => {
    // TODO: send to worker
    console.log(startingPrey, seed);
  });

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <label className={styles.switch}>
          <InputSwitch
            checked={running}
            onChange={() => setRunning(!running)}
            title={`Simulation ${running ? 'running' : 'paused'}`}
          />
          Simulation running
        </label>
        <label className={styles.disable}>
          <InputSwitch checked={!showMap} onChange={() => setShowMap(!showMap)} />
          Hide map
        </label>
        <Button onClick={save}>Save</Button>
      </div>
      <Form className={styles.form} onSubmit={dupa}>
        <span>Changes require restarting simulation to take effect</span>
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
        <Form.Group>
          <Form.Label>Energy to reproduce</Form.Label>
          <Controller
            control={control}
            name="energyToReproduce"
            render={({ field }) => <Form.Control type="number" {...field} />}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Energy to move</Form.Label>
          <Controller
            control={control}
            name="energyToMove"
            render={({ field }) => <Form.Control type="number" {...field} />}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Energy from grass</Form.Label>
          <Controller
            control={control}
            name="energyFromGrass"
            render={({ field }) => <Form.Control type="number" {...field} />}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Behavioral priority</Form.Label>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Form.Control as="select" {...field}>
                <option value="eat">eat</option>
                <option value="reproduce">reproduce</option>
                <option value="move">move</option>
              </Form.Control>
            )}
          />
        </Form.Group>

        <button type="submit">Restart</button>
      </Form>
    </div>
  );
};

export default Menu;
