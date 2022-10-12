import { TaskScreenComponent } from './screens/task-screen/task-screen.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: TaskScreenComponent},
  {path: "task-list/:taskListId", component: TaskScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
