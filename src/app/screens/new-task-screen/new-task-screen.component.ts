import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent implements OnInit {

  taskListId: string = "";
  constructor(
    private taskService: TaskService,
    private activateRoute: ActivatedRoute,
    private router: Router
    ) {
      this.activateRoute.params.subscribe(
        (params: Params)=>{
          this.taskListId = params['taskListId'];
      });
    }

  ngOnInit(): void {
  }

  addNewTask(title: string){
    if(title){
    this.taskService.createTaskInsideATaskList(this.taskListId, title)
    .subscribe(()=>{
      this.router.navigate(['../'], {relativeTo: this.activateRoute});
    })
  }else{
    alert("Title cannot be empty!");
    return;
  }
  }

}
