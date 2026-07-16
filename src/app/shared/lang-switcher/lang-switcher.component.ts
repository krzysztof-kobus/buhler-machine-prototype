import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select class="lang-switcher" [value]="currentLang()" (change)="onLangChange($event)" aria-label="Language">
      <option value="en">EN</option>
      <option value="cs">CS</option>
    </select>
  `,
  styles: [
    `
      @use 'styles/variables' as *;

      .lang-switcher {
        padding: $spacing-xs $spacing-xs;
        background: none;
        border: 1px solid transparent;
        border-radius: $border-radius-sm;
        color: $color-text;
        font-size: $font-size-sm;
        font-weight: $font-weight-bold;
        cursor: pointer;
        transition: background 0.15s ease;

        &:hover {
          background: rgba(0, 0, 0, 0.06);
        }
      }
    `,
  ],
})
export class LangSwitcherComponent {
  private readonly translate = inject(TranslateService);

  protected readonly currentLang = this.translate.currentLang;

  protected onLangChange(event: Event): void {
    this.translate.use((event.target as HTMLSelectElement).value);
  }
}
