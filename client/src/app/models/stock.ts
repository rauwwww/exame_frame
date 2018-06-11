export class StockPrice {
    constructor(
    public price: string,
    public date: string,
    ) { }
}
export class Stock {
    constructor(
      public name: string,
      public stockprices: StockPrice[],
    ) { }
}
