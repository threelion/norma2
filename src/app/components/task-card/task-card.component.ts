import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { saveAs } from 'file-saver/FileSaver';
import * as _ from 'lodash';

import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { FileService } from '../../services/file.service';
import { AuthService } from '../../services/auth.service';
import { MultidataService } from '../../services/multidata.service';

import { UTCFromlocalDateTime, localDateFromUTC, localTimeFromUTC } from '../../libs/date';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent implements OnInit {
	private isNew : Boolean = false;
  
  private task : Task;
	private onlyread: Boolean = false;
  private duedate: String;
  private duetime: String;
  private closeCaption: String;
  private controllers: Object[];
  private executors: Object[];
  private taskTypes: Object[];

  constructor(
    private route: ActivatedRoute, 
    private taskService: TaskService, 
    private authService: AuthService, 
    private fileService: FileService, 
    private multidataService: MultidataService
   ) { }

  ngOnInit() {
    this.multidataService.getDataForTaskCard().subscribe(
      dataset => {
        
        this.executors = dataset.executors;
        this.controllers = dataset.controllers;
        this.taskTypes = dataset.taskTypes;

        this.route.params.subscribe( params => {
          if (params.new){
            this.isNew = true;
            this.setDefaultValues();
            this.closeCaption = "Close";
          } else {
            this.task = this.taskService.getCurrent();

            if (params.readonly) {
              this.closeCaption = "Close";
              this.onlyread = true;
            }
            else {
              this.closeCaption = "Cancel";

            };
            this.uploadValuesToInputs();
          }

          this.showCard();
        });
      })
  }

  setDefaultValues(){
    var user = this.authService.currentUser();
    var defaultTaskType;

    defaultTaskType = (_.filter( this.taskTypes, { name: "Личное"}))[0];

    if (user.role == "Director"){

    } else {
      this.taskTypes = _.filter( this.taskTypes, { name: "Личное"})
    }

    this.task = {
      name: "",
      _id: undefined,
      description: "",
      controller: this.controllers[0],
      executor: { 
        _id: user.id,
        username: user.username
      },
      issuer: { 
        _id: user.id,
        username: user.username
      }, 
      deadline: new Date(),
      status: {
        _id: 1,
        name: "New Task"
      },
      isInitialTask: true,
      taskType: defaultTaskType,
    }

    var deadline = new Date(this.task.deadline);
    this.duedate = localDateFromUTC(deadline);
    this.duetime = localTimeFromUTC(deadline);
  }

  uploadValuesToInputs(){
    var deadline = new Date(this.task.deadline);
    this.duedate = localDateFromUTC(deadline);
    this.duetime = localTimeFromUTC(deadline);
  }

  onSave(){
    console.log(this.task);
    console.log(UTCFromlocalDateTime(this.duedate, this.duetime));
  }

  private showCard(){

  }

  getFileImg(file){
    var res;

    switch (file.content) {
      case "application/vnd.ms-excel": 
        res = "excel64.png";
        break;
      case "application/vnd.ms-word": 
        res = "word64.png";
        break;
      case "application/pdf": 
        res = "word64.png";
        break;
      case "image/png": 
        res = "pic64.png";
        break;
      case "image/bmp": 
        res = "pic64.png";
        break;
      case "image/jpeg": 
        res = "pic64.png";
        break;
       default: 
         res = "document64.png"
    }

    res = "assets/img/" + res;

    return res;
  }

  downloadFile(file){
    this.fileService.downloadFile(file).subscribe(
        res => {
          saveAs(res, file.initialFilename);
        }
    )
  }

}
