import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskMonitorComponent } from './components/task-monitor/task-monitor.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

const routes: Routes = [
	{ path: 'tasks', component: TaskMonitorComponent},
	{ path: 'taskcard', component: TaskCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
