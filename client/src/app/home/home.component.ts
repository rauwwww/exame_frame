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
  enabledComments = [];
  public stockList = [];
  
constructor(
  private http: HttpClient,
  private router: Router,
  private stockService: StockService,
  )
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

   // Expand the list of comments
   expand(id) {
    this.enabledComments.push(id); // Add the current blog post id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }


  ngOnInit() {
    // checks if user is loggedin and has token
      this.getStocks();
  }
}
