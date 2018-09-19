import { Component } from '@angular/core';

import { AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  user = {
  	role: "",
  	username: "",
  	id_token: "",
    id: ""
  };


  onUserChange(newUser){
  	this.user.role = newUser.role;
  }

  constructor(authService: AuthService){}

}
