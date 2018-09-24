import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';

import * as _ from 'lodash';

import { Task } from '../../interfaces/task';

const DIRECTOR = "Director";

@Component({
  selector: 'task-actions-block',
  templateUrl: './task-actions-block.component.html',
  styleUrls: ['./task-actions-block.component.sass']
})
export class TaskActionsBlockComponent implements OnInit {
  @Input() selectedTask: Task;
  @Output() refresh = new EventEmitter();
  // private selectedTask: Task;

  private user = undefined;

  constructor(
     private router: Router, 
     private authService: AuthService, 
     private taskService: TaskService
   ) { }

  ngOnInit() {
    this.user = this.authService.currentUser();
    // this.selectedTask = this.taskService.getCurrent();
  }

  onNewButton(){
    this.router.navigate(['/taskcard', {new: true}])
  }

  onViewButton(){
    this.router.navigate(['/taskcard', {readonly: true}]);
  }
  onChangeButton(){
    this.router.navigate(['/taskcard', {}]);
  }

  onDeclineButton(){

  }

  onAbortButton(){

  }

  onCompletedButton(){
    var task = this.taskService.getCurrent();
    task = this.taskService.setCompleted(task);

    this.taskService.updateTask(task).subscribe(
      updatedTask => {
        this.refresh.emit();
      }
    )
  }

  onUncompletedButton(){
    var task = this.taskService.getCurrent();
    task = this.taskService.setOngoing(task);

    this.taskService.updateTask(task).subscribe(
      updatedTask => {
        this.refresh.emit();
      }
    )
  }

  onAcceptButton(){
    var nextSteps = this.taskService.nextStep(this.taskService.getCurrent());
    console.log( nextSteps );

    var service = this.taskService;
    var task = this.taskService.getCurrent();

    var childTasks = [];

    nextSteps.forEach( function(o){
      childTasks = _.merge( childTasks,  service.createNewTaskObject(task, o) )
    })

    console.log(childTasks);
  }

  showModifyBtn() : Boolean {
    var res = false;

    if ( 
        this.selectedTask &&
        ! this.taskService.isClosedTask(this.selectedTask.status._id) &&
        ((this.user.role == DIRECTOR) || (this.user.id == this.selectedTask.controller._id)) 
       ) res = true;

    return res;
  }

  showViewBtn() : Boolean {
    var res = false;

    if ( 
        this.selectedTask 
       ) res = true;

    return res;
  }

  showDeclineBtn() : Boolean {
    var res = false;

    if ( 
        this.selectedTask &&
        ! this.taskService.isClosedTask(this.selectedTask.status._id) &&
        (this.user.id == this.selectedTask.controller._id) 
       ) res = true;
    
    return res;
  }

  showCompletedBtn() : Boolean {
    var res = false;

    if ( 
        this.selectedTask &&
        ! this.taskService.isClosedTask(this.selectedTask.status._id) &&
        ! this.taskService.isCompletedTask(this.selectedTask.status._id) &&
        (this.user.id == this.selectedTask.controller._id) 
       ) res = true;
    
    return res;
  }

  showUncompletedBtn() : Boolean {
    var res = false;

    if ( 
        this.selectedTask &&
        ! this.taskService.isClosedTask(this.selectedTask.status._id) &&
        this.taskService.isCompletedTask(this.selectedTask.status._id) &&
        (this.user.id == this.selectedTask.controller._id) 
       ) res = true;
    
    return res;
  }

  showAcceptBtn() : Boolean {
    var res = false;

    if ( 
        this.selectedTask &&
        ! this.taskService.isClosedTask(this.selectedTask.status._id) &&
        (this.user.id == this.selectedTask.controller._id) 
       ) res = true;
    
    return res;
  }

  showAbortBtn() : Boolean {
    var res = false;

    if ( 
        this.selectedTask &&
        ! this.taskService.isClosedTask(this.selectedTask.status._id) &&
        (this.user.id == this.selectedTask.controller._id) 
       ) res = true;
    
    return res;
  }
}
