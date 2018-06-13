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
  title = 'Trading App test lol';
  //model = new Blog('', '');
  public stockName = [];
  stockPrice = new StockPrice('', '');
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
      price: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    });
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['home']);
  }

  submitStock() {
    this.stockService.addStock(this.model)
      .subscribe(
        stogMsg => {
          // console.log("Messages:", messages);
          this.model = stogMsg;
          // this.getBlogs();
        },
        error =>  console.log(error, 'error while submitting stock')
      );
  }
  submitPrice(id) {
    const price = this.priceForm.get('price').value;
    this.stockService.addPrice(id, price)
    .subscribe(data => {
      const index = this.newPrice.indexOf(id); // Get the index of the blog id to remove from array
      this.newPrice.splice(index, 1); // Remove id from the array
    },
    error =>  console.log(error, 'error while submitting stock')
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
