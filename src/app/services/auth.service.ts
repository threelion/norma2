import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../interfaces/user';
import { LoginData } from '../interfaces/login-data';

import { ConfigService } from './config.service';
import { SessionService } from './session.service';

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
export class AuthService {
  private undefinedUser = {
		username: undefined,
		role: undefined,
		id_token: undefined
	}

	private activeUser = this.undefinedUser;

	public currentUser(): User {
		return this.activeUser;
	}

	public logout(): void {
		this.activeUser = this.undefinedUser;
	}

	public login(credentials: LoginData): Observable<User> {
		return this.configService.postAuth('users/login/', credentials)
			.map(response => response.json())
			.catch(AuthService.handleError)
	}

	public addUser( userdata: LoginData): void {
		
	}

	static handleError(error: any){
		console.log(error);

		if (error.status == 401) {
			return authError.toPromise();
			// return Observable.throw(error);
		} else {
			return apiError.toPromise();
			// console.log('Status: Server Error')
			// return Observable.throw(error);
		}
	}
 

	public welcome(){
		return this.configService.get('welcome/')
			.map(response => response.json())
			.catch(AuthService.handleError)
	}

  // constructor(private configService: ConfigService, private sessionService: SessionService) { }
  constructor(private configService: ConfigService) { }

}
