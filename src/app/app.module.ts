import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FakeBackendInterceptor} from "./helpers/fake-backend";
import {JwtInterceptor} from "./helpers/jwt-interceptor";
import {ErrorInterceptor} from "./helpers/error-interceptor";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthenticationService} from "./services/authentication/authentication.service"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthGuard} from "./guard/auth.guard";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, RegisterComponent],
  providers: [AuthGuard, AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  ],
  imports: [ NgbModule.forRoot(), BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
