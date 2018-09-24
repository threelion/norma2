import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Task } from '../interfaces/task';
import { ConfigService } from './config.service';

const closedJobs = [
	'e55303d0-b279-11e8-9dbd-f7e01824872b', 
	'b682c310-b279-11e8-9dbd-f7e01824872b', 
	'10f15980-bb15-11e8-8914-f3ca25dc16da'
];

const COMPLETED_TASK = "23d68710-ba97-11e8-b668-a77390746c9d";
const ONGOING_TASK = "c8ebbe80-b279-11e8-9dbd-f7e01824872b";

const PRIVATE_TASK = "19588920-b284-11e8-93fd-279b4bbe1d6c";
const FIND_SUPPLIERS_TASK = "5a5ef580-b284-11e8-8c8d-4f0ec6e9498f";
const APPROVE_SUPPLIERS_TASK = "a4a8e740-b284-11e8-8c8d-4f0ec6e9498f";

const PREPARE_TENDER_DOCS_TASK = "bda00c10-b284-11e8-8c8d-4f0ec6e9498f";
const SEND_TENDER_DOCS_TASK = "c44c92e0-b284-11e8-8c8d-4f0ec6e9498f";
const SET_TENDER_DATE_TASK = "d6c1ea60-b284-11e8-8c8d-4f0ec6e9498f";
const TAKE_PART_IN_TENDER_TASK = "f5dbcc90-b284-11e8-8c8d-4f0ec6e9498f";
const SET_TENDER_RESULT_TASK = "0e054120-b285-11e8-8c8d-4f0ec6e9498f";

const ENTER_CONTRACT_AND_SPECIFICATIONS_TASK = "22f583b0-b285-11e8-8c8d-4f0ec6e9498f";
const UPLOAD_CONTRACT_AND_SPECIFICATIONS_SCAN_TASK = "31053720-b285-11e8-8c8d-4f0ec6e9498f";

const PREPARE_SUPPLIER_CONTRACT_AND_SPECIFICATIONS_TASK = "013e3510-bd1f-11e8-b619-ed6bd0d0b244";
const SEND_DOCUMENT_ORIGINALS_TO_SUPPLIER_TASK = "80fdc7b0-b285-11e8-8c8d-4f0ec6e9498f";

const PAY_TO_SUPPLIER_TASK = "23c92220-bd1f-11e8-b619-ed6bd0d0b244";
const ENTER_OUTCOME_PAYMENT_TASK = "d02c5180-b285-11e8-8c8d-4f0ec6e9498f";
const ENTER_DELIVERY_TASK = "bb25c7d0-b285-11e8-8c8d-4f0ec6e9498f";

const SEND_DELIVERY_LETTER_TASK = "8fd1cff0-bd22-11e8-b619-ed6bd0d0b244";
const ENTER_SHIPMENT_TASK = "b462f9e0-b285-11e8-8c8d-4f0ec6e9498f";
const SEND_DOCUMENT_ORIGINALS_TO_CUSTOMER_TASK = "7b82bc00-b285-11e8-8c8d-4f0ec6e9498f";
const ENTER_INCOME_PAYMENT_TASK = "c9329510-b285-11e8-8c8d-4f0ec6e9498f";

const PREPARE_CUSTOMS_DOCUMENTS_TASK = "8d754ef0-b285-11e8-8c8d-4f0ec6e9498f";
const SEND_DOCUMENTS_TO_CUSTOMS_TASK = "39903cb0-bd1f-11e8-b619-ed6bd0d0b244";
const ENTER_CUSTOMS_APPLICATION_TASK = "4cdd5690-bd1f-11e8-b619-ed6bd0d0b244";

import { authError, apiError } from '../libs/httpErrorHandler';

@Injectable()
export class TaskService {
	public current: Task = undefined;

  constructor(private configService: ConfigService) { }


  public getExecutorTasks(user) /*: Observable<Task>*/{
  	return this.configService.get('tasks/byexecutor/'+user._id)
			.map(response => response.json())
			.catch(TaskService.handleError)
	}

  public getCEOTasks(user) /*: Observable<Task>*/{
  	return this.configService.get('tasks/byceo/'+user._id)
			.map(response => response.json())
			.catch(TaskService.handleError)
	}

  public getControllerTasks(user) /*: Observable<Task>*/{
  	return this.configService.get('tasks/bycontroller/'+user._id)
			.map(response => response.json())
			.catch(TaskService.handleError)
	}

	public isClosedTask(taskStatusId) : Boolean {
		return (closedJobs.indexOf(taskStatusId) > -1);
	}

	public isCompletedTask(taskStatusId) : Boolean {
		return (taskStatusId == COMPLETED_TASK);
	}

