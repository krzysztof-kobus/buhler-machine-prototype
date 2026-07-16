import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MachinesStore } from '../../core/store/machines.store';
import { MachineButtonComponent } from '../../shared/machine-button/machine-button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [MachineButtonComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="production-line">
      @if (error()) {
        <span class="production-line__error">{{ 'errors.failedToLoadMachines' | translate }}</span>
      } @else {
        @for (machine of machines(); track machine.id; let last = $last) {
          <app-machine-button [id]="machine.id" [state]="machine.state" />
          @if (!last) {
            <div class="production-line__connector"></div>
          }
        }
      }
    </div>
  `,
  styles: [
    `
      @use 'styles/variables' as *;

      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .production-line {
        display: flex;
        align-items: center;
        padding: $spacing-xl;
      }

      .production-line__connector {
        width: 32px;
        height: 3px;
        background: $color-primary;
        flex-shrink: 0;
      }

      .production-line__error {
        font-size: $font-size-base;
        color: $color-alarm;
      }
    `,
  ],
})
export class DashboardComponent {
  private readonly store = inject(MachinesStore);

  protected readonly machines = this.store.machines;
  protected readonly error = this.store.error;
}
