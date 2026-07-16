import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MachinesStore } from '../../core/store/machines.store';
import { TranslatePipe } from '@ngx-translate/core';
import { MACHINE_ICONS } from '../../core/constants/machine-icons.map';
import { stateIcon } from '../../shared/utils/machine.utils';

@Component({
  selector: 'app-machine-details',
  imports: [RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="details">
      <div [class]="'details__card details__card--' + detail()?.state">
        <a class="details__exit material-symbols-outlined" routerLink="/" aria-label="Close"
          >close</a
        >

        <span class="details__machine-icon material-symbols-outlined" aria-hidden="true">{{
          machineIcon()
        }}</span>
        <span class="details__name">{{ 'machine.' + id() | translate }}</span>

        <span class="details__state-icon material-symbols-outlined" aria-hidden="true">{{
          stateIcon(detail()?.state)
        }}</span>

        <p
          class="details__notes"
          [class.details__notes--empty]="!detail()?.notes"
          [attr.title]="detail()?.notes"
        >
          <span>{{ detail()?.notes }}</span>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      @use 'styles/variables' as *;
      @use 'styles/mixins' as *;

      .details {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .details__card {
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        gap: $spacing-md;
        background: $color-surface;
        padding: $spacing-xl;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
        width: 400px;
        height: 320px;
      }

      .details__exit {
        position: absolute;
        top: $spacing-sm;
        right: $spacing-sm;
        font-size: $font-size-xl;
        color: inherit;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          opacity: 0.7;
        }
      }

      .details__machine-icon {
        font-size: 56px;
        color: inherit;
      }

      .details__name {
        font-size: $font-size-xxl;
        font-weight: $font-weight-bold;
        letter-spacing: $letter-spacing-wide;
      }

      .details__state-icon {
        font-size: 40px;
      }

      .details__notes {
        height: 72px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        padding-top: $spacing-md;

        span {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          font-size: $font-size-base;
          text-align: center;
          line-height: 1.5;
        }

        &--empty {
          border-top: none;
        }
      }

      .details__card {
        @include state-colors('.details__state-icon');
      }
    `,
  ],
})
export class MachineDetailsComponent {
  private readonly store = inject(MachinesStore);

  protected readonly stateIcon = stateIcon;

  protected readonly id = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('id') ?? undefined)),
  );

  protected readonly detail = computed(() => this.store.machineById(this.id())());
  protected readonly machineIcon = computed(() => MACHINE_ICONS[this.id() ?? ''] ?? '');
}
