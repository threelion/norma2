import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';

import { Task } from '../../interfaces/task';

const DIRECTOR = "Director";

@Component({
  selector: 'task-actions-block',
  templateUrl: './task-actions-block.component.html',
  styleUrls: ['./task-actions-block.component.sass']
})
export class TaskActionsBlockComponent implements OnInit {
  @Input() selectedTask: Task;

  private user = undefined;

  constructor(
     private router: Router, 
     private authService: AuthService, 
     private taskService: TaskService
   ) { }

  ngOnInit() {
    this.user = this.authService.currentUser();
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

  onAcceptButton(){

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

  toLocalDate(unixDate) : String {
    var res : String;

    return res;
  }

  toGrinvichDate(localDate){
    var res : String;
    return res;
  }
}
