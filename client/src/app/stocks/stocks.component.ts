import { Component, OnInit } from '@angular/core';
import { Stock, StockPrice } from '../models/stock';
import { StockService } from './stocks.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';

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
  priceForm;
  newPrice = [];

  constructor (
    private stockService: StockService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createPriceForm();
  }

  createPriceForm() {
    this.priceForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

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
  submitPrice(id) {
    const price = this.priceForm.get('price').value;
    this.stockService.addPrice(id, price).subscribe(data => {
      const index = this.newPrice.indexOf(id); // Get the index of the blog id to remove from array
      this.newPrice.splice(index, 1); // Remove id from the array
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
        },
        error =>  this.title = <any>error
      );
  }

  ngOnInit() {
    this.getStocks();
  }
}
