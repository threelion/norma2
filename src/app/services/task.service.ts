import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Task } from '../interfaces/task';
import { ConfigService } from './config.service';

const closedJobs = [
	'e55303d0-b279-11e8-9dbd-f7e01824872b', 
	'b682c310-b279-11e8-9dbd-f7e01824872b', 
	'10f15980-bb15-11e8-8914-f3ca25dc16da'
];

const authError = new Observable((observer) => {
	observer.next({
		msg: "Authentication failed",
		status: 401
	});
	observer.complete();
})

const apiError = new Observable((observer) => {
	observer.next({
		msg: "Server error",
		status: 500
	});
	observer.complete();
})

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
		var res = false;
		if (closedJobs.indexOf(taskStatusId) > -1) res = true;
		
		return res;
	}

	public getCurrent() : Task {
		return this.current;

	}

	public setCurrent(task: Task){
		this.current = task;

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
