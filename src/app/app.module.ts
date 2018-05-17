import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';

import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpModule
  ],
  providers: [AuthService, ConfigService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
