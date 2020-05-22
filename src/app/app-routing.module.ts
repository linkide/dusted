import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasklistComponent } from './tasklist/tasklist.component';
import { EditTasklistComponent }   from './edit-tasklist/edit-tasklist.component';
import { TaskDetailComponent }  from './task-detail/task-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasklist', pathMatch: 'full' },
  { path: 'edit-tasklist', component: EditTasklistComponent },
  { path: 'tasklist', component: TasklistComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }