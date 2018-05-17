
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	username: string;
	password: string;
  isAuthenticated: boolean;

  constructor(private authService: AuthService, private sessionService: SessionService) { }

  ngOnInit() {
    this.username = "Voljka";
    this.password = "13";
  }

  private getUserData() {
  	let userData = {
  		username: this.username,
  		password: this.password,
  	}
  	return userData;
  }

  onLogin(){
    console.log('login function');

  	this.authService.login(this.getUserData())
  		.subscribe( res => this.dealWithResult(res))
  }

  onWelcome(){
    console.log('welcome function');

    this.authService.welcome()
      .subscribe( res => console.log(res))
  }

  onLogout(){
    console.log('logout function');
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.password = "";
    this.sessionService.token = undefined;
  }

  private dealWithResult(res) {
    if (res.status > 300) {
      console.log(res);
      this.showAuthError(res);
    } else {
      console.log(res);
      this.updateUserInterface(res);
    }
  }

  private showAuthError(res) {
    alert(res.msg)
  }

  private updateUserInterface(res) {
    this.isAuthenticated = true; 
    localStorage.setItem('token', res.id_token);
    this.sessionService.token = res.id_token;
  }

}
