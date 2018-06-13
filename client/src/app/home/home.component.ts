import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StockService } from '../stocks/stocks.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [StockService],
  })

export class HomeComponent implements OnInit {

  public stockList = [];

constructor(
  private http: HttpClient,
  private router: Router,
  private stockService: StockService)
  { }

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

  getStocks() {
    console.log('Subscribe to service');
    this.stockService.getStocks()
      .subscribe(
        messages => {
          // console.log("Messages:",messages);
          this.stockList = messages;
          console.log(messages);
        });
  }

  ngOnInit() {
    // checks if user is loggedin and has token
    if (localStorage.getItem('jwtToken') != null) {
      this.getStocks();
      console.log('localtoken:', localStorage.getItem('jwtToken'));
    } else {
      this.router.navigate(['login']);
    }
  }

}