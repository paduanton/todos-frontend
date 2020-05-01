import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login(user: string, password: string, remember_me: boolean) {
    let credentials = {};

    if (this.isEmail(user)) {
      credentials = {
        email: user,
        password: password,
        remember_me: remember_me,
      };
    } else {
      credentials = {
        username: user,
        password: password,
        remember_me: remember_me,
      };
    }

    this.authService.login(credentials).subscribe(
      (success) => this.router.navigate(['feed']),
      (error) => (this.error = error)
    );
  }

  isEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  }
}
