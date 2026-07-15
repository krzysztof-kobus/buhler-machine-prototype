import { MachineState } from './machine.model';

export interface MachineDetail {
  id: string;
  name: string;
  state: MachineState;
  order: number;
  notes: string | null;
}
