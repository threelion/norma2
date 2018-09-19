import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

import * as _ from 'lodash';
// const closedJobs = ['e55303d0-b279-11e8-9dbd-f7e01824872b', 'b682c310-b279-11e8-9dbd-f7e01824872b'];


@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {

  @Input() taskList: Task[];
  @Input() selectedTask: Task;
	@Output() selectTask = new EventEmitter();

  constructor( private taskService: TaskService) { }

  ngOnInit() {
  }

  taskRowStyle(task){
    var curDate = new Date();

    if (task.selected) return 'selected-task'
    else 
      // if (closedJobs.indexOf(task.status._id) > -1) return 'completed-task'
      if (this.taskService.isClosedTask(task.status._id)) return 'completed-task'
      else 
        if (curDate > ( new Date(task.deadline))) return 'overdued-task' 
          else return 'current-task';
  }

  onSelect(task){
    var current = this.selectedTask;

    if (task.selected){
      task.selected = false;
      this.selectTask.emit();
      this.taskService.setCurrent(undefined);
    } else {
      // unselect previously selected task
      if (current){
        this.taskList = _.map(this.taskList, function(o){
          if (o._id == current._id){
            o.selected = false;
          }
          return o;
        })
      }

      task.selected = true;
      this.selectTask.emit(task);      
      this.taskService.setCurrent(task);
    }
  }
}
