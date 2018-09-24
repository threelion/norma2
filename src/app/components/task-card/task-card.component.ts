import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { saveAs } from 'file-saver/FileSaver';
import * as _ from 'lodash';

import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { FileService } from '../../services/file.service';
import { AuthService } from '../../services/auth.service';
import { MultidataService } from '../../services/multidata.service';

const MAX_ATTACHMENT_SIZE = 2000000;

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
    // console.log(this.task);
    var due = UTCFromlocalDateTime(this.duedate, this.duetime);
    // console.log(due);

    var task : Task = {
      name: this.task.name,
      description : this.task.description,
      executor: (this.task.executor._id instanceof Array) ? this.task.executor._id : [this.task.executor._id],
      controller: this.task.controller._id,
      deadline: new Date(due),
      attachments: this.task.attachments,
      issuer: this.task.issuer._id,
      taskType: this.task.taskType._id,
    }

    if (this.isNew){
      this.taskService.addTask(task).subscribe(
        newTask => {
          console.log('task added')
          // console.log(newTask)
        })

    } else {
      task._id = this.task._id;
      this.taskService.updateTask(task).subscribe(
        updatedTask => {
          // console.log('task updated')
          console.log(updatedTask)
        })
    };
  }

  onSelectNewAttachment(e){

    if (e.target.files){
      if (e.target.files[0].size > MAX_ATTACHMENT_SIZE) {
        alert('File size must me less 2Mb!');
      } else {
        var form = new FormData();
        form.append('file', e.target.files[0]);

        if (! this.task.attachments){
          this.task.attachments = [];
        }
        
        this.fileService.uploadFile(form).subscribe(
          res => this.task.attachments.push(res)
        )
      };
    }
  }

  private showCard(){

  }

  onDeleteFile(file){
    this.fileService.deleteFile(file).subscribe(
      deletedFile => {
        // console.log(deletedFile);

        this.task.attachments = _.filter(this.task.attachments, function(o){

          return o._id != deletedFile._id
        })

        // console.log(this.task.attachments);
      }
    )
  }

  onAddFile(){

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
