import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

const HIDE_EXECUTOR_TASKS= "Hide Executor Tasks";
const SHOW_EXECUTOR_TASKS= "SHOW Executor Tasks";

const HIDE_CONTROLLER_TASKS= "Hide Controller Tasks";
const SHOW_CONTROLLER_TASKS= "Show Controller Tasks";

@Component({
  selector: 'tasks-by-role-selector',
  templateUrl: './tasks-by-role-selector.component.html',
  styleUrls: ['./tasks-by-role-selector.component.sass']
})
export class TasksByRoleSelectorComponent implements OnInit {

  @Output() onRoleFilterChange = new EventEmitter();
  @Input() role;

  private isShowControllerTasks : Boolean = true;
  private isShowExecutorTasks : Boolean = true;

  hideE = HIDE_EXECUTOR_TASKS;
  showE = SHOW_EXECUTOR_TASKS;

  hideC = HIDE_CONTROLLER_TASKS;
  showC = SHOW_CONTROLLER_TASKS;

  constructor() { }

  ngOnInit() {
  }

  onExecutor(){
    this.isShowExecutorTasks = ! this.isShowExecutorTasks;
    this.submitChanges();
  }

  onController(){
    this.isShowControllerTasks = ! this.isShowControllerTasks;
    this.submitChanges();
  }

  submitChanges(){
    this.onRoleFilterChange.emit({
      controller: this.isShowControllerTasks, 
      executor: this.isShowExecutorTasks
    });

  }

}
