import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { SessionService } from './session.service';

@Injectable()
export class ConfigService {

	public static apiUrl = "http://localhost:8080/protected/api/v1/";
	public static authUrl = "http://localhost:8080/api/v1/";

	private createHeader(header: Headers) {
// //		header.append('Access-Control-Allow-Origin','*');
//   header.append('Content-Type', 'application/json');
//   header.append('Accept', 'application/json');

//   header.append('Access-Control-Allow-Origin', 'http://localhost:4200');
//   header.append('Access-Control-Allow-Credentials', 'true');

//   // header.append('GET', 'POST', 'OPTIONS');
		header.append('Authorization', 'Bearer ' + this.sessionService.token);
	}

	get(url) {
		let headers = new Headers();
		this.createHeader(headers);
		return this.http.get(ConfigService.apiUrl + url, {headers: headers})
	}

	post(url, data) {
		let headers = new Headers();
		this.createHeader(headers);
		return this.http.post(ConfigService.apiUrl + url, data, {headers: headers})
	}

	postAuth(url, data) {
		let headers = new Headers();
		this.createHeader(headers);
		return this.http.post(ConfigService.authUrl + url, data, {headers: headers})
	}

	postMultidata(url, data) {
		let formData = new FormData();
		for (let item in data) {
			formData.append(item, data[item]);
		}

		let headers = new Headers();
		this.createHeader(headers);
		return this.http.post(ConfigService.apiUrl + url, formData, {headers: headers})
	}

	put(url, data) {
		let headers = new Headers();
		this.createHeader(headers);
		return this.http.put(ConfigService.apiUrl + url, data, {headers: headers})
	}

	delete(url) {
		let headers = new Headers();
		this.createHeader(headers);
		return this.http.delete(ConfigService.apiUrl + url, {headers: headers})
	}

	static handleError(error: any){
		console.log(error);
		return Observable.throw(error);
	}

  constructor(private http: Http, private sessionService: SessionService) { }

}
