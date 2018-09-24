import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'select-with-filter',
  templateUrl: './select-with-filter.component.html',
  styleUrls: ['./select-with-filter.component.sass']
})
export class SelectWithFilterComponent implements OnInit {

	@Input() elements;
	@Input() selected;
	@Input() valueField;
	@Input() nameField;
	@Output() changed = new EventEmitter();
	@Output() add = new EventEmitter();

	private _filter: String = "";
	private filteredElements: Object[];

  constructor() { }

  ngOnInit() {
  	this.filteredElements = this.elements;

  }

  onChange(){
  	console.log('select value changed');
  	this.changed.emit(this.selected);
  }

  onAdd(){
  	this.add.emit();
  }

  private filterElements(e){
  	var filter = e.target.value;

  	if (filter === ""){
  		this.filteredElements = this.elements;
  	} else {
  		var nameField = this.nameField;

  		this.filteredElements = _.filter( this.elements, function(o){
  			return (o[nameField]).toLowerCase().indexOf(filter.toLowerCase()) > -1
  		})
  	}
  }

}
