export type MachineState = 'running' | 'alarm' | 'warning';

export interface Machine {
  id: string;
  name: string;
  state: MachineState;
  icon: string;
}
