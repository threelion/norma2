import { Component, OnInit } from '@angular/core';

import { PotentialDealsService } from '../../services/potential-deals.service'
import { TaskService } from '../../services/task.service'
import { SupplierService } from '../../services/supplier.service'
import { MultidataService } from '../../services/multidata.service'

import { Task} from '../../interfaces/task'

import * as _ from 'lodash';


@Component({
  selector: 'task-exec-find-proposals',
  templateUrl: './task-exec-find-proposals.component.html',
  styleUrls: ['./task-exec-find-proposals.component.sass']
})
export class TaskExecFindProposalsComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private supplierService: SupplierService,
  	private dealService: PotentialDealsService,
    private multidataService: MultidataService,
  ) { }

  private task: Task; 
  private positions;

  private suppliers;
  private products;
  private countries;

  private _position : Object = undefined;
  private _proposal : Object = undefined;

  ngOnInit() {
  	this.task = this.taskService.getCurrent();

    this.multidataService.getDataForEnteringProposals(this.task).subscribe(
      data => {
        this.positions = data.positions;
        this.products = data.vocabularies.products;
        this.suppliers = data.vocabularies.suppliers;
        this.countries = data.vocabularies.countries;
      }
    )
  }

  private addProduct(){
    
  }

  private addPosition(){
    var newPosition : Object = {
      isNew : true,
      product: this.products[0],
      quantity: 0,
      initialPrice: 0.00,
      proposals: [],
      deliveryDays: 45,
      isEditing: true,
    }

    this.positions.push(newPosition);
    this._position = newPosition;
 }


  private editPosition(position){
    this._position = position;
    position.isEditing = true ;
  }

  private removePosition(position){
  }

  private savePosition(position){

    position.isEditing = false;
    this._position = undefined;
  }

  private abortPosition(position){
    if (position.isNew){
      this.positions = _.filter( this.positions, function(o){
        return (! o.isNew);
      })
    } else {

      position.isEditing = false;
    }

    this._position = undefined;
  }

  private editProposal(proposal){
    this._proposal = proposal;
  }

  private removeProposal(proposal){

  }

  private addProposal(){
    var newProposal : Object = {
      isNew : true,
    }
  }

  private saveProposal(proposal){

    this._proposal = undefined;
  }

  private abortProposal(proposal){

    this._proposal = undefined;
  }

  private supplierInfo(supplier){
  	return supplier.contacts;
  }

  private showAddPosBtn() : Boolean {

    return (! this._position && ! this._proposal)
  }

  private showDelPosBtn() : Boolean {

    return (! this._position && ! this._proposal)
  }

  private showEditPosBtn() : Boolean {

    return (! this._position && ! this._proposal)
  }

  private showSavePosBtn() : Boolean {

    return (this._position != undefined)
  }

  private showAbortPosBtn() : Boolean {

    return (this._position != undefined)
  }

  private showAddProposalBtn() : Boolean {

    return (! this._position && ! this._proposal)
  }

  private showDelProposalBtn() : Boolean {

    return (! this._position && ! this._proposal)
  }

  private showEditProposalBtn() : Boolean {

    return (! this._position && ! this._proposal)
  }

  private showSaveProposalBtn() : Boolean {

    return (this._proposal != undefined)
  }

  private showAbortProposalBtn() : Boolean {

    return (this._proposal != undefined)
  }
}
