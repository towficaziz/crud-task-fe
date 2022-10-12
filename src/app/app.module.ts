import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskScreenComponent } from './screens/task-screen/task-screen.component';
import { NewTaskListScreenComponent } from './screen/new-task-list-screen/new-task-list-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskScreenComponent,
    NewTaskListScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
