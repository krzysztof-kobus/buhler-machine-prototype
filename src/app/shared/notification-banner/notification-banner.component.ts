import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MachinesStore } from '../../core/store/machines.store';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { formatDateTime } from '../utils/machine.utils';

@Component({
  selector: 'app-notification-banner',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="notification-banner" [class.notification-banner--visible]="error()">
      <span class="material-symbols-outlined" aria-hidden="true">cloud_off</span>
      <div class="notification-banner__text">
        <span>{{ 'errors.serverUnavailable' | translate }}</span>
        @if (lastFetchedAt()) {
          <span class="notification-banner__timestamp">{{ formattedLastFetch() }}</span>
        }
      </div>
      @if (retryCountdown() !== null) {
        <span class="notification-banner__countdown">
          {{ 'errors.retryIn' | translate }} {{ retryCountdown() }}s
        </span>
      }
    </div>
  `,
  styles: [
    `
      @use 'styles/variables' as *;

      .notification-banner {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
        padding: 0 $spacing-md;
        background: $color-alarm;
        color: $color-text-white;
        font-size: $font-size-base;
        border-top: 0 solid $color-bg;
        max-height: 0;
        overflow: hidden;
        transition:
          max-height 0.3s ease-in-out,
          padding 0.3s ease-in-out,
          border-top-width 0.3s ease-in-out;

        &--visible {
          max-height: 80px;
          padding: $spacing-sm $spacing-md;
          border-top-width: 2px;
        }
      }

      .notification-banner__text {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .notification-banner__timestamp {
        font-size: $font-size-sm;
        opacity: 0.85;
      }

      .notification-banner__countdown {
        margin-left: auto;
        font-size: $font-size-sm;
        opacity: 0.85;
        white-space: nowrap;
      }
    `,
  ],
})
export class NotificationBannerComponent {
  private readonly store = inject(MachinesStore);
  private readonly translate = inject(TranslateService);

  protected readonly error = this.store.error;
  protected readonly lastFetchedAt = this.store.lastFetchedAt;
  protected readonly retryCountdown = this.store.retryCountdown;

  protected readonly formattedLastFetch = computed(() => {
    const d = this.store.lastFetchedAt();
    return d ? formatDateTime(d, this.translate.currentLang() ?? 'en') : '';
  });
}
