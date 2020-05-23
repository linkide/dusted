import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  
  tasklist: Task[];
  done: Task[];

  constructor(private taskService: TaskService) { 
  }

  ngOnInit(): void {
    this.getTasklist();
    this.getDonelist();
  }

  getTasklist(): void {
    this.taskService.getTasklist()
        .subscribe(tasklist => this.tasklist = tasklist);
  }

  getDonelist(): void {
    this.taskService.getDonelist()
        .subscribe(done => this.done = done);
  }

  add(name: string, time: number): void {
    name = name.trim();
    time = time;
    if (!name || isNaN(time)) { return; }
    this.taskService.addTask({ name, time } as Task)
      .subscribe(task => {
        this.tasklist.push(task);
      });
  }

  delete(task: Task): void {
    this.tasklist = this.tasklist.filter(h => h !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }



}
