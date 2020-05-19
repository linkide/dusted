import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  
  tasklist: Task[];

  constructor(private taskService: TaskService) { 
  }

  ngOnInit(): void {
    this.getTasklist();
  }

  getTasklist(): void {
    this.taskService.getTasklist()
        .subscribe(tasklist => this.tasklist = tasklist);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.taskService.addTask({ name } as Task)
      .subscribe(task => {
        this.tasklist.push(task);
      });
  }

  delete(task: Task): void {
    this.tasklist = this.tasklist.filter(h => h !== task);
    this.taskService.deleteTask(task).subscribe();
  }

}
