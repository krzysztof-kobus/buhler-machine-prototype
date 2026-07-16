import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MachinesStore } from '../core/store/machines.store';
import { MachineButtonComponent } from '../shared/machine-button/machine-button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  imports: [MachineButtonComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="nav">
      @if (error() && !machines()?.length) {
        <span class="nav__error">{{ 'errors.failedToLoadMachines' | translate }}</span>
      }
      @for (machine of machines(); track machine.id) {
        <app-machine-button [id]="machine.id" [state]="machine.state" [small]="true" />
      }
    </nav>
  `,
  styles: [
    `
      @use 'styles/variables' as *;

      :host {
        display: block;
        min-height: 44px;
      }

      .nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 100%;
      }

      .nav__error {
        font-size: $font-size-base;
        color: $color-alarm;
        padding: 0 $spacing-md;
      }
    `,
  ],
})
export class NavigationComponent {
  private readonly store = inject(MachinesStore);

  protected readonly machines = this.store.machines;
  protected readonly error = this.store.error;
}
