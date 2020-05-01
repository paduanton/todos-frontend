import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  error: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signup(name: string, email: string, password: string, password_confirmation: string, birthday: Date) {
    this.authService.signup(name, email, password, password_confirmation, birthday).subscribe(
      success => this.router.navigate(['feed']),
      error => this.error = error
    );
  }
}
