import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-machine-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>Machine {{ id() }} — Coming Soon</p>`,
})
export class MachineDetailsComponent {
  protected readonly id = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('id'))));
}
