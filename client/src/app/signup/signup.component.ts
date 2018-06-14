import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
  })

export class SignupComponent {
  signupData = { username: '', password: '' };
  message = '';

  constructor(private http: HttpClient, private router: Router) { }

  signup() {
    this.http.post('/users/signup', this.signupData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['home']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}
