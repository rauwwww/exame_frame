import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Stock, StockPrice } from '../models/stock';
import { Observable }     from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StockService {
    private getStockUrl = 'stock/get';  // URL to web API
    private postStockUrl = 'stock/post';  // URL to web API
    private postPriceUrl = 'stockprice/stockPost';
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;

    /*
     * Get blog messages from server
     */
    getStocks (): Observable<Stock[]> {
        let observable = new Observable(observer => {
            console.log('Socket:', this.url);
            this.socket = io(this.url);
            this.socket.on('refresh', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    /*
     * Send blog message to server
     */
    addStock (stock: Stock): Observable<Stock> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postStockUrl, stock, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addPrice(id, price) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const priceData = {
            id: id,
            price: price
        };
        return this.http.post(this.postPriceUrl, priceData, options)
            .map(res => res.json());
    }

    /*
     * Data handlers
     */
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
