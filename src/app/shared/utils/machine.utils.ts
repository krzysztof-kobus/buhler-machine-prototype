import { MachineState } from '../../core/models/machine.model';
import { STATE_ICONS } from '../../core/constants/state-icons.map';

export function stateIcon(state: MachineState | undefined): string {
  return state ? (STATE_ICONS[state] ?? '') : '';
}

const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export function formatDateTime(date: Date, lang: string): string {
  return date.toLocaleString(lang, DATE_TIME_OPTIONS);
}
