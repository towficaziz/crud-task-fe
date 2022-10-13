
import { ApiConfigService } from './api-config.service';
import { Injectable } from '@angular/core';
import TaskModel from './models/taskModel';
import { Observable } from 'rxjs';
import TaskListModel from './models/taskListModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  //to fetch all task lists
  getAllTaskLists(): Observable<TaskListModel[]> {
    return this.apiConfigService.getTaskLists("tasklists");
  }

    //to fetch all task
    getAllTasks(taskListId: string): Observable<TaskModel[]> {
      return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
    }


  //create a task list bucket
  createTaskList(title: string): Observable<TaskListModel>{
    let data = {"title": title};
    return this.apiConfigService.post("tasklists", data);
  }

  //to fetch all tasks inside a task list object
  //http://localhost:3000/tasklists/6344b693a28df67457a40a2a/tasks
  getAllTasksForATaskList(taskListId: string){
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  //create a task inside a particular task list object
  //http://localhost:3000/tasklists/6344b693a28df67457a40a2a/tasks
  createTaskInsideATaskList(taskListId: string, title: string){
    let data = {"title": title};
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, data);
  }

  //delete a task list
  //http://localhost:3000/tasklists/6344b693a28df67457a40a2a
  deleteTaskList(taskListId: string): Observable<TaskListModel>{
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }

  //delete a task inside a particular task list
  //http://localhost:3000/tasklists/63443568b45e694fce0331c5/tasks/63448b06618c134657c8c306
  deleteATaskInsideATaskList(taskListId: string, taskId: string): Observable<TaskModel>{
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  //update the status of a task wheather its compleated or not
  //http://localhost:3000/tasklists/63443568b45e694fce0331c5/tasks/63448b06618c134657c8c306
  updateTaskStatus(taskListId: string, taskObject: TaskModel): Observable<TaskModel>{  /*instead of Observable<TaskModel> I used here Observable<any> */
    let updateData = {"completed": !taskObject.completed}; // use '!' to toggle the database value
    return this.apiConfigService.patchAsPut(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData);
  }
}
