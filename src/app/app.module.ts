import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TodoService } from './services/todos.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AuthGuard,
  AuthService,
  AuthInterceptor,
} from './services/auth.service';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [AppComponent, FeedComponent, LoginComponent, SignupComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    TodoService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
