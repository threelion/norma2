import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

import { Task } from '../../interfaces/task';
import { UserRole } from '../../enums/user-role.enum';

import * as _ from 'lodash';
// const closedJobs = ['e55303d0-b279-11e8-9dbd-f7e01824872b', 'b682c310-b279-11e8-9dbd-f7e01824872b'];

@Component({
  selector: 'task-monitor',
  templateUrl: './task-monitor.component.html',
  styleUrls: ['./task-monitor.component.sass']
})
export class TaskMonitorComponent implements OnInit {

  public tasks: Object[] = [];
  public tasksForShow: Object[] = [];
  public isShowClosed: Boolean = false;
  public role: String = undefined;

  constructor( 
    private taskService: TaskService, 
    private authService: AuthService, 
  ) { }

  public userId : String;
  public currentTask: Task = undefined;
  
  roleFilters: Object= {
        controller: true,
        executor: true
      };

  ngOnInit() {
    let user = this.authService.currentUser();
    this.userId = user.id;
    this.role = user.role.toString();
    // this.userId = (this.authService.currentUser()).id;
    // console.log(this.authService.currentUser());

  	this.taskService.getCEOTasks({_id: this.userId})
      .subscribe( res => {
        this.tasks = res;
        this.tasksForShow = this.filterTasks(res, this.userId);
      });
  }

  private filterTasks(allTasks, userId) {

    var result : Object[];

    result = allTasks;
    result = this.useStatusFilter(result);
    result = this.useRoleFilter(result, userId, this.roleFilters);

    return result;
  }

  private useStatusFilter(tasks){
    var ts = this.taskService;
    var res: Object[];
    if (! this.isShowClosed){
      res = _.filter(tasks, function(o){
        // return closedJobs.indexOf(o.status._id) < 0
        return (! ts.isClosedTask(o.status._id));
      });
    } else {
      res = tasks;
    }

    return res;
  }

  private useRoleFilter(tasks, userId, params){
    var res: Object[];

    res = _.filter(tasks, function(o){
      let valid: Boolean = false;

      if (params.controller)
        if (params.executor)
          valid = o.controller._id == userId || o.executor._id == userId;
        else
          valid = o.controller._id == userId
      else 
        if (params.executor)
          valid = o.executor._id == userId

      return valid;
    })

    return res;
  }

  private roleFilterChange(params){
    this.roleFilters = params;
    this.tasksForShow = this.filterTasks(this.tasks, this.userId);
  }

  private statusSelectorChange(selectorState: Boolean){
    this.isShowClosed = selectorState;
    this.tasksForShow = this.filterTasks(this.tasks, this.userId);
  }

  public selectTaskAction(task){
    if (! task) this.currentTask = undefined
      else
        this.currentTask = task;
  }
}