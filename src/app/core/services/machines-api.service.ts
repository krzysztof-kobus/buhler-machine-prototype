import { computed, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { Machine } from '../models/machine.model';

@Injectable({ providedIn: 'root' })
export class MachinesAPIService {
  private readonly http = inject(HttpClient);

  readonly machinesResource = rxResource<Machine[], void>({
    stream: () =>
      this.http.get<Machine[]>('/assets/data/machines.json').pipe(retry({ count: 3, delay: 1000 })),
  });

  readonly machines = computed(() =>
    this.machinesResource.value()?.slice().sort((a, b) => a.order - b.order),
  );
  readonly isLoading = this.machinesResource.isLoading;
  readonly error = this.machinesResource.error;
}
