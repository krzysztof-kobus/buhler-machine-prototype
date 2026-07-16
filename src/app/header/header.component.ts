import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { formatDateTime } from '../shared/utils/machine.utils';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LangSwitcherComponent } from '../shared/lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NavigationComponent, TranslatePipe, LangSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="header__top">
        <a routerLink="/" class="header__logo-link">
          <img src="assets/buhler-logo.svg" alt="Bühler" class="header__logo" />
        </a>
        <div class="header__user">
          <app-lang-switcher />
          <div class="header__datetime">
            <span class="material-symbols-outlined" aria-hidden="true">schedule</span>
            <span>{{ formattedDateTime() }}</span>
          </div>
          <div class="header__operator">
            <span class="material-symbols-outlined" aria-hidden="true">person</span>
            <span>{{ 'header.operator' | translate }}</span>
          </div>
        </div>
      </div>
      <app-navigation />
    </header>
  `,
  styles: [
    `
      @use 'styles/variables' as *;

      :host {
        display: block;
        background: $color-bg;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header {
        display: flex;
        flex-direction: column;
      }

      .header__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3px solid $color-primary;
        padding: $spacing-md $spacing-lg;

        @media (max-width: $breakpoint-md) {
          flex-wrap: wrap;
          gap: $spacing-sm;
          padding: $spacing-sm $spacing-md;
        }
      }

      .header__logo-link {
        display: flex;

        @media (max-width: $breakpoint-md) {
          flex: 1 0 100%;
          justify-content: center;
        }
      }

      .header__logo {
        height: 40px;
      }

      .header__user {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
        font-size: $font-size-base;
      }

      .header__datetime {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
        margin-right: $spacing-md;
        user-select: none;
      }

      .header__operator {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
        user-select: none;
      }
    `,
  ],
})
export class HeaderComponent {
  private readonly translate = inject(TranslateService);
  private readonly tick = toSignal(interval(1000));

  protected readonly formattedDateTime = computed(() => {
    this.tick();
    return formatDateTime(new Date(), this.translate.currentLang());
  });
}
