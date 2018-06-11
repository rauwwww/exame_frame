import { Component } from '@angular/core';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html'
})
export class StockComponent {
    stockId: number = 1;
    stockPrice: number = 10;
    stockName: string = 'FirstStock';
}