import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';

import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { SessionService } from './services/session.service';
import { TaskService } from './services/task.service';
import { FileService } from './services/file.service';
import { MultidataService } from './services/multidata.service';

import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskMonitorComponent } from './components/task-monitor/task-monitor.component';
import { TasksByRoleSelectorComponent } from './components/tasks-by-role-selector/tasks-by-role-selector.component';
import { TaskByStatusSelectorComponent } from './components/task-by-status-selector/task-by-status-selector.component';
import { TaskActionsBlockComponent } from './components/task-actions-block/task-actions-block.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TaskListComponent,
    TaskMonitorComponent,
    TasksByRoleSelectorComponent,
    TaskByStatusSelectorComponent,
    TaskActionsBlockComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpModule
  ],
  providers: [
    AuthService, 
    ConfigService, 
    SessionService, 
    TaskService, 
    MultidataService, 
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
