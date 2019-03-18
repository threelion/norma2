import { Injectable } from '@angular/core';
import { handleError } from '../libs/httpErrorHandler';

import { ConfigService } from './config.service';

import { Product } from '../models/product';

@Injectable()
export class ProductService {

  constructor(private configService: ConfigService) { }

  public getAll(){
  	return this.configService.get('products/')
			.map(response => response.json())
			.catch(handleError)
	}

	public add(product){
		this.configService.post('products/', product)
			.map(response => response.json())
			.catch(handleError)
	}

	public create(name, producer, kved){
		let newProduct = new Product(name, producer, kved);
		newProduct.add = () => {
			self = getThis();
			console.log('self');
			console.log(self);

			// this.add(newProduct);
		}
		newProduct.update = this.update(newProduct);
		newProduct.all = this.getAll();

		return newProduct;
	}

	public update(product){
		this.configService.put('products/'+product._id, product)
			.map(response => response.json())
			.catch(handleError)
	}


}

let getThis = () => {
	return this
}