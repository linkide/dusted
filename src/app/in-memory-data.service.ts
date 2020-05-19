import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasklist = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {tasklist};
  }

  // Overrides the genId method to ensure that a task always has an id.
  // If the tasklist array is empty,
  // the method below returns the initial number (11).
  // if the tasklist array is not empty, the method below returns the highest
  // task id + 1.
  genId(tasklist: Task[]): number {
    return tasklist.length > 0 ? Math.max(...tasklist.map(task => task.id)) + 1 : 11;
  }
}