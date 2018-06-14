import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],

  })

export class SignupComponent {

    constructor(private http: HttpClient, private router: Router) { }

    signupData = { username:'', password:'' };
    message = '';

    signup() {
        this.http.post('/users/signup',this.signupData).subscribe(resp => {
          console.log(resp);
          this.router.navigate(['home']);
        }, err => {
          this.message = err.error.msg;
        });
      }

}