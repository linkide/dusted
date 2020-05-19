import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  tasklist: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasklist();
  }

  getTasklist(): void {
    this.taskService.getTasklist()
      .subscribe(tasklist => this.tasklist = tasklist.slice(1, 5));
  }
}