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
  taskListId: string="";

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
   //   this.router.navigate(["task-list", this.taskLists[0]["_id"]]);
    });
    this.activatedRoute.params.subscribe(
      (params: Params) =>{
        this.taskListId =  params['taskListId'];
        if(this.taskListId){
          this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
            (tasks: TaskModel[]) => this.tasks= tasks
          )
        }
      }
    );
  }

  taskClicked(task: TaskModel){

    this.taskService.updateTaskStatus(this.taskListId, task)
    .subscribe(()=>task.completed = !task.completed);
    console.log(!task.completed)
  }

  deleteTask(task: TaskModel){
    this.taskService.deleteATaskInsideATaskList(this.taskListId, task._id)
    .subscribe((taskDeleted: TaskModel )=>{
      this.tasks = this.tasks.filter(t => t._id != taskDeleted._id); //remove the deleted task from the class level tasks
    });
  }

  deleteATaskList(taskListClicked: TaskListModel){
    this.taskService.deleteTaskList(taskListClicked._id)
    .subscribe(()=>{
      this.taskLists = this.taskLists.filter(tL => tL._id !=taskListClicked._id);
    });
  }

  addNewTask(){
    if(this.taskListId){
      //route the user to add task screen for the selected task-list
      this.router.navigate(['./new-task'],{relativeTo: this.activatedRoute});
    }else{
      alert("Please select a task list!");
      return;
    }
  }

}
