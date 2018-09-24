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
import { PotentialDealsService } from './services/potential-deals.service';

import { SupplierService } from './services/supplier.service';
import { PotentialPositionService } from './services/potential-position.service';
import { ProposalService } from './services/proposal.service';
import { ProductService } from './services/product.service';

import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskMonitorComponent } from './components/task-monitor/task-monitor.component';
import { TasksByRoleSelectorComponent } from './components/tasks-by-role-selector/tasks-by-role-selector.component';
import { TaskByStatusSelectorComponent } from './components/task-by-status-selector/task-by-status-selector.component';
import { TaskActionsBlockComponent } from './components/task-actions-block/task-actions-block.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskExecutableBlockComponent } from './components/task-executable-block/task-executable-block.component';
import { TaskExecFindProposalsComponent } from './components/task-exec-find-proposals/task-exec-find-proposals.component';
import { SelectWithFilterComponent } from './components/common/select-with-filter/select-with-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TaskListComponent,
    TaskMonitorComponent,
    TasksByRoleSelectorComponent,
    TaskByStatusSelectorComponent,
    TaskActionsBlockComponent,
    TaskCardComponent,
    TaskExecutableBlockComponent,
    TaskExecFindProposalsComponent,
    SelectWithFilterComponent
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
    FileService,
    PotentialDealsService,
    SupplierService,
    ProductService,
    PotentialPositionService,
    ProposalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
