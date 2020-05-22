import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasklist = [
      { id: 11, name: 'Pölyjen pyyhkiminen', time:10},
      { id: 12, name: 'Lattian pesu', time:20},
      { id: 13, name: 'Keittiön siivous', time: 15},
      { id: 14, name: 'Imuronti', time:10},
    ];

    const donelist = [
    ];
    return {tasklist, donelist};
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