	public isFindProposalsTask(task) : Boolean {
		// console.log(task);
		return (task.taskType._id == FIND_SUPPLIERS_TASK);
	}

	public getCurrent() : Task {
		return this.current;

	}

	public setCurrent(task: Task){
		this.current = task;

	}

	public setCompleted(task: Task) : Task {
		task.status._id = COMPLETED_TASK;
		return task;
	}

	public setOngoing(task: Task) : Task {
		task.status._id = ONGOING_TASK;
		return task;
	}

	public nextStep(task: Task) : String[]{
		var nextStep : String[];
		var t = true;
		var f = false;

		switch (task.taskType._id) {
			case FIND_SUPPLIERS_TASK:
				nextStep = [APPROVE_SUPPLIERS_TASK];
				break;
			case APPROVE_SUPPLIERS_TASK:
				nextStep = [PREPARE_TENDER_DOCS_TASK];
				break;
			case PREPARE_TENDER_DOCS_TASK:
				nextStep = [SEND_TENDER_DOCS_TASK];
				break;
			case SEND_TENDER_DOCS_TASK:
				nextStep = [SET_TENDER_DATE_TASK];
				break;
			case SET_TENDER_DATE_TASK:
				nextStep = [TAKE_PART_IN_TENDER_TASK];
				break;
			case TAKE_PART_IN_TENDER_TASK:
				nextStep = [SET_TENDER_RESULT_TASK];
				break;
			case SET_TENDER_RESULT_TASK:
				var tender = {
					isSuccess: true, 
				}

				if (tender.isSuccess) {
					nextStep = [ENTER_CONTRACT_AND_SPECIFICATIONS_TASK];
				} else {
					nextStep = [];
				}
				
				break;
			case ENTER_CONTRACT_AND_SPECIFICATIONS_TASK:
				nextStep = [UPLOAD_CONTRACT_AND_SPECIFICATIONS_SCAN_TASK];
				break;
			case UPLOAD_CONTRACT_AND_SPECIFICATIONS_SCAN_TASK:
				nextStep = [PREPARE_SUPPLIER_CONTRACT_AND_SPECIFICATIONS_TASK];
				break;
			case PREPARE_SUPPLIER_CONTRACT_AND_SPECIFICATIONS_TASK:
				nextStep = [SEND_DOCUMENT_ORIGINALS_TO_SUPPLIER_TASK];
				break;
			case SEND_DOCUMENT_ORIGINALS_TO_SUPPLIER_TASK:
				nextStep = [PAY_TO_SUPPLIER_TASK];
				break;
			case PAY_TO_SUPPLIER_TASK:
				if (f) { // Position has 2 phase payment
					if (t) { // this is 2nd payment
						nextStep = [ENTER_DELIVERY_TASK];
					} else {
						if (t) { // 2nd payment before delivery
							nextStep = [PAY_TO_SUPPLIER_TASK];
						} else {
							nextStep = [ENTER_DELIVERY_TASK];
						}
					}
				} else {
					nextStep = [ENTER_DELIVERY_TASK];
				}
				break;
			case ENTER_DELIVERY_TASK:
				if (t) { // If delivered paid fully
					if (f) { // If contract with customer has DELIVERY LETTER EVENT
						nextStep = [SEND_DELIVERY_LETTER_TASK];

					} else { 
						nextStep = [ENTER_SHIPMENT_TASK];
					}
				} else {
					nextStep = [PAY_TO_SUPPLIER_TASK, ENTER_INCOME_PAYMENT_TASK]; 
				}
				break;
			case ENTER_INCOME_PAYMENT_TASK: 
				nextStep = [SEND_DOCUMENT_ORIGINALS_TO_CUSTOMER_TASK];
				break;
			case PREPARE_CUSTOMS_DOCUMENTS_TASK:
				nextStep = [SEND_DOCUMENTS_TO_CUSTOMS_TASK];
				break;
			case SEND_DOCUMENTS_TO_CUSTOMS_TASK:
				nextStep = [ENTER_CUSTOMS_APPLICATION_TASK];
				break;
			case ENTER_CUSTOMS_APPLICATION_TASK:
				nextStep = [ENTER_DELIVERY_TASK];
				break;
			default:
				nextStep = [];
		}

		return nextStep;
	}

	public createNewTaskObject(parentTask, newTaskId) : Task[] {
		var res : Task[];

		
		return res;
	}

	public addTask(task){
		return this.configService.post('tasks/', task)
			.map(response => response.json())
			.catch(TaskService.handleError)
	}

	public updateTask(task){
		return this.configService.put('tasks/'+task._id, task)
			.map(response => response.json())
			.catch(TaskService.handleError)
	}

	static handleError(error: any){
		console.log(error);

		if (error.status == 401) {
			return authError.toPromise();
		} else {
			return apiError.toPromise();
		}
	}
}
