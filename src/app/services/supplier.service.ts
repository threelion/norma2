import { Injectable } from '@angular/core';

import { handleError } from '../libs/httpErrorHandler';

import { ConfigService } from './config.service';

@Injectable()
export class SupplierService {

  constructor(private configService: ConfigService) { }

  public getAll(){
  	return this.configService.get('suppliers/')
			.map(response => response.json())
			.catch(handleError)
	}

	public create(supplier){
		this.configService.post('suppliers/', supplier)
			.map(response => response.json())
			.catch(handleError)
	}

	public update(supplier){
		this.configService.put('suppliers/'+supplier._id, supplier)
			.map(response => response.json())
			.catch(handleError)
	}
}
