import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { Task } from '../interfaces/task';
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
export class FileService {

  constructor(private configService: ConfigService) { }

  public downloadFile(file) /*: Observable<Task>*/{
  	return this.configService.getFile('files/'+file._id+'/download')
			.map(response => response.json())
			.catch(FileService.handleError)
	}

	public uploadFile(credentials): Observable<any> {
		return this.configService.post('files/upload/', credentials)
			.map(response => response.json())
			.catch(FileService.handleError)
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
