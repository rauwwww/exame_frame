import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],

  })

export class HomeComponent {

constructor(private http: HttpClient, private router: Router) { }

loginData = { username:'', password:'' };
message = '';
data: any;

login() {
    this.http.post('/users/signin',this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      console.log("you are logged in");
      this.router.navigate(['stocks']);
    }, err => {
      this.message = err.error.msg;
    });
  }

}