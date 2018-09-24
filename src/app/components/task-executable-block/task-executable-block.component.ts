import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-executable-block',
  templateUrl: './task-executable-block.component.html',
  styleUrls: ['./task-executable-block.component.sass']
})
export class TaskExecutableBlockComponent implements OnInit {

  private task;
  constructor(
  	private taskService: TaskService

  ) { }

  private isFindSupplyTask = this.taskService.isFindProposalsTask;

  ngOnInit() {
  	this.task = this.taskService.getCurrent();
  }

}
