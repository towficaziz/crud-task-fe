import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskListModel from './../../models/taskListModel';
import TaskModel from './../../models/taskModel';


@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists: TaskListModel[]= [];
  tasks: TaskModel[]= [];
  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.taskService.getAllTaskLists()
    .subscribe(allTaskLists =>{
      this.taskLists = allTaskLists;
      //get the 1st task list id and route to it on page load
      this.router.navigate(["task-list", this.taskLists[0]["_id"]]);
    });
    this.activatedRoute.params.subscribe(
      (params: Params) =>{
        const taskListId =  params['taskListId'];
        if(taskListId){
          this.taskService.getAllTasksForATaskList(taskListId).subscribe(
            (tasks: TaskModel[]) => this.tasks= tasks
          )
        }
      }
    );
  }

  taskClicked(task: TaskModel){
    console.log(task)
  }

}
