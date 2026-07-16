import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MachineState } from '../../core/models/machine.model';
import { MACHINE_ICONS } from '../../core/constants/machine-icons.map';
import { stateIcon } from '../utils/machine.utils';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-machine-button',
  imports: [RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [class]="btnClass()" [routerLink]="['/machine', id()]"
       [attr.aria-label]="('machine.' + id() | translate) + ' — ' + state()">
      <span class="machine-btn__state-icon material-symbols-outlined" aria-hidden="true">{{ stateIcon(state()) }}</span>
      @if (!small()) {
        <span class="machine-btn__machine-icon material-symbols-outlined" aria-hidden="true">{{ machineIcon() }}</span>
      }
      <span class="machine-btn__name">{{ 'machine.' + id() | translate }}</span>
    </a>
  `,
  styles: [
    `
      @use 'styles/variables' as *;
      @use 'styles/mixins' as *;

      .machine-btn {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: $spacing-sm;
        width: 140px;
        height: 140px;
        border: 2px solid transparent;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        cursor: pointer;
        background: $color-bg;
        color: $color-text;
        text-decoration: none;
        padding: $spacing-lg $spacing-sm $spacing-sm;
        letter-spacing: $letter-spacing-wide;
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

      .machine-btn__machine-icon {
        font-size: 40px;
      }

      .machine-btn__name {
        font-size: $font-size-lg;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
      }

      .machine-btn--small {
        flex-direction: row;
        width: 140px;
        height: 44px;
        padding: 0 calc($spacing-lg + $spacing-xs);
        font-size: $font-size-base;
        overflow: hidden;

        .machine-btn__name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

      }

      .machine-btn {
        @include state-colors('.machine-btn__state-icon');
      }
    `,
  ],
})
export class MachineButtonComponent {
  readonly id = input.required<string>();
  readonly state = input.required<MachineState>();
  readonly small = input(false);

  protected readonly stateIcon = stateIcon;

  protected readonly machineIcon = computed(() => MACHINE_ICONS[this.id()] ?? '');

  protected readonly btnClass = computed(() => {
    const classes = ['machine-btn', `machine-btn--${this.state()}`];
    if (this.small()) classes.push('machine-btn--small');
    return classes.join(' ');
  });
}
