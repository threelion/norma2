import { Injectable } from '@angular/core';
import { handleError } from '../libs/httpErrorHandler';

import { ConfigService } from './config.service';

@Injectable()
export class PotentialPositionService {

  constructor(private configService: ConfigService) { }

  public getAll(){
  	return this.configService.get('potentialpositions/')
			.map(response => response.json())
			.catch(handleError)
	}

	public create(position){
		this.configService.post('potentialpositions/', position)
			.map(response => response.json())
			.catch(handleError)
	}

	public update(position){
		this.configService.put('potentialpositions/' + position._id, position)
			.map(response => response.json())
			.catch(handleError)
	}
}
