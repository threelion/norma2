import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

import { authError, apiError } from '../libs/httpErrorHandler';

@Injectable()
export class PotentialDealsService {

  constructor(
  	private configService: ConfigService

  ) { }

  public dealPositionsByExecutor(deal, executor){
  	return this.configService.get('potentialdeals/' + deal._id + '/positionsbyexecutor/' + executor._id)
			.map(response => response.json())
			.catch( PotentialDealsService.handleError)
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
