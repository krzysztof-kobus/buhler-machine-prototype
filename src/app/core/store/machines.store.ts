import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Machine } from '../models/machine.model';
import { MachinesAPIService } from '../services/machines-api.service';

@Injectable({ providedIn: 'root' })
export class MachinesStore {
  private readonly api = inject(MachinesAPIService);

  private readonly machinesResource = rxResource<Machine[], void>({
    stream: () => this.api.getMachines(),
  });

  readonly machines = computed(() =>
    this.machinesResource.value()?.slice().sort((a, b) => a.order - b.order),
  );
  readonly isLoading = this.machinesResource.isLoading;
  readonly error = this.machinesResource.error;
}
