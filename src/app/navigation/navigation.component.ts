import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MachinesStore } from '../core/store/machines.store';
import { MachineButtonComponent } from '../shared/machine-button/machine-button.component';

@Component({
  selector: 'app-navigation',
  imports: [MachineButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="nav">
      @if (error()) {
        <span class="nav__error">Failed to load machines</span>
      } @else {
        @for (machine of machines(); track machine.id) {
          <app-machine-button [id]="machine.id" [name]="machine.name" [state]="machine.state" [small]="true" />
        }
      }
    </nav>
  `,
  styles: [
    `
      @use 'styles/variables' as *;

      .nav {
        display: flex;
        flex-wrap: wrap;
      }

      .nav__error {
        font-size: $font-size-base;
        color: $color-alarm;
      }
    `,
  ],
})
export class NavigationComponent {
  private readonly store = inject(MachinesStore);

  protected readonly machines = this.store.machines;
  protected readonly error = this.store.error;
}
