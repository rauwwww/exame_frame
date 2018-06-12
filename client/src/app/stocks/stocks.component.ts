import { Component, OnInit } from '@angular/core';
import { Stock, StockPrice } from '../models/stock';
import { StockService } from './stocks.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  providers: [StockService]
})
export class StocksComponent implements OnInit {

  isSubmitted = false;
  title = 'MEAN app with Socket IO';
  //model = new Blog('', '');
  public stockName = [];
  stockPricemodel = new StockPrice('', '');
  model = new Stock('', new Array<StockPrice>());
  public stockList = [];

  constructor (private stockService: StockService, private router: Router) {}

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

  submitStock() {
    this.stockService.addStock(this.model)
      .subscribe(
        stogMsg => {
          // console.log("Messages:", messages);
          this.model = stogMsg;
          // this.getBlogs();
        },
        error =>  this.title = <any>error
      );
  }
  submitPrice() {
    this.stockService.addPrice(this.stockPricemodel)
    .subscribe(
      stogMsg => {
        // console.log("Messages:", messages);
        this.stockPricemodel = stogMsg;
        // this.getBlogs();
      },
      error =>  this.title = <any>error
    );
  }
  getStocks() {
    console.log('Subscribe to service');
    this.stockService.getStocks()
      .subscribe(
        messages => {
          // console.log("Messages:",messages);
          this.stockList = messages;
          console.log(messages);
        },
        error =>  this.title = <any>error
      );
  }

  ngOnInit() {
    this.getStocks();
  }
}
