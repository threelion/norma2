import { Injectable } from '@angular/core';

import { handleError } from '../libs/httpErrorHandler';

import { ConfigService } from './config.service';


@Injectable()
export class ProposalService {

  constructor(private configService: ConfigService) { }

  public getAll(){
  	return this.configService.get('proposals/')
			.map(response => response.json())
			.catch(handleError)
	}

	public create(proposal){
		this.configService.post('proposals/', proposal)
			.map(response => response.json())
			.catch(handleError)
	}

	public update(proposal){
		this.configService.put('proposals/'+proposal._id, proposal)
			.map(response => response.json())
			.catch(handleError)
	}


}
