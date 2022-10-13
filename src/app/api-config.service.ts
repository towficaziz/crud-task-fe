
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';


@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  //API call to backend
  getTaskLists(url: string){
    return this.httpClient.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`); //http://localhost:3000/tasklists
  }

  getTasks(url: string){
    return this.httpClient.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`);
  }


  post(url: string, data: Object){
    return this.httpClient.post<TaskListModel>(`${this.API_BASE_URL}/${url}`, data); //http://localhost:3000/tasklists
  }

  put(url: string, data: Object){
    return this.httpClient.put(`${this.API_BASE_URL}/${url}`, data);
  }
 //Update 1 task belonging 1 TaskList
  patchAsPut(url: string, data: Object){  /* her in put<TaskModel> called because patch<TaskModel> gives error */
    return this.httpClient.put<TaskModel>(`${this.API_BASE_URL}/${url}`, data);
  }

  deleteTask(url: string){
    return this.httpClient.delete<TaskModel>(`${this.API_BASE_URL}/${url}`);
  }

  deleteTaskList(url: string){
    return this.httpClient.delete<TaskListModel>(`${this.API_BASE_URL}/${url}`);
  }



}
