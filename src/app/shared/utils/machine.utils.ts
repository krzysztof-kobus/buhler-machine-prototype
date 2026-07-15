import { MachineState } from '../../core/models/machine.model';
import { STATE_ICONS } from '../../core/constants/state-icons.map';

export function stateIcon(state: MachineState | undefined): string {
  return state ? (STATE_ICONS[state] ?? '') : '';
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
