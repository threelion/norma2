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
		username: "",
		role: "",
		id_token: "",
		id: ""
	}

	public activeUser : User = this.undefinedUser;

	public setUser(newUser: User) {
		this.activeUser = newUser;

		console.log('New user set in AuthService');
		console.log(this.activeUser);
	}

	public unsetUser() {
		this.activeUser = this.undefinedUser;
	}

	public currentUser(): User {
		return this.activeUser;
	}

	public logout(): void {
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
		} else {
			return apiError.toPromise();
		}
	}
 

	public welcome(){
		return this.configService.get('welcome/')
			.map(response => response.json())
			.catch(AuthService.handleError)
	}

  constructor(private configService: ConfigService) { }
}
