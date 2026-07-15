import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MachineState } from '../../core/models/machine.model';
import { stateIcon } from '../utils/machine.utils';

@Component({
  selector: 'app-machine-button',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [class]="btnClass()" [routerLink]="['/machine', id()]" [title]="name()">
      <span class="machine-btn__state-icon material-symbols-outlined">{{ stateIcon(state()) }}</span>
      {{ name() }}
    </button>
  `,
  styles: [
    `
      @use 'styles/variables' as *;

      .machine-btn {
        position: relative;
        width: 120px;
        height: 120px;
        border: 2px solid transparent;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        cursor: pointer;
        background: $color-bg;
        color: $color-text;
        padding: 0 $spacing-md;
        padding-right: $spacing-lg;
        letter-spacing: $letter-spacing-wide;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: filter 0.15s ease;

        &:hover {
          filter: brightness(0.9);
        }
      }

      .machine-btn__state-icon {
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: $font-size-xxl;
        color: inherit;
      }

      .machine-btn--small {
        width: 120px;
        height: 44px;

        .machine-btn__state-icon {
          font-size: $font-size-lg;
        }
      }

      .machine-btn--running {
        background-color: $color-running;
        color: $color-text;

        .machine-btn__state-icon {
          color: $color-success;
        }
      }
      .machine-btn--alarm {
        background-color: $color-alarm;
        color: $color-text-white;
      }
      .machine-btn--warning {
        background-color: $color-warning;
        color: $color-text-white;
      }
    `,
  ],
})
export class MachineButtonComponent {
  readonly id = input.required<string>();
  readonly name = input.required<string>();
  readonly state = input.required<MachineState>();
  readonly small = input(false);

  protected readonly stateIcon = stateIcon;

  protected readonly btnClass = computed(() => {
    const classes = ['machine-btn', `machine-btn--${this.state()}`];
    if (this.small()) classes.push('machine-btn--small');
    return classes.join(' ');
  });
}
