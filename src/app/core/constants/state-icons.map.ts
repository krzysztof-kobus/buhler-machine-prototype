import { MachineState } from '../models/machine.model';

export const STATE_ICONS: Record<MachineState, string> = {
  running: 'check_circle',
  alarm: 'error',
  warning: 'warning',
};
