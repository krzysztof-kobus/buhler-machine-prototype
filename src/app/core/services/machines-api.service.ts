import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, retry } from 'rxjs';
import { Machine } from '../models/machine.model';
import { MachineDetail } from '../models/machine-detail.model';

@Injectable({ providedIn: 'root' })
export class MachinesAPIService {
  private readonly http = inject(HttpClient);

  getMachines(): Observable<Machine[]> {
    return this.http
      .get<Machine[]>('/assets/data/machines.json')
      .pipe(retry({ count: 3, delay: 1000 }));
  }

  getMachineDetail(id: string | undefined): Observable<MachineDetail | undefined> {
    return this.http.get<MachineDetail[]>('/assets/data/machine-details.json').pipe(
      map((details) => details.find((d) => d.id === id)),
      retry({ count: 3, delay: 1000 }),
    );
  }
}
