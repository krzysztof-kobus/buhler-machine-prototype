import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { Machine } from '../models/machine.model';
import { MachinesAPIService } from '../services/machines-api.service';

const RETRY_DELAY_MS = 10_000;

@Injectable({ providedIn: 'root' })
export class MachinesStore {
  private readonly api = inject(MachinesAPIService);

  private readonly machinesResource = rxResource({
    stream: () => this.api.getMachines(),
  });

  private readonly lastKnownMachines = signal<Machine[] | undefined>(undefined);
  private readonly fetchedAt = signal<Date | null>(null);
  private readonly retryAt = signal<Date | null>(null);
  private readonly tick = toSignal(interval(1000));

  readonly machines = this.lastKnownMachines.asReadonly();
  readonly error = this.machinesResource.error;
  readonly lastFetchedAt = this.fetchedAt.asReadonly();

  machineById(id: string | undefined) {
    return computed(() => this.lastKnownMachines()?.find((m) => m.id === id));
  }

  readonly retryCountdown = computed(() => {
    const retryAt = this.retryAt();
    if (!retryAt) return null;
    this.tick();
    return Math.max(0, Math.ceil((retryAt.getTime() - Date.now()) / 1000));
  });

  constructor() {
    effect(() => {
      if (this.machinesResource.hasValue()) {
        const sorted = this.machinesResource
          .value()
          ?.slice()
          .sort((a, b) => a.order - b.order);
        this.lastKnownMachines.set(sorted);
        this.fetchedAt.set(new Date());
        this.retryAt.set(null);
      }
    });

    effect(() => {
      if (this.error()) {
        this.retryAt.set(new Date(Date.now() + RETRY_DELAY_MS));
      }
    });

    effect(() => {
      if (this.retryCountdown() === 0 && this.error()) {
        this.retryAt.set(null);
        this.machinesResource.reload();
      }
    });
  }
}
