import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, Observable, switchMap, throwError, timer } from 'rxjs';
import { Machine } from '../models/machine.model';

@Injectable({ providedIn: 'root' })
export class MachinesAPIService {
  private readonly http = inject(HttpClient);

  getMachines(): Observable<Machine[]> {
    return concat(
      this.http.get<Machine[]>('assets/data/machines.json'),
      // uncomment to simulate SSE disconnect every 5s
      // timer(5_000).pipe(switchMap(() => throwError(() => new Error('SSE connection lost')))),
    );
  }

}
