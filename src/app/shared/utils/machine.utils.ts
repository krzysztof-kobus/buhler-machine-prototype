import { MachineState } from '../../core/models/machine.model';

export function stateIcon(state: MachineState | undefined): string {
  switch (state) {
    case 'running': return 'check_circle';
    case 'alarm':   return 'error';
    case 'warning': return 'warning';
    default:        return '';
  }
}

export function stateColor(state: MachineState | undefined): string {
  switch (state) {
    case 'running': return '#43a047';
    case 'alarm':   return '#e53935';
    case 'warning': return '#fb8c00';
    default:        return '';
  }
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
