import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'task-by-status-selector',
  templateUrl: './task-by-status-selector.component.html',
  styleUrls: ['./task-by-status-selector.component.sass']
})
export class TaskByStatusSelectorComponent implements OnInit {
	@Output() onChangeStatusState = new EventEmitter();
  @Input() role;

  private isApplied: Boolean = false;
  constructor() { }

  ngOnInit() {

  }

  changeState(){
  	this.isApplied = ! this.isApplied;
  	this.onChangeStatusState.emit(this.isApplied);
  }

}
