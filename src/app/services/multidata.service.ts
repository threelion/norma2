import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';

import { handleError } from '../libs/httpErrorHandler';

@Injectable()
export class MultidataService {

  constructor( private configService: ConfigService) { }

  public getDataForTaskCard(){
		return this.configService.get('multidata/taskcard/')
			.map(response => response.json())
			.catch(handleError)
  }

	public getDataForEnteringProposals(task){
		return this.configService.get('multidata/proposalentering/deal/'+ task.potentialDeal._id + '/executor/' + task.executor._id)
			.map(response => response.json())
			.catch(handleError)
	}
}
