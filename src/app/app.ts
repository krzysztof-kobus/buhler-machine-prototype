import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NotificationBannerComponent } from './shared/notification-banner/notification-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NotificationBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
