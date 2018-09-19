import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';

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
export class MultidataService {

  constructor( private configService: ConfigService) { }

  public getDataForTaskCard(){
		return this.configService.get('multidata/taskcard/')
			.map(response => response.json())
			.catch(MultidataService.handleError)
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
