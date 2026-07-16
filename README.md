# Buhler Machine Prototype

Angular 22 SPA for monitoring a production line of industrial machines. Built as a showcase for the Buhler applicant test.

## Baseline functionality

- Dashboard showing 4 machines (Scale, Attacher, Packer, Closer) connected in a production line
- Three machine states with visual feedback: running, alarm, warning
- Machine detail view with notes, state icon, and close navigation
- Navigation bar with compact machine buttons
- Header with logo, live clock, and operator label
- Responsive layout (800x600 desktop card, full viewport on mobile)

## Extras

- **i18n** — English and Czech via ngx-translate with a language switcher
- **Resilience** — notification banner on server unavailability with auto-retry countdown, last known state caching
- **CI/CD** — automated deployment to GitHub Pages
- **Zoneless** — uses `provideZonelessChangeDetection()` and Angular Signals throughout
- **Accessibility** — `aria-label`, `aria-hidden` on decorative icons, semantic `<a>` for navigation

## Simulating network error

In `src/app/core/services/machines-api.service.ts`, uncomment the SSE disconnect line:

```ts
timer(5_000).pipe(switchMap(() => throwError(() => new Error('SSE connection lost')))),
```

This will trigger a simulated disconnect 5 seconds after data loads, showing the notification banner with retry countdown.

## Development

```bash
ng serve        # dev server at http://localhost:4200
ng test         # run unit tests (Vitest)
ng build        # production build
```
