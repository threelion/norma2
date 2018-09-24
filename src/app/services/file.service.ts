import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { Task } from '../interfaces/task';
import { ConfigService } from './config.service';

import { authError, apiError } from '../libs/httpErrorHandler';

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

	public deleteFile(file): Observable<any> {
		return this.configService.delete('files/' + file._id)
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
