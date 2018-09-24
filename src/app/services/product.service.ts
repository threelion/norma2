import { Injectable } from '@angular/core';
import { handleError } from '../libs/httpErrorHandler';

import { ConfigService } from './config.service';

@Injectable()
export class ProductService {

  constructor(private configService: ConfigService) { }

  public getAll(){
  	return this.configService.get('products/')
			.map(response => response.json())
			.catch(handleError)
	}

	public create(product){
		this.configService.post('products/', product)
			.map(response => response.json())
			.catch(handleError)
	}

	public update(product){
		this.configService.put('products/'+product._id, product)
			.map(response => response.json())
			.catch(handleError)
	}


}
